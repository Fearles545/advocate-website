# 02: Price page `/prices/` with the price list

**What to build:** A visitor sees «Вартість» in the menu right after «Послуги», on desktop, in the slide-out menu and in the footer. The item opens `/prices/`.

The page shows:
- the signature page header, with the advocate's introduction and «Ціни актуальні станом на 2026 рік»;
- the price list: five групи послуг holding 17 послуги. Each послуга is a collapsed row with its name and price, with «орієнтовно» under every range. Tapping a row reveals the advocate's full description of that послуга and a link «Обговорити цю послугу →»;
- the «Інші послуги» note.

Behind the page sits one typed price-list data module that the later tickets reuse. The page has its own title, description, canonical, breadcrumb and sitemap entry.

The cost-factors section, the FAQ, the final call to action and the offer catalogue come in ticket 03. Fragment navigation comes in ticket 04.

Spec: `.scratch/2026-10-12-cost-of-services/spec.md`, sections:
- "Price list data"
- "Price page"
- "SEO" (title, description, canonical, BreadcrumbList, WebPage, breadcrumb label, sitemap entry)
- "Navigation"
- "Text handling"

**Blocked by:** 01

**Status:** ready-for-agent

- [x] The navigation config has «Вартість» → `/prices/` right after «Послуги».
  - The desktop menu shows it in that place and keeps «Документи», «Інструкції» and «FAQ» under «Ще».
  - The slide-out menu and the footer show it in the same place.
- [x] At exactly 900 px and at ~1280 px, the desktop menu's eight items and «Ще» fit on one line. The existing narrow-width font and padding steps are tightened only if needed.
- [x] The breadcrumb on the page reads «Головна › Вартість послуг».
- [x] The price-list data module holds:
  - the year 2026;
  - the five groups, with the ids, titles and order from the spec's table;
  - the 17 services, with the ids, titles, order and prices from the spec's table;
  - each service's description blocks, verbatim from the advocate's draft and with her bold kept (only the edits listed in "Text handling" are allowed);
  - the «Інші послуги» note.
- [x] Every amount on the page is produced by one formatter: thousands separated by a non-breaking space, ranges joined by an en dash, and «грн» attached by a non-breaking space. No amount wraps at ~390 px.
- [x] The page header has:
  - the `payments` badge;
  - the H1 «Вартість послуг пенсійного адвоката»;
  - the advocate's intro, with the secondary paragraphs;
  - «Ціни актуальні станом на 2026 рік», with the year taken from the data.
- [x] The headings follow the spec's hierarchy:
  - the H2 «Вартість юридичних послуг з пенсійних питань»;
  - groups as H3;
  - services as H4;
  - «Інші послуги, необхідні для вирішення пенсійних питань» as an H3 after the groups.
- [x] Each service is a native `details`/`summary` element.
  - The row shows the title and the price.
  - «орієнтовно» appears under each of the 14 ranges and under none of the 3 fixed prices.
  - Below 640 px the price sits under the title. From 640 px it is right-aligned in the row.
  - Any number of rows can be open at once.
- [x] An open row shows, in the spec's order:
  - the «підійде» paragraphs;
  - the «що входить» list under the advocate's label for that service;
  - «Результат:»;
  - the notes;
  - «Вартість залежить від…»;
  - the link «Обговорити цю послугу →» to the consultation form.

  The price is not repeated inside.
- [x] «Інші послуги» is a card or highlight box, not a disclosure row, and has no price.
- [x] The list is one column at the narrow section width, with no group navigation above it. It uses the design system's card tokens and colours and reads as a price list. Nothing scrolls sideways at ~390 px.
- [ ] In Chrome, find-in-page for a word inside a collapsed row reveals that row.
- [x] The prerendered HTML of `/prices/` contains every service's full text and every group and service id.
- [x] The page's SEO entry is generated from the price-list data and registered under `prices`, and contains:
  - title «Вартість послуг пенсійного адвоката | Адвокат Поддяча Юлія»;
  - the advocate's description, verbatim;
  - keywords from her headings and service names;
  - canonical `https://www.advocate-pensia.com.ua/prices/`;
  - JSON-LD with a BreadcrumbList (Головна → Вартість послуг) and a WebPage tied to the site's `#website` and `#org`.
