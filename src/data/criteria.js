/**
 * Sell-side audit criteria bank — v0.1
 *
 * Three pillars, recast from the buy-side 3C framework:
 *   Credibility — can your NUMBERS be believed?
 *   Capital     — is your ASKING PRICE financeable?
 *   Closing     — can YOUR deal actually complete?
 *
 * Every criterion carries one of three impacts:
 *   { kind: 'ebitda',   maxHaircut }  fraction of claimed EBITDA removed at score 1
 *   { kind: 'multiple', maxPenalty }  turns of multiple removed at score 1
 *   { kind: 'computed' }              scored by arithmetic from intake, not self-assessed
 *
 * Self-scored criteria apply their impact proportionally: (5 - score) / 4.
 * Score 5 = no impact. Score 1 = full impact.
 *
 * `why` is the justification column. Josh reviews these, not the criteria.
 * Anything marked provisional: true has NOT been signed off yet.
 */

export const PILLARS = {
  credibility: {
    id: 'credibility',
    name: 'Credibility',
    buySide: 'Can you be believed?',
    sellSide: 'Can your numbers be believed?',
    blurb:
      'Every pound of claimed EBITDA that will not survive a quality-of-earnings review. ' +
      'This pillar carries all EBITDA haircuts — it moves the base, not the multiple.',
  },
  capital: {
    id: 'capital',
    name: 'Capital',
    buySide: 'Can you fund it?',
    sellSide: 'Is your asking price financeable?',
    blurb:
      'A buyer has to service debt on whatever you sell for. If the cash cannot carry the ' +
      'structure, the price is not high — it is unfundable.',
  },
  closing: {
    id: 'closing',
    name: 'Closing',
    buySide: 'Can you complete?',
    sellSide: 'Can your deal complete?',
    blurb:
      'Everything that kills a deal between heads of terms and completion: dependency, ' +
      'concentration, assignability, licences, people.',
  },
};

/** Scale used by every self-scored criterion. */
export const SCORE_SCALE = [1, 2, 3, 4, 5];

/** Combined EBITDA haircut is capped here regardless of scores. */
export const MAX_COMBINED_EBITDA_HAIRCUT = 0.5;

/** No business is priced below this, however badly it scores. */
export const MULTIPLE_FLOOR = 2.0;

