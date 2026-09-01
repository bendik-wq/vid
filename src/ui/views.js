/** Screens. Each returns HTML; app.js wires events by delegation. */

import { CRITERIA, PILLARS, criteriaForPillar } from '../data/criteria.js';
import { SECTORS } from '../data/sectors.js';
import { config, deltaFor, defaultDeltaFor, ceilingFor, isTuned, isSectorTuned, tuningSummary, DEFAULT_CONFIG } from '../data/config.js';
import { runAudit } from '../engine/valuation.js';
import { remediationPlan, restructureTrajectory, pillarUplift } from '../engine/restructure.js';
import { runRollup, absorptionCapacity } from '../engine/rollup.js';
import { state } from './state.js';
import { money, moneyShort, turns, pct, esc } from './format.js';
import { bridgeBar, pillarMeter, thresholdScale, gapBar, trajectory, multipleSpread, rankBar, pillarBars } from './charts.js';

const tile = (k, v, s, cls = '') =>
  `<div class="tile ${cls}"><div class="k">${esc(k)}</div><div class="v">${v}</div>${s ? `<div class="s">${s}</div>` : ''}</div>`;

const numField = (label, path, value, hint) => `
  <div class="field">
    <label>${esc(label)}</label>
    <input data-bind="${path}" data-kind="number" value="${esc(value ?? 0)}" inputmode="numeric" />
    ${hint ? `<p class="hint">${hint}</p>` : ''}
  </div>`;

const rateField = (label, path, value, dp = 0) => `
  <div class="field">
    <label>${esc(label)}</label>
    <input data-bind="${path}" data-kind="rate" value="${(value * 100).toFixed(dp)}" inputmode="decimal" />
  </div>`;

// ── The 3C spine ──────────────────────────────────────────────────────────
/** What each pillar is currently costing, in the unit that pillar moves. */
export function pillarCost(pillar, r) {
  if (pillar === 'credibility') {
    const lost = r.haircuts.lines.reduce((s, l) => s + l.appliedAmount, 0);
    const turnsLost = r.penalties.lines
      .filter((l) => PILLARS[l.pillar] && l.pillar === 'credibility')
      .reduce((s, l) => s + l.penalty, 0);
    return {
      headline: `−${money(lost)}`,
      detail: `of claimed earnings${turnsLost > 0 ? `, and −${turns(turnsLost)} of multiple` : ''}`,
      critical: lost > 0,
    };
  }
  if (pillar === 'capital') {
    const turnsLost = r.penalties.lines.filter((l) => l.pillar === 'capital').reduce((s, l) => s + l.penalty, 0);
    return {
      headline: `${turns(r.dscr.dscr)} DSCR`,
      detail: r.dscr.passes
        ? `fundable at your price, −${turns(turnsLost)} of multiple`
        : `below the ${turns(config.dscrFloor)} floor, −${turns(turnsLost)} of multiple`,
      critical: !r.dscr.passes,
    };
  }
  const turnsLost = r.penalties.lines.filter((l) => l.pillar === 'closing').reduce((s, l) => s + l.penalty, 0);
  return {
    headline: `−${turns(turnsLost)}`,
    detail: 'of multiple, on completion risk alone',
    critical: turnsLost > 0,
  };
}

export function threeCStrip(r, { linked = false } = {}) {
  return `
  <div class="grid g3">
    ${['credibility', 'capital', 'closing'].map((id) => {
      const p = PILLARS[id];
      const cost = pillarCost(id, r);
      const score = r.pillarScores[id];
      return `
      <div class="pillar pillar-card" data-pillar="${id}">
        <div class="pillar-name"><span class="dot"></span>${esc(p.name)}</div>
        <div class="pillar-q">${esc(p.sellSide)}</div>
        ${pillarMeter(score)}
        <div class="between">
          <span class="pillar-cost ${cost.critical ? 'is-critical' : ''}">${cost.headline}</span>
          <span class="muted" style="font-size:13px">${score.toFixed(1)} / 5</span>
        </div>
        <div class="small" style="margin:-6px 0 0">${esc(cost.detail)}</div>
        ${linked ? `<div><button class="btn quiet tiny" data-act="open-pillar" data-pillar="${id}">Score this</button></div>` : ''}
      </div>`;
    }).join('')}
  </div>`;
}

