# Spec: October 2026 content batch and court decision navigation

Status: ready-for-agent

## Problem Statement

The advocate sent a batch of work for the website on 2026-10-04: two new Google reviews, two new blog articles (dated 02.10.2026 and 03.10.2026), six new court decisions (her numbers 24–29), and three changes to the «Судові рішення» section.

From a visitor's side today:

- The court decisions list is one date-ordered stream of 23 cards. A pensioner looking for decisions on their kind of problem (for example indexation) has to page through all of them.
- The list has a bare Material paginator that looks and behaves differently from the blog's pagination.
- A court decision page has no way to move to the neighbouring decision; the reader has to go back to the list.
- The advocate's newest work (reviews, articles, decisions) is not on the site yet.

While preparing the batch, one factual error turned up on the live site: the SEO title of decision 380-9255-26 says the pension supplements were «100 грн і 130 грн», while both registry texts of that справа (the first-instance рішення and the appellate постанова) say 135 грн.

## Solution

What the visitor gets:

- **Category filter.** The court decisions list can be filtered by six decision categories through a dropdown that looks and behaves like the blog's category filter, with a count per category. The selection shows in the URL (`?category=<slug>`), so a filtered view can be shared or reopened.
- **Pagination.** Under the list sits the same pagination as in the blog: the «Показувати:» page-size selector, numbered pages with arrows, and the «X–Y з N» counter.
- **Prev/next cards.** At the bottom of every court decision page, «Попереднє» and «Наступне» cards lead to the neighbouring decisions. They follow the list order and stay inside the selected category when the visitor came from a filtered list.
- **Categories row.** On a court decision page, the «Категорії» row shows the decision's categories as links to the filtered list.
- **New content.** The two reviews, two articles and six decisions are published, cross-linked with existing content, and listed in the sitemap.
- **Correction.** The wrong «130 грн» on 380-9255-26 is corrected.

## User Stories

### Court decisions list

1. As a pensioner, I want to filter court decisions by decision category, so that I only see decisions about my kind of problem.
2. As a pensioner, I want to see how many decisions each category holds, so that I can tell where the advocate has the most experience.
3. As a pensioner, I want to clear the category filter with one click, so that I can return to all decisions.
4. As a visitor, I want the court decisions filter to look and behave like the blog's filter, so that the site feels like one product.
5. As a visitor, I want a link with `?category=<slug>` to open the list already filtered, so that I can share or bookmark a filtered view.
6. As a visitor following a link with an unknown category value, I want the full list instead of an error or an empty list, so that a broken link still works.
7. As a visitor, I want to choose how many decisions are shown per page (5, 10, 15 or 20), so that I can scan faster on a large screen.
8. As a visitor, I want numbered pages with previous/next arrows and an «X–Y з N» counter, so that I know where I am in the list.
9. As a visitor, I want a category change to take me back to the first page, so that I never land on an empty page.
10. As a visitor, I want the list to keep my category, page and page size when I come back from a decision page, so that I can continue where I left off.
11. As a visitor, I want the list to stay newest-first inside a category too, so that recent results are on top.
12. As a visitor on a phone, I want the filter, the cards and the pagination to fit the screen without horizontal scrolling, so that the page is usable with one hand.

### Court decision page

