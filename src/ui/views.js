/** Three screens and two references. Each returns HTML; app.js wires events by delegation. */

import { PILLARS, criteriaForPillar } from '../data/criteria.js';
import { SECTORS, SECTORS_BY_ID, SIZE_BANDS, bandFor } from '../data/sectors.js';
import { SCENARIOS } from '../data/scenarios.js';
import { STRUCTURES, INTEGRATION_LEVERS, MAX_SYNERGY } from '../data/structures.js';
import { config, deltaFor, defaultDeltaFor, ceilingFor, isTuned, isSectorTuned, tuningSummary, DEFAULT_CONFIG } from '../data/config.js';
import { runAudit } from '../engine/valuation.js';
import { remediationPlan, restructureTrajectory, pillarUplift, sensitivity } from '../engine/restructure.js';
import { runBuild, capitalOptions, horizon, requiredScale, portfolioHealth, industryFit } from '../engine/build.js';
import { state, groupInput, futureInput, activeCase } from './state.js';
import { money, moneyShort, turns, pct, esc } from './format.js';
import { bridgeBar, pillarMeter, thresholdScale, gapBar, trajectory, rankBar, pillarBars, spreadDiagram, raceChart, tornado, fundingStack, dealCashflow } from './charts.js';
import { groupCanvas, industryTray } from './canvas.js';

const tile = (k, v, s, cls = '') =>
  `<div class="tile ${cls}"><div class="k">${esc(k)}</div><div class="v">${v}</div>${s ? `<div class="s">${s}</div>` : ''}</div>`;

const numField = (label, path, value, hint, attr = 'bind') => `
  <div class="field">
    <label>${esc(label)}</label>
    <input data-${attr}="${path}" data-kind="number" value="${esc(value ?? 0)}" inputmode="numeric" />
    ${hint ? `<p class="hint">${hint}</p>` : ''}
  </div>`;

const rateField = (label, path, value, dp = 0, attr = 'bind') => `
  <div class="field">
    <label>${esc(label)}</label>
    <input data-${attr}="${path}" data-kind="rate" value="${(value * 100).toFixed(dp)}" inputmode="decimal" />
  </div>`;

// ── The three questions ───────────────────────────────────────────────────
export function pillarCost(pillar, r) {
  if (pillar === 'credibility') {
    const lost = r.haircuts.lines.reduce((s, l) => s + l.appliedAmount, 0);
    return { headline: `−${money(lost)}`, detail: 'of the profit you are claiming', critical: lost > 0 };
  }
  if (pillar === 'capital') {
    return {
      headline: `${turns(r.dscr.dscr)} cover`,
      detail: r.dscr.passes ? 'a buyer can afford the repayments' : 'a buyer cannot afford the repayments',
      critical: !r.dscr.passes,
    };
  }
  const turnsLost = r.penalties.lines.filter((l) => l.pillar === 'closing').reduce((s, l) => s + l.penalty, 0);
  return { headline: `−${turns(turnsLost)}`, detail: 'off the price, on the risk it falls over', critical: turnsLost > 0 };
}

export function threeCStrip(r) {
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
      </div>`;
    }).join('')}
  </div>`;
}

