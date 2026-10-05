# October 2026 batch: implementation report

Date: 2026-10-05. Spec: [`spec.md`](spec.md). Tickets: [`issues/01`–`09`](issues/), all `resolved`.

## Summary

The whole spec is implemented on local `main` in 27 commits (`847cba0`..`a651fbd`), followed by this report and three changes made after the advocate's answers (see "After the advocate's answers"). Nothing is pushed. A push to `main` deploys production, and it will also carry two earlier unpushed commits (`11a0b51`, `cf86310`).

What visitors get:

- **Reviews.** Two Google reviews, from «Юрій» and «Олена Тетеріна», on the reviews page and in the homepage carousel.
- **Articles.** Two new articles (02.10 and 03.10), each with a teaser, its own FAQ, related articles and SEO.
- **Court decisions.** Six new decisions (24–29). The 380-9255-26 title is corrected from 130 to 135 грн, and three earlier decisions now link to their continuations.
- **Court decisions list.** A filter by the six decision categories, blog-style pagination, and `?category=` in the URL.
- **Every decision page.** A «Категорії» row that links to the filtered list, and «Попереднє»/«Наступне» cards.
- **Blog.** Fixed «Наступна» for an article outside the selected category.
- **Prerender.**
  - The 8 instruction pages, which return 404 in production today, now prerender.
  - Every article's static HTML now carries its H1, body and navigator links.

Final build:

- `npm run build:ssg` prints 0 `ERROR` lines and `Prerendered 110 static routes` (102 before the batch).
- Every route writes its `index.html`.
- An independent browser suite at 390 and 1280 px passes 513/513.

## How the work ran

- The pipeline was /grill-with-docs, then /to-spec, /to-tickets and /implement-spec.
- Tickets ran one at a time, directly in the main checkout on `main`, in dependency order. This was Leo's choice: no integration branch and no worktrees, so no merge conflicts in the shared blog index, SEO config and sitemap.
- Each ticket had its own implementer subagent, which built it test-first against the spec's seam. The seam is the production build served locally, driven over HTTP and by headless Chrome. No test code was committed.
- After each ticket, the parent re-checked it on a fresh build before starting the next.
- At the end came a two-axis code review of `cf86310...HEAD` (standards and spec), one fix-up pass, and ticket resolution.

## Work by ticket

| Ticket | Commits | Outcome |
|---|---|---|
| Prerequisite | `847cba0` | SSR guard in `DropdownPositionDirective`; the "Build Behavior" section of `CLAUDE.md` rewritten |
| 01 Shared list components | `82a9c0f`, `bb8bff2` | Pagination, category filter and prev/next navigator moved to `shared/components`; one neighbour rule (`pickNeighbours`) fixes the blog bug |
| 02 Reviews | `c85cb97` | Both views open with «Олена Тетеріна», then «Юрій». Texts verbatim, emoji kept, `\!` escapes removed |
| 03 Article 02.10 | `ae9aabc` | `/blog/skoro-pensiia-za-vikom-shcho-potribno-zrobyty-do-zvernennia-v-pensiinyi-fond-ukrainy/`, categories `pension-by-age`, `general` |
| 04 Article 03.10 | `40ecf72` | `/blog/navishcho-pereviriaty-pensiinu-spravu-pislia-pryznachennia-pensii/`, categories `service-record`, `general`, h2/h3 hierarchy as specified |
| 05 Decision categories | `ad39c11`, `cc30316`, `81f0e6e`, `f457d92`, `0e95dfa` | See below |
| 06 Pagination | `4323987`, `7f675d0` | Shared pagination (5/10/15/20, default 10) in its own card. Page, size and category survive a visit to a decision. Material paginator and its Ukrainian labels removed |
| 07 Prev/next | `3c31710` | «Попереднє»/«Наступне» after the CTA, scoped by the neighbour rule. Plain neighbour links in every prerendered decision page |
| 08 Six decisions | `d8ee982`, `c6fabc6`, `5832c97` | See below |
| 09 Sign-off | `eaea964` | lastmod 2026-10-05 on 35 sitemap entries; full verification pass; message for the advocate |
| Review fixes | `3568b03`, `0d25c29`, `361ea85`, `977df5f`, `eae623b`, `268a61d`, `62ac80b` | See "Code review" |
| Bookkeeping | `8d54f30`, `a651fbd` | Decisions recorded in the tickets; tickets resolved |

Ticket 05 in detail:

- The six categories are defined in `cases/decision-categories.ts`.
- Every decision has a required `categories` field.
- The list filter shows counts and writes `?category=` to the URL.
- Decision pages show the «Категорії» row. Tags are hidden but still feed SEO.
- `RouteSeoService` is fixed.
- The creation guide and the AI input template are updated.

Ticket 08 in detail:

- The six new decisions are 560-12529-26, 420-11457-26, 300-2859-26, 160-14195-26, 380-9255-26-appeal and 460-12796-25-appeal.
- The 380-9255-26 title now says 135 грн.
- Back-links come first on 380-9255-26, 460-12796-25 and 200-7851-25-appeal.

