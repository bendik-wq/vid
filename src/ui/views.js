/** All screens. Each view returns an HTML string; app.js handles events by delegation. */

import { CRITERIA, PILLARS, criteriaForPillar, MULTIPLE_FLOOR, MAX_COMBINED_EBITDA_HAIRCUT } from '../data/criteria.js';
import { SECTORS } from '../data/sectors.js';
import { runAudit, DSCR_FLOOR } from '../engine/valuation.js';
import { remediationPlan, restructureTrajectory } from '../engine/restructure.js';
import { runRollup, absorptionCapacity } from '../engine/rollup.js';
import { state } from './state.js';
import { money, moneyShort, turns, pct, esc } from './format.js';

const field = (label, path, value, opts = {}) => `
  <div class="field">
    <label>${esc(label)}</label>
    <input data-bind="${path}" data-kind="${opts.kind ?? 'number'}" value="${esc(value ?? '')}"
           ${opts.placeholder ? `placeholder="${esc(opts.placeholder)}"` : ''} />
    ${opts.hint ? `<p class="hint">${opts.hint}</p>` : ''}
  </div>`;

const stat = (k, v, s, cls = '') => `
  <div class="stat ${cls}"><div class="k">${esc(k)}</div><div class="v">${v}</div>${s ? `<div class="s">${s}</div>` : ''}</div>`;

// ── Audit ─────────────────────────────────────────────────────────────────
export function auditView() {
  const a = state.audit;
  const r = runAudit(a);

  const sectorOptions = SECTORS.map(
    (s) => `<option value="${s.id}" ${s.id === a.business.sector ? 'selected' : ''}>${esc(s.name)} — ${s.ceiling.toFixed(1)}x</option>`,
  ).join('');

  return `
  <h2>Pre-exit audit</h2>
  <p class="lede">Every number below is yours. The tool only does arithmetic on what you type,
  which is the point: there is nothing here to argue with.</p>

  <div class="split">
    <div>
      <h3>1. The business</h3>
      <div class="panel">
        <div class="grid g2">
          <div class="field">
            <label>Business name</label>
            <input data-bind="business.name" data-kind="text" value="${esc(a.business.name)}" placeholder="Trading name" />
          </div>
          <div class="field">
            <label>Sector <span class="flag">provisional</span></label>
            <select data-bind="business.sector" data-kind="text">${sectorOptions}</select>
            <p class="hint">Sets the premium multiple ceiling. Ranges are placeholders until signed off.</p>
          </div>
        </div>
        ${field('Annual revenue', 'financials.revenue', a.financials.revenue)}
      </div>

      <h3>2. What do you want for it?</h3>
      <div class="panel">
        ${field('Your asking price', 'askingPrice', a.askingPrice, {
          hint: 'The number the rest of the audit is measured against. Ask it first — it is the number everything else dismantles.',
        })}
      </div>

      <h3>3. The earnings you are claiming</h3>
      <div class="panel">
        <div class="grid g2">
          ${field('Claimed / adjusted EBITDA', 'financials.claimedEbitda', a.financials.claimedEbitda, {
            hint: 'The figure on the information memorandum, after every add-back.',
          })}
          ${field('Maintenance capex a year', 'financials.maintenanceCapex', a.financials.maintenanceCapex, {
            hint: 'What it costs just to stand still. Used in the DSCR test.',
          })}
          ${field('Owner pay drawn', 'financials.ownerSalaryDrawn', a.financials.ownerSalaryDrawn)}
          ${field('Of which added back to EBITDA', 'financials.ownerSalaryAddedBack', a.financials.ownerSalaryAddedBack, {
            hint: 'Add back the owner’s pay and a buyer inherits a vacancy, not a profit.',
          })}
          ${field('Market cost to replace you', 'financials.ownerReplacementCost', a.financials.ownerReplacementCost, {
            hint: 'What you would have to pay someone to do everything you do.',
          })}
          <div class="field">
            <label>Tax rate</label>
            <input data-bind="financials.taxRate" data-kind="rate" value="${(a.financials.taxRate * 100).toFixed(0)}" />
            <p class="hint">Per cent. Applied to cash flow in the DSCR test.</p>
          </div>
        </div>
      </div>

      <h3>4. The structure a buyer would use</h3>
      <div class="panel">
        <div class="grid g3">
          <div class="field"><label>Buyer deposit %</label>
            <input data-bind="structure.depositPct" data-kind="rate" value="${(a.structure.depositPct * 100).toFixed(0)}" /></div>
          <div class="field"><label>Seller note %</label>
            <input data-bind="structure.sellerNotePct" data-kind="rate" value="${(a.structure.sellerNotePct * 100).toFixed(0)}" /></div>
          <div class="field"><label>Bank rate %</label>
            <input data-bind="structure.bankRate" data-kind="rate" value="${(a.structure.bankRate * 100).toFixed(1)}" /></div>
          <div class="field"><label>Bank term (years)</label>
            <input data-bind="structure.bankTermYears" data-kind="number" value="${a.structure.bankTermYears}" /></div>
          <div class="field"><label>Seller note rate %</label>
            <input data-bind="structure.sellerNoteRate" data-kind="rate" value="${(a.structure.sellerNoteRate * 100).toFixed(1)}" /></div>
          <div class="field"><label>Seller note term (years)</label>
            <input data-bind="structure.sellerNoteTermYears" data-kind="number" value="${a.structure.sellerNoteTermYears}" /></div>
        </div>
        <label class="check">
          <input type="checkbox" data-bind="structure.sellerNoteInterestOnly" data-kind="bool"
                 ${a.structure.sellerNoteInterestOnly ? 'checked' : ''} />
          <span>Seller note is interest-only with a bullet at the end.
          <span class="dim">The single biggest lever on whether your price is fundable — try it both ways.</span></span>
        </label>
      </div>

      <h3>5. Score the business</h3>
      <p class="lede">One to five against the anchors. Five is what a buyer wants to find.</p>
      ${['credibility', 'capital', 'closing'].map(pillarBlock).join('')}

      <div class="actions">
        <button data-act="goto" data-view="result">See the result</button>
        <button class="ghost" data-act="load-broker">Load Josh’s broker case</button>
        <button class="ghost" data-act="reset">Clear</button>
      </div>
    </div>

    <div class="sticky">
      ${liveSummary(r)}
    </div>
  </div>`;
}

