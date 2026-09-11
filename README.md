# Trigate UX Case Study

The complete six-page case study, including the original visuals, responsive layouts,
chapter navigation, image zoom dialogs, and animated hero.

## Run locally

Requires Node.js 22.13 or newer.

```sh
npm ci
npm run dev
```

## GitHub Pages

```sh
npm run build:pages
npm run verify:pages
npm run preview:pages
```

This exports all six routes to `out/`, with `/Trigate-Case-Study/` as the base path.
The output includes public assets, HTML, CSS, JavaScript, and static navigation data;
it requires no Node.js server or Cloudflare runtime. Do not publish the source folder.

In repository Settings → Pages, select **GitHub Actions** as the source. The included
workflow builds and deploys on every push to `main`, or can be run manually.

Published URL: https://mo16000.github.io/Trigate-Case-Study/

The normal `npm run build` remains the original Sites/Cloudflare build. The Pages
build sets its environment variables in a cross-platform Node.js script; no secrets
or local environment files are required. Keep the base path in `next.config.ts`,
`vite.config.ts`, and `scripts/build-pages.mjs` aligned if the repository is renamed.

The pinned Vinext beta has an internal prerender base-path bug. `build-pages.mjs`
applies a guarded, temporary fix to its two prerender request URLs and restores the
installed file afterward. Review this compatibility fix when upgrading Vinext.
