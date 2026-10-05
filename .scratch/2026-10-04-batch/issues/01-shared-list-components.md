# 01: Shared list components for blog and court decisions

**What to build:** The blog's pagination, prev/next navigator and category filter become shared presentational components that any list section can use, together with one shared rule for picking prev/next neighbours. The blog moves onto them and looks and behaves exactly as before, apart from one fix. Today, when a category is selected and the open article does not belong to it, «Наступна» offers the category's first article. After the fix, the article shows its neighbours in the full list. Spec: `.scratch/2026-10-04-batch/spec.md`, section "Shared UI components (prefactor)".

**Blocked by:** None (can start immediately)

**Status:** resolved

- [x] Before any change, run `npm run build:ssg` and record the prerendered route count in this ticket's Comments as the baseline for ticket 09.
- [x] Before any change, take screenshots of the blog list and of one article at ~390 px and ~1280 px, for comparison.
- [x] The pagination, the prev/next navigator and the category filter sit among the shared components and carry no blog-specific types or texts. Labels, accessible labels and category options all come in as inputs.
- [x] Neighbour selection is a single shared rule, and the blog uses it:
  - when a category is selected and the current item belongs to it, neighbours come from that category;
  - otherwise they come from the full list.
- [x] On the blog list at ~390 px and ~1280 px everything matches the "before" screenshots:
  - the filter dropdown: counts, selection, the clear button, and closing on Escape or an outside click;
  - the pagination: page sizes 5/10/15/20, page numbers, «X–Y з N»;
  - a `?category=` deep link.
- [x] On a blog article, the «Попередня»/«Наступна» cards look the same. With a category selected they stay inside it. An article outside the selected category shows its neighbours in the full list.
- [x] The prerendered HTML of an article still contains links to its neighbours in the full list.
- [x] `npm run build:ssg` succeeds with the baseline route count.

## Comments

**2026-10-05, baseline and prerequisite.** Baseline before any batch change (cf86310): `Prerendered 102 static routes`. A prerequisite fix landed first in 847cba0: `DropdownPositionDirective` touched `window` during prerender and broke 67 routes. Since then the build prints no `ERROR` lines, every route writes its `index.html`, and every article's prerendered HTML has its H1 and its prev/next links, so this ticket's prerender criterion can now be checked. A build's route count alone is not proof; see CLAUDE.md "Build Behavior".

**2026-10-05, resolved.** Commits: 847cba0 (prerequisite SSR guard), 82a9c0f, bb8bff2; review fixes 3568b03, 361ea85, 977df5f. The blog list, filter and pagination matched the baseline screenshots (navigator byte-identical). The out-of-category scenario showed the category's first article before bb8bff2 and the full-list neighbour after it. All 58 articles' prerendered HTML links their full-list neighbours. Independent check on the final build (after the review fixes, 62ac80b): `npm run build:ssg` printed 0 `ERROR` lines and `Prerendered 110 static routes`; every route wrote its `index.html`; the browser suite at 390 and 1280 px passed 513/513 (blog 40, reviews 22, articles 41 + 41, decisions 236, edits 5, court decisions list 128).