function pillarBlock(pillarId) {
  const p = PILLARS[pillarId];
  const a = state.audit;
  return `
    <div style="margin-bottom:26px">
      <div class="crit-head" style="margin-bottom:4px">
        <div><strong style="font-size:15px">${esc(p.name)}</strong>
        <span class="pill" style="margin-left:8px">${esc(p.sellSide)}</span></div>
      </div>
      <p class="hint" style="margin:0 0 12px;max-width:70ch">${esc(p.blurb)}</p>
      ${criteriaForPillar(pillarId).map((c) => critCard(c, a.scores[c.id])).join('')}
    </div>`;
}

function critCard(c, score) {
  if (c.impact.kind === 'computed') {
    return `
    <div class="crit">
      <div class="crit-head">
        <div class="crit-name">${esc(c.id)} · ${esc(c.name)}<span class="computed-badge">computed</span></div>
        <div class="delta">from your inputs</div>
      </div>
      <div class="crit-q">${esc(c.question)}</div>
      <div class="anchor">${esc(c.computedNote)}</div>
    </div>`;
  }
  const delta = c.impact.kind === 'ebitda'
    ? `up to −${pct(c.impact.maxHaircut, 0)} EBITDA`
    : `up to −${c.impact.maxPenalty.toFixed(2)}x multiple`;
  const s = Number(score ?? 3);
  return `
  <div class="crit">
    <div class="crit-head">
      <div class="crit-name">${esc(c.id)} · ${esc(c.name)}</div>
      <div class="delta">${delta}</div>
    </div>
    <div class="crit-q">${esc(c.question)}</div>
    <div class="scale">
      ${[1, 2, 3, 4, 5].map((n) => `<button data-act="score" data-id="${c.id}" data-score="${n}" class="${n === s ? 'on' : ''}">${n}</button>`).join('')}
    </div>
    <div class="anchor">${esc(c.anchors[s] ?? c.anchors[s < 3 ? 1 : 5])}</div>
  </div>`;
}

