# 05: Decision categories: list filter and «Категорії» on each court decision

**What to build:** Visitors filter the court decisions list by the six decision categories, using the shared category filter: counts, a clear button, and `?category=<slug>` in the URL. Every court decision page shows its categories in the «Категорії» row, each linking to the list filtered by it. In the data, every court decision declares at least one category, and the 23 existing decisions receive theirs from the spec's table. Tags are no longer displayed but keep feeding SEO. The court decision creation guide and AI input template describe the new field. Spec: `.scratch/2026-10-04-batch/spec.md`, sections "Decision categories", "Court decisions list" and "Court decision page".

**Blocked by:** 01

**Status:** ready-for-agent

- [ ] The six decision categories (assignment, recalculation, service-credit, indexation, preferential, other) are defined in one place, in the spec's display order, each with its label and a Material icon.
- [ ] A court decision with no categories, or with an empty list, fails type-checking.
- [ ] Each of the 23 existing decisions carries exactly the categories in the spec's table. The filter counts are 9, 12, 9, 12, 8 and 7, in display order.
- [ ] Filtering behaves as follows:
  - selecting a category shows only its decisions, newest first;
  - the clear button brings back all decisions;
  - the URL shows `?category=<slug>` without reloading the page;
  - opening `/court-cases/?category=<slug>` shows the filtered list;
  - an unknown value shows the full list.
- [ ] The current paginator pages through the filtered list, and changing the category returns it to the first page.
- [ ] After opening a decision and coming back, the category is still selected and `?category=` is back in the URL.
- [ ] On every decision page, the «Категорії» row lists that decision's categories. Each category links to the filtered list and scrolls to the filter. Tags are no longer shown.
- [ ] Meta keywords and JSON-LD keywords on decision pages are unchanged, still built from tags.
- [ ] The guide and the AI input template describe the required categories field and list the six slugs.
- [ ] Checked at ~390 px and ~1280 px: the filter, its dropdown and the «Категорії» row are readable, with no horizontal scroll.
- [ ] `npm run build:ssg` succeeds.
