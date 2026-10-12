# Design System Audit — October 2026

**Date:** 2026-10-12
**Scope:** the whole site — 110 prerendered routes and every style source
**Compared:** [`DESIGN_SYSTEM.md`](../DESIGN_SYSTEM.md) (last updated 2026-01-12) ↔ tokens in `src/styles.css` ↔ components ↔ rendered pages
**Previous audit:** [`audit-report.md`](audit-report.md) (2025-12-21, main-page sections only)

---

## How to read this report

Every finding has one class:

| Class | Meaning | Needs a design decision? |
|-------|---------|--------------------------|
| **VISUAL** | Renders differently from the spec or from its siblings | Yes: which value is canonical |
| **HYGIENE** | Renders the same, but bypasses tokens (a literal equal to a token) or duplicates code | No: refactoring only |
| **BYPASS** | A hand-rolled copy of a shared component or pattern | Sometimes |
| **DOC-STALE** | The code is consistent, the doc is wrong or silent | Doc fix |
| **BUG** | A broken reference or an invalid value | Fix |

Only VISUAL findings change what the Design System should look like. HYGIENE findings are the bulk of the numbers below, and none of them is visible to a visitor.

## Method

1. **Static analysis** of 8,578 declarations: `src/styles.css` (478), 25 component `.css` files (5,786), inline `styles` in 24 `.ts` components (2,294) and `style=""` attributes (20). Re-run it with `node docs/design-system/tools/static-audit.mjs`.
2. **Rendered analysis** of the production SSG build: computed styles of every visible element on all 110 routes at 390px and 1440px (Chromium via Playwright). Targeted checks: headings and paragraphs per page type, Angular Material controls in the open state, and whether the app-shell background shows anywhere.
3. **Component review** of every pattern in doc sections 4, 5 and 8 against its implementations, with file:line evidence.
4. **Regression check** of every item in [`normalization-log.md`](normalization-log.md) against the current code.

## Summary

| Layer | What we found | Visible to a visitor? |
|-------|---------------|-----------------------|
| Doc ↔ tokens | Mostly aligned: 2 value mismatches, 23 undocumented tokens, 19 unused tokens, 1 broken reference | No |
| Tokens ↔ code | Several token families exist only on paper: spacing (1 use), `--border-radius-sm/md` and `--shadow-sm/md/lg` (0), breakpoints (0). 48% of color literals are exact copies of a token | Mostly no (hygiene) |
| Rendered pages | 23 font sizes on desktop, only 35% of text on a scale step; `h2` in 13 sizes; 17 light shades; 53% of text inherits a fixed 20px line height | **Yes** |
| Components | 252 findings across 22 patterns: VISUAL 102, HYGIENE 54, BYPASS 33, DOC-STALE 49, BUG 14 (reviewers overlap on a few) | Partly |

**Bugs confirmed in the browser** (details in §7.1):

1. The hover lift is dead on 6 card types (/services/ ×2, /documents/, /faq/, /feedbacks/, /court-cases/).
2. The primary CTA at the end of all 61 blog posts links to `/contacts`, not `/consultation/`.
3. The video spinner covers the whole blog article while YouTube loads (54 of 60 posts embed a video).
4. The `.blog-cta` shimmer never runs: its `@keyframes` is nested inside a style rule.
5. The second intro paragraph on /documents/ is unstyled: `page-intro-secondary` does not exist.
6. Double 2px gold lines at three home-page section boundaries and under the breadcrumb on inner pages.

**What this means for the Design System.** The doc and the tokens are a sound skeleton, but they cannot be copied into a Design System as they are. The type scale lacks the sizes the site uses most, there are no tokens for surfaces, semantic colors, the spacing that is actually used, radii or shadows, and most documented components exist only as copy-paste recipes. §12 lists the 21 decisions to make first; §13 is the clean-up backlog that does not change the look.

---

## 1. Tokens vs doc

The doc and `:root` mostly agree: every token the doc names exists, and only two values differ.

### 1.1 Value mismatches — DOC-STALE

| Token | Doc | CSS |
|-------|-----|-----|
| `--section-padding-y` | `2rem` → `4rem` at 768px+ (DESIGN_SYSTEM.md:183, :1654) | `1.5rem` → `4rem` (styles.css:33, :975) |
| `--font-size-body-lg` | `1.05rem` only (DESIGN_SYSTEM.md:157) | `1.05rem` → `1.15rem` at 768px+ → `1.2rem` at 1024px+ (styles.css:17, :980, :988) |