function liveSummary(r) {
  const gapBad = r.gap > 0;
  return `
  <div class="panel">
    <div class="k" style="font-size:11px;letter-spacing:.11em;text-transform:uppercase;color:var(--ink-3)">Live</div>
    <table style="margin-top:10px">
      <tr><td>Claimed EBITDA</td><td class="n">${money(r.claimedEbitda)}</td></tr>
      <tr><td>Haircut</td><td class="n bad-t">−${pct(r.haircuts.appliedFraction)}</td></tr>
      <tr><td><strong>Defensible EBITDA</strong></td><td class="n"><strong>${money(r.defensibleEbitda)}</strong></td></tr>
      <tr><td>Ceiling</td><td class="n">${turns(r.ceiling)}</td></tr>
      <tr><td>Penalty</td><td class="n bad-t">−${turns(r.penalties.total)}</td></tr>
      <tr><td><strong>Achievable multiple</strong></td><td class="n"><strong>${turns(r.achievableMultiple)}</strong></td></tr>
      <tr><td>Your price</td><td class="n">${money(r.askingPrice)}</td></tr>
      <tr><td>Audit value</td><td class="n">${money(r.achievableValue)}</td></tr>
      <tr><td>DSCR at your price</td><td class="n ${r.dscr.passes ? 'good-t' : 'bad-t'}">${turns(r.dscr.dscr)}</td></tr>
    </table>
    <div class="stat ${gapBad ? 'bad' : 'good'}" style="margin-top:14px">
      <div class="k">${gapBad ? 'The gap' : 'Headroom'}</div>
      <div class="v">${money(Math.abs(r.gap))}</div>
      <div class="s">${gapBad ? 'between what you want and what you get' : 'you are asking below what the audit supports'}</div>
    </div>
  </div>`;
}

