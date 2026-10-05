# 09: Batch sign-off: sitemap lastmod and full browser pass

**What to build:** Once everything is merged, two things remain:
- the sitemap lastmod is updated for every page the batch changed;
- the whole batch is verified on the production build served locally, at ~390 px and ~1280 px, as the spec's "Testing Decisions" describe.

This ticket is Leo's «готово». Spec: `.scratch/2026-10-04-batch/spec.md`, sections "Documentation and sitemap" and "Testing Decisions".

**Blocked by:** 02, 06, 07, 08

**Status:** ready-for-agent

- [ ] lastmod is set to the commit date for:
  - the home page and the reviews page, which now show new reviews and the newest decisions;
  - `/blog/` and `/court-cases/`;
  - all 29 court decision URLs.

  The eight new URLs from tickets 03, 04 and 08 are present.
- [ ] `npm run build:ssg` reports the baseline route count recorded in ticket 01, plus 8.
- [ ] On the preview server, every sitemap URL returns prerendered HTML with its own title, description and canonical.
- [ ] Every internal link on the new and edited pages resolves.
- [ ] A browser pass at ~390 px and ~1280 px finds the layout correct and the content matching the sources on:
  - the court decisions list: all six categories with their members checked against the spec's table, pagination, deep links, and state after coming back;
  - the six new decisions and the three edited ones;
  - the prev/next scenarios;
  - the blog list, both new articles, and an older article's navigator;
  - the homepage and the reviews page.
- [ ] A report lists what was checked, with screenshots, plus anything that failed.
- [ ] A message for the advocate, in Ukrainian, covers:
  - the three open questions from the spec;
  - an FYI on the 130 → 135 грн correction;
  - the note that each article lists four recommended articles but the block shows three.

## Comments

**2026-10-05, expectations.** Expected route count: 102 + 8 = 110, with every route's `index.html` written (CLAUDE.md "Build Behavior"). Since 847cba0 blog posts prerender their full body, which visitors never see (the client re-renders), so check the prerendered HTML of the two new articles directly: H1, body, internal links and images. The message for the advocate also says that the list items of the six new decisions follow the site's format (capital first letter, no trailing «;»).
