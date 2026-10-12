# 05: Services, home and FAQ pages point to the price page

**What to build:** Three places on the site still say only that the cost «визначається індивідуально». After this ticket each of them carries the advocate's new wording and leads to `/prices/`:
- the «Вартість юридичних послуг» section of the services page;
- the «Вартість юридичних послуг» block in the home page's collapsible FAQ section;
- the answer to «Скільки коштують послуги адвоката?» on the FAQ page.

The shared FAQ accordion first gains an optional link under an answer. It is a small prefactor, and every other page that uses the accordion looks exactly as before.

Spec: `.scratch/2026-10-12-cost-of-services/spec.md`, sections "Shared FAQ accordion" and "Other pages".

**Blocked by:** 02

**Status:** ready-for-agent

- [ ] Before any change, take screenshots at ~390 px of the FAQ accordion on four pages, for comparison:
  - the services page;
  - the FAQ page;
  - one instruction page;
  - one court decision page.
- [ ] The shared FAQ item has an optional link (label and route). When present, it renders under the answer as an arrow link in the site's link style. Answers stay plain text. On the four pages above, the accordions match the "before" screenshots, apart from the FAQ page's edited answer.
- [ ] Services page, section «Вартість юридичних послуг»:
  - the H2 is unchanged;
  - the paragraph is replaced by the advocate's two paragraphs, with her bold fragment;
  - the section's «Записатися на консультацію» button is replaced by a primary button «Переглянути вартість послуг» that opens `/prices/`.

  The page's other consultation buttons are unchanged.
- [ ] Home page, block «Вартість юридичних послуг» in the collapsible FAQ section:
  - the heading is unchanged;
  - both paragraphs are replaced by the advocate's paragraph;
  - an arrow link «Переглянути вартість послуг» to `/prices/` is visible after «Читати далі».
- [ ] FAQ page, «Скільки коштують послуги адвоката?»:
  - the answer is the spec's text;
  - it carries the new FAQ link «Переглянути вартість послуг» to `/prices/`;
  - the copy of that answer in the FAQ page's JSON-LD has the same text.
- [ ] At ~390 px and ~1280 px all three places show the new text and their links open `/prices/`. Screenshots go in Comments.
- [ ] `npm run build:ssg` prints no `ERROR` lines, and every route writes its `index.html`.

## Comments
