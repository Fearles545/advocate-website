# 07: «Попереднє» / «Наступне» on court decision pages

**What to build:** Every court decision page ends with the shared prev/next navigator, placed after the CTA block. It has:
- the labels «Попереднє» and «Наступне»;
- the accessible label «Навігація між судовими рішеннями».

«Попереднє» leads to the decision just above in the list (newer), «Наступне» to the one just below (older). If a category is selected and the current decision belongs to it, the neighbours come from that category; otherwise they come from the full list. Spec: `.scratch/2026-10-04-batch/spec.md`, section "Court decision page".

**Blocked by:** 01, 05

**Status:** ready-for-agent

- [ ] On a decision in the middle of the full list, both cards show the right neighbours' titles and lead to them.
- [ ] The newest decision shows only «Наступне»; the oldest shows only «Попереднє».
- [ ] Category scope works both ways. With a category selected and one of its decisions open, both cards stay inside that category. With a decision outside the selected category open (reached through «Пов'язані судові рішення»), the cards follow the full list.
- [ ] The prerendered HTML of a decision page contains plain links to its neighbours in the full list.
- [ ] At ~390 px the cards stack and stay readable. At ~1280 px they sit side by side, as on the blog.
- [ ] `npm run build:ssg` succeeds.
