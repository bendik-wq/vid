# Exit Audit

An interactive platform for pre-exit audits, restructure planning, and roll-up modelling,
built on the 3C framework recast for the sell side.

Josh teaches 3C to buyers. This points the same three questions at the owner of the business —
and, specifically, points his broker critique at the seller. His argument, his voice, his numbers,
turned around.

> "A lot of times sellers haven't set up properly to maximise the value they get when they exit."

## The 3C recast

| | Buy-side (as taught) | Sell-side (this tool) |
|---|---|---|
| **Credibility** | Can *you* be believed? | Can your *numbers* be believed? Do statements match returns? Do the add-backs survive a QoE? |
| **Capital** | Can you fund it? | **Is your asking price financeable?** Could any buyer service debt on it at 1.5x DSCR? |
| **Closing** | Can you complete? | Can *your* deal complete? Tie-in, concentration, assignability, licences, staff. |

## The engine — two haircuts, not one

```
Haircut 1 — EBITDA:   claimed EBITDA → defensible EBITDA
  owner replacement cost, related-party rent, one-off add-backs,
  personal expenses, unrecorded maintenance capex     (combined cap 50%)

Haircut 2 — MULTIPLE: premium ceiling → achievable multiple
  owner dependency, revenue quality, cash rhythm, management depth,
  concentration, assignability                        (floor 2.00x)

value = defensible EBITDA × achievable multiple
gap   = asking price − value
```

Two of the twenty criteria are **computed, not self-scored** — the owner salary add-back and
DSCR — because those are the two a seller most wants to argue with. Everything else is scored
1–5 against written anchors, and each score applies its delta proportionally: `(5 − score) ÷ 4`.

### The DSCR gate

The seller types what they want for the business. The tool computes the debt service a buyer
would face at that price and divides free cash flow by it:

> *Your asking price implies a 0.42x DSCR. The floor is 1.50x. No bank funds this. No
> seller-financed buyer survives it. Your price isn't high — it's unfundable.*

Pure arithmetic on their own inputs, and it hands over the mandate pitch: **that's a structure
problem, not a price problem.** The tool then reports which of two ceilings actually binds —
quality (what the business is worth) or fundability (what a buyer can service) — because the
answer decides which conversation you are having.

## Calibration

The engine was built from the criteria bank, not fitted to a target. Run `npm run calibrate`
to reproduce the check against the broker case Josh describes on camera — $3m revenue, a claimed
$1m EBITDA, a $250k owner salary added back while the owner works the business daily:

| | |
|---|---|
| Claimed EBITDA | $1,000,000 |
| Total haircut | 47.8% |
| **Defensible EBITDA** | **$522,500** |
| Josh, off the cuff, same business | $500,000 |
| **Variance** | **4.5%** |
| Achievable multiple | 3.34x |
| What he'd actually get | $1,743,844 |
| What a buyer could fund at 1.5x DSCR | $1,391,961 |
| What he thinks he's getting | $5,000,000 |
| **The gap** | **$3,256,156** |

The $5m ask implies **9.57x** defensible EBITDA. Not ambitious — delusional. That is the audit's
value proposition in one number.

## Screens

| Screen | What it does |
|---|---|
| **Audit** | Your asking price, your earnings, then the three C's as an accordion — one pillar open at a time, live valuation docked at the bottom |
| **Value** | The gap as one figure, both haircuts drawn as bridges, the DSCR gate, which ceiling binds, and what each C is worth on its own |
| **Plan** | Every fix priced and sequenced by value per month of effort; today / 12mo / 24mo trajectory |
| **Roll-up** | Multiple arbitrage: platform plus bolt-ons, per-deal and group DSCR, cash-constrained deleveraging, equity return |
| **Tune** | Every delta, sector ceiling and bound editable in place, each beside its "why this number" justification. Changes flow through the audit, the plan and the roll-up at once |
| **Method** | Formulas, assumptions, and an explicit list of what is not signed off |

## The pillars compound

Value is earnings times multiple, so a pillar that lifts the earnings base and a pillar that
lifts the multiple multiply when fixed together. Fixing all three is worth **more** than the
three individual figures added up — on the broker case, $3.51m against $2.87m summed. The
tool reports each pillar's marginal uplift and computes the programme total directly, because
no honest per-pillar share of the total exists: the interaction belongs to no single pillar.

## Tuning

Every judgement call lives in `src/data/config.js` and is editable on the Tune screen: the
DSCR floor, the multiple floor, the combined haircut cap, all nine sector ceilings, and the
delta on each of the eighteen self-scored criteria. Overrides persist locally, are stamped
into the exported report, and reset individually or all at once. The criteria themselves are
not editable — the criteria are uncontroversial, the numbers are the risk.

## Running it

```bash
npm test        # engine + view tests (22)
npm run dev     # http://localhost:5173
npm run build   # dist/exit-audit.html — one self-contained file
npm run calibrate
npm run smoke   # browser smoke test against the built bundle (needs dev server + Chromium)
```

No build step is required for development; the app is plain ES modules. `npm run build` exists
only to produce a single distributable HTML file — it strips the import/export keywords and
concatenates in dependency order, and fails loudly on a duplicate top-level name.

## Design

One typeface across the whole interface, and hue reserved entirely for data: each pillar owns
a colour (Credibility blue, Capital orange, Closing aqua) that follows it everywhere, status
owns red/green/amber, and every button and tab is ink on paper so nothing competes with the
figures. The categorical steps come from a validated palette — the three pillar hues clear
the colourblind-separation and normal-vision floors on all pairs in both light and dark.

## Open items

**Deltas need sign-off.** The criteria are uncontroversial; the numbers are the risk. If a delta
cannot be justified on a call, the tool becomes a liability the first time a seller quotes it
back. Every row in the criteria bank carries its justification so review is agreeing or
disagreeing with a stated position, not with a black box. The set is calibrated against the
broker case; individual deltas are not validated against completed transactions.

**Sector ceilings are placeholders.** A physio clinic and an electrical contractor do not share a
premium multiple. `src/data/sectors.js` keys the ceiling off the sector chosen at intake, but
every entry is marked `signedOff: false` and needs real ranges for the core verticals rather than
figures pulled off the internet.

**Size premium is directional.** Step function by EBITDA scale; magnitudes unverified.

## A naming discrepancy worth fixing at source

The `3c-acquisition-model` skill defines **C1 as "Capabilities"**. Josh says, on camera, twice,
that the three C's are **credibility, capital, and closing**. This platform uses *Credibility*
throughout, matching the founder's live teaching. The skill file itself is synced from outside
this repository and has not been changed here — it should be corrected at its source, or every
future tool built from it will inherit the same incongruency.
