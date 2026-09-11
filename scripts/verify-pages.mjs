import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';

const prefix = '/Trigate-Case-Study/';
const routes = ['', 'where-it-started', 'the-main-version', 'removing-the-drop-off', 'coaching-report-workflow', 'co-founder-matching'];
let checked = 0;
function verifyUrl(value, from) {
  if (!value || /^(#|data:|https?:|mailto:|tel:|\/\/)/.test(value)) return;
  const url = new URL(value.replaceAll('&amp;', '&'), `https://mo16000.github.io${prefix}${from}`);
  assert(url.pathname.startsWith(prefix), `Unprefixed URL: ${value} in ${from}`);
  const relative = decodeURIComponent(url.pathname.slice(prefix.length));
  let file = path.join('out', relative);
  if (existsSync(file) && statSync(file).isDirectory()) file = path.join(file, 'index.html');
  assert(existsSync(file), `Missing ${file}, referenced by ${from}`);
  checked++;
}
for (const route of routes) {
  const file = route ? `${route}/index.html` : 'index.html';
  const html = readFileSync(`out/${file}`, 'utf8');
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `Missing page content in ${file}`);
  for (const match of html.matchAll(/\b(?:href|src)="([^"]*)"/g)) verifyUrl(match[1], file);
  for (const match of html.matchAll(/\bsrcSet="([^"]*)"/gi)) {
    for (const candidate of match[1].split(',')) verifyUrl(candidate.trim().replace(/\s+\d+w$/, ''), file);
  }
  const rsc = route ? `${route}.rsc` : 'index.rsc';
  assert(existsSync(`out/${rsc}`), `Missing static navigation payload ${rsc}`);
}
function walk(directory) {
  return readdirSync(directory).flatMap((name) => {
    const file = path.join(directory, name);
    return statSync(file).isDirectory() ? walk(file) : [file];
  });
}
for (const file of walk('out').filter((file) => file.endsWith('.css'))) {
  for (const match of readFileSync(file, 'utf8').matchAll(/url\(["']?([^\s)"']+)["']?\)/g)) {
    verifyUrl(match[1], file.slice(4));
  }
}
// Also cover assets only displayed after interaction, including full-resolution zooms.
const media = { ...JSON.parse(readFileSync('content/media.json')), ...JSON.parse(readFileSync('content/media-overrides.json')) };
for (const asset of Object.values(media)) {
  for (const variant of [asset, ...asset.variants]) verifyUrl(prefix.slice(0, -1) + variant.src, 'index.html');
}
verifyUrl(`${prefix}assets/hero-animation.json`, 'index.html');
assert(existsSync('out/.nojekyll'));
console.log(`Verified ${routes.length} static pages, navigation payloads, and ${checked} asset/link references.`);
