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

## Three screens

| Screen | The pain it lands |
|---|---|
| **Your business** | *It is not worth what you think.* Two numbers in, and the gap is the first thing you see. Both cuts drawn as bridges, the loan-cover gate, the three questions to score, and what fixing each is worth |
| **The group** | *Selling one is the small game.* A drag-and-drop group canvas, the four deal structures, what you actually merge, and what your cash really buys |
| **The difference** | Twenty years, two roads, on a scrubber you can play |
| **Tune** | Every number editable in place beside its justification |
| **Method** | Formulas, assumptions, and what is not signed off |

## The situations people arrive with

The tool opens on six of them rather than a blank form, each in the owner's own words, each
routed to the screen that answers it:

| They say | The pain |
|---|---|
| I want out, and I have a number in mind | The number and the business are not the same size |
| I have bought a dozen, some fly and some are dead weight | Nobody screened them the same way, so the good ones carry the bad |
| I would buy, but I do not have the money | Cash was never the thing stopping you |
| I own fifty million of sites, I never ran a coverage ratio | You test whether a deal pays for itself before you sign, not after |
| Twelve million of revenue, I want to grow by buying | You have a platform and do not know what it can carry |
| I do electrical, I want to buy a roofing company | Next door only counts if the same things actually merge |

Each seeds a case with figures close enough to the real thing that the first screen says
something true, and every number is meant to be typed over.

## What you would have to become

The sharpest answer in the tool, and the one for anyone whose number is bigger than his
business. It solves backwards: the smallest profit that, at the price per pound its own size
earns, is worth the number he has in mind — then how many businesses that is and how long it
takes. Because the price per pound steps up with scale, the answer is usually not "earn more"
but "move up a bracket": on the worked meat exporter, $15m needs $2.14m of profit rather than
$1.08m, and at that size the bidders stop being regional acquirers and start being lower
mid-market private equity, paying 7.0x rather than 3.7x. Same trade, different room.

## Which ones are carrying the rest

For anyone who has already bought several. The group average hides the problem, so each
business is priced on its own cash, ranked worst cover first, with the price it should have
been bought at beside the price it was. The drag is costed: what the same group would be worth
if the failing deals had been bought at what they could carry.

## Does it actually merge?

An electrician buying a roofer is either one office, one yard and one customer list, or two
companies with a shared owner. Adding a business from a different industry now names which
savings genuinely apply to both — and which you would be claiming without a reason.

## Cases

Everything you enter belongs to a named case — one per business you look at. Start as many as
you like, switch between them from the chip in the top bar, and each keeps its own audit,
group and projection. They persist locally, so a case is still there tomorrow.

A case saves to a file and opens from one, which is how you hand a client's numbers to a
colleague. Anything that is not a case file is refused rather than half-loaded.

## The difference, played

The payoff screen is the one place worth animating: two roads only feel different when you
watch them separate. Press play and twenty years run in about six seconds — both figures count,
businesses pop in as they are bought, the chart draws itself, and a multiplier badge says how
many times bigger the group ended up. Or drag the year and read any point on the way.

Mechanically it is one chart drawn once and revealed by widening a clip rectangle, so a scrub
costs a handful of attribute writes rather than a re-render. Values interpolate between years so
scrubbing reads as continuous. `prefers-reduced-motion` skips straight to year twenty, and
playback is cancelled the moment you leave the screen.

## What moves the number most

A tornado on the business screen: every question drawn worst-answer to best, with where the
business sits today down the middle, sorted by how much is at stake. The longest bar is where
the next twelve months should go — it answers "what do I actually fix" without anyone having to
read a table.

## Seeing a structure, not just a ratio

Open any business in the group and you get its funding stack — your cash, the bank, and what
stays with the seller, as one bar — and its first six years drawn as cash against repayments.
The payment holiday is the whole reason these structures work and it is invisible in a single
cover ratio; you have to see the year with almost no bar beside it.

## The group canvas

Your business sits in the middle; everything you buy hangs off it. Tap an industry to add a
business — it takes its place on the web automatically — then drag it anywhere. Tap one to open
it and set what it earns, what you pay, how you fund it, and what you merge. Positions are
stored as fractions of the box, so the web survives a resize.