// ── Audit ─────────────────────────────────────────────────────────────────
export function auditView() {
  const a = state.audit;
  const r = runAudit(a);
  const s = a.structure;

  return `
  <section>
    <p class="eyebrow">The audit</p>
    <h1 class="display">What do you want for the business?</h1>
    <p class="lede">Start with your number. Everything after this is arithmetic on figures you supply —
    which is the point. There is nothing here to argue with.</p>
    <div style="max-width:340px">
      <input class="big" data-bind="askingPrice" data-kind="number" value="${esc(a.askingPrice)}"
             inputmode="numeric" aria-label="Your asking price" />
    </div>
  </section>

  <section>
    <h2 class="headline">The earnings you are claiming</h2>
    <div class="grid g3">
      ${numField('Claimed EBITDA', 'financials.claimedEbitda', a.financials.claimedEbitda,
        'After every add-back — the figure on the memorandum.')}
      ${numField('Market cost to replace you', 'financials.ownerReplacementCost', a.financials.ownerReplacementCost,
        'What you would pay someone to do everything you do.')}
      ${numField('Owner pay added back', 'financials.ownerSalaryAddedBack', a.financials.ownerSalaryAddedBack,
        'Add your pay back and a buyer inherits a vacancy, not a profit.')}
    </div>
    <details class="card" style="margin-top:16px" ${a.ui?.moreOpen ? 'open' : ''}>
      <summary style="cursor:pointer;font-weight:600;font-size:15px">More detail</summary>
      <div class="grid g3" style="margin-top:18px">
        ${numField('Revenue', 'financials.revenue', a.financials.revenue)}
        ${numField('Owner pay drawn', 'financials.ownerSalaryDrawn', a.financials.ownerSalaryDrawn)}
        ${numField('Maintenance capex a year', 'financials.maintenanceCapex', a.financials.maintenanceCapex)}
        <div class="field">
          <label>Business name</label>
          <input data-bind="business.name" data-kind="text" value="${esc(a.business.name)}" placeholder="Trading name" />
        </div>
        <div class="field">
          <label>Sector</label>
          <select data-bind="business.sector" data-kind="text">
            ${SECTORS.map((x) => `<option value="${x.id}" ${x.id === a.business.sector ? 'selected' : ''}>${esc(x.name)} — ${ceilingFor(x.id).toFixed(1)}x</option>`).join('')}
          </select>
        </div>
        ${rateField('Tax rate', 'financials.taxRate', a.financials.taxRate)}
      </div>
    </details>
  </section>

  <section>
    <h2 class="headline">How a buyer would pay for it</h2>
    <p class="body tight">
      ${pct(s.depositPct, 0)} deposit, ${pct(s.sellerNotePct, 0)} left in as a seller note at
      ${pct(s.sellerNoteRate, 1)}${s.sellerNoteInterestOnly ? ' interest-only' : ` over ${s.sellerNoteTermYears} years`},
      the rest borrowed at ${pct(s.bankRate, 1)} over ${s.bankTermYears} years.
    </p>
    <details class="card" style="margin-top:16px">
      <summary style="cursor:pointer;font-weight:600;font-size:15px">Change the structure</summary>
      <div class="grid g3" style="margin-top:18px">
        ${rateField('Buyer deposit %', 'structure.depositPct', s.depositPct)}
        ${rateField('Seller note %', 'structure.sellerNotePct', s.sellerNotePct)}
        ${rateField('Bank rate %', 'structure.bankRate', s.bankRate, 1)}
        ${numField('Bank term (years)', 'structure.bankTermYears', s.bankTermYears)}
        ${rateField('Seller note rate %', 'structure.sellerNoteRate', s.sellerNoteRate, 1)}
        ${numField('Seller note term (years)', 'structure.sellerNoteTermYears', s.sellerNoteTermYears)}
      </div>
      <label class="switch" style="margin-top:16px">
        <input type="checkbox" data-bind="structure.sellerNoteInterestOnly" data-kind="bool"
               ${s.sellerNoteInterestOnly ? 'checked' : ''} />
        <span>Seller note is interest-only with a bullet at the end</span>
      </label>
      <p class="hint">The single biggest lever on whether your price is fundable. Try it both ways.</p>
    </details>
  </section>

  <section>
    <h2 class="headline">The three C&rsquo;s</h2>
    <p class="lede">Josh teaches these to buyers. Pointed at a seller they ask the same three questions
    of your business. Score one to five against the anchors; five is what a buyer wants to find.</p>
    ${threeCStrip(r)}
    <div style="margin-top:28px">
      ${['credibility', 'capital', 'closing'].map((id) => pillarFold(id, r)).join('')}
    </div>
  </section>

  <section class="actions">
    <button class="btn" data-act="goto" data-view="value">See what it is worth</button>
    <button class="btn quiet" data-act="load-broker">Load Josh&rsquo;s broker case</button>
    <button class="btn quiet" data-act="reset">Clear</button>
  </section>`;
}

function pillarFold(id, r) {
  const p = PILLARS[id];
  const open = state.ui.openPillar === id;
  const items = criteriaForPillar(id);
  const scored = items.filter((c) => c.impact.kind !== 'computed');
  const done = scored.filter((c) => state.audit.scores[c.id] !== undefined).length;
  return `
  <div class="fold pillar" data-pillar="${id}" data-open="${open}">
    <button class="fold-head" data-act="toggle-pillar" data-pillar="${id}" aria-expanded="${open}">
      <span class="dot"></span>
      <span class="fold-title">${esc(p.name)}</span>
      <span class="fold-meta">
        <span>${done} criteria</span>
        <span>${r.pillarScores[id].toFixed(1)} / 5</span>
        <span class="chev"></span>
      </span>
    </button>
    ${open ? `<div class="fold-body">
      <p class="small" style="margin:0 0 14px"><strong>Buy-side:</strong> ${esc(p.buySide)}
        &nbsp;·&nbsp; <strong>Sell-side:</strong> ${esc(p.sellSide)}</p>
      ${items.map((c) => critRow(c)).join('')}
    </div>` : ''}
  </div>`;
}

