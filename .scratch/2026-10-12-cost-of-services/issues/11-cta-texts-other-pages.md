# 11: Call-to-action texts on court decision, about, contacts and documents pages

**What to build:** The request blocks on every court decision page and on the about, contacts and documents pages promise to name a service, its cost and the next steps, not to analyse the visitor's situation. The documents page's «Замовити консультацію» becomes «Записатися на консультацію». Spec: `.scratch/2026-10-12-cost-of-services/spec.md`, section "Follow-up: the advocate's corrections (2026-10-13)", subsection "Call-to-action texts" (the court decision, about, contacts and documents items).

**Blocked by:** 09 (both touch the contacts page)

**Status:** ready-for-agent

- [x] Before any change, screenshots at ~390 px and ~1280 px of every block this ticket touches (one court decision page is enough for the template).
- [x] Court decision pages, block «Маєте подібну пенсійну ситуацію?»: text and text under the button are the spec's, on every decision page.
- [x] About page, block «Готові обговорити вашу ситуацію?»: the text under the button is the spec's.
- [x] Contacts page, block «Дистанційна юридична допомога з пенсійних питань — по всій Україні»: text and text under the button are the spec's.
- [x] Documents page, block «Потрібна юридична допомога?»: text, button «Записатися на консультацію» and text under it are the spec's.
- [x] Headings, buttons not named above, links and notes in these blocks stay as they are.
- [x] After this ticket, no page in the built site contains «проаналізую», «поясню можливі варіанти», «поясню наступні кроки» or «Замовити консультацію». Report any other remaining promise of a free analysis you find, without changing it.
- [x] At ~390 px and ~1280 px all touched blocks look right; screenshots go in Comments.
- [x] `npm run build:ssg` prints no `ERROR` lines and `Prerendered 111 static routes`; the route and anchor checks in CLAUDE.md pass.

## Comments

### 2026-10-13: implemented

- **Commits:**
  - `ef50a73` feat(court-cases): promise a service and its cost, not an analysis, in «Маєте подібну пенсійну ситуацію?»
  - `123057a` feat(about-me): promise a service and its cost, not an analysis, under «Записатися на консультацію»
  - `534344c` feat(contacts): promise a service and its cost, not an analysis, in the remote-help block
  - `f7704c9` feat(documents): invite «Записатися на консультацію» and promise a service and its cost
- **Build at `f7704c9`:** `npm run build:ssg` exits 0, prints 0 `ERROR` lines and ends with `Prerendered 111 static routes.` The route check from CLAUDE.md prints `all 111 routes written`. The anchor check from CLAUDE.md prints `all 223 fragment links resolve` and exits 0. `npx tsc --noEmit -p tsconfig.app.json` is clean. Each edited hunk is Prettier-clean. The about and documents templates were not Prettier-clean before this ticket; their old deviations are left alone, including the documents button's multi-line `<a>` tag. The sitemap is untouched (ticket 12).
- **Texts:** the spec's texts match the advocate's messages #516777–516780 in the export character for character. Her screenshots for #516779 and #516780 confirm which block is the contacts page's and which the documents page's.
- **Seam:** the production build, served by `http-server`. The pre-ticket build (`b5351f6`, copied to `dist-11-before`) ran on :8193 and each new build on :8192. Both were read over HTTP and driven in headless Chromium at 390 and 1280 px. Both servers are stopped. Scripts and outputs are in `/private/tmp/claude-504/-Users-Leo-Documents-L-Angular-advocate-website/a4e0c721-b60c-4ee4-8390-645c896b41ab/scratchpad/checks/11/`.
- **`cta-11.mjs`**, this ticket's check:
  - It parses the expected texts from the spec's "Call-to-action texts" bullets (court decision, about, contacts, documents). Everything else is compared with the pre-ticket build.
  - Final run (`final.out`): 146 passed, 0 failed.
  - Against the pre-ticket build (`red-baseline.out`): 18 passed, 128 failed. Every failure was a named text, the documents button, or a leftover phrase. Every "unchanged" check already passed.
  - Per-slice runs, one per commit: `green-s1.out` (119/146), `green-s2.out` (124), `green-s3.out` (129), `green-s4.out` (146).
