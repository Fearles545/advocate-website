# 08: Six new court decisions (24–29) and corrections to existing ones

**What to build:** Publish the six court decisions from the sources `24.md`–`29.md`, using the slugs, field mapping, categories, registry links and related content set out in the spec. Alongside them:
- 380-9255-26 gets its corrected SEO title (135 грн);
- 380-9255-26, 460-12796-25 and 200-7851-25-appeal each get a new first related decision;
- the sitemap gets the six URLs.

Spec: `.scratch/2026-10-04-batch/spec.md`, sections "Court decisions" and "Edits to existing court decisions"; the source location is in the spec's Further Notes.

**Blocked by:** 03, 04, 05

**Status:** resolved

- [x] Six pages exist: 560-12529-26, 420-11457-26, 300-2859-26, 160-14195-26, 380-9255-26-appeal and 460-12796-25-appeal. Each shows:
  - the H1, «Справа №…» and the publication date from the source;
  - the categories from the spec's table;
  - essence, court review, result and «Кому буде корисним», matching the source word for word.

  Two exceptions: 24 drops the shorter of its duplicate paragraphs, and result bullets lose their ✔ marks.
- [x] Registry links open the documents named in the sources. Decisions 28 and 29 show two links, labelled «Рішення першої інстанції» and «Постанова апеляційної інстанції».
- [x] Related decisions appear in source order, with «додати N» items resolved through the spec's batch table. Related articles include the new articles wherever the source asks. Every related link opens a page.
- [x] Tags come from «Категорія справи». The exception is 29, which reuses its first instance's tags.
- [x] The list now starts with 460-12796-25-appeal, 380-9255-26-appeal and 160-14195-26. The filter counts are 11, 16, 12, 14, 9 and 10. The homepage latest-decisions block shows the same three.
- [x] 380-9255-26's prerendered title reads «…100 грн і 135 грн…».
- [x] 380-9255-26, 460-12796-25 and 200-7851-25-appeal list their new decision first among related decisions.
- [x] Each new page's prerendered HTML has the verbatim SEO title and description, a canonical URL with a trailing slash, and Article plus BreadcrumbList JSON-LD.
- [x] The sitemap lists the six URLs, with lastmod set to the commit date.
- [x] Checked at ~390 px and ~1280 px: no layout breaks and no horizontal scroll.
- [x] `npm run build:ssg` succeeds.

## Comments

**2026-10-05, decided with Leo: bullet formatting.** Result and «Кому буде корисним» bullets follow the convention of the 23 existing decisions: plain text starting with a capital letter, with no trailing «;» or «.». The words stay verbatim; the ✔ marks and the bold markup are dropped.

**2026-10-05, source quirk.** In `24.md` the related decisions carry the advocate's own numbers (19, 17, 6), not batch numbers; the URLs decide.

**2026-10-05, resolved.** Commits: d8ee982, c6fabc6, 5832c97. The six pages matched sources 24–29 (236 checks: H1, number, date, categories, registry links and labels, essence and court review verbatim, result and useful-for bullets in the site format, related decisions and articles in source order, every related link resolves); 380-9255-26's title reads 135 грн; the three back-links come first; the list holds 29 with counts 11/16/12/14/9/10. Independent check on the final build (after the review fixes, 62ac80b): `npm run build:ssg` printed 0 `ERROR` lines and `Prerendered 110 static routes`; every route wrote its `index.html`; the browser suite at 390 and 1280 px passed 513/513 (blog 40, reviews 22, articles 41 + 41, decisions 236, edits 5, court decisions list 128).
