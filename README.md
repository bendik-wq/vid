# Studio — Content & Hiring Operations

A single-page project management app for a social content team, styled after Apple's
design language: translucent materials, SF typography, springy motion, light + dark.

No build step, no dependencies — open `index.html`.

## What's in it

**Overview**
- Channel cards for **YouTube**, **Instagram**, and **X** with published post counts,
  goal progress bars, month-over-month delta, and last-post recency
- Quarter-goal progress ring across all channels
- Six-week stacked bar chart of posts published per channel
- Pipeline breakdown by status

**Board**
- Four columns: Ideas → In production → Review → Published
- Drag and drop between columns
- Filter by YouTube / Instagram / X / Hiring
- Add tasks via a bottom sheet; delete from the card

**KPIs**
- Twelve metrics across Audience, Content output, and Paid & pipeline
- 8-week sparkline per metric with target and trend direction

**Schedule**
- Weekly grid: YouTube / IG feed / IG stories / X / Ads / Webinar × Mon–Sun, today highlighted
- Daily story rhythm (3 per day: BTS → value → CTA) and the weekly operating rituals

**Ads**
- Campaign cards per platform with CPM / CTR / CPA / ROAS, spend pacing and state
- Launch checklist with persisted checkboxes

**Webinar**
- Live countdown to the next Thursday session
- Registration funnel, 8-step promo sequence (T−14 → T+3), and a 60-minute run of show

**Angles**
- Six content angles with the reasoning and the formats to ship them in
- Instagram data-source table — see [`docs/content-intel.md`](docs/content-intel.md)

**Hiring**
- Two open roles — **Sales Person** and **Content Manager**
- Candidate funnel per role (Applied → Screened → Interview → Offer)
- Compensation band and target start date

## Run it

```bash
git clone https://github.com/bendik-wq/vid.git
cd vid
python3 -m http.server 8000   # or: npx serve .
```

Then open http://localhost:8000. Opening `index.html` directly from disk works too.

## Files

| File | Purpose |
|---|---|
| `index.html` | Markup and inline SVG shell |
| `styles.css` | Design tokens, materials, layout, motion |
| `app.js` | State, rendering, drag & drop, persistence |
| `docs/content-intel.md` | Instagram API comparison, scraping pipeline, angle logic |

State persists to `localStorage` under `studio.state.v1`; the footer has a reset link.
Appearance follows the system setting and can be toggled in the top bar.
