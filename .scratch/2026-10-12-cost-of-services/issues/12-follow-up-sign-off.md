# 12: Sign-off of the corrections: sitemap lastmod and verification pass

**What to build:** Once 07–11 are done, the sitemap lastmod moves for every page they changed, and the corrections are verified on the production build served locally against the advocate's messages. This ticket and 06 together are Leo's «готово». Spec: `.scratch/2026-10-12-cost-of-services/spec.md`, section "Follow-up: the advocate's corrections (2026-10-13)", and "Testing Decisions".

**Blocked by:** 07, 08, 09, 10, 11

**Status:** ready-for-agent

- [x] lastmod is the commit date for every page whose visible text changed in 07–11: `/prices/`, `/consultation/`, `/`, `/services/`, `/faq/`, `/court-cases/`, every court decision page, `/instructions/`, `/about-me/`, `/contacts/`, `/documents/`. No other entry changes.
- [x] `npm run build:ssg` prints no `ERROR` lines and `Prerendered 111 static routes`; the route and anchor checks in CLAUDE.md pass.
- [x] Every replacement text in the spec's follow-up section appears verbatim on its page in the prerendered HTML, and every replaced text is gone from it.
- [x] A browser pass at ~390 px and ~1280 px over every touched block finds the layout right. It also re-runs ticket 06's browser pass on `/prices/`: rows, several rows open, the new row link, «Інші послуги», cost factors, FAQ, closing section, the article deep links.
- [x] A report with screenshots goes in Comments.

## Comments

### 2026-10-13: sign-off pass

Every box passed. Two checks failed once and then passed on every rerun; both are recorded below under "Intermittent results".

- **Commit:** `83568d9` chore(sitemap): update lastmod for pages the advocate's corrections changed. It sets lastmod 2026-10-13, the commit date, on 39 entries: `/prices/`, `/consultation/`, `/`, `/services/`, `/faq/`, `/court-cases/`, its 29 decision pages, `/instructions/`, `/about-me/`, `/contacts/` and `/documents/`. The diff is 39 lastmod lines and nothing else.
- **Build at `83568d9`:** `npm run build:ssg` exits 0, prints 0 `ERROR` lines and ends with `Prerendered 111 static routes.` The route check from CLAUDE.md prints `all 111 routes written`. The anchor check from CLAUDE.md prints `all 223 fragment links resolve`. The built `sitemap.xml` is byte-identical to `public/sitemap.xml`. Log: `/private/tmp/claude-504/-Users-Leo-Documents-L-Angular-advocate-website/a4e0c721-b60c-4ee4-8390-645c896b41ab/scratchpad/build-12.log`.
- **Seam:** the production build served by `npx http-server dist/advocate-website/browser -p 8290 -c-1 -s`, read over HTTP and driven in headless Chromium at 390 and 1280 px, plus 900 px for the menu. For the red run only, the pre-correction build (`dist-07-before`, commit `55ecca3`) was served on :8291. Both servers are stopped.
- **Scripts and outputs** are in `/private/tmp/claude-504/-Users-Leo-Documents-L-Angular-advocate-website/a4e0c721-b60c-4ee4-8390-645c896b41ab/scratchpad/checks/12/`.

#### Sitemap (`sitemap-check.cjs` → `sitemap-check.out`): 8 passed, 0 failed

The script compares `public/sitemap.xml` at `83568d9` with its parent and with the built routes:
- The 29 decision pages in the sitemap are exactly the 29 built `/court-cases/<id>` routes.
- There are 110 entries, in the same order as before.
- 39 entries changed, all of them targets, and all 39 targets carry 2026-10-13. No other entry carries that date.
- The other 71 entries keep their lastmod. No loc, changefreq or priority changed.

#### Texts, prerendered HTML (`texts-12.mjs` → `texts-12.out`): 68 passed, 0 failed

- **Expected values.** The new texts are parsed from the spec's follow-up section: all four subsections, 44 named values (53 strings, counting the list items). The replaced texts are the pre-correction texts recorded by tickets 07–11, plus the deleted header paragraph and the replaced first line from the advocate's draft. The script first shows that each replaced text was on its page in the pre-correction build (9/9 page groups), so the list is the real one.
- **Red run.** The same script against the pre-correction build fails 53 of 68 checks (`texts-12-red-on-pre-07.out`). The 15 that still pass are setup checks, the replaced-before checks, and texts that were never meant to change.
- **Every replaced text is gone** (raw HTML, so text, meta and JSON-LD):
  - from `/prices`, `/consultation`, `/`, `/services`, `/faq`, all 29 decision pages, `/about-me`, `/contacts` and `/documents`;
  - `/prices` has no «орієнтовно» caption and no `.price-caption`, and has no «хвилин» anywhere;
  - `/consultation` has no «Запис на консультацію» in its h1, title, og:title or JSON-LD;
  - none of the 111 routes contains «правнич», «Правнич», «Замовити консультацію», «проаналізую», «поясню можливі варіанти» or «поясню наступні кроки».