### 1.2 Undocumented tokens — DOC-STALE (23)

| Group | Tokens |
|-------|--------|
| Typography | `--font-body`, `--font-heading`, `--line-height-heading`, `--font-size-body-sm`, `--font-size-label`, `--font-size-link` |
| Layout | `--spacing-xxl`, `--blog-container-max-width`, `--container-padding`, `--container-padding-mobile` |
| Color | `--color-navy`, `--color-navy-dark`, `--color-container-bg` |
| Border, radius, shadow | `--border-thin`, `--border-accent`, `--border-radius-sm`, `--border-radius-md`, `--shadow-sm`, `--shadow-md`, `--shadow-lg` |
| Breakpoints | `--breakpoint-mobile`, `--breakpoint-tablet`, `--breakpoint-desktop` |

### 1.3 Unused tokens — HYGIENE (19)

`--font-heading`, `--spacing-xxl`, `--container-padding-mobile`, `--color-text-primary`, `--color-success`, `--color-navy`, `--color-navy-dark`, `--color-container-bg`, `--border-thin`, `--border-accent`, `--border-radius-sm`, `--border-radius-md`, `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--breakpoint-mobile`, `--breakpoint-tablet`, `--breakpoint-desktop`, `--gold-alpha-35`.

The three `--breakpoint-*` tokens cannot work: custom properties are not allowed inside `@media` conditions.

### 1.4 Broken values — BUG

| Where | Problem | Effect |
|-------|---------|--------|
| `court-case.component.css:454` | `font-weight: var(--weight-medium)` — the token is defined nowhere and has no fallback | The declaration is dropped; the weight is inherited |
| `styles.css:177` | `h1…h6 { font-family: var(--font-main) }` — `--font-main` is a `font` shorthand (`normal 400 16px/20px 'Lora', serif`), not a family list | Invalid, ignored; headings inherit Lora from `body`. Harmless today, but `--font-heading` never applies |
| `styles.css:159` | `body { font: var(--font-main) }` sets an absolute `line-height: 20px`, which children inherit as 20px whatever their font size | **VISUAL.** On 15 page types, 1,692 of 3,219 text elements (53%) render with a 20px line height: ratio 1.92 for 10.4px text, 1.56 for 12.8px, 1.14 for 17.6px, 0.83 for 24px headings. The doc says body text is 1.55–1.7 |

---

## 2. Color

### 2.1 Overview

725 color literals outside the token definitions:

| Class | Uses | Share | Note |
|-------|------|-------|------|
| Exact copy of a token — HYGIENE | 345 | 48% | In 43 files; the doc asks to use the alpha tokens instead of inline `rgba()` |
| Brand alpha step with no token | 101 | 14% | 19 distinct steps, see 2.4 |
| Off-palette, opaque | 174 | 24% | 96 of them are `#ffffff` |
| White or black with alpha | 72 | 10% | Text and overlays on dark sections |
| Off-palette with alpha | 33 | 5% | |

Rendered, a visitor sees 18 text colors, 26 background colors and 53 distinct gradients.

### 2.2 Light backgrounds — VISUAL

There is no token for white or cream, so light surfaces are typed by hand. 17 light shades (L\* > 90) are in use:

| Color | Uses | Files | Where (first) | Note |
|-------|------|-------|---------------|------|
| `#ffffff` | 96 | 39 | cards everywhere | Rendered on 1,368 elements |
| `#f8f6f2` | 23 | 13 | about-me, section backgrounds | The cream the doc names (DESIGN_SYSTEM.md:84) |
| `#f5f2ed` | 6 | 3 | `styles.css:820` page background | `.page-bg-pattern` gradient ends, 109 pages |
| `#faf8f5` | 5 | 3 | `styles.css:820` page background | gradient middle |
| `#faf9f6` | 4 | 2 | `contacts.component.css:508`, `documents.component.css:673` | |
| `#fefdfb` | 3 | 3 | `blog-post.component.css:138`, `court-case…:98`, `instruction…:94` | meta card gradient, 97 pages |
| `#faf9f7` | 3 | 3 | same three files | meta card gradient |
| `#fffdf8` | 2 | 2 | `court-cases-list…:54`, `court-cases-section…:127` | |
| `#fffcf7` | 2 | 2 | `social-share.component.ts:162`, `category-filter.component.ts:216` | |
| `#f5f3ef` | 2 | 2 | `contacts…:508`, `documents…:673` | |
| `#fdfcfa` | 1 | 1 | `about-section.component.ts:78` | |
| `#f5f5f5`, `#e8e8e8` | 1 + 1 | 1 | `styles.css:709` | grey photo-frame placeholder, off-brand |
| `#f1f1f1` | 1 | 1 | `feedback-section.component.css:242` | grey |
| `#f0f2f3`, `#e4edf4`, `#edf6fa` | 3 | 1 | `app.component.css:60, :75` | bluish legacy shell background, never visible (see §10) |

