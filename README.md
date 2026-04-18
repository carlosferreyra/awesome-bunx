# Awesome BUNX

<div align="center">
    <img width="500" height="350" src="https://github.com/oven-sh/awesome-bun/blob/main/awesome-bun.png" alt="Awesome">
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
        <img src="https://github.com/carlosferreyra/awesome-bunx/actions/workflows/ci.yml/badge.svg" alt="Validation and Sync">
    </a>
</div>

Inspired by <a href="https://github.com/carlosferreyra/awesome-uvx">awesome-uvx</a> and
<a href="https://github.com/oven-sh/awesome-bun">awesome-bun</a>.



- [Build Tools & Bundlers](#build-tools-and-bundlers)

- [Code Quality & Linters](#code-quality-and-linters)

- [CSS & Styling Tools](#css-and-styling-tools)

- [Database Tools](#database-tools)

- [Deployment & Hosting](#deployment-and-hosting)

- [Development Tools](#development-tools)

- [Documentation](#documentation)

- [Frontend Frameworks & Tools](#frontend-frameworks-and-tools)

- [Package Management](#package-management)

- [API & HTTP Tools](#api-and-http-tools)

- [Scaffolding & Generators](#scaffolding-and-generators)

- [Security](#security)

- [Testing & Quality](#testing-and-quality)

- [TypeScript Tools](#typescript-tools)

- [Performance & Monitoring](#performance-and-monitoring)

- [Utilities](#utilities)

- [Version Control & Git](#version-control-and-git)

- [Miscellaneous](#miscellaneous)



## Build Tools & Bundlers

| Name | Description | Executable(s) | Latest Release |
|:-----|:------------|:--------------|:--------------|
| [esbuild](https://esbuild.github.io/) | Extremely fast JavaScript and CSS bundler and minifier<br><details><summary><strong><a href="#">Examples</a></strong></summary><br>`bunx esbuild src/index.ts --bundle --outfile=dist/bundle.js` — Bundle a TypeScript entry into a single JS file<br></details> | ```esbuild``` | 0.28.0<br>2026-04-02 |
| [parcel](https://parceljs.org/) | Zero-configuration build tool for the web | ```parcel``` | 2.16.4<br>2026-02-02 |
| [rollup](https://rollupjs.org/) | Next-generation module bundler for JavaScript libraries | ```rollup``` | 4.60.2<br>2026-04-18 |
| [tsup](https://tsup.egoist.dev/) | Bundle TypeScript libraries with zero config, powered by esbuild | ```tsup``` | 8.5.1<br>2025-11-12 |
| [vite](https://vitejs.dev/) | Next generation frontend tooling — instant dev server and optimized builds<br><details><summary><strong><a href="#">Examples</a></strong></summary><br>`bunx vite` — Start the Vite dev server in the current project<br>`bunx vite build` — Produce a production build<br></details> | ```vite``` | 8.0.8<br>2026-04-09 |



## Code Quality & Linters

| Name | Description | Executable(s) | Latest Release |
|:-----|:------------|:--------------|:--------------|
| [@biomejs/biome](https://biomejs.dev/) | Fast formatter and linter for JavaScript, TypeScript, JSON and more<br><details><summary><strong><a href="#">Examples</a></strong></summary><br>`bunx --package @biomejs/biome biome check .` — Lint and format the current project in one pass<br></details> | ```biome``` | 2.4.12<br>2026-04-14 |
| [eslint](https://eslint.org/) | Pluggable static analyzer for JavaScript and TypeScript | ```eslint``` | 10.2.1<br>2026-04-17 |
| [oxlint](https://oxc.rs/docs/guide/usage/linter.html) | Fast JavaScript/TypeScript linter written in Rust | ```oxlint``` | 1.60.0<br>2026-04-13 |
| [prettier](https://prettier.io/) | Opinionated code formatter supporting many languages<br><details><summary><strong><a href="#">Examples</a></strong></summary><br>`bunx prettier --write .` — Format every supported file in the project<br></details> | ```prettier``` | 3.8.3<br>2026-04-15 |
| [standard](https://standardjs.com/) | JavaScript style guide, linter, and formatter — zero config | ```standard``` | 17.1.2<br>2024-09-13 |



## CSS & Styling Tools

| Name | Description | Executable(s) | Latest Release |
|:-----|:------------|:--------------|:--------------|
| [autoprefixer](https://github.com/postcss/autoprefixer) | PostCSS plugin to parse CSS and add vendor prefixes | ```autoprefixer``` | 10.5.0<br>2026-04-13 |
| [postcss-cli](https://github.com/postcss/postcss-cli) | Command line interface for PostCSS | ```postcss``` | 11.0.1<br>2025-03-12 |
| [sass](https://sass-lang.com/) | Reference implementation of Sass written in Dart<br><details><summary><strong><a href="#">Examples</a></strong></summary><br>`bunx sass input.scss output.css` — Compile a Sass file to CSS<br></details> | ```sass``` | 1.99.0<br>2026-04-02 |
| [stylelint](https://stylelint.io/) | Modern, powerful linter that helps you avoid errors and enforce CSS conventions | ```stylelint``` | 17.8.0<br>2026-04-15 |
| [tailwindcss](https://tailwindcss.com/) | Utility-first CSS framework with a standalone CLI<br><details><summary><strong><a href="#">Examples</a></strong></summary><br>`bunx tailwindcss -i ./src/input.css -o ./dist/output.css --watch` — Watch and compile Tailwind styles to a CSS file<br></details> | ```tailwindcss``` | 4.2.2<br>2026-03-18 |



## Database Tools

| Name | Description | Executable(s) | Latest Release |
|:-----|:------------|:--------------|:--------------|
| [drizzle-kit](https://orm.drizzle.team/) | CLI companion for Drizzle ORM — migrations and schema management | ```drizzle-kit``` | 0.31.10<br>2026-03-17 |
| [knex](https://knexjs.org/) | SQL query builder and migration tool for Node.js | ```knex``` | 3.2.9<br>2026-04-03 |
| [prisma](https://www.prisma.io/) | Next-generation Node.js and TypeScript ORM with a migration CLI<br><details><summary><strong><a href="#">Examples</a></strong></summary><br>`bunx prisma init` — Scaffold a new Prisma schema and .env<br>`bunx prisma migrate dev` — Create and apply a new development migration<br></details> | ```prisma``` | 7.7.0<br>2026-04-07 |
| [sequelize-cli](https://github.com/sequelize/cli) | Command-line interface for Sequelize ORM | ```sequelize``` | 6.6.5<br>2026-01-05 |



## Deployment & Hosting

| Name | Description | Executable(s) | Latest Release |
|:-----|:------------|:--------------|:--------------|
| [firebase-tools](https://github.com/firebase/firebase-tools) | Firebase command-line interface | ```firebase``` | 15.15.0<br>2026-04-16 |
| [netlify-cli](https://docs.netlify.com/cli/get-started/) | Netlify command-line tool for local development and deployment | ```netlify```, ```ntl``` | 25.0.1<br>2026-04-18 |
| [serverless](https://www.serverless.com/) | Build and deploy serverless applications to any cloud | ```serverless```, ```sls``` | 4.34.0<br>2026-04-10 |
| [sst](https://sst.dev/) | Build full-stack apps on your own infrastructure | ```sst``` | 4.7.7<br>2026-04-17 |
| [vercel](https://vercel.com/docs/cli) | Deploy and manage projects on the Vercel platform<br><details><summary><strong><a href="#">Examples</a></strong></summary><br>`bunx vercel` — Deploy the current directory to a preview URL<br></details> | ```vercel```, ```vc``` | 51.7.0<br>2026-04-17 |
| [wrangler](https://developers.cloudflare.com/workers/wrangler/) | Command-line tool for building with Cloudflare Workers and Pages | ```wrangler``` | 4.83.0<br>2026-04-15 |



## Development Tools

| Name | Description | Executable(s) | Latest Release |
|:-----|:------------|:--------------|:--------------|
| [concurrently](https://github.com/open-cli-tools/concurrently) | Run multiple commands concurrently, with prefixed output | ```concurrently``` | 9.2.1<br>2025-08-25 |
| [cross-env](https://github.com/kentcdodds/cross-env) | Cross-platform utility for setting environment variables | ```cross-env```, ```cross-env-shell``` | 10.1.0<br>2025-09-29 |
| [dotenv-cli](https://github.com/entropitor/dotenv-cli) | Run a command with environment variables loaded from a .env file | ```dotenv``` | 11.0.0<br>2025-10-28 |
| [nodemon](https://nodemon.io/) | Automatically restart a Node.js app when files change | ```nodemon``` | 3.1.14<br>2026-02-20 |
| [npm-run-all](https://github.com/mysticatea/npm-run-all) | Run multiple npm-scripts in parallel or sequentially | ```npm-run-all```, ```run-p```, ```run-s``` | 4.1.5<br>2018-11-24 |



## Documentation

| Name | Description | Executable(s) | Latest Release |
|:-----|:------------|:--------------|:--------------|
| [@11ty/eleventy](https://www.11ty.dev/) | Simpler static site generator<br><details><summary><strong><a href="#">Examples</a></strong></summary><br>`bunx --package @11ty/eleventy eleventy --serve` — Build and serve an Eleventy site locally<br></details> | ```eleventy``` | 3.1.5<br>2026-03-18 |
| [typedoc](https://typedoc.org/) | API documentation generator for TypeScript projects | ```typedoc``` | 0.28.19<br>2026-04-12 |
| [vitepress](https://vitepress.dev/) | Vite-powered static site generator for technical documentation<br><details><summary><strong><a href="#">Examples</a></strong></summary><br>`bunx vitepress init` — Scaffold a new VitePress documentation site<br></details> | ```vitepress``` | 1.6.4<br>2025-08-05 |



## Frontend Frameworks & Tools

| Name | Description | Executable(s) | Latest Release |
|:-----|:------------|:--------------|:--------------|
| [astro](https://astro.build/) | All-in-one web framework for content-driven sites | ```astro``` | 6.1.8<br>2026-04-18 |
| [create-astro](https://docs.astro.build/en/install-and-setup/) | Scaffold a new Astro project | ```create-astro``` | 5.0.5<br>2026-03-30 |
| [next](https://nextjs.org/) | The React Framework for production-grade applications | ```next``` | 16.2.4<br>2026-04-15 |
| [nuxi](https://nuxt.com/docs/api/commands/) | Command-line interface for the Nuxt framework | ```nuxi``` | 3.34.0<br>2026-03-10 |
| [storybook](https://storybook.js.org/) | Build and document UI components in isolation | ```storybook``` | 10.3.5<br>2026-04-07 |
| [sv](https://svelte.dev/docs/cli/overview) | Official Svelte CLI — scaffold and manage SvelteKit projects<br><details><summary><strong><a href="#">Examples</a></strong></summary><br>`bunx sv create my-app` — Create a new SvelteKit project<br></details> | ```sv``` | 0.15.1<br>2026-04-10 |



## Package Management

| Name | Description | Executable(s) | Latest Release |
|:-----|:------------|:--------------|:--------------|
| [depcheck](https://github.com/depcheck/depcheck) | Detect unused dependencies in a project | ```depcheck``` | 1.4.7<br>2023-10-17 |
| [npkill](https://npkill.js.org/) | Find and remove node_modules directories to free disk space | ```npkill``` | 0.12.2<br>2024-06-08 |
| [npm-check](https://github.com/dylang/npm-check) | Check for outdated, incorrect and unused dependencies | ```npm-check``` | 6.0.1<br>2022-07-16 |
| [npm-check-updates](https://github.com/raineorshine/npm-check-updates) | Upgrade package.json dependencies to the latest versions<br><details><summary><strong><a href="#">Examples</a></strong></summary><br>`bunx npm-check-updates -u` — Upgrade all dependencies in package.json to the latest<br></details> | ```ncu```, ```npm-check-updates``` | 21.0.2<br>2026-04-16 |
| [taze](https://github.com/antfu/taze) | Modern cli tool that keeps deps fresh | ```taze``` | 19.11.0<br>2026-04-01 |



## API & HTTP Tools

| Name | Description | Executable(s) | Latest Release |
|:-----|:------------|:--------------|:--------------|
| [@openapitools/openapi-generator-cli](https://openapi-generator.tech/) | Generate API clients, server stubs, and documentation from OpenAPI specs<br><details><summary><strong><a href="#">Examples</a></strong></summary><br>`bunx --package @openapitools/openapi-generator-cli openapi-generator-cli generate -i spec.yaml -g typescript-axios -o ./client` — Generate a TypeScript Axios client from an OpenAPI spec<br></details> | ```openapi-generator-cli``` | 2.31.1<br>2026-04-07 |
| [json-server](https://github.com/typicode/json-server) | Full fake REST API with zero coding in seconds | ```json-server``` | 1.0.0-beta.15<br>2026-03-23 |
| [newman](https://github.com/postmanlabs/newman) | Command-line collection runner for Postman | ```newman``` | 6.2.2<br>2026-01-16 |
| [swagger-cli](https://github.com/APIDevTools/swagger-cli) | Validate, bundle, and manage Swagger/OpenAPI files | ```swagger-cli``` | 4.0.4<br>2020-07-19 |



## Scaffolding & Generators

| Name | Description | Executable(s) | Latest Release |
|:-----|:------------|:--------------|:--------------|
| [create-next-app](https://nextjs.org/docs/api-reference/create-next-app) | Scaffold a new Next.js application with one command<br><details><summary><strong><a href="#">Examples</a></strong></summary><br>`bunx create-next-app@latest my-app` — Create a new Next.js project named my-app<br></details> | ```create-next-app``` | 16.2.4<br>2026-04-15 |
| [create-t3-app](https://create.t3.gg/) | Interactive CLI to start a typesafe Next.js app (the T3 Stack) | ```create-t3-app``` | 7.40.0<br>2025-11-05 |
| [create-vite](https://vitejs.dev/guide/) | Scaffold a new Vite project from an interactive prompt | ```create-vite``` | 9.0.4<br>2026-04-06 |
| [degit](https://github.com/Rich-Harris/degit) | Straightforward project scaffolding via git repository cloning | ```degit``` | 2.8.4<br>2021-04-01 |
| [plop](https://plopjs.com/) | Micro-generator framework for consistent code scaffolding | ```plop``` | 4.0.5<br>2026-01-22 |



## Security

| Name | Description | Executable(s) | Latest Release |
|:-----|:------------|:--------------|:--------------|
| [audit-ci](https://github.com/IBM/audit-ci) | Audit dependencies in CI and fail on high-severity vulnerabilities | ```audit-ci``` | 7.1.0<br>2024-07-03 |
| [retire](https://retirejs.github.io/retire.js/) | Scanner detecting the use of JavaScript libraries with known vulnerabilities | ```retire``` | 5.4.2<br>2026-01-18 |
| [snyk](https://snyk.io/) | Find, fix, and monitor vulnerabilities in open source dependencies | ```snyk``` | 1.1304.0<br>2026-04-09 |



## Testing & Quality

| Name | Description | Executable(s) | Latest Release |
|:-----|:------------|:--------------|:--------------|
| [cypress](https://www.cypress.io/) | End-to-end testing framework for anything that runs in a browser | ```cypress``` | 15.14.0<br>2026-04-16 |
| [jest](https://jestjs.io/) | Delightful JavaScript testing framework with a focus on simplicity | ```jest``` | 30.3.0<br>2026-03-10 |
| [mocha](https://mochajs.org/) | Feature-rich JavaScript test framework running on Node.js | ```mocha```, ```_mocha``` | 11.7.5<br>2025-11-05 |
| [playwright](https://playwright.dev/) | Reliable end-to-end testing across all modern browsers<br><details><summary><strong><a href="#">Examples</a></strong></summary><br>`bunx playwright install` — Install the browser binaries required by Playwright<br></details> | ```playwright``` | 1.59.1<br>2026-04-01 |
| [vitest](https://vitest.dev/) | Blazing fast unit-test framework powered by Vite | ```vitest``` | 4.1.4<br>2026-04-09 |



## TypeScript Tools

| Name | Description | Executable(s) | Latest Release |
|:-----|:------------|:--------------|:--------------|
| [ts-node](https://typestrong.org/ts-node/) | TypeScript execution and REPL for Node.js | ```ts-node```, ```ts-node-esm```, ```ts-node-script```, ```ts-node-transpile-only``` | 10.9.2<br>2023-12-08 |
| [tsx](https://tsx.is/) | Run TypeScript and ESM files directly — drop-in node replacement | ```tsx``` | 4.21.0<br>2025-11-30 |
| [typescript](https://www.typescriptlang.org/) | TypeScript language compiler and language server<br><details><summary><strong><a href="#">Examples</a></strong></summary><br>`bunx tsc --init` — Generate a tsconfig.json in the current directory<br></details> | ```tsc```, ```tsserver``` | 6.0.3<br>2026-04-16 |



## Performance & Monitoring

| Name | Description | Executable(s) | Latest Release |
|:-----|:------------|:--------------|:--------------|
| [clinic](https://clinicjs.org/) | Diagnose Node.js performance issues with flame graphs and heap analysis | ```clinic``` | 13.0.0<br>2023-06-28 |
| [lighthouse](https://developer.chrome.com/docs/lighthouse/overview) | Automated tool for improving quality of web pages<br><details><summary><strong><a href="#">Examples</a></strong></summary><br>`bunx lighthouse https://example.com --view` — Run an audit on a URL and open the report in the browser<br></details> | ```lighthouse```, ```chrome-debug```, ```smokehouse``` | 13.1.0<br>2026-04-06 |
| [size-limit](https://github.com/ai/size-limit) | Keep your JavaScript and CSS bundle size small | ```size-limit``` | 12.1.0<br>2026-04-13 |
| [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) | Visualize the size of webpack output files with an interactive treemap | ```webpack-bundle-analyzer``` | 5.3.0<br>2026-03-25 |



## Utilities

| Name | Description | Executable(s) | Latest Release |
|:-----|:------------|:--------------|:--------------|
| [http-server](https://github.com/http-party/http-server) | Simple, zero-configuration command-line HTTP server | ```http-server```, ```hs``` | 14.1.1<br>2022-05-31 |
| [kill-port](https://github.com/tiaanduplessis/kill-port) | Kill the process bound to a given port<br><details><summary><strong><a href="#">Examples</a></strong></summary><br>`bunx kill-port 3000` — Kill whatever process is listening on port 3000<br></details> | ```kill-port``` | 2.0.1<br>2022-06-21 |
| [localtunnel](https://theboroer.github.io/localtunnel-www/) | Expose your localhost to the world for easy testing and sharing | ```lt``` | 2.0.2<br>2021-09-18 |
| [npkg](https://github.com/cutenode/npkg) | Inspect packages from the npm registry from the terminal | ```npkg``` | 0.0.6<br>2011-10-04 |
| [serve](https://github.com/vercel/serve) | Static file serving and directory listing<br><details><summary><strong><a href="#">Examples</a></strong></summary><br>`bunx serve ./dist` — Serve the contents of a build directory over HTTP<br></details> | ```serve``` | 14.2.6<br>2026-03-03 |



## Version Control & Git

| Name | Description | Executable(s) | Latest Release |
|:-----|:------------|:--------------|:--------------|
| [commitizen](https://commitizen-tools.github.io/commitizen/) | Create commits that follow a specified format — interactive CLI | ```cz```, ```git-cz```, ```commitizen``` | 4.3.1<br>2024-09-27 |
| [husky](https://typicode.github.io/husky/) | Modern native Git hooks made easy | ```husky``` | 9.1.7<br>2024-11-18 |
| [lint-staged](https://github.com/lint-staged/lint-staged) | Run linters against staged git files | ```lint-staged``` | 16.4.0<br>2026-03-14 |
| [semantic-release](https://semantic-release.gitbook.io/) | Fully automated version management and package publishing | ```semantic-release``` | 25.0.3<br>2026-01-30 |



## Miscellaneous

| Name | Description | Executable(s) | Latest Release |
|:-----|:------------|:--------------|:--------------|
| [cowsay](https://github.com/piuccio/cowsay) | Configurable talking cow (and other characters) for the terminal<br><details><summary><strong><a href="#">Examples</a></strong></summary><br>`bunx cowsay Hello from bunx` — Print a cow saying a message<br></details> | ```cowsay```, ```cowthink``` | 1.6.0<br>2024-01-26 |
| [figlet-cli](https://github.com/patorjk/figlet-cli) | Create large ASCII text banners in the terminal | ```figlet``` | 0.3.0<br>2025-04-12 |




## Contributing

Feel free to contribute by opening a pull request with your favorite JavaScript / TypeScript CLI
tools that can be run via `bunx` or `npx`!
Please make sure to follow the <a href="CONTRIBUTING.md">contribution guidelines</a> and adhere to the <a href="CODE_OF_CONDUCT.md">code of conduct</a>.
Please also check the <a href="https://github.com/carlosferreyra/awesome-bunx/issues">issues</a> for any open issues or discussions related to the project.

## License

This project is licensed under the MIT License - see the <a href="LICENSE">LICENSE</a> file for details.
