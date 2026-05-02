// @ts-nocheck
/**
 * Test that tools in the list are installable and executable via bunx.
 *
 * Usage:
 *   bun run scripts/test_clients.ts --all
 *   bun run scripts/test_clients.ts --diff origin/main
 *   bun run scripts/test_clients.ts --tools '<json>'
 *
 * Modes (mutually exclusive):
 *   --all              Test every tool in tools.json.
 *   --diff <ref>       Test only tools added vs. <ref> (uses diff_tools.ts).
 *   --tools '<json>'   Explicit JSON array of {"package", "execs"} objects.
 *
 * Exit codes:
 *   0  all tested tools passed (or nothing to test in --diff mode)
 *   1  one or more tools failed, or invalid input
 */
import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

type InputTool = { package: string; execs?: string[] };
type Result =
	| { package: string; success: true }
	| { package: string; success: false; reason: string };

const NETWORK_PATTERNS =
	/(failed to fetch|connection error|could not connect|network|timeout|timed out|ssl error|ssl.{0,20}certificate|self.signed.certificate|certificate.{0,20}(?:error|fail|invalid|expired|verify)|http 5\d\d|503|502|504|etimedout|econnreset|econnrefused)/i;
const NOT_FOUND_PATTERNS =
	/(\b404\b|no matching version|packagenotfound|\be404\b|no such package|failed to resolve)/i;
const BINARY_PATTERNS =
	/(executable .* not found|command not found|which: no|not in.*path)/i;
// Matches the Node.js "spawn X ENOENT" crash that occurs when a tool treats its CLI
// arguments as commands to execute (e.g. cross-env passes --help directly to cross-spawn).
// In this case the tool is correctly installed; only the --help probe fails.
const SPAWN_ENOENT_PATTERNS = /spawn\s+\S+\s+enoent/i;

type RunResult = { exitCode: number; stdout: string; stderr: string };

function classifyFailure(stdout: string, stderr: string): string {
	const combined = stdout + stderr;
	if (NETWORK_PATTERNS.test(combined)) return 'network';
	if (NOT_FOUND_PATTERNS.test(combined)) return 'not_found';
	if (BINARY_PATTERNS.test(combined)) return 'wrong_binary';
	return 'execution_error';
}

function run(command: string, args: string[]): RunResult {
	const result = spawnSync(command, args, {
		encoding: 'utf8',
		timeout: 120_000,
	});
	return {
		exitCode: result.status ?? 1,
		stdout: (result.stdout ?? '').toString(),
		stderr: (result.stderr ?? '').toString(),
	};
}

function ranSuccessfully(result: RunResult): boolean {
	if (result.exitCode === 0) return true;
	const out = result.stdout + result.stderr;
	if (NETWORK_PATTERNS.test(out)) return false;
	if (NOT_FOUND_PATTERNS.test(out)) return false;
	if (BINARY_PATTERNS.test(out)) return false;
	return out.trim().length > 0;
}

function testTool(pkg: string, execName: string): { success: boolean; failureType: string } {
	const attempt1 = run('bunx', ['--package', pkg, execName, '--help']);
	if (ranSuccessfully(attempt1)) return { success: true, failureType: '' };

	const out1 = attempt1.stdout + attempt1.stderr;

	if (NETWORK_PATTERNS.test(out1)) {
		const retry = run('bunx', ['--package', pkg, execName, '--help']);
		if (ranSuccessfully(retry)) return { success: true, failureType: '' };
		return { success: false, failureType: 'network' };
	}

	// Tools that treat every argument as a sub-command (e.g. cross-env) crash with a
	// "spawn --help ENOENT" error when probed with --help. Fall back to a no-arg
	// invocation: if it exits 0 the binary is installed and working correctly.
	if (SPAWN_ENOENT_PATTERNS.test(out1)) {
		const noArgs = run('bunx', ['--package', pkg, execName]);
		if (noArgs.exitCode === 0) return { success: true, failureType: '' };
	}

	const attempt2 = run('bunx', [pkg, '--help']);
	if (ranSuccessfully(attempt2)) return { success: true, failureType: '' };

	const combinedOut = attempt1.stdout + attempt2.stdout;
	const combinedErr = attempt1.stderr + attempt2.stderr;
	return { success: false, failureType: classifyFailure(combinedOut, combinedErr) };
}

type Tool = { execs: string[] };
type Category = { tools: Record<string, Tool> };
type ToolsFile = { categories: Category[] };

function loadAllTools(toolsPath: string): InputTool[] {
	const data = JSON.parse(readFileSync(toolsPath, 'utf8')) as ToolsFile;
	return data.categories.flatMap((c) =>
		Object.entries(c.tools).map(([k, v]) => ({ package: k, execs: v.execs }))
	);
}

function loadDiffTools(baseRef: string): InputTool[] {
	const __dirname = dirname(fileURLToPath(import.meta.url));
	const script = resolve(__dirname, 'diff_tools.ts');
	const result = spawnSync('bun', ['run', script, '--base', baseRef], { encoding: 'utf8' });
	if (result.status === 2) return [];
	if (result.status !== 0) {
		console.error(`diff_tools.ts failed: ${result.stderr ?? ''}`);
		process.exit(1);
	}
	return JSON.parse((result.stdout ?? '').toString()) as InputTool[];
}

function main(): void {
	const { values } = parseArgs({
		options: {
			all: { type: 'boolean' },
			diff: { type: 'string' },
			tools: { type: 'string' },
			output: { type: 'string', default: 'output.log' },
			'tools-path': { type: 'string', default: 'tools.json' },
		},
		strict: false,
	});

	const modes = [values.all, values.diff, values.tools].filter(Boolean).length;
	if (modes !== 1) {
		console.error('Error: exactly one of --all, --diff <ref>, --tools <json> is required');
		process.exit(1);
	}

	let tools: InputTool[];
	if (values.all) {
		tools = loadAllTools(values['tools-path'] as string);
	} else if (values.diff) {
		tools = loadDiffTools(values.diff as string);
		if (tools.length === 0) {
			console.log('No new tools to test.');
			return;
		}
	} else {
		try {
			tools = JSON.parse(values.tools as string) as InputTool[];
		} catch (err) {
			console.error(`Error: --tools is not valid JSON: ${(err as Error).message}`);
			process.exit(1);
		}
	}

	const bunVersion = run('bun', ['--version']);
	if (bunVersion.exitCode === 0) console.log(`bun ${bunVersion.stdout.trim()}`);

	console.log(`Testing ${tools.length} tool(s)...\n`);

	const results: Result[] = [];

	for (const tool of tools) {
		const pkg = tool.package;
		const execName =
			tool.execs && tool.execs.length > 0 ? tool.execs[0]! : pkg.split('[')[0]!.split('/').pop()!;

		console.log(`  Testing: ${pkg} (${execName})`);

		const { success, failureType } = testTool(pkg, execName);

		if (success) {
			console.log('    ✓ ok');
			results.push({ package: pkg, success: true });
		} else {
			console.log(`    ✗ failed (${failureType})`);
			results.push({ package: pkg, success: false, reason: failureType });
		}
	}

	const passed = results.filter((r) => r.success);
	const failed = results.filter((r): r is Extract<Result, { success: false }> => !r.success);

	console.log(`\nResults: ${passed.length} passed, ${failed.length} failed`);

	if (failed.length > 0) {
		writeFileSync(values.output as string, JSON.stringify(failed, null, 2));
		console.log(`Failures written to ${values.output}`);
		process.exit(1);
	}
}

main();