export const CRITERIA = [
  // ── CREDIBILITY ───────────────────────────────────────────────────────────
  {
    id: 'C1',
    pillar: 'credibility',
    name: 'Owner salary add-back',
    question: 'Is the owner’s pay added back to EBITDA, and would a buyer have to replace them?',
    impact: { kind: 'computed', target: 'ebitda', cap: 0.4 },
    computedNote:
      'Not self-scored. Haircut = market cost of replacing the owner, less any owner pay still ' +
      'sitting in the P&L. Capped at 40% of claimed EBITDA.',
    anchors: {
      1: 'Full salary added back and the owner is in delivery daily — the buyer inherits a vacancy, not a profit.',
      3: 'Partial add-back, or owner is half out of delivery — a replacement costs real money.',
      5: 'Owner draws a market salary that stays in the P&L and is out of day-to-day delivery.',
    },
    effort: { months: 12, difficulty: 3 },
    why:
      'Josh’s broker case exactly: $3M revenue, "$1M EBITDA", owner on $250k added back while ' +
      'working the business daily. The replacement cost is the haircut. This is arithmetic, not opinion.',
  },
  {
    id: 'C2',
    pillar: 'credibility',
    name: 'Related-party rent at market',
    question: 'Do you own the premises and charge the business below-market rent?',
    impact: { kind: 'ebitda', maxHaircut: 0.08 },
    anchors: {
      1: 'Premises owned personally, rent nil or nominal — EBITDA is flattered by free occupancy.',
      3: 'Related-party lease, rent below market, no independent valuation.',
      5: 'Arm’s-length lease at market rent, or an assignable third-party lease with term remaining.',
    },
    effort: { months: 3, difficulty: 1 },
    why:
      'A buyer either pays you market rent or pays a landlord. Either way the cost lands. 8% caps ' +
      'the typical rent-to-EBITDA distortion in an owner-occupied SME.',
  },
  {
    id: 'C3',
    pillar: 'credibility',
    name: 'Non-recurring add-backs',
    question: 'How much of your adjusted EBITDA is one-off items added back?',
    impact: { kind: 'ebitda', maxHaircut: 0.1 },
    anchors: {
      1: 'A long list of "one-offs" that recur every year — legal, restructuring, bad debts, write-offs.',
      3: 'A handful of genuine one-offs, thinly evidenced.',
      5: 'Under 2% of EBITDA in add-backs, each one documented and genuinely non-repeating.',
    },
    effort: { months: 6, difficulty: 2 },
    why:
      'The add-back schedule is the first thing a QoE provider dismantles. 10% is the mid-point of ' +
      'what is typically disallowed in lower-mid-market deals.',
  },
  {
    id: 'C4',
    pillar: 'credibility',
    name: 'Personal expenses in the P&L',
    question: 'Are personal costs run through the business and added back at exit?',
    impact: { kind: 'ebitda', maxHaircut: 0.07 },
    anchors: {
      1: 'Vehicles, travel, family on payroll, subscriptions — significant and undocumented.',
      3: 'Some personal cost, identified but not cleanly separated.',
      5: 'Clean books for three years. Nothing personal to add back.',
    },
    effort: { months: 12, difficulty: 2 },
    why:
      'Add-backs a buyer cannot verify are add-backs a buyer will not pay for. Tax-efficient today, ' +
      'value-destroying at exit — the trade is roughly 7% of EBITDA in a typical owner-managed business.',
  },
  {
    id: 'C5',
    pillar: 'credibility',
    name: 'Maintenance capex recognised',
    question: 'Does reported profit reflect the capex needed just to stand still?',
    impact: { kind: 'ebitda', maxHaircut: 0.08 },
    anchors: {
      1: 'Fleet, plant or systems visibly deferred — the buyer inherits a spend the accounts never showed.',
      3: 'Capex is lumpy and unbudgeted; no maintenance schedule exists.',
      5: 'Documented maintenance capex plan, assets current, spend consistent year on year.',
    },
    effort: { months: 9, difficulty: 2 },
    why:
      'Deferred capex is borrowed EBITDA. A buyer prices the replacement, so it comes out of the base ' +
      'before it ever reaches the multiple.',
  },
  {
    id: 'C6',
    pillar: 'credibility',
    name: 'Statements reconcile to tax returns',
    question: 'Do your management accounts match your filed returns for three years?',
    impact: { kind: 'multiple', maxPenalty: 0.5 },
    anchors: {
      1: 'Material unexplained variance between management accounts and filings.',
      3: 'Reconciles with effort; no standing bridge between the two.',
      5: 'Clean three-year match, reconciliation maintained monthly.',
    },
    effort: { months: 6, difficulty: 2 },
    why:
      'This does not change what the business earns — it changes whether a buyer trusts the number. ' +
      'Trust is priced in the multiple, not the base.',
  },
  {
    id: 'C7',
    pillar: 'credibility',
    name: 'Owner-generated revenue',
    question: 'What share of revenue is won or held by the owner personally?',
    impact: { kind: 'multiple', maxPenalty: 0.6 },
    anchors: {
      1: 'Over 40% of revenue is the owner’s relationships. The goodwill walks out with them.',
      3: '15–40% owner-attached; a named successor exists but is untested.',
      5: 'Under 5%. Revenue is institutional — brand, contracts, and a sales function.',
    },
    effort: { months: 18, difficulty: 3 },
    why:
      'Heaviest multiple delta in the bank, alongside management depth. These two decide whether you ' +
      'are selling a business or a job — and a job does not carry a business multiple.',
  },

  // ── CAPITAL ───────────────────────────────────────────────────────────────
  {
    id: 'C8',
    pillar: 'capital',
    name: 'DSCR at your own asking price',
    question: 'Could a buyer service the debt your price implies?',
    impact: { kind: 'computed', target: 'gate' },
    computedNote:
      'Not self-scored. Free cash flow after tax and maintenance capex, divided by the annual debt ' +
      'service your asking price implies at the stated structure. Josh’s floor is 1.50x.',
    anchors: {
      1: 'Below 1.00x — no lender funds it and no seller-financed buyer survives it.',
      3: 'Between 1.25x and 1.50x — fundable only with a larger deposit or a longer seller note.',
      5: 'Above 2.00x — comfortably bankable at the price asked.',
    },
    effort: { months: 0, difficulty: 1 },
    why:
      'The gate. Pure arithmetic on the seller’s own inputs. A price that fails DSCR is not an ' +
      'ambitious price, it is an unfundable one — and that is a structure problem, not a price problem.',
  },
  {
    id: 'C9',
    pillar: 'capital',
    name: 'Cash rhythm',
    question: 'How does cash actually arrive through the year?',
    impact: { kind: 'multiple', maxPenalty: 0.35 },
    anchors: {
      1: 'Quarterly project lumps. Long dry months a buyer must fund out of their own pocket.',
      3: 'Monthly but uneven; seasonality swings working capital materially.',
      5: 'Daily or weekly receipts, predictable within the month.',
    },
    effort: { months: 12, difficulty: 3 },
    why:
      'Debt service is monthly. Lumpy cash means the buyer needs a facility on top of the deal, ' +
      'and they discount the price by roughly what that facility costs.',
  },
  {
    id: 'C10',
    pillar: 'capital',
    name: 'Working capital and debtor discipline',
    question: 'How much cash is trapped in debtors and stock, and how volatile is it?',
    impact: { kind: 'multiple', maxPenalty: 0.25 },
    anchors: {
      1: 'Debtor days over 90, no credit control, stock unreconciled.',
      3: 'Debtor days 45–90, informal chasing, some ageing.',
      5: 'Debtor days under 30, formal credit control, a stable working capital cycle.',
    },
    effort: { months: 6, difficulty: 1 },
    why:
      'A buyer funds the working capital peg on day one. A volatile peg is negotiated out of the ' +
      'headline price — and the negotiation always favours the side with the data.',
  },
  {
    id: 'C11',
    pillar: 'capital',
    name: 'Revenue quality',
    question: 'How much revenue is contracted or recurring versus won again each year?',
    impact: { kind: 'multiple', maxPenalty: 0.45 },
    anchors: {
      1: 'Entirely project-by-project. The order book resets to zero every January.',
      3: 'Repeat customers by habit, nothing contracted.',
      5: 'Majority contracted or subscription, with multi-year terms and documented renewal rates.',
    },
    effort: { months: 18, difficulty: 3 },
    why:
      'Contracted revenue is the difference between a lender underwriting your forecast and ignoring it. ' +
      'It shows up in both what a buyer will pay and what a bank will lend against it.',
  },
  {
    id: 'C12',
    pillar: 'capital',
    name: 'Gross margin stability',
    question: 'How stable has gross margin been across the last three years?',
    impact: { kind: 'multiple', maxPenalty: 0.25 },
    anchors: {
      1: 'Swings of more than 8 points with no explanation, or a clear downward trend.',
      3: 'Moves 3–8 points; pricing is reactive.',
      5: 'Within 2 points for three years, with pricing power demonstrated through cost inflation.',
    },
    effort: { months: 12, difficulty: 2 },
    why:
      'Unstable margin means the forecast is a guess. Buyers do not pay a premium multiple for a guess, ' +
      'and lenders stress-test to the worst of the three years.',
  },
  {
    id: 'C13',
    pillar: 'capital',
    name: 'Balance sheet cleanliness',
    question: 'What sits on the balance sheet that a buyer has to clear or assume?',
    impact: { kind: 'multiple', maxPenalty: 0.3 },
    anchors: {
      1: 'Tax arrears, director loans, undisclosed leases, personal guarantees across the assets.',
      3: 'Some finance leases and a director loan, all documented.',
      5: 'Cash-free debt-free ready. Nothing to unwind before completion.',
    },
    effort: { months: 9, difficulty: 2 },
    why:
      'Every item here is either deducted from the price at completion or delays it. Both cost the ' +
      'seller — the first in cash, the second in deal fatigue.',
  },

  // ── CLOSING ───────────────────────────────────────────────────────────────
  {
    id: 'C14',
    pillar: 'closing',
    name: 'Customer concentration',
    question: 'How much revenue sits with your largest customers?',
    impact: { kind: 'multiple', maxPenalty: 0.55 },
    anchors: {
      1: 'One or two clients above 30% of revenue.',
      3: 'Largest client 15–30%, relationship stable but uncontracted.',
      5: 'Largest client under 10%, top five under 30%.',
    },
    effort: { months: 24, difficulty: 3 },
    why:
      'Concentration is the single most common reason a funded deal collapses in diligence. Above 30% ' +
      'most lenders will not underwrite at all, whatever the multiple.',
  },
  {
    id: 'C15',
    pillar: 'closing',
    name: 'Management depth',
    question: 'If you disappeared for 90 days, what would happen?',
    impact: { kind: 'multiple', maxPenalty: 0.6 },
    anchors: {
      1: 'Nothing runs. Every decision, quote and escalation routes through the owner.',
      3: 'A capable number two exists but has never run the business unsupervised.',
      5: 'A complete management team runs it now; the owner is genuinely non-operational.',
    },
    effort: { months: 18, difficulty: 3 },
    why:
      'Joint heaviest delta with owner-generated revenue. It also sets the tie-in a buyer demands — ' +
      'no management depth means a two-year earn-out, which is not an exit.',
  },
  {
    id: 'C16',
    pillar: 'closing',
    name: 'Contract assignability',
    question: 'Do your customer contracts survive a change of control?',
    impact: { kind: 'multiple', maxPenalty: 0.4 },
    anchors: {
      1: 'Change-of-control clauses throughout, or no written contracts at all.',
      3: 'Written contracts, consent required, relationships likely to hold.',
      5: 'Freely assignable, or consents pre-agreed with the major accounts.',
    },
    effort: { months: 12, difficulty: 2 },
    why:
      'An unassignable contract is revenue you cannot sell. Buyers either exclude it from the ' +
      'valuation or push it into deferred consideration — both reduce cash at completion.',
  },
  {
    id: 'C17',
    pillar: 'closing',
    name: 'Licences and regulatory transferability',
    question: 'Do the licences and accreditations the business trades on transfer with it?',
    impact: { kind: 'multiple', maxPenalty: 0.25 },
    anchors: {
      1: 'Licences held personally by the owner and non-transferable.',
      3: 'Held by the company; transfer requires a re-application of uncertain duration.',
      5: 'Held by the company, transfer on change of control routine and documented.',
    },
    effort: { months: 9, difficulty: 2 },
    why:
      'A personally held licence means the buyer cannot trade on day one. In regulated trades this is ' +
      'not a discount, it is a deal-breaker.',
  },
  {
    id: 'C18',
    pillar: 'closing',
    name: 'Key staff retention',
    question: 'Are the people the business depends on contractually tied in?',
    impact: { kind: 'multiple', maxPenalty: 0.3 },
    anchors: {
      1: 'No written contracts, no restrictive covenants, key staff loyal to the owner personally.',
      3: 'Contracts in place, covenants weak or untested.',
      5: 'Current contracts, enforceable covenants, retention arrangements agreed through a sale.',
    },
    effort: { months: 6, difficulty: 1 },
    why:
      'Staff who can leave on a week’s notice are a risk the buyer prices. The fix is cheap and fast, ' +
      'which is why leaving it undone reads as carelessness in diligence.',
  },
  {
    id: 'C19',
    pillar: 'closing',
    name: 'Supplier dependency',
    question: 'What happens if your largest supplier changes terms or exits?',
    impact: { kind: 'multiple', maxPenalty: 0.2 },
    anchors: {
      1: 'Single source for a critical input, no contract, terms at their discretion.',
      3: 'Concentrated but with a workable alternative identified.',
      5: 'Multiple qualified suppliers, contracted terms, no single point of failure.',
    },
    effort: { months: 9, difficulty: 2 },
    why:
      'Supplier risk is priced more lightly than customer risk because it is usually fixable — but it ' +
      'is the fastest route to a post-completion margin collapse, so it is never priced at zero.',
  },
  {
    id: 'C20',
    pillar: 'closing',
    name: 'Data room readiness',
    question: 'How long would it take you to produce three years of everything?',
    impact: { kind: 'multiple', maxPenalty: 0.25 },
    anchors: {
      1: 'Months. Records are scattered, some only in the owner’s head.',
      3: 'Weeks, with the accountant’s help.',
      5: 'A maintained data room. Days, not weeks.',
    },
    effort: { months: 3, difficulty: 1 },
    why:
      'Slow disclosure is read as concealment, and every week of delay is a week for the buyer to find ' +
      'a reason to retrade. This is the cheapest turn of multiple in the bank.',
  },
];

export const CRITERIA_BY_ID = Object.fromEntries(CRITERIA.map((c) => [c.id, c]));

export const criteriaForPillar = (pillar) => CRITERIA.filter((c) => c.pillar === pillar);

/** Total multiple penalty available if every self-scored criterion scores 1. */
export const MAX_MULTIPLE_PENALTY = CRITERIA
  .filter((c) => c.impact.kind === 'multiple')
  .reduce((sum, c) => sum + c.impact.maxPenalty, 0);

/** Total EBITDA haircut available from self-scored criteria, before the combined cap. */
export const MAX_SELF_SCORED_EBITDA_HAIRCUT = CRITERIA
  .filter((c) => c.impact.kind === 'ebitda')
  .reduce((sum, c) => sum + c.impact.maxHaircut, 0);
