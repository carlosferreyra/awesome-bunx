"""Exercise failed tool probes without installing or executing catalog packages."""
import json
import os
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]
RUNNER = shutil.which('bun')
SCRIPT = ['run', str(ROOT / 'scripts/test_clients.ts')]


class ToolFailureTests(unittest.TestCase):
    def probe(self, behavior):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            for name in ['uv', 'bun']:
                binary = root / name
                binary.write_text('#!/bin/sh\nif [ "$1" = "--version" ]; then echo fixture; exit 0; fi\necho "HTTP 403 Forbidden" >&2\nexit 1\n')
                binary.chmod(0o755)
            for name in ['uvx', 'bunx']:
                binary = root / name
                binary.write_text('#!/bin/sh\n' + behavior)
                binary.chmod(0o755)
            report = root / 'report.json'
            result = subprocess.run([RUNNER, *SCRIPT, '--tools',
                json.dumps([{'package': 'fixture', 'execs': ['fixture']}]), '--output', str(report)],
                cwd=root, env=dict(os.environ, PATH=str(root) + os.pathsep + os.environ['PATH']),
                capture_output=True, text=True)
            return result, json.loads(report.read_text()) if report.exists() else []

    def test_permission_denied_is_a_failure_with_original_diagnostics(self):
        result, report = self.probe('echo "HTTP 403 Forbidden" >&2\nexit 1\n')
        self.assertEqual(result.returncode, 1, result.stdout + result.stderr)
        self.assertIn('403 Forbidden', report[0]['details'])
        self.assertIn('403 Forbidden', result.stderr)
        self.assertFalse(report[0]['success'])

    def test_nonzero_usage_output_is_not_a_success(self):
        result, report = self.probe('echo "Usage: fixture"\nexit 1\n')
        self.assertEqual(result.returncode, 1)
        self.assertIn('Usage: fixture', report[0]['details'])

    def test_cross_env_style_no_argument_fallback_still_works(self):
        result, report = self.probe('case "$*" in *--help*) echo "spawn --help ENOENT" >&2; exit 1;; esac\nexit 0\n')
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        self.assertEqual(report, [])


if __name__ == '__main__':
    unittest.main()