## Restructuring what you already own

The third of the original brief, and the one the tool was thinnest on. Most people arrive
having bought well and structured badly — full price on bank terms, no holiday, everything
amortising at once. Nothing about those businesses has to change for the group to become
serviceable again. The debt does.

Six levers, each with its own terms, each priced on its own and in combination:

| Lever | What it really does |
|---|---|
| Go back to the sellers | Ask everyone who left money in to take a lower rate |
| Give it longer to pay | The same money spread thinner — more interest, and the room to keep trading |
| Interest only for a while | The strongest single lever, and the one that leaves the whole balance standing |
| Refinance the lot | One rate, one term, one lender, now the group is big enough to be interesting |
| Sell the worst one | It takes its profit with it, but it takes more of its debt |
| Put money in | The only lever that costs you cash, and it is here to show how little it buys |

They run cheapest first, and the screen draws a **waterfall of cover** from where it is to
where it ends, with the floor across it, so which lever did the work is visible rather than
bundled into one refinanced number. On the worked forecourt portfolio: cover 1.30x against a
1.50x floor, and interest-only alone takes it to 3.44x — while injecting $250,000 of your own
money moves it to 1.32x. That comparison is the whole argument for structure over capital,
computed rather than asserted.

## Worked examples

Six of them, all the way through, at a size you can present from — computed by the same engines
as everything else, so tuning an assumption moves the examples with it. Each shows what they
walked in with, the one thing that changes, what it becomes, and the lesson:

| | They walked in with | It becomes |
|---|---|---|
| Wants $15m for a $1.5m-profit exporter | $4.0m at 3.72x, sold to regional acquirers | $15m at 7.00x, sold to lower mid-market private equity |
| Bought a dozen, some are dead weight | 5 of 6 cannot pay for themselves, $1.07m overpaid | All 6 covering, group worth $0.9m more |
| Thinks he needs money to buy | $653k of cash to buy one like his | Nothing, and the terms are the real lever |
| $50m of sites, never ran cover | 1.30x cover, $3.60m of repayments | 1.90x cover, $1.13m a year saved, no cash in |
| $12m telecom wanting to grow | One business, $21m in ten years | Eleven businesses, $77m |
| Electrician buying a roofer | Two companies with a shared owner | Four things that genuinely merge |

## Structuring one deal yourself

The presets cover the common shapes; the **One deal** screen is for when the shape is yours.
Five places the money can come from, with every term that actually changes the answer:

| Source | Kind | Terms you set |
|---|---|---|
| Your own money | equity | Amount, and the share of the business it buys |
| Seller finance | debt | Amount, rate, when it is due, what it is paid down over, when the first payment starts, whether interest builds during the holiday |
| Seller rollover | equity | Amount, and the share he keeps |
| Commercial debt | debt | Same full set as seller finance |
| Investor capital | equity | Amount, share taken, and a preferred return if one was agreed |

Four ways to repay a tranche: **over the term** (nothing left at the end), **part repaid with a
lump** (payments sized over a longer period than the term — the structure most vendor finance
actually uses), **interest only** (the whole amount due at the end), and **nothing until the
end** (interest rolls up and the lot falls due at once).

Every tranche gets a real month-by-month schedule rather than one average payment, because the
details are the difference between a deal that funds itself and one that strangles you in year
two — and an average hides all of them. The screen reports the **tightest year**, which after a
payment holiday is almost never year one, and draws what is owed each year against what the
business earns, with any lump standing on top of the payments in its own colour.

It also splits the exit. The lenders are paid what is still owing; what is left goes to
whoever owns the equity, which is not the same people who lent you the money. On a stack with
none of your own cash in it, that line reads: you put in nothing, and you walk away with the
majority of it.

## The deal structures

Four, straight from the framework. Three need none of the buyer's money:

