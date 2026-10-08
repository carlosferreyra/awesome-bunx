import { afterEach, expect, test } from 'bun:test';
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const repo = resolve(import.meta.dir, '..');
const directories: string[] = [];
const workflow = readFileSync(join(repo, '.github/workflows/sync_releases.yml'), 'utf8');

afterEach(() => {
	for (const directory of directories.splice(0)) rmSync(directory, { recursive: true, force: true });
});

function temporary(): string {
	const directory = mkdtempSync(join(tmpdir(), 'bunx-maintenance-'));
	directories.push(directory);
	return directory;
}

function fixture(): string {
	const root = temporary();
	for (const directory of ['scripts', 'template']) mkdirSync(join(root, directory));
	for (const file of ['scripts/readme.ts', 'scripts/latest_release.ts', 'scripts/checks.ts',
		'template/README.md.j2', 'tools.json', 'bunfig.toml']) {
		writeFileSync(join(root, file), readFileSync(join(repo, file)));
	}
	return root;
}

function run(root: string, cmd: string[], env = {}) {
	const result = Bun.spawnSync(cmd, { cwd: root, env: { ...process.env, ...env } });
	return { code: result.exitCode, out: result.stdout.toString(), err: result.stderr.toString() };
}

function git(root: string, ...args: string[]): string {
	const result = run(root, ['git', ...args]);
	expect(result.code, result.err).toBe(0);
	return result.out.trim();
}

function step(name: string): string {
	const body = workflow.split(`      - name: ${name}\n`)[1].split('\n      - name:')[0];
	const command = body.split('        run: ')[1];
	if (!command.startsWith('|\n')) return command.trim();
	return command.slice(2).split('\n').map((line) => line.slice(10)).join('\n');
}

test('generation preserves the catalog, navigation, and examples; check mode never rewrites', () => {
	const root = fixture();
	expect(run(root, [process.execPath, 'run', 'scripts/readme.ts']).code).toBe(0);
	const generated = readFileSync(join(root, 'README.md'), 'utf8');
	expect(generated).toBe(readFileSync(join(repo, 'README.md'), 'utf8'));
	const { categories } = JSON.parse(readFileSync(join(root, 'tools.json'), 'utf8'));
	for (const category of categories) {
		expect(generated).toContain(`<a id="${category.slug}"></a>`);
		expect(generated).toContain(`](#${category.slug}) (${Object.keys(category.tools).length})`);
		for (const [name, tool] of Object.entries(category.tools) as [string, any][]) {
			expect(generated).toContain(`| [${name}](${tool.url}) |`);
			for (const exec of tool.execs) expect(generated).toContain('`' + exec + '`');
			for (const example of tool.examples ?? []) {
				expect(generated).toContain('```sh\n' + example.cmd + '\n```');
			}
		}
	}
	expect(run(root, [process.execPath, 'run', 'scripts/readme.ts', '--check']).code).toBe(0);
	expect(run(root, [process.execPath, 'run', 'scripts/readme.ts']).code).toBe(0);
	expect(readFileSync(join(root, 'README.md'), 'utf8')).toBe(generated);
	writeFileSync(join(root, 'README.md'), 'stale\n');
	const stale = run(root, [process.execPath, 'run', 'scripts/readme.ts', '--check']);
	expect(stale.code).toBe(1);
	expect(stale.err).toContain('README.md is stale');
	expect(readFileSync(join(root, 'README.md'), 'utf8')).toBe('stale\n');
});

test('table descriptions escape pipes and missing release dates stay empty', () => {
	const root = fixture();
	writeFileSync(join(root, 'tools.json'), JSON.stringify({ categories: [{ name: 'Fixture',
		slug: 'fixture', tools: { example: { description: 'one | two', url: 'https://example.com',
			execs: ['example'], version: '1.0.0' } } }] }));
	expect(run(root, [process.execPath, 'run', 'scripts/readme.ts']).code).toBe(0);
	expect(readFileSync(join(root, 'README.md'), 'utf8')).toContain(
		'| [example](https://example.com) | one \\| two | `example` | 1.0.0 |');
});