// ── Result ────────────────────────────────────────────────────────────────
export function resultView() {
  const r = runAudit(state.audit);
  const name = state.audit.business.name || 'This business';
  const gateFail = !r.dscr.passes;
  const dscrPos = Math.min(100, (r.dscr.dscr / 3) * 100);
  const floorPos = (DSCR_FLOOR / 3) * 100;

  return `
  <h2>${esc(name)} — what it is actually worth</h2>
  <p class="lede">Two haircuts, both taken from your own figures. The first moves the earnings,
  the second moves the multiple.</p>

  <div class="grid g3">
    ${stat('You are asking', money(r.askingPrice), `${turns(r.impliedMultipleAtAsking)} of defensible EBITDA`)}
    ${stat('The audit says', money(r.achievableValue), `${money(r.defensibleEbitda)} × ${turns(r.achievableMultiple)}`)}
    ${stat(r.gap > 0 ? 'The gap' : 'Headroom', money(Math.abs(r.gap)), r.gap > 0 ? 'you do not have' : 'you are leaving on the table', r.gap > 0 ? 'bad' : 'good')}
  </div>

  <div class="verdict ${gateFail ? 'bad' : 'good'}">
    <h4>Your asking price implies a ${turns(r.dscr.dscr)} DSCR. The floor is ${turns(DSCR_FLOOR)}.</h4>
    <p>${gateFail
      ? `No bank funds this. No seller-financed buyer survives it. At your price a buyer faces
         ${money(r.dscr.annualService)} a year of debt service against ${money(r.dscr.freeCashFlow)} of free cash flow.
         The most a buyer could fund on this structure is <strong>${money(r.dscr.maxFundablePrice)}</strong>.
         Your price is not high — it is unfundable. That is a structure problem, not a price problem.`
      : `A buyer can service debt at this price: ${money(r.dscr.freeCashFlow)} of free cash flow against
         ${money(r.dscr.annualService)} of annual debt service. The deal is fundable as structured.`}</p>
    <div class="gauge">
      <div class="gauge-track">
        <div class="gauge-fill ${r.dscr.passes ? 'ok' : ''}" style="width:${dscrPos}%"></div>
        <div class="gauge-mark" style="left:${floorPos}%"></div>
      </div>
      <div class="gauge-labels"><span>0.00x</span><span>floor ${turns(DSCR_FLOOR)}</span><span>3.00x+</span></div>
    </div>
  </div>

  <div class="grid g4">
    ${stat('Deposit', money(r.dscr.deposit), `${pct(r.dscr.structure.depositPct, 0)} of price`)}
    ${stat('Bank debt', money(r.dscr.bankDebt), `${pct(r.dscr.structure.bankRate, 1)} over ${r.dscr.structure.bankTermYears}y`)}
    ${stat('Seller note', money(r.dscr.sellerNote), r.dscr.structure.sellerNoteInterestOnly ? 'interest-only' : `${r.dscr.structure.sellerNoteTermYears}y amortising`)}
    ${stat('Annual debt service', money(r.dscr.annualService), `against ${money(r.dscr.freeCashFlow)} free cash`)}
  </div>

  <h3>Haircut 1 — claimed EBITDA to defensible EBITDA</h3>
  <div class="panel scroll">
    <table>
      <thead><tr><th>Line</th><th>Basis</th><th class="n">Haircut</th><th class="n">Amount</th></tr></thead>
      <tbody>
        <tr><td colspan="3"><strong>Claimed EBITDA</strong></td><td class="n"><strong>${money(r.claimedEbitda)}</strong></td></tr>
        ${r.haircuts.lines.map((l) => `
          <tr>
            <td>${esc(l.id)} · ${esc(l.name)}</td>
            <td class="dim">${l.computed ? 'computed from your inputs' : `scored ${l.score}/5`}</td>
            <td class="n bad-t">${l.appliedFraction > 0 ? '−' + pct(l.appliedFraction) : '—'}</td>
            <td class="n bad-t">${l.appliedAmount > 0 ? '−' + money(l.appliedAmount) : '—'}</td>
          </tr>`).join('')}
        <tr><td colspan="2"><strong>Defensible EBITDA</strong></td>
            <td class="n"><strong>−${pct(r.haircuts.appliedFraction)}</strong></td>
            <td class="n"><strong>${money(r.defensibleEbitda)}</strong></td></tr>
      </tbody>
    </table>
    ${r.haircuts.capApplied ? `<p class="hint">Raw haircut was ${pct(r.haircuts.rawFraction)}; capped at ${pct(MAX_COMBINED_EBITDA_HAIRCUT, 0)} and each line rescaled proportionally.</p>` : ''}
  </div>

  <h3>Haircut 2 — premium multiple to achievable multiple</h3>
  <div class="panel scroll">
    <table>
      <thead><tr><th>Criterion</th><th>Pillar</th><th class="n">Score</th><th class="n">Available</th><th class="n">Penalty</th></tr></thead>
      <tbody>
        <tr><td colspan="4"><strong>Sector ceiling${r.sizePremium ? ` (incl. ${turns(r.sizePremium)} size premium)` : ''}</strong></td>
            <td class="n"><strong>${turns(r.ceiling)}</strong></td></tr>
        ${r.penalties.lines.map((l) => `
          <tr>
            <td>${esc(l.id)} · ${esc(l.name)}</td>
            <td class="dim">${esc(PILLARS[l.pillar].name)}</td>
            <td class="n">${l.score}/5</td>
            <td class="n dim">${turns(l.maxPenalty)}</td>
            <td class="n ${l.penalty > 0 ? 'bad-t' : 'dim'}">${l.penalty > 0 ? '−' + turns(l.penalty) : '—'}</td>
          </tr>`).join('')}
        <tr><td colspan="3"><strong>Achievable multiple</strong></td>
            <td class="n"><strong>−${turns(r.penalties.total)}</strong></td>
            <td class="n"><strong>${turns(r.achievableMultiple)}</strong></td></tr>
      </tbody>
    </table>
    ${r.multipleFloored ? `<p class="hint">Penalties exceeded the ceiling; the multiple is held at the ${turns(MULTIPLE_FLOOR)} floor. Nothing trades below asset value.</p>` : ''}
  </div>

  <h3>Which ceiling binds</h3>
  <div class="grid g2">
    ${stat('Quality ceiling', money(r.achievableValue), 'what the business earns × what it deserves', r.binding === 'quality' ? 'bad' : '')}
    ${stat('Fundability ceiling', money(r.dscr.maxFundablePrice), `most a buyer can service at ${turns(DSCR_FLOOR)}`, r.binding === 'fundability' ? 'bad' : '')}
  </div>
  <div class="verdict">
    <h4>${r.binding === 'fundability'
      ? 'Fundability binds. Cash, not quality, is what caps your price today.'
      : 'Quality binds. The business is fundable at what it is worth — it just is not worth what you want.'}</h4>
    <p>${r.binding === 'fundability'
      ? `A buyer cannot service more than ${money(r.dscr.maxFundablePrice)} on this structure, even though the
         business itself supports ${money(r.achievableValue)}. Lengthen the note, defer more, or take the
         difference in earn-out — the price does not have to move, the structure does.`
      : `Debt service is not your constraint. Every pound of extra price has to come from a better
         business: a defensible earnings base and fewer reasons for a buyer to discount the multiple.`}</p>
  </div>

  <div class="actions">
    <button data-act="goto" data-view="restructure">What closes the gap</button>
    <button class="ghost" data-act="export">Export report (JSON)</button>
    <button class="ghost" data-act="print">Print</button>
  </div>`;
}

