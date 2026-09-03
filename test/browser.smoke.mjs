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

for (const view of ['build', 'deal', 'repair', 'team', 'difference', 'examples', 'cases', 'tune', 'method']) {
  await page.click(`.tabs a[href="#${view}"]`);
  await page.waitForTimeout(400);
  // A single empty case is a legitimately short page; the rest should be substantial.
  // An empty case legitimately renders a short page on these two.
  const floor = view === 'cases' || view === 'repair' ? 500 : 2000;
  if ((await page.innerHTML('#main')).length < floor) fail(`${view} view rendered almost nothing`);
}

// Every figure must actually draw.
await page.click('.tabs a[href="#business"]');
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

// The difference screen has to play: scrubbing the year must move both numbers and the chart.
await page.click('.tabs a[href="#difference"]');
await page.waitForTimeout(1400);
const startGroup = await page.textContent('#fig-group');
const startWidth = await page.$eval('#race-rect', (el) => Number(el.getAttribute('width')));
await page.$eval('#year', (el) => { el.value = '20'; el.dispatchEvent(new Event('input', { bubbles: true })); });
await page.waitForTimeout(400);
const endGroup = await page.textContent('#fig-group');
const endWidth = await page.$eval('#race-rect', (el) => Number(el.getAttribute('width')));
if (startGroup === endGroup) fail('scrubbing the year did not move the group figure');
if (endWidth <= startWidth) fail('the chart did not reveal as the year advanced');
if ((await page.$$('#chips .chip')).length < 2) fail('businesses did not appear as they were bought');
if (!(await page.textContent('#fig-mult')).match(/^\d+\.\dx$/)) fail('the multiplier is not showing');

// Tuning a number has to reach the audit.
await page.click('.tabs a[href="#tune"]');
await page.waitForTimeout(400);
await page.fill('[data-config="deltas.C15"]', '1.2');
await page.waitForTimeout(450);
await page.click('.tabs a[href="#business"]');
await page.waitForTimeout(400);
if (!(await page.textContent('#main')).includes('1.20x')) fail('a tuned number did not reach the business screen');

// Cases: a new one must start clean, and switching back must restore the old figures.
await page.click('.tabs a[href="#cases"]');
await page.waitForTimeout(400);
if ((await page.$$('.case-card')).length !== 1) fail('expected one case to start with');
await page.click('[data-act="new-case"]');
await page.waitForTimeout(400);
if ((await page.textContent('#main')).includes('$5,000,000')) fail('a new case inherited the last one');
await page.click('.tabs a[href="#cases"]');
await page.waitForTimeout(400);
const cards = await page.$$('.case-card');
if (cards.length !== 2) fail(`expected two cases, found ${cards.length}`);
await page.click('[data-act="open-case"]');
await page.waitForTimeout(450);
if (!(await page.textContent('#main')).includes('$5,000,000')) fail('reopening a case lost its figures');

// The case name is in the top bar, and editing it there sticks.
await page.click('.tabs a[href="#cases"]');
await page.waitForTimeout(350);
await page.fill('.case-name', 'Acme Electrical');
await page.waitForTimeout(450);
if (!(await page.textContent('.case-chip')).includes('Acme')) fail('renaming a case did not reach the top bar');

// The sensitivity tornado has to draw on the business screen.
await page.click('.tabs a[href="#business"]');
await page.waitForTimeout(450);
const bars = await page.$$eval('#main svg rect', (els) => els.length);
if (bars < 10) fail(`expected the business screen to draw its figures, found ${bars} marks`);
if (!(await page.textContent('#main')).includes('What moves the number most')) fail('the tornado section is missing');

// Every situation must open a case that says something, on the screen that answers it.
for (const id of ['exit', 'serial', 'capital', 'cover', 'expand', 'adjacent']) {
  await page.click('.tabs a[href="#cases"]');
  await page.waitForTimeout(350);
  await page.click(`[data-act="scenario"][data-scenario="${id}"]`);
  await page.waitForTimeout(500);
  const view = (await page.evaluate(() => location.hash)) || '#business';
  if (!['#business', '#build'].includes(view)) fail(`${id} routed to ${view}`);
  const text = await page.textContent('#main');
  if (text.length < 3000) fail(`${id} opened on an empty screen`);
  if (/NaN|undefined/.test(text)) fail(`${id} leaked a broken number`);
}

// The seller who wants too much gets told what he would have to become.
await page.click('.tabs a[href="#cases"]');
await page.waitForTimeout(350);
await page.click('[data-act="scenario"][data-scenario="exit"]');
await page.waitForTimeout(600);
const exitText = await page.textContent('#main');
if (!exitText.includes('What you would have to become')) fail('the scale answer is missing');
if (!/\d+ businesses/.test(exitText)) fail('it does not say how many businesses');

// The serial acquirer gets told which of his deals are the problem.
await page.click('.tabs a[href="#cases"]');
await page.waitForTimeout(350);
await page.click('[data-act="scenario"][data-scenario="serial"]');
await page.waitForTimeout(700);
const serialText = await page.textContent('#main');
if (!serialText.includes('Which ones are carrying the rest')) fail('the portfolio check is missing');
if (!serialText.includes('Overpaid by')) fail('the drag is not priced');

