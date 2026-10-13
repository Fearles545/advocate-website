# 08: Consultation page texts

**What to build:** The consultation page describes a request, not a booked consultation: H1 «Звернення за консультацією», an intro and a pre-submit text that promise to name a suitable service, its cost and the next steps rather than a free analysis, and a consent label that matches. Its SEO title and JSON-LD name follow the H1. Spec: `.scratch/2026-10-12-cost-of-services/spec.md`, section "Follow-up: the advocate's corrections (2026-10-13)", subsection "Consultation page".

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [x] Before any change, screenshots of the page at ~390 px and ~1280 px.
- [x] H1, primary intro, the text before the submit button and the consent label are the spec's texts, verbatim. The secondary intro, the `footer-note`, the success message and every form field stay as they are.
- [x] The form still submits: the consent checkbox is still required and its error text is unchanged. Don't send a real request to the worker; check the form's validity and payload in the browser instead.
- [x] The prerendered `<title>` is «Звернення за консультацією з пенсійних питань | Адвокат Поддяча Юлія», and the WebPage `name` in the page's JSON-LD is «Звернення за консультацією | Адвокат Поддяча Юлія Юріївна». The description is unchanged.
- [x] At ~390 px and ~1280 px the page looks right; screenshots go in Comments.
- [x] `npm run build:ssg` prints no `ERROR` lines and `Prerendered 111 static routes`; the route and anchor checks in CLAUDE.md pass.

## Comments

### 2026-10-13: implemented

- **Commits:**
  - `72b46a3` feat(consultation): head the page «Звернення за консультацією»
  - `6a91c9a` feat(consultation): name the page «Звернення за консультацією» in its title and JSON-LD
  - `3af50ca` feat(consultation): promise a suitable service and its cost, not an analysis
  - `82cdd93` feat(consultation): ask consent for handling the request, not for a consultation
- **Build at `82cdd93`:** `npm run build:ssg` exits 0, prints 0 `ERROR` lines and ends with `Prerendered 111 static routes.` The route check from CLAUDE.md prints `all 111 routes written`. The anchor check from CLAUDE.md prints `all 223 fragment links resolve` and exits 0. `npx tsc --noEmit -p tsconfig.app.json` is clean. Prettier finds nothing to change in the touched lines; `seo.config.ts` still has one older unrelated difference (the instructions title, line 419), left alone. The sitemap is untouched (ticket 12).
- **Source of the texts:** the spec's "Consultation page" bullets, checked against her message #516766 in the chat export: H1, intro, the text before the button and the consent label match it word for word, including the ASCII apostrophe and the full stop that now ends the consent label.
- **Seam:** the production build, served by `http-server`: the pre-ticket build (`07d7c59`, copied aside) on :8098 and each new build on :8097. Both were driven over HTTP and in headless Chromium at 390 and 1280 px. Both servers are stopped. Scripts and outputs are in `/private/tmp/claude-504/-Users-Leo-Documents-L-Angular-advocate-website/a4e0c721-b60c-4ee4-8390-645c896b41ab/scratchpad/checks/08/`.
- **`consultation-08.mjs`**, this ticket's check:
  - It reads the expected texts from the spec's follow-up section. Everything else is compared with the pre-ticket build.
  - Final run (`final.out`): 50 passed, 0 failed.
  - The same script against the pre-ticket build (`red-baseline.out`): 33 passed, 17 failed. The failures are h1 3, intro 3, footer 3, consent 3 and seo 5; every «unchanged» and form check already passed.
  - Per-slice runs are `green-s1.out` (H1, 36/50), `green-s2.out` (SEO, 41/50), `green-s3.out` (intro and text before the button, 47/50) and `green-s4.out` (consent, 50/50).
- **Texts:** the prerendered HTML and the rendered page at both widths have one `<h1>` «Звернення за консультацією». The primary `page-intro`, the `footer-text` and the consent label (followed by the red «*») equal the spec's texts.
- **SEO:**
  - The prerendered `<title>`, `og:title` and `document.title` read «Звернення за консультацією з пенсійних питань | Адвокат Поддяча Юлія».
  - The JSON-LD `#webpage` (ContactPage) `name` reads «Звернення за консультацією | Адвокат Поддяча Юлія Юріївна».
  - The rest of the page's JSON-LD (types, ids, the breadcrumb «Консультація»), the description, `og:description`, keywords, robots and canonical equal the pre-ticket build's.
- **Nothing else changed**, compared with the pre-ticket build at both widths:
  - The page text, with the four changed elements blanked, is identical. That covers the secondary intro, the `footer-note`, the section headings, hints and the submit button «Надіслати заявку».
  - Every form field is identical: tag, type, control name, value, `required` and label text, with only the consent label excluded.
- **The form still submits.** Requests to `*.workers.dev` were intercepted with `page.route` and answered locally with `{"success":true}`, so nothing reached the worker or Telegram.
  - With name, phone, pension status and description filled but consent unchecked, a click on «Надіслати заявку» sends no request. The consent control is `ng-invalid` and shows «Необхідна згода на обробку даних», the same as before.
  - With consent checked the form turns `ng-valid`, and the submit posts a payload with `"consent":true`. The payload equals, key for key, the one the pre-ticket build posts for the same input.
  - The success card that follows («Дякую! …») is unchanged.
- **Layout:** no horizontal overflow at either width. The header grew from 340 to 403 px at 390, where the H1 now wraps onto two centred lines, and from 351 to 383 px at 1280. The consent-to-button block grew from 439 to 482 px at 390 and from 346 to 363 px at 1280; the consent label now takes four lines on the phone and two on the desktop. No CSS changed.
- **Screenshots**, in `/private/tmp/claude-504/-Users-Leo-Documents-L-Angular-advocate-website/a4e0c721-b60c-4ee4-8390-645c896b41ab/scratchpad/shots/08/`:
  - before any change: `before-full-{390,1280}.png`, `before-header-{390,1280}.png`, `before-footer-{390,1280}.png`;
  - after: `after-full-{390,1280}.png`, `after-header-{390,1280}.png`, `after-footer-{390,1280}.png`.
- **Not changed, outside this ticket:** the historical notes in `docs/new-contact-form-implementation/` still quote the old texts. They are design notes, not site text.
