# 05: Services, home and FAQ pages point to the price page

**What to build:** Three places on the site still say only that the cost «визначається індивідуально». After this ticket each of them carries the advocate's new wording and leads to `/prices/`:
- the «Вартість юридичних послуг» section of the services page;
- the «Вартість юридичних послуг» block in the home page's collapsible FAQ section;
- the answer to «Скільки коштують послуги адвоката?» on the FAQ page.

The shared FAQ accordion first gains an optional link under an answer. It is a small prefactor, and every other page that uses the accordion looks exactly as before.

Spec: `.scratch/2026-10-12-cost-of-services/spec.md`, sections "Shared FAQ accordion" and "Other pages".

**Blocked by:** 02

**Status:** resolved

- [x] Before any change, take screenshots at ~390 px of the FAQ accordion on four pages, for comparison:
  - the services page;
  - the FAQ page;
  - one instruction page;
  - one court decision page.
- [x] The shared FAQ item has an optional link (label and route). When present, it renders under the answer as an arrow link in the site's link style. Answers stay plain text. On the four pages above, the accordions match the "before" screenshots, apart from the FAQ page's edited answer.
- [x] Services page, section «Вартість юридичних послуг»:
  - the H2 is unchanged;
  - the paragraph is replaced by the advocate's two paragraphs, with her bold fragment;
  - the section's «Записатися на консультацію» button is replaced by a primary button «Переглянути вартість послуг» that opens `/prices/`.

  The page's other consultation buttons are unchanged.
- [x] Home page, block «Вартість юридичних послуг» in the collapsible FAQ section:
  - the heading is unchanged;
  - both paragraphs are replaced by the advocate's paragraph;
  - an arrow link «Переглянути вартість послуг» to `/prices/` is visible after «Читати далі».
- [x] FAQ page, «Скільки коштують послуги адвоката?»:
  - the answer is the spec's text;
  - it carries the new FAQ link «Переглянути вартість послуг» to `/prices/`;
  - the copy of that answer in the FAQ page's JSON-LD has the same text.
- [x] At ~390 px and ~1280 px all three places show the new text and their links open `/prices/`. Screenshots go in Comments.
- [x] `npm run build:ssg` prints no `ERROR` lines, and every route writes its `index.html`.

## Comments

### 2026-10-12: implemented

- **Commits:**
  - `faac875` feat(faq): let a shared FAQ answer carry an optional arrow link
  - `2d5f816` feat(faq): point the cost answer on the FAQ page to the price page
  - `5c0f862` feat(services): send the «Вартість юридичних послуг» section to the price page
  - `2479c9e` feat(home): link the home page's cost block to the price page
- **Build at `2479c9e`:** `npm run build:ssg` exits 0, prints 0 `ERROR` lines and ends with `Prerendered 111 static routes.` The route check printed `all 111 routes written`. The anchor check printed `all 223 fragment links resolve` and exited 0, the same count as the build before this ticket. `npx tsc --noEmit -p tsconfig.app.json` is clean. Prettier is clean on every changed line. `faq.component.ts`, `seo.config.ts` and `services.component.html` already had unrelated Prettier differences at `1aea8e2`, which were left alone.
- **Shared FAQ item:** `FaqItem` gains `link?: { label: string; route: string }`. When present, the accordion renders a `routerLink` under the answer's `<p>`, with the label and a `mat-icon` `arrow_forward`. The style is the site's gold arrow link: `--color-gold-accent`, weight 600, green on hover, and the icon shifts 4 px. The answer itself is still `{{ faq.answer }}` (plain text).
- **Check scripts** in `/private/tmp/claude-504/-Users-Leo-Documents-L-Angular-advocate-website/a4e0c721-b60c-4ee4-8390-645c896b41ab/scratchpad/checks/05/` ran against the production build, served by `http-server`. The baseline build of `1aea8e2`, taken before any change, was copied aside and served on :8096. The working build was served on :8095. Both servers were stopped afterwards. The scripts drive plain HTTP and headless Chromium 151 at 390 × 844 and 1280 × 800.
  - `places-05.mjs`: on the baseline, `red-before.out` gives 11/44. On the final build, `green-final.out` gives 50/50.
  - Its expected texts are typed by hand. A byte comparison confirmed them equal to `cost_of_services.md` l. 445 (home), l. 452 and 454 (services, bold fragment included) and the spec's FAQ answer.