function critRow(c) {
  if (c.impact.kind === 'computed') {
    return `
    <div class="crit">
      <div>
        <div class="crit-name">${esc(c.name)} <span class="badge">computed</span></div>
        <div class="crit-q">${esc(c.question)}</div>
        <div class="crit-anchor">${esc(c.computedNote)}</div>
      </div>
      <div></div>
    </div>`;
  }
  const score = Number(state.audit.scores[c.id] ?? 3);
  const delta = c.impact.kind === 'ebitda'
    ? `worth up to ${pct(deltaFor(c), 0)} of EBITDA`
    : `worth up to ${turns(deltaFor(c))} of multiple`;
  return `
  <div class="crit">
    <div>
      <div class="crit-name">${esc(c.name)}</div>
      <div class="crit-q">${esc(c.question)}</div>
      <div class="crit-anchor">${esc(c.anchors[score] ?? c.anchors[score < 3 ? 1 : 5])}</div>
    </div>
    <div>
      <div class="segs">
        ${[1, 2, 3, 4, 5].map((n) => `<button data-act="score" data-id="${c.id}" data-score="${n}"
          class="${n === score ? 'on' : ''}" aria-label="Score ${n} of 5">${n}</button>`).join('')}
      </div>
      <div class="crit-delta">${delta}</div>
    </div>
  </div>`;
}

// ── Value ─────────────────────────────────────────────────────────────────
export function valueView() {
  const r = runAudit(state.audit);
  const name = state.audit.business.name || 'The business';
  const gapUp = r.gap > 0;

  return `
  <section>
    <p class="eyebrow">${esc(name)}</p>
    <h1 class="display" style="max-width:24ch">${gapUp ? 'The gap between your number and a buyer&rsquo;s' : 'You are asking below what this supports'}</h1>
    <div class="figure xl ${gapUp ? 'is-critical' : 'is-good'}" style="margin:28px 0 12px">${money(Math.abs(r.gap))}</div>
    <p class="lede">You are asking ${money(r.askingPrice)} — ${turns(r.impliedMultipleAtAsking)} of what the
    earnings actually defend. The audit supports ${money(r.achievableValue)}.</p>
    ${gapBar({ asking: r.askingPrice, achievable: r.achievableValue, fundable: r.dscr.maxFundablePrice })}
  </section>

  <section>
    <h2 class="headline">Where it went</h2>
    <p class="lede">Two haircuts, both taken from your own figures. The first moves the earnings.
    The second moves the multiple.</p>

    <div class="card" style="margin-bottom:16px">
      <div class="between" style="margin-bottom:16px">
        <div>
          <p class="eyebrow" style="margin:0 0 6px">Haircut one · earnings</p>
          <div class="figure lg">${money(r.defensibleEbitda)}</div>
          <p class="small" style="margin:6px 0 0">defensible, from ${money(r.claimedEbitda)} claimed</p>
        </div>
        <div class="badge critical">−${pct(r.haircuts.appliedFraction)}</div>
      </div>
      ${bridgeBar({
        total: r.claimedEbitda,
        keep: r.defensibleEbitda,
        keepLabel: 'Defensible',
        cuts: r.haircuts.lines.map((l) => ({ label: l.name, value: l.appliedAmount })),
      })}
      ${r.haircuts.capApplied ? `<p class="hint">Raw haircut was ${pct(r.haircuts.rawFraction)}; capped at ${pct(config.ebitdaHaircutCap, 0)} and rescaled.</p>` : ''}
    </div>

    <div class="card">
      <div class="between" style="margin-bottom:16px">
        <div>
          <p class="eyebrow" style="margin:0 0 6px">Haircut two · multiple</p>
          <div class="figure lg">${turns(r.achievableMultiple)}</div>
          <p class="small" style="margin:6px 0 0">achievable, from a ${turns(r.ceiling)} ceiling</p>
        </div>
        <div class="badge critical">−${turns(r.penalties.total)}</div>
      </div>
      ${bridgeBar({
        total: r.ceiling,
        keep: r.achievableMultiple,
        keepLabel: 'Achievable',
        cuts: r.penalties.lines.map((l) => ({ label: l.name, value: l.penalty })),
        format: turns,
      })}
      ${r.multipleFloored ? `<p class="hint">Penalties exceeded the ceiling; held at the ${turns(config.multipleFloor)} floor.</p>` : ''}
    </div>
  </section>

  <section>
    <h2 class="headline">Could a buyer even fund it?</h2>
    <p class="lede">${r.dscr.passes
      ? `Yes. ${money(r.dscr.freeCashFlow)} of free cash flow against ${money(r.dscr.annualService)} of annual debt service.`
      : `No. At your price a buyer faces ${money(r.dscr.annualService)} a year of debt service against ${money(r.dscr.freeCashFlow)} of free cash flow.`}</p>
    ${thresholdScale({ value: r.dscr.dscr, floor: config.dscrFloor, max: 3, label: 'DSCR at your asking price' })}
    <div class="note ${r.dscr.passes ? 'good' : 'critical'}" style="margin:26px 0">
      <p style="margin:0"><strong>Your asking price implies a ${turns(r.dscr.dscr)} DSCR. The floor is ${turns(config.dscrFloor)}.</strong>
      ${r.dscr.passes
        ? ' The deal is fundable as structured.'
        : ` No bank funds this. No seller-financed buyer survives it. The most a buyer could fund on this
            structure is ${money(r.dscr.maxFundablePrice)}. Your price is not high — it is unfundable.`}</p>
    </div>
    <div class="grid g4">
      ${tile('Deposit', money(r.dscr.deposit), pct(r.dscr.structure.depositPct, 0))}
      ${tile('Bank debt', money(r.dscr.bankDebt), `${pct(r.dscr.structure.bankRate, 1)} over ${r.dscr.structure.bankTermYears}y`)}
      ${tile('Seller note', money(r.dscr.sellerNote), r.dscr.structure.sellerNoteInterestOnly ? 'interest-only' : `${r.dscr.structure.sellerNoteTermYears}y amortising`)}
      ${tile('Debt service', money(r.dscr.annualService), 'every year')}
    </div>
  </section>

  <section>
    <h2 class="headline">Which ceiling binds</h2>
    <div class="grid g2">
      ${tile('Quality ceiling', money(r.achievableValue), 'what it earns × what it deserves',
        r.binding === 'quality' ? 'flag-critical' : '')}
      ${tile('Fundability ceiling', money(r.dscr.maxFundablePrice), `most a buyer can service at ${turns(config.dscrFloor)}`,
        r.binding === 'fundability' ? 'flag-critical' : '')}
    </div>
    <div class="note" style="margin-top:22px">
      <p style="margin:0"><strong>${r.binding === 'fundability'
        ? 'Cash binds, not quality.'
        : 'Quality binds, not cash.'}</strong>
      ${r.binding === 'fundability'
        ? ` A buyer cannot service more than ${money(r.dscr.maxFundablePrice)} on this structure even though the
            business supports ${money(r.achievableValue)}. Lengthen the note, defer more, take the difference in
            earn-out — the price need not move, the structure must.`
        : ' Debt service is not the constraint. Every extra pound of price has to come from a better business.'}</p>
    </div>
  </section>

  <section>
    <h2 class="headline">What each C is worth</h2>
    <p class="lede">Value recovered if that pillar alone reached five and the other two stayed exactly
    as they are. They deliberately do not sum: earnings times multiple means the three compound, so
    fixing all three is worth <strong>more</strong> than the three figures added together.</p>
    ${pillarBars(pillarUplift(state.audit).map((u) => ({
      name: PILLARS[u.pillar].name,
      sub: `${u.score.toFixed(1)} / 5 today${u.multiple > 0 ? ` · +${turns(u.multiple)} of multiple` : ''}${u.ebitda > 0 ? ` · +${money(u.ebitda)} of earnings` : ''}`,
      value: u.value,
      color: `var(--${u.pillar})`,
    })))}
    ${threeCStrip(r, { linked: true })}
  </section>

  <section class="actions">
    <button class="btn" data-act="goto" data-view="plan">What closes the gap</button>
    <button class="btn quiet" data-act="export">Export report</button>
    <button class="btn quiet" data-act="print">Print</button>
  </section>`;
}

