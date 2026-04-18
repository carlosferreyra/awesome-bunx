#!/usr/bin/env -S bun run
// @ts-nocheck
// /// script
// runtime = "bun >=1.1"
// dependencies = []
// ///
/**
 * Extract newly added tools from a git diff of tools.json.
 *
 * Compares the current branch against a base ref (default: origin/main) and
 * outputs a JSON array of added tool objects suitable for passing to test_clients.ts.
 *
 * Usage:
 *   bun run scripts/diff_tools.ts                    # diff against origin/main
 *   bun run scripts/diff_tools.ts --base origin/main # explicit base ref
 *
 * Output (stdout):
 *   [{"package": "eslint", "execs": ["eslint"]}, ...]
 *
 * Exit codes:
 *   0  added tools found, JSON written to stdout
 *   1  error
 *   2  no added tools detected (e.g. only removals or metadata changes)
 */
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { parseArgs } from 'node:util';

type Tool = {
	description: string;
	url: string;
	execs: string[];
	[k: string]: unknown;
};
type Category = { name: string; slug: string; tools: Record<string, Tool> };
type ToolsFile = { categories: Category[] };

function run(command: string, args: string[]): { ok: boolean; stdout: string; stderr: string } {
	const result = spawnSync(command, args, { encoding: 'utf8' });
	return {
		ok: result.status === 0,
		stdout: (result.stdout ?? '').trim(),
		stderr: (result.stderr ?? '').trim(),
	};
}

function getJsonAtRef(ref: string, path: string): ToolsFile | null {
	const res = run('git', ['show', `${ref}:${path}`]);
	if (!res.ok) return null;
	try {
		return JSON.parse(res.stdout) as ToolsFile;
	} catch {
		return null;
	}
}

function extractTools(data: ToolsFile): Record<string, Tool> {
	const tools: Record<string, Tool> = {};
	for (const category of data.categories ?? []) {
		for (const [pkgName, pkgData] of Object.entries(category.tools ?? {})) {
			tools[pkgName] = pkgData;
		}
	}
	return tools;
}

function main(): void {
	const { values } = parseArgs({
		options: {
			base: { type: 'string', default: 'origin/main' },
			path: { type: 'string', default: 'tools.json' },
		},
		strict: false,
	});

	const base = values.base as string;
	const path = values.path as string;

	const baseData = getJsonAtRef(base, path);
	if (!baseData) {
		console.error(`Error: could not read ${path} at ${base}`);
		process.exit(1);
	}

	let headData: ToolsFile;
	try {
		headData = JSON.parse(readFileSync(path, 'utf8')) as ToolsFile;
	} catch (err) {
		console.error(`Error: could not read ${path}: ${(err as Error).message}`);
		process.exit(1);
	}

	const baseTools = extractTools(baseData);
	const headTools = extractTools(headData);

	const added = Object.entries(headTools).filter(([pkg]) => !(pkg in baseTools));

	if (added.length === 0) {
		console.error('No new tools detected.');
		process.exit(2);
	}

	const output = added.map(([pkg, data]) => ({
		package: pkg,
		execs: data.execs ?? [],
	}));

	process.stdout.write(JSON.stringify(output) + '\n');
}

main();
