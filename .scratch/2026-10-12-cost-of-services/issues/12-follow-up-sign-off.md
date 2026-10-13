# 12: Sign-off of the corrections: sitemap lastmod and verification pass

**What to build:** Once 07–11 are done, the sitemap lastmod moves for every page they changed, and the corrections are verified on the production build served locally against the advocate's messages. This ticket and 06 together are Leo's «готово». Spec: `.scratch/2026-10-12-cost-of-services/spec.md`, section "Follow-up: the advocate's corrections (2026-10-13)", and "Testing Decisions".

**Blocked by:** 07, 08, 09, 10, 11

**Status:** ready-for-agent

- [ ] lastmod is the commit date for every page whose visible text changed in 07–11: `/prices/`, `/consultation/`, `/`, `/services/`, `/faq/`, `/court-cases/`, every court decision page, `/instructions/`, `/about-me/`, `/contacts/`, `/documents/`. No other entry changes.
- [ ] `npm run build:ssg` prints no `ERROR` lines and `Prerendered 111 static routes`; the route and anchor checks in CLAUDE.md pass.
- [ ] Every replacement text in the spec's follow-up section appears verbatim on its page in the prerendered HTML, and every replaced text is gone from it.
- [ ] A browser pass at ~390 px and ~1280 px over every touched block finds the layout right. It also re-runs ticket 06's browser pass on `/prices/`: rows, several rows open, the new row link, «Інші послуги», cost factors, FAQ, closing section, the article deep links.
- [ ] A report with screenshots goes in Comments.

## Comments
