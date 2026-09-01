/**
 * Industries.
 *
 * `ceiling` is what a well-run business in this industry gets on provable profit — not the
 * average, and not the best deal anyone ever did. Penalties come off it.
 *
 * INDICATIVE, NOT SOURCED. These ranges are working assumptions for the tool to run on.
 * They are all editable on the Tune screen, and none of them should be quoted to a seller
 * as a market figure until they have been replaced with real transaction data for the
 * verticals that actually matter to the business.
 */

export const SECTORS = [
  {
    id: 'trades',
    name: 'Trades and contracting',
    example: 'Electrical, plumbing, HVAC, roofing',
    low: 2.5, ceiling: 5.5, margin: 0.12,
    why: 'Lumpy project cash and owners who are still on the tools. Buyers pay for the recurring maintenance half, not the project half.',
    rollupFit: 5,
    rollupWhy: 'Fragmented, owner-aged, and the back office merges almost completely. The classic roll-up.',
    levers: ['backoffice', 'buying', 'premises', 'owner'],
    signedOff: false,
  },
  {
    id: 'healthcare',
    name: 'Healthcare and clinics',
    example: 'Physio, dental, veterinary, aesthetics',
    low: 4.0, ceiling: 8.0, margin: 0.2,
    why: 'Recurring patients, regulated entry, and demand that does not care about the economy. Buyers pay up for all three.',
    rollupFit: 5,
    rollupWhy: 'Group buying on consumables and one clinical admin function across every site.',
    levers: ['backoffice', 'buying', 'systems', 'owner'],
    signedOff: false,
  },
  {
    id: 'facilities',
    name: 'Facilities and recurring services',
    example: 'Cleaning, security, grounds, pest control',
    low: 3.5, ceiling: 7.5, margin: 0.14,
    why: 'Contracted, monthly, and boring in the best way. The nearest thing to subscription revenue outside software.',
    rollupFit: 5,
    rollupWhy: 'Routes and rounds overlap. Two contracts on one street cost barely more than one.',
    levers: ['backoffice', 'premises', 'owner', 'crosssell'],
    signedOff: false,
  },
  {
    id: 'proserv',
    name: 'Professional services',
    example: 'Accountancy, IT support, engineering consultancy',
    low: 3.0, ceiling: 6.5, margin: 0.22,
    why: 'The value walks out at six every evening. Priced on how much of the relationship is the firm rather than the founder.',
    rollupFit: 4,
    rollupWhy: 'Cross-sell is real, but the people have to want to be acquired.',
    levers: ['backoffice', 'crosssell', 'systems'],
    signedOff: false,
  },
  {
    id: 'software',
    name: 'Software and recurring technology',
    example: 'Vertical SaaS, managed IT, subscription platforms',
    low: 5.0, ceiling: 10.0, margin: 0.3,
    why: 'Contracted revenue that renews itself. The only category where buyers pay double digits without argument.',
    rollupFit: 4,
    rollupWhy: 'One platform, one support desk, and the customer lists sell to each other.',
    levers: ['backoffice', 'crosssell', 'systems', 'owner'],
    signedOff: false,
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing and engineering',
    example: 'Fabrication, precision machining, assembly',
    low: 3.0, ceiling: 6.0, margin: 0.13,
    why: 'Real assets underneath, but capex-hungry and exposed to a handful of large customers.',
    rollupFit: 3,
    rollupWhy: 'Capacity can be pooled, but plant does not move and neither do the skilled people.',
    levers: ['buying', 'premises', 'owner'],
    signedOff: false,
  },
  {
    id: 'logistics',
    name: 'Logistics and distribution',
    example: 'Haulage, courier, warehousing, wholesale',
    low: 3.0, ceiling: 6.0, margin: 0.09,
    why: 'Thin margins and fleet renewal that never stops. Density on the route is the whole game.',
    rollupFit: 4,
    rollupWhy: 'Overlapping routes and shared depots. Density is worth more than scale.',
    levers: ['backoffice', 'buying', 'premises'],
    signedOff: false,
  },
  {
    id: 'hospitality',
    name: 'Hospitality and retail',
    example: 'Restaurants, bars, independent retail',
    low: 2.0, ceiling: 4.5, margin: 0.1,
    why: 'Daily cash, but leases, staff churn and fashion risk. Buyers discount hard and rarely regret it.',
    rollupFit: 2,
    rollupWhy: 'Little merges. Each site is its own business with its own manager problem.',
    levers: ['buying', 'backoffice'],
    signedOff: false,
  },
  {
    id: 'construction',
    name: 'Construction and civils',
    example: 'Groundworks, fit-out, main contracting',
    low: 2.0, ceiling: 4.5, margin: 0.07,
    why: 'Contract risk, retentions and a working-capital cycle that eats the profit. Priced cautiously for good reason.',
    rollupFit: 2,
    rollupWhy: 'Bonding and retentions do not consolidate neatly. Scale adds risk as fast as it adds revenue.',
    levers: ['backoffice', 'buying'],
    signedOff: false,
  },
  {
    id: 'education',
    name: 'Education and training',
    example: 'Nurseries, training providers, tutoring',
    low: 3.5, ceiling: 7.0, margin: 0.18,
    why: 'Enrolment is recurring and often funded. Regulation raises the barrier for everyone including your buyer.',
    rollupFit: 4,
    rollupWhy: 'One curriculum, one compliance function, one admissions team across every site.',
    levers: ['backoffice', 'systems', 'owner'],
    signedOff: false,
  },
  {
    id: 'property',
    name: 'Property services',
    example: 'Lettings, block management, surveying',
    low: 4.0, ceiling: 7.5, margin: 0.25,
    why: 'Management fees recur for years and transfer cleanly. Priced close to the recurring-services band.',
    rollupFit: 5,
    rollupWhy: 'Portfolios stack. Doubling units under management barely changes the office.',
    levers: ['backoffice', 'systems', 'owner', 'crosssell'],
    signedOff: false,
  },
  {
    id: 'generic',
    name: 'Something else',
    example: 'Anything not listed',
    low: 3.0, ceiling: 7.0, margin: 0.15,
    why: 'A neutral middle. Pick the closest real industry if you can — the ceiling matters more than any single score.',
    rollupFit: 3,
    rollupWhy: 'Depends entirely on what it actually is.',
    levers: ['backoffice', 'buying'],
    signedOff: false,
  },
];

