#!/usr/bin/env -S bun run
// @ts-nocheck
/**
 * Validate tools.json against the expected schema.
 *
 * Usage:
 *   bun run scripts/checks.ts
 */
import { appendFileSync, existsSync, readFileSync, unlinkSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TOOLS_PATH = resolve(__dirname, '..', 'tools.json');
const LOG_PATH = resolve(process.cwd(), 'checks.log');

type ToolExample = { cmd?: string; description?: string };
type Tool = {
	description?: string;
	url?: string;
	execs?: string[];
	examples?: ToolExample[];
	version?: string;
	last_release?: string;
};
type Category = { name?: string; slug?: string; tools?: Record<string, Tool> };

function log(level: 'INFO' | 'ERROR', msg: string): void {
	const line = `${new Date().toISOString()} - ${level} - ${msg}\n`;
	appendFileSync(LOG_PATH, line);
	if (level === 'ERROR') console.error(msg);
	else console.log(msg);
}

function loadTools(path: string): Category[] {
	const raw = readFileSync(path, 'utf8');
	const data = JSON.parse(raw) as { categories?: Category[] };
	return data.categories ?? [];
}

function checkTools(): number {
	if (existsSync(LOG_PATH)) unlinkSync(LOG_PATH);

	let categories: Category[];
	try {
		categories = loadTools(TOOLS_PATH);
	} catch (err) {
		log('ERROR', `An error occurred: ${(err as Error).message}`);
		return 1;
	}

	let allValid = true;

	for (const category of categories) {
		const name = category.name ?? '<unnamed>';
		log('INFO', `Checking category: ${name}`);

		if (!category.slug) {
			allValid = false;
			log('ERROR', `Category '${name}' is missing 'slug'`);
		}

		const tools = category.tools ?? {};
		if (Object.keys(tools).length === 0) {
			allValid = false;
			log('ERROR', `Category '${name}' has no tools`);
			continue;
		}

		for (const [pkgName, pkgData] of Object.entries(tools)) {
			const requiredFields: (keyof Tool)[] = ['description', 'url', 'execs'];
			const missing = requiredFields.filter((f) => !(f in pkgData));

			if (missing.length > 0) {
				allValid = false;
				log(
					'ERROR',
					`Tool '${pkgName}' in '${name}' is missing required fields: ${missing.join(', ')}`
				);
				continue;
			}

			for (const field of requiredFields) {
				const value = pkgData[field];
				const empty =
					value === undefined ||
					value === null ||
					value === '' ||
					(Array.isArray(value) && value.length === 0);
				if (empty) {
					allValid = false;
					log('ERROR', `Tool '${pkgName}' in '${name}' has empty '${field}'`);
				}
			}

			if (!Array.isArray(pkgData.execs) || pkgData.execs.length === 0) {
				allValid = false;
				log('ERROR', `Tool '${pkgName}' in '${name}' must have at least one executable in 'execs'`);
			}

			if (!pkgData.url || !/^https?:\/\//.test(pkgData.url)) {
				allValid = false;
				log('ERROR', `Tool '${pkgName}' in '${name}' has invalid URL format`);
			}

			if (pkgData.examples !== undefined) {
				if (!Array.isArray(pkgData.examples)) {
					allValid = false;
					log('ERROR', `Tool '${pkgName}' in '${name}': 'examples' must be a list`);
				} else {
					pkgData.examples.forEach((example, i) => {
						if (typeof example !== 'object' || example === null) {
							allValid = false;
							log('ERROR', `Tool '${pkgName}' in '${name}': examples[${i}] must be an object`);
							return;
						}
						if (!example.cmd) {
							allValid = false;
							log('ERROR', `Tool '${pkgName}' in '${name}': examples[${i}] is missing 'cmd'`);
						}
					});
				}
			}
		}
	}

	if (allValid) {
		log('INFO', 'All checks passed successfully!');
		return 0;
	}
	log('ERROR', 'Some checks failed. Please review the logs.');
	return 1;
}

process.exit(checkTools());