13. As a visitor reading a court decision, I want «Попереднє» and «Наступне» cards with the neighbours' titles at the bottom of the page, so that I can keep reading without returning to the list.
14. As a visitor who filtered by a category, I want «Попереднє» and «Наступне» to stay inside that category, so that I keep reading decisions on my topic.
15. As a visitor who opened a decision outside the selected category (for example from «Пов'язані судові рішення»), I want the cards to follow the full list, so that the neighbours make sense.
16. As a visitor on the first or the last decision of the current list, I want to see only the card that leads somewhere, so that I am never offered a dead end.
17. As a visitor, I want the «Категорії» row to show the decision's categories as links to the list filtered by each, so that I can find similar decisions.
18. As a visitor on a phone, I want the navigation cards to stack and stay readable, so that they work on a small screen.
19. As a search engine crawler, I want every prerendered court decision page to contain plain links to its neighbours in the full list, so that every decision is reachable by following links.

### New and corrected content

20. As a person approaching pension age, I want the article «Скоро пенсія за віком: що потрібно зробити до звернення в Пенсійний фонд України», so that I prepare my documents before applying.
21. As a pensioner, I want the article «Навіщо перевіряти пенсійну справу після призначення пенсії», so that I know which mistakes in my pension to look for.
22. As a reader of either new article, I want its own FAQ, recommended articles and article categories, so that I can go deeper into the topic.
23. As a visitor, I want the six new court decisions with their essence, court review, result, «Кому буде корисним», registry links, related decisions and related articles, so that I can judge the advocate's practice.
24. As a visitor on a first-instance decision whose appeal is now published (справи 380/9255/26 and 460/12796/25), I want a link to the appeal, so that I can see how the справа ended.
25. As a visitor on the appellate decision in справа 200/7851/25, I want a link to its continuation, справа 560/12529/26, so that I can follow the client's story through to the miner's minimum pension.
26. As a visitor, I want to see the two new Google reviews on the reviews page and on the homepage, so that I see recent client feedback.
27. As a visitor on the homepage, I want the latest-decisions block to show the newest decisions, so that the homepage reflects current results.
28. As a visitor, I want the 380-9255-26 page to state the correct supplement amounts (100 and 135 грн), so that the site matches the court documents.

### Advocate (content owner)

29. As the advocate, I want my SEO titles, meta descriptions, headings and body texts published verbatim, so that the site says exactly what I wrote.
30. As the advocate, I want every decision placed in exactly the categories I listed, so that the breakdown matches my lists.
31. As the advocate, I want each new article to open with a short teaser that differs from the H1 and the meta description, so that articles keep their usual shape.
32. As the advocate, I want future decision documents to carry categories through the existing creation pipeline, so that the breakdown stays complete batch after batch.

### Maintainer and agents

33. As the maintainer, I want every court decision to declare at least one decision category in its data, so that an uncategorised decision fails the build.
34. As the maintainer, I want the blog and the court decisions section to share one pagination, one prev/next navigator and one category filter, so that a fix lands in both places at once.
35. As the maintainer, I want the blog's prev/next bug fixed (an article outside the selected category shows the category's first article as «Наступна»), so that blog navigation is correct.
36. As the maintainer, I want the court decision creation guide and AI input template to describe the categories field, so that the next batch is created correctly.
37. As a search engine, I want the eight new pages listed in the sitemap and the lastmod of every changed page updated, so that the changes are crawled promptly.
38. As a search engine, I want each new page prerendered with its own title, description, canonical URL and JSON-LD, so that it is indexed correctly.
39. As a keyboard or screen-reader user, I want the filter, pagination and navigation to keep the blog's ARIA labelling and keyboard behaviour (Escape and an outside click close the dropdown; the current page is announced), so that the section stays accessible.

## Implementation Decisions

Vocabulary follows `GLOSSARY.md`: справа, судове рішення (court decision), категорія рішення (decision category), Інші пенсійні спори, тег (tag), категорія статті (article category). Code identifiers still call a court decision a "court case"; this spec uses the glossary term.

### Decision categories

- Six decision categories, in this display order, with stable slugs:
  1. `assignment`: «Призначення пенсії»
  2. `recalculation`: «Перерахунок пенсії»
  3. `service-credit`: «Зарахування стажу»
  4. `indexation`: «Індексація пенсії»
  5. `preferential`: «Пільгові пенсії»
  6. `other`: «Інші пенсійні спори»
- Each category also carries a Material icon. The implementer chooses the icons in the style of the blog filter.
- One registry in the court decisions section defines the six categories. Decision categories are a taxonomy separate from article categories.
- **Schema change.** Every court decision gets a required list of one or more decision categories. A missing field or an empty list must fail type-checking.
- `other` (Інші пенсійні спори) always accompanies at least one main category. It is never a catch-all on its own.
- **Tags.** They stay in the data and still feed the meta keywords and the JSON-LD `keywords`/`about`, but the decision page no longer renders them.

Category assignment, taken from the advocate's lists and shown in list order (newest first):

