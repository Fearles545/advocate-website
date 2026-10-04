# 06: Blog-style pagination on the court decisions list

**What to build:** The court decisions list replaces the Material paginator with the shared pagination. It is always visible and has:
- the «Показувати:» selector with sizes 5/10/15/20, default 10;
- numbered pages with arrows;
- the «X–Y з N» counter.

Page and page size survive opening a decision and coming back. Changing the category returns the list to the first page. If the current page stops existing, the list shows the last page that does. Spec: `.scratch/2026-10-04-batch/spec.md`, section "Court decisions list".

**Blocked by:** 01, 05

**Status:** ready-for-agent

- [ ] At ~390 px and ~1280 px the pagination looks like the blog's.
- [ ] Changing the page size updates the list and the counter, and so does changing the page. The arrows are disabled at either end.
- [ ] With a category selected, the counter and the pages reflect the filtered count, and switching category returns to page 1.
- [ ] Set page size 5, go to page 2, open a decision, then come back: the same page, size and category are shown.
- [ ] Nothing else used the Material paginator or its Ukrainian label texts, so both are removed from the codebase.
- [ ] `npm run build:ssg` succeeds.