// ── One: your business ────────────────────────────────────────────────────
export function businessView() {
  const a = state.audit;
  const r = runAudit(a);
  const started = r.claimedEbitda > 0 && r.askingPrice > 0;
  const gapUp = r.gap > 0;

  return `
  <section>
    <p class="eyebrow">Step one</p>
    ${started ? `
      <h1 class="display" style="max-width:22ch">${gapUp ? 'It is not worth what you think.' : 'You are asking under the odds.'}</h1>
      <div class="figure xl ${gapUp ? 'is-critical' : 'is-good'}" style="margin:24px 0 12px">${money(Math.abs(r.gap))}</div>
      <p class="lede">You want ${money(r.askingPrice)}. That is ${turns(r.impliedMultipleAtAsking)} the profit you
      can actually prove. A buyer gets to ${money(r.achievableValue)}.</p>
      ${gapBar({ asking: r.askingPrice, achievable: r.achievableValue, fundable: r.dscr.maxFundablePrice })}
    ` : `
      <h1 class="display">Which of these is you?</h1>
      <p class="lede">Pick the one that sounds like your situation and the tool opens on the number that
      answers it. Or just start typing below — two figures is enough.</p>
      ${scenarioPicker()}
    `}
  </section>

  <section>
    <h2 class="headline">${started ? 'Your numbers' : 'Start here'}</h2>
    <div class="grid g3">
      ${numField('What you want for it', 'askingPrice', a.askingPrice, 'Your asking price.')}
      ${numField('Profit, after add-backs', 'financials.claimedEbitda', a.financials.claimedEbitda,
        'The number on the sales memorandum.')}
      ${numField('Cost to replace you', 'financials.ownerReplacementCost', a.financials.ownerReplacementCost,
        'What you would pay someone to do everything you do.')}
    </div>
    <details class="card" style="margin-top:16px">
      <summary style="cursor:pointer;font-weight:600;font-size:15px">More detail</summary>
      <div class="grid g3" style="margin-top:18px">
        ${numField('Your pay, added back', 'financials.ownerSalaryAddedBack', a.financials.ownerSalaryAddedBack,
          'Add your own wage back and a buyer inherits a job, not a profit.')}
        ${numField('Sales', 'financials.revenue', a.financials.revenue)}
        ${numField('Kit and vehicles, a year', 'financials.maintenanceCapex', a.financials.maintenanceCapex,
          'What it costs just to stand still.')}
        <div class="field">
          <label>Business name</label>
          <input data-bind="business.name" data-kind="text" value="${esc(a.business.name)}" placeholder="Trading name" />
        </div>
        <div class="field">
          <label>Industry</label>
          <select data-bind="business.sector" data-kind="text">
            ${SECTORS.map((x) => `<option value="${x.id}" ${x.id === a.business.sector ? 'selected' : ''}>${esc(x.name)}</option>`).join('')}
          </select>
        </div>
        ${rateField('Tax rate', 'financials.taxRate', a.financials.taxRate)}
      </div>
    </details>
    <div class="actions" style="margin-top:18px">
      <button class="btn quiet" data-act="load-broker">Load the example</button>
      ${started ? '<button class="btn quiet" data-act="reset">Clear</button>' : ''}
    </div>
  </section>

  ${started ? `
  <section>
    <h2 class="headline">Where it went</h2>
    <p class="lede">Two cuts, both from your own figures. The first to the profit, the second to the price
    paid for each pound of it.</p>

    <div class="card" style="margin-bottom:16px">
      <div class="between" style="margin-bottom:16px">
        <div>
          <p class="eyebrow" style="margin:0 0 6px">Cut one · the profit</p>
          <div class="figure lg">${money(r.defensibleEbitda)}</div>
          <p class="small" style="margin:6px 0 0">you can prove, out of ${money(r.claimedEbitda)} claimed</p>
        </div>
        <div class="badge critical">−${pct(r.haircuts.appliedFraction)}</div>
      </div>
      ${bridgeBar({
        total: r.claimedEbitda, keep: r.defensibleEbitda, keepLabel: 'Provable profit',
        cuts: r.haircuts.lines.map((l) => ({ label: l.name, value: l.appliedAmount })),
      })}
    </div>

    <div class="card">
      <div class="between" style="margin-bottom:16px">
        <div>
          <p class="eyebrow" style="margin:0 0 6px">Cut two · the price per pound</p>
          <div class="figure lg">${turns(r.achievableMultiple)}</div>
          <p class="small" style="margin:6px 0 0">what you get, out of a best case of ${turns(r.ceiling)}</p>
        </div>
        <div class="badge critical">−${turns(r.penalties.total)}</div>
      </div>
      ${bridgeBar({
        total: r.ceiling, keep: r.achievableMultiple, keepLabel: 'What you get',
        cuts: r.penalties.lines.map((l) => ({ label: l.name, value: l.penalty })), format: turns,
      })}
    </div>
  </section>

  <section>
    <h2 class="headline">Can a buyer even afford it?</h2>
    ${thresholdScale({ value: r.dscr.dscr, floor: config.dscrFloor, max: 3, label: 'Loan cover at your price' })}
    <div class="note ${r.dscr.passes ? 'good' : 'critical'}" style="margin:26px 0">
      <p style="margin:0"><strong>Your price covers the repayments ${turns(r.dscr.dscr)} over. Lenders want ${turns(config.dscrFloor)}.</strong>
      ${r.dscr.passes
        ? ' The deal is payable as it stands.'
        : ` At your price the repayments are ${money(r.dscr.annualService)} a year and the business only makes
            ${money(r.dscr.freeCashFlow)}. The most anyone could pay on these terms is
            ${money(r.dscr.maxFundablePrice)}. Your price is not ambitious — it is unpayable.`}</p>
    </div>
  </section>` : ''}

  <section>
    <h2 class="headline">Three questions a buyer asks</h2>
    <p class="lede">Score each from one to five. Five is what a buyer hopes to find.</p>
    ${threeCStrip(r)}
    <div style="margin-top:28px">
      ${['credibility', 'capital', 'closing'].map((id) => pillarFold(id, r)).join('')}
    </div>
  </section>

  ${started ? `
  <section>
    <h2 class="headline">What fixing it is worth</h2>
    <p class="lede">Each bar is what you get back if you fixed that one thing and left the other two alone.
    They do not add up on purpose: profit times price means the three multiply, so fixing all three is worth
    <strong>more</strong> than the three figures put together.</p>
    ${pillarBars(pillarUplift(state.audit).map((u) => ({
      name: PILLARS[u.pillar].name, sub: `${u.score.toFixed(1)} / 5 today`,
      value: u.value, color: `var(--${u.pillar})`,
    })))}
    ${planFold()}
  </section>

  ${scaleSection(r)}

  <section>
    <h2 class="headline">What moves the number most</h2>
    <p class="lede">Every question drawn worst answer to best, with where you sit now down the middle,
    ordered by how much rides on it either way. Red is what you would lose if it slipped; green is what
    is still there to win — and the longest green bar is where the next twelve months should go.</p>
    ${tornado(sensitivity(state.audit))}
  </section>

  <section>
    <p class="statement">Fixing it makes the business worth more.
    <span class="up">Buying others makes it worth several times more.</span></p>
    <div class="actions" style="margin-top:26px">
      <button class="btn" data-act="goto" data-view="build">Build the group</button>
      <button class="btn quiet" data-act="export">Export report</button>
      <button class="btn quiet" data-act="print">Print</button>
    </div>
  </section>` : ''}`;
}

function pillarFold(id, r) {
  const p = PILLARS[id];
  const open = state.ui.openPillar === id;
  const items = criteriaForPillar(id);
  const scored = items.filter((c) => c.impact.kind !== 'computed');
  return `
  <div class="fold pillar" data-pillar="${id}" data-open="${open}">
    <button class="fold-head" data-act="toggle-pillar" data-pillar="${id}" aria-expanded="${open}">
      <span class="dot"></span>
      <span class="fold-title">${esc(p.name)}</span>
      <span class="fold-meta">
        <span>${scored.length} questions</span>
        <span>${r.pillarScores[id].toFixed(1)} / 5</span>
        <span class="chev"></span>
      </span>
    </button>
    ${open ? `<div class="fold-body">
      <p class="small" style="margin:0 0 14px">${esc(p.sellSide)}</p>
      ${items.map((c) => critRow(c)).join('')}
    </div>` : ''}
  </div>`;
}

