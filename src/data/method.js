/**
 * The method, organised the way the framework is.
 *
 * Every calculation in this tool belongs to one of the three questions, and saying which one
 * is not filing — it is the argument. A seller, a buyer and someone running a group are asked
 * the same three things in different voices, and each pillar owns the same machinery
 * whichever side of the table you are on.
 */

export const METHOD = {
  credibility: {
    idea:
      'Everything here is about whether a number survives contact with somebody else’s '
      + 'accountant. Nothing in this pillar touches the price — it moves the profit that the '
      + 'price is applied to, which is why it is always the bigger of the two cuts.',
    does: [
      { where: 'Your business', what: 'Cuts the claimed profit down to what can be proved, one line at a time.' },
      { where: 'Your business', what: 'Works out the cost of replacing you, rather than asking you to score it.' },
      { where: 'Your business', what: 'Ranks every answer by how much rides on it, so the next twelve months have an order.' },
      { where: 'The group', what: 'Prices each business you already own on its own cash, because a group average hides the bad ones.' },
      { where: 'Worked examples', what: 'Recomputes every example from the same engines, so a tuned number cannot leave a stale example behind.' },
    ],
    formulas: [
      {
        label: 'The profit cut',
        lines: [
          'your replacement’s wage, rent you charge yourself, one-offs,',
          'personal spending, kit you have put off buying',
          '',
          'each costs (5 − score) ÷ 4 of its own number',
          'the total is capped, then every line is rescaled to fit',
        ],
      },
      {
        label: 'Your replacement, worked out rather than scored',
        lines: [
          'cut = what it costs to replace you',
          '    − any of your pay still shown as a cost',
        ],
      },
    ],
    assumptions: [
      { status: 'working', text: 'What each answer is worth. Calibrated as a set against the worked example, not one at a time against real deals.' },
      { status: 'fixed', text: 'The scoring arithmetic. Five costs nothing, one costs the lot, three costs half.' },
    ],
  },

  capital: {
    idea:
      'One question, asked of every number in the tool: can the cash carry it? It is the only '
      + 'gate that is never scored, because it is the one people most want to argue with — and '
      + 'it is the same test whether you are pricing an exit, funding an acquisition, or trying '
      + 'to rescue a group that is already too heavy.',
    does: [
      { where: 'Your business', what: 'Tests whether anyone could make the repayments at the price you are asking.' },
      { where: 'Your business', what: 'Reports which ceiling binds — what the business is worth, or what a buyer can carry.' },
      { where: 'One deal', what: 'Builds a stack from four kinds of outside money plus your own, with every term, and finds the tightest year.' },
      { where: 'One deal', what: 'Separates a lump falling due from the payments leading up to it.' },
      { where: 'The group', what: 'Answers what your own cash actually buys, which turns out to be barely anything.' },
      { where: 'Restructure', what: 'Prices six ways out of a group that cannot carry what it owes.' },
    ],
    formulas: [
      {
        label: 'Whether it can be paid for',
        lines: [
          'cash        = (provable profit − kit) × (1 − tax)',
          'repayments  = every tranche, stepped month by month',
          'cover       = cash ÷ repayments',
          'max payable = cash ÷ (floor × repayments per £1 of price)',
        ],
      },
      {
        label: 'Why the size of the business cancels out',
        lines: [
          'cash and repayments both scale with the deal, so',
          'what is left is a maximum PRICE per pound of profit —',
          'and your bank balance is not in that calculation at all',
        ],
      },
    ],
    assumptions: [
      { status: 'fixed', text: 'Cover is arithmetic. So is the price that clears it, and the lump that a term shorter than the amortisation leaves behind.' },
      { status: 'fixed', text: 'Tax comes off profit less kit rather than off taxable profit after interest. Deliberately cautious, and said here rather than buried.' },
      { status: 'working', text: 'The cover floor itself. 1.5 is what lenders ask for; move it on the Tune screen and everything downstream moves.' },
    ],
  },

  closing: {
    idea:
      'The pillar that decides whether any of the rest happens. On a sale it is everything that '
      + 'kills a deal between a handshake and completion. On a purchase it is whether the thing '
      + 'you bought actually joins the thing you had — which is a different question from whether '
      + 'you could afford it.',
    does: [
      { where: 'Your business', what: 'Prices the completion risks: dependency, concentration, assignability, licences, people.' },
      { where: 'The group', what: 'Names which savings genuinely apply across two industries, and which you would be claiming without a reason.' },
      { where: 'The group', what: 'Turns savings from a percentage you assume into a list of things you do.' },
      { where: 'One deal', what: 'Splits the exit between whoever owns the equity, not whoever lent the money.' },
      { where: 'The difference', what: 'Stops buying whenever another deal would break cover, and again at what one group can absorb.' },
    ],
    formulas: [
      {
        label: 'The price cut',
        lines: [
          'how much depends on you, how solid the revenue is,',
          'how the cash arrives, who runs it, who the customers are',
          '',
          'each costs (5 − score) ÷ 4 of its own turns',
          'and the result never falls below the floor',
        ],
      },
      {
        label: 'What the group is worth',
        lines: [
          'price per pound = the average of its industries,',
          '                  weighted by where the profit comes from,',
          '                  plus a premium for size',
          'worth           = profit × price per pound − what is still owed',
        ],
      },
    ],
    assumptions: [
      { status: 'working', text: 'What a good business in each industry sells for. Indicative ranges, not transaction data.' },
      { status: 'working', text: 'The size premium. Right direction, unverified size.' },
      { status: 'working', text: 'How much each thing you merge is worth, and how long it takes.' },
    ],
  },
};

/** The three voices the same question gets asked in, depending on which side you are on. */
export const VOICES = [
  { id: 'sellSide', name: 'Selling one' },
  { id: 'buySide', name: 'Buying one' },
  { id: 'groupSide', name: 'Running several' },
];
