# 07: «Попереднє» / «Наступне» on court decision pages

**What to build:** Every court decision page ends with the shared prev/next navigator, placed after the CTA block. It has:
- the labels «Попереднє» and «Наступне»;
- the accessible label «Навігація між судовими рішеннями».

«Попереднє» leads to the decision just above in the list (newer), «Наступне» to the one just below (older). If a category is selected and the current decision belongs to it, the neighbours come from that category; otherwise they come from the full list. Spec: `.scratch/2026-10-04-batch/spec.md`, section "Court decision page".

**Blocked by:** 01, 05

**Status:** resolved

- [x] On a decision in the middle of the full list, both cards show the right neighbours' titles and lead to them.
- [x] The newest decision shows only «Наступне»; the oldest shows only «Попереднє».
- [x] Category scope works both ways. With a category selected and one of its decisions open, both cards stay inside that category. With a decision outside the selected category open (reached through «Пов'язані судові рішення»), the cards follow the full list.
- [x] The prerendered HTML of a decision page contains plain links to its neighbours in the full list.
- [x] At ~390 px the cards stack and stay readable. At ~1280 px they sit side by side, as on the blog.
- [x] `npm run build:ssg` succeeds.

## Comments

**2026-10-05, list order on equal dates.** The list keeps registration order for equal dates. On 2026-01-18, 420-14018-25-cassation sits above 280-9134-25, the reverse of the spec's table. Prev/next follow the real list order.

**2026-10-05, resolved.** Commits: 3c31710; review fix 361ea85. Full-list neighbours at the start, middle and end; category scope (Пільгові + 280-9134-25-appeal) and the out-of-scope case (460-12796-25 reached from 200-7851-25-appeal) passed; every decision's prerendered HTML links its full-list neighbours. Independent check on the final build (after the review fixes, 62ac80b): `npm run build:ssg` printed 0 `ERROR` lines and `Prerendered 110 static routes`; every route wrote its `index.html`; the browser suite at 390 and 1280 px passed 513/513 (blog 40, reviews 22, articles 41 + 41, decisions 236, edits 5, court decisions list 128).
