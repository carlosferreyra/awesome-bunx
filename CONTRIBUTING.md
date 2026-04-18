# Contributing to Awesome BUNX

Thank you for your interest in contributing to Awesome BUNX! This document provides guidelines for
contributing to this curated list of JavaScript / TypeScript CLI tools runnable via `bunx` or `npx`.

## Adding a New Tool

To add a new CLI tool to the list:

1. The tool must be installable from the npm registry
2. The tool must be runnable via `bunx <package>` (or equivalently `npx <package>`)
3. The tool must be actively maintained
4. The tool should be useful for a general audience

### Required Information

Each tool entry needs:

- A unique package name (as it appears on npm)
- A brief, clear description
- A link to its documentation or repository
- A list of executable commands the package installs

### Where to Edit

All tool data lives in a single file at the root of the repository: **`tools.json`**.

The file has a top-level `"categories"` array. Find the category that best fits your tool and add
an entry to its `"tools"` object. If no existing category fits, you can propose a new one (see
below).

### JSON Format

```json
{
  "categories": [
    {
      "name": "Category Name",
      "slug": "category-slug",
      "tools": {
        "your-package-name": {
          "description": "Brief description of the tool",
          "url": "https://link-to-documentation-or-repo",
          "execs": ["executable1", "executable2"]
        }
      }
    }
  ]
}
```

**Field reference:**

| Field         | Required | Description                                                   |
| :------------ | :------: | :------------------------------------------------------------ |
| `description` | yes      | One-line description of what the tool does                    |
| `url`         | yes      | Link to official docs or repo (`http://` or `https://` only)  |
| `execs`       | yes      | Non-empty list of binary names installed by the package       |
| `examples`    | no       | List of example objects (see below)                           |

> **Tip:** The package name key is what gets passed to `bunx <package>`. If the binary name
> differs from the package name (e.g. package `@biomejs/biome` installs binary `biome`), make sure
> `execs` reflects the actual binary name and the examples use the explicit form:
> `bunx --package <package> <binary>`.

### Adding Examples

The `examples` field is optional but encouraged when the invocation is non-obvious — for example
when the package name differs from the binary, a subcommand is needed, or a specific flag is
required to do anything useful.

Each example is an object with a required `cmd` and an optional `description`:

```json
"your-package-name": {
  "description": "...",
  "url": "...",
  "execs": ["binary-name"],
  "examples": [
    {
      "cmd": "bunx your-package-name --some-flag",
      "description": "What this example does"
    }
  ]
}
```

**Example field reference:**

| Field         | Required | Description                                        |
| :------------ | :------: | :------------------------------------------------- |
| `cmd`         | yes      | Full shell command the user can copy and run       |
| `description` | no       | One-line explanation of what the command does      |

Guidelines for writing good examples:

- Prefer `bunx <package>` when the binary matches the package name
- Use `bunx --package <package> <binary>` when the binary differs from the package name
- Commands also work with `npx` — pick whichever runner you prefer for examples
- Prefer short, realistic commands over exhaustive flag lists
- Add multiple examples only when they demonstrate meaningfully different use cases

### Adding a New Category

If your tool doesn't fit any existing category, add a new object to the `"categories"` array:

```json
{
  "name": "Human Readable Name",
  "slug": "url-friendly-slug",
  "tools": { ... }
}
```

Keep the slug lowercase, hyphen-separated, and consistent with the name.

## Pull Request Process

1. Fork the repository
2. Create a new branch for your changes
3. Edit `tools.json` to add your tool to the appropriate category
4. Run `bun run scripts/checks.ts` locally to validate your changes
5. Make sure all checks pass
6. Create a pull request with a clear description of the tool you're adding

The GitHub Actions workflow will automatically validate `tools.json` on every PR.

## Validation Checks

Your contribution will be automatically checked for:

- Required fields (`description`, `url`, `execs`)
- Valid URL format (must start with `http://` or `https://`)
- Non-empty executable list
- Valid JSON structure
- Successful installation and invocation via `bunx`

## Code of Conduct

Please note that this project is released with a Code of Conduct. By participating in this project
you agree to abide by its terms.

## Questions

If you have questions about contributing, please:

1. Check existing issues
2. Create a new issue if needed
3. Tag it appropriately

## License

By contributing to this project, you agree that your contributions will be licensed under the MIT
License.