## Decisions made during implementation

### With Leo, 2026-10-05

1. Run the tickets one after another on `main`, not in worktrees with an integration branch.
2. Fix the prerender crash first, in its own commit, and correct `CLAUDE.md`.
   - Cause: `fromEvent(window, 'resize')` in `DropdownPositionDirective`'s constructor threw `window is not defined` on 67 routes (blog posts, the blog list, instruction pages).
   - `CLAUDE.md` called the build noise harmless `NotYetImplemented` errors and claimed every route prerendered. Neither was true.
   - Without the fix, ticket 01's prerender criterion could not pass, and ticket 05's filter would have silently dropped `/court-cases/index.html` from the build.
3. Fix `RouteSeoService` in ticket 05.
   - Its lookup included the query string. After the app loaded, `/court-cases/?category=…` and `/blog/?category=…` fell back to the homepage title and canonical `/`.
4. Format the «Результат» and «Кому буде корисним» bullets like the 23 existing decisions: capital first letter, no trailing «;» or «.», no ✔, no bold. The words stay verbatim. «Суть справи» and «Судовий розгляд» stay verbatim HTML.

### By the implementers, within the spec

- **Review line breaks.** The homepage carousel renders line breaks for no review, so it stays unchanged. Line breaks were checked on the reviews page.
- **Article FAQ.** It keeps its shared heading «Часті питання». FAQ answers are plain text, so the bold in answer 4 of the 02.10 article is dropped.
- **Teasers.** These are the only texts not taken from the advocate's sources. The SEO keywords were also written by the implementers, since the sources give none.
  - 02.10: «Багато хто дізнається про проблеми зі стажем лише тоді, коли Пенсійний фонд України вже відмовив у призначенні пенсії або не зарахував частину років роботи. Що варто перевірити ще до звернення за пенсією, щоб не опинитися в такій ситуації — у цій статті.»
  - 03.10: «Навіть невелика помилка в розрахунку пенсії за кілька років може обернутися чималими втратами. Де Пенсійний фонд України помиляється найчастіше і як перевірити свою пенсію — у цій статті.»
- **List order on equal dates** follows registration order. On 2026-01-18, 420-14018-25-cassation sits above 280-9134-25, the reverse of the spec's table. Prev/next follow the real list.
- **The `categories` type** is `[MainDecisionCategorySlug, ...DecisionCategorySlug[]]`. A missing field, an empty list and «Інші пенсійні спори» on its own all fail type-checking. The creation guide documents the rule.
- **The category registry** lives in `cases/`, because importing from outside `cases/` broke `tsc` (see "Pre-existing issues").
- **Category icons:**

  | Slug | Icon |
  |---|---|
  | `assignment` | `how_to_reg` |
  | `recalculation` | `calculate` |
  | `service-credit` | `work_history` |
  | `indexation` | `trending_up` |
  | `preferential` | `engineering` |
  | `other` | `balance` |

- **Page-size changes** keep the page number, capped at the last page, as on the blog. An unknown `?category=` keeps the visitor's page size.

## Code review

The review ran two axes in parallel, from fixed point `cf86310`.

**Spec axis:**

- Nothing is missing.
- Content is verbatim against the sources.
- Categories match the table for 29 of 29 decisions.
- It found one bug: an unknown `?category=` kept a filter remembered from earlier in the session.
- It raised one question, about lastmod (see "Open items").

**Standards axis:**

- Two breaches of the design system: inline `rgba()` where tokens exist.
- Seven code smells. The main one: the list state and the `?category=` URL sync were written twice.

**Fixes, in the seven review-fix commits:**

- `CategoryListState` (`src/app/shared/category-list/`) holds the list state and URL sync for both sections.
- `app-category-links` renders the «Категорії» row for both.
- `pickPrevNextItems` maps neighbours to navigator cards.
- A CSS hook replaces the override of the pagination's top divider.
- Design tokens replace the raw colours.
- An unknown `?category=` now shows the full list with a clean URL.

**Left as is:**

- The navigator's desktop-first `@media (max-width: 768px)`, carried over unchanged from the blog.
- Navigating in-app from a list to the same list with `?category=` does not apply the filter, because the component is reused. This predates the batch, and no visitor can reach it: the lists render no such links and write the URL by history replacement.

## Verification

The seam is the one the spec set: the production build served locally, checked over HTTP and in headless Chrome at 390×844 and 1280×800. Content was compared with the advocate's sources in `tmp/2026-10-04/`.

Final build, after `62ac80b`:

| Check | Result |
|---|---|
| `npm run build:ssg` | exit 0, 0 `ERROR` lines (67 before the prerequisite fix), `Prerendered 110 static routes` |
| Routes written to disk | 110/110 (the 8 instruction pages were missing before) |
| Prerendered pages without `<h1>` | 0 (58 before) |
| Blog list, filter, pagination, navigator, including the fixed scenario | 40/40 |
| Reviews page and homepage carousel against the source | 22/22 |
| Article 02.10 against its source | 41/41 |
| Article 03.10 against its source, including 25 headings at the right levels | 41/41 |
| Six decisions against sources 24–29 | 236/236 |
| Edits to 380-9255-26, 460-12796-25 and 200-7851-25-appeal; homepage block | 5/5 |
| Court decisions list (see below) | 128/128 |
| Unknown `?category=` with a remembered category, both lists | passes (red before `62ac80b`) |