- [x] The sitemap has a `/prices/` entry after `/services/`: priority 0.9, monthly, lastmod on the implementation date.
- [x] In a browser at ~390 px and ~1280 px, every group, title, price and description on the page matches the advocate's draft. Screenshots go in Comments.
- [x] `npm run build:ssg` prints no `ERROR` lines, reports the baseline route count from ticket 01 plus 1, and every route writes its `index.html`.

## Comments

### 2026-10-12: implemented

- **Commits:**
  - `6d15fb3` feat(prices): add the price-list data module and price formatter
  - `668bc9a` feat(prices): add the /prices/ page with the price list
  - `2df8771` feat(prices): generate the price page's SEO entry and list it in the sitemap
  - `99157a1` feat(nav): add «Вартість» after «Послуги» in the navigation
- **Build at `99157a1`:** `npm run build:ssg` exits 0, prints 0 `ERROR` lines and no warnings, and ends with `Prerendered 111 static routes.` That is the baseline of 110 from ticket 01, plus 1. The CLAUDE.md check printed `all 111 routes written`. `npx tsc --noEmit -p tsconfig.app.json` is clean, and Prettier passes on every new file.
- **Check script:** `/private/tmp/claude-504/-Users-Leo-Documents-L-Angular-advocate-website/a4e0c721-b60c-4ee4-8390-645c896b41ab/scratchpad/checks/prices-02.mjs`. It ran against the production build served by `http-server` on :8081, over HTTP and in headless Chromium 151. Its expected values come from parsing the spec's table and the advocate's draft (`cost_of_services.md`), not from the app's data module. The last run's output is `checks/prices-02.out`.
  - Red, before any change: 6 passed, 21 failed. The 6 that passed only check the expectations themselves; `/prices/` returned 404.
  - Green: 82 passed, 0 failed.
  - Mutation run: set the year to 2027, dropped her bold from «до 50 хвилин», and made the formatter use a plain space. Eight checks went red: the header line (the page read «станом на 2027 рік»), the verbatim and bold check, and both amount checks at both widths. Every one of the 17 amounts changed when the one formatter changed. After reverting, all 82 passed again.
- **Compared against the draft, at 390 and 1280 px:**
  - **Groups:** the five group H3s show the spec's titles in order, with ids `konsultatsii` … `dokumenty-zaiavy-ta-zapyty`.
  - **Services:** the 17 H4s show the spec's titles in order. Each sits in the `summary` of a native `details` that carries its spec id, has no `name` attribute and starts closed.
  - **Prices:** each row's text is exactly «title price», plus «орієнтовно» under the price for a range. Every price equals both the draft's figure and the spec table's, written as NBSP thousands, an en dash and NBSP «грн». One fixed sample: «12 000–25 000 грн». There are 14 captions, all on ranges, and none on the three fixed prices (700, 700, 800). On the page, 17 amounts match that shape and none is written any other way.
  - **Description blocks:** with all 17 rows open at once, each row's paragraphs and list items equal the draft's blocks, item for item, in her order: «підійде» paragraphs, label, list, «Результат:», notes, «Вартість залежить…». The `<strong>` fragments in each row equal her `**bold**` fragments.
  - **Allowed edits only:**
    - the «Письмова консультація» headings became paragraphs;
    - the `\-` escapes in her draft became `-`;
    - the trailing spaces went.
  - **Inside an open row:** no «грн» appears. The last element is «Обговорити цю послугу →» to `/consultation`. Clicking it from the audit row opens «Запис на консультацію» with its form.
  - **Header:** the badge is `payments`, followed by the H1, her primary paragraph and her three secondary paragraphs verbatim. Then comes «Ціни актуальні станом на 2026 рік», with the year from the data, as the mutation run showed.
  - **Heading order:** H1, H2 «Вартість юридичних послуг з пенсійних питань», 5×(H3, H4…), then H3 «Інші послуги…».
  - **«Інші послуги»:** `#inshi-posluhy` is a `.highlight-box` after the last row, not a `details`. It holds her three paragraphs verbatim and no price.
  - **HTTP:** `/prices/` is prerendered and contains:
    - the title «Вартість послуг пенсійного адвоката | Адвокат Поддяча Юлія»;
    - her description, verbatim, 164 characters;
    - the canonical `https://www.advocate-pensia.com.ua/prices/`;
    - keywords with the H1, the H2 and all 17 service names;
    - JSON-LD with a BreadcrumbList (Головна → Вартість послуг) and a WebPage whose `isPartOf` is `#website` and `about` is `#org`;
    - all 23 ids;
    - every draft block, the intro and «Інші послуги», with the rows collapsed.
  - **Sitemap:** 110 URLs, with `/prices/` directly after `/services/` (2026-10-12, monthly, 0.9).
