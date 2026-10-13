# 10: Call-to-action texts on the home, services and FAQ pages

**What to build:** On the home, services and FAQ pages, the blocks that invite a request promise to name a service, its cost and the next steps, not to analyse the visitor's situation for free. The services cards' buttons say «Звернутися щодо …», and the court-protection card gains the same button while keeping its link to court decisions. Spec: `.scratch/2026-10-12-cost-of-services/spec.md`, section "Follow-up: the advocate's corrections (2026-10-13)", subsection "Call-to-action texts" (the home, services and FAQ items).

**Blocked by:** 09 (both touch the home page's SEO section)

**Status:** ready-for-agent

- [ ] Before any change, screenshots at ~390 px and ~1280 px of every block this ticket touches.
- [ ] Home, block «Потрібна юридична допомога з пенсійних питань?»: the button reads «Записатися на консультацію» and the text under it is the spec's text. Heading, intro text, other links and messenger buttons stay.
- [ ] Home, call block in the collapsible SEO section: heading, text and note are the spec's texts; the «Зателефонувати» button stays.
- [ ] Services page cards: the three buttons read «Звернутися щодо призначення пенсії», «Звернутися щодо перерахунку пенсії», «Звернутися щодо оскарження рішення ПФУ» and still open the consultation form. The «Судовий захист пенсійних прав» card keeps its note and «Переглянути судові рішення →» link and ends with a button «Звернутися щодо судового захисту» to the consultation form, styled and placed like the other cards' buttons.
- [ ] Services page closing block: the text and the text under the button are the spec's; the button «Записатися на консультацію» stays.
- [ ] FAQ page: the answer to «Скільки коштують послуги адвоката?» and its JSON-LD copy are the spec's text, verbatim; the arrow link «Переглянути вартість послуг» stays under the answer. The closing block «Залишилися питання?» has the spec's text.
- [ ] Nothing else in these blocks changes, and the other FAQ answers are unchanged.
- [ ] At ~390 px and ~1280 px all touched blocks look right, including the four services cards side by side on desktop; screenshots go in Comments.
- [ ] `npm run build:ssg` prints no `ERROR` lines and `Prerendered 111 static routes`; the route and anchor checks in CLAUDE.md pass.

## Comments
