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

await page.click('[data-act="load-broker"]');
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

for (const view of ['value', 'build', 'future', 'tune', 'method']) {
  await page.click(`.tabs a[href="#${view}"]`);
  await page.waitForTimeout(400);
  if ((await page.innerHTML('#main')).length < 2000) fail(`${view} view rendered almost nothing`);
}

// Every figure must actually draw.
await page.click('.tabs a[href="#value"]');
await page.waitForTimeout(400);
const figures = await page.$$eval('#main svg', (els) => els.length);
if (figures < 4) fail(`expected the value screen to draw at least four figures, found ${figures}`);

// The group canvas: add businesses, they appear on the web and change the totals.
await page.click('.tabs a[href="#build"]');
await page.waitForTimeout(400);
if ((await page.$$('.gnode')).length !== 0) fail('the group should start empty');
await page.click('.tray-card[data-industry="trades"]');
await page.waitForTimeout(400);
await page.click('.tray-card[data-industry="healthcare"]');
await page.waitForTimeout(450);
const nodes = await page.$$('.gnode');
if (nodes.length !== 2) fail(`expected two businesses on the canvas, found ${nodes.length}`);
if ((await page.$$('.canvas-web line')).length !== 2) fail('connectors missing from the web');

// Dragging one moves it and keeps it there across the re-render.
await page.$eval('.gnode', (el) => el.scrollIntoView({ block: 'center' }));
await page.waitForTimeout(200);
const before = await page.$eval('.gnode', (el) => el.style.left);
const box = await page.$eval('.gnode', (el) => { const r = el.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; });
await page.mouse.move(box.x, box.y);
await page.mouse.down();
await page.mouse.move(box.x - 90, box.y + 60, { steps: 8 });
await page.mouse.up();
await page.waitForTimeout(400);
const after = await page.$eval('.gnode', (el) => el.style.left);
if (before === after) fail(`dragging did not move the business (${before} -> ${after})`);

// Changing how a deal is paid for has to change what it costs the buyer.
await page.click('[data-act="set-structure"][data-structure="deposit"]');
await page.waitForTimeout(400);
if (!(await page.textContent('#main')).includes('20% of your money')) fail('structure choice did not apply');

// Merging something must raise the profit the business contributes.
const profitBefore = await page.textContent('.tile .v');
await page.click('[data-act="toggle-lever"][data-lever="crosssell"]');
await page.waitForTimeout(400);
if ((await page.textContent('.tile .v')) === profitBefore) fail('merging did not change the group profit');

// The twenty-year projection has to draw both roads.
await page.click('.tabs a[href="#future"]');
await page.waitForTimeout(450);
const legend = await page.textContent('#main .legend');
if (!legend.includes('on your own') && !legend.includes('Keep it and grow it')) fail('the two roads are not both drawn');

// Tuning a number has to reach the audit.
await page.click('.tabs a[href="#tune"]');
await page.waitForTimeout(400);
await page.fill('[data-config="deltas.C15"]', '1.2');
await page.waitForTimeout(450);
await page.click('.tabs a[href="#value"]');
await page.waitForTimeout(400);
if (!(await page.textContent('#main')).includes('1.20x')) fail('a tuned number did not reach the value screen');

if (errors.length) fail(`console errors: ${errors.join(' | ')}`);
await browser.close();
console.log(process.exitCode ? 'smoke: FAILED' : 'smoke: ok');
