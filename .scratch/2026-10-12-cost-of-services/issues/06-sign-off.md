# 06: Sign-off: sitemap lastmod and full verification pass

**What to build:** Once everything is merged, two things remain:
- the sitemap lastmod is updated for every existing page this work changed;
- the whole feature is verified on the production build served locally, as the spec's "Testing Decisions" describe.

This ticket is Leo's «готово». Spec: `.scratch/2026-10-12-cost-of-services/spec.md`, sections "SEO" (sitemap) and "Testing Decisions".

**Blocked by:** 03, 04, 05

**Status:** ready-for-human

- [x] lastmod is set to the commit date for:
  - the home page;
  - `/services/`;
  - `/faq/`;
  - the two edited articles.

  The `/prices/` entry is present.
- [x] `npm run build:ssg` prints no `ERROR` lines, reports the baseline route count recorded in ticket 01 plus 1, and every route writes its `index.html`. The anchor check from ticket 04 passes.
- [ ] On the preview server:
  - every sitemap URL returns prerendered HTML with its own title, description and canonical;
  - every internal link on the new and edited pages resolves.
- [x] The prerendered `/prices/` contains every service's full text and every anchor id. Its JSON-LD has a BreadcrumbList, a WebPage, an OfferCatalog whose 17 prices equal the visible ones, and a FAQPage with six questions.
- [ ] A browser pass at ~390 px and ~1280 px, plus the menu at exactly 900 px, finds the layout correct and the content matching the advocate's draft. It covers:
  - the whole price page: rows, «орієнтовно», several rows open, «Обговорити», «Інші послуги», cost factors, FAQ, closing section;
  - Chrome's find-in-page on a collapsed row;
  - the menu, the slide-out menu, the footer and the breadcrumb;
  - both article links;
  - the services, home and FAQ edits;
  - unchanged FAQ accordions elsewhere.
- [x] With a throttled phone network, the only defect seen is the accepted one: a row opened before Angular starts closes again when the page re-renders. There is no blank page and no lost scroll.
- [x] A report with screenshots goes in Comments.

## Comments

### 2026-10-12: sign-off pass

Two boxes stay unticked, for the reasons given below:
- the HTTP box: 9 sitemap URLs fail the title/description/canonical check, all for defects that predate this work;
- the browser-pass box: find-in-page cannot be driven headless. Everything else in that box passed.

- **Commit:** `b502c24` chore(sitemap): update lastmod for pages that now point to the price page. It sets lastmod 2026-10-12 on `/`, `/services/`, `/faq/` and the two articles (5 lines, nothing else). The `/prices/` entry was already present after `/services/` (2026-10-12, monthly, 0.9). Article `.seo.ts` dates are unchanged.
- **Build at `b502c24`:** `npm run build:ssg` exits 0, prints 0 `ERROR` lines and ends with `Prerendered 111 static routes.` That is the ticket 01 baseline of 110, plus 1. The route check printed `all 111 routes written`. The anchor check printed `all 223 fragment links resolve` and exited 0. Log: `/private/tmp/claude-504/-Users-Leo-Documents-L-Angular-advocate-website/a4e0c721-b60c-4ee4-8390-645c896b41ab/scratchpad/build-06.log`.
- **Seam:** the production build served by `npx http-server dist/advocate-website/browser -p 8090 -c-1 -s`, the same command as `npm run preview` on another port. For the throttled check only, the same files were served by `checks/06/gzip-serve.mjs` on :8091. It gzips text the way GitHub Pages does, so a throttled phone downloads ~320 kB of initial JS instead of the raw 2.7 MB. Both servers were stopped afterwards.
- **Scripts and outputs** are in `/private/tmp/claude-504/-Users-Leo-Documents-L-Angular-advocate-website/a4e0c721-b60c-4ee4-8390-645c896b41ab/scratchpad/checks/06/`. All expected values are typed from the spec and this ticket, never read from the app.

