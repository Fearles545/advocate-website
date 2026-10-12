# Spec: «Вартість послуг» price page

Status: ready-for-agent

## Problem Statement

On 2026-10-12 the advocate asked for a new page, «Вартість послуг», with the prices of her services. She sent a draft of its text, its SEO title and description, and notes on where the rest of the site should point to it.

From a visitor's side today:

- The site publishes no prices anywhere. The services page, the home page, the FAQ page and the public offer all say the cost «визначається індивідуально» and is agreed after a consultation. A pensioner who wants to know roughly what help will cost has to write or call first, and many will not.
- The visitor cannot tell what a given piece of work includes or what they get at the end. They also cannot tell which of several similar services they need, for example a document check versus full support with the pension application.
- Most visitors come from a phone. A list of 17 services, each with its scope, result and price factors, would be 25 to 30 screens long if shown in full.
- A visitor reading an article about preparing a pension application or auditing a pension file has no path from the article to the price of that exact service.
- The footer's «Навігація» list is a hand-made copy of the menu. It has already drifted: «Про мене», «Інструкції» and «FAQ» are missing from it.

## Solution

A new page at `/prices/`, labelled «Вартість» in the main menu, right after «Послуги». The page is built in the site's existing visual language.

- The page opens with the signature page header, the advocate's introduction and the line «Ціни актуальні станом на 2026 рік».
- The 17 services are grouped into five **групи послуг**. Each **послуга** is one collapsed row showing its name and price, with «орієнтовно» under every range. Tapping a row reveals its full description:
  - who it suits;
  - what it includes;
  - the result;
  - what is not included;
  - what the cost depends on;
  - a link «Обговорити цю послугу →».
  
  Several rows can be open at once, so two services can be compared side by side. In the collapsed state the whole price list fits in about three to four phone screens.
- After the groups come:
  - the «Інші послуги» note;
  - a section on what the cost depends on;
  - six questions about cost;
  - a closing call to action. It states that a request through the form and the **попереднє визначення вартості** are free.
- The page carries machine-readable prices for search engines and AI assistants: an offer catalogue with every price, and the six questions as an FAQ.
- The services page, the home page and the FAQ page replace their «визначається індивідуально» texts with the advocate's new wording and a link to the new page.
- Two articles get one sentence each that links straight to the relevant part of the price list.
- The footer's «Навігація» list is rendered from the same source as the menu, so it can never drift again.

## User Stories