- **Every replacement text is verbatim on its page,** in the prerendered text of the same pages, all 29 decision pages included. Also:
  - `/prices` has «Описати свою ситуацію» 17 times and «Обговорити цю послугу» 0 times;
  - «юридичної допомоги» shows 5 times in the text and 2 times in the JSON-LD, the counts «правничої допомоги» had;
  - on `/` each «правнич…» form became its «юридич…» form: «правничої допомоги», «Правнича допомога» and «правнича допомога», once each. On `/contacts`, «правничу допомогу» became «юридичну допомогу» twice;
  - `/consultation`: `<title>` and og:title are «Звернення за консультацією з пенсійних питань | Адвокат Поддяча Юлія», and the JSON-LD `#webpage` name is «Звернення за консультацією | Адвокат Поддяча Юлія Юріївна». The description is unchanged;
  - `/faq`: the FAQPage JSON-LD answer to «Скільки коштують послуги адвоката?» is the spec's text.
- **Per block, in the prerendered DOM** (Chromium with JavaScript off). Each named element equals the spec's text exactly:
  - `/prices`:
    - header: the two new `page-intro` lines, then «До початку…» (secondary), then the year badge;
    - each of the 17 rows has one «Описати свою ситуацію →» to `/consultation`;
    - «Усна консультація…» reads «Консультація проводиться за попереднім записом у погоджений день і час.», and its only bold is «за попереднім записом у погоджений день і час».
  - `/consultation`: the only h1, the primary intro, the footer-text and the consent label.
  - `/`: the need-help button and the text under it; the SEO call block's heading, text and note, with «Зателефонувати» kept.
  - `/services`: the four card buttons, each to `/consultation`; the court card's «Переглянути судові рішення →» to `/court-cases`; the closing text, note and button.
  - `/faq`: the price answer, as plain text followed by «Переглянути вартість послуг» to `/prices`; the closing text.
  - All 29 decision pages: the block's text and the text under the button.
  - `/about-me`, `/contacts` and `/documents`: their blocks. On `/documents` that includes the button «Записатися на консультацію».
  - Bold:
    - `/court-cases` intro: «судові рішення у спорах з Пенсійним фондом України» is plain and «Поддячою Юлією Юріївною» is bold;
    - `/instructions` intro: «електронний підпис (КЕП)» is plain;
    - `/contacts` intro: the name is still bold.

#### Browser pass over every touched block (`blocks-12.mjs` → `blocks-12.out`): 67 passed, 0 failed

- **What was checked.** 21 blocks at 390 and 1280 px, with the home SEO section opened, «Усна консультація…» opened and the FAQ price answer opened. Two decision pages stand for the shared template. For each block:
  - it shows its spec text;
  - every heading, paragraph, list item, link, button and label lies inside the viewport;
  - every button's label and icon lie inside the button.
- **Result.** None of the 12 pages scrolls sideways at either width. I looked at every screenshot and found the layout right:
  - the price header has the two large lines, the small line and the badge;
  - the open oral row ends with the link and has no duration;
  - the consultation H1 wraps onto two centred lines at 390;
  - the services cards sit two per row at 1280, with the court card's link above its button and the buttons on a shared baseline;
  - the documents button matches the contacts button: two lines at 390, one line at 1280;
  - the home SEO call button stays vertically centred on the taller text, as before ticket 10.

#### Ticket 06's browser pass, re-run (`browser-06-12.mjs` → `browser-06-12.out`): 26 passed, 0 failed

This is ticket 06's `browser-06.mjs` with only the corrected expectations changed: no «орієнтовно» caption (0, not 14), the row link «Описати свою ситуацію →», and the form page's H1 «Звернення за консультацією». It also asserts that each open row ends with the link.
- **Rows:** at both widths the 17 rows start collapsed, with no caption and no sideways scroll.
- **Several rows open:** three rows opened by real taps stay open together, and each ends with «Описати свою ситуацію →».
- **The row link:** in «Комплексний супровід…» it opens «Звернення за консультацією» with its form, at y = 0.
- **Closing section:** it has «Звернення через форму та попереднє визначення вартості — безкоштовні.» and a single «Звернутися за консультацією» button to `/consultation`.
- **Article deep links** (in-app, same document; the target lands at the header bottom + 16 px):

  | From | To | 390 × 844 | 1280 × 800 |
  | --- | --- | --- | --- |
  | «Навіщо перевіряти…» | `#audyt-pensiinoi-spravy` | top 148 (header 132), open, 1 row open | top 167 (header 151), open, 1 row open |
  | «Скоро пенсія…» | `#pryznachennia-pensii` | 148, no row open | 167, no row open |
  | `/services/` | `#audyt-pensiinoi-spravy` | 148, open | 167, open |
  | `/` | `#pryznachennia-pensii` | 148, no row open | 167, no row open |