export const SECTORS_BY_ID = Object.fromEntries(SECTORS.map((s) => [s.id, s]));

/**
 * Size premium. Scale is repriced by the market: a group earning five million does not
 * trade where five businesses earning one million each trade. Turns of multiple ADDED.
 */
export function sizePremium(ebitda) {
  if (ebitda >= 10_000_000) return 3.0;
  if (ebitda >= 5_000_000) return 2.0;
  if (ebitda >= 2_000_000) return 1.0;
  if (ebitda >= 1_000_000) return 0.5;
  return 0;
}

/**
 * Why the group sells for more per pound than the businesses inside it: at each step up,
 * a different kind of buyer turns up. Bounds are numbers, not text, so they read in
 * whatever currency the tool is set to.
 */
export const SIZE_BANDS = [
  { from: 0, to: 1_000_000, premium: 0, who: 'Individual buyers and local trade' },
  { from: 1_000_000, to: 2_000_000, premium: 0.5, who: 'Regional acquirers' },
  { from: 2_000_000, to: 5_000_000, premium: 1.0, who: 'Lower mid-market private equity' },
  { from: 5_000_000, to: 10_000_000, premium: 2.0, who: 'Institutional buyers, and a real auction' },
  { from: 10_000_000, to: Infinity, premium: 3.0, who: 'Trade buyers and large funds' },
];

export const bandFor = (profit) =>
  SIZE_BANDS.find((b) => profit >= b.from && profit < b.to) ?? SIZE_BANDS[0];