| Court decision | Date | Categories |
|---|---|---|
| 460-12796-25-appeal (new) | 2026-10-03 | assignment, service-credit, other |
| 380-9255-26-appeal (new) | 2026-09-22 | recalculation, indexation |
| 160-14195-26 (new) | 2026-09-11 | recalculation, service-credit, other |
| 300-2859-26 (new) | 2026-09-04 | recalculation, indexation |
| 420-11457-26 (new) | 2026-08-31 | assignment, service-credit |
| 560-12529-26 (new) | 2026-08-24 | recalculation, preferential, other |
| 480-3424-26-correction | 2026-08-05 | assignment, preferential, other |
| 380-9255-26 | 2026-08-04 | recalculation, indexation |
| 480-3424-26 | 2026-07-20 | assignment, preferential |
| 560-8236-26 | 2026-07-16 | recalculation, indexation |
| 280-9134-25-appeal | 2026-06-02 | assignment, service-credit, preferential |
| 520-30296-25-additional | 2026-04-12 | recalculation, indexation, other |
| 200-7851-25-appeal | 2026-04-10 | assignment, service-credit, preferential |
| 460-12796-25 | 2026-04-07 | assignment, service-credit, other |
| 520-30296-25 | 2026-04-05 | recalculation, indexation, other |
| 520-26392-25 | 2026-04-02 | assignment, service-credit |
| 500-5783-25-appeal | 2026-03-31 | recalculation, indexation, other |
| 420-14489-25-appeal | 2026-02-27 | recalculation, indexation |
| 300-6563-25 | 2026-02-13 | recalculation, indexation |
| 280-9134-25 | 2026-01-18 | assignment, service-credit, preferential |
| 420-14018-25-cassation | 2026-01-18 | recalculation, indexation |
| 500-5783-25 | 2025-12-26 | recalculation, indexation |
| 420-14018-25-appeal | 2025-12-02 | recalculation, indexation |
| 420-22036-25 | 2025-12-02 | assignment, service-credit, preferential |
| 200-7851-25 | 2025-11-20 | assignment, service-credit, preferential |
| 200-5966-25 | 2025-10-10 | service-credit, preferential, other |
| 420-14489-25 | 2025-08-26 | recalculation, indexation |
| 420-14018-25 | 2025-07-31 | recalculation, indexation |
| 582-867-21 | 2025-06-01 | service-credit, other |

Expected counts: assignment 11, recalculation 16, service-credit 12, indexation 14, preferential 9, other 10.

500-5783-25-appeal is in `other` while its first instance is not. It is kept exactly as the advocate listed it, and the question is open with her.

### Shared UI components (prefactor)

- The blog's pagination, prev/next navigator and category filter become shared presentational components. Both the blog and the court decisions section use them.
- **Pagination.** Same interface as today: total items, page index, page size and page-size options in; page changes out.
- **Prev/next navigator.**
  - Inputs: the previous and next items (each a link and a title), the two labels, and the navigation's accessible label.
  - Labels: «Попередня»/«Наступна» for articles, «Попереднє»/«Наступне» for court decisions.
  - Neighbour selection happens outside the component; one rule, shared by both sections.
- **Category filter.**
  - Inputs: the category options (slug, label, icon), per-category counts and the selected slug.
  - Output: the new selection, or none when cleared.
  - Categories with zero items stay hidden, as in the blog today.
- **Neighbour rule** (both sections), evaluated against the list order:
  - If a category is selected and the current item belongs to it, neighbours come from that category.
  - Otherwise they come from the full list.
  - For articles this fixes today's bug: an article outside the selected category gets the category's first article as «Наступна».
- The blog must look and behave exactly as before, apart from that fix.

### Court decisions list

- The Material paginator is replaced by the shared pagination: page sizes 5/10/15/20, default 10, always visible.
- The shared category filter sits above the list inside an element with the anchor id `categories`, as in the blog, so category links can scroll to it.
- **State.** Page index, page size and selected category live in the section's root-provided pagination state, so they survive opening a decision and coming back. A category change resets to the first page. Whenever the visible count shrinks, the page index is clamped to the last existing page.
- **URL** (mirrors the blog):
  - The selection is reflected as `?category=<slug>` through a history state replacement, without a router navigation.
  - A valid value on load applies the filter; an invalid value is ignored.
  - Returning to the list with a remembered category restores the query parameter.
- The list's canonical URL stays the unfiltered `/court-cases/`.

### Court decision page

- The «Категорії» row shows the decision's categories, each linking to the list with `?category=<slug>` and the `categories` fragment.
- The prev/next navigator is the last block of the page, after the CTA block.
  - Labels: «Попереднє» / «Наступне».
  - Accessible label: «Навігація між судовими рішеннями».
- **Order** follows the list (newest first): «Попереднє» is the decision just above in the list (newer), «Наступне» the one just below (older). Scope follows the shared neighbour rule.
- During prerendering no category is selected, so the prerendered HTML always links the neighbours in the full list.

### Reviews