- **Menu taps:** tapping «Вартість» in the menu (1280) or the slide-out menu (390) opens `/prices` at y = 0 in the same document.
- **Menu at exactly 900 px:** Головна, Послуги, Вартість, Судові рішення, Відгуки, Блог, Про мене, Контакти, then «Ще» holding Документи, Інструкції, FAQ. Everything sits on one line, nothing wraps, and «Вартість» is active.
- **Slide-out menu and footer:** both list the 11 items in config order.
- **Rendered-DOM link sweep:** the six pages render 35 distinct internal hrefs, with every row and accordion open. All return 200, and every fragment id exists.
- **Earlier checks, re-run:**
  - `04/anchors-04.mjs` covers fresh loads with a fragment and both article links. It passed 32/32 on three reruns (`anchors-04-12-rerun{1,2,3}.out`). The first run had one failure, described under "Intermittent results".
  - `prices-03-12.mjs`, a copy of ticket 07's `prices-03-07.mjs` with only the form H1 updated, covers «Інші послуги», cost factors, FAQ, closing section and JSON-LD. It passed 61/61 on three reruns. The first run had two failures, described under "Intermittent results".
  - `prices-02-12.mjs`, a copy of `prices-02-07.mjs` with only the form H1 updated, covers content against the draft. It passed 79 of 84. Four of the failures are the known ones, recorded since ticket 03: its heading list and amount count predate ticket 03's sections. The fifth expects `/prices/` lastmod 2026-10-12, which this ticket deliberately moved to 2026-10-13.

#### Intermittent results, not reproduced

- **`anchors-04.mjs`, first run** (`anchors-04-12.out`): 31/32. It failed «1280px in-app #pryznachennia-pensii -> #audyt-pensiinoi-spravy». The row opened, but the page stopped scrolling at scrollY 1159, leaving the target at top 448 instead of 167. That is part-way along the 1004 → 1440 scroll.
  - Three full reruns passed it.
  - `probe-inapp-12.mjs` repeated this case 15 times per width and sampled scrollY every frame (`probe-inapp-12.out`). Every run landed at 167 (1280) or 148 (390), with the scroll finishing within 380–440 ms.
  - The case passed in all nine recorded runs from tickets 04–07.
  - It is a fragment change within `/prices/` itself, not an article link. I could not tell whether a visitor can ever hit it.
- **`prices-03-12.mjs`, first run** (`prices-03-12.out`): 59/61 at 1280 px. One FAQ answer read as "" right after it was opened, which failed «each answer, opened, reads verbatim» and the JSON-LD-equals-visible comparison that depends on it. The script reads `innerText` 450 ms after the click. Three reruns passed 61/61, so this looks like the harness reading during the open animation.

#### Screenshots

All in `/private/tmp/claude-504/-Users-Leo-Documents-L-Angular-advocate-website/a4e0c721-b60c-4ee4-8390-645c896b41ab/scratchpad/shots/12/`, each at 390 and 1280:
- **touched blocks:**
  - `prices-header-<w>.png`
  - `prices-group1-oral-open-<w>.png`
  - `consultation-header-<w>.png`
  - `consultation-consent-submit-<w>.png`
  - `home-need-help-<w>.png`
  - `home-seo-intro-<w>.png`
  - `home-seo-note-<w>.png`
  - `home-seo-cta-<w>.png`
  - `services-cards-<w>.png`
  - `services-closing-<w>.png`
  - `faq-price-answer-<w>.png`
  - `faq-closing-<w>.png`
  - `court-cases-intro-<w>.png`
  - `court-case-460-12796-25-cta-<w>.png`
  - `court-case-582-867-21-cta-<w>.png`
  - `instructions-intro-<w>.png`
  - `about-final-cta-<w>.png`
  - `contacts-intro-<w>.png`
  - `contacts-format-<w>.png`
  - `contacts-cta-<w>.png`
  - `documents-cta-<w>.png`
- **ticket 06's pass:**
  - `prices-<w>-full-collapsed.png`
  - `prices-<w>-three-open.png`
  - `prices-<w>-inshi-posluhy.png`
  - `prices-<w>-factors.png`
  - `prices-<w>-faq-court-open-full.png`. The element shots `prices-<w>-faq-court-open.png` paint only the viewport's height, which leaves the section's foot white at 1280, as in ticket 06's shot. The `-full` retakes come from `retake-faq-12.mjs`.
  - `prices-<w>-closing.png`
  - `prices-1280-first-screen.png`
  - `consultation-from-row-<w>.png`
  - `menu-900-prices.png`
  - `menu-900-more-open.png`
  - `drawer-390.png`
  - `footer-<w>.png`
  - `inapp-{services,navishcho}-to-audyt-pensiinoi-spravy-<w>.png`
  - `inapp-{home,skoro}-to-pryznachennia-pensii-<w>.png`
  - `services-cost-<w>.png`
  - `home-cost-<w>.png`
  - `faq-cost-<w>.png`
