# 04: Article 03.10 «Навіщо перевіряти пенсійну справу після призначення пенсії»

**What to build:** The article from the source `blog-2026-10-03.md` is published. It follows the blog creation guide and the conventions in the spec: teaser, intro, body with a correct heading hierarchy, its own FAQ, recommended articles, SEO and a sitemap entry.
- URL: `/blog/navishcho-pereviriaty-pensiinu-spravu-pislia-pryznachennia-pensii/`
- Date: 2026-10-03
- Article categories: service-record, then general

Spec: `.scratch/2026-10-04-batch/spec.md`, section "Articles"; the source location is in the spec's Further Notes.

**Blocked by:** None (can start immediately)

**Status:** resolved

- [x] The page shows, in this order:
  - the H1 from the source;
  - a new teaser of one or two sentences, different from both the H1 and the meta description;
  - the «Опис статті» intro;
  - every body section, in source order;
  - the FAQ «Часті питання по темі» with its four questions.
- [x] The heading hierarchy is right:
  - the page has exactly one H1;
  - the source's `#`-level section headings are h2;
  - the numbered items 1–13 under «Типові помилки при призначенні та перерахунку пенсії» are h3;
  - «Повна перевірка» and «Часткова перевірка» stay h3 under their h2.
- [x] The body text matches the source word for word, bold kept. It uses straight ASCII apostrophes and «№» without a following space. The article HTML contains no footer block.
- [x] The related-articles data lists all four «Рекомендовані статті» in source order. The block shows the first three, which is its capacity.
- [x] The article appears in the blog list in date order, and the blog filter finds it under both of its categories.
- [x] The prerendered HTML contains:
  - the source SEO title with the « | Адвокат Поддяча Юлія Юріївна» suffix;
  - the verbatim meta description;
  - a canonical URL with a trailing slash;
  - BreadcrumbList, WebPage and BlogPosting JSON-LD whose headline is the H1.
- [x] The sitemap lists the URL, with lastmod set to the commit date.
- [x] Checked at ~390 px and ~1280 px: no layout breaks and no horizontal scroll.

## Comments

**2026-10-05, FAQ block.** The FAQ block keeps its shared heading «Часті питання»; the source's «Часті питання по темі» only names the section. FAQ answers are plain text, so bold inside an answer is dropped.

**2026-10-05, resolved.** Commits: 40ecf72. Checked against `blog-2026-10-03.md`: one H1, 25 headings at the specified levels, 5 intro paragraphs, 271 body lines verbatim, FAQ 4/4, related block = first 3 of 4, prerendered SEO, sitemap entry. Independent check on the final build (after the review fixes, 62ac80b): `npm run build:ssg` printed 0 `ERROR` lines and `Prerendered 110 static routes`; every route wrote its `index.html`; the browser suite at 390 and 1280 px passed 513/513 (blog 40, reviews 22, articles 41 + 41, decisions 236, edits 5, court decisions list 128).