#### HTTP (`http-06.mjs` → `http-06.out`): 28 passed, 4 failed. All 4 failures predate this work.

- **Sitemap:** 110 unique URLs.
  - lastmod 2026-10-12 is on the five edited pages.
  - `/prices/` sits directly after `/services/`.
  - Exactly six entries carry 2026-10-12.
- **All 110 sitemap URLs:**
  - return 200 with prerendered HTML (an `h1` and the routed page inside `app-root`);
  - have a non-empty title and description.
- **The six pages of this work** (`/prices/`, `/services/`, `/`, `/faq/` and the two articles): each has its own title, description and canonical equal to its sitemap `loc`.
  - Only `/` fails uniqueness, because two other pages reuse its title and description (next item).
- **Failed, outside this work.** None of the source behind these pages changed since `8e3df3e^`, and the live site serves the same tags today.
  - `/privacy-policy/` and `/public-offer/` carry the home page's title, description and canonical `https://www.advocate-pensia.com.ua/`.
  - 5 articles have the origin twice in their canonical: `https://www.advocate-pensia.com.uahttps://www.advocate-pensia.com.ua/blog/<slug>` (no trailing slash). They are:
    - `pensiia-na-pilhovykh-umovakh-za-spyskom-1-dlia-zhinok-…`
    - `…-za-spyskom-2-dlia-cholovikiv-…`
    - `…-za-spyskom-2-dlia-zhinok-…`
    - `chy-zarakhovuietsia-viiskova-sluzhba-…`
    - `chomu-pensiinyi-fond-ne-zarakhovuie-periody-uchasti-…`
  - 2 articles have a canonical without the trailing slash:
    - `iak-zarakhovuiutsia-periody-roboty-za-spyskom-1-do-strakhovoho-stazhu`
    - `pilhova-pensiia-vodiiam-miskoho-pasazhyrskoho-transportu-…`
- **Prerendered `/prices/`:**
  - all 23 ids are present;
  - every one of the 17 rows holds its price and its full collapsed text;
  - both JSON-LD blocks parse.
- **JSON-LD on `/prices/`:**
  - BreadcrumbList Головна → Вартість послуг;
  - a WebPage with `isPartOf` `#website` and `about` `#org`;
  - an OfferCatalog with 17 Offers in spec order. Their URLs are `…/prices/#<id>`, and every UAH price equals the spec table: 3 `price`, 14 `minPrice`/`maxPrice`;
  - a FAQPage with 6 questions.
  - That these prices equal the visible ones is checked by `prices-03.mjs`, 60/60 (below).
- **Internal links, prerendered HTML:** the six pages carry 122 internal links. All return 200, and every fragment id exists on its target. The script did not follow external, `mailto:`, `tel:` or `viber:` links.

#### Browser (`browser-06.mjs` → `browser-06.out`): 24 passed, 0 failed. Headless Chromium 151.

- **In-app navigation from another route.** The prod build exposes no `ng` global. The real `Router` was reached through the click listener of a footer `routerLink`: zone.js keeps the listener on the element, and its closure holds the RouterLink. `router.navigateByUrl(...)` then ran after scrolling the start page to y = 600.
  - In every case the document is the same (a `window` marker survives) and the target lands exactly at the header bottom + 16 px.

  | From | To | 390 × 844 | 1280 × 800 |
  | --- | --- | --- | --- |
  | `/services/` | `/prices#audyt-pensiinoi-spravy` | top 148 (header 132), open, 1 open row | top 167 (header 151), open, 1 open row |
  | `/` | `/prices#pryznachennia-pensii` | top 148, no row open | top 167, no row open |
  | «Навіщо перевіряти…» article | `/prices#audyt-pensiinoi-spravy` | 148, open | 167, open |
  | «Скоро пенсія…» article | `/prices#pryznachennia-pensii` | 148, no row open | 167, no row open |

  Tapping «Вартість» in the menu at 1280 px, or in the slide-out menu at 390 px, from `/services/` keeps the same document and opens `/prices` at y = 0.