- **What was compared with the pre-ticket build:**
  - Over HTTP, the prerendered visible text of all 111 routes equals the pre-ticket text with only the spec's named texts replaced. Each replaced text occurred exactly once on its page before.
  - Exactly the 29 decision pages, `/about-me`, `/contacts` and `/documents` differ in HTML (hashed file names and Angular/CDK counter ids masked).
  - Meta tags, titles and JSON-LD of all 111 routes are unchanged.
  - In the browser at 390 and 1280 px, the rendered text of `/about-me/`, `/contacts/`, `/documents/` and two decision pages (`160-14195-26`, `582-867-21`) equals the pre-ticket rendered text with only the same swaps.
- **Per block**, checked on every one of the 29 decision pages and on the three other pages, twice: in the prerendered HTML with JavaScript off, and in the rendered page at both widths. In each block the heading is unchanged, the named texts are the spec's, and there is one consultation button to `/consultation/`. The rest of the block's text equals the pre-ticket block with only the named texts swapped. That covers the decision pages' «Юридичні послуги» and «Контакти» links and the «Консультації надаються онлайн…» note, the about page's «Відгуки клієнтів» and «Перелік послуг» links, the contacts and documents pages' «Про адвоката» and «Послуги» links, and the unchanged «Записатися на консультацію» buttons on the decision, about and contacts pages.
  - **Court decision pages:** the text and the text under the button are the spec's.
  - **About:** the text under the button is the spec's.
  - **Contacts:** the text and the text under the button are the spec's.
  - **Documents:** the text, the button «Записатися на консультацію» and the text under it are the spec's.
  - At both widths, clicking the button in each of the four blocks opens the consultation form (one decision page for the template).
- **Layout:** there is no horizontal overflow on the four pages at either width. Every heading, paragraph, link and button stays inside its block, and each button's label stays inside the button. The documents button now has the same size, line count and computed style as the contacts page's button: 326×60 px with the label on two lines at 390 px, and 357×60 px on one line at 1280 px.
- **Leftover phrases:**
  - No HTML of the 111 built routes and none of the 16 client bundles (with `\u` escapes decoded) contains «проаналізую», «поясню можливі варіанти», «поясню наступні кроки» or «Замовити консультацію». Before this ticket they were on the 29 decision pages, `/about-me`, `/contacts` and `/documents`.
  - The wider search was `phrase-scan.mjs`, run on every route's text, meta and JSON-LD, and repeated on the bundles. It looked for «після (отримання) звернення/заявки/заповнення», «залиште заявку», «безкоштовн/безоплатн», first-person «розгляну/проаналізую/поясню/підкажу/оціню/з'ясую/перевірю», «первинна консультація» and «можливі/наступні кроки/варіанти». It finds all the old promises in the pre-ticket build (`phrase-scan-before.out`) and none of them after (`phrase-scan.out`).
  - `cta-blocks.mjs` lists every block on the site that links to the form, a phone number or a messenger (`cta-blocks.out`). None of them still promises an analysis.
  - The search turned up no other explicit promise of a free analysis. Three borderline phrasings remain unchanged, for the advocate to judge:
    - `/services`, the «Консультація адвоката з пенсійних питань» card: «Первинна або розширена консультація з аналізом документів, стажу та можливих шляхів вирішення пенсійного питання.» It does not say whether this is paid, and «первинна» can read as free.
    - `/faq` (visible and in JSON-LD) and `/public-offer` speak of a «первинна консультація».
    - `/privacy-policy` names «аналізу вашої ситуації з пенсійних питань» among the purposes of processing personal data.
  - The blog's «я можу комплексно проаналізувати пенсійну справу» and «Проведе повний аналіз документів» describe paid services, not a free step. The «безкоштовно» mentions on instruction pages are about state services (Дія, Портал ПФУ, banks). The form's success message («…ознайомлюся з інформацією. Зв'яжуся з вами…») promises no analysis.
- **Screenshots**, in `/private/tmp/claude-504/-Users-Leo-Documents-L-Angular-advocate-website/a4e0c721-b60c-4ee4-8390-645c896b41ab/scratchpad/shots/11/`, each as `{before,after}-<block>-{390,1280}.png`:
  - `court-case-cta`: `/court-cases/460-12796-25/`, «Маєте подібну пенсійну ситуацію?»;
  - `about-final-cta`: «Готові обговорити вашу ситуацію?»;
  - `contacts-cta`: «Дистанційна юридична допомога з пенсійних питань — по всій Україні»;
  - `documents-cta`: «Потрібна юридична допомога?».