Ten creams sit within ΔE 1.3–5.2 of white and of each other: side by side most pairs are barely distinguishable, yet each one was chosen by hand.

### 2.3 Off-palette accent and semantic colors — VISUAL

| Color | Where | Role | Note |
|-------|-------|------|------|
| `#dc2626` ×4 | `consultation.component.css:132, :146, :191, :435` | Form errors | Tailwind red-600 |
| `#d32f2f`, `#b71c1c`, `rgba(211, 47, 47, …)` | `instruction.component.css:469–482` | "Important" notes | Material reds: a second red family |
| `#ff9800`, `#6d4c00` | `instruction.component.css:431–440` | Step warnings | Material orange |
| `#ffd700`, `#f0c850` | `feedbacks.component.css:204, :82` | Stars | `--color-star: #f5b800` exists: three yellows |
| `#374151` | `faq-accordion.component.ts:102` | Answer text | Tailwind gray-700; text tokens are `#444` / `#666` |
| `#000` | `header.component.ts:129`, `footer.component.css:16` | Header and footer background | Pure black is not in the palette (the doc's dark is `--color-green-darkest`) |
| `#1a5c1a`, `#0d3d0d` | `consultation.component.css:508` | Success badge | Copies of `--color-success-bg` stops — HYGIENE |

The palette has no error or warning colors, so each feature invented its own.

### 2.4 Alpha ladders — VISUAL (border and tint strengths)

| Base | Tokens | Steps used without a token (uses) |
|------|--------|------------------------------------|
| Gold `rgb(201, 165, 92)` | .06 .10 .15 .20 .30 .35 .40 | .08 (22), .25 (21), .12 (8), .50 (8), .05 (4), .04 (4), .03 (3), .18 (3), .60 (3), .70 (2), .02 (1), 0 (1) |
| Green `rgb(0, 39, 6)` | .03 .04 .06 .08 .10 .15 .20 .25 .30 | .02 (8), .05 (6), .015 (2), .40 (2), .12 (1), .55 (1), .60 (1) |

Rendered, gold borders come in eight strengths (.10, .12, .15, .18, .20, .25, .30, .40) plus solid gold.

### 2.5 Text on dark backgrounds — VISUAL (accessibility)

Footer legal links (`footer.component.css:556`): `rgba(255, 255, 255, 0.4)` at 12px on near-black gives about 3.7:1; WCAG AA needs 4.5:1. White text on dark sections uses five alphas (.4, .5, .6, .7, .9) with no tokens.

---

## 3. Typography

### 3.1 Font sizes

706 `font-size` declarations:

| Class | Uses | Share |
|-------|------|-------|
| Token | 95 | 13% |
| Literal equal to a scale step — HYGIENE | 278 | 39% |
| Literal off the scale — VISUAL | 330 | 47% |

The scale (12, 14.4, 15.2, 16.8, 17.6, 18.4, 19.2, 22, 24, 28, 36 px) is missing the two sizes the code uses most: `1rem` (16px, 71 uses in 34 files) and `1.25rem` (20px, 60 uses in 33 files). Other frequent off-scale values: `0.8rem` (34), `0.85rem` (33), `0.875rem` (17), `1.35rem` (16), `2rem` (14), `0.7rem` (14), `1.125rem` (13).

Rendered, the result is 20 distinct sizes on mobile (51% of text elements on a scale step) and 23 on desktop (35%). Literals do not follow the responsive tokens: `1.05rem` is a scale step on mobile but stays 16.8px on desktop, where `--font-size-body-lg` grows to 19.2px.

### 3.2 Hierarchy per page type — VISUAL

Rendered at 1440px on 15 representative pages:

| Element | Sizes | Detail |
|---------|-------|--------|
| `h1` | 36px, 28px | 36px on landing and list pages; 28px on blog posts, court cases and instructions (mobile: 28 / 20) |
| `h2` | **13 sizes**, 16.8–45.6px | 28px in most sections; 45.6 about-me, 44 about-section, 36 need-help, 32 documents and contacts, 26.4 documents-section, 22.4 / 20 / 19.2 court-case, 22 blog-post, 21.6 about-me / services / privacy-policy, 18 blog-faq, 16.8 blog-list |
| `p` | **9 sizes**, 12.8–19.2px | 19.2px on landing pages, 16.8px in blog posts and court cases, 16 / 15.2 / 14.4px elsewhere |

Reading text is smallest where reading matters most: blog body text is 16.8px (`styles.css:206`, a literal `1.05rem`) while landing-page paragraphs are 19.2px.

### 3.3 Text under 12px — VISUAL (accessibility)

20 declarations set `0.6–0.7rem` (9.6–11.2px), mostly inside `max-width: 479px` blocks: footer (`footer.component.css:711, :741, :749`), blog list, contacts, documents, feedbacks, intro, need-help, court-cases section, blog links, related articles, category links, prev/next navigator. Rendered on mobile: 1,367 elements at 11.2px and 231 at 10.4px.

### 3.4 Typefaces — VISUAL

Lora renders on 12,873 of 12,877 text elements (mobile; desktop 14,441 of 14,445). Cormorant Garamond is loaded (`index.html:234`, weights 300–700 with italics) for four `h2` — about-section (`about-section.component.ts:267`), about-me (`about-me.component.css:70`, `:124`), contacts (`:643`), documents (`:800`) — and the blog quote mark (`styles.css:363`). The doc lists Lora only, and `--font-heading` is unused.

### 3.5 Weights, line heights, letter spacing

| Property | Values in code | Note |
|----------|----------------|------|
| `font-weight` | 600 (77), 500 (43), 700 (40), tokens (23), 300 (6), `bold` (4), 400 (3), 800 (1) | 500 is used 43 times with no token |
| `line-height` | 14 literal values from 1 to 1.8 | One token, used once |
| `letter-spacing` | 17 values, px and em mixed | No tokens |

---

## 4. Spacing and layout

| Measure | Value |
|---------|-------|
| Literal lengths in padding, margin and gap | 1,310 |
| Token references | 77 (section paddings 74, `--spacing-md` 1, `--container-padding` 1) |
| Distinct literal lengths | 38 |
| On a 4px grid | 86% |

The `--spacing-*` scale exists only on paper. The code follows its own scale: `1rem` (228), `1.5rem` (171), `1.25rem` (146), `0.5rem` (143), `0.75rem` (141), `2rem` (118), `2.5rem` (61), `0.25rem` (36), `3rem` (32), `1.75rem` (27). Off-grid values: `0.875rem` (38), `0.35rem` (24), `0.4rem` (21), `0.625rem` (18), `0.375rem` (15), `0.6rem` (13) and 12 rarer ones.

Section paddings do use their tokens (74 references), and the rendered section paddings follow them, except the hero bottom padding on /documents/ (2rem) and /contacts/ (1.5rem).

---

## 5. Radius, shadow, motion

| Family | Code | Rendered | Tokens |
|--------|------|----------|--------|
| Radius | 25 distinct values | 13: 50%, 12, 4, 8, 32, 2, 10, 48, 6, 16, 28, 20, 5px | `--card-border-radius` ×44 (plus `0.75rem` typed 13 times); `--border-radius-sm/md` unused |
| Shadow | 163 declarations, 96 distinct | 40 distinct on mobile, 66 on desktop | 52 declarations use a token; `--shadow-sm/md/lg` unused |
| Duration | 17 distinct | — | `--transition-normal` ×86, while `300ms` is typed 140 times |
| Easing | 8 distinct | — | `--ease-bounce` ×20 plus 40 literals; `--ease-standard` ×31 plus 13 literals |

DOC-STALE: the image-hover easing `cubic-bezier(0.25, 0.46, 0.45, 0.94)` is documented as "used in" eight components (DESIGN_SYSTEM.md:1590); the code has it once (`about-section.component.ts:133`).

---

## 6. Breakpoints — VISUAL

The doc defines five: `479px` (max), `640px`, `768px`, `1024px`, `1200px`. The code uses 24 media features:

| Media feature | Blocks | In the doc? |
|---------------|--------|-------------|
| `max-width: 479px` | 31 | Yes |
| `min-width: 768px` | 25 | Yes |
| `min-width: 640px` | 17 | Yes |
| `min-width: 1024px` | 15 | Yes |
| `max-width: 768px` | 13 | **Overlaps** `min-width: 768px` |
| `min-width: 480px` | 6 | No |
| `min-width: 600px`, `max-width: 600px` | 7 | No |
| `min-width: 1280px`, `max-width: 1279px` | 6 | No |
| `max-width: 1023px` | 3 | Mirror of 1024 |
| `max-width: 400px`, `max-width: 1100px` | 6 | No |
| 11 more (320, 359, 360, 480, 639, 769, 800, 899, 1000, 1535, 1919px) | 1–2 each | No |

At exactly 768px both `max-width: 768px` (12 files) and `min-width: 768px` match, so mobile and tablet rules apply at once. `1200px` is documented but used by no media query.

---

## 7. Components vs spec

Every pattern in DESIGN_SYSTEM.md §4, plus §5 section backgrounds and §8 grids, was compared with every place it is used, including hand-rolled look-alikes. Full tables with file:line evidence are in the appendices:

- [`audit-2026-10/cta-and-cards.md`](audit-2026-10/cta-and-cards.md) — §4.1–4.3
- [`audit-2026-10/icons-and-headers.md`](audit-2026-10/icons-and-headers.md) — §4.4–4.6
- [`audit-2026-10/decorative-patterns.md`](audit-2026-10/decorative-patterns.md) — §4.7–4.12
- [`audit-2026-10/service-cards-toggles-blog-loader.md`](audit-2026-10/service-cards-toggles-blog-loader.md) — §4.13–4.17
- [`audit-2026-10/sections-and-grids.md`](audit-2026-10/sections-and-grids.md) — §3, §5, §8

### 7.1 Confirmed in the browser

| # | Finding | Cause | Browser check |
|---|---------|-------|---------------|
| 1 | Hover lift dead on 6 card types | `animation: cardReveal … forwards` holds `transform`: `services.component.css:66→75`, `:303→332`; `documents.component.css:575→585`; `faq.component.css:87→97`; `feedbacks.component.css:69→91`; `court-cases-list.component.css:66→118` | Hovered each card: `transform` stays `matrix(1, 0, 0, 1, 0, 0)`. Cards without the entrance animation (home services, about-me qualifications) lift by 4px |
| 2 | Blog-post CTA links to `/contacts` | `blog-links.component.ts:33` | Rendered `href="/contacts"` on «Записатися на консультацію»; every other consultation CTA goes to `/consultation/` |
| 3 | Video spinner covers the article | `blog-iframe.component.ts:62` omits `[blocking]="false"`; `.blog-article` has `backdrop-filter` and a transform, so it becomes the containing block of the fixed overlay | With the YouTube request held, the overlay (`position: fixed`, z-index 1050) measured 884×4172px over an 886×4174px article; the top element inside the article was `spinner-backdrop` |
| 4 | `.blog-cta` shimmer never runs | `@keyframes blogCtaShimmer` nested inside `.blog-post-section` (`styles.css:540-548`) | No top-level keyframes rule in the CSSOM; 0 running animations, although `::before` names `blogCtaShimmer` |
| 5 | /documents/ second intro unstyled | `documents.component.html:15` uses `page-intro-secondary`; the modifier is `.page-intro.secondary` | Renders #444 at 19.2px like the first paragraph, instead of #666 at 16px |
| 6 | Double gold separators | intro `::after` + pension-help `::before`; about `.decorative-line` + services `::before`; court-cases `::after` + seo `::before`; breadcrumb `border-bottom` + `.page-bg-pattern::before` | Zoomed screenshots: 2px gold bands at the three home boundaries against 1px at a control boundary; two lines under the breadcrumb |

Also confirmed: the `h1` on blog posts, court cases and instructions (98 routes) has no gold underline, and the two home dark sections render white `h2` while the other dark sections use gold.

### 7.2 Per pattern

| Pattern | VISUAL | HYGIENE | BYPASS | DOC-STALE | BUG | Main issue |
|---------|-------:|--------:|-------:|----------:|----:|------------|
| 4.1 Primary CTA | 2 | 2 | 2 | 2 | 0 | The directive matches the spec and sits on the right background in all 16 uses. The CTA on every blog post is hand-built: smaller, no gradient shift or icon shake, links to `/contacts` |
| 4.2 Outline CTA | 1 | 1 | 2 | 1 | 1 | `.service-cta-btn` on /services/ is a hand-built gold pill with 2.85:1 text contrast; `.reset-btn` on /consultation/ revives the pre-December documents CTA |
| 4.3 Cards | 14 | 4 | 0 | 5 | 1 | Dead hover (7.1); three "large container" shadows; white in five opacities; /feedbacks/ shows the home-page reviews in a legacy card style. No shared `.card` class |
| 4.4 Icon wrappers | 9 | 5 | 2 | 5 | 0 | The doc's `.icon-wrapper-*` classes do not exist: about 40 wrappers under 30 names. 2.75rem and 3rem off the scale. Large badges are green on light and gold on dark, contrary to the doc |
| 4.5 Section headers | 12 | 5 | 5 | 0 | 0 | The underline block is copied 17 times. Intros vary in placement, size (3 values), line height (3) and colour. On /about-me/ an `h2` is larger than the `h1` |
| 4.6 Page header | 6 | 2 | 1 | 2 | 2 | 98 detail routes use a separate header in three drifting copies. The badge's inset highlight never renders (held by the `forwards` animation) |
| 4.7 Photo frame | 4 | 3 | 1 | 1 | 0 | The global class has no `img` rule: following the doc paints the gold border over the photo. Three users, three offset ramps |
| 4.8 Frosted wrapper | 2 | 2 | 5 | 1 | 0 | Five recipes: opacity .70–.90, blur 10 or 12px, four different shadows |
| 4.9 Section label | 0 | 1 | 1 | 1 | 0 | Consistent; the doc says 768px where the code correctly uses 1024px |
| 4.10 Quote marks | 1 | 2 | 1 | 1 | 0 | The doc assigns the glyph to testimonials; testimonials use the Material `format_quote` icon |
| 4.11 Highlight box | 4 | 2 | 4 | 2 | 1 | Seven hand-rolled copies next to the global class; blog quotes are a second family (4px border, right corners only) |
| 4.12 Nav links | 1 | 3 | 1 | 1 | 1 | Three variants; the dark one (about 41 pages) uses a `|` glyph that screen readers announce |
| 4.13 Service card | 5 | 2 | 3 | 4 | 1 | The code is consistent and the doc is stale (−2px vs −4px). On 18 cards the icon sits inside the `h3`, so its ligature text becomes part of the heading |
| 4.14 Prominent action card | 2 | 1 | 0 | 5 | 1 | The two copies already differ in shadow and lift |
| 4.15 Expand/toggle | 5 | 2 | 1 | 3 | 0 | /documents/ follows the spec; the home toggle is a filled button with an instant icon swap |
| 4.16 Blog typography | 4 | 2 | 2 | 3 | 3 | Shimmer dead (7.1); paragraphs inside quotes and asides have no gap; one post runs two paragraphs together |
| 4.17 Loader | 1 | 3 | 0 | 4 | 0 | The video spinner covers the article (7.1); an unused off-brand `LoaderComponent` remains |
| 5.1 Separators | 6 | 2 | 1 | 1 | 1 | Double lines (7.1); dark sections mix the full and centre-fade gradients |
| 5.2 Light sections | 4 | 3 | 0 | 1 | 0 | 8 section backgrounds built from 9 creams; `.page-bg-pattern` (15 templates) is missing from §5.2 |
| 5.3 Dark sections | 7 | 4 | 0 | 3 | 0 | White `h2` in 2 sections, gold in 8; the "dark card in a light section" appears 4 times, undocumented |
| 5.4 Containers | 3 | 3 | 1 | 2 | 2 | Two 1200px tokens; `.container` is dead; at 480–767px the header is inset 2rem while content is inset 1rem |
| 8 Grids | 9 | 0 | 0 | 1 | 0 | Gaps of 1, 1.5, 1.75 and 2rem; columns switch at 480, 640, 768 and 1024px |
| **Total** | **102** | **54** | **33** | **49** | **14** | |

---

## 8. Accessibility side-findings

- **Contrast:** footer legal links 3.7:1 (§2.5); `.service-cta-btn` (`#bb925c` on white) 2.85:1; instruction step numbers (white on gold) about 2.3:1. WCAG AA needs 4.5:1 for this text.
- **Screen readers:** the `|` dividers in 6 dark CTA rows and in the footer have no `aria-hidden`; on 18 service cards the icon ligature is read as part of the `h3`.
- **Keyboard:** neither CTA directive nor the link cards define `:focus-visible`.
- **Motion:** there is no `prefers-reduced-motion` anywhere, so the infinite CTA shimmer, the entrance animations and the badge pulse always run.
- **Reading:** text below 12px (§3.3); on /about-me/ an `h2` is larger than the page `h1`.

---

## 9. Angular Material

`custom-theme.scss` applies two themes: `mat.theme` with the **azure** and **blue** palettes (it emits `--mat-sys-primary: #005cbb`), then `mat.all-component-themes($my-theme)` with the brand green and gold.

Checked in the browser with the pagination select open and on the FAQ accordion:

| Part | Color | Source |
|------|-------|--------|
| Focused outline, arrow, selected option text | `#002706` | Brand theme |
| Select value text, option checkmark | `rgba(0, 0, 0, 0.87)` | Material default, not a site text color |
| Selected option background | black at about 10% | Material default |
| FAQ panel header text, expand indicator | `rgba(0, 0, 0, 0.87)` | Material default |

Azure is never visible. The azure theme is dead configuration (HYGIENE), and Material's neutral defaults leak near-black text that differs from `--text-color-primary` (VISUAL, small).

## 10. Dead code — HYGIENE

- Six empty `@media` blocks in `styles.css` (lines 963, 966, 969, 993, 996, 1012), plus a `max-width: 479px` block that re-declares six tokens with their current values (`styles.css:1003–1008`).
- Empty rules: `app.component.css:63`, `blog-iframe.component.ts:104`.
- Legacy bluish app-shell backgrounds (`app.component.css:58–80`): checked on 15 page types at both widths (about 10,000 sample points), they never show.
- The 19 unused tokens from 1.3.

---

## 11. December 2025 normalization: does it still hold?

Of the 14 items in [`normalization-log.md`](normalization-log.md): **2 hold, 9 partly hold, 3 regressed.** The home-page sections, which were the December scope, are still almost fully normalized; the drift is on pages built later or never audited. Detail: [`audit-2026-10/december-regressions.md`](audit-2026-10/december-regressions.md).

| Item | Status | What happened |
|------|--------|---------------|
| 1.1 Primary CTA component | REGRESSED | Inline overrides on /about-me/ (`about-me.component.html:85`, `:160-161`); hand-built clones on every blog post (`blog-links.component.ts:266`) and in `.blog-cta` |
| 1.2 Outline CTA component | REGRESSED | `.reset-btn` on /consultation/ (`consultation.component.css:566`) revives the old documents CTA; inline padding on /about-me/ (`:170`); `.service-cta-btn` on /services/ |
| 5.1 Hardcoded colors → tokens | REGRESSED | Hex values are back in `consultation.component.css:508, :532`, `footer.component.css:16`, `spinner.component.css:59, :74`, `faq-accordion.component.ts:56-102` (including `#374151`) |

The log is also wrong on one point: it says the outline CTA border became `var(--color-green)`, but the component (and DESIGN_SYSTEM.md §4.2) rests at `rgba(0, 39, 6, 0.2)`. Still open from the December visual review: the home "Читати далі" toggle style (observation 3), and the mobile visual review, which was never done.

## 12. Decisions needed (step 2)

These change what the Design System looks like, so the owner decides. Each has a recommendation.

| # | Decision | Today | Recommendation |
|---|----------|-------|----------------|
| 1 | Light surfaces | 17 light shades, no tokens | Three tokens: `--color-surface` #ffffff, `--color-surface-cream` #f8f6f2, `--color-surface-cream-deep` #f5f2ed; fold the other shades into them |
| 2 | Semantic colors | Two red families, Material orange, three star yellows | `--color-error` #dc2626; `--color-warning` #ff9800 with `--color-warning-text` #6d4c00; stars use `--color-star` only |
| 3 | Header and footer black | `#000`, outside the palette | Token `--color-ink: #000` (no visual change) |
| 4 | Alpha ladders | Gold 19 steps, green 16, white on dark 5 | Gold .05 .08 .1 .15 .2 .25 .3 .4 .5; green .02 .04 .06 .08 .1 .15 .2 .3; white .6 .7 .9 |
| 5 | Type scale | 23 rendered sizes, 35% on the scale | Eight steps: 12 · 13.6 · 15.2 · 16.8 · 19.2 · 22 · 28 · 36px, plus a display size for the hero; 12px minimum |
| 6 | Reading text | Blog body 16.8px, landing pages 19.2px (desktop) | Articles, cases and instructions use `--font-size-body-lg` |
| 7 | Heading typeface | Cormorant Garamond on four `h2` | Lora only and drop Cormorant; or Cormorant on every `h1`–`h2` if it is meant as a brand accent |
| 8 | Line height | A fixed 20px, inherited by 53% of text | Unitless 1.6 for text, 1.3 for headings |
| 9 | Weight 500 | 43 literals, broken `--weight-medium` | Add `--weight-medium: 500` |
| 10 | Detail-page header | 98 routes, three drifting copies | One official "detail header", with the gold `h1` underline |
| 11 | Spacing | 38 literal lengths, scale unused | Tokens 4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64px; snap off-grid values |
| 12 | Radius and shadow | 13 radii and 66 shadows rendered | Radii 4 · 8 · 12px, pill and 50%; shadows: card, card hover, large container |
| 13 | Breakpoints | 24 media features, overlap at 768px | 480 · 640 · 768 · 1024 · 1280px; `max-width: 768px` becomes `767px` |
| 14 | Card hover | Five lift variants | −4px on clickable cards only; fix the `forwards` animations |
| 15 | Motion | 17 durations, no reduced-motion handling | Tokens for 150 / 300 / 600ms; honour `prefers-reduced-motion` |
| 16 | End-of-page CTA | Four variants | Two documented variants (dark section, light frame) as shared components |
| 17 | Blog CTA | Hand-built, links to `/contacts` | `appCtaButton` linking to `/consultation/` |
| 18 | Headings on dark sections | White ×2, gold ×8 | Gold everywhere |
| 19 | Section separators | Double lines at some boundaries | One top line per section |
| 20 | Material theme | Azure/blue palette plus leaking black text at 87% | Drop the azure palette; Material text uses `--text-color-primary` |
| 21 | Mobile section padding | Code 1.5rem, doc 2rem | Keep 1.5rem and fix the doc |

Narrower, component-level choices (frosted-wrapper tiers, callout families, nav-row variants, quote-mark treatment, FAQ accordion, show-more button) are listed at the end of each appendix.

## 13. Clean-up backlog (step 4)

### 13.1 Bugs: fix regardless of the decisions

- Card entrance animations: switch `forwards` to `backwards` (or animate `translate`) on the 6 card types in §7.1 and on the page-header badge.
- `blog-iframe.component.ts:62`: add `[blocking]="false"`.
- `styles.css:540-548`: move `@keyframes blogCtaShimmer` to the top level.
- `documents.component.html:15`: use `page-intro secondary`.
- `court-case.component.css:454`: define `--weight-medium` or use 500.
- `styles.css:177`: `font-family: var(--font-body)` (or `--font-heading`, per decision 7).
- Double separators: remove one line at each boundary in §7.1.

### 13.2 Hygiene: no visual change

1. **Literals that equal tokens:** 345 color literals, 278 font sizes on the scale, motion literals (`300ms` ×140, bounce easing ×40, standard easing ×13). `static-audit.mjs --json` lists each one with file:line.
2. **Shared classes instead of copies:** `.card` (plus an interactive modifier), `.section-header`, icon wrappers, `.content-wrapper`, the end-of-page CTAs, the detail header, `.prominent-action-card`, `.expand-btn`, the nav row (rename the blog-links classes first to avoid collisions).
3. **Dead code:** the 6 empty media blocks and the no-op `:root` block in `styles.css`; `.container`; the legacy shell backgrounds in `app.component.css` (the contacts one still downloads a photo); dead selectors in blog-preview (`.cta-button`), blog-post (`.article-footer`), about-me (`.registry-link`, `.credentials-row`), navbar (`.separator`) and about-me (`.mission-section` gap); the unused `LoaderComponent` and `appLoader`; the commented-out loader in `index.html`; `footer-card.html` and `.footer-quote`, which never render; the 19 unused tokens.
4. **Doc fixes:** the 49 DOC-STALE rows in the appendices, plus §1.1–1.2 above.

---

## Appendix: re-running the audit

```bash
node docs/design-system/tools/static-audit.mjs                 # markdown summary
node docs/design-system/tools/static-audit.mjs --json out.json # plus per-declaration details
```

The rendered numbers come from a one-off Playwright run against `npm run build:ssg` output and are not part of the repo tool.