- **Accordions, before and after (`accordions-05.mjs`).** At 390 px it captures each accordion closed, then with each panel opened in turn. It records the visible question, answer, links and heights, and compares the images pixel by pixel.
  - **Capture method.** The accordion is pinned at its own width over a solid backdrop. Two things made direct element shots unreliable:
    - this ticket makes the services pricing section above it 134.8 px taller, and the new fractional y changes text rasterisation;
    - the instruction page's article runs an entry transform.
  - **Noise.** Two captures of the unchanged baseline differ by at most 20 pixels per image. These are corner anti-aliasing or a few faint rows of an open panel's shadow. Up to 40 pixels counts as noise (`accordions-baseline-rerun.out`: 0 real differences).
  - **The first pre-change capture**, taken before any edit as plain element screenshots, is kept in `shots/05/before-unaligned/`.

  | Page | Panels | Text, links, heights identical | Screenshots (closed + each open) |
  | --- | --- | --- | --- |
  | `/services/` | 6 | 6 of 6; closed height 460.875 = 460.875 | 7 of 7 same (1 within noise) |
  | `/faq/` | 12 | 11 of 12; only «Скільки коштують послуги адвоката?» differs | 12 of 13 same (4 within noise); `faq-open-11` differs: 1096 → 1180 px, the new answer plus link |
  | `/instructions/kep-privatbank/` | 3 | 3 of 3 | 4 of 4 same |
  | `/court-cases/160-14195-26/` | 5 | 5 of 5 | 6 of 6 same (1 within noise) |
  | `/prices/` (fifth caller, not named by the ticket) | 6 | 6 of 6 | 7 of 7 same (2 within noise) |

  Outputs: `accordions-final.out`, `accordions-text-diff.out` (the only diff is the edited FAQ panel), `accordions-prices.out`.
- **Services page** (390 and 1280):
  - The H2 is still «Вартість юридичних послуг».
  - The section's two `<p>` are her two paragraphs. The bold `<strong>` is exactly «орієнтовну вартість консультацій, перевірки документів і стажу, звернення до Пенсійного фонду України, судового супроводу та інших послуг».
  - The section's only link is a green primary `appCtaButton` «Переглянути вартість послуг», `href="/prices"`. Tapping it lands on `/prices` with H1 «Вартість послуг пенсійного адвоката».
  - The other five `/consultation` links are unchanged: three card links, «…з пенсійних питань» and the closing button.
  - Prerendered HTML carries the same text and link.
- **Home page** (390 and 1280):
  - The heading is unchanged, and the block's single `<p>` is her paragraph.
  - After «Читати далі», the arrow link «Переглянути вартість послуг» (`href="/prices"`) is inside the viewport and is the topmost element at its centre. Tapping it opens `/prices`.
  - The old two paragraphs are gone from the prerendered HTML.
- **FAQ page** (390 and 1280):
  - The answer equals the spec text, with the arrow link under it. The link is tappable and opens `/prices`.
  - In the prerendered HTML, the FAQPage JSON-LD `acceptedAnswer.text` for that question equals the spec text exactly.
- **No sideways overflow** on the three pages at either width.
- **Regression:** ticket 04's `anchors-04.mjs` passes 32/32 and ticket 03's `prices-03.mjs` 60/60. Ticket 02's `prices-02.mjs` passes 78/82, with the same 4 expected failures recorded after ticket 03. Outputs are in `checks/05/*-after-05.out`.
- **Choices made within the spec:**
  - The services button uses `icon="arrow_forward"`, standing in for the → in her «Переглянути вартість послуг →».
  - Rendered `href`s read `/prices`, without the slash, as every `routerLink="/prices/"` in the app does, nav included.
- **Screenshots** in `/private/tmp/claude-504/-Users-Leo-Documents-L-Angular-advocate-website/a4e0c721-b60c-4ee4-8390-645c896b41ab/scratchpad/shots/05/`:
  - three places, before and after: `before-services-390.png`, `before-services-1280.png`, `after-services-390.png`, `after-services-1280.png`, `before-home-390.png`, `before-home-1280.png`, `after-home-390.png`, `after-home-1280.png`, `before-faq-390.png`, `before-faq-1280.png`, `after-faq-390.png`, `after-faq-1280.png`
  - accordions: `before/`, `before-rerun/`, `after-final/`, `before-prices/`, `after-final-prices/` (each holds `<page>-closed.png`, `<page>-open-<i>.png`, `panels.json`), and the first pre-change capture `before-unaligned/`

**2026-10-12, resolved.** Commits: faac875, 2d5f816, 5c0f862, 2479c9e. Independent check on the final build (83d42ca): `npm run build:ssg` printed 0 `ERROR` lines and `Prerendered 111 static routes`; every route wrote its `index.html`; the anchor check printed `all 223 fragment links resolve`; the 17 rows of the prerendered `/prices/` match the spec table in order, id, title, price and «орієнтовно» caption; 248 lines of the advocate's draft were found in the prerendered page, the only misses being headings markers, the per-service price lines the spec moves into the row, the draft's notes and the agreed «;» → «.» fix.