The court decisions list check covers:

- category counts 11/16/12/14/9/10 and each category's members (after the advocate's answers, «Інші пенсійні спори» holds 11);
- pagination and remembered state;
- prev/next scenarios;
- the «Категорії» row and prerendered neighbour links on all 29 pages.

The six-decision check covers:

- H1, case number, date and categories;
- registry links and their labels;
- essence and court review word for word;
- bullets in the site's format;
- related decisions and articles in source order.

Also checked:

- **SEO of the 23 existing decisions** is identical to the pre-batch build, except the 380-9255-26 title (130 → 135 грн). That covers title, description, canonical, meta keywords, and the JSON-LD `keywords` and `about`.
- **Sitemap:** 109 URLs. lastmod is 2026-10-05 on exactly 35 entries: home, reviews, `/blog/`, `/court-cases/`, the 29 decisions and the 2 new articles.
- **HTTP pass (ticket 09):**
  - Every sitemap URL returns prerendered HTML.
  - The only title, description or canonical defects (on 10 URLs) are identical in the `cf86310` build.
  - The 908 internal links on the 36 new or edited pages all resolve.
- **Screenshots** of every touched page at both widths were reviewed. Check scripts and screenshots lived in the session scratchpad outside the repo, because the spec ruled out committed test code, so they are not kept.

To re-check a build, run `npm run build:ssg`, then the "every route written" one-liner in `CLAUDE.md` "Build Behavior", then `npm run preview`.

## After the advocate's answers (2026-10-05)

| Change | Commit |
|---|---|
| lastmod 2026-10-05 on the 8 instruction pages, which crawlers saw as 404 until this batch (Leo's decision) | `ad42797` |
| 500-5783-25 also in «Інші пенсійні спори», like its appeal; that category now holds 11 | `57c8963` |
| 420-11457-26 first among the related decisions of 520-26392-25; the other three stay | `d421244` |

- She confirmed the 135 грн correction on 380-9255-26.
- She wants no shared taxonomy for articles and decisions, and no category landing pages.
- After these changes the build still prints 0 `ERROR` lines and 110 routes, and the browser suite passes 513/513.

## Open items

1. **Push** on Leo's command. It deploys production.
2. **«130 грн» elsewhere.** The advocate wrote that it should be 135 грн, not 130. The same «130» appears in four other decisions. Their registry texts say:

   | Decision | What the site says | Registry text |
   |---|---|---|
   | 420-14489-25 | «100–130 грн» in «Суть справи» | 100 and 135 грн (Review/129786280); no 130 |
   | 420-14489-25-appeal | «від 100 до 130 грн» in «Суть справи» | 100 and 135 грн (Review/134438986); no 130 |
   | 560-8236-26 | «100–130 грн» in «Кому буде корисним», a general description | names no amounts (Review/137435304) |
   | 300-6563-25 | «100–130 грн» in «Суть справи», «(100-130 грн.)» in «Кому буде корисним», and the SEO title «доплата 100 грн., 130 грн.» | «100 гривень та 100 гривень» only (Review/133916488); neither 130 nor 135 |

   Changing 130 to 135 in the first three is backed by the registry or by her rule. 300-6563-25 needs her answer, because its document supports neither number.
3. **Follow-ups found along the way**, not done:
   - On phones, navigator titles are clamped to one line, which shows about 35 characters of a 54–167-character decision title. A two-line clamp would change both sections at once.
   - The court case guide still says "use today's date", while the spec used «Дата публікації».
   - The blog guide still names `blogSeoConfig` (the real name is `BLOG_SEO_DATA`), shows a `<footer>` in the post template (it is never rendered), and caps related slugs at 3.

## Pre-existing issues (not caused by this batch)

- **10 canonical mismatches:**
  - 6 blog posts with an absolute canonical that gets doubled (`https://…uahttps://…`);
  - 2 posts without a trailing slash;
  - `/privacy-policy` and `/public-offer`, whose canonical is `/`.
- **Duplicate titles:** `/`, `/privacy-policy` and `/public-offer` share one title and description.
- **Sitemap gap:** `/blog/pensiia-na-pilhovykh-umovakh-za-spyskom-1-dlia-cholovikiv-porivnialnyi-analiz-zakoniv-1788-xii-ta-1058-iv/` is prerendered but missing from the sitemap.
- **Published source files:** the `angular.json` assets glob publishes `src/app/court-cases/cases/**` as `/court-cases/*.ts`, now including `decision-categories.ts`. The root `npx tsc --noEmit` also type-checks those copies in `dist/`.
- **Homepage 404:** the homepage requests `/blur` (`NgOptimizedImage` with `placeholder="blur"`) and gets a 404.
