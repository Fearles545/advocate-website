# 01: Footer navigation from the navigation config

**What to build:** Today the footer's «Навігація» list is a hand-made copy of the menu. After this ticket it is rendered from the same navigation config as the desktop menu and the slide-out menu. It shows every item in config order, including the ones the desktop menu keeps under «Ще». The three missing sections («Про мене», «Інструкції», «FAQ») appear, and any later menu change, starting with «Вартість» in ticket 02, reaches the footer by itself. This is a prefactor for ticket 02. Spec: `.scratch/2026-10-12-cost-of-services/spec.md`, section "Navigation".

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [x] Before any change, run `npm run build:ssg` and record the prerendered route count in this ticket's Comments. It is the baseline for ticket 06.
- [x] Before any change, take screenshots of the footer at ~390 px and ~1280 px, for comparison.
- [x] The footer's «Навігація» list contains no hard-coded page links. It is rendered from the navigation config.
- [x] At ~390 px and ~1280 px the list shows ten items in this order:
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
- [x] On the phone, the «Навігація» and «Послуги» columns still sit side by side and are not badly unbalanced. If the longer list unbalances them, the navigation list flows into two columns on narrow screens. Nothing scrolls sideways.
- [x] Everything else in the footer matches the "before" screenshots: brand, about link, the «Послуги» column, latest decisions, legal links.
- [x] `npm run build:ssg` prints no `ERROR` lines, reports the baseline route count, and every route writes its `index.html` (the check in CLAUDE.md "Build Behavior").

## Comments

### 2026-10-12: implemented

- **Baseline, before any change:** `npm run build:ssg` printed `Prerendered 110 static routes.` with 0 `ERROR` lines, and the CLAUDE.md check printed `all 110 routes written`. **Baseline for ticket 06: 110 routes.**
- **Commits:**
  - `8e3df3e` feat(footer): render the navigation list from the navigation config
  - `f09f6a9` style(footer): flow the navigation list into two columns below 768px
- **Build after the change:** `Prerendered 110 static routes.`, 0 `ERROR` lines, exit 0. The CLAUDE.md check printed `all 110 routes written`.
- **Check script:** `/private/tmp/claude-504/-Users-Leo-Documents-L-Angular-advocate-website/a4e0c721-b60c-4ee4-8390-645c896b41ab/scratchpad/checks/footer-nav.mjs`, run against `npm run preview` on :8080, over HTTP and in headless Chromium at 390 and 1280 px.
  - Red before the change: 26 passed, 13 failed (7 items, no «Про мене», «Інструкції» or «FAQ»).
  - Green after it: 51 passed, 0 failed.
- **What it compared:**
  - HTTP: the prerendered footer of all 109 sitemap pages lists the ten items in the ticket's order. No hard-coded links remain; the template loops over `NAV_ITEMS`.
  - Browser, both widths: the list shows the same ten items in order. Each item, clicked from `/privacy-policy/`, opens its page; the address and the tab title match that page's prerendered `<title>`. Nothing scrolls sideways, and no navigation label wraps.
  - Balance at 390 px, measured as the height of the taller column over the shorter one. Before the change it was 1.30 with 7 items. The ten items in one column gave 1.81, so the list now flows into two columns. Result: 1.04, with the columns side by side.
  - Other footer blocks at 390 and 1280 px (brand with the about link, contacts, «Послуги», latest decisions, social row, legal links): text and content height are identical before and after. Blocks that did not move are pixel-identical. «Послуги», the latest decisions and the social row moved down, so their pixel diffs show only subpixel rasterisation. Compared by eye, they are the same.
  - Info sweep from 320 to 1024 px (`/private/tmp/claude-504/-Users-Leo-Documents-L-Angular-advocate-website/a4e0c721-b60c-4ee4-8390-645c896b41ab/scratchpad/checks/sweep.mjs`): side by side and balanced below 768 px (ratio 1.04 to 1.27), with no sideways scroll at any width. Hovering a link no longer shifts the «Послуги» column; without the hover offset it moved 16 px.
- **Trade-off to review:** the navigation column now takes the width its labels need, so «Послуги» beside it gets narrower.
  - At 390 px «Послуги» is 161 px wide instead of 171, with the same text and height.
  - At 360 px «Призначення пенсії» and «Перерахунок пенсії» wrap onto two lines. At 320 px «Судові рішення» wraps as well.
  - The alternative is two equal-width columns, which keeps «Послуги» at half the width. But then «Судові рішення» wraps at every phone width up to about 480 px.
- **Noted, not changed:** `routerLink` renders the links without the trailing slash (`/services`), the same as the desktop and slide-out menus already do.
- **Screenshots** in `/private/tmp/claude-504/-Users-Leo-Documents-L-Angular-advocate-website/a4e0c721-b60c-4ee4-8390-645c896b41ab/scratchpad/shots/01/`:
  - `before-390.png`, `before-1280.png`, `after-390.png`, `after-1280.png`: the whole footer
  - `after-nav-services-320.png`, `after-nav-services-360.png`, `after-nav-services-700.png`
