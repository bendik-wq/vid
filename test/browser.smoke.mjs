/**
 * Browser smoke test. Not part of `npm test` — it needs a running server and Chromium.
 *   npm run dev &   npm run smoke
 * Verifies the built single-file bundle boots, scores, and navigates without console errors.
 */
import { chromium } from 'playwright';

const URL = process.env.SMOKE_URL ?? 'http://localhost:5173/dist/exit-audit.html';
const CHROME = process.env.CHROME_PATH ?? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

const browser = await chromium.launch({ executablePath: CHROME });
const page = await browser.newPage({ viewport: { width: 1400, height: 1000 } });
const errors = [];
page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
// Font requests are ignored: sandboxes without outbound access to Google Fonts fall back
// to the declared stacks, which is a degraded look, not a broken page.
const ignorable = (t) => /favicon|fonts\.googleapis|fonts\.gstatic|ERR_CONNECTION_RESET/.test(t);
page.on('console', (m) => { if (m.type() === 'error' && !ignorable(m.text())) errors.push(m.text()); });
page.on('requestfailed', (r) => { if (!ignorable(r.url())) errors.push(`request failed: ${r.url()}`); });

const fail = (msg) => { console.error(`FAIL ${msg}`); process.exitCode = 1; };

await page.goto(URL, { waitUntil: 'load' });
await page.waitForTimeout(500);

if ((await page.innerHTML('#main')).length < 5000) fail('audit view did not render');

await page.click('text=Load Josh’s broker case');
await page.waitForTimeout(300);
const live = await page.textContent('.sticky');
if (!live.includes('$522,500')) fail(`calibration figure missing from live panel: ${live.slice(0, 200)}`);

await page.click('[data-act="score"][data-id="C7"][data-score="5"]');
await page.waitForTimeout(200);
if ((await page.textContent('.sticky')).includes('$1,743,844')) fail('scoring did not move the valuation');

for (const view of ['result', 'restructure', 'rollup', 'bank', 'method']) {
  await page.click(`.nav a[href="#${view}"]`);
  await page.waitForTimeout(250);
  if ((await page.innerHTML('#main')).length < 2000) fail(`${view} view rendered almost nothing`);
}

if (errors.length) fail(`console errors: ${errors.join(' | ')}`);
await browser.close();
console.log(process.exitCode ? 'smoke: FAILED' : 'smoke: ok');
