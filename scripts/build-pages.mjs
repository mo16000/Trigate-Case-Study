import { spawnSync } from 'node:child_process';
import { cpSync, readFileSync, renameSync, rmSync, writeFileSync } from 'node:fs';

// vinext 1.0.0-beta.5 omits basePath from its internal prerender requests.
// Apply a narrowly guarded build-time fix, restoring the installed file afterward.
// Output paths stay unprefixed: GitHub mounts the artifact at the repository URL.
const prerenderFile = 'node_modules/vinext/dist/build/prerender.js';
const original = readFileSync(prerenderFile, 'utf8');
const needle = 'new Request(`http://localhost${urlPath}`';
if (original.split(needle).length !== 3) throw new Error('Review the vinext prerender compatibility fix after upgrading.');
const patched = original.replaceAll(needle,
  'new Request(`http://localhost${config.basePath || ""}${urlPath}${config.trailingSlash && !urlPath.endsWith("/") ? "/" : ""}`');
let result;
try {
  writeFileSync(prerenderFile, patched);
  result = spawnSync(process.execPath, ['node_modules/vinext/dist/cli.js', 'build'], {
    stdio: 'inherit',
    env: { ...process.env, GITHUB_PAGES: 'true', NEXT_PUBLIC_BASE_PATH: '/Trigate-Case-Study' },
  });
} finally {
  writeFileSync(prerenderFile, original);
}
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);
rmSync('out', { recursive: true, force: true });
cpSync('dist/client', 'out', { recursive: true });
// Vinext nests compiled assets under basePath; Pages supplies that mount itself.
renameSync('out/Trigate-Case-Study/_next', 'out/_next');
rmSync('out/Trigate-Case-Study', { recursive: true, force: true });
writeFileSync('out/.nojekyll', '');
