# 06: Blog-style pagination on the court decisions list

**What to build:** The court decisions list replaces the Material paginator with the shared pagination. It is always visible and has:
- the «Показувати:» selector with sizes 5/10/15/20, default 10;
- numbered pages with arrows;
- the «X–Y з N» counter.

Page and page size survive opening a decision and coming back. Changing the category returns the list to the first page. If the current page stops existing, the list shows the last page that does. Spec: `.scratch/2026-10-04-batch/spec.md`, section "Court decisions list".

**Blocked by:** 01, 05

**Status:** resolved

- [x] At ~390 px and ~1280 px the pagination looks like the blog's.
- [x] Changing the page size updates the list and the counter, and so does changing the page. The arrows are disabled at either end.
- [x] With a category selected, the counter and the pages reflect the filtered count, and switching category returns to page 1.
- [x] Set page size 5, go to page 2, open a decision, then come back: the same page, size and category are shown.
- [x] Nothing else used the Material paginator or its Ukrainian label texts, so both are removed from the codebase.
- [x] `npm run build:ssg` succeeds.

**2026-10-05, resolved.** Commits: 4323987, 7f675d0; review fixes 977df5f, eae623b. Page sizes 5/10/15/20, pages, «X–Y з N», arrows, page 1 after a category change, clamping to the last page, and page/size/category after returning from a decision all passed; no Material paginator code or label remains. Independent check on the final build (after the review fixes, 62ac80b): `npm run build:ssg` printed 0 `ERROR` lines and `Prerendered 110 static routes`; every route wrote its `index.html`; the browser suite at 390 and 1280 px passed 513/513 (blog 40, reviews 22, articles 41 + 41, decisions 236, edits 5, court decisions list 128).
