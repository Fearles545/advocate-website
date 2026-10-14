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

## Follow-up: the advocate's corrections (2026-10-13)

After seeing the built page on 2026-10-12, the advocate sent corrections in a Telegram chat. The export is local only, in the gitignored `tmp/2026-10-13/ChatExport_2026-10-13/` (`result.json` plus `photos/`); message ids below point into it. Most corrections reach beyond the price page: across the site she removes every promise that a request through the form gets a free analysis of the visitor's situation, in line with the paid усна консультація and the free попереднє визначення вартості. The Ukrainian texts below are verbatim and replace the current ones exactly. Where this section contradicts an earlier one, this section wins.

### Price page

- **Header** (#516751–516759, her answer 1а). The paragraph «Надаю юридичну допомогу з питань призначення та перерахунку пенсії, …» is deleted. The primary intro, in the large size the deleted paragraph had, becomes two paragraphs:
  - «Нижче зазначена орієнтовна вартість юридичних послуг з пенсійних питань.»
  - «Остаточна вартість визначається індивідуально після ознайомлення із ситуацією та документами і залежить від складності питання, обсягу необхідної роботи та кількості документів, які потрібно опрацювати.»

  «До початку надання послуги погоджуються її обсяг та вартість.» stays in the small secondary size. The «Ціни актуальні станом на 2026 рік» badge stays.
- **«орієнтовно»** (#516762–516764): the caption under range prices is removed everywhere. Ranges and fixed prices look alike apart from the amount.
- **Row link** (#516765–516766): «Обговорити цю послугу →» becomes «Описати свою ситуацію →», still to the consultation form.
- **Oral consultation** (#516767, her answer 2а): in «Усна консультація з пенсійного питання» the sentence «Тривалість консультації — до 50 хвилин.» is removed; «Консультація проводиться за попереднім записом у погоджений день і час.» stays, with its bold.
- **Wording** (#516768): «правничої допомоги» becomes «юридичної допомоги» everywhere on the page, including the FAQ answers and their JSON-LD.

### Wording and emphasis elsewhere

- «правнич…» becomes «юридич…» across the site (#516768): «правничої допомоги» → «юридичної допомоги», «Правнича допомога» → «Юридична допомога», «правничу допомогу» → «юридичну допомогу». Today that is the home page's SEO section (three places) and the contacts page (two places). Markdown notes under `src/` are not site text and stay.
- Court decisions list intro (#516760, her answer 5): «судові рішення у спорах з Пенсійним фондом України» loses its bold; «Поддячою Юлією Юріївною» keeps it.
- Instructions list intro (#516769): «електронний підпис (КЕП)» loses its bold.
- The contacts page intro keeps its bold name (her answer 5).

### Consultation page `/consultation/` (#516766)

- H1: «Звернення за консультацією».
- Primary intro: «Заповніть коротку форму та опишіть своє пенсійне питання. Я ознайомлюся з вашою ситуацією та запропоную відповідну послугу, повідомлю її вартість і порядок надання.» The secondary intro stays.
- Text before the submit button (`footer-text`): «Після отримання звернення я ознайомлюся з наданою інформацією та зв'яжуся з вами, щоб повідомити, яку допомогу можу запропонувати, її вартість та подальший порядок дій.» The `footer-note` stays.
- Consent label: «Я погоджуюся на обробку персональних даних з метою розгляду мого звернення та подальшого зв'язку зі мною.» The worker receives consent as a boolean, so nothing else changes.
- SEO (Leo's answer 2a): title «Звернення за консультацією з пенсійних питань | Адвокат Поддяча Юлія», accepted at 68 characters; the WebPage `name` in its JSON-LD becomes «Звернення за консультацією | Адвокат Поддяча Юлія Юріївна». The description stays.

### Call-to-action texts

Only the named texts change; headings, links and other buttons stay.

- **Home, block «Потрібна юридична допомога з пенсійних питань?»** (#516770, her answer 4а): the button «Замовити консультацію» becomes «Записатися на консультацію»; the text under it becomes «Після отримання звернення я ознайомлюся з наданою інформацією та зв'яжуся з вами, щоб повідомити, яку допомогу можу запропонувати, її вартість та подальший порядок дій.»
- **Home, call block in the collapsible SEO section** (#516772): heading «Потрібна консультація адвоката з пенсійних питань?»; text «Зателефонуйте, щоб коротко описати своє питання. Я повідомлю, яку допомогу можу запропонувати, її вартість та порядок надання.»; note «Консультації проводяться дистанційно, у зручному для вас форматі.» The «Зателефонувати» button stays.
- **Services page, main service cards** (#516773, her answer 3б): the three buttons become «Звернутися щодо призначення пенсії», «Звернутися щодо перерахунку пенсії», «Звернутися щодо оскарження рішення ПФУ». The fourth card, «Судовий захист пенсійних прав», keeps its note and its «Переглянути судові рішення →» link and gains the same consultation button as the other three, labelled «Звернутися щодо судового захисту».
- **Services page, closing block «Обговоримо вашу пенсійну ситуацію»** (#516774): text «Якщо вам потрібна допомога з призначенням, перерахунком пенсії або оскарженням рішень Пенсійного фонду, заповніть коротку форму та опишіть свою ситуацію.»; the button «Записатися на консультацію» stays; the text under it becomes «Після отримання звернення я ознайомлюся з наданою інформацією та повідомлю, яку допомогу можу запропонувати, її вартість і порядок надання.»
- **FAQ page, answer «Скільки коштують послуги адвоката?»** (#516775, Leo's answer 1a): «Орієнтовна вартість основних юридичних послуг зазначена в розділі «Вартість послуг». Конкретна вартість залежить від складності питання, обсягу документів та необхідних дій і узгоджується з клієнтом перед наданням послуги.» The answer stays plain text; the arrow link «Переглянути вартість послуг» under it stays. The JSON-LD copy gets the same text.
- **FAQ page, closing block «Залишилися питання?»** (#516776): text «Якщо у вас виникло питання щодо призначення, перерахунку пенсії або оскарження рішення Пенсійного фонду, заповніть коротку форму. Я ознайомлюся з вашим зверненням та повідомлю, яку допомогу можу запропонувати, її вартість і порядок надання.»
- **Court decision page, block «Маєте подібну пенсійну ситуацію?»** (#516777; one template for every decision): text «Якщо вам не зарахували пільговий або страховий стаж чи ви отримали відмову у призначенні або перерахунку пенсії, заповніть коротку форму та опишіть свою ситуацію. Я ознайомлюся зі зверненням і повідомлю, яку допомогу можу запропонувати.»; under the button «Після отримання звернення я повідомлю про можливі послуги, їхню вартість та порядок надання.»
- **About page, block «Готові обговорити вашу ситуацію?»** (#516778): under the button «Після отримання звернення я ознайомлюся з вашою ситуацією та повідомлю, яку допомогу можу запропонувати, її вартість і порядок надання.»
- **Contacts page, block «Дистанційна юридична допомога з пенсійних питань — по всій Україні»** (#516779): text «Заповніть коротку форму та опишіть своє пенсійне питання. Я ознайомлюся зі зверненням і повідомлю, яку допомогу можу запропонувати.»; under the button «Після отримання звернення я повідомлю вартість запропонованої послуги та порядок її надання.»
- **Documents page, block «Потрібна юридична допомога?»** (#516780): text «Заповніть коротку форму та опишіть своє пенсійне питання. Я ознайомлюся з вашим зверненням і повідомлю, яку допомогу можу запропонувати.»; the button «Замовити консультацію» becomes «Записатися на консультацію»; under it «Після отримання звернення я повідомлю вартість запропонованої послуги та порядок її надання.»

### Sitemap

Every page whose visible text changes in this follow-up gets lastmod on the implementation date, including every court decision page, since their shared block changed.

## Second follow-up: the advocate's corrections (2026-10-13, evening)

After the first follow-up, the advocate sent seven more messages. The export is local only, in the gitignored `tmp/2026-10-13/ChatExport_2026-10-13-2/`; message ids below point into it. Where this section contradicts an earlier one, this section wins.

### «юридичну допомогу» in call-to-action texts

In the nine texts set by the first follow-up that carry it, «яку допомогу можу запропонувати» becomes «яку юридичну допомогу можу запропонувати». Nothing else in them changes. Six were in her screenshots:

- **Services page, closing block «Обговоримо вашу пенсійну ситуацію»** (#516826), the text under the button.
- **About page, block «Готові обговорити вашу ситуацію?»** (#516830), the text under the button.
- **Documents page, block «Потрібна юридична допомога?»** (#516834), the text above the button.
- **FAQ page, closing block «Залишилися питання?»** (#516835), the text above the button.
- **Home, block «Потрібна юридична допомога з пенсійних питань?»** (#516836), the text under the button.
- **Home, call block in the collapsible SEO section** (#516837), the text beside the button.

Three more texts from the first follow-up carry the same phrase but were not in her screenshots: the contacts page closing block, the text before the submit button on `/consultation/`, and the block «Маєте подібну пенсійну ситуацію?» on every court decision page. They change the same way (her answer 1а).

### Price page closing block (#516840)

«Як дізнатися вартість послуги у вашій ситуації?» follows the pattern of the other closing blocks: heading, text, button, then the smaller lines under the button. The order becomes:

1. «Щоб визначити, яка саме послуга потрібна…» in the intro size, as now.
2. The «Звернутися за консультацією» button.
3. «Після ознайомлення із ситуацією я повідомлю, який обсяг юридичної допомоги необхідний та яка буде вартість послуги.» in the smaller italic style of the notes under the buttons on the services and about pages.
4. «Звернення через форму та попереднє визначення вартості — безкоштовні.» in its current gold semibold style.

The texts do not change.

### Sitemap

Every page touched here already has lastmod 2026-10-13 from ticket 12. If the work lands on a later date, those entries move to it.

## Third follow-up: menu label (2026-10-14)

After the release, the advocate asked (relayed by Leo, no export) for the menu item «Вартість» to read «Вартість послуг». The label lives once in the navigation config, so the desktop menu, the slide-out menu and the footer's «Навігація» all change; the route and order stay. Wherever earlier sections name the menu item «Вартість», read «Вартість послуг». The sitemap does not change: the menu is page chrome, not page content.
