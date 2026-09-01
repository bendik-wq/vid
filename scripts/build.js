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
  'src/data/cases.js',
  'src/engine/valuation.js',
  'src/engine/restructure.js',
  'src/engine/rollup.js',
  'src/ui/format.js',
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

const html = (css, js) => `<title>Exit Audit</title>
<style>
${css}
@media print {
  .nav, .actions { display: none !important; }
  body { background: #fff; color: #111; }
  .panel, .stat, .crit, .verdict { border-color: #ccc; background: #fff; }
}
</style>
<div class="shell">
  <nav class="nav" id="nav"></nav>
  <main class="main" id="main"></main>
</div>
<script type="module">
${js}
start();
</script>`;

const css = await readFile(join(ROOT, 'src/ui/styles.css'), 'utf8');
const parts = [];
for (const file of ORDER) {
  parts.push(`// ── ${file} ${'─'.repeat(Math.max(0, 60 - file.length))}`);
  parts.push(strip(await readFile(join(ROOT, file), 'utf8'), file));
}

await mkdir(join(ROOT, 'dist'), { recursive: true });
const output = html(css, parts.join('\n'));
await writeFile(join(ROOT, 'dist/exit-audit.html'), output);
console.log(`dist/exit-audit.html — ${(output.length / 1024).toFixed(1)} kB`);
