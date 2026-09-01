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

await page.click('text=Load Josh\u2019s broker case');
await page.waitForTimeout(400);
const dock = await page.textContent('#dock');
if (!dock.includes('$522,500')) fail(`calibration figure missing from the dock: ${dock.slice(0, 200)}`);

// The three C's are the spine: all three pillars, with what each one costs.
const strip = await page.$$eval('.pillar-card .pillar-name', (els) => els.map((e) => e.textContent.trim()));
for (const pillar of ['Credibility', 'Capital', 'Closing']) {
  if (!strip.includes(pillar)) fail(`${pillar} missing from the 3C strip (saw ${strip.join(', ')})`);
}

// Credibility is open on arrival; scoring one of its criteria moves the valuation.
if (!(await page.isVisible('[data-act="score"][data-id="C7"][data-score="5"]'))) fail('credibility should open by default');
await page.click('[data-act="score"][data-id="C7"][data-score="5"]');
await page.waitForTimeout(300);
if ((await page.textContent('#dock')).includes('$1,743,844')) fail('scoring did not move the valuation');

// Only one pillar is open at a time.
await page.click('[data-act="toggle-pillar"][data-pillar="closing"]');
await page.waitForTimeout(350);
if (await page.isVisible('[data-act="score"][data-id="C7"][data-score="5"]')) fail('two pillars open at once');
if (!(await page.isVisible('[data-act="score"][data-id="C15"][data-score="5"]'))) fail('closing did not open');

for (const view of ['value', 'plan', 'rollup', 'tune', 'method']) {
  await page.click(`.tabs a[href="#${view}"]`);
  await page.waitForTimeout(350);
  if ((await page.innerHTML('#main')).length < 2000) fail(`${view} view rendered almost nothing`);
}

// Every figure must actually draw.
await page.click('.tabs a[href="#value"]');
await page.waitForTimeout(350);
const figures = await page.$$eval('#main svg', (els) => els.length);
if (figures < 4) fail(`expected the value screen to draw at least four figures, found ${figures}`);

// Tuning a delta has to move the audit.
await page.click('.tabs a[href="#tune"]');
await page.waitForTimeout(350);
await page.fill('[data-config="deltas.C15"]', '1.2');
await page.waitForTimeout(400);
await page.click('.tabs a[href="#value"]');
await page.waitForTimeout(350);
if (!(await page.textContent('#main')).includes('1.20x')) fail('a tuned delta did not reach the value screen');

if (errors.length) fail(`console errors: ${errors.join(' | ')}`);
await browser.close();
console.log(process.exitCode ? 'smoke: FAILED' : 'smoke: ok');