- The two reviews from task 1 of the batch, by «Юрій» and «Олена Тетеріна», are appended at the end of the reviews data.
- The text is verbatim with the emoji kept. Markdown escapes such as `\!` are removed.
- Entries use the template-literal style of recent ones.

### Articles

Follow the blog creation guide, plus these established conventions.

| Source date | H1 | Slug | Article categories (in this order) |
|---|---|---|---|
| 02.10.2026 | «Скоро пенсія за віком: що потрібно зробити до звернення в Пенсійний фонд України» | `skoro-pensiia-za-vikom-shcho-potribno-zrobyty-do-zvernennia-v-pensiinyi-fond-ukrainy` | pension-by-age, general |
| 03.10.2026 | «Навіщо перевіряти пенсійну справу після призначення пенсії» | `navishcho-pereviriaty-pensiinu-spravu-pislia-pryznachennia-pensii` | service-record, general |

- **Category mapping.** The advocate wrote «Призначення пенсії» and «Перерахунок пенсії» as categories; those are decision categories, so they map to the existing article categories above. Whether she wants a shared taxonomy is an open question for her.
- **Field mapping:**
  - H1 → the article title, the JSON-LD headline and the third breadcrumb item.
  - «SEO Meta Title» → the page title, with the « | Адвокат Поддяча Юлія Юріївна» suffix.
  - «SEO Meta Description» → both the meta description and the list description, verbatim.
  - «Опис статті» → the visible intro.
  - «Рекомендовані статті» → related articles. The data keeps all four, in source order. The related-articles block holds three cards, the same as every existing post with explicit related articles, so it shows the first three.
  - «Часті питання по темі» → the article's own FAQ. Both articles have one.
- **Teaser.** Each article opens with a teaser blockquote: a new one- or two-sentence hook, distinct from the H1 and from the meta description. This is the advocate's standing request.
- **Headings.** There is exactly one H1 per page, rendered from the title. In the 03.10 source, `#`-level section headings become h2, and the numbered items 1–13 under «Типові помилки…» become h3.
- **Post HTML conventions:**
  - no footer block (it is appended automatically);
  - internal links as plain anchors to `/blog/<slug>/`;
  - straight ASCII apostrophes;
  - «№» without a following space;
  - an empty video list.
- Dates: 2026-10-02 and 2026-10-03.

### Court decisions

Follow the court case creation guide, plus these decisions.

- **Batch number → slug:**

| Batch no. | Slug | Note |
|---|---|---|
| 24 | 560-12529-26 | |
| 25 | 420-11457-26 | |
| 26 | 300-2859-26 | |
| 27 | 160-14195-26 | |
| 28 | 380-9255-26-appeal | appellate постанова in a справа already on the site |
| 29 | 460-12796-25-appeal | appellate постанова in a справа already on the site |

- **Field mapping:**
  - «H1» → title.
  - «SEO Title» → the SEO title override, verbatim, with no suffix (as in existing decisions).
  - «Meta description» → the SEO description override, verbatim.
  - «Категорія справи» → tags. Exception: 29's line lists decision categories, so 29 reuses its first instance's tags (пенсія за вислугу років, спеціальний стаж, УБД).
  - «Дата публікації» → date, even though it predates the publish day (same as the previous batch).
  - «Суть справи» and «Судовий розгляд» → the HTML sections.
  - «Результат» → plain-text result bullets, without the ✔ marks.
  - «Кому буде корисним» → the useful-for bullets.
- **Registry links:**
  - A first-instance-only decision gets a single link, labelled like the latest existing first-instance decision.
  - Appeals 28 and 29 get two links, labelled «Рішення першої інстанції» and «Постанова апеляційної інстанції».
- **Related content:**
  - «Інші судові рішення з подібних питань» → related decisions, in the given order. Items marked «додати N …» resolve through the batch table above.
  - «Корисні роз'яснення з теми цієї справи» → related articles. Items marked «додати статтю від 02.10/03.10…» resolve to the two new article slugs.
- **Template lines.** Lines such as «👉 Судові рішення з пенсійних спорів (веде на …)» and the block headings in the sources are the advocate's template, not content. The decision page keeps its own block headings.
- **Duplicate in 24.** «Суть справи» has two near-duplicate paragraphs: «Після виконання рішення у попередній справі…» and «Після виконання попереднього судового рішення…». Keep only the second, fuller one.
- **Registry check.** All registry links were checked against reyestr.court.gov.ua on 2026-10-04: every case number, court and instance matches.

### Edits to existing court decisions

