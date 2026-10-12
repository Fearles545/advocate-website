# 01: Footer navigation from the navigation config

**What to build:** Today the footer's «Навігація» list is a hand-made copy of the menu. After this ticket it is rendered from the same navigation config as the desktop menu and the slide-out menu. It shows every item in config order, including the ones the desktop menu keeps under «Ще». The three missing sections («Про мене», «Інструкції», «FAQ») appear, and any later menu change, starting with «Вартість» in ticket 02, reaches the footer by itself. This is a prefactor for ticket 02. Spec: `.scratch/2026-10-12-cost-of-services/spec.md`, section "Navigation".

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [ ] Before any change, run `npm run build:ssg` and record the prerendered route count in this ticket's Comments. It is the baseline for ticket 06.
- [ ] Before any change, take screenshots of the footer at ~390 px and ~1280 px, for comparison.
- [ ] The footer's «Навігація» list contains no hard-coded page links. It is rendered from the navigation config.
- [ ] At ~390 px and ~1280 px the list shows ten items in this order:
  - Головна
  - Послуги
  - Судові рішення
  - Відгуки
  - Блог
  - Про мене
  - Документи
  - Інструкції
  - FAQ
  - Контакти

  Each item opens its page.
- [ ] On the phone, the «Навігація» and «Послуги» columns still sit side by side and are not badly unbalanced. If the longer list unbalances them, the navigation list flows into two columns on narrow screens. Nothing scrolls sideways.
- [ ] Everything else in the footer matches the "before" screenshots: brand, about link, the «Послуги» column, latest decisions, legal links.
- [ ] `npm run build:ssg` prints no `ERROR` lines, reports the baseline route count, and every route writes its `index.html` (the check in CLAUDE.md "Build Behavior").

## Comments