1. As a pensioner on a phone, I want a «Вартість» item in the main menu, so that I can find prices without guessing which page holds them.
2. As a visitor on a desktop, I want «Вартість» in the top menu next to «Послуги», so that prices sit where I expect them.
3. As a visitor on a phone, I want «Вартість» in the slide-out menu in the same order as on desktop, so that the site feels the same on every device.
4. As a visitor who has scrolled to the bottom of any page, I want the footer to list every section of the menu, including «Вартість», «Про мене», «Інструкції» and «FAQ», so that I can move on without scrolling back up.
5. As a visitor arriving on the price page, I want a clear heading and a short introduction saying the prices are indicative and the final cost is agreed before work starts, so that I read the numbers correctly.
6. As a visitor, I want to see that the prices are current for 2026, so that I trust they are not years old.
7. As a visitor on a phone, I want every service's name and price visible without opening anything, so that I can scan the whole price list in a few screens.
8. As a visitor, I want the services split into groups (Консультації; Призначення пенсії; Перерахунок і перевірка призначеної пенсії; Оскарження рішень ПФУ та суд; Документи, заяви та запити), so that I find my kind of problem quickly.
9. As a visitor, I want ranged prices marked «орієнтовно» and fixed prices shown as a single amount, so that I know which prices are exact.
10. As a visitor, I want amounts written as «12 000–25 000 грн», never broken across lines, so that I read them at a glance.
11. As a visitor, I want to tap a service to see who it suits, what it includes, what I get as a result, and what the price depends on, so that I understand what I would be paying for.
12. As a visitor comparing two services, I want both to stay open at the same time, so that I can compare what each includes.
13. As a visitor on a phone, I want opening one service not to close another above it, so that the page does not jump under my finger.
14. As a visitor, I want the exclusions stated inside each service (for example, that court fees or archive requests are paid separately), so that I am not surprised later.
15. As a visitor who has read a service, I want a «Обговорити цю послугу →» link right there, so that I do not have to scroll past the rest of the list to act.
16. As a visitor whose need is not on the list, I want an «Інші послуги» note saying the list is not exhaustive and the cost of other work is set individually, so that I still get in touch.
17. As a visitor, I want a section listing what the cost depends on, so that I understand why most prices are ranges.
18. As a visitor, I want answers to common cost questions on the page (how much a consultation costs, how much court support costs, why prices are indicative, when I learn the exact price, whether I can order a single service, whether the court fee is included), so that I do not need to ask.
19. As a visitor, I want the FAQ answers to quote the same prices as the list, so that the page never contradicts itself.
20. As a visitor, I want to be told plainly that a request through the form and the попереднє визначення вартості are free, so that I am not afraid to press the button.
21. As a visitor at the end of the page, I want a «Звернутися за консультацією» button leading to the request form, so that I can ask about my situation.
22. As a visitor on a desktop, I want the price list in one readable column with each price aligned to the right of its name, so that the page does not feel stretched.
23. As a visitor on a narrow phone, I want long service names to wrap with the price beneath them, so that nothing is cut off or overflows sideways.
24. As a reader of the article «Скоро пенсія за віком…», I want a sentence in the part about submitting documents that links to the «Призначення пенсії» group of the price list, so that I see what that help costs.
25. As a reader of the article «Навіщо перевіряти пенсійну справу…», I want a sentence after the explanation of full versus partial audit that opens the audit service on the price page, so that I land on exactly that price.
26. As a visitor following such a link, I want the target to appear fully below the fixed header, already expanded if it is a service, so that I do not have to hunt for it.
27. As a visitor using the browser's find-in-page, I want a word inside a collapsed service to be found and revealed, so that collapsed text is not invisible to search.
28. As a visitor on the services page, I want its «Вартість юридичних послуг» section to describe what the price page offers and to have a «Переглянути вартість послуг» button, so that I can go from the description of a service to its price.
29. As a visitor on the home page, I want the «Вартість юридичних послуг» block to explain what affects cost and link to the price page, so that the home page no longer says only «індивідуально».
30. As a visitor on the FAQ page, I want the answer to «Скільки коштують послуги адвоката?» to point me to the price page with a link, so that the answer is up to date.
31. As a visitor, I want the breadcrumb on the price page to read «Головна › Вартість послуг», so that I know where I am.
32. As a searcher on Google, I want the result for the page to show «Вартість послуг пенсійного адвоката | Адвокат Поддяча Юлія» and the advocate's description, so that I recognise it as a price page.
33. As a search engine, I want the prerendered page to contain all service text, collapsed or not, so that the whole page is indexed.
34. As a search engine or AI assistant, I want an offer catalogue with each service's name, its price or price range in UAH and its link, so that I can answer «скільки коштує пенсійний адвокат» from the source.
35. As a search engine, I want the six cost questions marked up as an FAQ and the page's breadcrumb marked up, so that the page is understood like the site's other pages.
36. As a search engine, I want `/prices/` listed in the sitemap, and the lastmod dates of the edited pages updated, so that I crawl the changes.
37. As a screen-reader user, I want each service to be a native disclosure control that announces whether it is expanded, so that I can browse the list by keyboard.
38. As a screen-reader user, I want the page's headings to follow one hierarchy (page, price list, group, service), so that heading navigation reflects the structure.
39. As the advocate, I want my wording kept verbatim, with only formatting artefacts and number spacing fixed, so that the page says exactly what I committed to.
40. As the advocate, I want to change a price or the year in one place and have the list, the FAQ answers and the machine-readable catalogue follow, so that they never disagree.
41. As the advocate, I want the public offer left unchanged, so that legal text changes only when I write it.
42. As a future maintainer or agent, I want each group and service to have a fixed anchor id that does not depend on its title, so that renaming a service does not break links from articles.
43. As a future maintainer or agent, I want a build-time check that every internal `#anchor` link points to an existing id, so that a broken link from an article is caught before deploy.
44. As a future maintainer, I want the footer navigation to come from the same configuration as the menu and the slide-out menu, so that a new section needs to be added only once.

## Implementation Decisions

### Price list data

- A new typed data module holds the whole price list:
  - the year the prices are current for (2026);
  - an ordered list of the five групи послуг, each with a fixed anchor id, its title and an ordered list of its послуги;
  - the «Інші послуги» note as separate data with no price.
