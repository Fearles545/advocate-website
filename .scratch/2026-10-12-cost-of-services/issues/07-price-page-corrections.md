# 07: Price page corrections

**What to build:** The advocate's corrections to `/prices/`. The header opens with the line about indicative cost in the large size, without the paragraph about her practice. Range prices lose the «орієнтовно» caption. Each open row ends with «Описати свою ситуацію →». The oral consultation no longer states its duration. «правничої допомоги» reads «юридичної допомоги». Spec: `.scratch/2026-10-12-cost-of-services/spec.md`, section "Follow-up: the advocate's corrections (2026-10-13)", subsection "Price page".

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [x] Before any change, screenshots of the page header and of the first price group at ~390 px and ~1280 px.
- [x] The header has no «Надаю юридичну допомогу…» paragraph. Its first two paragraphs are the spec's two texts, each in the size the deleted paragraph had. «До початку надання послуги погоджуються її обсяг та вартість.» follows in the secondary size, then the year badge.
- [x] No «орієнтовно» caption anywhere on the page. At ~390 px and from 640 px the row layout stays balanced without it (price under the title on phones, right-aligned from 640 px).
- [x] Every open row ends with the link «Описати свою ситуацію →» to the consultation form.
- [x] «Усна консультація з пенсійного питання» shows «Консультація проводиться за попереднім записом у погоджений день і час.» with its bold, and no sentence about duration.
- [x] The page, its FAQ answers and its JSON-LD contain no «правнич…»; each occurrence reads «юридич…» in the right case.
- [x] Nothing else on the page changes: prices, ids, other texts, sections and JSON-LD match the build before this ticket, apart from the edits above.
- [x] At ~390 px and ~1280 px the header and the rows look right; screenshots go in Comments.
- [x] `npm run build:ssg` prints no `ERROR` lines and `Prerendered 111 static routes`; the route and anchor checks in CLAUDE.md pass.

## Comments

### 2026-10-13: implemented

- **Commits:**
  - `ac874bc` feat(prices): open the header with the indicative-cost lines
  - `9cddedc` feat(prices): drop the «орієнтовно» caption under range prices
  - `385084a` feat(prices): end each price row with «Описати свою ситуацію →»
  - `e447a6d` feat(prices): stop stating the oral consultation's duration
  - `829b177` feat(prices): say «юридичної допомоги» instead of «правничої допомоги»
- **Build at `829b177`:** `npm run build:ssg` exits 0, prints 0 `ERROR` lines and ends with `Prerendered 111 static routes.` The route check from CLAUDE.md prints `all 111 routes written`. The anchor check, copied from CLAUDE.md, prints `all 223 fragment links resolve` and exits 0. `npx tsc --noEmit` is clean, and Prettier finds nothing to change in the touched files. The sitemap is untouched (ticket 12).
- **Dead code removed with the edits:**
  - the `@if` branch and the `.price-caption` style;
  - the inner `.price-amount` span. The price column held only the amount, so its flex stacking went and the amount's style moved onto `.price-row-price`;
  - the `.page-intro.secondary + .page-intro.secondary` spacing rule. Only the year badge still matched it, and the badge's own rule overrides that margin.
- **Seam:** the production build, served by `http-server`: the pre-ticket build (`55ecca3`, copied aside) on :8093 and each new build on :8094. Both were driven over HTTP and in headless Chromium at 390, 639, 640 and 1280 px. Both servers are stopped. Scripts and outputs are in `/private/tmp/claude-504/-Users-Leo-Documents-L-Angular-advocate-website/a4e0c721-b60c-4ee4-8390-645c896b41ab/scratchpad/checks/07/`.
- **`prices-07.mjs`**, this ticket's check:
  - Expected texts come from the spec's follow-up section (her texts) and her draft (the texts that go). Everything else is compared with the pre-ticket build.
  - Final run (`final.out`): 76 passed, 0 failed.
  - The same script against the pre-ticket build (`red-final-script-on-baseline.out`): 33 passed, 43 failed, spread over header, caption, link, oral, wording and same.
  - Per-slice runs are kept as `green-s1.out` … `green-s5.out`.