// ── Restructure ───────────────────────────────────────────────────────────
export function restructureView() {
  const plan = remediationPlan(state.audit);
  const traj = restructureTrajectory(state.audit);
  const base = plan.base;
  const max = Math.max(...plan.items.map((i) => i.fullUplift), 1);

  return `
  <h2>Restructure</h2>
  <p class="lede">The audit tells a seller what the business is worth today. This prices every fix,
  so the conversation stops being “your price is wrong” and becomes “here is the sequence”.</p>

  <div class="grid g3">
    ${traj.map((t) => stat(t.label, money(t.result.achievableValue),
      `${money(t.result.defensibleEbitda)} × ${turns(t.result.achievableMultiple)}`,
      t.months === 24 ? 'good' : '')).join('')}
  </div>
  <p class="hint">Horizons assume the workstreams run in parallel and every criterion reachable inside the
  window lands at 5. It is the ceiling of the plan, not a forecast.</p>

  <div class="grid g3" style="margin-top:18px">
    ${stat('Value today', money(base.achievableValue), '')}
    ${stat('Total recoverable', money(plan.totalRecoverable), 'if every open criterion reaches 5', 'good')}
    ${stat('Still short of your ask', money(Math.max(0, base.askingPrice - base.achievableValue - plan.totalRecoverable)),
      base.askingPrice - base.achievableValue - plan.totalRecoverable > 0 ? 'the price has to move too' : 'the ask is reachable', '')}
  </div>

  <h3>Every fix, priced and sequenced</h3>
  <p class="hint" style="margin-bottom:12px">Ranked by value recovered per month of work, weighted by difficulty.
  Cheap and fast first — a seller with a horizon needs a sequence, not a wish list.</p>
  <div class="panel scroll">
    <table>
      <thead><tr>
        <th></th><th>Fix</th><th>Pillar</th><th class="n">Now</th>
        <th class="n">+1 point</th><th class="n">To 5</th><th class="n">Months</th><th style="width:150px">Value</th>
      </tr></thead>
      <tbody>
        ${plan.items.map((i, n) => `
          <tr>
            <td class="n dim">${n + 1}</td>
            <td><strong>${esc(i.id)} · ${esc(i.name)}</strong>
                <div class="hint" style="margin-top:3px">${esc(i.anchorNow)}</div></td>
            <td class="dim">${esc(PILLARS[i.pillar].name)}</td>
            <td class="n">${i.currentScore}/5</td>
            <td class="n">${moneyShort(i.nextStepUplift)}</td>
            <td class="n good-t">${moneyShort(i.fullUplift)}</td>
            <td class="n">${i.months}</td>
            <td><div class="bar good"><i style="width:${(i.fullUplift / max) * 100}%"></i></div></td>
          </tr>`).join('')}
        ${plan.items.length === 0 ? '<tr><td colspan="8" class="dim">Nothing left to fix — every criterion is already at 5.</td></tr>' : ''}
      </tbody>
    </table>
  </div>

  <h3>The mandate</h3>
  <div class="verdict">
    <h4>${base.binding === 'fundability'
      ? 'Structure first, then quality.'
      : 'Quality first — the structure already works.'}</h4>
    <p>${plan.items.length
      ? `The first three fixes recover ${money(plan.items.slice(0, 3).reduce((s, i) => s + i.fullUplift, 0))}
         and take ${Math.max(...plan.items.slice(0, 3).map((i) => i.months))} months if run in parallel.
         The whole programme recovers ${money(plan.totalRecoverable)}.`
      : 'This business is already prepared. The work now is process, not remediation.'}</p>
  </div>`;
}