- Each послуга has:
  - a fixed anchor id;
  - its title;
  - a price, which is either a single fixed amount or an орієнтовна вартість range with a minimum and maximum, as numbers in UAH;
  - its description blocks: the «підійде» paragraphs, the label and items of the «що входить» list, the «результат» paragraph, any notes, and the «вартість залежить від» paragraph.
- The advocate's text keeps her inline bold. Paragraphs are stored as trusted HTML strings, the same way the instructions data stores formatted text.
- Anchor ids are explicit fields, never derived from titles. Group ids:
  - `konsultatsii`
  - `pryznachennia-pensii`
  - `pererakhunok-i-perevirka-pensii`
  - `oskarzhennia-rishen-pfu-ta-sud`
  - `dokumenty-zaiavy-ta-zapyty`

  The «Інші послуги» id is `inshi-posluhy`.
- Groups, order, service ids and prices, as the advocate approved them:

  | Група послуг | Послуга | id | Вартість, грн |
  | --- | --- | --- | --- |
  | Консультації | Усна консультація з пенсійного питання | `usna-konsultatsiia` | 700 |
  | | Письмова консультація / правовий висновок | `pysmova-konsultatsiia` | 2 000–4 000 |
  | | Розрахунок страхового, пільгового або спеціального стажу | `rozrakhunok-stazhu` | 1 500–2 000 |
  | Призначення пенсії | Перевірка документів перед зверненням за призначенням пенсії | `perevirka-dokumentiv-pered-zvernenniam` | 2 500–4 000 |
  | | Подання документів на призначення пенсії до Пенсійного фонду України | `podannia-dokumentiv-na-pryznachennia` | 2 500–3 500 |
  | | Комплексний супровід звернення за призначенням пенсії | `kompleksnyi-suprovid-pryznachennia` | 5 500–7 000 |
  | | Замовлення пенсійного посвідчення | `pensiine-posvidchennia` | 700 |
  | Перерахунок і перевірка призначеної пенсії | Перевірка (аудит) пенсійної справи | `audyt-pensiinoi-spravy` | 1 500–3 500 |
  | | Супровід звернення за перерахунком пенсії | `suprovid-pererakhunku` | 3 000–6 000 |
  | Оскарження рішень ПФУ та суд | Аналіз рішення або відмови Пенсійного фонду України | `analiz-rishennia-pfu` | 1 500–3 500 |
  | | Судовий супровід у справах проти Пенсійного фонду України | `sudovyi-suprovid` | 12 000–25 000 |
  | Документи, заяви та запити | Перевірка документів та подання на оцифрування | `otsyfruvannia-dokumentiv` | 2 500–3 000 |
  | | Підготовка заяви до Пенсійного фонду України | `zaiava-do-pfu` | 1 500–3 000 |
  | | Підготовка та подання анкети на зміну анкетних даних | `zmina-anketnykh-danykh` | 800 |
  | | Складання запиту для отримання уточнюючих довідок | `zapyt-utochniuiuchykh-dovidok` | 1 500–2 500 |
  | | Збір документів для пенсії | `zbir-dokumentiv` | 1 500–7 000 |
  | | Підготовка та направлення адвокатського запиту | `advokatskyi-zapyt` | 2 000–4 000 |

- Exactly three prices are fixed (700, 700, 800). The other fourteen are ranges.
- One formatter turns a price into display text. It groups thousands with a non-breaking space, joins a range with an en dash, and appends «грн» after a non-breaking space, so a price never wraps. The visible list, the FAQ answers and the structured data all use the same data. The structured data uses the raw numbers.

### Price page

- A new top-level route `/prices/`, prerendered like every other route. It uses the site's signature page header pattern: the pattern background, a `payments` badge, the H1 «Вартість послуг пенсійного адвоката», the advocate's introduction as the primary intro, and the remaining intro paragraphs plus «Ціни актуальні станом на {year} рік» as secondary intro text.
- Heading hierarchy:
  - H1 is the page title.
  - The H2 «Вартість юридичних послуг з пенсійних питань» heads the price list. Each група послуг is an H3 and each послуга an H4. «Інші послуги, необхідні для вирішення пенсійних питань» is an H3 after the groups.
  - The H2 «Від чого залежить вартість юридичних послуг», the H2 «Поширені питання про вартість послуг» and the H2 «Як дізнатися вартість послуги у вашій ситуації?» follow.
