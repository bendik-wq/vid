/**
 * Restructuring: fixing a group that is already in the wrong shape.
 *
 * Most people arrive having bought well and structured badly — full price on bank terms, no
 * holiday, everything amortising at once. Nothing about those businesses has to change for
 * the group to become serviceable again; the debt does. This models the six things that can
 * actually be done about it, one at a time, so the effect of each is visible rather than
 * bundled into a single "refinanced" number.
 */

import { config } from '../data/config.js';
import { annualDebtService } from './valuation.js';
import { runBuild } from './build.js';

export const REPAIR_ACTIONS = [
  {
    id: 'renegotiate',
    name: 'Go back to the sellers',
    plain: 'Ask everyone who left money in to take a lower rate.',
    detail: 'Cheapest thing on this list and the one people are most embarrassed to do. A seller already owed money would usually rather be paid slowly than not at all.',
    param: { key: 'rateCut', label: 'Take off the rate', kind: 'rate', value: 0.02, min: 0, max: 0.06 },
  },
  {
    id: 'extend',
    name: 'Give it longer to pay',
    plain: 'Stretch the remaining term so each payment is smaller.',
    detail: 'The same money, spread thinner. It costs more in total interest and it buys the room to keep trading.',
    param: { key: 'extraYears', label: 'Extra years', kind: 'number', value: 4, min: 0, max: 15 },
  },
  {
    id: 'interestOnly',
    name: 'Interest only for a while',
    plain: 'Pay only the interest until the business has caught its breath.',
    detail: 'The strongest single lever on cover, and the one that leaves the whole balance standing at the end. Use it to buy time, not to avoid the problem.',
    param: { key: 'years', label: 'For how many years', kind: 'number', value: 3, min: 1, max: 10 },
  },
  {
    id: 'refinance',
    name: 'Refinance the lot',
    plain: 'Replace every loan with one new facility.',
    detail: 'One rate, one term, one lender. Worth doing once the group is big enough to be interesting to a bank that would not have looked at any single site.',
    param: { key: 'rate', label: 'New rate', kind: 'rate', value: 0.075, min: 0.01, max: 0.2 },
    param2: { key: 'termYears', label: 'Over how many years', kind: 'number', value: 10, min: 3, max: 25 },
  },
  {
    id: 'divest',
    name: 'Sell the worst one',
    plain: 'Let go of the business that cannot pay for itself and use the money to clear its debt.',
    detail: 'Unsentimental and usually right. It takes its profit with it, but it takes more of its debt.',
    param: { key: 'count', label: 'How many to sell', kind: 'number', value: 1, min: 1, max: 6 },
  },
  {
    id: 'inject',
    name: 'Put money in',
    plain: 'Your own or an investor’s, straight against the debt.',
    detail: 'The only lever on this list that costs you cash. It is here so you can see how little it buys compared with the others.',
    param: { key: 'amount', label: 'How much', kind: 'number', value: 250_000, min: 0 },
  },
];

export const ACTION_BY_ID = Object.fromEntries(REPAIR_ACTIONS.map((a) => [a.id, a]));

export const blankRepair = () => ({
  chosen: [],
  params: Object.fromEntries(REPAIR_ACTIONS.map((a) => [
    a.id,
    { [a.param.key]: a.param.value, ...(a.param2 ? { [a.param2.key]: a.param2.value } : {}) },
  ])),
});

/** The debt book as it stands, one entry per tranche across every business in the group. */
export function debtBook(built) {
  const book = [];
  for (const n of built.nodes) {
    const f = n.structure;
    if (n.bankDebt > 0) {
      book.push({
        nodeId: n.id, kind: 'bank', label: `${n.industry.name} — bank`,
        amount: n.bankDebt, rate: f.bankRate, termYears: f.bankTermYears, interestOnly: false,
      });
    }
    if (n.sellerNote > 0) {
      book.push({
        nodeId: n.id, kind: 'seller', label: `${n.industry.name} — seller`,
        amount: n.sellerNote, rate: f.sellerNoteRate, termYears: f.sellerNoteTermYears,
        interestOnly: Boolean(n.interestOnly),
      });
    }
  }
  return book;
}

const serviceOf = (book) =>
  book.reduce((s, t) => s + annualDebtService(t.amount, t.rate, t.termYears, t.interestOnly), 0);