// ── Roll-up ───────────────────────────────────────────────────────────────
export function rollupView() {
  const i = state.rollup;
  const r = runRollup(i);
  const cap = absorptionCapacity(r);
  const maxWf = Math.max(...r.waterfall.map((w) => Math.abs(w.value)), 1);

  const sectorOptions = SECTORS.map(
    (s) => `<option value="${s.id}" ${s.id === i.sector ? 'selected' : ''}>${esc(s.name)} — ${s.ceiling.toFixed(1)}x</option>`,
  ).join('');

  return `
  <h2>Roll-up</h2>
  <p class="lede">Buy small at a small-business multiple, sell the group at a group multiple. The spread is
  the return; the debt is what makes it a return on very little equity. Every deal here is tested against the
  same ${turns(DSCR_FLOOR)} floor the audit uses.</p>

  <div class="split">
    <div>
      <h3>Platform</h3>
      <div class="panel">
        <div class="grid g3">
          <div class="field"><label>Sector</label>
            <select data-rollup="sector" data-kind="text">${sectorOptions}</select></div>
          <div class="field"><label>Platform EBITDA</label>
            <input data-rollup="platformEbitda" data-kind="number" value="${i.platformEbitda}" /></div>
          <div class="field"><label>Entry multiple</label>
            <input data-rollup="platformMultiple" data-kind="number" value="${i.platformMultiple}" /></div>
        </div>
      </div>

      <h3>Bolt-ons</h3>
      <div class="panel">
        <div class="grid g4">
          <div class="field"><label>How many</label>
            <input data-rollup="boltOnCount" data-kind="number" value="${i.boltOnCount}" /></div>
          <div class="field"><label>EBITDA each</label>
            <input data-rollup="boltOnEbitda" data-kind="number" value="${i.boltOnEbitda}" /></div>
          <div class="field"><label>Entry multiple</label>
            <input data-rollup="boltOnMultiple" data-kind="number" value="${i.boltOnMultiple}" /></div>
          <div class="field"><label>Synergy %</label>
            <input data-rollup="synergyPct" data-kind="rate" value="${(i.synergyPct * 100).toFixed(0)}" /></div>
        </div>
        <p class="hint">Synergy is cost taken out of each bolt-on, as a percentage of its EBITDA. It is the
        assumption buyers get wrong most often — model it low and be surprised upward.</p>
      </div>

      <h3>Funding and hold</h3>
      <div class="panel">
        <div class="grid g4">
          <div class="field"><label>Deposit %</label>
            <input data-rollup="structure.depositPct" data-kind="rate" value="${(i.structure.depositPct * 100).toFixed(0)}" /></div>
          <div class="field"><label>Seller note %</label>
            <input data-rollup="structure.sellerNotePct" data-kind="rate" value="${(i.structure.sellerNotePct * 100).toFixed(0)}" /></div>
          <div class="field"><label>Bank rate %</label>
            <input data-rollup="structure.bankRate" data-kind="rate" value="${(i.structure.bankRate * 100).toFixed(1)}" /></div>
          <div class="field"><label>Hold (years)</label>
            <input data-rollup="holdingYears" data-kind="number" value="${i.holdingYears}" /></div>
        </div>
        <label class="check">
          <input type="checkbox" data-rollup="structure.sellerNoteInterestOnly" data-kind="bool"
                 ${i.structure.sellerNoteInterestOnly ? 'checked' : ''} />
          <span>Seller notes interest-only with a bullet</span>
        </label>
      </div>

      <h3>Arbitrage</h3>
      <div class="panel scroll">
        <table>
          <thead><tr><th>Source of enterprise value</th><th class="n">Amount</th><th style="width:170px"></th></tr></thead>
          <tbody>
            ${r.waterfall.map((w) => `
              <tr><td>${esc(w.label)}</td><td class="n">${money(w.value)}</td>
                <td><div class="bar ${w.value < 0 ? 'bad' : 'good'}"><i style="width:${(Math.abs(w.value) / maxWf) * 100}%"></i></div></td></tr>`).join('')}
            <tr><td><strong>Enterprise value at exit</strong></td><td class="n"><strong>${money(r.exitEnterpriseValue)}</strong></td><td></td></tr>
            <tr><td>Debt outstanding at exit</td><td class="n bad-t">−${money(r.debtAtExit)}</td><td></td></tr>
            <tr><td><strong>Equity value at exit</strong></td><td class="n"><strong>${money(r.exitEquityValue)}</strong></td><td></td></tr>
          </tbody>
        </table>
      </div>

      <h3>Every deal, stress-tested</h3>
      <div class="panel scroll">
        <table>
          <thead><tr><th>Deal</th><th class="n">EBITDA</th><th class="n">Price</th><th class="n">Equity</th>
            <th class="n">Debt service</th><th class="n">DSCR</th></tr></thead>
          <tbody>
            <tr><td>Platform</td><td class="n">${money(i.platformEbitda)}</td><td class="n">${money(r.platform.price)}</td>
              <td class="n">${money(r.platform.deposit)}</td><td class="n">${money(r.platform.service)}</td>
              <td class="n ${r.platform.passes ? 'good-t' : 'bad-t'}">${turns(r.platform.dscr)}</td></tr>
            ${r.boltOns.map((b) => `
              <tr><td>Bolt-on ${b.index}</td><td class="n">${money(b.ebitda)}</td><td class="n">${money(b.price)}</td>
                <td class="n">${money(b.deposit)}</td><td class="n">${money(b.service)}</td>
                <td class="n ${b.passes ? 'good-t' : 'bad-t'}">${turns(b.dscr)}</td></tr>`).join('')}
            <tr><td><strong>Group</strong></td><td class="n"><strong>${money(r.combinedEbitda)}</strong></td>
              <td class="n"><strong>${money(r.totalPrice)}</strong></td><td class="n"><strong>${money(r.equityInvested)}</strong></td>
              <td class="n"><strong>${money(r.group.service)}</strong></td>
              <td class="n ${r.group.passes ? 'good-t' : 'bad-t'}"><strong>${turns(r.group.dscr)}</strong></td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="sticky">
      <div class="grid">
        ${stat('Blended entry', turns(r.blendedEntryMultiple), `${money(r.totalPrice)} for ${money(r.acquiredEbitda)} EBITDA`)}
        ${stat('Exit multiple', turns(r.exitMultiple), 'sector ceiling plus size premium')}
        ${stat('Arbitrage', turns(r.arbitrage), 'turns of multiple created by scale', r.arbitrage > 0 ? 'good' : 'bad')}
        ${stat('Equity in', money(r.equityInvested), 'deposits across every deal')}
        ${stat('Equity out', money(r.exitEquityValue), `${r.moic.toFixed(2)}x over ${i.holdingYears} years`, 'hero')}
        ${stat('Annualised', pct(r.irr, 1), 'on invested equity')}
        ${stat('Group DSCR', turns(r.group.dscr), r.group.passes ? 'serviceable' : 'below the floor — this does not fund',
          r.group.passes ? 'good' : 'bad')}
        ${stat('Next bolt-on capacity', money(cap.price), `${money(cap.ebitda)} of EBITDA before the floor breaks`)}
      </div>
      ${r.cashShortfall > 0 ? `
        <div class="verdict bad" style="margin-top:14px">
          <h4>The schedule outruns the cash</h4>
          <p>Scheduled amortisation over ${i.holdingYears} years exceeds what the group generates by
          ${money(r.cashShortfall)}. Debt is held flat to that extent rather than pretending it is repaid —
          this structure needs longer terms, more deferral, or fewer deals.</p>
        </div>` : ''}
    </div>
  </div>`;
}

