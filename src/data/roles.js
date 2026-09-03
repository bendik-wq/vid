/**
 * The people.
 *
 * Three tiers, and they are paid in different currencies. A board is bought with equity
 * rather than cash — that is the whole point of it, and it is why credibility can be
 * assembled by someone with no money. HoldCo and unit management are bought with salary,
 * which comes straight off the profit before anyone puts a multiple on it.
 *
 * `moves` is what filling the seat does to the audit. Those are the same criteria the rest
 * of the tool scores, so hiring somebody has a value consequence rather than just a cost.
 */

export const TIERS = [
  {
    id: 'board',
    name: 'Board',
    plain: 'Bought with equity, not salary. Their track record stands in for the one you do not have yet.',
    currency: 'equity',
    principle: 'Your team’s credibility substitutes for personal capital and experience.',
  },
  {
    id: 'holdco',
    name: 'Head office',
    plain: 'The centre of the group. Small, and paid for out of what the businesses save by sharing it.',
    currency: 'salary',
  },
  {
    id: 'unit',
    name: 'Each business',
    plain: 'Who runs it when you are not there. This is the difference between owning a business and owning a job.',
    currency: 'salary',
  },
];

export const TIER_BY_ID = Object.fromEntries(TIERS.map((t) => [t.id, t]));

/** When a seat is normally filled, and what the stage means in practice. */
export const STAGES = [
  { id: 'before', name: 'Before the first deal', order: 1, plain: 'What you need to be taken seriously by a lender or a seller.' },
  { id: 'first', name: 'At the first deal', order: 2, plain: 'The people without whom completion is a risk.' },
  { id: 'three', name: 'By the third business', order: 3, plain: 'Where a collection of businesses starts needing a centre.' },
  { id: 'five', name: 'By the fifth', order: 4, plain: 'Where the group becomes an institution rather than a portfolio.' },
];

export const STAGE_BY_ID = Object.fromEntries(STAGES.map((s) => [s.id, s]));