/**
 * Apply the chosen actions in a fixed order and report the state after each.
 *
 * The order is not cosmetic: renegotiating before refinancing changes what you are
 * refinancing, and selling before injecting changes how much you need to inject. This runs
 * them cheapest-first, which is also the order anyone sensible would actually try them.
 */
export function repairPlan(group, repair = blankRepair()) {
  const before = runBuild(group);
  const chosen = REPAIR_ACTIONS.filter((a) => repair.chosen.includes(a.id));
  const p = (id, key) => repair.params?.[id]?.[key] ?? ACTION_BY_ID[id].param.value;

  let book = debtBook(before);
  let profit = before.groupProfit;
  let cashIn = 0;
  let sold = [];
  let removedIds = new Set();

  const cash = (pf) => Math.max(0, pf * (1 - before.assumptions.capexPct) * (1 - before.assumptions.taxRate));
  const coverOf = (bk, pf) => {
    const svc = serviceOf(bk);
    return svc > 0 ? cash(pf) / svc : Infinity;
  };

  const steps = [{
    id: 'now',
    name: 'As it stands',
    detail: `${before.nodes.filter((n) => !n.passes).length} of ${before.nodes.length} cannot pay for themselves.`,
    debt: book.reduce((s, t) => s + t.amount, 0),
    service: serviceOf(book),
    profit,
    cover: coverOf(book, profit),
  }];

  for (const action of chosen) {
    if (action.id === 'renegotiate') {
      const cut = p('renegotiate', 'rateCut');
      book = book.map((t) => (t.kind === 'seller' ? { ...t, rate: Math.max(0, t.rate - cut) } : t));
    } else if (action.id === 'extend') {
      const extra = p('extend', 'extraYears');
      book = book.map((t) => ({ ...t, termYears: t.termYears + extra }));
    } else if (action.id === 'interestOnly') {
      book = book.map((t) => ({ ...t, interestOnly: true }));
    } else if (action.id === 'refinance') {
      const total = book.reduce((s, t) => s + t.amount, 0);
      book = total > 0 ? [{
        nodeId: null, kind: 'bank', label: 'One consolidated facility',
        amount: total, rate: p('refinance', 'rate'), termYears: p('refinance', 'termYears'), interestOnly: false,
      }] : [];
    } else if (action.id === 'divest') {
      const count = Math.max(0, Math.round(p('divest', 'count')));
      const worst = [...before.nodes].sort((a, b) => a.dscr - b.dscr)
        .filter((n) => !removedIds.has(n.id)).slice(0, count);
      for (const n of worst) {
        removedIds.add(n.id);
        sold.push(n);
        profit -= n.contributed;
        // Sold at what its own cash can carry, and the proceeds clear its debt first.
        const proceeds = n.ebitda * Math.max(0, n.maxMultiple);
        const owed = book.filter((t) => t.nodeId === n.id).reduce((s, t) => s + t.amount, 0);
        book = book.filter((t) => t.nodeId !== n.id);
        const spare = proceeds - owed;
        if (spare > 0) book = payDown(book, spare);
        else cashIn += -spare;
      }
    } else if (action.id === 'inject') {
      const amount = Math.max(0, p('inject', 'amount'));
      cashIn += amount;
      book = payDown(book, amount);
    }

    steps.push({
      id: action.id,
      name: action.name,
      detail: action.plain,
      debt: book.reduce((s, t) => s + t.amount, 0),
      service: serviceOf(book),
      profit,
      cover: coverOf(book, profit),
    });
  }

  const last = steps[steps.length - 1];
  const after = { ...last, book, sold, cashIn };

  return {
    before: steps[0],
    steps,
    after,
    book,
    sold,
    cashIn,
    fixed: last.cover >= config.dscrFloor,
    coverGain: last.cover - steps[0].cover,
    serviceSaved: steps[0].service - last.service,
    // Interest only and a longer term both push money into the future rather than removing it.
    deferred: chosen.some((a) => a.id === 'interestOnly' || a.id === 'extend'),
  };
}

/** Spend a lump against the book, most expensive money first. */
function payDown(book, amount) {
  let left = amount;
  return [...book]
    .sort((a, b) => b.rate - a.rate)
    .map((t) => {
      if (left <= 0) return t;
      const paid = Math.min(left, t.amount);
      left -= paid;
      return { ...t, amount: t.amount - paid };
    })
    .filter((t) => t.amount > 1);
}
