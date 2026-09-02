/**
 * The situations people actually walk in with.
 *
 * Each one is a real pain, in the owner's own words, with figures close enough to the real
 * thing that the tool says something true the moment it opens. They are starting points, not
 * claims about anyone in particular — every number is meant to be typed over.
 */

const node = (id, industryId, ebitda, multiple, structureId, levers, interestOnly = false) =>
  ({ id, industryId, ebitda, multiple, structureId, levers, interestOnly });

const evenScores = (over = {}) => ({ ...over });

export const SCENARIOS = [
  {
    id: 'exit',
    voice: 'I want out, and I have a number in mind.',
    pain: 'The number and the business are not the same size.',
    detail:
      'Thirty million of sales, a million and a half of profit, and fifteen million in mind. ' +
      'At this size that number is not reachable — but it is reachable at a size you could get to.',
    goto: 'business',
    audit: {
      business: { name: 'Meat exporter', sector: 'manufacturing' },
      askingPrice: 15_000_000,
      financials: {
        revenue: 30_000_000, claimedEbitda: 1_500_000,
        ownerSalaryDrawn: 220_000, ownerSalaryAddedBack: 220_000, ownerReplacementCost: 200_000,
        maintenanceCapex: 260_000, taxRate: 0.25,
      },
      scores: { C2: 4, C3: 3, C4: 3, C5: 3, C6: 4, C7: 2, C9: 3, C10: 2, C11: 3, C12: 2, C13: 4, C14: 2, C15: 3, C16: 3, C17: 4, C18: 3, C19: 3, C20: 3 },
    },
  },
  {
    id: 'serial',
    voice: 'I have bought a dozen. Some fly, some are dead weight.',
    pain: 'Nobody screened them the same way, so the good ones are carrying the bad.',
    detail:
      'Averages hide it. Priced one at a time on their own cash, it is usually two or three ' +
      'that are eating what the rest earn.',
    goto: 'build',
    audit: {
      business: { name: 'Services group', sector: 'facilities' },
      askingPrice: 0,
      financials: {
        revenue: 14_000_000, claimedEbitda: 2_000_000,
        ownerSalaryDrawn: 250_000, ownerSalaryAddedBack: 0, ownerReplacementCost: 250_000,
        maintenanceCapex: 180_000, taxRate: 0.25,
      },
      scores: evenScores({ C7: 4, C15: 4 }),
    },
    group: {
      nodes: [
        node(1, 'facilities', 320_000, 3.5, 'vendor', ['backoffice', 'premises', 'owner']),
        node(2, 'facilities', 180_000, 5.5, 'deposit', ['backoffice']),
        node(3, 'trades', 260_000, 2.5, 'blend', ['backoffice', 'buying', 'premises', 'owner']),
        node(4, 'hospitality', 140_000, 4.5, 'deposit', ['buying']),
        node(5, 'proserv', 300_000, 3.0, 'vendor', ['backoffice', 'crosssell', 'systems']),
        node(6, 'logistics', 220_000, 3.0, 'wcline', ['backoffice', 'buying', 'premises']),
      ],
      nextId: 7,
    },
  },
  {
    id: 'capital',
    voice: 'I would buy, but I do not have the money.',
    pain: 'Cash was never the thing stopping you.',
    detail:
      'Seven million of turnover and a good profit, sitting still because of a belief about ' +
      'deposits. Three of the four ways to buy a business need none of your money.',
    goto: 'build',
    audit: {
      business: { name: 'Music group', sector: 'proserv' },
      askingPrice: 0,
      financials: {
        revenue: 7_000_000, claimedEbitda: 1_400_000,
        ownerSalaryDrawn: 200_000, ownerSalaryAddedBack: 100_000, ownerReplacementCost: 180_000,
        maintenanceCapex: 90_000, taxRate: 0.25,
      },
      scores: evenScores({ C7: 2, C11: 4, C15: 3 }),
    },
    capital: { cash: 0, industryId: 'proserv', stretch: false },
  },
  {
    id: 'cover',
    voice: 'I own fifty million of sites. I never ran a coverage ratio.',
    pain: 'You find out whether a deal pays for itself before you sign it, not after.',
    detail:
      'Bought at full price on bank debt, with no test of whether the cash covered the ' +
      'repayments. Priced properly, most of them do not.',
    goto: 'build',
    audit: {
      business: { name: 'Forecourt portfolio', sector: 'hospitality' },
      askingPrice: 0,
      financials: {
        revenue: 50_000_000, claimedEbitda: 3_500_000,
        ownerSalaryDrawn: 300_000, ownerSalaryAddedBack: 300_000, ownerReplacementCost: 280_000,
        maintenanceCapex: 700_000, taxRate: 0.25,
      },
      scores: evenScores({ C5: 2, C9: 5, C10: 4, C13: 2 }),
    },
    group: {
      nodes: [
        node(1, 'hospitality', 420_000, 5.0, 'deposit', ['buying', 'backoffice']),
        node(2, 'hospitality', 380_000, 5.5, 'deposit', ['buying']),
        node(3, 'hospitality', 300_000, 4.8, 'deposit', ['buying', 'backoffice']),
        node(4, 'hospitality', 260_000, 5.2, 'deposit', ['buying']),
      ],
      nextId: 5,
    },
  },
  {
    id: 'expand',
    voice: 'Twelve million of revenue. I want to grow by buying.',
    pain: 'You have a platform. You do not know what it can carry.',
    detail:
      'An established business is the strongest position anyone can buy from — its profit is ' +
      'what covers the first few deals until they cover themselves.',
    goto: 'build',
    audit: {
      business: { name: 'Telecom operator', sector: 'facilities' },
      askingPrice: 0,
      financials: {
        revenue: 12_000_000, claimedEbitda: 2_200_000,
        ownerSalaryDrawn: 260_000, ownerSalaryAddedBack: 0, ownerReplacementCost: 240_000,
        maintenanceCapex: 400_000, taxRate: 0.25,
      },
      scores: evenScores({ C11: 5, C15: 4, C14: 2 }),
    },
    future: { dealsPerYear: 2, avgDealProfit: 400_000, maxBusinesses: 10, structureId: 'blend', synergyRate: 0.15, advisoryCost: 75_000 },
  },
  {
    id: 'adjacent',
    voice: 'I do electrical. I want to buy a roofing company.',
    pain: 'Next door only counts if the same things actually merge.',
    detail:
      'One office, one yard, one set of vans and a customer list that buys both — or two ' +
      'companies with a shared owner. The difference decides whether the savings are real.',
    goto: 'build',
    audit: {
      business: { name: 'Electrical contractor', sector: 'trades' },
      askingPrice: 0,
      financials: {
        revenue: 5_500_000, claimedEbitda: 700_000,
        ownerSalaryDrawn: 150_000, ownerSalaryAddedBack: 150_000, ownerReplacementCost: 160_000,
        maintenanceCapex: 120_000, taxRate: 0.25,
      },
      scores: evenScores({ C7: 2, C15: 2, C9: 2 }),
    },
    group: {
      nodes: [node(1, 'trades', 240_000, 2.5, 'vendor', ['backoffice', 'buying', 'premises', 'owner'])],
      nextId: 2,
    },
  },
];

export const SCENARIOS_BY_ID = Object.fromEntries(SCENARIOS.map((s) => [s.id, s]));
