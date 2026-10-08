# Awesome BUNX

<div align="center">
    <img width="500" height="350" src="https://github.com/sindresorhus/awesome/raw/main/media/logo.svg" alt="Awesome">
    <br>
    <a href="https://awesome.re">
        <img src="https://awesome.re/badge.svg" alt="Awesome">
    </a>
    <p>A collection of Awesome JavaScript / TypeScript CLI Tools available from BUNX/NPX.</p>
    <p>you can use this list to find useful JavaScript and TypeScript CLI tools that are available
    for one-off execution via <code>bunx</code> or <code>npx</code>. The list is curated and
    maintained by the community, so feel free to contribute by adding your own favorite tools.</p>
    <p>
        <img src="https://img.shields.io/github/contributors/carlosferreyra/awesome-bunx" alt="Contributors">
        <img src="https://img.shields.io/github/license/carlosferreyra/awesome-bunx" alt="License">
        <img src="https://badges.pufler.dev/visits/carlosferreyra/awesome-bunx" alt="Visits">
        <img src="https://img.shields.io/github/stars/carlosferreyra/awesome-bunx" alt="Stars">
    </p>
    <a href="https://github.com/carlosferreyra/awesome-bunx/actions/workflows/ci.yml">
        <img src="https://github.com/carlosferreyra/awesome-bunx/actions/workflows/ci.yml/badge.svg" alt="Catalog Validation and Tool Checks">
    </a>
</div>

Inspired by <a href="https://github.com/carlosferreyra/awesome-uvx">awesome-uvx</a>,
<a href="https://github.com/carlosferreyra/awesome-cargo-install">awesome-cargo-install</a> and
<a href="https://github.com/oven-sh/awesome-bun">awesome-bun</a>.

**79 tools across 18 categories.**

## Contents


