# 13: «юридичну допомогу» in nine call-to-action texts and the price page closing block reordered

**What to build:** The six call-to-action texts the advocate marked, and the three that carry the same phrase, say «яку юридичну допомогу можу запропонувати», and the price page's closing block puts its button between the text and the two smaller lines, like the other closing blocks. Spec: `.scratch/2026-10-12-cost-of-services/spec.md`, section "Second follow-up: the advocate's corrections (2026-10-13, evening)".

**Blocked by:** None (can start immediately)

**Status:** resolved

- [x] The six texts in the spec read «яку юридичну допомогу можу запропонувати» in the prerendered HTML, and the rest of each text is unchanged.
- [x] The three texts outside her screenshots follow her answer to the pending question.
- [x] On `/prices/`, the closing block shows the intro text, the button, the italic note and the gold line, in that order; the note matches the size, style and colour of `.final-cta-note` on `/services/`.
- [x] `npm run build:ssg` prints no `ERROR` lines and `Prerendered 111 static routes`; the route and anchor checks in CLAUDE.md pass.
- [x] Screenshots of every touched block at ~390 px and ~1280 px, before and after.

## Comments

### 2026-10-13: six texts and the price page block

- **Commits:** `689e50b` (home, both texts), `08aa03b` (services), `69db2cc` (about-me), `9f22267` (documents), `353281c` (faq), `3eab4d3` (prices). Each text edit inserts «юридичну» and rewraps the line; no other line changes.
- **Build at `3eab4d3`:** `npm run build:ssg` exits 0 with 0 `ERROR` lines and `Prerendered 111 static routes.`; the route check prints `all 111 routes written`, the anchor check `all 223 fragment links resolve`. Log: `/private/tmp/claude-504/-Users-Leo-Documents-L-Angular-advocate-website/a4e0c721-b60c-4ee4-8390-645c896b41ab/scratchpad/build-13-s2.log`.
- **Texts:** all six texts, the price page note and the gold line appear verbatim in the prerendered HTML (tags stripped, whitespace collapsed). «яку допомогу можу» is left on 31 pages: `/consultation/`, `/contacts/` and the 29 decision pages, the three texts the pending question covers.
- **Price page block:** served build, headless Chromium. Order is intro, button, note, gold line at 390 and 1280 px. The gaps (intro→button 16 px, button→note 20 px, note→gold line 20 px) equal the services closing block's (intro→button 16 px, button→note 20 px, note→links 20 px). The note computes to 15.2 px, italic, `rgba(224, 214, 193, 0.8)`, line-height 24.32 px, the same as `.final-cta-note` on `/services/` and `/about-me/`. The old `margin-top: 1.75rem` on the action group is gone and its gap is 1.25rem, as on services.
- **Screenshots** before and after of all seven blocks at 390 and 1280 px: `/private/tmp/claude-504/-Users-Leo-Documents-L-Angular-advocate-website/a4e0c721-b60c-4ee4-8390-645c896b41ab/scratchpad/shots/13/`. Script and output: `/private/tmp/claude-504/-Users-Leo-Documents-L-Angular-advocate-website/a4e0c721-b60c-4ee4-8390-645c896b41ab/scratchpad/checks/13/`.
- **Sitemap:** every touched page already has lastmod 2026-10-13 from ticket 12; nothing to change if this ships today.

### 2026-10-13: the three remaining texts (her answer 1а)

- **Commits:** `5b40ddb` (contacts), `dc54c93` (consultation), `70e1038` (court decision template). Each inserts «юридичну» and rewraps the line.
- **Build:** `npm run build:ssg` exits 0 with 0 `ERROR` lines and `Prerendered 111 static routes.`; `all 111 routes written`; `all 223 fragment links resolve`. Log: `/private/tmp/claude-504/-Users-Leo-Documents-L-Angular-advocate-website/a4e0c721-b60c-4ee4-8390-645c896b41ab/scratchpad/build-13-s3.log`.
- **Texts:** «яку допомогу можу» is on 0 built pages. «яку юридичну допомогу можу» is on 36: the six pages above (home twice), `/contacts/`, `/consultation/` and all 29 decision pages. The full new texts on `/contacts/`, `/consultation/` and every decision page match verbatim.
- **Screenshots** before and after at 390 and 1280 px of the contacts block, the consultation form footer and one decision page's block (`160-14195-26`), next to the earlier ones in `/private/tmp/claude-504/-Users-Leo-Documents-L-Angular-advocate-website/a4e0c721-b60c-4ee4-8390-645c896b41ab/scratchpad/shots/13/`.
- **Sitemap:** `/contacts/`, `/consultation/` and the 29 decision pages already have lastmod 2026-10-13.
