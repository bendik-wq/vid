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

State persists to `localStorage` under `studio.state.v1`; the footer has a reset link.
Appearance follows the system setting and can be toggled in the top bar.
