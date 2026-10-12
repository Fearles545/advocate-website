# 03: Price page lower sections and structured data

**What to build:** Under the price list, the visitor finds three sections:
- what the cost depends on;
- six answers to common cost questions, with the same prices as the list;
- a dark closing section. It says that a request through the form and the попереднє визначення вартості are free, and has a gold «Звернутися за консультацією» button.

Search engines and AI assistants get two more things in the page's JSON-LD:
- an offer catalogue with every послуга and its price, generated from the same data the visitor sees;
- the six questions as an FAQ.

Spec: `.scratch/2026-10-12-cost-of-services/spec.md`, sections "Price page" (cost factors, FAQ, final call to action) and "SEO" (OfferCatalog, FAQPage).

**Blocked by:** 02

**Status:** resolved

- [x] The section «Від чого залежить вартість юридичних послуг» (H2) carries:
  - the advocate's lead paragraph;
  - her eight factors as an icon list, styled like the services page's check lists;
  - her closing sentence.

  All of it is verbatim.
- [x] The section «Поширені питання про вартість послуг» (H2) shows the advocate's six questions verbatim in the shared FAQ accordion.
  - The answers about the consultation price and the court-support price take their amounts from the price data.
  - Changing the consultation price in the data changes both the list row and the FAQ answer. Try it and revert, and note the result in Comments.
- [x] The dark closing section «Як дізнатися вартість послуги у вашій ситуації?» (H2) holds:
  - the advocate's two paragraphs;
  - «Звернення через форму та попереднє визначення вартості — безкоштовні.» directly above the button;
  - a gold primary button «Звернутися за консультацією» that opens the consultation form.
- [x] Section backgrounds alternate as the design system prescribes. At ~390 px and ~1280 px the lower sections look consistent with the services page and nothing scrolls sideways. Screenshots go in Comments.
- [x] The page's JSON-LD (in the prerendered HTML) parses as JSON and contains:
  - the BreadcrumbList and WebPage from ticket 02;
  - an OfferCatalog. It is a standalone node offered by `#org`, with 17 Offers.
    - Each Offer's offered item is a Service named with the service title.
    - Each Offer's URL is `https://www.advocate-pensia.com.ua/prices/#<service id>`.
    - Each Offer has a PriceSpecification in UAH: `price` for the three fixed amounts, `minPrice`/`maxPrice` for the fourteen ranges.
    - Every number equals the visible price.
  - a FAQPage with the six questions and their answers as plain text.
- [x] The site-wide OfferCatalog in the root HTML document is unchanged.
- [x] `npm run build:ssg` prints no `ERROR` lines, and every route writes its `index.html`.

## Comments

### 2026-10-12: implemented

- **Commits:**
  - `b5ca12d` feat(prices): add the «Від чого залежить вартість» section
  - `7946ea2` feat(prices): add the cost FAQ with amounts from the price list
  - `42695db` feat(prices): add the dark closing call to action
  - `642f20c` feat(prices): add the offer catalogue and cost FAQ to the page's JSON-LD
- **Build at `642f20c`:** `npm run build:ssg` exits 0, prints 0 `ERROR` lines and no warnings, and ends with `Prerendered 111 static routes.` The CLAUDE.md check printed `all 111 routes written`. `npx tsc --noEmit -p tsconfig.app.json` is clean, and Prettier passes on `src/app/prices/`. The repo has no ESLint config, so there is no lint to run.
- **Check script:** `/private/tmp/claude-504/-Users-Leo-Documents-L-Angular-advocate-website/a4e0c721-b60c-4ee4-8390-645c896b41ab/scratchpad/checks/prices-03.mjs`. It ran against the production build served by `http-server` on :8082, over HTTP and in headless Chromium 151. Port 8081 was taken by another project's `ng serve`. Expected values come from the advocate's draft, the spec's table and this ticket, not from the app's data module. The last run's output is `checks/prices-03.out`.
  - Each slice went red first, then green: factors 6 red, FAQ 13 red, closing section 18 red, JSON-LD 11 red.
  - Final run: 60 passed, 0 failed.
  - Ticket 02's `prices-02.mjs` still passes 78 of 82. The 4 that fail are expected. Its whole-page heading list now has 3 more H2s after «Інші послуги». Its count of amounts on the page is now 19, which is the 17 rows plus the 2 FAQ answers.