- Section order and rhythm follow the services page and the design system's alternating light and dark sections:
  1. header;
  2. price list (light);
  3. cost factors;
  4. FAQ, using the shared FAQ accordion;
  5. the final call to action (dark, gold primary button).
- The price list is a single column at the design system's narrow section width. There is no group navigation above it.
- Each послуга is a native disclosure element: `details` and `summary`.
  - The `summary` row shows the title (H4) and the price. Under every range price it shows a small «орієнтовно» caption; under fixed prices it shows none.
  - Below 640px the price sits under the title. At 640px and wider it is right-aligned on the same row.
  - The rows are not grouped into an exclusive set, so any number can be open.
  - Opening uses a CSS-only transition where the browser supports it. Elsewhere the row opens without animation.
- The expanded panel shows, in this order:
  - the «підійде» paragraphs and any scheduling or preparation paragraphs;
  - the «що входить» list under the advocate's label for that service (it varies: «Що входить у консультацію», «Що може входити у послугу», and others);
  - the «Результат:» paragraph;
  - the notes;
  - the «Вартість залежить від…» paragraph;
  - a text link «Обговорити цю послугу →» to the consultation form.
  
  The price is not repeated inside the panel.
- The rows use the design system's card tokens (white, gold-tinted border, card shadow and radius) and its colours: the title in brand green, and the price in brand green with a gold accent. They must read as a price list, distinct from the Material FAQ accordion further down the page.
- «Інші послуги» is rendered as a closing card or highlight box under the groups. It is not a disclosure row and has no price.
- The cost factors section carries the advocate's lead paragraph, her eight factors as an icon list in the style of the services page's check lists, and her closing sentence about agreeing scope and cost before work.
- The FAQ holds the advocate's six questions verbatim. The answers to «Скільки коштує консультація пенсійного адвоката?» and «Скільки коштує судовий супровід у справі проти Пенсійного фонду України?» take their amounts from the price data.
- The final call to action holds:
  - the advocate's two paragraphs;
  - the added sentence «Звернення через форму та попереднє визначення вартості — безкоштовні.» directly above the button;
  - a gold primary button «Звернутися за консультацією» to the consultation form.

### Anchors and fragment navigation

- Every group heading and every service carries its fixed id in the prerendered HTML.
- When the page is entered with a fragment:
  - a service id opens that service and scrolls it fully into view below the fixed header;
  - a group id scrolls to the group heading without opening anything.
  
  Scrolling follows the project's documented fixed-header anchor recipe.
- Article links are plain anchors that load the page from scratch. The page runs without client hydration, so Angular re-renders the prerendered DOM on start. Fragment handling must therefore run after the application has rendered, on initial load and on in-app navigation alike.
- Known, accepted glitch: a row a visitor opens before Angular starts is closed again when Angular re-renders the page.

### SEO

- The page's SEO entry is generated from the price data, in the same way the court decision and instruction SEO entries are generated, and registered under the `prices` route key:
  - title: «Вартість послуг пенсійного адвоката | Адвокат Поддяча Юлія»;
  - description: the advocate's meta description, verbatim;
  - keywords: drawn from her headings and service names;
  - canonical: `/prices/`.
- The page's JSON-LD graph contains:
  - a BreadcrumbList (Головна → Вартість послуг);
  - a WebPage that is part of the site's WebSite node and about its organisation node (`#org`);
  - an OfferCatalog. It is a standalone node offered by `#org` and holds one Offer per послуга. Each Offer has the service as the offered item and a PriceSpecification in UAH: a single price for fixed amounts, minPrice and maxPrice for ranges. Each Offer's URL is the page URL plus that service's anchor;
  - a FAQPage with the six questions and their answers as plain text.
- The site-wide OfferCatalog embedded in the root HTML document stays as it is.
- The breadcrumb label for the `prices` segment is «Вартість послуг».
- The sitemap gets a `/prices/` entry next to the services page: priority 0.9, monthly, lastmod on the date of implementation. The lastmod dates of the home page, `/services/`, `/faq/` and the two edited articles move to the same date.

### Navigation

