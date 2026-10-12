# 06: Sign-off: sitemap lastmod and full verification pass

**What to build:** Once everything is merged, two things remain:
- the sitemap lastmod is updated for every existing page this work changed;
- the whole feature is verified on the production build served locally, as the spec's "Testing Decisions" describe.

This ticket is Leo's «готово». Spec: `.scratch/2026-10-12-cost-of-services/spec.md`, sections "SEO" (sitemap) and "Testing Decisions".

**Blocked by:** 03, 04, 05

**Status:** ready-for-agent

- [ ] lastmod is set to the commit date for:
  - the home page;
  - `/services/`;
  - `/faq/`;
  - the two edited articles.

  The `/prices/` entry is present.
- [ ] `npm run build:ssg` prints no `ERROR` lines, reports the baseline route count recorded in ticket 01 plus 1, and every route writes its `index.html`. The anchor check from ticket 04 passes.
- [ ] On the preview server:
  - every sitemap URL returns prerendered HTML with its own title, description and canonical;
  - every internal link on the new and edited pages resolves.
- [ ] The prerendered `/prices/` contains every service's full text and every anchor id. Its JSON-LD has a BreadcrumbList, a WebPage, an OfferCatalog whose 17 prices equal the visible ones, and a FAQPage with six questions.
- [ ] A browser pass at ~390 px and ~1280 px, plus the menu at exactly 900 px, finds the layout correct and the content matching the advocate's draft. It covers:
  - the whole price page: rows, «орієнтовно», several rows open, «Обговорити», «Інші послуги», cost factors, FAQ, closing section;
  - Chrome's find-in-page on a collapsed row;
  - the menu, the slide-out menu, the footer and the breadcrumb;
  - both article links;
  - the services, home and FAQ edits;
  - unchanged FAQ accordions elsewhere.
- [ ] With a throttled phone network, the only defect seen is the accepted one: a row opened before Angular starts closes again when the page re-renders. There is no blank page and no lost scroll.
- [ ] A report with screenshots goes in Comments.

## Comments
