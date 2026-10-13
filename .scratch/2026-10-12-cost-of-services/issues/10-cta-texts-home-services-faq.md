# 10: Call-to-action texts on the home, services and FAQ pages

**What to build:** On the home, services and FAQ pages, the blocks that invite a request promise to name a service, its cost and the next steps, not to analyse the visitor's situation for free. The services cards' buttons say «Звернутися щодо …», and the court-protection card gains the same button while keeping its link to court decisions. Spec: `.scratch/2026-10-12-cost-of-services/spec.md`, section "Follow-up: the advocate's corrections (2026-10-13)", subsection "Call-to-action texts" (the home, services and FAQ items).

**Blocked by:** 09 (both touch the home page's SEO section)

**Status:** ready-for-agent

- [x] Before any change, screenshots at ~390 px and ~1280 px of every block this ticket touches.
- [x] Home, block «Потрібна юридична допомога з пенсійних питань?»: the button reads «Записатися на консультацію» and the text under it is the spec's text. Heading, intro text, other links and messenger buttons stay.
- [x] Home, call block in the collapsible SEO section: heading, text and note are the spec's texts; the «Зателефонувати» button stays.
- [x] Services page cards: the three buttons read «Звернутися щодо призначення пенсії», «Звернутися щодо перерахунку пенсії», «Звернутися щодо оскарження рішення ПФУ» and still open the consultation form. The «Судовий захист пенсійних прав» card keeps its note and «Переглянути судові рішення →» link and ends with a button «Звернутися щодо судового захисту» to the consultation form, styled and placed like the other cards' buttons.
- [x] Services page closing block: the text and the text under the button are the spec's; the button «Записатися на консультацію» stays.
- [x] FAQ page: the answer to «Скільки коштують послуги адвоката?» and its JSON-LD copy are the spec's text, verbatim; the arrow link «Переглянути вартість послуг» stays under the answer. The closing block «Залишилися питання?» has the spec's text.
- [x] Nothing else in these blocks changes, and the other FAQ answers are unchanged.
- [x] At ~390 px and ~1280 px all touched blocks look right, including the four services cards side by side on desktop; screenshots go in Comments.
- [x] `npm run build:ssg` prints no `ERROR` lines and `Prerendered 111 static routes`; the route and anchor checks in CLAUDE.md pass.

## Comments

### 2026-10-13: implemented

- **Commits:**
  - `3802604` feat(home): invite «Записатися на консультацію» and promise a service and its cost
  - `88a331a` feat(home): ask to call about the question, not for a free analysis, in the SEO section
  - `d30de1f` feat(services): end every main card with a «Звернутися щодо …» button
  - `eaa5627` feat(services): promise a service and its cost, not an analysis, in the closing block
  - `9f5c1c0` feat(faq): state the indicative cost in «Скільки коштують послуги адвоката?»
  - `c841c9a` feat(faq): promise a service and its cost, not an analysis, in «Залишилися питання?»
- **Build at `c841c9a`:** `npm run build:ssg` exits 0, prints 0 `ERROR` lines and ends with `Prerendered 111 static routes.` The route check from CLAUDE.md prints `all 111 routes written`. The anchor check from CLAUDE.md prints `all 223 fragment links resolve` and exits 0. `npx tsc --noEmit -p tsconfig.app.json` is clean. Each edited hunk is Prettier-clean; the services template, services CSS, `faq.component.ts` and `seo.config.ts` were not Prettier-clean before this ticket and their old deviations are left alone. The sitemap is untouched (ticket 12).
- **Texts:** the spec's texts match the advocate's messages #516770 and #516772–516776 in the export character for character, including the ASCII apostrophe in «зв'яжуся».
- **Services cards:** the template no longer forks: the court card's note and link stay in their own `@if`, and one shared `service-cta-btn` (calendar icon, `/consultation/`) closes all four cards, labelled by each card's `ctaText`. The link's text «Переглянути судові рішення» moved from `ctaText` into the template. `.service-cta-link` lost `margin-top: auto`. That rule made the link the card's foot. With the button added, the spare height was split between the link and the button: at 640 px the link sat 24 px below its note instead of 16 px (`widths-s3.out`). Now the link always follows its note and the spare height goes above the button, as in the other cards (`widths-final.out`, 360–1920 px).
- **Seam:** the production build, served by `http-server`: the pre-ticket build (`ac9735e`, copied to `dist-10-before`) on :8191 and each new build on :8190. Both were read over HTTP and driven in headless Chromium at 390 and 1280 px. Both servers are stopped. Scripts and outputs are in `/private/tmp/claude-504/-Users-Leo-Documents-L-Angular-advocate-website/a4e0c721-b60c-4ee4-8390-645c896b41ab/scratchpad/checks/10/`.
- **`cta-10.mjs`**, this ticket's check:
  - It parses the expected texts from the spec's "Call-to-action texts" bullets (home, services, FAQ). Everything else is compared with the pre-ticket build.
  - Final run (`final.out`): 109 passed, 0 failed.
  - Against the pre-ticket build (`red-baseline.out`): 42 passed, 67 failed. Every failure was a named text, the court card's missing button, or the link position; every "unchanged" check already passed.
  - Per-slice runs, one per commit: `green-s1.out` (50/109), `green-s2.out` (61), `green-s3.out` (87), `green-s4.out` (95), `green-s5.out` (103), then `final.out` (109).
- **What was compared with the pre-ticket build:**
  - Over HTTP, the prerendered visible text of all 111 routes equals the pre-ticket text with only the spec's named texts replaced. The only other difference is the court card's new button, «Звернутися щодо судового захисту», after «Переглянути судові рішення». Hashed file names and Angular/CDK counter ids were masked. Only `/`, `/services` and `/faq` differ in HTML.
  - Meta tags and titles of all 111 routes are unchanged. JSON-LD is unchanged except the `/faq` FAQPage answer to «Скільки коштують послуги адвоката?», which is now the spec's text verbatim; the other eleven questions and answers are unchanged.
  - In the browser at 390 and 1280 px, the rendered text of `/` (with the SEO section opened by «Читати далі»), `/services/` and `/faq/` equals the pre-ticket rendered text with only the same swaps. That covers headings, intros, other links, messenger buttons, the other FAQ answers on `/faq/` and the services page FAQ.
- **Per block**, checked twice: in the prerendered HTML parsed with JavaScript off, and in the rendered page at both widths:
  - **Home, need-help:** the button reads «Записатися на консультацію» and opens the consultation form. The text under it is the spec's. The heading, the «Переглянути послуги» and «Про адвоката» links and the messenger label are unchanged.
  - **Home, SEO call block:** the heading, text and note are the spec's. «Зателефонувати» still links to `tel:+380999426056`.
  - **Services cards:** each card ends with one `service-cta-btn` with the calendar icon, labelled «Звернутися щодо призначення пенсії», «… перерахунку пенсії», «… оскарження рішення ПФУ» and «… судового захисту». Clicking each opens the consultation form. The court card keeps its note and «Переглянути судові рішення →», which still opens `/court-cases/`.
  - **Services, closing block:** the text and the text under the button are the spec's; the heading and «Записатися на консультацію» are unchanged.
  - **FAQ:** the price answer is the spec's text verbatim, as plain text with no inline link. The arrow link «Переглянути вартість послуг» follows it and opens `/prices/`. The «Залишилися питання?» text is the spec's.
- **Layout:**
  - No horizontal overflow on `/`, `/services/` or `/faq/` at either width.
  - The four buttons have identical computed styles, and each sits at its card's foot with the same bottom gap: 21 px at 390, 33 px at 1280.
  - At 1280 px the cards sit two per row with equal heights per row, and the buttons in a row share a baseline.
  - The court card's link is 16 px below its note, the card's regular gap, at every width from 360 to 1920 px.
- **Screenshots**, in `/private/tmp/claude-504/-Users-Leo-Documents-L-Angular-advocate-website/a4e0c721-b60c-4ee4-8390-645c896b41ab/scratchpad/shots/10/`, each as `{before,after}-<block>-{390,1280}.png`:
  - `home-need-help`;
  - `home-seo-cta`: the call block, with the SEO section opened;
  - `services-cards`: all four cards;
  - `services-closing`;
  - `faq-price-answer`: the answer opened;
  - `faq-closing`.