- The navigation config gains «Вартість» → `/prices/`, placed right after «Послуги». The desktop menu keeps «Документи», «Інструкції» and «FAQ» under «Ще».
- At a 900px viewport, the narrowest width with the desktop menu, the eight top-level items and «Ще» must fit on one line. If they do not, tighten the existing narrow-width font and padding steps.
- The slide-out menu already renders the whole navigation config, so it gains the item automatically.
- The footer's «Навігація» list is rendered from the navigation config instead of hard-coded links. It shows all items, «Ще» items included, in config order.
- On phones the «Навігація» and «Послуги» columns sit side by side. The longer list (11 items) must not leave the two columns badly unbalanced. If it does, the navigation list may flow into two columns on narrow screens.

### Shared FAQ accordion

- The shared FAQ item gains an optional link (label and route). When present, it is rendered under the answer as an arrow link in the site's link style. Existing callers are unaffected.
- Answers stay plain text.

### Other pages

- **Services page, section «Вартість юридичних послуг».** The H2 stays. The paragraph is replaced by the advocate's two paragraphs, keeping her bold fragment. The «Записатися на консультацію» button is replaced by a primary button «Переглянути вартість послуг» to `/prices/`.
- **Home page, FAQ block «Вартість юридичних послуг»** inside the collapsible SEO section. The heading stays. Both paragraphs are replaced by the advocate's paragraph. An arrow link «Переглянути вартість послуг» to `/prices/` is added.
- **FAQ page, «Скільки коштують послуги адвоката?».** The answer becomes «Вартість юридичних послуг залежить від виду послуги, складності пенсійного питання та обсягу необхідної роботи. Орієнтовну вартість консультацій, перевірки документів і стажу, звернення до ПФУ, судового супроводу та інших послуг можна переглянути на сторінці «Вартість послуг».», with the new FAQ link to `/prices/`. The copy of this answer in the FAQ page's JSON-LD gets the same text.
- **Article «Скоро пенсія за віком: що потрібно зробити до звернення в Пенсійний фонд України».** Add a sentence at the end of the section «Чи можу я допомогти безпосередньо з поданням документів на пенсію»: «Орієнтовну вартість перевірки документів та супроводу звернення за призначенням пенсії можна переглянути у розділі «Вартість послуг».» The words «Вартість послуг» link to `/prices/#pryznachennia-pensii`.
- **Article «Навіщо перевіряти пенсійну справу після призначення пенсії».** Add a sentence at the end of the section «Повна або часткова перевірка пенсійної справи - що обрати»: «Орієнтовну вартість повної або часткової перевірки пенсійної справи дивіться у розділі «Вартість послуг».» The words «Вартість послуг» link to `/prices/#audyt-pensiinoi-spravy`.
- In both articles the link is written like the articles' existing internal links: a root-relative `href` with a trailing slash before the fragment.
- The articles' published and modified dates do not change.

### Text handling

- The advocate's wording is used verbatim.
- Allowed edits:
  - the «Письмова консультація» block, which her draft formats as headings, becomes ordinary paragraphs;
  - amounts get thousands spacing;
  - chat-assistant commentary and `utm_source=chatgpt.com` links in her draft are not carried over.
- Any other wording change needs her approval.

### Build check

- The project's build instructions gain a one-line post-build check, next to the existing «every route written» check. It scans the built site and fails if any internal link with a fragment (`/path/#id`) points to a page whose built HTML has no element with that id. It covers prerendered pages and the article HTML fragments. It runs as a documented command, not through a new test runner.

## Testing Decisions

- **The seam.** One seam: the production build served locally (`npm run build:ssg`, then `npm run preview`). These are the same static files GitHub Pages serves. Builds may run as often as needed.
- **What a good check looks at.** Only external behaviour, compared against the advocate's source document: what a visitor sees and can tap, and what a crawler receives. Never internals.
- **Driver 1: a real browser**, driven by the agent, at a phone viewport (~390 px) and a desktop viewport (~1280 px), plus the menu at exactly 900 px.
  - **Price page:**
    - every group, service, price, «орієнтовно» caption and description block matches the source, in the approved order;
    - amounts never wrap;
    - nothing overflows sideways on the phone;
    - several rows open at once;
    - «Обговорити цю послугу →» reaches the form;
    - the FAQ shows the six questions with the same prices as the list;
    - the final call to action shows the free-request sentence and the gold button;
    - Chrome's find-in-page reveals text inside a collapsed row.
  - **Navigation:**
    - «Вартість» sits after «Послуги» in the desktop menu and in the slide-out menu;
    - the desktop menu fits on one line at 900 px;
    - the footer lists all 11 items in config order, and its two columns look balanced on the phone;
    - the breadcrumb reads «Головна › Вартість послуг».
  - **Anchors:**
    - the link from each article lands on its target fully below the fixed header;
    - the audit service arrives expanded;
    - the group link arrives with its heading in view;
    - the same holds after a fresh load with the fragment typed into the address bar.
  - **Edited pages:**
    - the services section, the home block (after «Читати далі») and the FAQ answer show the new text and working links;
    - other FAQ answers on the services page, instruction pages and court decision pages are unchanged.
  - **Accepted glitch:** with a throttled phone network, confirm the glitch described above and nothing worse, such as a blank page or lost scroll.
