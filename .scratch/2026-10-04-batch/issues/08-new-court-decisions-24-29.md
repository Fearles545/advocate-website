# 08: Six new court decisions (24–29) and corrections to existing ones

**What to build:** Publish the six court decisions from the sources `24.md`–`29.md`, using the slugs, field mapping, categories, registry links and related content set out in the spec. Alongside them:
- 380-9255-26 gets its corrected SEO title (135 грн);
- 380-9255-26, 460-12796-25 and 200-7851-25-appeal each get a new first related decision;
- the sitemap gets the six URLs.

Spec: `.scratch/2026-10-04-batch/spec.md`, sections "Court decisions" and "Edits to existing court decisions"; the source location is in the spec's Further Notes.

**Blocked by:** 03, 04, 05

**Status:** ready-for-agent

- [ ] Six pages exist: 560-12529-26, 420-11457-26, 300-2859-26, 160-14195-26, 380-9255-26-appeal and 460-12796-25-appeal. Each shows:
  - the H1, «Справа №…» and the publication date from the source;
  - the categories from the spec's table;
  - essence, court review, result and «Кому буде корисним», matching the source word for word.

  Two exceptions: 24 drops the shorter of its duplicate paragraphs, and result bullets lose their ✔ marks.
- [ ] Registry links open the documents named in the sources. Decisions 28 and 29 show two links, labelled «Рішення першої інстанції» and «Постанова апеляційної інстанції».
- [ ] Related decisions appear in source order, with «додати N» items resolved through the spec's batch table. Related articles include the new articles wherever the source asks. Every related link opens a page.
- [ ] Tags come from «Категорія справи». The exception is 29, which reuses its first instance's tags.
- [ ] The list now starts with 460-12796-25-appeal, 380-9255-26-appeal and 160-14195-26. The filter counts are 11, 16, 12, 14, 9 and 10. The homepage latest-decisions block shows the same three.
- [ ] 380-9255-26's prerendered title reads «…100 грн і 135 грн…».
- [ ] 380-9255-26, 460-12796-25 and 200-7851-25-appeal list their new decision first among related decisions.
- [ ] Each new page's prerendered HTML has the verbatim SEO title and description, a canonical URL with a trailing slash, and Article plus BreadcrumbList JSON-LD.
- [ ] The sitemap lists the six URLs, with lastmod set to the commit date.
- [ ] Checked at ~390 px and ~1280 px: no layout breaks and no horizontal scroll.
- [ ] `npm run build:ssg` succeeds.