- **Rendered-DOM link sweep:** the six pages at 390 and 1280 px, with every `details` and FAQ panel open, render 35 distinct internal `href`s. All return 200, and every fragment id exists.
- **Menu at exactly 900 px on `/prices/`:**
  - the bar reads Головна, Послуги, Вартість, Судові рішення, Відгуки, Блог, Про мене, Контакти, then «Ще»;
  - all on one line, with no wrapped label;
  - «Вартість» is the active item;
  - «Ще» holds Документи, Інструкції, FAQ.
- **Price page at both widths:**
  - 17 rows start collapsed, with 14 «орієнтовно» captions;
  - nothing scrolls sideways;
  - three rows opened by real taps stay open together;
  - the closing section has «Звернення через форму та попереднє визначення вартості — безкоштовні.» and a single «Звернутися за консультацією» button to `/consultation`;
  - «Обговорити цю послугу →» in an open row opens «Запис на консультацію» with its form, at the top.
- **Slide-out menu and footer:** the slide-out menu at 390 px and the footer at both widths list the 11 items in config order.
- **Breadcrumb:** «Головна › Вартість послуг». At 390 px the home icon stands in for the word «Головна», because the shared breadcrumb component hides that label below 480 px.

#### Earlier tickets' checks, rerun on this build (`checks/06/regr-*.out`)

| Check | Result |
| --- | --- |
| `prices-02.mjs` (content against the draft, layout, menu, slide-out menu, footer, breadcrumb) | 78/82. The same 4 expected failures recorded since ticket 03: three more H2s, and 19 amounts. |
| `prices-03.mjs` (lower sections, JSON-LD equals visible prices) | 60/60 |
| `04/anchors-04.mjs` (fresh loads, late fonts, both article links) | 32/32 |
| `05/places-05.mjs` (services, home, FAQ edits) | 50/50 |
| `review/footer-nav-11.mjs` (footer, 11 items, every sitemap page) | 54/54 |
| `05/accordions-05.mjs`, compared with the pre-change capture `shots/05/before` (services, FAQ, instruction, court decision) | 30 screenshots. Only `faq-open-11` differs (1096 → 1180 px), which is the edited answer. |
| `05/accordions-05.mjs`, the `/prices/` accordion compared with `shots/05/before-prices` | 7/7 the same |

**Content against the draft:** it matches, with the edits already recorded:
- review fix `1eaeadd` ends the «Збір документів для пенсії» list with «.», where the draft (line 353) has «;»;
- ticket 03 joined the court FAQ answer's two paragraphs into one.

#### Throttled phone network (`throttle-06.mjs` → `throttle-06.out`): 20 passed, 0 failed

**Setup:**
- 390 × 844, touch, DPR 2.
- CDP network and CPU throttling, in two profiles:
  - Slow 4G: 150 ms RTT, 1.6 Mbps, CPU ×4;
  - DevTools 3G: 2 s RTT, 400 kbps, CPU ×4.
- Every painted frame was sampled through `requestAnimationFrame`.

**Timeline**, in ms from navigation start. In both profiles the prerendered page is fully under the loader until the page is back.

| | Slow 4G | 3G |
| --- | --- | --- |
| first paint (loader over the prerendered page) | 591 | 5 359 |
| Angular re-render starts | 5 967 | 27 061 |
| price page back | 6 150 | 27 192 |
| loader fade-out | 6 188 → 6 739 | 27 192 → 27 668 |

**Findings:**
- **No blank frame** in either profile, before or after Angular starts. Every painted frame shows the loader or the price page. The loader starts fading only once the page is back.
- **Accepted glitch, confirmed.** A row opened before Angular starts (`rozrakhunok-stazhu`, opened by script) is closed after the re-render, with 0 rows open.
  - A real tap on the first row before Angular starts hits `div#app-loader`, and the row stays closed. So by tapping, a visitor cannot reach the glitch.
