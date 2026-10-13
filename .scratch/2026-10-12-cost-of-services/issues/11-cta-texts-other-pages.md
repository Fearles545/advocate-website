# 11: Call-to-action texts on court decision, about, contacts and documents pages

**What to build:** The request blocks on every court decision page and on the about, contacts and documents pages promise to name a service, its cost and the next steps, not to analyse the visitor's situation. The documents page's «Замовити консультацію» becomes «Записатися на консультацію». Spec: `.scratch/2026-10-12-cost-of-services/spec.md`, section "Follow-up: the advocate's corrections (2026-10-13)", subsection "Call-to-action texts" (the court decision, about, contacts and documents items).

**Blocked by:** 09 (both touch the contacts page)

**Status:** ready-for-agent

- [ ] Before any change, screenshots at ~390 px and ~1280 px of every block this ticket touches (one court decision page is enough for the template).
- [ ] Court decision pages, block «Маєте подібну пенсійну ситуацію?»: text and text under the button are the spec's, on every decision page.
- [ ] About page, block «Готові обговорити вашу ситуацію?»: the text under the button is the spec's.
- [ ] Contacts page, block «Дистанційна юридична допомога з пенсійних питань — по всій Україні»: text and text under the button are the spec's.
- [ ] Documents page, block «Потрібна юридична допомога?»: text, button «Записатися на консультацію» and text under it are the spec's.
- [ ] Headings, buttons not named above, links and notes in these blocks stay as they are.
- [ ] After this ticket, no page in the built site contains «проаналізую», «поясню можливі варіанти», «поясню наступні кроки» or «Замовити консультацію». Report any other remaining promise of a free analysis you find, without changing it.
- [ ] At ~390 px and ~1280 px all touched blocks look right; screenshots go in Comments.
- [ ] `npm run build:ssg` prints no `ERROR` lines and `Prerendered 111 static routes`; the route and anchor checks in CLAUDE.md pass.

## Comments