function critRow(c) {
  if (c.impact.kind === 'computed') {
    return `
    <div class="crit">
      <div>
        <div class="crit-name">${esc(c.name)} <span class="badge">worked out for you</span></div>
        <div class="crit-q">${esc(c.question)}</div>
        <div class="crit-anchor">${esc(c.computedNote)}</div>
      </div><div></div>
    </div>`;
  }
  const score = Number(state.audit.scores[c.id] ?? 3);
  const delta = c.impact.kind === 'ebitda'
    ? `worth up to ${pct(deltaFor(c), 0)} of your profit`
    : `worth up to ${turns(deltaFor(c))} on the price`;
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

function planFold() {
  const plan = remediationPlan(state.audit);
  const traj = restructureTrajectory(state.audit);
  const max = Math.max(...plan.items.map((i) => i.fullUplift), 1);
  return `
  <details class="card" style="margin-top:22px">
    <summary style="cursor:pointer;font-weight:600;font-size:15px">The fix, in order</summary>
    <div style="margin-top:20px">
      ${trajectory(traj.map((t) => ({ label: t.label, value: t.result.achievableValue })))}
      <div class="scroll" style="margin-top:18px">
        <table>
          <thead><tr><th>Fix</th><th class="n">Now</th><th class="n">Worth</th><th class="n">Months</th><th style="width:110px"></th></tr></thead>
          <tbody>
            ${plan.items.map((i) => `
              <tr>
                <td><strong>${esc(i.name)}</strong><div class="hint" style="margin-top:3px">${esc(i.anchorNow)}</div></td>
                <td class="n">${i.currentScore}/5</td>
                <td class="n"><strong>${moneyShort(i.fullUplift)}</strong></td>
                <td class="n muted">${i.months}</td>
                <td>${rankBar(i.fullUplift, max)}</td>
              </tr>`).join('')}
            ${plan.items.length === 0 ? '<tr><td colspan="5" class="muted">Nothing left to fix.</td></tr>' : ''}
          </tbody>
        </table>
      </div>
    </div>
  </details>`;
}

// ── Two: build the group ──────────────────────────────────────────────────
export function buildView() {
  const g = groupInput();
  const r = runBuild(g);
  const selected = r.nodes.find((n) => n.id === state.ui.selectedNode) ?? r.nodes[r.nodes.length - 1];
  const band = bandFor(r.groupProfit);
  const failing = r.nodes.filter((n) => !n.passes).length;

  return `
  <section>
    <p class="eyebrow">Step two</p>
    <h1 class="display">Stop selling one. Start owning several.</h1>
    <p class="lede">Small businesses sell cheap. Groups sell dear. You buy at the small price and are paid
    the group price for the same pound of profit. Your own business is the platform — everything you buy
    hangs off it.</p>
    ${spreadDiagram({
      entry: r.nodes.length ? r.blendedEntry : 2.5,
      exit: r.nodes.length ? r.exitMultiple : 7,
      count: Math.max(3, r.nodes.length),
      each: r.nodes.length ? r.acquiredEbitda / r.nodes.length : 250_000,
      platform: r.holdcoEbitda,
    })}
  </section>

  <section>
    ${groupCanvas(r, { selected: selected?.id })}
    <div class="grid g4" style="margin-top:18px">
      ${tile('Profit together', money(r.groupProfit),
        r.synergies > 0 ? `includes ${money(r.synergies)} saved by merging` : 'add a business to start')}
      ${tile('Your cash in', money(r.cashRequired),
        r.cashRequired === 0 ? 'none of it is yours' : 'from your own pocket', r.cashRequired === 0 ? 'flag-good' : '')}
      ${tile('Loan cover', turns(r.dscr), r.passes ? 'the group can pay' : 'below the floor',
        r.passes ? 'flag-good' : 'flag-critical')}
      ${tile('Group worth', money(r.equityValue), `${turns(r.exitMultiple)} on the profit, less debt`, 'flag-good')}
    </div>
    ${failing ? `
      <div class="note ${r.passes ? '' : 'critical'}" style="margin-top:22px">
        <p style="margin:0 0 12px"><strong>${failing} of these cannot pay for themselves at that price.</strong>
        ${r.passes
          ? 'Together with your business the group still covers it — that is what a platform is for.'
          : 'And the group cannot carry them either.'}
        The fastest fix is the terms.</p>
        <button class="btn" data-act="stretch-all" data-on="true">Ask every seller for interest only</button>
      </div>` : ''}
    ${r.nodes.length && r.nodes.every((n) => n.interestOnly) ? `
      <div class="note good" style="margin-top:22px">
        <p style="margin:0"><strong>Nothing about the businesses changed. Only the terms did.</strong>
        Same price, same profit, same people.
        <button class="btn quiet tiny" data-act="stretch-all" data-on="false" style="margin-left:8px">Put it back</button></p>
      </div>` : ''}
    ${r.nodes.length ? `
      <p class="small" style="margin-top:14px">At ${money(r.groupProfit)} of profit, the people bidding are
      ${esc(band.who.toLowerCase())}.</p>` : ''}
  </section>

  ${portfolioSection(g)}

  <section>
    <h2 class="headline">Add a business</h2>
    <p class="lede">Tap one to add it. Drag it anywhere on the web — the group only cares what it earns.</p>
    ${industryTray(SECTORS.filter((s) => s.id !== 'generic'))}
  </section>

  ${selected ? nodeInspector(selected) : ''}

  <section>
    <h2 class="headline">How you pay for it</h2>
    <p class="lede">Three of these four need none of your money. Not a trick — it is what a seller who wants
    out will agree to, because he cares more about the number than about having it all on Friday.</p>
    <div class="grid g2">
      ${STRUCTURES.map((s) => `
        <div class="card">
          <div class="between" style="margin-bottom:8px">
            <strong style="font-size:16px">${esc(s.name)}</strong>
            <span class="badge ${s.depositPct === 0 ? 'good' : ''}">${s.depositPct === 0 ? 'no money down' : pct(s.depositPct, 0) + ' down'}</span>
          </div>
          <p class="body" style="margin:0 0 10px">${esc(s.plain)}</p>
          <p class="hint" style="margin:0"><strong>Use it when:</strong> ${esc(s.whenToUse)}<br />
          <strong>Watch for:</strong> ${esc(s.watchFor)}</p>
        </div>`).join('')}
    </div>
    ${capitalFold()}
  </section>

  <section class="actions">
    <button class="btn" data-act="goto" data-view="difference">See the difference</button>
    <button class="btn quiet" data-act="clear-group">Start again</button>
  </section>`;
}

function capitalFold() {
  const cash = state.capital.cash;
  const options = capitalOptions(cash, { industryId: state.capital.industryId, stretch: state.capital.stretch });
  return `
  <details class="card" style="margin-top:18px">
    <summary style="cursor:pointer;font-weight:600;font-size:15px">What can you do with what you have?</summary>
    <div style="margin-top:20px">
      <div class="grid g2" style="margin-bottom:18px">
        ${numField('Cash you could put in', 'cash', cash, 'Try zero. It changes less than you would think.', 'capital')}
        <div class="field">
          <label>Industry you would buy in</label>
          <select data-capital="industryId" data-kind="text">
            ${SECTORS.filter((s) => s.id !== 'generic').map((x) => `<option value="${x.id}" ${x.id === state.capital.industryId ? 'selected' : ''}>${esc(x.name)}</option>`).join('')}
          </select>
        </div>
      </div>
      <label class="switch" style="margin-bottom:18px">
        <input type="checkbox" data-capital="stretch" data-kind="bool" ${state.capital.stretch ? 'checked' : ''} />
        <span>Seller takes interest only, with the lump at the end</span>
      </label>
      <div class="scroll">
        <table>
          <thead><tr><th>Structure</th><th class="n">Most you can pay</th><th class="n">Enough?</th><th>What limits you</th></tr></thead>
          <tbody>
            ${options.map((o) => `
              <tr>
                <td><strong>${esc(o.structure.name)}</strong></td>
                <td class="n"><strong>${turns(o.maxMultiple)}</strong><div class="hint">times profit</div></td>
                <td class="n">${o.clearsIndustryEntry ? '<span class="badge good">yes</span>' : '<span class="badge critical">no</span>'}
                  <div class="hint">they cost ${turns(o.industryEntry)}</div></td>
                <td class="muted">${esc(o.limitedBy)}${o.needsCash && isFinite(o.cashLimitedProfit)
                  ? ` — ${money(o.cashLimitedProfit)} of profit at most` : ''}</td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
      <div class="note" style="margin-top:20px">
        <p style="margin:0"><strong>Your cash is not what stops you.</strong> What decides how much you can pay
        is the price per pound of profit and how long the seller gives you — not what is in your account.</p>
      </div>
    </div>
  </details>`;
}

function nodeInspector(node) {
  const industry = SECTORS_BY_ID[node.industryId] ?? SECTORS_BY_ID.generic;
  const levers = node.levers ?? [];
  return `
  <section>
    <h2 class="headline">${esc(industry.name)}</h2>
    <p class="lede">${esc(industry.why)}</p>
    <div class="inspector">
      <div class="grid g3" style="margin-bottom:20px">
        ${numField('Its profit a year', `nodes.${node.id}.ebitda`, node.ebitda, null, 'group')}
        ${numField('Times profit you pay', `nodes.${node.id}.multiple`, node.multiple,
          `Ones like this go for about ${industry.low.toFixed(1)}x.`, 'group')}
        ${tile('Costs you', money(node.price), `${money(node.cashNeeded)} of your own cash`)}
      </div>

      ${!node.passes ? `
        <div class="note critical" style="margin-bottom:20px">
          <p style="margin:0"><strong>On its own this one does not cover its repayments.</strong>
          At ${turns(node.multiple)} it needs ${money(node.service)} a year and only makes ${money(node.freeCashFlow)}.
          Pay ${turns(node.maxMultiple)} instead, merge more of it, or have the seller take interest only.</p>
        </div>` : ''}

      <label class="switch" style="margin-bottom:22px">
        <input type="checkbox" data-group="nodes.${node.id}.interestOnly" data-kind="bool"
               ${node.interestOnly ? 'checked' : ''} />
        <span>The seller takes interest only, and the lump at the end</span>
      </label>

      <p class="eyebrow">How you pay for it</p>
      <div class="choices" style="margin-bottom:22px">
        ${STRUCTURES.map((s) => `
          <button class="choice ${s.id === node.structureId ? 'on' : ''}"
                  data-act="set-structure" data-node="${node.id}" data-structure="${s.id}">
            <span class="choice-mark"></span>
            <span class="choice-body">
              <span class="choice-name">${esc(s.name)}</span>
              <span class="choice-plain">${esc(s.plain)}</span>
              <span class="choice-tag">${s.depositPct === 0 ? 'None of your money' : `${pct(s.depositPct, 0)} of your money`}
                · ${s.holidayMonths ? `${s.holidayMonths} months before the first payment` : 'payments start straight away'}</span>
            </span>
          </button>`).join('')}
      </div>

      ${fitNote(node)}

      <p class="eyebrow">What you merge <span class="muted" style="font-weight:400;text-transform:none;letter-spacing:0">— up to ${pct(MAX_SYNERGY, 0)} of its profit</span></p>
      <div class="choices" style="margin-bottom:20px">
        ${INTEGRATION_LEVERS.map((l) => `
          <button class="choice ${levers.includes(l.id) ? 'on' : ''}"
                  data-act="toggle-lever" data-node="${node.id}" data-lever="${l.id}">
            <span class="choice-mark"></span>
            <span class="choice-body">
              <span class="choice-name">${esc(l.name)} <span class="muted" style="font-weight:400">+${pct(l.saving, 0)}</span></span>
              <span class="choice-plain">${esc(l.plain)}</span>
            </span>
          </button>`).join('')}
      </div>

      <p class="eyebrow">Where the money comes from</p>
      ${fundingStack(node)}
      <div style="margin:22px 0 6px">${dealCashflow(node)}</div>
      ${node.structure.holidayMonths ? `
        <p class="small" style="margin:0 0 22px">Nothing leaves the business for the first
        ${node.structure.holidayMonths} months. That holiday is the difference between a deal that
        strangles you in year one and one that funds itself.</p>` : '<div style="height:16px"></div>'}

      <div class="grid g4">
        ${tile('Profit it adds', money(node.contributed),
          node.synergy > 0 ? `${money(node.ebitda)} plus ${money(node.synergy)} saved` : 'nothing merged yet')}
        ${tile('Repayments', money(node.service), node.structure.holidayMonths
          ? `nothing for ${node.structure.holidayMonths} months` : 'from month one')}
        ${tile('Loan cover', turns(node.dscr), node.passes ? 'it pays for itself' : 'it does not',
          node.passes ? 'flag-good' : 'flag-critical')}
        ${tile('Your cash', money(node.cashNeeded), node.cashNeeded === 0 ? 'none' : 'deposit')}
      </div>
      <div class="actions" style="margin-top:18px">
        <button class="btn quiet tiny" data-act="remove-node" data-node="${node.id}">Remove this business</button>
      </div>
    </div>
  </section>`;
}

// ── Three: the difference ─────────────────────────────────────────────────
export function differenceView() {
  const f = state.future;
  const h = horizon(futureInput());
  const first = h.rows[0];

  return `
  <section>
    <p class="eyebrow">Step three</p>
    <h1 class="display">Same business. Twenty years apart.</h1>
    <p class="lede">One owner keeps it and grows it. The other uses it as a platform and buys
    ${f.maxBusinesses} more alongside. Drag the year, or press play.</p>

    <div class="race" id="race-numbers">
      <div class="race-side">
        <div class="k">Keep it and grow it</div>
        <div class="v" id="fig-alone">${money(first.aloneValue)}</div>
        <div class="s">one business, sold once</div>
      </div>
      <div class="race-side group">
        <div class="k">Buy others alongside it</div>
        <div class="v" id="fig-group">${money(first.groupEquity)}</div>
        <div class="s"><span id="fig-count">0</span> bought, after paying the debt down</div>
      </div>
    </div>

    <div class="multiplier"><b id="fig-mult">1.0x</b><span id="fig-mult-label">the same, so far</span></div>

    <div class="scrub">
      <button class="btn play" id="play" aria-label="Play the twenty years">▶</button>
      <input type="range" id="year" min="1" max="20" step="0.1" value="1" aria-label="Year" />
      <span class="scrub-year" id="fig-year">Year 1</span>
    </div>

    <div class="chips" id="chips" aria-live="polite">
      <span class="chip self">Your business</span>
    </div>

    <div style="margin-top:30px">${raceChart(h.rows)}</div>
  </section>

  <section>
    <div class="grid g4">
      ${h.milestones.map((m) => tile(`Year ${m.year}`, money(m.groupEquity),
        `on your own: ${moneyShort(m.aloneValue)}`, m.year === 20 ? 'flag-good' : '')).join('')}
    </div>
    <p class="small" style="margin-top:14px">Spare cash pays the debt down as it goes. Buying stops in any year
    where another deal would push the group below ${turns(config.dscrFloor)} cover, and stops for good at
    ${f.maxBusinesses} businesses — nobody runs more than that well. It is a ceiling, not a forecast.</p>
  </section>

  <section>
    <p class="statement">You put in ${money(h.totalCashIn)}.
    <span class="up">You end up ${money(h.difference)} ahead.</span></p>
    <p class="lede" style="margin-top:16px">Three of the four structures need no deposit, so the only money that
    ever leaves your pocket is what you spend learning to do it properly. That is the whole case for getting
    help: not a cost against the business, but the only cash in the deal.</p>
  </section>

  <section>
    <h2 class="headline">Change the assumptions</h2>
    <div class="grid g3">
      ${numField('Businesses a year', 'dealsPerYear', f.dealsPerYear, 'Two is busy. One is realistic.', 'future')}
      ${numField('Profit of each', 'avgDealProfit', f.avgDealProfit, 'What a typical target earns.', 'future')}
      ${numField('Stop after', 'maxBusinesses', f.maxBusinesses, 'How many you can actually run.', 'future')}
      ${rateField('Saved by merging %', 'synergyRate', f.synergyRate, 0, 'future')}
      ${numField('What you spend on advice', 'advisoryCost', f.advisoryCost, 'Over the whole programme.', 'future')}
      <div class="field">
        <label>How you pay for them</label>
        <select data-future="structureId" data-kind="text">
          ${STRUCTURES.map((s) => `<option value="${s.id}" ${s.id === f.structureId ? 'selected' : ''}>${esc(s.name)}</option>`).join('')}
        </select>
      </div>
    </div>
    ${h.pausedYears > 0 ? `
      <div class="note critical" style="margin-top:22px">
        <p style="margin:0"><strong>Buying paused in ${h.pausedYears} year${h.pausedYears === 1 ? '' : 's'}.</strong>
        Another deal would have taken the group below ${turns(config.dscrFloor)} cover. The model waits rather
        than pretending.</p>
      </div>` : ''}
  </section>

  <section>
    <h2 class="headline">Why the group is worth more per pound</h2>
    <p class="lede">Nothing about the businesses changes. The buyer does.</p>
    <div class="scroll">
      <table>
        <thead><tr><th>Profit</th><th class="n">Extra on the price</th><th>Who is buying</th></tr></thead>
        <tbody>
          ${SIZE_BANDS.map((b) => {
            const here = bandFor(h.rows[h.rows.length - 1].groupProfit) === b;
            const label = b.to === Infinity ? `Over ${moneyShort(b.from)}`
              : `${b.from === 0 ? 'Under' : moneyShort(b.from) + ' to'} ${moneyShort(b.to)}`;
            return `<tr${here ? ' class="row-total"' : ''}>
              <td>${esc(label)}${here ? ' <span class="badge good">you end here</span>' : ''}</td>
              <td class="n">${b.premium ? `+${turns(b.premium)}` : '—'}</td>
              <td class="muted">${esc(b.who)}</td></tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>
  </section>`;
}
// ── Tune ──────────────────────────────────────────────────────────────────
export function tuneView() {
  const drift = tuningSummary();
  return `
  <section>
    <p class="eyebrow">Tuning</p>
    <h1 class="display">The numbers, not the questions.</h1>
    <p class="lede">The questions are not controversial. The numbers behind them are. If one cannot be defended
    on a call, the tool becomes a liability the first time a seller quotes it back. Every row says where its
    number comes from. Change any of them and the whole tool moves.</p>
    ${drift.count > 0 ? `
      <div class="note" style="margin-bottom:22px">
        <p style="margin:0"><strong>${drift.count} number${drift.count === 1 ? '' : 's'} changed from what shipped.</strong>
        <button class="btn quiet tiny" data-act="reset-config" style="margin-left:10px">Put them all back</button></p>
      </div>` : ''}
  </section>

  <section>
    <h2 class="headline">Limits</h2>
    <div class="grid g3">
      <div class="field"><label>Loan cover floor</label>
        <input data-config="dscrFloor" data-kind="number" value="${config.dscrFloor}" inputmode="decimal" />
        <p class="hint">Below this no lender goes near it. Shipped at ${DEFAULT_CONFIG.dscrFloor}.</p></div>
      <div class="field"><label>Lowest price anyone pays</label>
        <input data-config="multipleFloor" data-kind="number" value="${config.multipleFloor}" inputmode="decimal" />
        <p class="hint">The worst business the tool will price. Shipped at ${DEFAULT_CONFIG.multipleFloor}.</p></div>
      <div class="field"><label>Most profit we will cut %</label>
        <input data-config="ebitdaHaircutCap" data-kind="rate" value="${(config.ebitdaHaircutCap * 100).toFixed(0)}" />
        <p class="hint">Cuts rescale above this. Shipped at ${pct(DEFAULT_CONFIG.ebitdaHaircutCap, 0)}.</p></div>
    </div>
  </section>

  <section>
    <h2 class="headline">Industries</h2>
    <p class="lede">What a good one in each industry sells for, and why. These are working assumptions, not
    market data — replace them with real numbers for the industries you actually deal in.</p>
    <div class="scroll">
      <table>
        <thead><tr><th style="width:16%">Industry</th><th class="n" style="width:110px">Best price</th>
          <th class="n" style="width:90px">To buy</th><th style="width:28%">Why it sells there</th>
          <th class="n" style="width:80px">Roll-up</th><th>Why</th></tr></thead>
        <tbody>
          ${SECTORS.map((s) => `
            <tr>
              <td><strong>${esc(s.name)}</strong><div class="hint">${esc(s.example)}</div></td>
              <td class="n"><input data-config="ceilings.${s.id}" data-kind="number" value="${ceilingFor(s.id)}"
                    style="text-align:right" inputmode="decimal" />
                ${isSectorTuned(s.id) ? `<div class="hint" style="text-align:right">was ${s.ceiling.toFixed(1)}x</div>` : ''}</td>
              <td class="n muted">${s.low.toFixed(1)}x</td>
              <td class="hint">${esc(s.why)}</td>
              <td class="n">${'★'.repeat(s.rollupFit)}<span class="muted">${'☆'.repeat(5 - s.rollupFit)}</span></td>
              <td class="hint">${esc(s.rollupWhy)}</td>
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
      <p class="lede" style="margin-bottom:20px">${esc(p.sellSide)}</p>
      <div class="scroll">
        <table>
          <thead><tr>
            <th style="width:24%">Question</th><th>Worst answer</th><th>Best answer</th>
            <th class="n" style="width:118px">Worth</th><th style="width:26%">Why that number</th><th></th>
          </tr></thead>
          <tbody>
            ${criteriaForPillar(pid).map((c) => {
              const computed = c.impact.kind === 'computed';
              return `
              <tr>
                <td><strong>${esc(c.name)}</strong><div class="hint">${esc(c.question)}</div></td>
                <td class="muted">${esc(c.anchors[1])}</td>
                <td class="muted">${esc(c.anchors[5])}</td>
                <td class="n">${computed
                  ? '<span class="badge">worked out</span>'
                  : `<input data-config="deltas.${c.id}" data-kind="${c.impact.kind === 'ebitda' ? 'rate' : 'number'}"
                       value="${c.impact.kind === 'ebitda' ? (deltaFor(c) * 100).toFixed(0) : deltaFor(c)}"
                       style="text-align:right" inputmode="decimal" />
                     <div class="hint" style="text-align:right">${c.impact.kind === 'ebitda' ? '% of profit' : 'on the price'}
                       · was ${c.impact.kind === 'ebitda' ? pct(defaultDeltaFor(c), 0) : turns(defaultDeltaFor(c))}</div>`}</td>
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
    <h2 class="headline">The two cuts</h2>
    <div class="card">
      <p class="mono" style="margin:0;white-space:pre-wrap;line-height:1.8;font-size:13.5px">Cut 1 — the profit:  what you claim → what you can prove
   your replacement's wage, rent to yourself, one-offs,
   personal spending, kit you have put off buying
   the total is capped at ${pct(config.ebitdaHaircutCap, 0)}

Cut 2 — the price:   the best case → what you actually get
   how much depends on you, how solid the revenue is,
   how the cash arrives, who runs it, who the customers are
   never falls below ${turns(config.multipleFloor)}

worth = provable profit x price per pound
gap   = what you want − what it is worth</p>
    </div>
  </section>

  <section>
    <h2 class="headline">Scoring</h2>
    <p class="lede">Each answer costs a share of its number: <span class="mono">(5 − score) ÷ 4</span>.
    Five costs nothing, one costs the lot, three costs half.</p>
    <p class="body">Two things are not scored. Your replacement's wage and the loan cover are worked out from
    your own figures, because those are the two people most want to argue with.</p>
  </section>

  <section>
    <h2 class="headline">Loan cover</h2>
    <div class="card">
      <p class="mono" style="margin:0;white-space:pre-wrap;line-height:1.8;font-size:13.5px">cash the business makes = (provable profit − kit) x (1 − tax)
repayments             = the loan + whatever you leave in
cover                  = cash ÷ repayments
floor                  = ${turns(config.dscrFloor)}
most anyone can pay    = cash ÷ (floor x repayments per pound of price)</p>
    </div>
    <p class="body" style="margin-top:20px">Tax comes off profit less kit rather than off profit after interest.
    That is deliberately cautious, and it is said here rather than buried: it understates the cash a little,
    which is the right direction for a test you are going to show a seller.</p>
  </section>

  <section>
    <h2 class="headline">The group</h2>
    <p class="body">Every business is priced on its own cash before it is allowed in, using the same
    ${turns(config.dscrFloor)} floor. Savings from merging are the levers you tick, not a percentage assumed.
    The group's price per pound is the average of its industries, weighted by where the profit comes from, plus
    a premium for size. The twenty-year projection sweeps free cash against the debt, pauses buying whenever
    another deal would break the cover floor, and stops for good at the number of businesses you say you can run.</p>
  </section>

  <section>
    <h2 class="headline">Calibration</h2>
    <div class="grid g3">
      ${tile('This tool', '$522,500', 'provable profit, worked example')}
      ${tile('Josh, on camera', '$500,000', 'same business, off the cuff')}
      ${tile('Difference', '4.5%', 'with no fiddling', 'flag-good')}
    </div>
  </section>

  <section>
    <h2 class="headline">Not signed off</h2>
    <div class="scroll">
      <table>
        <tbody>
          <tr><td style="width:210px"><span class="badge warning">working assumption</span> Industry prices</td>
            <td>Indicative ranges, not transaction data. Replace them for the industries that matter to you.</td></tr>
          <tr><td><span class="badge warning">working assumption</span> What each answer is worth</td>
            <td>Calibrated together against the worked example, not one at a time against real deals.</td></tr>
          <tr><td><span class="badge warning">working assumption</span> Size premium</td>
            <td>Right direction, unverified size.</td></tr>
          <tr><td><span class="badge">fixed</span> The arithmetic</td>
            <td>The formulas above are not opinions. Everything that is an opinion is on the Tune screen.</td></tr>
        </tbody>
      </table>
    </div>
  </section>

  <section>
    <h2 class="headline">What this is not</h2>
    <p class="body">It is a first look, not a valuation. It gives a defensible range and an order of work from
    what you tell it. It checks nothing, and someone who scores themselves generously gets a generous answer —
    which is exactly why the two numbers that matter most are worked out rather than scored.</p>
  </section>`;
}

// ── Dock ──────────────────────────────────────────────────────────────────
export function dock() {
  const r = runAudit(state.audit);
  if (!r.claimedEbitda) return '';
  const item = (k, v, cls = '') => `<div class="dock-item"><span class="k">${esc(k)}</span><span class="v ${cls}">${v}</span></div>`;
  return `
  <div class="dock">
    ${item('Provable profit', money(r.defensibleEbitda))}
    <div class="rule"></div>
    ${item('Price paid', turns(r.achievableMultiple))}
    <div class="rule"></div>
    ${item('Worth', money(r.achievableValue))}
    <div class="rule"></div>
    ${item(r.gap > 0 ? 'Short by' : 'Spare', money(Math.abs(r.gap)), r.gap > 0 ? 'is-critical' : 'is-good')}
    <button class="btn" data-act="goto" data-view="value">See it</button>
  </div>`;
}

// ── Cases ─────────────────────────────────────────────────────────────────
export function casesView() {
  const live = activeCase();
  return `
  <section>
    <p class="eyebrow">Cases</p>
    <h1 class="display">One per business.</h1>
    <p class="lede">Everything you enter belongs to a case. Start one for each business you look at,
    switch between them, and send one to someone else as a file.</p>
    <div class="actions">
      <button class="btn" data-act="new-case">New case</button>
      <button class="btn quiet" data-act="new-case-example">New from the worked example</button>
      <label class="btn quiet" style="cursor:pointer">Open a case file
        <input type="file" accept="application/json,.json" data-import-case hidden />
      </label>
    </div>
  </section>

  <section>
    <h2 class="headline">Or start from a situation</h2>
    <p class="lede">Six of the ones that come up most. Each opens on the screen that answers it.</p>
    ${scenarioPicker()}
  </section>

  <section>
    <div class="grid g2">
      ${state.cases.map((c) => {
        const r = runAudit(c.audit);
        const isLive = c.id === live?.id;
        const started = r.claimedEbitda > 0 && r.askingPrice > 0;
        return `
        <div class="case-card ${isLive ? 'on' : ''}">
          <div class="between" style="align-items:flex-start;gap:12px">
            <input class="case-name" data-rename="${c.id}" value="${esc(c.name)}" aria-label="Case name" />
            ${isLive ? '<span class="badge good">open</span>' : ''}
          </div>
          <div class="case-figs">
            ${started ? `
              <div><span class="k">Wants</span><span class="v">${moneyShort(r.askingPrice)}</span></div>
              <div><span class="k">Worth</span><span class="v">${moneyShort(r.achievableValue)}</span></div>
              <div><span class="k">Short by</span><span class="v ${r.gap > 0 ? 'is-critical' : 'is-good'}">${moneyShort(Math.abs(r.gap))}</span></div>
              <div><span class="k">Bought</span><span class="v">${(c.group?.nodes ?? []).length}</span></div>
            ` : '<div class="muted" style="font-size:13.5px">Nothing entered yet.</div>'}
          </div>
          <div class="actions">
            ${isLive ? '' : `<button class="btn quiet tiny" data-act="open-case" data-case="${c.id}">Open</button>`}
            <button class="btn quiet tiny" data-act="dup-case" data-case="${c.id}">Duplicate</button>
            <button class="btn quiet tiny" data-act="export-case" data-case="${c.id}">Save to a file</button>
            ${state.cases.length > 1 ? `<button class="btn quiet tiny" data-act="del-case" data-case="${c.id}">Delete</button>` : ''}
          </div>
        </div>`;
      }).join('')}
    </div>
  </section>`;
}

// ── Situations ────────────────────────────────────────────────────────────
export function scenarioPicker() {
  return `
  <div class="tray" style="margin-top:26px">
    ${SCENARIOS.map((s) => `
      <button class="tray-card scenario" data-act="scenario" data-scenario="${s.id}">
        <span class="tray-name">“${esc(s.voice)}”</span>
        <span class="tray-eg">${esc(s.pain)}</span>
      </button>`).join('')}
  </div>`;
}

// ── What you would have to become ─────────────────────────────────────────
function scaleSection(r) {
  if (!(r.askingPrice > 0) || !(r.defensibleEbitda > 0) || r.gap <= 0) return '';
  const f = state.future;
  const scale = requiredScale({
    targetPrice: r.askingPrice,
    currentProfit: r.defensibleEbitda,
    industryId: state.audit.business.sector,
    avgDealProfit: f.avgDealProfit,
    dealsPerYear: f.dealsPerYear,
    synergyRate: f.synergyRate,
  });
  if (!scale) return '';

  return `
  <section>
    <h2 class="headline">What you would have to become</h2>
    <p class="lede">You are not wrong to want ${money(r.askingPrice)}. You are wrong about the size of
    business that gets it. Work backwards from your number and it lands on a business
    ${scale.alreadyThere ? 'you already are' : 'you are not yet'}.</p>

    <div class="grid g4">
      ${tile('You make now', money(r.defensibleEbitda), `worth ${turns(r.achievableMultiple)} of it`)}
      ${tile('You would need', money(scale.requiredProfit), `at ${turns(scale.requiredMultiple)}, the best in your industry at that size`, 'flag-good')}
      ${tile('That is', scale.alreadyThere ? 'nothing more' : `${scale.businesses} businesses`,
        scale.alreadyThere ? 'you are already big enough' : `of ${money(f.avgDealProfit)} profit each`)}
      ${tile('Taking', scale.alreadyThere ? '—' : `${scale.years} year${scale.years === 1 ? '' : 's'}`,
        scale.alreadyThere ? 'fix the business instead' : `at ${f.dealsPerYear} a year`)}
    </div>

    <div class="note ${scale.alreadyThere ? 'good' : ''}" style="margin-top:22px">
      <p style="margin:0">${scale.alreadyThere
        ? `Your business is already the right size for ${money(r.askingPrice)} — what is missing is
           quality, not scale. The work is on this page, not the next one.`
        : scale.bandJump
          ? `<strong>The jump is not just more profit — it is a different bracket of buyer.</strong>
             Today the people bidding are ${esc(scale.todayBand.who.toLowerCase())}. At
             ${money(scale.requiredProfit)} they are ${esc(scale.band.who.toLowerCase())}, and they pay
             ${turns(scale.requiredMultiple)} rather than ${turns(r.achievableMultiple)}. Same trade,
             different room.`
          : `You need ${money(scale.profitNeeded)} more profit than you make. Buying it is faster than
             growing it, and on the right terms it costs you nothing up front.`}</p>
    </div>
    ${!scale.alreadyThere ? `
      <div class="actions" style="margin-top:20px">
        <button class="btn" data-act="goto" data-view="build">Show me how</button>
      </div>` : ''}
  </section>`;
}

// ── Portfolio health ──────────────────────────────────────────────────────
export function portfolioSection(group) {
  const health = portfolioHealth(group);
  if (health.nodes.length < 3) return '';

  const worst = health.worstFirst.slice(0, 6);
  const max = Math.max(...health.nodes.map((n) => n.dscr).filter(isFinite), config.dscrFloor * 2, 1);

  return `
  <section>
    <h2 class="headline">Which ones are carrying the rest</h2>
    <p class="lede">${health.failing.length
      ? `The group average hides it. Priced one at a time on their own cash,
         <strong>${health.failing.length} of ${health.nodes.length}</strong> cannot pay for themselves.`
      : 'Every one of them pays for itself. That is rarer than it sounds.'}</p>

    <div class="scroll">
      <table>
        <thead><tr><th>Business</th><th class="n">Profit</th><th class="n">Paid</th>
          <th class="n">Cover</th><th style="width:150px"></th><th class="n">Should have paid</th></tr></thead>
        <tbody>
          ${worst.map((n) => `
            <tr>
              <td><strong>${esc(n.industry.name)}</strong><div class="hint">${esc(n.structure.name)}</div></td>
              <td class="n">${money(n.ebitda)}</td>
              <td class="n">${turns(n.multiple)}</td>
              <td class="n ${n.passes ? 'is-good' : 'is-critical'}"><strong>${turns(n.dscr)}</strong></td>
              <td>${rankBar(Math.min(n.dscr, max), max)}</td>
              <td class="n ${n.passes ? 'muted' : ''}">${n.passes ? '—' : turns(n.maxMultiple)}</td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>

    ${health.failing.length ? `
      <div class="note critical" style="margin-top:22px">
        <p style="margin:0"><strong>Overpaid by ${money(health.overpaid)} across ${health.failing.length}
        deals.</strong> Bought at what each could actually carry, the same group would be worth
        ${money(health.repriced.equityValue)} instead of ${money(health.equityValue)} —
        a difference of ${money(health.drag)}. That is the cost of not running the number before signing.</p>
      </div>` : ''}
  </section>`;
}

/** Whether the business next door really merges with yours, or just shares an owner. */
function fitNote(node) {
  const platformIndustry = state.group.holdcoIndustry ?? state.audit.business.sector;
  const fit = industryFit(platformIndustry, node.industryId);
  if (fit.same) {
    return `
    <div class="note good" style="margin-bottom:20px">
      <p style="margin:0"><strong>Same trade as yours.</strong> One office, one yard, one set of vans,
      and a customer list that buys both. Everything that can merge, merges.</p>
    </div>`;
  }
  return `
  <div class="note ${fit.shared.length >= 2 ? '' : 'critical'}" style="margin-bottom:20px">
    <p style="margin:0"><strong>${esc(fit.verdict)}</strong>
    ${fit.shared.length
      ? `Out of ${fit.target.name.toLowerCase()}, ${fit.shared.length} of the savings genuinely apply to
         a ${fit.platform.name.toLowerCase()} platform: ${fit.shared.map((id) => esc(LEVER_NAMES[id])).join(', ')}.`
      : 'Almost none of the savings carry across.'}
    ${fit.only.length ? ` The rest — ${fit.only.map((id) => esc(LEVER_NAMES[id])).join(', ')} — you would be
      claiming without a reason.` : ''}</p>
  </div>`;
}

const LEVER_NAMES = Object.fromEntries(INTEGRATION_LEVERS.map((l) => [l.id, l.name.toLowerCase()]));