test('partial registry failure preserves old metadata and blocks workflow publication', async () => {
	const root = fixture();
	const server = Bun.serve({ port: 0, hostname: '127.0.0.1', fetch(request) {
		const path = decodeURIComponent(new URL(request.url).pathname);
		if (path === '/@scope/ok') return Response.json({ 'dist-tags': { latest: '2.0.0' },
			time: { '2.0.0': '2026-10-08T00:00:00Z' } });
		if (path === '/malformed') return Response.json({});
		return new Response('not found', { status: 404 });
	} });
	try {
		const tool = { description: 'Fixture', url: 'https://example.com', execs: ['fixture'],
			version: '1.0.0', last_release: '2025-01-01' };
		writeFileSync(join(root, 'tools.json'), JSON.stringify({ categories: [{ name: 'Fixture',
			slug: 'fixture', tools: { '@scope/ok': tool, missing: tool, malformed: tool,
				ignored: { ...tool, npm: false } } }] }));
		const source = readFileSync(join(root, 'scripts/latest_release.ts'), 'utf8');
		writeFileSync(join(root, 'scripts/latest_release.ts'), source.replace(
			'https://registry.npmjs.org/', `http://127.0.0.1:${server.port}/`));
		writeFileSync(join(root, 'README.md'), 'baseline README\n');
		git(root, 'init', '-b', 'main');
		git(root, '-c', 'user.name=Test', '-c', 'user.email=test@example.com',
			'add', 'tools.json', 'README.md');
		git(root, '-c', 'user.name=Test', '-c', 'user.email=test@example.com', 'commit', '-m', 'baseline');
		const before = git(root, 'rev-parse', 'HEAD');
		const commands = ['Validate catalog before sync', 'Fetch latest release info from npm',
			'Validate updated catalog', 'Generate and check README', 'Commit and push metadata changes'];
		const child = Bun.spawn(['bash', '-eo', 'pipefail', '-c', commands.map(step).join('\n')],
			{ cwd: root, stdout: 'pipe', stderr: 'pipe',
				env: { ...process.env, GITHUB_OUTPUT: join(root, 'output') } });
		const [out, err, code] = await Promise.all([
			new Response(child.stdout).text(), new Response(child.stderr).text(), child.exited]);
		expect(code, out + err).toBe(1);
		expect(err).toContain('sync incomplete: missing, malformed');
		const tools = JSON.parse(readFileSync(join(root, 'tools.json'), 'utf8')).categories[0].tools;
		expect(tools['@scope/ok'].version).toBe('2.0.0');
		expect(tools.missing).toEqual(tool);
		expect(tools.malformed).toEqual(tool);
		expect(tools.ignored).toEqual({ ...tool, npm: false });
		expect(readFileSync(join(root, 'README.md'), 'utf8')).toBe('baseline README\n');
		expect(git(root, 'rev-parse', 'HEAD')).toBe(before);
	} finally {
		server.stop(true);
	}
});

function publishingFixture() {
	const root = temporary();
	const remote = join(root, 'remote.git');
	const checkout = join(root, 'checkout');
	mkdirSync(checkout);
	git(root, 'init', '--bare', remote);
	git(checkout, 'init', '-b', 'main');
	git(checkout, 'config', 'user.name', 'Test');
	git(checkout, 'config', 'user.email', 'test@example.com');
	for (const file of ['tools.json', 'README.md', 'unrelated.txt']) writeFileSync(join(checkout, file), 'baseline\n');
	git(checkout, 'add', '.');
	git(checkout, 'commit', '-m', 'baseline');
	git(checkout, 'remote', 'add', 'origin', remote);
	git(checkout, 'push', '-u', 'origin', 'main');
	const output = join(root, 'output');
	return { root, remote, checkout, output, publish: () => run(checkout,
		['bash', '-eo', 'pipefail', '-c', step('Commit and push metadata changes')], { GITHUB_OUTPUT: output }) };
}

test('unchanged sync creates no commit', () => {
	const { checkout, output, publish } = publishingFixture();
	const before = git(checkout, 'rev-parse', 'HEAD');
	expect(publish().code).toBe(0);
	expect(git(checkout, 'rev-parse', 'HEAD')).toBe(before);
	expect(readFileSync(output, 'utf8')).toBe('changed=false\n');
});

test('publication commits only metadata and README, leaving unrelated edits alone', () => {
	const { remote, checkout, output, publish } = publishingFixture();
	for (const file of ['tools.json', 'README.md', 'unrelated.txt']) writeFileSync(join(checkout, file), 'changed\n');
	expect(publish().code).toBe(0);
	expect(git(checkout, 'diff-tree', '--no-commit-id', '--name-only', '-r', 'HEAD').split('\n'))
		.toEqual(['README.md', 'tools.json']);
	expect(git(checkout, 'status', '--porcelain')).toBe('M unrelated.txt');
	expect(git(checkout, '--git-dir', remote, 'rev-parse', 'main')).toBe(git(checkout, 'rev-parse', 'HEAD'));
	expect(readFileSync(output, 'utf8')).toBe('changed=true\n');
});

test('publication rejects a concurrent main update without overwriting it', () => {
	const { root, remote, checkout, publish } = publishingFixture();
	const other = join(root, 'other');
	git(root, 'clone', '-b', 'main', remote, other);
	writeFileSync(join(other, 'unrelated.txt'), 'concurrent change\n');
	git(other, '-c', 'user.name=Other', '-c', 'user.email=other@example.com', 'commit', '-am', 'concurrent');
	git(other, 'push', 'origin', 'main');
	const expected = git(other, 'rev-parse', 'HEAD');
	writeFileSync(join(checkout, 'tools.json'), 'metadata change\n');
	expect(publish().code).not.toBe(0);
	expect(git(root, '--git-dir', remote, 'rev-parse', 'main')).toBe(expected);
});
