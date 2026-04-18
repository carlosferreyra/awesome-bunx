#!/usr/bin/env -S bun run
// @ts-nocheck
// /// script
// runtime = "bun >=1.1"
// dependencies = []
// ///
/**
 * Fetch latest release info from the npm registry for each tool
 * and update tools.json in place.
 *
 * Usage:
 *   bun run scripts/latest_release.ts
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TOOLS_JSON = resolve(__dirname, '..', 'tools.json');
const REGISTRY_URL = (name: string) =>
	`https://registry.npmjs.org/${encodeURIComponent(name).replace(/%2F/g, '/')}`;

type Tool = {
	description: string;
	url: string;
	execs: string[];
	examples?: { cmd: string; description?: string }[];
	version?: string;
	last_release?: string;
	npm?: boolean;
};
type Category = { name: string; slug: string; tools: Record<string, Tool> };
type ToolsFile = { categories: Category[] };

async function fetchLatest(pkg: string): Promise<{ version: string; date: string | null } | null> {
	const url = REGISTRY_URL(pkg);
	try {
		const res = await fetch(url, {
			headers: { Accept: 'application/json' },
			signal: AbortSignal.timeout(15_000),
		});
		if (!res.ok) {
			console.warn(`Failed to fetch ${pkg}: HTTP ${res.status}`);
			return null;
		}
		const info = (await res.json()) as {
			'dist-tags'?: Record<string, string>;
			'time'?: Record<string, string>;
		};
		const version = info['dist-tags']?.latest;
		if (!version) return null;
		const t = info.time?.[version];
		const date = t ? t.slice(0, 10) : null;
		return { version, date };
	} catch (err) {
		console.warn(`Failed to fetch ${pkg}: ${(err as Error).message}`);
		return null;
	}
}

async function main(): Promise<void> {
	const data = JSON.parse(readFileSync(TOOLS_JSON, 'utf8')) as ToolsFile;

	for (const category of data.categories) {
		for (const [name, tool] of Object.entries(category.tools)) {
			if (tool.npm === false) {
				console.log(`Skipping ${name} (npm=false)`);
				continue;
			}

			const result = await fetchLatest(name);
			if (!result) continue;

			tool.version = result.version;
			if (result.date) tool.last_release = result.date;
			console.log(`${name.padEnd(40)} ${result.version}  ${result.date ?? ''}`);
		}
	}

	writeFileSync(TOOLS_JSON, JSON.stringify(data, null, 2) + '\n');
	console.log('tools.json updated.');
}

await main();
