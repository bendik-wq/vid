#!/usr/bin/env node
/**
 * Bundle the app into one self-contained HTML file.
 *
 * No bundler: every source file is a plain ES module whose exports are top-level
 * declarations, so stripping the import/export keywords and concatenating in dependency
 * order produces a single valid script. If that ever stops being true, the module list
 * below is the place it breaks, loudly.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const ORDER = [
  'src/data/criteria.js',
  'src/data/sectors.js',
  'src/data/structures.js',
  'src/data/scenarios.js',
  'src/data/capital-stack.js',
  'src/data/method.js',
  'src/data/config.js',
  'src/data/cases.js',
  'src/engine/valuation.js',
  'src/engine/restructure.js',
  'src/engine/build.js',
  'src/engine/stack.js',
  'src/engine/repair.js',
  'src/engine/examples.js',
  'src/ui/format.js',
  'src/ui/charts.js',
  'src/ui/canvas.js',
  'src/ui/state.js',
  'src/ui/views.js',
  'src/ui/app.js',
];

const strip = (src, file) => {
  const out = src
    .replace(/^\s*import\s[\s\S]*?from\s+['"][^'"]+['"];?\s*$/gm, '')
    .replace(/^export\s+(const|let|function|class|async)/gm, '$1')
    .replace(/^export\s+\{[^}]*\};?\s*$/gm, '');
  if (/^\s*export\s/m.test(out)) throw new Error(`Unhandled export syntax in ${file}`);
  if (/^\s*import\s/m.test(out)) throw new Error(`Unhandled import syntax in ${file}`);
  return out;
};

/**
 * Two outputs from the same pieces.
 *
 * The Artifact viewer supplies the doctype, head and a reset, so what it wants is a fragment.
 * Anywhere else — GitHub Pages, a file on disk, someone's own server — needs a whole document,
 * or the browser guesses at the encoding and the page renders in the wrong charset.
 */
const headOf = (css) => `<title>Exit Audit</title>
<style>
${css}
@media print {
  .topbar, .dock, .actions { display: none !important; }
}
</style>`;

const bodyOf = (js) => `<header class="topbar" id="topbar"></header>
<main class="page" id="main"></main>
<div id="dock"></div>
<script type="module">
${js}
start();
</script>`;

const fragmentOf = (css, js) => `${headOf(css)}\n${bodyOf(js)}`;

const standaloneOf = (css, js) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="description" content="Work out what a business is really worth, what it would take to be worth more, and what buying others alongside it does over twenty years." />
<style>
  :root { color-scheme: light dark; }
  body { margin: 0; }
  img { max-width: 100%; }
  [hidden] { display: none !important; }
</style>
${headOf(css)}
</head>
<body>
${bodyOf(js)}
</body>
</html>`;

const css = await readFile(join(ROOT, 'src/ui/styles.css'), 'utf8');
const raw = [];
const parts = [];
for (const file of ORDER) {
  const source = await readFile(join(ROOT, file), 'utf8');
  raw.push(source);
  parts.push(`// ── ${file} ${'─'.repeat(Math.max(0, 60 - file.length))}`);
  parts.push(strip(source, file));
}

// Every module a source file imports has to be in ORDER, or the bundle is missing a
// definition and the page goes blank at runtime. Catch it here instead.
const listed = new Set(ORDER);
for (let i = 0; i < ORDER.length; i += 1) {
  const dir = dirname(ORDER[i]);
  for (const m of raw[i].matchAll(/from\s+['"](\.[^'"]+)['"]/g)) {
    const resolved = join(dir, m[1]).replace(/\\/g, '/');
    if (!listed.has(resolved)) {
      throw new Error(`${ORDER[i]} imports ${resolved}, which is missing from the bundle order`);
    }
  }
}

// Concatenation only works while every module's top-level names are unique. Catch a
// collision here rather than as a blank page in the browser.
const declared = new Map();
for (let i = 0; i < ORDER.length; i += 1) {
  const body = parts[i * 2 + 1];
  for (const m of body.matchAll(/^(?:const|let|function|class|async function)\s+([A-Za-z_$][\w$]*)/gm)) {
    const prior = declared.get(m[1]);
    if (prior) throw new Error(`Duplicate top-level name "${m[1]}" in ${ORDER[i]} and ${prior}`);
    declared.set(m[1], ORDER[i]);
  }
}

const standalone = (fragment) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="description" content="Work out what a business is really worth, what it would take to be worth more, and what buying others alongside it does over twenty years." />
<style>
  :root { color-scheme: light dark; }
  body { margin: 0; }
  img { max-width: 100%; }
  [hidden] { display: none !important; }
</style>
${fragment}
</html>`;

await mkdir(join(ROOT, 'dist'), { recursive: true });
await mkdir(join(ROOT, 'dist/site'), { recursive: true });

const js = parts.join('\n');
const fragment = fragmentOf(css, js);
await writeFile(join(ROOT, 'dist/exit-audit.html'), fragment);
console.log(`dist/exit-audit.html — ${(fragment.length / 1024).toFixed(1)} kB  (Artifact fragment)`);

const page = standaloneOf(css, js);
await writeFile(join(ROOT, 'dist/site/index.html'), page);
console.log(`dist/site/index.html  — ${(page.length / 1024).toFixed(1)} kB  (standalone page)`);