- **Layout:**
  - At 390 and 639 px the price sits under the title in all 17 rows. At 640 and 1280 px it sits beside the title, right-aligned.
  - No amount spans two line boxes.
  - Nothing scrolls sideways at 390 px, collapsed or with all rows open.
  - At 1280 px every row has the same left edge and is 900 px wide.
  - No link or nav sits between the H2 and the first group.
  - The rows use the card tokens: white, a `rgba(201,165,92,.2)` border, 12 px radius and the card shadow. Titles and amounts are brand green.
  - Collapsed, the list is 2724 px tall at 390 px, which is 3.8 screens below the fixed header.
- **Opening transition:** in Chromium 151 the row height grows over about 0.3 s (127 → 1235 px).
- **Menu fit, measured on the home page:**
  - At 900 px the eight items and «Ще» fill 778 of 836 px on one line. At 1280 px they fill 1115 of 1200.
  - «Ще» holds Документи, Інструкції and FAQ, and no label wraps.
  - A sweep (`pw/nav-sweep.js`) over 116 widths from 900 to 1440 px found no wrap. The tightest point is 58 px spare at 900, so the font and padding steps were not touched.
- **Slide-out menu and footer:**
  - At 390 px the slide-out menu lists all 11 items with «Вартість» third.
  - The footer lists the same 11 in config order at 390 and 1280. At 390 px «Навігація» flows into two columns, 6 and 5, beside «Послуги». The taller column over the shorter is 1.13, and no label wraps.
- **Breadcrumb:** «Головна › Вартість послуг» at both widths.
- **Find-in-page:** not ticked, because it cannot be driven headless. As a proxy, every collapsed row keeps its full text in the DOM, with no `display: none` on the body. **Manual check:** in Chrome on `/prices/`, press Cmd+F, type «архівні довідки», and confirm that «Комплексний супровід…» opens.
- **Decisions to review:**
  - The price list sits inside the header's patterned section, as «Основні послуги» does on `/services/`. A separate light section would have left a 100vh-tall header band, because `.page-bg-pattern` has `min-height: 100vh`.
  - The check-list marks are a CSS mask, not `mat-icon`. Otherwise their ligature text («check_circle») would be in the row text and in find-in-page results.
  - The chevron is an inline SVG, like the «Ще» menu's.
- **For ticket 03:** an en dash allows a line break after it. The list rows prevent this with `white-space: nowrap`. The FAQ answers are plain text, so a «12 000–25 000 грн» in them could still break after the dash.
- **Screenshots** in `/private/tmp/claude-504/-Users-Leo-Documents-L-Angular-advocate-website/a4e0c721-b60c-4ee4-8390-645c896b41ab/scratchpad/shots/02/`:
  - whole page, collapsed: `prices-390-collapsed.png`, `prices-1280-collapsed.png`
  - whole page, all 17 rows open: `prices-390-all-open.png`, `prices-1280-all-open.png`
  - the «Призначення пенсії» group with two rows open: `prices-390-two-open.png`, `prices-1280-two-open.png`
  - `prices-390-first-screen.png`, `prices-1280-list-screen.png`
  - menu: `menu-900.png`, `menu-1280.png`
  - slide-out menu and footer: `drawer-390.png`, `footer-390.png`
