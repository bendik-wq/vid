# Owners Academy — webinar opt-in page

Single static page: `webinar/index.html`. No build step, no dependencies. Open it
in a browser or serve the folder (`python3 -m http.server`).

Modelled on the structure of herlastcall.com: live badge → benefit headline with
"even if" qualifiers → host + countdown + form above the fold → social proof →
origin story → agenda → live-only bonus stack → guarantee → FAQ → closing CTA →
disclaimers.

## Before publishing

1. **Session date** — `WEBINAR_DATE` at the top of the inline script. Leave it
   empty and the countdown rolls to the next Thursday 19:00 local time.
2. **Form endpoint** — `ENDPOINT` in the submit handler. Empty today, so the
   form validates and shows the success state without posting anywhere.
3. **Host photo** — drop a file at `webinar/assets/host.jpg` (hidden if missing).
4. **Testimonials** — the three reviews are marked `PLACEHOLDER` in the markup.
   Replace with verified reviews and real names/locations before going live.
5. **Claims** — the `$0 / 8–12x / 90 min` badges and the $6,940 stack values are
   the offer as written in `OFFER.md`. Confirm each one is defensible; the
   earnings disclaimer in the footer assumes they are illustrative.
6. **Legal** — `/privacy` and `/terms` are stubs; point them at real pages, and
   have the SMS consent language checked against TCPA/GDPR for your markets.