- **Compared against the draft, at 390 and 1280 px:**
  - **Cost factors:** the section's `p` and `li` equal draft lines 388–401 in order: her lead, «На вартість можуть впливати:», her 8 factors, and her closing sentence.
    - The 8 items are a check list with the same icon as the services page's check lists: `rgb(187, 146, 92)`, 16 × 16 px, and 15.2 px text.
    - The price rows' list styles became a shared `.check-list` class.
  - **FAQ:** the shared accordion shows her 6 questions verbatim and in order. Opened one at a time, each answer equals her text. Two allowed edits apply: her bold markers are gone, and amounts are spaced by the formatter.
    - The consultation answer quotes the list row's «700 грн». The court answer quotes the list row's «12 000–25 000 грн».
    - The answers carry no `<strong>`.
    - **Deviation:** the court answer's two paragraphs are joined by a space into one, because the shared accordion renders a single plain-text `<p>`.
  - **No wrap inside a FAQ amount:** I chose a word joiner (U+2060) after the en dash, added by a new `formatPriceInText`. Only the visible FAQ uses it, so the list and the JSON-LD keep plain `formatPrice`.
    - A sweep checked every viewport width from 300 to 480 px, and every third width from 481 to 1280, with each price answer open.
    - Before the joiner, «12 000–25 000 грн» broke after the dash at 350–353 px. With it, no amount spans two line boxes, across 362 + 534 measurements.
    - The check compares the visible answers with the joiner stripped.
  - **Closing section:** it is the page's last section and dark, with the same background as the services page's closing section and a gold H2.
    - Its paragraphs are exactly her two (draft lines 435 and 437), then «Звернення через форму та попереднє визначення вартості — безкоштовні.».
    - The button is the sentence's next element, 16 px below it. It reads «Звернутися за консультацією», goes to `/consultation/`, is the section's only link, and has the same gold gradient as the services page's closing button.
    - Clicking it opens «Запис на консультацію» with its form.
  - **Headings:** after the H3 «Інші послуги…» come exactly the three H2s: factors, FAQ, closing. The page has one H1.
- **Consultation price experiment:** I set `usna-konsultatsiia` to 1250 in `price-list.ts`, rebuilt, and ran `checks/consult-price-03.mjs`:
  - list row «Усна консультація з пенсійного питання 1 250 грн»;
  - visible FAQ «…коштує 1 250 грн.»;
  - JSON-LD Offer `"price":1250`;
  - JSON-LD FAQ answer «…коштує 1 250 грн.».

  In `prices-03.mjs`, only the 5 checks pinned to her 700 went red. The checks that the FAQ quotes the list and that the JSON-LD equals the visible prices stayed green. After `git checkout` and a rebuild, all four read 700 again and all 60 checks pass.
- **JSON-LD:** checked over HTTP in the prerendered `/prices/index.html`.
  - `#app-jsonld` parses, and its `@graph` is BreadcrumbList, WebPage, OfferCatalog, FAQPage.
  - The BreadcrumbList and WebPage are unchanged from ticket 02.
  - The OfferCatalog is a standalone node `…/prices/#offer-catalog` with `numberOfItems` 17. Its 17 Offers follow the spec order, and each one has:
    - `offeredBy {"@id": ".../#org"}`, as decided in the main loop, because schema.org gives `offeredBy` to Offer, not to OfferCatalog;
    - `itemOffered`, a Service named with the title;
    - `url` `…/prices/#<id>`;
    - a UAH `PriceSpecification`, with `price` on the 3 fixed amounts and `minPrice`/`maxPrice` on the 14 ranges.
  - The numbers equal the spec table. In the browser, every row's visible amount parses to the same numbers.
  - The FAQPage `…/prices/#faq` holds her 6 questions. The answers equal the expected text and the visible answers, minus the joiner. They have no tags, no `**` and no invisible characters. They keep the NBSPs the formatter puts in amounts.
- **Root catalogue:** `git diff 357baa2 -- src/index.html` is empty. The root JSON-LD served on `/` and on `/prices/` parses equal to the pre-ticket `src/index.html`, which is saved at `/private/tmp/claude-504/-Users-Leo-Documents-L-Angular-advocate-website/a4e0c721-b60c-4ee4-8390-645c896b41ab/scratchpad/checks/03/src-index-baseline.html`.
- **Layout:** the sections run as follows, matching the services page's light gradients:
  1. patterned header and list;
  2. factors, white to cream;
  3. FAQ, cream to white;
  4. the dark closing section.

  Each lower section has a 1 px gold top line. Nothing scrolls sideways at 390 or 1280 px with the court answer open. At 768 px and wider, the factors list runs in two columns, read row by row in her order.
- **Screenshots** in `/private/tmp/claude-504/-Users-Leo-Documents-L-Angular-advocate-website/a4e0c721-b60c-4ee4-8390-645c896b41ab/scratchpad/shots/03/`:
  - lower sections: `prices-390-lower-sections.png`, `prices-1280-lower-sections.png`
  - factors: `prices-390-factors.png`, `prices-1280-factors.png`
  - FAQ with the court answer open: `faq-390-court-open.png`, `faq-1280-court-open.png`
  - closing section: `prices-390-cta.png`, `prices-1280-cta.png`
  - whole page: `prices-390-full.png`, `prices-1280-full.png`

**2026-10-12, resolved.** Commits: b5ca12d, 7946ea2, 42695db, 642f20c. `offeredBy: #org` sits on each Offer rather than on the OfferCatalog, because schema.org defines it on Offer; the catalogue is a standalone node with its own `@id`. Independent check on the final build (83d42ca): `npm run build:ssg` printed 0 `ERROR` lines and `Prerendered 111 static routes`; every route wrote its `index.html`; the anchor check printed `all 223 fragment links resolve`; the 17 rows of the prerendered `/prices/` match the spec table in order, id, title, price and «орієнтовно» caption; 248 lines of the advocate's draft were found in the prerendered page, the only misses being headings markers, the per-service price lines the spec moves into the row, the draft's notes and the agreed «;» → «.» fix.
