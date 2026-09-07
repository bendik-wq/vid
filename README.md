# G&L Ops — Bendik & Josh

The operating system for the week: one constraint, four lead sources, a reel quota,
a Thursday webinar, two hires, and a change log that never forgets who moved what.

No build step, no dependencies, no server. Open `index.html`.

**Live:** https://bendik-wq.github.io/vid/studio/

---

## The frameworks it encodes

## Who does what

| | Bendik | Josh |
|---|---|---|
| Owns | Systems, funnels, paid, data | Content, sales, closing |
| Day | Build 09–15, no calls | Film 09–11, calls 12–18 |
| Never | Takes a sales call | Touches the backend |

## The $150k/month model

Scale opens with the target and works backwards. Every number is click-to-edit and every edit
is logged.

At the target rates — 15% booking, 70% show, 20% close, $9,500 price — $150k/month is
**15.8 sales**, **79 calls held**, **113 booked**, and **752 leads**. That is only **1.2× the
current lead flow**: the gap is conversion, not volume. The app names the constraint by
comparing each rate to what the target needs; today that is **close rate at 55%**, and fixing
it alone is worth ~$38k/month without a single extra lead.

That target then drives everything else: the four lead sources get weekly lead targets split
from the required volume, and the daily engine turns the monthly figure into today's numbers —
Josh: 4 reels, 100 outreach touches (Rule of 100), 4 calls held; Bendik: the daily ad spend the
lead target implies, one funnel fix shipped, zero sales calls.

**Unit economics** carry the two rules that decide whether you may scale spend: LTGP:CAC at or
above 3:1, and the first payment covering CAC inside 30 days so each sale funds the next.

**Hormozi**
- **One constraint a week**, stated at the top of Overview and editable in place. Everything
  else either relieves it or waits.
- **Four lead sources** — warm outreach, free content, cold outreach, paid ads — each with an
  owner and a weekly target. If a source has no owner, it does not happen.
- **The reverse funnel**: leads → booked → held → sales → cash, with the constraint named
  automatically as whichever rate is furthest below target.
- **More, better, new** — fix conversion on the traffic you have before buying more of it.
- **Value equation**: (Dream × Likelihood) ÷ (Time × Effort), scored 1–10 per lever, live score.
- **Repurpose ladder**: one pillar a week → 20 reels, 3 threads, 3 emails, the webinar teach
  block, and next Monday's ad creative.
- **Webinar run of show** built on the $100M Leads structure: promise → why the usual route
  fails → teach → case study → transition → offer → Q&A that closes.

**Nothing is pre-assigned.** Every task, lead source, checklist line, commitment and hiring
slot starts unassigned. Click the dashed avatar to cycle it — Unassigned → Bendik → Josh →
Unassigned — and the assignment lands in the log. The two profiles on Team are blank until you
write them.

## Calendar

Recurring commitments you define yourself: what, which track, weekly / weekdays / daily, and a
time. Each one shows its streak, its next occurrence, and the last eight times it was due —
click a date to mark it done. They render into the week grid. A webinar is just one of these.

## Topics

A hook generator for reels, Shorts and YouTube, built entirely from the ICP cards below it —
their pains, desires, objections and triggers. Edit any ICP line and the output changes; every
edit is logged. Generate ten at a time, save the good ones, or send one straight to the board as
a content task. No two ideas in a batch repeat a template.

**Haynes**
- **Operator audit** — the firefighting → operating checklist. Lead flow that does not depend on
  either of you posting manually; AI/automation pointed at a named bottleneck, not novelty.
- **Partner webinars** — trust transfer, not cold outreach. A pipeline of partner lists with
  audience size, status and owner.

## Daily output

Each person has their own unit and their own quota — Bendik posts **tweets**, Josh posts
**reels** — and both the unit and the number are editable in place on Overview. Tap the blocks
to log today; Content keeps a 14-day heat log. **Posts / week is derived from that log** — it
counts the last seven days across both of you against the sum of the two quotas. It is the one
KPI you cannot type a number into.

## Every change is marked, locally

There is one mutation path in the code. Nothing changes state except through `change()`, which
records who did it, what changed, and the previous value.

- **Who** — the top bar sets who is acting. Switch it and the handover is logged too.
- **Activity** — the full log, filterable by person, with before → after on every entry.
- **Unreviewed badge** — the nav counts changes since you last hit *Mark all reviewed*.
- **Undo last** — steps back through the last 25 changes.
- **Export log** — copies the whole history as TSV for a spreadsheet.

### Storage, honestly

`localStorage` is per browser, per device. **Two people on two machines get two separate
datasets and two separate logs** — the identity switcher only labels who made a change on the
device it was made on. Nothing syncs, because nothing leaves the browser.

To move data across, Activity has **Export data** (downloads the whole state as JSON) and
**Import data** (replaces this device's state with a file, previous state kept in the undo
stack). That is a hand-off, not a merge: the newer file wins. For genuinely shared state, this
needs a backend — see the note at the top of `docs/` or ask.

## Sections

| View | What it holds |
|---|---|
| Overview | Constraint, today's reel quota, six weekly KPIs, owner load, latest changes |
| Scale | $150k model, reverse funnel, daily engine, unit economics, four lead sources, four growth levers, value equation, operator audit |
| Content | 14-day reel log, weekly schedule, repurpose ladder, angles |
| Calendar | Recurring commitments you create, each with a streak, plus the week they fall into |
| Topics | Reel / Short / YouTube hook generator built from your ICPs |
| Team | Us two, open roles with what each hire buys back, delegation ladder |
| Board | This week / Doing / Review / Done, drag between columns, click an avatar to reassign |
| Activity | The change log |

## Run it

```bash
python3 -m http.server 8000   # or: npx serve .
```

## Files

| File | Purpose |
|---|---|
| `index.html` | Markup |
| `styles.css` | Design tokens, layout, motion |
| `app.js` | State, the single `change()` mutation path, rendering |
| `docs/content-intel.md` | Instagram API comparison and the angle-scoring pipeline |
