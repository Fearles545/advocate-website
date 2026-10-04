# 01: Shared list components for blog and court decisions

**What to build:** The blog's pagination, prev/next navigator and category filter become shared presentational components that any list section can use, together with one shared rule for picking prev/next neighbours. The blog moves onto them and looks and behaves exactly as before, apart from one fix. Today, when a category is selected and the open article does not belong to it, «Наступна» offers the category's first article. After the fix, the article shows its neighbours in the full list. Spec: `.scratch/2026-10-04-batch/spec.md`, section "Shared UI components (prefactor)".

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [ ] Before any change, run `npm run build:ssg` and record the prerendered route count in this ticket's Comments as the baseline for ticket 09.
- [ ] Before any change, take screenshots of the blog list and of one article at ~390 px and ~1280 px, for comparison.
- [ ] The pagination, the prev/next navigator and the category filter sit among the shared components and carry no blog-specific types or texts. Labels, accessible labels and category options all come in as inputs.
- [ ] Neighbour selection is a single shared rule, and the blog uses it:
  - when a category is selected and the current item belongs to it, neighbours come from that category;
  - otherwise they come from the full list.
- [ ] On the blog list at ~390 px and ~1280 px everything matches the "before" screenshots:
  - the filter dropdown: counts, selection, the clear button, and closing on Escape or an outside click;
  - the pagination: page sizes 5/10/15/20, page numbers, «X–Y з N»;
  - a `?category=` deep link.
- [ ] On a blog article, the «Попередня»/«Наступна» cards look the same. With a category selected they stay inside it. An article outside the selected category shows its neighbours in the full list.
- [ ] The prerendered HTML of an article still contains links to its neighbours in the full list.
- [ ] `npm run build:ssg` succeeds with the baseline route count.