- [Build Tools & Bundlers](#build-tools-and-bundlers) (5)
- [Code Quality & Linters](#code-quality-and-linters) (5)
- [CSS & Styling Tools](#css-and-styling-tools) (5)
- [Database Tools](#database-tools) (4)
- [Deployment & Hosting](#deployment-and-hosting) (6)
- [Development Tools](#development-tools) (5)
- [Documentation](#documentation) (3)
- [Frontend Frameworks & Tools](#frontend-frameworks-and-tools) (6)
- [Package Management](#package-management) (5)
- [API & HTTP Tools](#api-and-http-tools) (4)
- [Scaffolding & Generators](#scaffolding-and-generators) (5)
- [Security](#security) (3)
- [Testing & Quality](#testing-and-quality) (5)
- [TypeScript Tools](#typescript-tools) (3)
- [Performance & Monitoring](#performance-and-monitoring) (4)
- [Utilities](#utilities) (5)
- [Version Control & Git](#version-control-and-git) (4)
- [Miscellaneous](#miscellaneous) (2)


<a id="build-tools-and-bundlers"></a>

## Build Tools & Bundlers

| Name | Description | Executable(s) | Latest Release |
|:-----|:------------|:--------------|:--------------|
| [esbuild](https://esbuild.github.io/) | Extremely fast JavaScript and CSS bundler and minifier | `esbuild` | 0.28.2<br>2026-08-08 |
| [parcel](https://parceljs.org/) | Zero-configuration build tool for the web | `parcel` | 2.16.4<br>2026-02-02 |
| [rollup](https://rollupjs.org/) | Next-generation module bundler for JavaScript libraries | `rollup` | 4.64.0<br>2026-10-02 |
| [tsup](https://tsup.egoist.dev/) | Bundle TypeScript libraries with zero config, powered by esbuild | `tsup` | 8.5.1<br>2025-11-12 |
| [vite](https://vitejs.dev/) | Next generation frontend tooling — instant dev server and optimized builds | `vite` | 8.3.2<br>2026-10-01 |


<details>
<summary>esbuild examples</summary>

Bundle a TypeScript entry into a single JS file

```sh
bunx esbuild src/index.ts --bundle --outfile=dist/bundle.js
```

</details>


<details>
<summary>vite examples</summary>

Start the Vite dev server in the current project

```sh
bunx vite
```

Produce a production build

```sh
bunx vite build
```

</details>



<a id="code-quality-and-linters"></a>

## Code Quality & Linters

| Name | Description | Executable(s) | Latest Release |
|:-----|:------------|:--------------|:--------------|
| [@biomejs/biome](https://biomejs.dev/) | Fast formatter and linter for JavaScript, TypeScript, JSON and more | `biome` | 2.5.15<br>2026-09-30 |
| [eslint](https://eslint.org/) | Pluggable static analyzer for JavaScript and TypeScript | `eslint` | 10.12.0<br>2026-10-02 |
| [oxlint](https://oxc.rs/docs/guide/usage/linter.html) | Fast JavaScript/TypeScript linter written in Rust | `oxlint` | 1.87.0<br>2026-10-05 |
| [prettier](https://prettier.io/) | Opinionated code formatter supporting many languages | `prettier` | 3.9.9<br>2026-09-23 |
| [standard](https://standardjs.com/) | JavaScript style guide, linter, and formatter — zero config | `standard` | 17.1.2<br>2024-09-13 |


<details>
<summary>@biomejs/biome examples</summary>

Lint and format the current project in one pass

```sh
bunx --package @biomejs/biome biome check .
```

</details>


<details>
<summary>prettier examples</summary>

Format every supported file in the project

```sh
bunx prettier --write .
```

</details>



<a id="css-and-styling-tools"></a>

## CSS & Styling Tools

| Name | Description | Executable(s) | Latest Release |
|:-----|:------------|:--------------|:--------------|
| [autoprefixer](https://github.com/postcss/autoprefixer) | PostCSS plugin to parse CSS and add vendor prefixes | `autoprefixer` | 10.6.1<br>2026-09-15 |
| [postcss-cli](https://github.com/postcss/postcss-cli) | Command line interface for PostCSS | `postcss` | 12.0.0<br>2026-09-04 |
| [sass](https://sass-lang.com/) | Reference implementation of Sass written in Dart | `sass` | 1.105.1<br>2026-09-29 |
| [stylelint](https://stylelint.io/) | Modern, powerful linter that helps you avoid errors and enforce CSS conventions | `stylelint` | 17.16.0<br>2026-10-01 |
| [tailwindcss](https://tailwindcss.com/) | Utility-first CSS framework with a standalone CLI | `tailwindcss` | 4.3.3<br>2026-07-16 |


<details>
<summary>sass examples</summary>

Compile a Sass file to CSS

```sh
bunx sass input.scss output.css
```

</details>


<details>
<summary>tailwindcss examples</summary>

Watch and compile Tailwind styles to a CSS file

```sh
bunx tailwindcss -i ./src/input.css -o ./dist/output.css --watch
```

</details>



<a id="database-tools"></a>

## Database Tools

| Name | Description | Executable(s) | Latest Release |
|:-----|:------------|:--------------|:--------------|
| [drizzle-kit](https://orm.drizzle.team/) | CLI companion for Drizzle ORM — migrations and schema management | `drizzle-kit` | 0.31.11<br>2026-09-21 |
| [knex](https://knexjs.org/) | SQL query builder and migration tool for Node.js | `knex` | 3.3.0<br>2026-06-26 |
| [prisma](https://www.prisma.io/) | Next-generation Node.js and TypeScript ORM with a migration CLI | `prisma` | 8.0.0-rc.19<br>2026-09-29 |
| [sequelize-cli](https://github.com/sequelize/cli) | Command-line interface for Sequelize ORM | `sequelize` | 6.6.5<br>2026-01-05 |


<details>
<summary>prisma examples</summary>

Scaffold a new Prisma schema and .env

```sh
bunx prisma init
```

Create and apply a new development migration

```sh
bunx prisma migrate dev
```

</details>



<a id="deployment-and-hosting"></a>

## Deployment & Hosting

| Name | Description | Executable(s) | Latest Release |
|:-----|:------------|:--------------|:--------------|
| [firebase-tools](https://github.com/firebase/firebase-tools) | Firebase command-line interface | `firebase` | 15.32.1<br>2026-09-30 |
| [netlify-cli](https://docs.netlify.com/cli/get-started/) | Netlify command-line tool for local development and deployment | `netlify`, `ntl` | 27.11.0<br>2026-10-05 |
| [serverless](https://www.serverless.com/) | Build and deploy serverless applications to any cloud | `serverless`, `sls` | 4.43.0<br>2026-09-24 |
| [sst](https://sst.dev/) | Build full-stack apps on your own infrastructure | `sst` | 4.17.1<br>2026-07-12 |
| [vercel](https://vercel.com/docs/cli) | Deploy and manage projects on the Vercel platform | `vercel`, `vc` | 62.2.0<br>2026-10-02 |
| [wrangler](https://developers.cloudflare.com/workers/wrangler/) | Command-line tool for building with Cloudflare Workers and Pages | `wrangler` | 4.147.0<br>2026-10-02 |


<details>
<summary>vercel examples</summary>

Deploy the current directory to a preview URL

```sh
bunx vercel
```

</details>



<a id="development-tools"></a>

## Development Tools

| Name | Description | Executable(s) | Latest Release |
|:-----|:------------|:--------------|:--------------|
| [concurrently](https://github.com/open-cli-tools/concurrently) | Run multiple commands concurrently, with prefixed output | `concurrently` | 10.0.5<br>2026-08-15 |
| [cross-env](https://github.com/kentcdodds/cross-env) | Cross-platform utility for setting environment variables | `cross-env`, `cross-env-shell` | 10.1.0<br>2025-09-29 |
| [dotenv-cli](https://github.com/entropitor/dotenv-cli) | Run a command with environment variables loaded from a .env file | `dotenv` | 11.0.0<br>2025-10-28 |
| [nodemon](https://nodemon.io/) | Automatically restart a Node.js app when files change | `nodemon` | 3.1.14<br>2026-02-20 |
| [npm-run-all](https://github.com/mysticatea/npm-run-all) | Run multiple npm-scripts in parallel or sequentially | `npm-run-all`, `run-p`, `run-s` | 4.1.5<br>2018-11-24 |



<a id="documentation"></a>

## Documentation

| Name | Description | Executable(s) | Latest Release |
|:-----|:------------|:--------------|:--------------|
| [@11ty/eleventy](https://www.11ty.dev/) | Simpler static site generator | `eleventy` | 3.1.6<br>2026-06-02 |
| [typedoc](https://typedoc.org/) | API documentation generator for TypeScript projects | `typedoc` | 0.28.20<br>2026-07-05 |
| [vitepress](https://vitepress.dev/) | Vite-powered static site generator for technical documentation | `vitepress` | 1.6.4<br>2025-08-05 |


<details>
<summary>@11ty/eleventy examples</summary>

Build and serve an Eleventy site locally

```sh
bunx --package @11ty/eleventy eleventy --serve
```

</details>


<details>
<summary>vitepress examples</summary>

Scaffold a new VitePress documentation site

```sh
bunx vitepress init
```

</details>



<a id="frontend-frameworks-and-tools"></a>

## Frontend Frameworks & Tools

| Name | Description | Executable(s) | Latest Release |
|:-----|:------------|:--------------|:--------------|
| [astro](https://astro.build/) | All-in-one web framework for content-driven sites | `astro` | 7.3.5<br>2026-09-24 |
| [create-astro](https://docs.astro.build/en/install-and-setup/) | Scaffold a new Astro project | `create-astro` | 5.2.4<br>2026-08-24 |
| [next](https://nextjs.org/) | The React Framework for production-grade applications | `next` | 16.3.8<br>2026-09-30 |
| [nuxi](https://nuxt.com/docs/api/commands/) | Command-line interface for the Nuxt framework | `nuxi` | 3.37.0<br>2026-07-14 |
| [storybook](https://storybook.js.org/) | Build and document UI components in isolation | `storybook` | 10.6.1<br>2026-09-29 |
| [sv](https://svelte.dev/docs/cli/overview) | Official Svelte CLI — scaffold and manage SvelteKit projects | `sv` | 1.1.0<br>2026-10-04 |


<details>
<summary>sv examples</summary>

Create a new SvelteKit project

```sh
bunx sv create my-app
```

</details>



<a id="package-management"></a>

## Package Management

| Name | Description | Executable(s) | Latest Release |
|:-----|:------------|:--------------|:--------------|
| [depcheck](https://github.com/depcheck/depcheck) | Detect unused dependencies in a project | `depcheck` | 1.4.7<br>2023-10-17 |
| [npkill](https://npkill.js.org/) | Find and remove node_modules directories to free disk space | `npkill` | 0.12.2<br>2024-06-08 |
| [npm-check](https://github.com/dylang/npm-check) | Check for outdated, incorrect and unused dependencies | `npm-check` | 6.0.1<br>2022-07-16 |
| [npm-check-updates](https://github.com/raineorshine/npm-check-updates) | Upgrade package.json dependencies to the latest versions | `ncu`, `npm-check-updates` | 23.1.0<br>2026-08-23 |
| [taze](https://github.com/antfu/taze) | Modern cli tool that keeps deps fresh | `taze` | 21.3.0<br>2026-09-30 |


<details>
<summary>npm-check-updates examples</summary>

Upgrade all dependencies in package.json to the latest

```sh
bunx npm-check-updates -u
```

</details>



<a id="api-and-http-tools"></a>

## API & HTTP Tools

| Name | Description | Executable(s) | Latest Release |
|:-----|:------------|:--------------|:--------------|
| [@openapitools/openapi-generator-cli](https://openapi-generator.tech/) | Generate API clients, server stubs, and documentation from OpenAPI specs | `openapi-generator-cli` | 2.41.0<br>2026-08-24 |
| [json-server](https://github.com/typicode/json-server) | Full fake REST API with zero coding in seconds | `json-server` | 1.0.0-beta.15<br>2026-03-23 |
| [newman](https://github.com/postmanlabs/newman) | Command-line collection runner for Postman | `newman` | 6.2.2<br>2026-01-16 |
| [swagger-cli](https://github.com/APIDevTools/swagger-cli) | Validate, bundle, and manage Swagger/OpenAPI files | `swagger-cli` | 4.0.4<br>2020-07-19 |


<details>
<summary>@openapitools/openapi-generator-cli examples</summary>

Generate a TypeScript Axios client from an OpenAPI spec

```sh
bunx --package @openapitools/openapi-generator-cli openapi-generator-cli generate -i spec.yaml -g typescript-axios -o ./client
```

</details>



<a id="scaffolding-and-generators"></a>

## Scaffolding & Generators

| Name | Description | Executable(s) | Latest Release |
|:-----|:------------|:--------------|:--------------|
| [create-next-app](https://nextjs.org/docs/api-reference/create-next-app) | Scaffold a new Next.js application with one command | `create-next-app` | 16.3.8<br>2026-09-30 |
| [create-t3-app](https://create.t3.gg/) | Interactive CLI to start a typesafe Next.js app (the T3 Stack) | `create-t3-app` | 7.40.0<br>2025-11-05 |
| [create-vite](https://vitejs.dev/guide/) | Scaffold a new Vite project from an interactive prompt | `create-vite` | 9.2.1<br>2026-09-10 |
| [degit](https://github.com/Rich-Harris/degit) | Straightforward project scaffolding via git repository cloning | `degit` | 3.10.0<br>2026-09-06 |
| [plop](https://plopjs.com/) | Micro-generator framework for consistent code scaffolding | `plop` | 4.0.5<br>2026-01-22 |


<details>
<summary>create-next-app examples</summary>

Create a new Next.js project named my-app

```sh
bunx create-next-app@latest my-app
```

</details>



<a id="security"></a>

## Security

| Name | Description | Executable(s) | Latest Release |
|:-----|:------------|:--------------|:--------------|
| [audit-ci](https://github.com/IBM/audit-ci) | Audit dependencies in CI and fail on high-severity vulnerabilities | `audit-ci` | 7.1.0<br>2024-07-03 |
| [retire](https://retirejs.github.io/retire.js/) | Scanner detecting the use of JavaScript libraries with known vulnerabilities | `retire` | 5.7.0<br>2026-08-22 |
| [snyk](https://snyk.io/) | Find, fix, and monitor vulnerabilities in open source dependencies | `snyk` | 1.1307.4<br>2026-09-23 |



<a id="testing-and-quality"></a>

## Testing & Quality

| Name | Description | Executable(s) | Latest Release |
|:-----|:------------|:--------------|:--------------|
| [cypress](https://www.cypress.io/) | End-to-end testing framework for anything that runs in a browser | `cypress` | 16.1.1<br>2026-09-29 |
| [jest](https://jestjs.io/) | Delightful JavaScript testing framework with a focus on simplicity | `jest` | 30.5.2<br>2026-09-18 |
| [mocha](https://mochajs.org/) | Feature-rich JavaScript test framework running on Node.js | `mocha`, `_mocha` | 12.0.3<br>2026-10-01 |
| [playwright](https://playwright.dev/) | Reliable end-to-end testing across all modern browsers | `playwright` | 1.63.0<br>2026-09-04 |
| [vitest](https://vitest.dev/) | Blazing fast unit-test framework powered by Vite | `vitest` | 5.0.3<br>2026-09-30 |


<details>
<summary>playwright examples</summary>

Install the browser binaries required by Playwright

```sh
bunx playwright install
```

</details>



<a id="typescript-tools"></a>

## TypeScript Tools

| Name | Description | Executable(s) | Latest Release |
|:-----|:------------|:--------------|:--------------|
| [ts-node](https://typestrong.org/ts-node/) | TypeScript execution and REPL for Node.js | `ts-node`, `ts-node-esm`, `ts-node-script`, `ts-node-transpile-only` | 10.9.2<br>2023-12-08 |
| [tsx](https://tsx.is/) | Run TypeScript and ESM files directly — drop-in node replacement | `tsx` | 4.23.15<br>2026-09-20 |
| [typescript](https://www.typescriptlang.org/) | TypeScript language compiler and language server | `tsc`, `tsserver` | 7.0.2<br>2026-07-08 |


<details>
<summary>typescript examples</summary>

Generate a tsconfig.json in the current directory

```sh
bunx tsc --init
```

</details>



<a id="performance-and-monitoring"></a>

## Performance & Monitoring

| Name | Description | Executable(s) | Latest Release |
|:-----|:------------|:--------------|:--------------|
| [clinic](https://clinicjs.org/) | Diagnose Node.js performance issues with flame graphs and heap analysis | `clinic` | 13.0.0<br>2023-06-28 |
| [lighthouse](https://developer.chrome.com/docs/lighthouse/overview) | Automated tool for improving quality of web pages | `lighthouse`, `chrome-debug`, `smokehouse` | 13.5.0<br>2026-09-18 |
| [size-limit](https://github.com/ai/size-limit) | Keep your JavaScript and CSS bundle size small | `size-limit` | 14.1.0<br>2026-09-27 |
| [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) | Visualize the size of webpack output files with an interactive treemap | `webpack-bundle-analyzer` | 5.4.0<br>2026-09-17 |


<details>
<summary>lighthouse examples</summary>

Run an audit on a URL and open the report in the browser

```sh
bunx lighthouse https://example.com --view
```

</details>



<a id="utilities"></a>

## Utilities

| Name | Description | Executable(s) | Latest Release |
|:-----|:------------|:--------------|:--------------|
| [http-server](https://github.com/http-party/http-server) | Simple, zero-configuration command-line HTTP server | `http-server`, `hs` | 14.1.1<br>2022-05-31 |
| [kill-port](https://github.com/tiaanduplessis/kill-port) | Kill the process bound to a given port | `kill-port` | 2.0.1<br>2022-06-21 |
| [localtunnel](https://theboroer.github.io/localtunnel-www/) | Expose your localhost to the world for easy testing and sharing | `lt` | 2.0.2<br>2021-09-18 |
| [npkg](https://github.com/cutenode/npkg) | Inspect packages from the npm registry from the terminal | `npkg` | 0.0.6<br>2011-10-04 |
| [serve](https://github.com/vercel/serve) | Static file serving and directory listing | `serve` | 14.2.6<br>2026-03-03 |


<details>
<summary>kill-port examples</summary>

Kill whatever process is listening on port 3000

```sh
bunx kill-port 3000
```

</details>


<details>
<summary>serve examples</summary>

Serve the contents of a build directory over HTTP

```sh
bunx serve ./dist
```

</details>



<a id="version-control-and-git"></a>

## Version Control & Git

| Name | Description | Executable(s) | Latest Release |
|:-----|:------------|:--------------|:--------------|
| [commitizen](https://commitizen-tools.github.io/commitizen/) | Create commits that follow a specified format — interactive CLI | `cz`, `git-cz`, `commitizen` | 4.3.2<br>2026-06-12 |
| [husky](https://typicode.github.io/husky/) | Modern native Git hooks made easy | `husky` | 9.1.7<br>2024-11-18 |
| [lint-staged](https://github.com/lint-staged/lint-staged) | Run linters against staged git files | `lint-staged` | 17.6.0<br>2026-09-26 |
| [semantic-release](https://semantic-release.gitbook.io/) | Fully automated version management and package publishing | `semantic-release` | 25.0.9<br>2026-08-05 |



<a id="miscellaneous"></a>

## Miscellaneous

| Name | Description | Executable(s) | Latest Release |
|:-----|:------------|:--------------|:--------------|
| [cowsay](https://github.com/piuccio/cowsay) | Configurable talking cow (and other characters) for the terminal | `cowsay`, `cowthink` | 1.6.0<br>2024-01-26 |
| [figlet-cli](https://github.com/patorjk/figlet-cli) | Create large ASCII text banners in the terminal | `figlet` | 0.3.0<br>2025-04-12 |


<details>
<summary>cowsay examples</summary>

Print a cow saying a message

```sh
bunx cowsay Hello from bunx
```

</details>




## Contributing

Feel free to contribute by opening a pull request with your favorite JavaScript / TypeScript CLI
tools that can be run via `bunx` or `npx`!
Please make sure to follow the <a href="CONTRIBUTING.md">contribution guidelines</a> and adhere to the <a href="CODE_OF_CONDUCT.md">code of conduct</a>.
Please also check the <a href="https://github.com/carlosferreyra/awesome-bunx/issues">issues</a> for any open issues or discussions related to the project.

## License

This project is licensed under the MIT License - see the <a href="LICENSE">LICENSE</a> file for details.
