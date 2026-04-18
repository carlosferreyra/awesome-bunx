#!/usr/bin/env -S bun run
// /// script
// runtime = "bun >=1.1"
// dependencies = []
// ///
/**
 * Test that tools in the list are installable and executable via bunx.
 *
 * Usage:
 *   bun run scripts/test_clients.ts --tools '<json>'
 *
 * The --tools argument accepts a JSON array of tool objects matching the
 * tools.json schema. Each object must have at minimum:
 *   {"package": "<name>", "execs": ["<binary>", ...]}
 *
 * Examples:
 *   # Test a single tool (e.g. from a PR diff):
 *   bun run scripts/test_clients.ts --tools '[{"package":"eslint","execs":["eslint"]}]'
 */
import { writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { parseArgs } from 'node:util';

type InputTool = { package: string; execs?: string[] };
type Result =
	| { package: string; success: true }
	| { package: string; success: false; reason: string };

const NETWORK_PATTERNS =
	/(failed to fetch|connection error|could not connect|network|timeout|timed out|ssl error|certificate|http 5\d\d|503|502|504|etimedout|econnreset|econnrefused)/i;
const NOT_FOUND_PATTERNS =
	/(404|not found|no matching version|does not exist|packagenotfound|e404|no such package)/i;
const BINARY_PATTERNS =
	/(executable .* not found|no such file|command not found|which: no|not in.*path)/i;

function classifyFailure(stdout: string, stderr: string): string {
	const combined = stdout + stderr;
	if (NETWORK_PATTERNS.test(combined)) return 'network';
	if (NOT_FOUND_PATTERNS.test(combined)) return 'not_found';
	if (BINARY_PATTERNS.test(combined)) return 'wrong_binary';
	return 'execution_error';
}

function run(command: string, args: string[]): { ok: boolean; stdout: string; stderr: string } {
	const result = spawnSync(command, args, {
		encoding: 'utf8',
		timeout: 120_000,
	});
	return {
		ok: result.status === 0,
		stdout: (result.stdout ?? '').toString(),
		stderr: (result.stderr ?? '').toString(),
	};
}

function testTool(pkg: string, execName: string): { success: boolean; failureType: string } {
	const attempt1 = run('bunx', ['--package', pkg, execName, '--help']);
	if (attempt1.ok) return { success: true, failureType: '' };

	if (NETWORK_PATTERNS.test(attempt1.stdout + attempt1.stderr)) {
		const retry = run('bunx', ['--package', pkg, execName, '--help']);
		if (retry.ok) return { success: true, failureType: '' };
		return { success: false, failureType: 'network' };
	}

	const attempt2 = run('bunx', [pkg, '--help']);
	if (attempt2.ok) return { success: true, failureType: '' };

	const combinedOut = attempt1.stdout + attempt2.stdout;
	const combinedErr = attempt1.stderr + attempt2.stderr;
	return { success: false, failureType: classifyFailure(combinedOut, combinedErr) };
}

function main(): void {
	const { values } = parseArgs({
		options: {
			tools: { type: 'string' },
			output: { type: 'string', default: 'output.log' },
		},
		strict: false,
	});

	if (!values.tools) {
		console.error('Error: --tools is required');
		process.exit(1);
	}

	let tools: InputTool[];
	try {
		tools = JSON.parse(values.tools as string) as InputTool[];
	} catch (err) {
		console.error(`Error: --tools is not valid JSON: ${(err as Error).message}`);
		process.exit(1);
	}

	const bunVersion = run('bun', ['--version']);
	if (bunVersion.ok) console.log(`bun ${bunVersion.stdout.trim()}`);

	console.log(`Testing ${tools.length} tool(s)...\n`);

	const results: Result[] = [];

	for (const tool of tools) {
		const pkg = tool.package;
		const execName =
			tool.execs && tool.execs.length > 0
				? tool.execs[0]!
				: pkg.split('[')[0]!.split('/').pop()!;

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