export const ROLES = [
  // ── Board: paid in founders' equity ─────────────────────────────────────
  {
    id: 'chair', tier: 'board', title: 'Chair',
    plain: 'A former operator or industry name whose presence makes a lender take the meeting.',
    wants: 'Recently retired, still wants something to build. Not a figurehead — a door-opener.',
    equityPct: 0.04, cost: 0, stage: 'before', essential: true,
    moves: { C6: 1, C15: 1 },
    unlocks: 'Lenders return the call. Sellers believe the buyer is real.',
  },
  {
    id: 'finance', tier: 'board', title: 'Finance lead',
    plain: 'A CFO or credit veteran who has sat on the other side of the table.',
    wants: 'Someone who has approved deals like yours, so the structure is right before it is submitted.',
    equityPct: 0.03, cost: 0, stage: 'before', essential: true,
    moves: { C6: 1, C13: 1 },
    unlocks: 'The model is bankable the first time rather than the third.',
  },
  {
    id: 'legal', tier: 'board', title: 'Legal lead',
    plain: 'An M&A lawyer or former general counsel.',
    wants: 'Someone who has papered a hundred of these and knows which clauses actually matter.',
    equityPct: 0.02, cost: 0, stage: 'before', essential: true,
    moves: { C16: 1, C17: 1 },
    unlocks: 'Contracts assign, licences transfer, and nothing turns up in week eleven.',
  },
  {
    id: 'operator', tier: 'board', title: 'Sector operator',
    plain: 'Someone who has run the kind of business you are buying.',
    wants: 'Not a consultant. Somebody who has done the job and can tell a good one from a tidy one.',
    equityPct: 0.03, cost: 0, stage: 'before', essential: true,
    moves: { C7: 1, C19: 1 },
    unlocks: 'You stop buying the wrong businesses.',
  },

  // ── Head office: the group's centre ──────────────────────────────────────
  {
    id: 'groupmd', tier: 'holdco', title: 'Group managing director',
    plain: 'Runs the group day to day so you can run the strategy.',
    wants: 'Someone who has held several businesses together before, not the best of your GMs promoted.',
    cost: 140_000, stage: 'three', essential: true,
    moves: { C15: 2, C7: 1 },
    unlocks: 'The group survives you taking a month off.',
  },
  {
    id: 'groupfd', tier: 'holdco', title: 'Group finance director',
    plain: 'One set of numbers across every business, on the same day each month.',
    wants: 'A controller who has consolidated before. Not the bookkeeper from the biggest unit.',
    cost: 110_000, stage: 'three', essential: true,
    moves: { C6: 2, C10: 1, C13: 1 },
    unlocks: 'Management accounts reconcile to filings, which is most of the credibility problem.',
  },
  {
    id: 'integration', tier: 'holdco', title: 'Integration lead',
    plain: 'Owns the first hundred days of every business you buy.',
    wants: 'Project manager temperament. The savings you modelled do not happen without one.',
    cost: 85_000, stage: 'first', essential: false,
    moves: { C15: 1 },
    unlocks: 'The savings you assumed actually arrive.',
  },
  {
    id: 'groupcommercial', tier: 'holdco', title: 'Group commercial lead',
    plain: 'Sells across the group, so each business stops depending on its own founder.',
    wants: 'Someone who can build a pipeline that is not a phone full of personal contacts.',
    cost: 95_000, stage: 'three', essential: false,
    moves: { C7: 2, C11: 1, C14: 1 },
    unlocks: 'Revenue belongs to the group rather than to whoever answers the phone.',
  },
  {
    id: 'grouppeople', tier: 'holdco', title: 'Group people and systems',
    plain: 'One way of hiring, one payroll, one set of contracts.',
    wants: 'Practical rather than corporate. The job is standardisation, not policy.',
    cost: 70_000, stage: 'five', essential: false,
    moves: { C18: 2, C20: 1 },
    unlocks: 'Staff are on current contracts and the data room is a folder, not an archaeology dig.',
  },

  // ── Each business ────────────────────────────────────────────────────────
  {
    id: 'gm', tier: 'unit', title: 'General manager',
    plain: 'Runs this business. Answers for its number.',
    wants: 'Often the seller’s number two, if there is one. If there is not, that is what you are paying for.',
    cost: 75_000, stage: 'first', essential: true,
    moves: { C15: 2, C7: 2 },
    unlocks: 'The single biggest move on the price a buyer will pay.',
  },
  {
    id: 'ops', tier: 'unit', title: 'Operations manager',
    plain: 'Schedules the work and holds the margin.',
    wants: 'Promoted from inside more often than not. Cheap, and it frees the GM to sell.',
    cost: 52_000, stage: 'first', essential: false,
    moves: { C12: 1, C9: 1 },
    unlocks: 'Margin stops moving with whoever happened to price the job.',
  },
  {
    id: 'unitfinance', tier: 'unit', title: 'Bookkeeper',
    plain: 'Invoices go out, money comes in, on a schedule.',
    wants: 'Part time is usually enough, and it is the cheapest thing on this list.',
    cost: 34_000, stage: 'first', essential: false,
    moves: { C10: 2, C3: 1 },
    unlocks: 'Debtor days come down and the add-back list gets shorter.',
  },
  {
    id: 'unitsales', tier: 'unit', title: 'Sales lead',
    plain: 'Wins work that is not the owner’s address book.',
    wants: 'The role that most directly removes you from the revenue.',
    cost: 58_000, stage: 'three', essential: false,
    moves: { C7: 2, C14: 1 },
    unlocks: 'Concentration falls and the goodwill stops walking out with the founder.',
  },
  {
    id: 'unitservice', tier: 'unit', title: 'Contracts and service manager',
    plain: 'Keeps the recurring half recurring.',
    wants: 'Where the business has maintenance or contracted work, this is who protects it.',
    cost: 46_000, stage: 'three', essential: false,
    moves: { C11: 2, C16: 1 },
    unlocks: 'Contracted revenue is the difference between a forecast and a guess.',
  },
];

export const ROLES_BY_ID = Object.fromEntries(ROLES.map((r) => [r.id, r]));
export const rolesForTier = (tier) => ROLES.filter((r) => r.tier === tier);

/** Total founders' equity if every board seat is filled at the suggested share. */
export const BOARD_EQUITY = rolesForTier('board').reduce((s, r) => s + (r.equityPct ?? 0), 0);
