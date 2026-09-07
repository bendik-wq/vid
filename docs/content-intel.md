# Instagram data sources & content angles

Two halves: where to get the data, and what to do with it. Verified September 2026 —
API terms and pricing move fast, so re-check before you commit budget.

---

## 1. Official Meta APIs — free, permissioned, safe

Use these as the backbone. They're free, they don't breach anyone's terms, and they're the only
route to publishing.

| Endpoint | What it gives you | Limits |
|---|---|---|
| **Business Discovery** | Public follower count, media, captions, likes/comments for *any* Business or Creator account — no permission from them | Platform rate limits per app/user, rolling 24h |
| **Hashtag Search** | Top + recent media for a hashtag | **30 unique hashtags per rolling 7 days** per IG account; re-querying one already in the window is free |
| **Content Publishing** | Schedule and publish feed posts, reels and **stories** from your own tooling | Per-account publishing quota (25 posts/24h historically) |
| **Insights** | Your own reach, impressions, story completion, saves, profile visits | Own accounts only |
| **Ads Insights (Marketing API)** | Spend, CPM, CTR, CPA, ROAS | Pairs with Conversions API for attribution |

Requirements: an Instagram Business/Creator account linked to a Facebook Page, a Meta app, and
App Review for the `instagram_basic` / `instagram_manage_insights` scopes.

**The 30-hashtag limit is the real constraint.** Pick your 30 for the quarter and treat them as a
fixed research panel — 10 category tags, 10 competitor-adjacent, 10 format tags — rather than
burning them on ad-hoc curiosity.

### Publishing stories programmatically
Content Publishing supports stories for Business accounts: create a media container
(`/{ig-user-id}/media` with `media_type=STORIES`), then publish it
(`/{ig-user-id}/media_publish`). That's what turns the weekly Schedule grid from a plan into a cron job.

---

## 2. Third-party APIs — for competitor and trend scraping

Business Discovery only covers accounts that *are* business accounts, gives no reels-level
breakdown for others, and won't touch search or comments at volume. That's where these come in.

| Provider | Model | Indicative price | Best for |
|---|---|---|---|
| [HikerAPI](https://hikerapi.com/) | Per request | **from ~$0.0006/req** ($0.60–$20 per 1k results depending on endpoint) | Widest Instagram-only endpoint surface, best unit economics at volume |
| [Apify Instagram Scraper](https://apify.com/apify/instagram-scraper) | Per result | ~$2.30 / 1k results | Fastest to a working pipeline; scheduled runs, no-code actors, plain REST |
| [Scrape Creators](https://scrapecreators.com/) | Credits | Credit packs | Ready JSON for profiles, posts, reels, search, comments; multi-platform |
| [EnsembleData](https://ensembledata.com/) | Units | Unit packs | One provider across ~8 platforms |
| [Bright Data](https://brightdata.com/) | Per record | ~$1.50 / 1k | Large managed batches; enterprise onboarding friction |

**Recommendation for us:** start on **Apify** (running in a day, scheduled actors, no infra), and
move the high-volume competitor sweep to **HikerAPI** once we're pulling more than ~50k records a
month — that's roughly where the per-request price starts to matter.

Keep official Meta APIs for anything touching our own accounts, publishing, and ad metrics.

### Caveats
- Scraping public data is broadly defensible, but it *is* against Instagram's ToS. Don't scrape
  logged-in-only data, don't store personal data you don't need, and keep it to public business content.
- Providers break when Instagram ships changes. Build the ingest behind one interface so you can
  swap providers in an afternoon.

---

## 3. The pipeline

```
Hashtag Search (30 tags)  ─┐
Business Discovery (rivals)├─→  normalize  →  score  →  weekly angle shortlist
Apify / HikerAPI sweep    ─┘                    │
                                                └─→ Ads Insights + our Insights (what converted)
```

**The score that matters** is not likes. For each competitor post compute:

```
velocity   = engagement / hours_since_post
outlier    = velocity / that account's median velocity
```

An outlier above ~3× on an account with a comparable follower count is a format worth copying this
week. Rank by outlier, not by absolute engagement — that's what stops you chasing accounts ten
times your size.

Pull weekly on Friday morning so the shortlist lands before the 15:00 KPI readout, where next
week's angles get picked.

---

## 4. Angles to push

Six live in the app's **Angles** tab. The logic behind them:

1. **"31 posts a week with two people. Here's the grid."** — Process transparency beats polish.
   Screenshot the actual calendar and let people steal it. *Carousel, YT long-form, X thread.*
2. **"The first 3 seconds decide everything — 12 openers ranked by retention."** — Retention-curve
   teardowns travel, and your own analytics screenshots are unfakeable proof. *Reel, Short, story series.*
3. **"We killed every ad under 1.5× ROAS. Revenue went up."** — Counter-intuitive + a specific
   number in the hook. *X thread, carousel.*
4. **"Rebuilding a competitor's top post — what we'd change."** — Borrows their audience's
   attention and demonstrates judgment. Feed this directly from the outlier score above. *Reel, YT long-form.*
5. **"Hiring in public: the scorecard we screen 34 sales applicants with."** — Recruits candidates
   and customers in the same post; ties to the two open roles. *Carousel, X thread, story Q&A.*
6. **"8 weeks, one channel, every number on screen."** — Public metrics compound trust and are the
   natural bridge into the Thursday webinar. *YT long-form, webinar segment.*

**Repurpose ratio target is 4×**: every angle ships as one long-form asset, one short vertical, one
text post, and one story sequence. Nothing is made once.

---

## Sources

- [Overview of the Instagram API — Meta Developer Documentation](https://developers.facebook.com/docs/instagram-platform/overview/)
- [Instagram Graph API: Complete Developer Guide for 2026 — Elfsight](https://elfsight.com/blog/instagram-graph-api-complete-developer-guide-for-2026/)
- [Instagram API Changes in 2026 Explained — Storrito](https://storrito.com/resources/instagram-api-2026/)
- [8 Best Instagram Scraping APIs in 2026: Pricing + Coverage — HikerAPI](https://hikerapi.com/help/best-instagram-scraping-api)
- [Best Instagram Scraping APIs Compared (2026) — Scrape Creators](https://scrapecreators.com/blog/instagram-scraping-apis)
- [Best Instagram Data APIs for Developers: Pricing Compared (2026) — SocialCrawl](https://www.socialcrawl.dev/blog/best-instagram-data-apis-2026)
