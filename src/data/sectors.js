/**
 * Sector premium multiple ceilings.
 *
 * The ceiling is what a well-run business in this sector achieves on defensible EBITDA —
 * NOT the average, and not the best deal ever done. Penalties are subtracted from it.
 *
 * PROVISIONAL. v0.1 shipped with a single sector-blind 7.0x ceiling, which is wrong:
 * a physio clinic and an electrical contractor do not share a premium multiple. These
 * ranges are placeholders pending Josh's numbers for the core verticals. Every entry
 * marked signedOff: false should be treated as a working assumption, not a quoted figure.
 */

export const SECTORS = [
  { id: 'generic',      name: 'Generic / other',                 ceiling: 7.0, floorHint: 2.0, signedOff: false },
  { id: 'healthcare',   name: 'Healthcare & clinics',            ceiling: 8.0, floorHint: 3.0, signedOff: false },
  { id: 'trades',       name: 'Trades & contracting',            ceiling: 5.5, floorHint: 2.0, signedOff: false },
  { id: 'proserv',      name: 'Professional services',           ceiling: 6.5, floorHint: 2.5, signedOff: false },
  { id: 'software',     name: 'Software & recurring technology', ceiling: 10.0, floorHint: 4.0, signedOff: false },
  { id: 'manufacturing',name: 'Manufacturing & engineering',     ceiling: 6.0, floorHint: 2.5, signedOff: false },
  { id: 'logistics',    name: 'Logistics & distribution',        ceiling: 6.0, floorHint: 2.5, signedOff: false },
  { id: 'hospitality',  name: 'Hospitality & retail',            ceiling: 4.5, floorHint: 1.8, signedOff: false },
  { id: 'facilities',   name: 'Facilities & recurring services', ceiling: 7.5, floorHint: 3.0, signedOff: false },
];

export const SECTORS_BY_ID = Object.fromEntries(SECTORS.map((s) => [s.id, s]));

export const ceilingFor = (sectorId) =>
  (SECTORS_BY_ID[sectorId] ?? SECTORS_BY_ID.generic).ceiling;

/**
 * Size premium. Scale is repriced by the market: a £5m-EBITDA group does not trade
 * at the same multiple as five £1m businesses. Used by the roll-up model, and as an
 * optional uplift in the audit for larger sellers.
 * Returns turns of multiple ADDED to the sector ceiling.
 */
export function sizePremium(ebitda) {
  if (ebitda >= 10_000_000) return 3.0;
  if (ebitda >= 5_000_000) return 2.0;
  if (ebitda >= 2_000_000) return 1.0;
  if (ebitda >= 1_000_000) return 0.5;
  return 0;
}