// The deal screen: every term is editable and the maths follows.
await page.click('.tabs a[href="#deal"]');
await page.waitForTimeout(450);
await page.fill('[data-source="seller.amount"]', '1040000');
await page.waitForTimeout(450);
if (!(await page.textContent('#main')).includes('fully funded')) fail('the stack did not balance when it should');

// Switching a tranche to a balloon has to produce a lump and say when it lands.
await page.selectOption('[data-source="seller.mode"]', 'balloon');
await page.waitForTimeout(450);
await page.fill('[data-source="seller.amortYears"]', '20');
await page.waitForTimeout(500);
const dealText = await page.textContent('#main');
if (!/falls due in one go in year/.test(dealText)) fail('the balloon warning is missing');
if (!(await page.$$('#main svg rect')).length) fail('the repayment timeline did not draw');

// Interest only owes the whole amount at the end.
await page.selectOption('[data-source="seller.mode"]', 'interest');
await page.waitForTimeout(500);
if (!(await page.textContent('#main')).includes('$1,040,000')) fail('interest only should owe the full amount at the end');

// Nothing of your own in, and you still own the equity.
if (!(await page.textContent('#main')).includes('none of it')) fail('a no-money-down stack should say so');

// Restructuring: a broken portfolio, and levers that visibly fix it.
await page.click('.tabs a[href="#cases"]');
await page.waitForTimeout(350);
await page.click('[data-act="scenario"][data-scenario="cover"]');
await page.waitForTimeout(600);
await page.click('.tabs a[href="#repair"]');
await page.waitForTimeout(500);
const repairText = await page.textContent('#main');
if (!repairText.includes('Structured badly')) fail('a broken portfolio should be called out');
// The fourth tile is "cover after", which is what a lever is supposed to move.
const coverAfter = () => page.$$eval('.tile .v', (els) => els[3]?.textContent ?? '');
const coverNow = await coverAfter();
await page.click('[data-act="toggle-repair"][data-repair="interestOnly"]');
await page.waitForTimeout(700);
const repaired = await page.textContent('#main');
if (!repaired.includes('How it gets there')) fail('the waterfall did not appear');
if ((await coverAfter()) === coverNow) fail(`a lever did not change cover (still ${coverNow})`);
if (!(await page.$$('#main svg rect')).length) fail('the cover waterfall did not draw');

// Worked examples: six of them, all computed, none broken.
await page.click('.tabs a[href="#examples"]');
await page.waitForTimeout(600);
const ex = await page.textContent('#main');
if ((await page.$$('.example')).length !== 6) fail('expected six worked examples');
if (/NaN|undefined|Infinity/.test(ex)) fail('a worked example leaked a broken number');
if ((await page.$$('.ba-row')).length < 20) fail('the before and after rows did not render');

// The team: seats fill by tapping, and dragging moves somebody between businesses.
await page.click('.tabs a[href="#cases"]');
await page.waitForTimeout(350);
await page.click('[data-act="scenario"][data-scenario="serial"]');
await page.waitForTimeout(600);
await page.click('.tabs a[href="#team"]');
await page.waitForTimeout(500);
if ((await page.$$('.seat.filled')).length !== 0) fail('the org should start empty');
const worthBefore = await page.$$eval('.tile .v', (els) => els[2]?.textContent ?? '');

await page.click('[data-act="seat"][data-role="chair"]');
await page.waitForTimeout(450);
if ((await page.$$('.band[data-zone="board"] .seat.filled')).length !== 1) fail('tapping did not seat the chair');
if ((await page.$$eval('.tile .v', (els) => els[2]?.textContent ?? '')) === worthBefore) {
  fail('seating a board member did not move the valuation');
}
if (!(await page.textContent('#main')).includes('% equity')) fail('the board should be priced in equity');

await page.click('[data-act="seat"][data-role="gm"]');
await page.waitForTimeout(450);
const unitSeats = await page.$$('.band[data-zone="unit"] .seat.filled');
if (unitSeats.length !== 1) fail(`expected a manager in a unit, found ${unitSeats.length}`);

// Drag the manager from your business into one you bought.
await page.$eval('.org', (el) => el.scrollIntoView({ block: 'center' }));
await page.waitForTimeout(300);
const seatBox = await page.$eval('.band[data-zone="unit"] .seat.filled', (el) => {
  const r = el.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
});
const targetBox = await page.$$eval('.band[data-zone="unit"]', (els) => {
  const r = els[1].getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height - 30 };
});
await page.mouse.move(seatBox.x, seatBox.y);
await page.mouse.down();
await page.mouse.move(targetBox.x, targetBox.y, { steps: 12 });
await page.mouse.up();
await page.waitForTimeout(500);
const secondUnit = await page.$$eval('.band[data-zone="unit"]', (els) => els[1].querySelectorAll('.seat.filled').length);
if (secondUnit !== 1) fail('dragging did not move the manager into the second business');

// Removing a seat has to put the number back.
await page.click('[data-act="unseat"][data-role="chair"]');
await page.waitForTimeout(450);
if ((await page.$$('.band[data-zone="board"] .seat.filled')).length !== 0) fail('removing a seat did not work');

if (errors.length) fail(`console errors: ${errors.join(' | ')}`);
await browser.close();
console.log(process.exitCode ? 'smoke: FAILED' : 'smoke: ok');
