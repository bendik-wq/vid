/**
 * The four places acquisition money comes from, plus your own.
 *
 * Two of them are debt and have to be serviced out of the business's cash. Two are equity and
 * do not — they take a share of what the business is worth when you sell instead. Confusing
 * the two is how people end up owning a business that cannot pay for itself.
 */

export const SOURCE_TYPES = [
  {
    id: 'cash',
    name: 'Your own money',
    kind: 'equity',
    plain: 'What you put in yourself. The scarcest thing you have.',
    canDefer: false,
  },
  {
    id: 'seller',
    name: 'Seller finance',
    kind: 'debt',
    plain: 'The seller lends you part of the price and you pay him back out of the profits.',
    plainTerms: 'Usually 3–5% and five to seven years, often unsecured, often with a holiday before the first payment.',
    canDefer: true,
  },
  {
    id: 'rollover',
    name: 'Seller rollover',
    kind: 'equity',
    plain: 'The seller keeps a slice of the business instead of being paid for it.',
    plainTerms: 'Nothing to repay. He is paid when you sell, out of the same pot as you — which is exactly why he stays helpful.',
    canDefer: false,
  },
  {
    id: 'bank',
    name: 'Commercial debt',
    kind: 'debt',
    plain: 'A bank lends against the business.',
    plainTerms: 'Cheapest money in the stack and the strictest. Expect covenants, security, and a hard look at cover.',
    canDefer: true,
  },
  {
    id: 'investor',
    name: 'Investor capital',
    kind: 'equity',
    plain: 'Someone else puts money in for a share of the business.',
    plainTerms: 'No repayments unless you agree a preferred return. The cost is a permanent slice of everything you build.',
    canDefer: false,
  },
];

export const SOURCE_BY_ID = Object.fromEntries(SOURCE_TYPES.map((s) => [s.id, s]));

/** How a debt tranche is repaid. Amortisation longer than the term is what creates a balloon. */
export const REPAYMENT_MODES = [
  { id: 'amortising', name: 'Repaid over the term', plain: 'Equal payments until nothing is left at the end.' },
  { id: 'balloon', name: 'Part repaid, lump at the end', plain: 'Payments sized over a longer period, so a lump falls due when the term ends.' },
  { id: 'interest', name: 'Interest only', plain: 'You pay the interest and the whole amount falls due at the end.' },
  { id: 'bullet', name: 'Nothing until the end', plain: 'No payments at all. Interest rolls up and the lot is due at once.' },
];

export const blankSource = (id, over = {}) => ({
  id,
  amount: 0,
  rate: id === 'seller' ? 0.04 : id === 'bank' ? 0.09 : 0,
  termYears: id === 'bank' ? 7 : 6,
  amortYears: id === 'bank' ? 7 : 6,
  mode: 'amortising',
  holidayMonths: id === 'seller' ? 9 : 0,
  accrueDuringHoliday: true,
  /** Equity sources only. Left null to split what is left in proportion to what was put in. */
  equityPct: null,
  /** Equity sources only. A coupon paid in cash before anything reaches you. */
  prefRate: 0,
  ...over,
});

/** A sensible starting stack: no money down, seller carries most of it. */
export const defaultStack = () => [
  blankSource('cash', { amount: 0 }),
  blankSource('seller', { amount: 0, mode: 'balloon', amortYears: 10, termYears: 6 }),
  blankSource('rollover', { amount: 0 }),
  blankSource('bank', { amount: 0 }),
  blankSource('investor', { amount: 0 }),
];
