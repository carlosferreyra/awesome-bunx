// @ts-nocheck
/**
 * Render README.md from tools.json using the Nunjucks template
 * at template/README.md.j2.
 *
 * Dependencies are auto-installed by Bun on first run — see
 * https://bun.com/docs/runtime/auto-install.
 *
 * Usage:
 *   bun run scripts/readme.ts
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import nunjucks from 'nunjucks';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, '..');
const TOOLS_PATH = resolve(REPO_ROOT, 'tools.json');
const TEMPLATE_DIR = resolve(REPO_ROOT, 'template');
const TEMPLATE_NAME = 'README.md.j2';
const README_PATH = resolve(REPO_ROOT, 'README.md');

type Tool = {
	description: string;
	url: string;
	execs: string[];
	examples?: { cmd: string; description?: string }[];
	version?: string;
	last_release?: string;
};
type Category = {
	name: string;
	slug: string;
	tools: Record<string, Tool>;
};

function loadCategories(): Category[] {
	const raw = readFileSync(TOOLS_PATH, 'utf8');
	return (JSON.parse(raw) as { categories: Category[] }).categories;
}

function sortTools(tools: Record<string, Tool>): [string, Tool][] {
	return Object.entries(tools).sort(([a], [b]) => a.toLowerCase().localeCompare(b.toLowerCase()));
}

function generateReadme(): void {
	const categories = loadCategories();

	const rendered = categories.map((cat) => ({
		...cat,
		tools: sortTools(cat.tools),
	}));

	const totalTools = rendered.reduce((acc, cat) => acc + cat.tools.length, 0);

	const env = nunjucks.configure(TEMPLATE_DIR, {
		autoescape: false,
		trimBlocks: false,
		lstripBlocks: false,
	});
	env.addFilter('escape_pipe', (s: string) => s.replace(/\|/g, '\\|'));

	const content = env.render(TEMPLATE_NAME, {
		categories: rendered,
		total_tools: totalTools,
	});

	writeFileSync(README_PATH, content);
	console.log(`Successfully generated README at ${README_PATH}`);
}

try {
	generateReadme();
} catch (err) {
	const e = err as NodeJS.ErrnoException;
	if (e.code === 'ENOENT') {
		console.error(`Error: Could not find required file: ${e.path}`);
	} else {
		console.error(`Error: ${e.message}`);
	}
	process.exit(1);
}
