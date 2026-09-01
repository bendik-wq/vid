/**
 * The deal structures.
 *
 * Straight from the framework: every one of these is a way to buy a business without
 * putting your own money in. The point is not that money is free — it is that your cash
 * is not what limits you. The business's own profit is. That is what DSCR measures, and
 * it is why the same 1.5x floor governs the audit and the group.
 */

export const STRUCTURES = [
  {
    id: 'vendor',
    name: 'Seller pays himself out',
    formal: 'Pure vendor finance',
    plain: 'The seller lends you the whole price and you pay him back out of the profits.',
    detail:
      'One hundred per cent seller note, unsecured where you can negotiate it, no personal guarantee, ' +
      'and a payment holiday of nine to twelve months so the business funds the first year itself.',
    depositPct: 0,
    bankPct: 0,
    sellerNotePct: 1,
    bankRate: 0.09,
    bankTermYears: 7,
    sellerNoteRate: 0.04,
    sellerNoteTermYears: 6,
    holidayMonths: 9,
    cashRequired: 'None',
    whenToUse: 'A seller who wants out, has no debt, and cares more about the number than the timing.',
    watchFor: 'He will want security. Trade term or rate for keeping it unsecured — that is the valuable bit.',
  },
  {
    id: 'blend',
    name: 'Bank and seller together',
    formal: 'Seller–lender blend',
    plain: 'A bank funds most of it, the seller leaves the rest in and stays on the hook.',
    detail:
      'Sixty per cent commercial debt, forty per cent seller rollover as equity or a subordinated note. ' +
      'The bank validates the deal for you; the seller keeps skin in the game, which is what stops the ' +
      'business quietly falling over the month after completion.',
    depositPct: 0,
    bankPct: 0.6,
    sellerNotePct: 0.4,
    bankRate: 0.09,
    bankTermYears: 7,
    sellerNoteRate: 0.05,
    sellerNoteTermYears: 6,
    holidayMonths: 6,
    cashRequired: 'None',
    whenToUse: 'A clean, bankable business where a lender gives you credibility you have not earned yet.',
    watchFor: 'Covenants. Get the headroom before you sign, not after.',
  },
  {
    id: 'wcline',
    name: 'The business pays the bills',
    formal: 'Working-capital financed costs',
    plain: 'The price is financed, and a facility drawn on completion covers the fees.',
    detail:
      'Price on vendor finance or bank debt, and a working-capital line of around ten per cent of ' +
      'revenue drawn at settlement to cover legal, accounting, integration and runway. You walk in ' +
      'with cash rather than out of pocket.',
    depositPct: 0,
    bankPct: 0.3,
    sellerNotePct: 0.7,
    bankRate: 0.09,
    bankTermYears: 7,
    sellerNoteRate: 0.045,
    sellerNoteTermYears: 6,
    holidayMonths: 9,
    cashRequired: 'None — you finish with more cash than you started',
    whenToUse: 'Any deal where the fees are the thing actually stopping you.',
    watchFor: 'The line is working capital, not profit. Spend it on the integration, not on yourself.',
  },
  {
    id: 'deposit',
    name: 'Put money down',
    formal: 'Conventional deposit',
    plain: 'You pay a deposit, borrow the rest. The way most people assume it has to work.',
    detail:
      'Twenty per cent of your own money, thirty per cent left with the seller, the rest from a bank. ' +
      'It is here so you can see what your cash actually buys you, which is usually less than the ' +
      'structures above.',
    depositPct: 0.2,
    bankPct: 0.5,
    sellerNotePct: 0.3,
    bankRate: 0.09,
    bankTermYears: 7,
    sellerNoteRate: 0.06,
    sellerNoteTermYears: 5,
    holidayMonths: 0,
    cashRequired: '20% of the price',
    whenToUse: 'When the seller will not finance and the deal is worth your own money.',
    watchFor: 'Your cash is the scarcest thing you have. Spending it here is a choice, not a requirement.',
  },
];

export const STRUCTURES_BY_ID = Object.fromEntries(STRUCTURES.map((s) => [s.id, s]));

/** Convert a structure into the shape the funding maths expects. */
export const asFunding = (structureId) => {
  const s = STRUCTURES_BY_ID[structureId] ?? STRUCTURES_BY_ID.vendor;
  return {
    depositPct: s.depositPct,
    sellerNotePct: s.sellerNotePct,
    bankRate: s.bankRate,
    bankTermYears: s.bankTermYears,
    sellerNoteRate: s.sellerNoteRate,
    sellerNoteTermYears: s.sellerNoteTermYears,
    sellerNoteInterestOnly: false,
    holidayMonths: s.holidayMonths,
  };
};

/**
 * What you actually merge when you bolt a business on.
 *
 * Synergy is not a number you assume, it is a list of things you do. Each lever is a
 * share of the acquired business's profit that stops being spent twice.
 */
export const INTEGRATION_LEVERS = [
  {
    id: 'backoffice',
    name: 'One back office',
    plain: 'One bookkeeper, one payroll, one set of software instead of two.',
    saving: 0.06,
    months: 3,
    difficulty: 1,
  },
  {
    id: 'buying',
    name: 'Buying power',
    plain: 'Two businesses ordering as one get the bigger customer’s price.',
    saving: 0.04,
    months: 6,
    difficulty: 2,
  },
  {
    id: 'premises',
    name: 'Shared premises and vehicles',
    plain: 'Two yards become one. Two vans do the work of three.',
    saving: 0.05,
    months: 9,
    difficulty: 2,
  },
  {
    id: 'owner',
    name: 'The owner’s wage',
    plain: 'You are already paying a manager. You do not need two of them.',
    saving: 0.07,
    months: 12,
    difficulty: 3,
  },
  {
    id: 'crosssell',
    name: 'Selling each other’s work',
    plain: 'Their customers buy what you do. Yours buy what they do.',
    saving: 0.05,
    months: 12,
    difficulty: 3,
  },
  {
    id: 'systems',
    name: 'One system, one brand',
    plain: 'One way of quoting, scheduling and invoicing across the group.',
    saving: 0.03,
    months: 18,
    difficulty: 3,
  },
];

export const LEVERS_BY_ID = Object.fromEntries(INTEGRATION_LEVERS.map((l) => [l.id, l]));

/** Total saving, as a share of the bolt-on's profit, from the levers you actually pull. */
export const synergyFrom = (leverIds) =>
  INTEGRATION_LEVERS.filter((l) => leverIds.includes(l.id)).reduce((s, l) => s + l.saving, 0);

export const MAX_SYNERGY = INTEGRATION_LEVERS.reduce((s, l) => s + l.saving, 0);