// ── Plan ──────────────────────────────────────────────────────────────────
export function planView() {
  const plan = remediationPlan(state.audit);
  const traj = restructureTrajectory(state.audit);
  const base = plan.base;
  const max = Math.max(...plan.items.map((i) => i.fullUplift), 1);
  const top3 = plan.items.slice(0, 3);

  return `
  <section>
    <p class="eyebrow">The plan</p>
    <h1 class="display">Every fix, priced.</h1>
    <p class="lede">The audit says what the business is worth today. This says what each fix is worth,
    so the conversation stops being “your price is wrong” and becomes “here is the sequence”.</p>
    ${trajectory(traj.map((t) => ({ label: t.label, value: t.result.achievableValue })))}
    <p class="small">Horizons assume the workstreams run in parallel and every criterion reachable inside the
    window lands at 5. It is the ceiling of the plan, not a forecast.</p>
  </section>

  <section>
    <div class="grid g3">
      ${tile('Value today', money(base.achievableValue), `${money(base.defensibleEbitda)} × ${turns(base.achievableMultiple)}`)}
      ${tile('Total recoverable', money(plan.totalRecoverable), 'doing all of it, not the sum of the parts', 'flag-good')}
      ${tile('Still short of your ask',
        money(Math.max(0, base.askingPrice - base.achievableValue - plan.totalRecoverable)),
        base.askingPrice - base.achievableValue - plan.totalRecoverable > 0 ? 'the price has to move too' : 'the ask is reachable')}
    </div>
  </section>

  ${top3.length ? `
  <section>
    <h2 class="headline">Start here</h2>
    <p class="lede">Ranked by value recovered per month of work, weighted by difficulty. The first three
    recover ${money(top3.reduce((s, i) => s + i.fullUplift, 0))} in
    ${Math.max(...top3.map((i) => i.months))} months if run in parallel.</p>
    <div class="grid g3">
      ${top3.map((i) => `
        <div class="pillar tile" data-pillar="${i.pillar}">
          <div class="k" style="display:flex;align-items:center;gap:7px"><span class="dot"></span>${esc(PILLARS[i.pillar].name)}</div>
          <div style="font-size:16px;font-weight:600;letter-spacing:-0.02em;margin-top:10px">${esc(i.name)}</div>
          <div class="v is-good" style="font-size:24px">${money(i.fullUplift)}</div>
          <div class="s">${i.currentScore}/5 today · ${i.months} months</div>
        </div>`).join('')}
    </div>
  </section>` : ''}

  <section>
    <h2 class="headline">Everything else</h2>
    <div class="scroll">
      <table>
        <thead><tr>
          <th>Fix</th><th>Pillar</th><th class="n">Now</th><th class="n">+1 point</th>
          <th class="n">To 5</th><th class="n">Months</th><th style="width:120px"></th>
        </tr></thead>
        <tbody>
          ${plan.items.map((i) => `
            <tr>
              <td><strong>${esc(i.name)}</strong><div class="hint" style="margin-top:3px">${esc(i.anchorNow)}</div></td>
              <td class="muted">${esc(PILLARS[i.pillar].name)}</td>
              <td class="n">${i.currentScore}/5</td>
              <td class="n muted">${moneyShort(i.nextStepUplift)}</td>
              <td class="n"><strong>${moneyShort(i.fullUplift)}</strong></td>
              <td class="n muted">${i.months}</td>
              <td>${rankBar(i.fullUplift, max)}</td>
            </tr>`).join('')}
          ${plan.items.length === 0 ? '<tr><td colspan="7" class="muted">Nothing left to fix — every criterion is already at 5.</td></tr>' : ''}
        </tbody>
      </table>
    </div>
  </section>`;
}