// ── Criteria bank ─────────────────────────────────────────────────────────
export function bankView() {
  return `
  <h2>Criteria bank</h2>
  <p class="lede">Twenty criteria, the delta each one carries, and where that number comes from.
  The deltas are the part that has to be defensible — if they cannot be justified on a call, the tool
  becomes a liability the first time a seller quotes it back.</p>

  <div class="verdict">
    <h4>Review this, not the criteria</h4>
    <p>The criteria are uncontroversial. The <em>numbers</em> are the risk. Every row below carries a
    “why this number” justification so a review is agreeing or disagreeing with a stated position rather
    than with a black box. Sector ceilings are marked <span class="flag">provisional</span> and are not
    signed off.</p>
  </div>

  ${['credibility', 'capital', 'closing'].map((pid) => {
    const p = PILLARS[pid];
    const items = criteriaForPillar(pid);
    return `
    <h3>${esc(p.name)} — ${esc(p.sellSide)}</h3>
    <p class="hint" style="margin:-6px 0 12px;max-width:74ch">
      <strong>Buy-side:</strong> ${esc(p.buySide)} &nbsp;·&nbsp; <strong>Sell-side:</strong> ${esc(p.blurb)}</p>
    <div class="panel scroll">
      <table>
        <thead><tr><th style="width:52px">#</th><th>Criterion</th><th>Score 1</th><th>Score 5</th>
          <th class="n">Delta</th><th style="width:30%">Why this number</th></tr></thead>
        <tbody>
          ${items.map((c) => `
            <tr>
              <td class="dim">${esc(c.id)}</td>
              <td><strong>${esc(c.name)}</strong><div class="hint">${esc(c.question)}</div></td>
              <td class="dim">${esc(c.anchors[1])}</td>
              <td class="dim">${esc(c.anchors[5])}</td>
              <td class="n">${c.impact.kind === 'ebitda'
                ? `−${pct(c.impact.maxHaircut, 0)}<div class="hint">EBITDA</div>`
                : c.impact.kind === 'multiple'
                  ? `−${c.impact.maxPenalty.toFixed(2)}x<div class="hint">multiple</div>`
                  : `<span class="flag">${c.impact.target === 'gate' ? 'gate' : 'computed'}</span>`}</td>
              <td class="hint">${esc(c.why)}</td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>`;
  }).join('')}

  <h3>Bounds</h3>
  <div class="grid g3">
    ${stat('Combined EBITDA haircut cap', pct(MAX_COMBINED_EBITDA_HAIRCUT, 0), 'lines rescale proportionally above this')}
    ${stat('Multiple floor', turns(MULTIPLE_FLOOR), 'the worst business the engine will price')}
    ${stat('Worst case', `${pct(MAX_COMBINED_EBITDA_HAIRCUT, 0)} · ${turns(MULTIPLE_FLOOR)}`, 'half the claimed earnings at the floor multiple')}
  </div>`;
}

// ── Method ────────────────────────────────────────────────────────────────
export function methodView() {
  return `
  <h2>Method</h2>
  <p class="lede">What the engine does, what it assumes, and what has not been signed off.</p>

  <div class="quote">“A lot of times sellers haven’t set up properly to maximise the value they get
  when they exit.”</div>

  <h3>The two haircuts</h3>
  <div class="panel">
    <pre class="num" style="margin:0;white-space:pre-wrap;font-size:13px;line-height:1.7">
