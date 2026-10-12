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

- [ ] The navigation config has «Вартість» → `/prices/` right after «Послуги».
  - The desktop menu shows it in that place and keeps «Документи», «Інструкції» and «FAQ» under «Ще».
  - The slide-out menu and the footer show it in the same place.
- [ ] At exactly 900 px and at ~1280 px, the desktop menu's eight items and «Ще» fit on one line. The existing narrow-width font and padding steps are tightened only if needed.
- [ ] The breadcrumb on the page reads «Головна › Вартість послуг».
- [ ] The price-list data module holds:
  - the year 2026;
  - the five groups, with the ids, titles and order from the spec's table;
  - the 17 services, with the ids, titles, order and prices from the spec's table;
  - each service's description blocks, verbatim from the advocate's draft and with her bold kept (only the edits listed in "Text handling" are allowed);
  - the «Інші послуги» note.
- [ ] Every amount on the page is produced by one formatter: thousands separated by a non-breaking space, ranges joined by an en dash, and «грн» attached by a non-breaking space. No amount wraps at ~390 px.
- [ ] The page header has:
  - the `payments` badge;
  - the H1 «Вартість послуг пенсійного адвоката»;
  - the advocate's intro, with the secondary paragraphs;
  - «Ціни актуальні станом на 2026 рік», with the year taken from the data.
- [ ] The headings follow the spec's hierarchy:
  - the H2 «Вартість юридичних послуг з пенсійних питань»;
  - groups as H3;
  - services as H4;
  - «Інші послуги, необхідні для вирішення пенсійних питань» as an H3 after the groups.
- [ ] Each service is a native `details`/`summary` element.
  - The row shows the title and the price.
  - «орієнтовно» appears under each of the 14 ranges and under none of the 3 fixed prices.
  - Below 640 px the price sits under the title. From 640 px it is right-aligned in the row.
  - Any number of rows can be open at once.
- [ ] An open row shows, in the spec's order:
  - the «підійде» paragraphs;
  - the «що входить» list under the advocate's label for that service;
  - «Результат:»;
  - the notes;
  - «Вартість залежить від…»;
  - the link «Обговорити цю послугу →» to the consultation form.

  The price is not repeated inside.
- [ ] «Інші послуги» is a card or highlight box, not a disclosure row, and has no price.
- [ ] The list is one column at the narrow section width, with no group navigation above it. It uses the design system's card tokens and colours and reads as a price list. Nothing scrolls sideways at ~390 px.
- [ ] In Chrome, find-in-page for a word inside a collapsed row reveals that row.
- [ ] The prerendered HTML of `/prices/` contains every service's full text and every group and service id.
- [ ] The page's SEO entry is generated from the price-list data and registered under `prices`, and contains:
  - title «Вартість послуг пенсійного адвоката | Адвокат Поддяча Юлія»;
  - the advocate's description, verbatim;
  - keywords from her headings and service names;
  - canonical `https://www.advocate-pensia.com.ua/prices/`;
  - JSON-LD with a BreadcrumbList (Головна → Вартість послуг) and a WebPage tied to the site's `#website` and `#org`.
- [ ] The sitemap has a `/prices/` entry after `/services/`: priority 0.9, monthly, lastmod on the implementation date.
- [ ] In a browser at ~390 px and ~1280 px, every group, title, price and description on the page matches the advocate's draft. Screenshots go in Comments.
- [ ] `npm run build:ssg` prints no `ERROR` lines, reports the baseline route count from ticket 01 plus 1, and every route writes its `index.html`.

## Comments