// ── Roll-up ───────────────────────────────────────────────────────────────
export function rollupView() {
  const i = state.rollup;
  const r = runRollup(i);
  const cap = absorptionCapacity(r);

  return `
  <section>
    <p class="eyebrow">The roll-up</p>
    <h1 class="display">Buy small. Sell big. Keep the spread.</h1>
    <p class="lede">Small businesses trade at small-business multiples and groups trade at group multiples.
    The spread is the return; debt is what makes it a return on very little equity. Every deal here is
    tested against the same ${turns(config.dscrFloor)} floor the audit uses.</p>
    ${multipleSpread({ entry: r.blendedEntryMultiple, exit: r.exitMultiple })}
  </section>

  <section>
    <div class="grid g4">
      ${tile('Equity in', money(r.equityInvested), 'deposits across every deal')}
      ${tile('Equity out', money(r.exitEquityValue), `${r.moic.toFixed(2)}x over ${i.holdingYears} years`, 'flag-good')}
      ${tile('Annualised', pct(r.irr, 1), 'on invested equity')}
      ${tile('Group DSCR', turns(r.group.dscr), r.group.passes ? 'serviceable' : 'below the floor',
        r.group.passes ? 'flag-good' : 'flag-critical')}
    </div>
    ${!r.group.passes ? `
      <div class="note critical" style="margin-top:22px">
        <p style="margin:0"><strong>This does not fund as structured.</strong>
        Group cash flow covers ${turns(r.group.dscr)} of debt service against a ${turns(config.dscrFloor)} floor.
        Longer terms, more deferral, or fewer deals — the same three levers a seller gets.</p>
      </div>` : ''}
    ${r.cashShortfall > 0 ? `
      <div class="note critical" style="margin-top:16px">
        <p style="margin:0"><strong>The amortisation schedule outruns the cash by ${money(r.cashShortfall)}.</strong>
        Debt is held flat to that extent rather than pretending it is repaid.</p>
      </div>` : ''}
  </section>

  <section>
    <h2 class="headline">The deals</h2>
    <div class="grid g3">
      <div class="field"><label>Sector</label>
        <select data-rollup="sector" data-kind="text">
          ${SECTORS.map((x) => `<option value="${x.id}" ${x.id === i.sector ? 'selected' : ''}>${esc(x.name)} — ${ceilingFor(x.id).toFixed(1)}x</option>`).join('')}
        </select></div>
      <div class="field"><label>Platform EBITDA</label>
        <input data-rollup="platformEbitda" data-kind="number" value="${i.platformEbitda}" inputmode="numeric" /></div>
      <div class="field"><label>Platform entry multiple</label>
        <input data-rollup="platformMultiple" data-kind="number" value="${i.platformMultiple}" inputmode="decimal" /></div>
      <div class="field"><label>Bolt-ons</label>
        <input data-rollup="boltOnCount" data-kind="number" value="${i.boltOnCount}" inputmode="numeric" /></div>
      <div class="field"><label>EBITDA each</label>
        <input data-rollup="boltOnEbitda" data-kind="number" value="${i.boltOnEbitda}" inputmode="numeric" /></div>
      <div class="field"><label>Bolt-on entry multiple</label>
        <input data-rollup="boltOnMultiple" data-kind="number" value="${i.boltOnMultiple}" inputmode="decimal" /></div>
    </div>
    <details class="card" style="margin-top:16px">
      <summary style="cursor:pointer;font-weight:600;font-size:15px">Synergies, funding and hold</summary>
      <div class="grid g4" style="margin-top:18px">
        <div class="field"><label>Synergy %</label>
          <input data-rollup="synergyPct" data-kind="rate" value="${(i.synergyPct * 100).toFixed(0)}" /></div>
        <div class="field"><label>Deposit %</label>
          <input data-rollup="structure.depositPct" data-kind="rate" value="${(i.structure.depositPct * 100).toFixed(0)}" /></div>
        <div class="field"><label>Seller note %</label>
          <input data-rollup="structure.sellerNotePct" data-kind="rate" value="${(i.structure.sellerNotePct * 100).toFixed(0)}" /></div>
        <div class="field"><label>Bank rate %</label>
          <input data-rollup="structure.bankRate" data-kind="rate" value="${(i.structure.bankRate * 100).toFixed(1)}" /></div>
        <div class="field"><label>Hold (years)</label>
          <input data-rollup="holdingYears" data-kind="number" value="${i.holdingYears}" /></div>
        <div class="field"><label>Maintenance capex %</label>
          <input data-rollup="maintenanceCapexPct" data-kind="rate" value="${(i.maintenanceCapexPct * 100).toFixed(0)}" /></div>
      </div>
      <label class="switch" style="margin-top:16px">
        <input type="checkbox" data-rollup="structure.sellerNoteInterestOnly" data-kind="bool"
               ${i.structure.sellerNoteInterestOnly ? 'checked' : ''} />
        <span>Seller notes interest-only with a bullet</span>
      </label>
      <p class="hint">Synergy is cost taken out of each bolt-on as a share of its EBITDA. It is the assumption
      buyers get wrong most often — model it low and be surprised upward.</p>
    </details>
  </section>

  <section>
    <h2 class="headline">Where the value comes from</h2>
    <div class="scroll">
      <table>
        <tbody>
          ${r.waterfall.map((w) => `
            <tr><td>${esc(w.label)}</td><td class="n">${money(w.value)}</td>
              <td style="width:160px">${rankBar(Math.abs(w.value), Math.max(...r.waterfall.map((x) => Math.abs(x.value)), 1))}</td></tr>`).join('')}
          <tr class="row-total"><td>Enterprise value at exit</td><td class="n">${money(r.exitEnterpriseValue)}</td><td></td></tr>
          <tr><td class="muted">Debt outstanding at exit</td><td class="n is-critical">−${money(r.debtAtExit)}</td><td></td></tr>
          <tr class="row-total"><td>Equity value at exit</td><td class="n">${money(r.exitEquityValue)}</td><td></td></tr>
        </tbody>
      </table>
    </div>
  </section>

  <section>
    <h2 class="headline">Every deal, stress-tested</h2>
    <div class="scroll">
      <table>
        <thead><tr><th>Deal</th><th class="n">EBITDA</th><th class="n">Price</th><th class="n">Equity</th>
          <th class="n">Debt service</th><th class="n">DSCR</th></tr></thead>
        <tbody>
          <tr><td>Platform</td><td class="n">${money(i.platformEbitda)}</td><td class="n">${money(r.platform.price)}</td>
            <td class="n">${money(r.platform.deposit)}</td><td class="n">${money(r.platform.service)}</td>
            <td class="n ${r.platform.passes ? 'is-good' : 'is-critical'}">${turns(r.platform.dscr)}</td></tr>
          ${r.boltOns.map((b) => `
            <tr><td class="muted">Bolt-on ${b.index}</td><td class="n">${money(b.ebitda)}</td><td class="n">${money(b.price)}</td>
              <td class="n">${money(b.deposit)}</td><td class="n">${money(b.service)}</td>
              <td class="n ${b.passes ? 'is-good' : 'is-critical'}">${turns(b.dscr)}</td></tr>`).join('')}
          <tr class="row-total"><td>Group</td><td class="n">${money(r.combinedEbitda)}</td><td class="n">${money(r.totalPrice)}</td>
            <td class="n">${money(r.equityInvested)}</td><td class="n">${money(r.group.service)}</td>
            <td class="n ${r.group.passes ? 'is-good' : 'is-critical'}">${turns(r.group.dscr)}</td></tr>
        </tbody>
      </table>
    </div>
    <p class="small" style="margin-top:16px">Next bolt-on capacity before the floor breaks:
    <strong>${money(cap.price)}</strong> of price, ${money(cap.ebitda)} of EBITDA,
    ${money(cap.equityNeeded)} of equity.</p>
  </section>`;
}