Haircut 1 — EBITDA:    claimed EBITDA → defensible EBITDA
   owner replacement cost, related-party rent, one-offs,
   personal expenses, unrecorded maintenance capex
   combined haircut capped at ${pct(MAX_COMBINED_EBITDA_HAIRCUT, 0)}

Haircut 2 — MULTIPLE:  premium ceiling → achievable multiple
   owner dependency, revenue quality, cash rhythm,
   management depth, concentration, assignability
   floored at ${turns(MULTIPLE_FLOOR)}

value = defensible EBITDA × achievable multiple
gap   = asking price − value</pre>
  </div>

  <h3>Scoring</h3>
  <p class="lede">A self-scored criterion applies its delta proportionally: <span class="num">(5 − score) ÷ 4</span>.
  Score 5 costs nothing, score 1 costs the full delta, score 3 costs half. Two criteria are not self-scored —
  the owner salary add-back and DSCR are computed from the seller’s own inputs, because those are the two
  a seller most wants to argue with.</p>

  <h3>The Capital gate</h3>
  <div class="panel">
    <pre class="num" style="margin:0;white-space:pre-wrap;font-size:13px;line-height:1.7">
free cash flow  = (defensible EBITDA − maintenance capex) × (1 − tax)
debt service    = amortising bank tranche + seller note
DSCR            = free cash flow ÷ debt service
floor           = ${turns(DSCR_FLOOR)}
max fundable    = free cash flow ÷ (floor × debt service per unit of price)</pre>
  </div>
  <p class="lede">Tax is applied to EBITDA less maintenance capex rather than to taxable profit after
  interest. That is deliberately conservative and it is stated here rather than buried: it understates
  cash flow slightly, which is the right direction for a test a seller is going to be shown.</p>

  <h3>What is not signed off</h3>
  <div class="panel">
    <table>
      <tr><td><span class="flag">provisional</span> Sector ceilings</td>
        <td>Placeholder ranges. A physio clinic and an electrical contractor do not share a premium
        multiple; these need real numbers per vertical rather than figures pulled off the internet.</td></tr>
      <tr><td><span class="flag">provisional</span> Individual deltas</td>
        <td>Each carries a stated justification in the criteria bank. Calibrated as a set against the
        broker case, not validated individually against completed transactions.</td></tr>
      <tr><td><span class="flag">provisional</span> Size premium</td>
        <td>Step function by EBITDA scale. Directionally right, magnitudes unverified.</td></tr>
      <tr><td>Fixed</td>
        <td>The DSCR floor of ${turns(DSCR_FLOOR)} and the arithmetic itself. Neither is a judgement call.</td></tr>
    </table>
  </div>

  <h3>Calibration</h3>
  <p class="lede">The engine was built from the criteria, not fitted to a target. Run
  <span class="num">npm run calibrate</span> to reproduce the check: the broker case Josh describes on
  camera — $3m revenue, a claimed $1m EBITDA, a $250k owner salary added back while the owner works the
  business daily — lands at a defensible EBITDA within 5% of the figure he gives off the cuff for the
  same business.</p>

  <h3>Limits</h3>
  <p class="lede">This is a triage instrument, not a valuation. It produces a defensible range and a
  prioritised remediation plan from self-reported inputs. It does not verify anything, and a seller who
  scores themselves generously gets a generous answer — which is why the two numbers that matter most
  are computed rather than scored.</p>`;
}