- **No lost scroll once the page shows.** A 1500 px scroll made right after the loader leaves is still 1500 after network idle + 2 s. There is no upward jump in either profile.
- **Fresh loads on the throttled network:**
  - `/prices/#audyt-pensiinoi-spravy` lands at 148 (header 132 + 16), open, 1 row open;
  - `/prices/#pryznachennia-pensii` lands at 148, with no row open;
  - both in both profiles, after network idle, with no blank frame.
- **Observation for Leo, not counted as a failure.** A scroll made under the loader, before Angular starts, is reset to the top (1200 → 0).
  - The re-render shortens the page to 1498 px for a moment. Then the initial navigation's `scrollPositionRestoration: 'top'` smooth-scrolls to 0.
  - In a probe run, that scroll ran from 5 942 to about 6 400 ms, so it may overlap the first part of the loader's fade-out.
  - The visitor only sees the loader while scrolling, so no reading position is lost. This is app-wide behaviour, not specific to `/prices/`.
- **Info:** on 3G the loader stays up for about 22 s, from first paint to Angular. This is app-wide.

#### Not verified here

- **Chrome find-in-page on a collapsed row** cannot be driven headless. **Manual check for Leo:** in Chrome on `/prices/`, press Cmd+F, type «архівні довідки», and confirm that «Комплексний супровід звернення за призначенням пенсії» opens. As a proxy, every collapsed row keeps its full text in the prerendered HTML, as the HTTP check above shows.
- **Known, not fixed, unchanged:**
  - below 768 px, hovering the first link of the footer nav's second column grows the footer by 6–22 px (ticket 01);
  - Back into `/prices/#id` lands at the top. `anchors-04.mjs` still reports: row open, scrollY 0.

#### Screenshots

All in `/private/tmp/claude-504/-Users-Leo-Documents-L-Angular-advocate-website/a4e0c721-b60c-4ee4-8390-645c896b41ab/scratchpad/shots/06/`:
- **price page, 390 and 1280:**
  - `prices-<w>-full-collapsed.png`
  - `prices-<w>-three-open.png`
  - `prices-<w>-inshi-posluhy.png`
  - `prices-<w>-factors.png`
  - `prices-<w>-faq-court-open.png`
  - `prices-<w>-closing.png`
  - `prices-1280-first-screen.png`
  - `consultation-from-row-<w>.png`
- **navigation:**
  - `menu-900-prices.png`
  - `menu-900-more-open.png`
  - `drawer-390.png`
  - `footer-390.png`
  - `footer-1280.png`
- **in-app landings:** `inapp-{services,navishcho}-to-audyt-pensiinoi-spravy-<w>.png`, `inapp-{home,skoro}-to-pryznachennia-pensii-<w>.png`
- **edited pages:** `services-cost-<w>.png`, `home-cost-<w>.png`, `faq-cost-<w>.png`
- **throttled:** `throttle-{slow-4g,3g}-before-angular.png` (the loader), `throttle-{slow-4g,3g}-after-angular.png`, `throttle-{slow-4g,3g}-fresh-{audyt-pensiinoi-spravy,pryznachennia-pensii}.png`
- **regression captures:** `accordions/` and `footer-nav/`

**2026-10-12, waiting on Leo.** Commit: b502c24. Everything an agent can check passed (see the report above and the independent check recorded in tickets 01–05). Two items remain for Leo:
- Manual check in Chrome: on `/prices/` with every row closed, Cmd+F «архівні довідки» should open «Комплексний супровід звернення за призначенням пенсії».
- The four HTTP failures are older SEO defects, untouched by this work: `/privacy-policy/` and `/public-offer/` have no SEO entry and fall back to the home page's title, description and canonical; five articles have the domain twice in their canonical; two articles have a canonical without a trailing slash. They need their own ticket.
