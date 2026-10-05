# 03: Article 02.10 «Скоро пенсія за віком: що потрібно зробити до звернення в Пенсійний фонд України»

**What to build:** The article from the source `blog-2026-10-02.md` is published. It follows the blog creation guide and the conventions in the spec: teaser, intro, body, its own FAQ, recommended articles, SEO and a sitemap entry.
- URL: `/blog/skoro-pensiia-za-vikom-shcho-potribno-zrobyty-do-zvernennia-v-pensiinyi-fond-ukrainy/`
- Date: 2026-10-02
- Article categories: pension-by-age, then general

Spec: `.scratch/2026-10-04-batch/spec.md`, section "Articles"; the source location is in the spec's Further Notes.

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [ ] The page shows, in this order:
  - the H1 from the source;
  - a new teaser of one or two sentences, different from both the H1 and the meta description;
  - the «Опис статті» intro;
  - every body section, in source order;
  - the FAQ «Часті питання по темі» with its four questions.
- [ ] The body text matches the source word for word, bold kept. It uses straight ASCII apostrophes and «№» without a following space. The article HTML contains no footer block.
- [ ] The related-articles data lists all four «Рекомендовані статті» in source order. The block shows the first three, which is its capacity.
- [ ] The article appears in the blog list in date order, and the blog filter finds it under both of its categories.
- [ ] The prerendered HTML contains:
  - the source SEO title with the « | Адвокат Поддяча Юлія Юріївна» suffix;
  - the verbatim meta description;
  - a canonical URL with a trailing slash;
  - BreadcrumbList, WebPage and BlogPosting JSON-LD whose headline is the H1.
- [ ] The sitemap lists the URL, with lastmod set to the commit date.
- [ ] Checked at ~390 px and ~1280 px: no layout breaks and no horizontal scroll.

## Comments

**2026-10-05, FAQ block.** The FAQ block keeps its shared heading «Часті питання»; the source's «Часті питання по темі» only names the section. FAQ answers are plain text, so bold inside an answer is dropped.
