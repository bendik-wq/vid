/**
 * One deal, structured properly.
 *
 * Every tranche gets a real schedule rather than a single average payment: a holiday before
 * the first instalment, payments sized over one period while the money is due at the end of a
 * shorter one, interest that rolls up when nothing is being paid. Those details are the whole
 * difference between a deal that funds itself and one that strangles you in year two, and an
 * average hides all of them.
 */

import { SOURCE_BY_ID } from '../data/capital-stack.js';
import { config } from '../data/config.js';

const within = (n, lo, hi) => Math.min(hi, Math.max(lo, n));

/**
 * Year-by-year for one tranche: what is paid, what is still owed, and the lump at the end.
 *
 * `mode` decides how the payment is sized. 'balloon' sizes it over `amortYears` while the
 * money falls due at `termYears`, which is the structure most vendor finance actually uses.
 */
export function tranche(source, years) {
  const type = SOURCE_BY_ID[source.id];
  const amount = Math.max(0, source.amount || 0);
  const rate = Math.max(0, source.rate || 0);
  const term = Math.max(1, source.termYears || 1);
  const amort = Math.max(term, source.amortYears || term);
  const holidayMonths = within(Math.round(source.holidayMonths || 0), 0, term * 12);

  if (type?.kind !== 'debt' || amount <= 0) {
    // Equity pays no interest unless a preferred return was agreed, and never repays capital.
    const pref = amount * Math.max(0, source.prefRate || 0);
    const rows = Array.from({ length: years }, (_, i) => ({
      year: i + 1, payment: pref, interest: pref, principal: 0, balance: amount, balloon: 0,
    }));
    return { rows, balloon: 0, balloonYear: null, totalPaid: pref * years, amount, kind: 'equity' };
  }

  // Stepped monthly, because that is how the money actually moves. Annual stepping leaves a
  // rounding residue that reads as a balloon nobody agreed to.
  const r = rate / 12;
  const n = Math.round(amort * 12);
  const monthly = source.mode === 'interest' || source.mode === 'bullet'
    ? 0
    : (r === 0 ? amount / n : (amount * r) / (1 - Math.pow(1 + r, -n)));

  const rows = Array.from({ length: years }, (_, i) => ({
    year: i + 1, payment: 0, interest: 0, principal: 0, balance: 0, balloon: 0,
  }));

  let balance = amount;
  let totalPaid = 0;
  let balloon = 0;
  let balloonYear = null;
  const lastMonth = Math.round(term * 12);

  for (let month = 1; month <= years * 12; month += 1) {
    const row = rows[Math.ceil(month / 12) - 1];
    if (balance <= 0.005) { row.balance = 0; continue; }

    const interest = balance * r;
    let payment;
    if (month <= holidayMonths || source.mode === 'bullet') payment = 0;
    else if (source.mode === 'interest') payment = interest;
    else payment = Math.min(monthly, balance + interest);

    const unpaidInterest = Math.max(0, interest - payment);
    const principal = Math.max(0, payment - interest);
    // Interest nobody pays either rolls onto the balance or is waived. The seller decides
    // which, and over a nine-month holiday it changes what is owed by real money.
    balance = balance - principal + (source.accrueDuringHoliday ? unpaidInterest : 0);
    totalPaid += payment;

    row.payment += payment;
    row.interest += Math.min(interest, payment);
    row.principal += principal;

    if (month === lastMonth && balance > 0.005) {
      balloon = balance;
      balloonYear = row.year;
      row.balloon += balance;
      balance = 0;
    }
    row.balance = Math.max(0, balance);
  }

  return { rows, balloon, balloonYear, totalPaid, amount, kind: 'debt' };
}

/**
 * The whole stack against the business's own cash.
 *
 * @param {object} input price, fees, the sources, and what the business earns
 */
export function runStack({
  price = 0,
  fees = 0,
  sources = [],
  ebitda = 0,
  taxRate = 0.25,
  capexPct = 0.1,
  years = 10,
  exitYear = 5,
  exitMultiple = 0,
} = {}) {
  const need = price + fees;
  const funded = sources.reduce((s, x) => s + Math.max(0, x.amount || 0), 0);
  const shortfall = need - funded;

  const tranches = sources
    .filter((x) => (x.amount || 0) > 0)
    .map((x) => ({ source: x, type: SOURCE_BY_ID[x.id], ...tranche(x, years) }));

  const freeCashFlow = Math.max(0, ebitda * (1 - capexPct) * (1 - taxRate));

  const schedule = Array.from({ length: years }, (_, i) => {
    const year = i + 1;
    const payment = tranches.reduce((s, t) => s + (t.rows[i]?.payment ?? 0), 0);
    const balloon = tranches.reduce((s, t) => s + (t.rows[i]?.balloon ?? 0), 0);
    const owed = payment + balloon;
    return {
      year,
      payment,
      balloon,
      owed,
      cash: freeCashFlow,
      surplus: freeCashFlow - owed,
      dscr: owed > 0 ? freeCashFlow / owed : Infinity,
      dscrBeforeBalloon: payment > 0 ? freeCashFlow / payment : Infinity,
      covers: owed === 0 || freeCashFlow / owed >= config.dscrFloor,
    };
  });

  // The tightest year is the one that decides whether this is fundable, and it is almost
  // never year one — that is exactly what a holiday is designed to hide.
  const servicing = schedule.filter((r) => r.payment > 0);
  const worst = servicing.reduce((a, b) => (b.dscrBeforeBalloon < a.dscrBeforeBalloon ? b : a), servicing[0] ?? null);
  const balloons = schedule.filter((r) => r.balloon > 0);

  const equity = tranches.filter((t) => t.type?.kind === 'equity');
  const equityTotal = equity.reduce((s, t) => s + t.amount, 0);
  const shares = equity.map((t) => ({
    id: t.source.id,
    name: t.type.name,
    amount: t.amount,
    pct: typeof t.source.equityPct === 'number' && isFinite(t.source.equityPct)
      ? within(t.source.equityPct, 0, 1)
      : (equityTotal > 0 ? t.amount / equityTotal : 0),
  }));
  const statedTotal = shares.reduce((s, x) => s + x.pct, 0);

  // Exit: what is left after the debt still outstanding, split by who owns what.
  const debtAtExit = tranches
    .filter((t) => t.type?.kind === 'debt')
    .reduce((s, t) => s + (t.rows[Math.min(years, exitYear) - 1]?.balance ?? 0), 0);
  const exitEnterprise = exitMultiple > 0 ? ebitda * exitMultiple : 0;
  const exitEquity = Math.max(0, exitEnterprise - debtAtExit);
  const split = shares.map((s) => ({ ...s, proceeds: exitEquity * (statedTotal > 0 ? s.pct / statedTotal : 0) }));
  const yours = split.find((s) => s.id === 'cash');

  return {
    need, funded, shortfall, balanced: Math.abs(shortfall) < 1,
    tranches, schedule, freeCashFlow,
    worst,
    minDscr: worst ? worst.dscrBeforeBalloon : Infinity,
    covers: schedule.every((r) => r.payment === 0 || r.dscrBeforeBalloon >= config.dscrFloor),
    balloons,
    totalBalloon: balloons.reduce((s, r) => s + r.balloon, 0),
    cashIn: sources.filter((x) => x.id === 'cash').reduce((s, x) => s + Math.max(0, x.amount || 0), 0),
    shares: split,
    statedTotal,
    debtAtExit,
    exitEnterprise,
    exitEquity,
    yourProceeds: yours?.proceeds ?? 0,
    yourShare: statedTotal > 0 && yours ? yours.pct / statedTotal : 0,
  };
}