| Structure | Plain English | Cash needed |
|---|---|---|
| **Seller pays himself out** | The seller lends you the whole price, unsecured, with a 9-month payment holiday | None |
| **Bank and seller together** | 60% commercial debt, 40% left in by the seller as rollover | None |
| **The business pays the bills** | Price financed, and a working-capital line drawn at completion covers the fees | None — you finish with more cash than you started |
| **Put money down** | 20% deposit, the way most people assume it has to work | 20% of the price |

## What your money actually buys

The surprising answer, and the tool computes it rather than asserting it: **cash flow and debt
service both scale with the deal, so the size of the business cancels out.** What is left is a
maximum *price per pound of profit*. On the framework's own terms — 1.5x cover, a 6-year seller
note at 4% — that ceiling is about **2.4x profit**. Your cash does not appear in that calculation
at all; three of the four structures never touch it.

Which is why the same screen has one button that changes everything: ask every seller for
interest only, with the lump at the end. Nothing about any business changes. Only the terms do,
and deals that could not cover themselves suddenly can.

## The method is the framework

The Method screen is organised by the three questions rather than by mechanism, because that
is the argument rather than the filing. It opens with the one diagram that explains why the
three are not three of the same thing:

**Credibility sets the profit. Closing sets the price per pound. Those two multiply.
Capital is not a third multiplier — it is a gate on the answer.** Which is why a business can
be worth a number nobody is able to pay, and why the answer to that is a different structure
rather than a lower price.

Each pillar then states what it computes and on which screen, the arithmetic behind it, and
what in that pillar is settled versus a working assumption. Capital is the only one carrying
"settled" claims — cover is arithmetic — while everything in Closing is still an assumption,
which is exactly where the review effort belongs.

The same three questions get asked in three voices, which is why one tool serves a seller, a
buyer and someone running a group:

| | Selling one | Buying one | Running several |
|---|---|---|---|
| **Credibility** | Can your numbers be believed? | Can you be believed? | Can the group's numbers be believed? |
| **Capital** | Can anyone afford to pay it? | Can you fund it? | Can the group carry what it owes? |
| **Closing** | Can your deal complete? | Can you complete? | Does it hold together once it has? |

## The pillars compound

Value is earnings times multiple, so a pillar that lifts the earnings base and a pillar that
lifts the multiple multiply when fixed together. Fixing all three is worth **more** than the
three individual figures added up — on the broker case, $3.51m against $2.87m summed. The
tool reports each pillar's marginal uplift and computes the programme total directly, because
no honest per-pillar share of the total exists: the interaction belongs to no single pillar.

## Plain language

No EBITDA, no DSCR, no multiple arbitrage anywhere a client can see — provable profit, loan
cover, what buyers pay. A test fails the build if that jargon reappears on the main screen.

## Integration

Savings are not a percentage you assume, they are a list of things you do: one back office, group
buying, shared premises, the owner's wage, cross-selling, one system. Each is worth a stated share
of the acquired business's profit, and each has a time and a difficulty. Tick them on a business
and its contribution changes immediately — the most you can take out is 30%.

## Tuning

Every judgement call lives in `src/data/config.js` and is editable on the Tune screen: the
DSCR floor, the multiple floor, the combined haircut cap, all nine sector ceilings, and the
delta on each of the eighteen self-scored criteria. Overrides persist locally, are stamped
into the exported report, and reset individually or all at once. The criteria themselves are
not editable — the criteria are uncontroversial, the numbers are the risk.

## Running it

```bash
npm test        # engine + view tests
npm run dev     # http://localhost:5173
npm run build   # dist/exit-audit.html (Artifact fragment) + dist/site/index.html (standalone page)
npm run calibrate
npm run smoke   # browser test against the built bundle (needs dev server + Chromium)
```

`npm run build` emits two things from the same bundle. The Artifact viewer supplies its own
doctype, head and reset, so what it wants is a fragment; anywhere else needs a whole document
or the browser guesses at the encoding.

## Where it is published

- **Live:** <https://bendik-wq.github.io/vid/exit-audit/> — served from the `exit-audit/` folder
  on the `gh-pages` branch, so the site already at the root of that branch is untouched.
- To update it: `npm run build`, then copy `dist/site/index.html` to `exit-audit/index.html` on
  `gh-pages` and push. Pages takes a minute or two to rebuild.

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
