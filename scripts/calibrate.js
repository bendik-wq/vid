#!/usr/bin/env node
/**
 * The calibration comparison — the first thing to put in front of Josh.
 *
 * The engine was built from the criteria bank, not fitted to his number. This prints
 * how close it lands to the figure he gives on camera for the same business.
 */
import { runAudit } from '../src/engine/valuation.js';
import { remediationPlan } from '../src/engine/restructure.js';
import { BROKER_CASE, PREPARED_CASE } from '../src/data/cases.js';
import { capitalOptions } from '../src/engine/build.js';

const money = (n) => '$' + Math.round(n).toLocaleString('en-US');
const turns = (n) => n.toFixed(2) + 'x';
const row = (label, value) => console.log('  ' + label.padEnd(38) + String(value).padStart(16));

const JOSH_SAYS = 500_000;

const r = runAudit(BROKER_CASE);

console.log('\n=== CALIBRATION: Josh’s broker case ===\n');
row('Revenue', money(BROKER_CASE.financials.revenue));
row('Claimed EBITDA', money(r.claimedEbitda));
console.log('');
for (const l of r.haircuts.lines.filter((l) => l.appliedFraction > 0)) {
  row(`  ${l.id} ${l.name}${l.computed ? ' (computed)' : ''}`,
    `-${(l.appliedFraction * 100).toFixed(1)}%  ${money(l.appliedAmount)}`);
}
row('Total haircut', (r.haircuts.appliedFraction * 100).toFixed(1) + '%');
row('DEFENSIBLE EBITDA', money(r.defensibleEbitda));
row('Josh says, on camera', money(JOSH_SAYS));
row('Variance to Josh', ((r.defensibleEbitda / JOSH_SAYS - 1) * 100).toFixed(1) + '%');

console.log('');
row('Sector ceiling', turns(r.ceiling));
row('Multiple penalty', '-' + turns(r.penalties.total));
row('ACHIEVABLE MULTIPLE', turns(r.achievableMultiple));

console.log('');
row('What they think it is worth', money(r.askingPrice));
row('  implied multiple on defensible EBITDA', turns(r.impliedMultipleAtAsking));
row('What the audit says it is worth', money(r.achievableValue));
row('What a buyer can fund (DSCR 1.50x)', money(r.dscr.maxFundablePrice));
row('DSCR at their asking price', turns(r.dscr.dscr));
row('Binding constraint', r.binding);
row('THE GAP', money(r.gap));

const plan = remediationPlan(BROKER_CASE);
console.log('\n=== TOP FIVE FIXES, BY VALUE PER UNIT OF EFFORT ===\n');
for (const item of plan.items.slice(0, 5)) {
  row(`${item.id} ${item.name} (${item.currentScore} → 5)`,
    `${money(item.fullUplift)} / ${item.months}mo`);
}
row('Total recoverable', money(plan.totalRecoverable));

console.log('\n=== WHAT A BUYER CAN ACTUALLY PAY ===\n');
console.log('  Debt cover does not care how big the business is, so the answer is a price');
console.log('  per pound of profit rather than a size.\n');
for (const o of capitalOptions(0, { industryId: 'trades' })) {
  row(`  ${o.structure.name}`, `${turns(o.maxMultiple)} · ${turns(o.stretchedMultiple)} interest-only`);
}

const good = runAudit(PREPARED_CASE);
console.log('\n=== SAME BUSINESS, RESTRUCTURED ===\n');
row('Defensible EBITDA', money(good.defensibleEbitda));
row('Achievable multiple', turns(good.achievableMultiple));
row('Value', money(good.achievableValue));
row('Difference', money(good.achievableValue - r.achievableValue));
console.log('');
