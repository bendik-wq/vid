/**
 * Reference cases.
 *
 * `brokerCase` is the calibration anchor: the business Josh describes on camera —
 * $3m revenue, a broker claiming $1m EBITDA, an owner on a $250k salary added back
 * while working in the business daily. He says it is "realistically at $500,000 in
 * profit". The engine was built from the criteria, not fitted to that number, so how
 * close it lands is the evidence that the deltas are calibrated.
 */

export const BROKER_CASE = {
  id: 'broker-case',
  label: 'Josh’s broker case (calibration)',
  business: { name: 'Broker-listed business', sector: 'generic' },
  askingPrice: 5_000_000,
  financials: {
    revenue: 3_000_000,
    claimedEbitda: 1_000_000,
    ownerSalaryDrawn: 250_000,
    ownerSalaryAddedBack: 250_000,
    ownerReplacementCost: 250_000,
    maintenanceCapex: 60_000,
    taxRate: 0.25,
  },
  scores: {
    C2: 3, C3: 2, C4: 2, C5: 2, C6: 3, C7: 1,
    C9: 2, C10: 3, C11: 2, C12: 3, C13: 3,
    C14: 3, C15: 1, C16: 2, C17: 3, C18: 2, C19: 3, C20: 2,
  },
  note:
    'Josh’s own words: "a lot of times sellers haven’t set up properly to maximise the value ' +
    'they get when they exit." This is that seller, scored as he describes them.',
};

/** A well-prepared seller, for contrast on the same revenue base. */
export const PREPARED_CASE = {
  id: 'prepared',
  label: 'Same business, restructured',
  business: { name: 'Prepared seller', sector: 'generic' },
  askingPrice: 5_000_000,
  financials: {
    revenue: 3_000_000,
    claimedEbitda: 1_000_000,
    ownerSalaryDrawn: 180_000,
    ownerSalaryAddedBack: 0,
    ownerReplacementCost: 180_000,
    maintenanceCapex: 60_000,
    taxRate: 0.25,
  },
  scores: {
    C2: 5, C3: 5, C4: 5, C5: 4, C6: 5, C7: 4,
    C9: 4, C10: 5, C11: 4, C12: 4, C13: 5,
    C14: 4, C15: 5, C16: 4, C17: 5, C18: 5, C19: 4, C20: 5,
  },
  note: 'Every criterion at or near the top anchor. Same revenue, a different asset.',
};

export const CASES = [BROKER_CASE, PREPARED_CASE];