- **Header:**
  - The prerendered header holds, in order: the two new lines (`page-intro`), «До початку…» (`page-intro secondary`) and the year badge.
  - At 1280 both new lines are 19.2px/31.68px in #444, as the deleted paragraph was. «До початку…» is 16px in #666, as before.
  - At 390 every intro paragraph is 16px, before and after this ticket: the global `.page-intro` rule drops to 1rem below 480 px. Only the colour sets the large lines apart there.
  - The badge's computed style equals the pre-ticket badge's.
  - Header height went from 750 to 583 px at 390, and from 576 to 494 px at 1280.
- **Rows without the caption:**
  - Nothing sits under a price, and no price wraps.
  - Up to 639 px the price sits under the title, aligned with its left edge, 5 px below it in every row.
  - From 640 px it is right-aligned on one shared right edge and vertically centred in the row (≤ 0.9 px off). The chevron is centred too.
  - A range row now has the same height as a fixed row whose title takes as many lines:

    | Width | Title lines | Range row (px) | Fixed row (px) | Range row before (px) |
    | --- | --- | --- | --- | --- |
    | 390 | 2 | 103 | 103 | 125 |
    | 639 | 1 | 80 | 80 | 102 |
    | 1280 | 1 | 59 | 59 | 80 |

  - No row grew, fixed rows are unchanged, and nothing scrolls sideways with every row open.
- **Link:** the 17 prerendered links read «Описати свою ситуацію» plus the `arrow_forward` icon, each to `/consultation`. In the browser each one is the last thing in its open row. Clicking it in «Перевірка (аудит) пенсійної справи» opens the form at both widths.
- **Oral consultation:** the paragraph reads «Консультація проводиться за попереднім записом у погоджений день і час.» Its only bold is «за попереднім записом у погоджений день і час». Neither the HTML nor the open page contains «Тривалість» or «хвилин».
- **Wording:**
  - The page HTML, including the JSON-LD and the meta tags, contains no «правнич».
  - With every row open and each FAQ answer opened in turn, «юридичної допомоги» shows 5 times: the court fee note, the factors' closing sentence, the closing call to action and 2 FAQ answers. All five were genitive «правничої допомоги», so the case carries over.
- **Nothing else changed**, compared with the pre-ticket build:
  - Page text: the pre-ticket text, with exactly these edits applied, equals the new text. The edits are 1 paragraph deleted, 1 line replaced, 14 captions, 17 link labels, 1 sentence and 5 wording swaps, each count asserted.
  - JSON-LD: the page graph equals the pre-ticket graph with its 2 «правничої допомоги» swapped. The root JSON-LD is unchanged.
  - Unchanged: the 27 title, meta, canonical and hreflang tags, the 111 hrefs and the section/heading skeleton.
  - The 37 ids are unchanged too. One allowance: Material numbers its accordion ids (`mat-expansion-panel-header-N`, `cdk-accordion-child-N`) from a counter that every route rendered by a prerender worker advances, so those numbers move between builds of the same code. The check ignores the numbers only.
- **Earlier checks re-run on the final build**, with only this ticket's corrections applied to their expectations (`prices-02-07.mjs`, `prices-03-07.mjs`):
  - Ticket 03's check: 61 passed, 0 failed.
  - Ticket 02's check: 80 passed, 4 failed. The 4 failures already existed: the unmodified `prices-02.mjs` fails the same 4 against the pre-ticket build (`prices-02-orig-on-baseline.out`), as it did after ticket 04. Its heading list and amount count predate the sections ticket 03 added.
  - Ticket 04's anchor check: 32 passed, 0 failed.
- **Screenshots**, in `/private/tmp/claude-504/-Users-Leo-Documents-L-Angular-advocate-website/a4e0c721-b60c-4ee4-8390-645c896b41ab/scratchpad/shots/07/`:
  - before any change: `before-header-{390,1280}.png` and `before-group1-{390,1280}.png`;
  - after: `after-header-{390,1280}.png` and `after-group1-{390,1280}.png`;
  - with «Усна консультація…» open: `before-open-group1-*.png` and `after-open-group1-*.png`.
