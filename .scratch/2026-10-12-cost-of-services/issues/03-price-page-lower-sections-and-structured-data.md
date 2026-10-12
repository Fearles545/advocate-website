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

**Status:** ready-for-agent

- [ ] The section «Від чого залежить вартість юридичних послуг» (H2) carries:
  - the advocate's lead paragraph;
  - her eight factors as an icon list, styled like the services page's check lists;
  - her closing sentence.

  All of it is verbatim.
- [ ] The section «Поширені питання про вартість послуг» (H2) shows the advocate's six questions verbatim in the shared FAQ accordion.
  - The answers about the consultation price and the court-support price take their amounts from the price data.
  - Changing the consultation price in the data changes both the list row and the FAQ answer. Try it and revert, and note the result in Comments.
- [ ] The dark closing section «Як дізнатися вартість послуги у вашій ситуації?» (H2) holds:
  - the advocate's two paragraphs;
  - «Звернення через форму та попереднє визначення вартості — безкоштовні.» directly above the button;
  - a gold primary button «Звернутися за консультацією» that opens the consultation form.
- [ ] Section backgrounds alternate as the design system prescribes. At ~390 px and ~1280 px the lower sections look consistent with the services page and nothing scrolls sideways. Screenshots go in Comments.
- [ ] The page's JSON-LD (in the prerendered HTML) parses as JSON and contains:
  - the BreadcrumbList and WebPage from ticket 02;
  - an OfferCatalog. It is a standalone node offered by `#org`, with 17 Offers.
    - Each Offer's offered item is a Service named with the service title.
    - Each Offer's URL is `https://www.advocate-pensia.com.ua/prices/#<service id>`.
    - Each Offer has a PriceSpecification in UAH: `price` for the three fixed amounts, `minPrice`/`maxPrice` for the fourteen ranges.
    - Every number equals the visible price.
  - a FAQPage with the six questions and their answers as plain text.
- [ ] The site-wide OfferCatalog in the root HTML document is unchanged.
- [ ] `npm run build:ssg` prints no `ERROR` lines, and every route writes its `index.html`.

## Comments
