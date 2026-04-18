#!/usr/bin/env -S bun run
// @ts-nocheck
/**
 * Emit a JSON array of all tools in tools.json, formatted for test_clients.ts.
 *
 * Usage:
 *   bun run scripts/build_tools_list.ts
 *
 * Output:
 *   [{"package":"eslint","execs":["eslint"]},...]
 */
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TOOLS_PATH = resolve(__dirname, '..', 'tools.json');

type Tool = { execs: string[] };
type Category = { tools: Record<string, Tool> };

const data = JSON.parse(readFileSync(TOOLS_PATH, 'utf8')) as { categories: Category[] };
const tools = data.categories.flatMap((c) =>
	Object.entries(c.tools).map(([k, v]) => ({ package: k, execs: v.execs }))
);

process.stdout.write(JSON.stringify(tools));