- **Driver 2: plain HTTP requests** to the same server.
  - `/prices/` returns prerendered HTML containing:
    - its own title, description and canonical;
    - every service's full text, including collapsed text;
    - every anchor id.
  - The JSON-LD contains a BreadcrumbList, a WebPage, an OfferCatalog with 17 Offers whose prices equal the visible prices (UAH; three fixed, fourteen ranges), and a FAQPage with six questions.
  - `/prices/` is in the sitemap.
  - Every internal link on the new and edited pages resolves.
  - The new anchor build check passes. It also fails when an anchor id is deliberately misspelled, and passes again once the misspelling is reverted.
- **Committed test code:** only the anchor build check. The project has no test runner wired up: a single Karma spec exists but no npm script runs it. The agent reports what it checked, with screenshots.
- **Prior art:**
  - the October 2026 batch verified through `build:ssg` plus `preview`, with a browser and HTTP;
  - the «every route written» one-liner in the project's build instructions is the model for the anchor check.

## Out of Scope

- A service field or pre-filled service in the consultation form, and a service name in the Telegram notification.
- Changing the public offer. The advocate chose to leave it as it is.
- The site-wide OfferCatalog in the root HTML document. Its seven unpriced service names are left untouched.
- Group navigation (chips or a sticky bar) above the price list.
- Restoring client hydration.
- Links to the price page from any other articles. The advocate chose these two only.
- Links from the services page's individual service cards to their prices.
- A reminder to update the year, or computing the year automatically. The year is edited by hand together with the prices.
- Automated test infrastructure beyond the anchor build check.
- Pushing to production.

## Further Notes

- **Source material.** The advocate's draft is `.scratch/2026-10-12-cost-of-services/cost_of_services.md`. It has the page text, SEO title and description, menu order, the services-page and home-page texts, and the article sentences.
  - Her draft's title is replaced by the approved one; see SEO.
  - Its «CTA-блок» marker and the commentary after line 440 are notes, not page text.
- **The advocate's answers, received 2026-10-12:**
  1. A request through the form is free, but only for learning which service is needed and what it costs. Add the sentence «Звернення через форму та попереднє визначення вартості — безкоштовні». Keep the button label «Звернутися за консультацією».
  2. Group the services into the five groups proposed.
  3. Show the date of the prices, as a year only.
  4. Put the prices in the structured data.
  5. Title: «Вартість послуг пенсійного адвоката | Адвокат Поддяча Юлія».
  6. Technical edits without changing meaning are allowed.
  7. Services page: the heading stays; the text and the button change.
  8. Home page: replace both paragraphs with her text plus a link.
  9. FAQ page: replace the answer with the proposed text plus a link.
  10. Public offer: no change.
  11. Articles:
      - «Скоро пенсія за віком…»: the section on submitting documents;
      - «Навіщо перевіряти пенсійну справу…»: the end of the full versus partial section;
      - no other articles.
- **Known risks:**
  - «Ціни актуальні станом на 2026 рік» goes stale on 2027-01-01 unless someone updates it with the prices.
  - Anchors in article HTML depend on the fixed ids. The build check is what keeps them honest.
- **Glossary.** The terms used here (послуга, напрям, група послуг, орієнтовна вартість, судовий збір, попереднє визначення вартості, усна консультація) are defined in the root glossary.
- **Commits.** Make separate conventional commits per logical block, directly on `main`, with no feature branch. Push only on Leo's command, because a push to `main` is a production deploy.