// ── Tune ──────────────────────────────────────────────────────────────────
export function tuneView() {
  const drift = tuningSummary();
  return `
  <section>
    <p class="eyebrow">Tuning</p>
    <h1 class="display">The numbers, not the criteria.</h1>
    <p class="lede">The criteria are uncontroversial. The deltas are the risk — if one cannot be justified
    on a call, the tool becomes a liability the first time a seller quotes it back. Every row carries the
    reasoning behind its number. Change any of them and the audit, the plan and the roll-up all move.</p>
    ${drift.count > 0 ? `
      <div class="note" style="margin-bottom:22px">
        <p style="margin:0"><strong>${drift.count} value${drift.count === 1 ? '' : 's'} tuned away from the shipped defaults.</strong>
        <button class="btn quiet tiny" data-act="reset-config" style="margin-left:10px">Reset all</button></p>
      </div>` : ''}
  </section>

  <section>
    <h2 class="headline">Bounds</h2>
    <div class="grid g3">
      <div class="field"><label>DSCR floor</label>
        <input data-config="dscrFloor" data-kind="number" value="${config.dscrFloor}" inputmode="decimal" />
        <p class="hint">Below this, no lender underwrites. Default ${DEFAULT_CONFIG.dscrFloor}.</p></div>
      <div class="field"><label>Multiple floor</label>
        <input data-config="multipleFloor" data-kind="number" value="${config.multipleFloor}" inputmode="decimal" />
        <p class="hint">The worst business the engine will price. Default ${DEFAULT_CONFIG.multipleFloor}.</p></div>
      <div class="field"><label>Combined EBITDA haircut cap %</label>
        <input data-config="ebitdaHaircutCap" data-kind="rate" value="${(config.ebitdaHaircutCap * 100).toFixed(0)}" />
        <p class="hint">Lines rescale proportionally above this. Default ${pct(DEFAULT_CONFIG.ebitdaHaircutCap, 0)}.</p></div>
    </div>
  </section>

  <section>
    <h2 class="headline">Sector ceilings</h2>
    <p class="lede">A physio clinic and an electrical contractor do not share a premium multiple. These are
    placeholders until they are replaced with real ranges for the core verticals.</p>
    <div class="scroll">
      <table>
        <thead><tr><th>Sector</th><th class="n" style="width:140px">Ceiling</th><th class="n" style="width:110px">Shipped</th><th></th></tr></thead>
        <tbody>
          ${SECTORS.map((s) => `
            <tr>
              <td>${esc(s.name)} ${isSectorTuned(s.id) ? '<span class="badge warning">tuned</span>' : '<span class="badge">provisional</span>'}</td>
              <td class="n"><input data-config="ceilings.${s.id}" data-kind="number" value="${ceilingFor(s.id)}"
                    style="text-align:right" inputmode="decimal" /></td>
              <td class="n muted">${s.ceiling.toFixed(1)}x</td>
              <td class="n">${isSectorTuned(s.id) ? `<button class="btn quiet tiny" data-act="clear-config" data-path="ceilings.${s.id}">Reset</button>` : ''}</td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </section>

  ${['credibility', 'capital', 'closing'].map((pid) => {
    const p = PILLARS[pid];
    return `
    <section class="pillar" data-pillar="${pid}">
      <h2 class="headline" style="display:flex;align-items:center;gap:10px"><span class="dot"></span>${esc(p.name)}</h2>
      <p class="lede" style="margin-bottom:20px">${esc(p.blurb)}</p>
      <div class="scroll">
        <table>
          <thead><tr>
            <th style="width:24%">Criterion</th><th>Score 1</th><th>Score 5</th>
            <th class="n" style="width:118px">Delta</th><th style="width:26%">Why this number</th><th></th>
          </tr></thead>
          <tbody>
            ${criteriaForPillar(pid).map((c) => {
              const computed = c.impact.kind === 'computed';
              return `
              <tr>
                <td><strong>${esc(c.name)}</strong>
                  <div class="hint">${esc(c.question)}</div></td>
                <td class="muted">${esc(c.anchors[1])}</td>
                <td class="muted">${esc(c.anchors[5])}</td>
                <td class="n">${computed
                  ? `<span class="badge">${c.impact.target === 'gate' ? 'gate' : 'computed'}</span>`
                  : `<input data-config="deltas.${c.id}" data-kind="${c.impact.kind === 'ebitda' ? 'rate' : 'number'}"
                       value="${c.impact.kind === 'ebitda' ? (deltaFor(c) * 100).toFixed(0) : deltaFor(c)}"
                       style="text-align:right" inputmode="decimal" />
                     <div class="hint" style="text-align:right">${c.impact.kind === 'ebitda' ? '% of EBITDA' : 'turns'} · was ${c.impact.kind === 'ebitda' ? pct(defaultDeltaFor(c), 0) : turns(defaultDeltaFor(c))}</div>`}</td>
                <td class="hint">${esc(c.why)}</td>
                <td class="n">${!computed && isTuned(c.id) ? `<button class="btn quiet tiny" data-act="clear-config" data-path="deltas.${c.id}">Reset</button>` : ''}</td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    </section>`;
  }).join('')}`;
}

// ── Method ────────────────────────────────────────────────────────────────
export function methodView() {
  return `
  <section>
    <p class="eyebrow">Method</p>
    <h1 class="display">What it does, and what it assumes.</h1>
    <div class="note" style="margin-bottom:32px">
      <p style="margin:0;font-size:17px">“A lot of times sellers haven’t set up properly to maximise the
      value they get when they exit.”</p>
    </div>
  </section>

  <section>
    <h2 class="headline">The two haircuts</h2>
    <div class="card">
      <p class="mono" style="margin:0;white-space:pre-wrap;line-height:1.8;font-size:13.5px">Haircut 1 — EBITDA:    claimed EBITDA → defensible EBITDA
   owner replacement cost, related-party rent, one-off add-backs,
   personal expenses, unrecorded maintenance capex
   combined haircut capped at ${pct(config.ebitdaHaircutCap, 0)}

Haircut 2 — MULTIPLE:  premium ceiling → achievable multiple
   owner dependency, revenue quality, cash rhythm, management
   depth, concentration, assignability
   floored at ${turns(config.multipleFloor)}

value = defensible EBITDA × achievable multiple
gap   = asking price − value</p>
    </div>
  </section>

  <section>
    <h2 class="headline">Scoring</h2>
    <p class="lede">A self-scored criterion applies its delta proportionally: <span class="mono">(5 − score) ÷ 4</span>.
    Five costs nothing, one costs the full delta, three costs half.</p>
    <p class="body">Two criteria are <strong>not</strong> self-scored. The owner salary add-back and DSCR are computed
    from the seller’s own inputs, because those are the two a seller most wants to argue with.</p>
  </section>

  <section>
    <h2 class="headline">The Capital gate</h2>
    <div class="card">
      <p class="mono" style="margin:0;white-space:pre-wrap;line-height:1.8;font-size:13.5px">free cash flow = (defensible EBITDA − maintenance capex) × (1 − tax)
debt service   = amortising bank tranche + seller note
DSCR           = free cash flow ÷ debt service
floor          = ${turns(config.dscrFloor)}
max fundable   = free cash flow ÷ (floor × debt service per unit of price)</p>
    </div>
    <p class="body" style="margin-top:20px">Tax is applied to EBITDA less maintenance capex rather than to taxable
    profit after interest. That is deliberately conservative, and it is stated here rather than buried: it
    understates cash flow slightly, which is the right direction for a test a seller will be shown.</p>
  </section>

  <section>
    <h2 class="headline">Calibration</h2>
    <p class="lede">The engine was built from the criteria, not fitted to a target.</p>
    <div class="grid g3">
      ${tile('Engine', '$522,500', 'defensible EBITDA, broker case')}
      ${tile('Josh, on camera', '$500,000', 'same business, off the cuff')}
      ${tile('Variance', '4.5%', 'with no tuning', 'flag-good')}
    </div>
    <p class="small" style="margin-top:16px">Run <span class="mono">npm run calibrate</span> to reproduce it.
    Load the case from the audit screen to see it scored.</p>
  </section>

  <section>
    <h2 class="headline">Not signed off</h2>
    <div class="scroll">
      <table>
        <tbody>
          <tr><td style="width:200px"><span class="badge warning">provisional</span> Sector ceilings</td>
            <td>Placeholder ranges. They need real numbers per vertical rather than figures pulled off the internet.</td></tr>
          <tr><td><span class="badge warning">provisional</span> Individual deltas</td>
            <td>Calibrated as a set against the broker case, not validated individually against completed transactions.</td></tr>
          <tr><td><span class="badge warning">provisional</span> Size premium</td>
            <td>Step function by EBITDA scale. Directionally right, magnitudes unverified.</td></tr>
          <tr><td><span class="badge">fixed</span> The arithmetic</td>
            <td>The formulas above are not judgement calls. Everything that is a judgement call is on the tuning screen.</td></tr>
        </tbody>
      </table>
    </div>
  </section>

  <section>
    <h2 class="headline">Limits</h2>
    <p class="body">This is a triage instrument, not a valuation. It produces a defensible range and a
    prioritised remediation plan from self-reported inputs. It verifies nothing, and a seller who scores
    themselves generously gets a generous answer — which is exactly why the two numbers that matter most
    are computed rather than scored.</p>
  </section>`;
}

// ── Dock ──────────────────────────────────────────────────────────────────
export function dock() {
  const r = runAudit(state.audit);
  if (!r.claimedEbitda) return '';
  const item = (k, v, cls = '') => `<div class="dock-item"><span class="k">${esc(k)}</span><span class="v ${cls}">${v}</span></div>`;
  return `
  <div class="dock">
    ${item('Defensible EBITDA', money(r.defensibleEbitda))}
    <div class="rule"></div>
    ${item('Multiple', turns(r.achievableMultiple))}
    <div class="rule"></div>
    ${item('Worth', money(r.achievableValue))}
    <div class="rule"></div>
    ${item(r.gap > 0 ? 'Gap' : 'Headroom', money(Math.abs(r.gap)), r.gap > 0 ? 'is-critical' : 'is-good')}
    <button class="btn" data-act="goto" data-view="value">Value</button>
  </div>`;
}