- **380-9255-26:** in the SEO title, «…100 грн і 130 грн…» becomes «…100 грн і 135 грн…». Per the registry texts, the supplements were 135 грн from 2022, then 100 грн in 2023 and in 2024.
- **Back-links,** each added as the first related decision:
  - 380-9255-26 → 380-9255-26-appeal.
  - 460-12796-25 → 460-12796-25-appeal.
  - 200-7851-25-appeal → 560-12529-26. The text of decision 560/12529/26 cites справа 200/7851/25 six times; it is its continuation.

### Documentation and sitemap

- The court case creation guide and the AI input template describe the required categories field and list the six slugs.
- The sitemap gains the eight new URLs.
- lastmod is set to the commit date on:
  - the eight new URLs;
  - the home page and the reviews page;
  - the blog list and the court decisions list;
  - every court decision page, since each gains the navigator and the categories row.

## Testing Decisions

- **The seam.** One seam: the production build served locally (`npm run build:ssg`, then `npm run preview`). These are the same static files GitHub Pages serves. Builds may run as often as needed.
- **What a good check looks at.** Only external behaviour, compared against the advocate's sources: what a visitor sees and can click, and what a crawler receives. Never internals.
- **Driver 1: a real browser** driven by the agent, at a phone viewport (~390 px) and a desktop viewport (~1280 px). Both layout and substance count: text, numbers, dates, links and categories must match the sources.
  - **Court decisions list:**
    - every category's count and members match the table above;
    - clearing the filter works;
    - `?category=` deep links work, both valid and invalid;
    - page change, page size and the counter work;
    - the first page shows after a category change;
    - state survives opening a decision and coming back;
    - no horizontal scroll on the phone.
  - **Each of the six new decision pages:**
    - title, case number and date are right;
    - the «Категорії» row is right;
    - registry links open the right documents;
    - essence, court review, result and useful-for match the source;
    - related decisions and related articles resolve;
    - prev/next labels are «Попереднє» / «Наступне».
  - **The three edited decisions:** the new related links are present, and 380-9255-26 says 135.
  - **Prev/next behaviour:**
    - full-list order;
    - category scope;
    - a decision outside the selected category;
    - the first and last items show a single card.
  - **Blog** (regression plus new content):
    - list filter and pagination;
    - an article's navigator, including the bug-fix scenario;
    - both new articles: H1, teaser, intro, heading levels, FAQ, related articles and categories.
  - **Homepage:** the two new reviews, and the latest decisions 460-12796-25-appeal, 380-9255-26-appeal and 160-14195-26.
- **Driver 2: plain HTTP requests** to the same server:
  - every sitemap URL returns prerendered HTML with its own title, description and canonical;
  - every internal link on new and edited pages resolves.
- **No committed test code.** The project has no test runner wired up: a single Karma spec exists but no npm script runs it. Adding test infrastructure is out of scope. The agent reports what it checked, with screenshots.
- **Prior art:** local verification through `build:ssg` plus `preview`. There is no end-to-end prior art in the repo.

## Out of Scope

- Prerendered category landing pages (`/court-cases/category/<slug>/`). This is a possible follow-up if the advocate provides an intro text per category.
- A shared taxonomy between article categories and decision categories, and re-categorising existing articles.
- Trimming SEO titles and descriptions to 60 and 160 characters; the advocate's texts are used verbatim.
- Renaming code identifiers to match the glossary.
- Rewording the block headings on decision pages to the advocate's template.
- Automated or end-to-end test infrastructure.
- Pushing to production.

## Further Notes

- **Source materials** are untracked (`tmp/` is gitignored) and live only in the main checkout, in `/Users/Leo/Documents/L/Angular/advocate-website/tmp/2026-10-04/`:
  - the task list `tasks-2026-10-04.md`, with two embedded mockups that are screenshots of the existing blog pagination and blog prev/next;
  - the article sources `blog-2026-10-02.md` and `blog-2026-10-03.md`;
  - the decision sources `24.md`–`29.md`.

  A worktree does not contain them; read them from the main checkout.
- **Commits.** Make separate conventional commits per logical block, directly on `main`, with no feature branch. Push only on Leo's command, because a push to `main` is a production deploy.
- **Open questions for the advocate.** None of them blocks this spec:
  1. 500-5783-25 versus its appeal in «Інші»;
  2. whether articles and decisions should share one taxonomy;
  3. whether she wants category landing pages, which would need her intro texts.

  Also send her an FYI about the 130 → 135 грн correction.
