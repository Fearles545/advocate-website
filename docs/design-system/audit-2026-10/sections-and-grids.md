# Section backgrounds, separators, containers and grids: audit against DESIGN_SYSTEM.md

> Appendix to [`../audit-report-2026-10.md`](../audit-report-2026-10.md). Rows were derived from the CSS with file:line evidence; the findings re-checked in a browser are listed in the main report (§7).

**Scope:** §5.1 Gold Separator Lines, §5.2 Light Sections, §5.3 Dark Sections, §5.4 Section Content Container (with §3 Spacing) and §8 Grid Patterns.
**Code state:** commit `9af77e7`, read-only, 2026-10-12.

**Paths:** component paths are relative to `src/app/`. `styles.css` means `src/styles.css` and `index.html` means `src/index.html`. "doc N" means line N of `docs/DESIGN_SYSTEM.md`.

**Method:**
- Manual reading of every routed page template and every section component (11 home sections, 15 inner-page templates, header, breadcrumb and footer).
- Scripted extraction of all 413 `background*` declarations, every `grid-template-columns` and `gap`, and every 1–2px line element. The extraction covered 25 component `.css` files, 24 inline `styles:` blocks and `styles.css`.

**Limits:** all visual claims come from reading the CSS. Nothing was rendered in a browser. Claims that depend on rendering details are marked *unverified*.

**Excluded:** the mobile base of `--section-padding-y` (1.5rem in CSS, 2rem in the doc) is already known and is not repeated here.

**Notation:**

| Short form | Meaning |
|---|---|
| `tokens` | `padding: var(--section-padding-y) var(--section-padding-x)`: 1.5rem × 1rem below 768px, 4rem × 2rem from 768px |
| `accent` | `var(--section-padding-y-accent) var(--section-padding-x)`: 2.5rem × 1rem below 768px, 5rem × 2rem from 768px |
| std / narrow / compact | `--section-max-width` 1200px / `--section-max-width-narrow` 900px / `--section-max-width-compact` 800px |
| full / center | `var(--gold-separator)` / `var(--gold-separator-center)` |
| lit-full | a literal copy of the `--gold-separator` gradient |
| [H] / [M] / [L] | severity: how noticeable a VISUAL item is, or how risky another item is |

---

## 1. Section inventory

### 1a. Home `/` (`main/main.component.html`), in render order

| # | Component → section / container (file:lines) | Background (exact) | Top separator | Bottom separator | Padding | Content max-width | Grid / layout |
|---|---|---|---|---|---|---|---|
| H1 | `app-intro-section` → `.intro-section-bg` / `.intro-section` (main/sections/intro-section/intro-section.component.css:1-41, 89-98) | `url(/assets/images/main/first-section.pattern.svg), linear-gradient(180deg, #f5f2ed 0%, #faf8f5 25%, #ffffff 50%, #faf8f5 75%, #f5f2ed 100%)`, plus 2 animated glows (:44-75) | none. Its `::before` (:16-29) is a 120px `rgba(0,39,6,.03)` shade, not a separator | **full** (`::after`, :32-40) | tokens | std | flex column, gap 2rem → 2.5rem at 768 → grid `1fr 1fr`, gap 3rem at 1024 → gap 4rem at 1280 |
| H2 | `app-pension-help-section` → `.pension-help-section-bg` / `.pension-help-section` (main/sections/pension-help-section/pension-help-section.component.ts:70-102) | `linear-gradient(180deg, #f8f6f2 0%, #ffffff 50%, #f8f6f2 100%)` | **lit-full** (:81-96) | none | tokens | std | `.problem-items`: 1 column, gap .875rem → 2 columns at 640 → 4 columns, gap 1rem at 1024 (:149-153, 247-251, 278-281). Contains the dark card `.solution-content` (literal green gradient, :215-229) |
| H3 | `app-about-section` → `.about-section-bg` / `.about-section` (main/sections/about-section/about-section.component.ts:77-113) | `linear-gradient(180deg, #f8f6f2 0%, #ffffff 40%, #fdfcfa 100%)` | **lit-full** (:86-101) | **lit-full**, drawn by a `<div class="decorative-line">` (template :73, CSS :371-385) | tokens | std | flex column, gap 2.5rem → grid `320px 1fr`, gap 3rem at 1024 → `380px 1fr`, gap 4rem at 1280 |
| H4 | `app-services-section` → `.services-section-bg` / `.services-section` (main/sections/services-section/services-section.component.css:1-20) | `linear-gradient(180deg, #f8f6f2 0%, #ffffff 100%)`, exactly as in the spec | **full** | none | tokens | std | `.services-grid`: 1 column, gap 1.25rem → 2 columns at 640 → gap 1.5rem at 1024 (:46-50, 232-236, 267-270), exactly as in the spec |
| H4b | ↳ `.format-banner` / `.format-content` (same file :167-192), nested at the bottom of H4 | `var(--green-gradient)` (Variant B) | **center** | none | accent, applied to the full-width banner | `900px` literal on the inner element, so content is 900px wide | flex column → row at 768, gap 1.5rem |
| H5 | `app-why-me-section` → `.why-me-section-bg` / `.why-me-section` (main/sections/why-me-section/why-me-section.component.ts:69-95) | `linear-gradient(180deg, #ffffff 0%, #f8f6f2 100%)` (the spec's alternate direction) | **lit-full** (:73-88) | none | tokens | narrow | list, flex column, gap 1rem → .875rem at 768 |
| H6 | `app-documents-section` → `.documents-section-bg` / `.documents-section` (main/sections/documents-section/documents-section.component.ts:33-59) | flat `#f8f6f2` | **lit-full** (:37-52) | none | tokens | compact | centred column |
| H7 | `app-feedback-section` → `.feedback-section-bg` / `.feedback-section` (main/sections/feedback-section/feedback-section.component.css:1-20) | `linear-gradient(180deg, #f8f6f2 0%, #ffffff 50%, #f8f6f2 100%)` | **full** | none | tokens | std; the carousel is `900px` literal (:57) | scroll-snap carousel. Cards are 100% wide, 90% at ≤1023px and 95% at ≤479px |
| H8 | `app-blog-preview-section` → `.blog-preview-section-bg` / `.blog-preview-section` (main/sections/blog-preview-section/blog-preview-section.component.css:1-20) | `linear-gradient(180deg, #ffffff 0%, #f8f6f2 100%)` | **full** | none | tokens | std | flex column, gap 1rem → grid with 3 columns, gap 1.5rem at 768 (:55-59, 213-218) |
| H9 | `app-court-cases-section` → `.court-cases-section-bg` / `.court-cases-section` (main/sections/court-cases-section/court-cases-section.component.css:1-53) | Variant A: `linear-gradient(135deg, var(--color-green-darkest) 0%, var(--color-green) 50%, var(--color-green-darkest) 100%)`, plus a `.section-glow` div, 600px, opacity .08 (:32-45) | **full** (:11-19) | **full** (:21-29) | accent | std | flex column, gap 1.25rem → grid with 2 columns, gap 1.5rem at 640 → 3 columns at 1024 (:119-123, 299-304, 349-352) |
| H10 | `app-seo-section` → `.seo-section-bg` / `.seo-section` (main/sections/seo-section/seo-section.component.css:1-20) | `linear-gradient(180deg, #f8f6f2 0%, #ffffff 50%, #f8f6f2 100%)` | **full** | none | tokens | narrow | flex column, gap 2rem. Contains the dark card `.cta-block` (`--green-gradient`, :190-200) |
| H11 | `app-need-help-section` → `.need-help-section-bg` / `.need-help-section` (main/sections/need-help-section/need-help-section.component.css:1-63) | Variant A, but with `var(--color-green) 40%`. Glows: 800×600 ellipse at .12 (top 30%), plus a 100%×300px bottom glow at .08 | **full** (:11-19) | none | accent | compact | centred column, gap 1.5rem → 1.75rem at 768 |

**Separator stacking at the home section boundaries:**
- Intro and Pension-help: H1 bottom + H2 top, **2px**.
- Pension-help and About: 1px.
- About and Services: H3 bottom div + H4 top, **2px**.
- Services banner and Why-me: 1px.
- Why-me and Documents: 1px.
- Documents and Feedback: 1px.
- Feedback and Blog preview: 1px.
- Blog preview and Court-cases: 1px.
- Court-cases and SEO: H9 bottom + H10 top, **2px**.
- SEO and Need-help: 1px.
- Need-help and Footer: 1px.

### 1b. Global chrome and the shared page hero

| # | Component → element (file:lines) | Background | Top separator | Bottom separator | Padding | Max-width | Layout |
|---|---|---|---|---|---|---|---|
| G1 | `app-header` → `header` / `.header-container` (header/header.component.ts:128-144) | `#000`. Navbar: `linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,39,6,1) 25%)` (navbar/navbar.component.ts:61-65). Mobile bar: same, ending at 40% (header.component.ts:389-392) | — | — | `1rem 2rem` literal; `.875rem 1rem` at ≤479 (:446-449) | `--container-max-width` | flex |
| G2 | `app-breadcrumb` → `.breadcrumb-strip` / `.breadcrumb-container` (core/components/breadcrumb/breadcrumb.component.ts:73-105). Shown on every route except `/` | `linear-gradient(180deg, rgba(245,242,237,.95) 0%, rgba(250,248,245,.9) 100%)` | **2px** custom gold gradient with stops at 15%, 50% and 85% (:83-98) | `border-bottom: 1px solid rgba(201,165,92,.2)` (:80) | `.625rem` × `--section-padding-x` | std | flex |
| G3 | `.page-bg-pattern` / `.page-content` (styles.css:816-846). Hero of all 15 inner-page templates | `url(first-section.pattern.svg), linear-gradient(180deg, #f5f2ed 0%, #faf8f5 50%, #f5f2ed 100%)`, `min-height: 100vh` | **lit-full** (:825-840) | none | tokens | std | — |
| G4 | `app-footer` → `.footer-wrapper` / `.footer-main` (footer/footer.component.css:14-52) | `linear-gradient(180deg, #000000 0%, #001a04 50%, #000000 100%)`, plus an 800px glow at .04 | **full** (:20-28) | — | `3rem var(--section-padding-x) 2rem`; `4rem … 2.5rem` at 768; `2rem 1rem 1.5rem` at ≤479 | `--container-max-width` | grid: 1 column → 2 at 640 → `1.2fr 1fr 1.5fr 1.2fr` at 768 → `1.3fr 1.1fr 1fr 1.3fr` at 1024 |

### 1c. Inner pages

Each page starts with G2 and G3 and ends with G4. The rows below list what sits inside the G3 hero or follows it.

| # | Page → section / container (file:lines) | Background | Top sep. | Bottom sep. | Padding | Content max-width | Grid / layout |
|---|---|---|---|---|---|---|---|
| A1 | `/about-me` hero → `.about-me-section` (about-me/about-me.component.css:7-18) | G3 | (G3) | — | tokens | std | flex column, gap 2rem → `340px 1fr`, gap 3rem at 1024 → `380px 1fr`, gap 4rem at 1280 |
| A2 | `.qualification-section-bg` / `.qualification-section` (:188-213) | `#fff → #f8f6f2` | full | — | tokens | std | 1 column, gap 1.25rem → 2 columns at 640 → 3 columns, gap 1.5rem at 1024 (:209-213, 761-763, 947-950) |
| A3 | `.mission-section-bg` / `.mission-section` (:411-450) | `#fff → #f8f6f2` | full | — | tokens | std | dark card `.mission-content` (literal green gradient, :438-442) |
| A4 | `.services-section-bg` / `.services-section` (:293-318) | `#f8f6f2 → #fff` | full | — | tokens | std | 1 → 2 at 640 → 3 at 1024, gap 1.25 → 1.5rem (:314-318, 765-767, 952-955) |
| A5 | `.format-section-bg` / `.format-section` (:555-580) | `var(--green-gradient)` (Variant B) | center | — | accent, on the inner element | `900px` literal | flex column → row at 768, gap 1.5rem |
| A6 | `.approach-section-bg` / `.approach-section` (:481-506) | `#fff → #f8f6f2` | full | — | tokens | narrow | flex column, gap 1rem |
| A7 | `.final-cta-section-bg` / `.final-cta-section` (:623-675) | Variant A at 50%, glow via `::after` (600px, .08, :643-657) | center | — | accent | compact | flex column; h2 gold (:669) |
| S1 | `/services` hero → `.main-services-section` (services/services.component.css:10-46) | G3 | (G3) | — | tokens | std | 1 column, gap 1.5rem → 2 columns at 640 → gap 1.75rem at 1024 (:42-46, 663-666, 729-732) |
| S2 | `.additional-services-section-bg` (:250-284) | `#fff → #f8f6f2` | full | — | tokens | std | 1 → 2 at 640 → 3 at 1024, gap 1.25 → 1.5rem |
| S3 | `.format-section-bg` (:383-408) | Variant B | center | — | accent | `900px` literal | flex → row at 768, gap 1.5rem |
| S4 | `.pricing-section-bg` (:451-470) | `#f8f6f2 → #fff` | full | — | tokens | compact | single card |
| S5 | `.faq-section-bg` (:520-539) | `#fff → #f8f6f2` | full | — | tokens | narrow | accordion |
| S6 | `.final-cta-section-bg` (:545-597) | Variant A, `::after` glow | center | — | accent | compact | h2 gold (:591) |
| D1 | `/documents` hero (documents/documents.component.css:7-21) | G3 with `min-height: auto` | (G3) | — | tokens, but **bottom 2rem literal** (:11-13) | std; `.document-card` 900px literal (:178) | `.document-images` 2 columns (1 at ≤479) |
| D2 | `.qualification-section-bg` (:327-355) | `#fff → #f8f6f2` | full | — | tokens | std; grid 700px → 900px at 1024 | certificates: 2 columns, gap 1.25rem (1 column at ≤479), gap 1.5rem at 640, 3 columns at 1024 |
| D3 | `.education-section-bg` (:498-558) | `#f8f6f2 → #fff` | full | — | tokens | std; grid `900px` literal | 1 column, gap 1.5rem → 2 columns, gap 2rem at 768 |
| D4 | `.cta-section-bg` / `.cta-section` (:671-709) | `linear-gradient(180deg, #faf9f6 0%, #f5f3ef 50%, #faf9f6 100%)` plus an 800px `--gold-alpha-06` glow | center | — | tokens | std; frame 680px | light framed CTA |
| C1 | `/contacts` hero → `.hero-section` (contacts/contacts.component.css:7-30) | G3 with `min-height: auto` | (G3) | — | tokens, but **bottom 1.5rem literal** (:11-13) | std | `1.5fr 2.5fr`, gap 3rem at 1024 → gap 4rem at 1280 |
| C2 | `.format-section-bg` (:400-425) | Variant B | center | — | accent | `900px` literal | flex → row, **gap 4rem** at 768 (:790-794) |
| C3 | `.cta-section-bg` (:506-550) | same as D4 | center | — | tokens | std; frame 680px | identical to D4 |
| F1 | `/faq` hero → `.faq-main-section` (faq/faq.component.css:10-13) | G3 | (G3) | — | tokens | narrow, inside std | accordion |
| F2 | `.related-section-bg` (:19-38) | `#fff → #f8f6f2` | full | — | tokens | narrow | 1 column, gap 1.25rem → 2 columns at 640 → gap 1.75rem at 1024 |
| F3 | `.final-cta-section-bg` (:192-244) | Variant A, `::after` glow | center | — | accent | compact | h2 gold (:238) |
| R1 | `/feedbacks` hero (feedbacks/feedbacks.component.css:7-50, 298-304) | G3; trust banner `rgba(255,255,255,.9) → rgba(248,246,242,.9)` | (G3) | — | tokens | std; grid 700px at ≤1023 | 2 columns, gap 2rem; 1 column, gap 1.5rem at ≤1023 (desktop-first) |
| B1 | `/blog` hero (blog/components/blog-list.component.css:13-73) | G3; white list card | (G3) | — | tokens | std; stats, filter and list at `900px` literal | single-column list |
| B2 | `/blog/:slug` hero (blog/components/blog-post.component.css:10-12) | G3; article `rgba(255,255,255,.85)` | (G3) | — | tokens | `--blog-container-max-width` 950px | article; footer blocks separated by `center` (:271-283) |
| K1 | `/court-cases` hero (court-cases/components/court-cases-list/court-cases-list.component.css:35-54) | G3 | (G3) | — | tokens | std; filter, cards and pagination at 700px | single-column list, gap 1rem → 1.25rem at 480 |
| K2 | `/court-cases/:slug` hero → `.court-case-page` (court-cases/components/court-case/court-case.component.css:10-15) | G3; dark aside `.cta-section` `linear-gradient(135deg, darkest 0%, green 100%)` (:513-522) | (G3) | — | tokens, on its own container | narrow | article |
| N1 | `/instructions` hero (instructions/components/instructions-list/instructions-list.component.css:31-35, 125-130) | G3 | (G3) | — | tokens | std | 1 column, gap .75rem → 2 columns, gap 1rem at 768 |
| N2 | `/instructions/:slug` hero (instructions/components/instruction/instruction.component.css:6-8) | G3 | (G3) | — | tokens | 950px | article |
| N3 | `.final-cta-section-bg` (instruction.component.css:574-618) | Variant A, `::after` glow (:594-608) | center | — | accent | compact | h2 gold (:621) |
| Q1 | `/consultation` hero (consultation/consultation.component.css:10-14) | G3; form `rgba(255,255,255,.85)` | (G3) | — | tokens | narrow | `.form-grid` 1 → 2 columns at 640 |
| L1 | `/privacy-policy`, `/public-offer` hero (legal/privacy-policy.component.ts:145-155; legal/public-offer.component.ts:159-168) | G3; card `rgba(255,255,255,.8)` | (G3) | — | tokens | std; card `800px` literal | `.obligations-grid` 1 → 2 columns at 640, gap 1.5rem (public-offer :223-227, 259-263) |

---

## 2. Light backgrounds

### 2a. Section and page level

There are **8 distinct section/page definitions** (LB-1 to LB-8), plus the breadcrumb strip and 3 hidden page-shell backgrounds.

| ID | Exact value | Where (file:line) | Uses | In doc? |
|---|---|---|---|---|
| LB-1 | `linear-gradient(180deg, #ffffff 0%, #f8f6f2 100%)` | main/sections/why-me-section/why-me-section.component.ts:70; main/sections/blog-preview-section/blog-preview-section.component.css:2; about-me/about-me.component.css:189, 412, 482; services/services.component.css:251, 521; documents/documents.component.css:328; faq/faq.component.css:20 | **9 sections** | yes: the §5.2 "Alternate" direction (doc 1392) |
| LB-2 | `linear-gradient(180deg, #f8f6f2 0%, #ffffff 100%)` | main/sections/services-section/services-section.component.css:2; about-me/about-me.component.css:294; services/services.component.css:452; documents/documents.component.css:499; also the dialog in about-me/about-me-dialog/about-me-dialog.component.ts:82 | **4 sections + 1 dialog** | yes: §5.2 (doc 1391) |
| LB-3 | `linear-gradient(180deg, #f8f6f2 0%, #ffffff 50%, #f8f6f2 100%)` | main/sections/pension-help-section/pension-help-section.component.ts:71-76; main/sections/feedback-section/feedback-section.component.css:2; main/sections/seo-section/seo-section.component.css:2 | 3 | no |
| LB-4 | `linear-gradient(180deg, #f8f6f2 0%, #ffffff 40%, #fdfcfa 100%)` | main/sections/about-section/about-section.component.ts:78-83 | 1 | no |
| LB-5 | `#f8f6f2` (flat) | main/sections/documents-section/documents-section.component.ts:34 | 1 | no |
| LB-6 | `url(/assets/images/main/first-section.pattern.svg), linear-gradient(180deg, #f5f2ed 0%, #faf8f5 50%, #f5f2ed 100%)` (`.page-bg-pattern`) | styles.css:816-823, used by **15 page templates** | 1 class, 15 pages | only in §4.6 (doc 500-504), not §5.2 |
| LB-7 | same SVG + `linear-gradient(180deg, #f5f2ed 0%, #faf8f5 25%, #ffffff 50%, #faf8f5 75%, #f5f2ed 100%)` | main/sections/intro-section/intro-section.component.css:2-11. Literal copies: core/components/spinner/spinner.component.css:14-23 and index.html:282-291 | 1 section + 2 loaders | only as the loader background (doc 1246-1259) |
| LB-8 | `linear-gradient(180deg, #faf9f6 0%, #f5f3ef 50%, #faf9f6 100%)` + `radial-gradient(ellipse, var(--gold-alpha-06) 0%, transparent 60%)`, 800px | documents/documents.component.css:673, 686-696; contacts/contacts.component.css:508, 523-537 | 2 | no |
| LB-9 | breadcrumb strip `linear-gradient(180deg, rgba(245,242,237,.95) 0%, rgba(250,248,245,.9) 100%)` | core/components/breadcrumb/breadcrumb.component.ts:75-79 | every route except `/` | no |
| hidden | `mat-sidenav-content.main::before`: `linear-gradient(to right, #f0f2f3, #e4edf4)`. `.blog`: `linear-gradient(109.6deg, rgba(204,228,247,1 or .75) 11.2%, rgba(237,246,250,1 or .75) 100.2%)`. `.contacts`: `url(abstract-blur-defocused-bookshelf-library.webp)` + the same blue overlay | app.component.css:59-61, 67-80, 108-117 | 3, covered by opaque sections | no (off-palette blue) |
| unused | `--color-container-bg: #bb925c1c` | styles.css:75 | 0 | no |

### 2b. Card and block level

| Value | Where | Uses |
|---|---|---|
| `white` | cards, CTA frames, list containers and form controls (for example main/sections/services-section/services-section.component.css:56, about-me/about-me.component.css:219, documents/documents.component.css:717, contacts/contacts.component.css:558, blog/components/blog-links/blog-links.component.ts:119, blog/components/blog-list.component.css:65) | about 40 |
| `rgba(255,255,255,α)` with α = .7, .8, .85, .9 or .92 | **.7:** about-section.component.ts:256, about-me.component.css:57, contacts.component.css:69<br>**.8:** privacy-policy.component.ts:148, public-offer.component.ts:162, prev-next-navigator.component.ts:73<br>**.85:** documents.component.css:171, blog-post.component.css:77, instruction.component.css:177, consultation.component.css:25, scroll-to-top.component.ts:86<br>**.9:** pension-help-section.component.ts:160, consultation.component.css:479<br>**.92:** scroll-to-top.component.ts:212 | 14 |
| `linear-gradient(135deg, rgba(255,255,255,.9) 0%, rgba(248,246,242,.9) 100%)` | blog/components/blog-list.component.css:20; feedbacks/feedbacks.component.css:13; documents/documents.component.css:528 | 3 |
| `linear-gradient(135deg, #fffdf8 0%, #fff 100%)` | main/sections/court-cases-section/court-cases-section.component.css:127; court-cases/components/court-cases-list/court-cases-list.component.css:54 | 2 |
| `linear-gradient(165deg, #fefdfb 0%, #ffffff 40%, #faf9f7 100%)` | blog/components/blog-post.component.css:138; court-cases/components/court-case/court-case.component.css:98; instructions/components/instruction/instruction.component.css:94 | 3 |
| `linear-gradient(135deg, rgba(255,255,255,.95) 0%, rgba(201,165,92,.06 or .08) 100%)` | blog/components/blog-faq/blog-faq.component.ts:60; blog/components/related-articles/related-articles.component.ts:68 | 2 |
| `rgba(248,246,242, …)` fades | main/sections/seo-section/seo-section.component.css:63-69 (overlay fading to #f8f6f2); shared/components/pagination/pagination.component.ts:94; blog/components/blog-iframe.component.ts:245 | 3 |
| `linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)` (neutral grey, off-palette) | styles.css:709 (`.photo-frame` placeholder) | 1 |

### 2c. Cream shades in use

There are **9 cream shades plus white**. None of them is a token.

| Shade | RGB | Occurrences (src/app + styles.css) | Role |
|---|---|---|---|
| `#f8f6f2` | 248,246,242 | 22 in 13 files, plus 10 `rgba(248,246,242,…)` | section gradients LB-1 to LB-5 |
| `#f5f2ed` | 245,242,237 | 6 in 3 files, plus index.html | pattern backgrounds LB-6 and LB-7 |
| `#faf8f5` | 250,248,245 | 5 in 3 files, plus index.html | pattern backgrounds LB-6 and LB-7 |
| `#faf9f6` | 250,249,246 | 4 in 2 files | light CTA (LB-8) |
| `#f5f3ef` | 245,243,239 | 2 in 2 files | light CTA (LB-8) |
| `#fdfcfa` | 253,252,250 | 1 | About section only (LB-4) |
| `#fffdf8` | 255,253,248 | 2 | court-case cards |
| `#fefdfb` | 254,253,251 | 3 | meta cards |
| `#faf9f7` | 250,249,247 | 3 | meta cards |

Shades that play the same role differ by only 2–5 units per channel. Examples: `#f8f6f2`, `#faf9f6` and `#faf8f5`, or `#f5f2ed` and `#f5f3ef`. They are visually near-identical, so consolidating them carries little risk.

---

## 3. Dark backgrounds

### 3a. Section level

| ID | Exact value | Where (file:line) | Uses | Doc |
|---|---|---|---|---|
| DB-1 | `linear-gradient(135deg, var(--color-green-darkest) 0%, var(--color-green) 50%, var(--color-green-darkest) 100%)` | main/sections/court-cases-section/court-cases-section.component.css:2-7; about-me/about-me.component.css:624-629; services/services.component.css:546-551; faq/faq.component.css:193-198; instructions/components/instruction/instruction.component.css:575-580 | 5 | §5.3 Variant A (doc 1419-1424) |
| DB-2 | DB-1 with `var(--color-green) 40%` | main/sections/need-help-section/need-help-section.component.css:2-7 | 1 | close to Variant A |
| DB-3 | `var(--green-gradient)`, i.e. 135deg from `--color-green` to `--color-green-dark` | main/sections/services-section/services-section.component.css:168; about-me/about-me.component.css:556; services/services.component.css:384; contacts/contacts.component.css:401 | 4 | §5.3 Variant B (doc 1448) |

Glows on these sections:
- `.section-glow` div, 600px, .08: court-cases-section.component.css:32-45.
- Same glow re-implemented as `::after`: about-me.component.css:643-657, services.component.css:565-579, faq.component.css:212-226, instruction.component.css:594-608.
- Need-help glows, 800×600 at .12 plus a bottom glow at .08: need-help-section.component.css:22-50.
- Footer glow, 800px at .04: footer.component.css:30-43.

### 3b. Dark blocks inside light sections

This pattern is not documented.

| Value | Where | Uses |
|---|---|---|
| `var(--green-gradient)`, or the literal equivalent | **Literal:**<br>- `.solution-content`: main/sections/pension-help-section/pension-help-section.component.ts:221<br>- `.mission-content`: about-me/about-me.component.css:438-442<br><br>**Token:**<br>- `.cta-block`: main/sections/seo-section/seo-section.component.css:191<br>- `.primary-contact` link card: contacts/contacts.component.css:151<br>- `.registry-card` link card: documents/documents.component.css:69 | 5 |
| `linear-gradient(135deg, var(--color-green-darkest) 0%, var(--color-green) 100%)` | `aside.cta-section`: court-cases/components/court-case/court-case.component.css:516-520 | 1 (unique) |

### 3c. Chrome

| Value | Where |
|---|---|
| `#000` | header/header.component.ts:129 |
| `linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,39,6,1) 25%)` | navbar/navbar.component.ts:61-65 |
| `linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,39,6,1) 40%)` | header/header.component.ts:389-392 (mobile bar, ≤899px) |
| `linear-gradient(180deg, rgba(0,39,6,1) 0%, rgba(0,0,0,1) 100%)` | drawer-content/drawer-content.component.css:9-13 |
| `var(--color-green)` | navbar/navbar.component.ts:177 (dropdown) |
| `linear-gradient(180deg, #000000 0%, #001a04 50%, #000000 100%)` | footer/footer.component.css:16 (`#001a04` is the value of `--color-green-darkest`) |

### 3d. Small elements (summary)

The green gradient used on icon wrappers, badges and buttons appears in three forms:
- 26 literal copies of `linear-gradient(135deg, var(--color-green) 0%, var(--color-green-dark) 100%)`.
- 16 uses of `var(--green-gradient)`. These include the 4 format sections and 3 of the dark blocks.
- 1 hex copy: core/components/spinner/spinner.component.css:74 `#002706 → #003d0a`.

The Variant A sections also carry solid gold gradient badges (court-cases-section.component.css:69-73; need-help-section.component.css:71). `--color-success-bg` is used 3 times.

---

## 4. Findings

### 4.1 §5.1 Gold Separator Lines (doc 1320–1383)

| # | Class | Where (file:line) | Spec (doc line) | Actual | Notes |
|---|---|---|---|---|---|
| 5.1-1 | VISUAL | main/sections/intro-section/intro-section.component.css:32-40 and main/sections/pension-help-section/pension-help-section.component.ts:81-96 | one 1px line per boundary: "Always use 1px" (1379); a line at the top **or** the bottom (1373-1376) | Intro's bottom `::after` and Pension-help's top `::before` are both full gold lines on adjacent pixel rows, so the boundary shows a **2px** line | [M] Home page. Looks accidental. |
| 5.1-2 | VISUAL | main/sections/about-section/about-section.component.ts:73, 371-385 and main/sections/services-section/services-section.component.css:5-13 | same | About's bottom `.decorative-line` and Services' top `::before` make a **2px** line | [M] Looks accidental. |
| 5.1-3 | VISUAL | main/sections/court-cases-section/court-cases-section.component.css:21-29 and main/sections/seo-section/seo-section.component.css:5-13 | same | Court-cases' bottom `::after` and SEO's top `::before` make a **2px** line at the dark-to-light edge | [M] Looks accidental. |
| 5.1-4 | VISUAL | core/components/breadcrumb/breadcrumb.component.ts:80 and styles.css:825-840 | 1px gradient line only, no solid rules (1379-1380) | The breadcrumb's full-width solid `border-bottom: 1px solid rgba(201,165,92,.2)` sits directly on the `.page-bg-pattern::before` gold line, so there is a double line under the breadcrumb | [M] On all 15 inner-page templates. Looks accidental. |
| 5.1-5 | VISUAL | core/components/breadcrumb/breadcrumb.component.ts:83-98 | 1px with the token's 20/50/80 stops (1326-1335, 1379) | 2px line with stops at 15%, 50% and 85% | [L] Looks intentional (the code comment calls it "Golden Thread Navigation"), but it breaks the 1px rule. |
| 5.1-6 | VISUAL | main/sections/court-cases-section/court-cases-section.component.css:18, 28; main/sections/need-help-section/need-help-section.component.css:18; footer/footer.component.css:27 | `--gold-separator-center` for dark backgrounds (1371, 1381) | 3 dark elements (4 declarations) use the full `--gold-separator`. The other 8 dark sections use `-center`: services-section:180; about-me:567, 640; services:395, 562; contacts:412; faq:209; instruction:591 | [L] Mixed; intent unclear. |
| 5.1-7 | BYPASS | main/sections/about-section/about-section.component.ts:73 (template), 371-385 | pseudo-element pattern (1346-1364) | The bottom separator is an extra absolutely positioned `<div class="decorative-line">` instead of `::after` | Also a literal gradient, and part of the cause of 5.1-2. |
| 5.1-8 | HYGIENE | styles.css:832-839; about-section.component.ts:93-100, 377-384; documents-section.component.ts:44-51; pension-help-section.component.ts:88-95; why-me-section.component.ts:80-87 | `background: var(--gold-separator)` (1361) | 6 literal copies of the token's exact gradient | Renders identically. |
| 5.1-9 | HYGIENE | 35 section-level separators: 19 `var(--gold-separator)`, 10 `var(--gold-separator-center)` and 6 literal. Each repeats the same 8-line pseudo-element block | 1346-1364 | No shared utility or class exists; the doc's own pattern is copy-paste | Duplication; see Decisions. |
| 5.1-10 | BUG | blog/components/blog-post.component.css:245-259 | — | `.article-footer { border-top: 1px solid … }` and `.article-footer .blog-post-section` match nothing. The template has only `.article-footer-sections` (blog-post.component.html:60), and no post HTML uses the class | Dead selectors. |
| 5.1-11 | DOC-STALE | doc 1322 | "24+ instances" | 35 section-level separator declarations, plus 3 uses inside cards (styles.css:338 `hr`, blog-post.component.css:281, instruction.component.css:517) | [L] |

### 4.2 §5.2 Light Sections (doc 1385–1406)

| # | Class | Where (file:line) | Spec (doc line) | Actual | Notes |
|---|---|---|---|---|---|
| 5.2-1 | VISUAL | main/sections/pension-help-section/pension-help-section.component.ts:71-76; main/sections/feedback-section/feedback-section.component.css:2; main/sections/seo-section/seo-section.component.css:2 | two stops, `#f8f6f2 → #fff` or the reverse (1391-1392) | three stops: `#f8f6f2 0% → #fff 50% → #f8f6f2 100%` | [L] The same on 3 home sections, so it looks intentional. Undocumented. |
| 5.2-2 | VISUAL | main/sections/about-section/about-section.component.ts:78-83 | 1391 | `#f8f6f2 0% → #fff 40% → #fdfcfa 100%`. `#fdfcfa` is used nowhere else | [L] Looks like an accidental one-off. |
| 5.2-3 | VISUAL | main/sections/documents-section/documents-section.component.ts:34 | 1391 | flat `#f8f6f2`, no gradient | [L] Possibly intentional: a band between Why-me (which ends on #f8f6f2) and Feedback (which starts on #f8f6f2). *Unverified.* |
| 5.2-4 | VISUAL | documents/documents.component.css:671-697; contacts/contacts.component.css:506-538 | 1391 | `#faf9f6 → #f5f3ef 50% → #faf9f6`, plus an 800px gold radial glow. These shades appear nowhere else | [M] Intentional: contacts.component.css:503 labels it "UNIFIED CTA SECTION (Light, refined)". It competes with the dark final CTA used on 4 other pages (see 5.3-6 and Decision 5). |
| 5.2-5 | HYGIENE | documents.component.css:671-709 and 711-879; contacts.component.css:506-550 and 552-722 | — | The light CTA is duplicated. The `cta-section-bg`/`cta-section` rules are identical, and the frame/corner/nav block is 147 identical non-empty lines | Duplication. |
| 5.2-6 | HYGIENE | main/sections/intro-section/intro-section.component.css:2-11; core/components/spinner/spinner.component.css:14-23; index.html:282-291 | loader background (1246-1259) | The 5-stop intro background is typed out 3 times; no token exists | Renders identically. |
| 5.2-7 | DOC-STALE | doc 1385-1406 vs styles.css:816-823 | §5.2 presents a single "standard light background" | The most-used light background is `.page-bg-pattern` (SVG plus #f5f2ed/#faf8f5) on all 15 inner-page heroes. It is documented only in §4.6 (500-504). §5.2 also omits LB-3 and LB-8 | The doc is incomplete. |
| 5.2-8 | HYGIENE | app.component.css:59-61, 67-80, 108-117 | brand light palette (1391; 84) | Page-shell backgrounds on `mat-sidenav-content` are off-palette: grey-blue `#f0f2f3 → #e4edf4` on `.main`, light blue `rgba(204,228,247) → rgba(237,246,250)` on `.blog`, and a bookshelf photo with a blue overlay on `.contacts`. All are covered by opaque section backgrounds | Dead styling. *Unverified:* the breadcrumb strip is only 90–95% opaque (breadcrumb.component.ts:75-79), so about 5–10% of the blue or the photo may show through on /blog/* and /contacts. The contacts photo is still downloaded. |

### 4.3 §5.3 Dark Sections (doc 1409–1506)

| # | Class | Where (file:line) | Spec (doc line) | Actual | Notes |
|---|---|---|---|---|---|
| 5.3-1 | VISUAL | main/sections/need-help-section/need-help-section.component.css:2-7 | Variant A has `var(--color-green) 50%` (1422) | `40%` | [L] Subtle. Intent *unverified*. |
| 5.3-2 | VISUAL | need-help-section.component.css:22-50 | `.section-glow`: 600×600 circle, .08, centred (1430-1439) | an 800×600 ellipse at .12 placed at top 30%, plus a second 100%×300px bottom glow at .08 | [L] Looks intentional (extra emphasis on the CTA). |
| 5.3-3 | VISUAL | main/sections/court-cases-section/court-cases-section.component.css:91; main/sections/need-help-section/need-help-section.component.css:106 | headings gold (1478-1482) | `h2 { color: white }` with a text-shadow | [M] The 4 final CTAs (about-me:669, services:591, faq:238, instruction:621) and the 4 format banners use gold. The doc contradicts itself: §1 (85) says text on dark backgrounds is white. White looks intentional on the home page; see Decision 4. |
| 5.3-4 | VISUAL | need-help-section.component.css:134-140; services.component.css:599-604, 606-611; faq.component.css:246-251; about-me.component.css:684-689 | body text: `--color-gold-light`, weight 500, line-height 1.6 (1484-1489) | line-height 1.7 (need-help); weight 400 and line-height 1.65 (`.final-cta-intro`); notes in `rgba(224,214,193,.8)` italic | [L] Drift. |
| 5.3-5 | DOC-STALE | court-cases-section.component.css:63-87; need-help-section.component.css:65-86 | inside dark sections, icon wrappers are translucent gold (1492-1501) | Both Variant A sections that have an icon use a solid gold badge (`gold → gold-dark` with a green icon and a glow). Only Variant B uses the translucent wrapper (services-section:194-213, about-me:582-600, services:410-428, contacts:427-445) | Consistent within each variant. |
| 5.3-6 | DOC-STALE | about-me/about-me.component.css:623-675; services/services.component.css:545-597; faq/faq.component.css:192-244; instructions/components/instruction/instruction.component.css:574-618 | Variant A is "Used in: court-cases-section, need-help-section" (1504) | 4 more Variant A sections exist: the final CTAs. They use a `--gold-separator-center` top line, a glow drawn with `::after`, compact width and a gold h2 | The list in the doc is incomplete. |
| 5.3-7 | HYGIENE | the same 4 blocks; about-me.component.css:555-580, services.component.css:383-408 and contacts.component.css:400-425 | — | The final-CTA block (48 non-empty lines) is identical in about-me, services and faq; instruction has a variant. The Variant B block (24 lines) is identical in 3 files. The glow is re-declared each time instead of using a shared `.section-glow` | Duplication. |
| 5.3-8 | VISUAL | main/sections/services-section/services-section.component.css:167-192 | `.format-section { max-width: 900px; padding: accent x }` (1463-1466), so content is 836px wide | The padding sits on the full-width `.format-banner` and `max-width: 900px` on the inner `.format-content`. Content is therefore 900px wide, 64px wider than the other banners on viewports of 964px and up | [L] Looks like an accidental structural variant. |
| 5.3-9 | VISUAL | contacts/contacts.component.css:790-794 | gap 1.25rem (1471). The other banners use 1.5rem at 768 (about-me:855-859, services:694-698, services-section:255-260) | `gap: 4rem` from 768px | [L] Looks intentional (this banner has more text plus a list). |
| 5.3-10 | HYGIENE | about-me.component.css:572; services.component.css:400; contacts.component.css:417; services-section.component.css:185 | doc 1464 is also a literal; the token `--section-max-width-narrow` is 900px (styles.css:39; doc 192) | literal `900px` | The doc snippet should use the token as well. |
| 5.3-11 | DOC-STALE | pension-help-section.component.ts:215-229; about-me.component.css:432-450; seo-section.component.css:190-200; court-case.component.css:513-522 | "Two distinct dark section patterns exist" (1411) | A third pattern, a dark gradient card inside a light section, is used 4 times. Contacts `.primary-contact` and documents `.registry-card` are related link cards | Undocumented. |
| 5.3-12 | VISUAL | court-cases/components/court-case/court-case.component.css:516-520 | the other dark cards use `--green-gradient` (117-121) | `linear-gradient(135deg, var(--color-green-darkest) 0%, var(--color-green) 100%)`, used only here | [L] Intent *unverified*. |
| 5.3-13 | HYGIENE | pension-help-section.component.ts:221; about-me.component.css:438-442; 24 more literal copies elsewhere, mostly icon wrappers | `--green-gradient` (styles.css:92-96; 117-121) | literal `linear-gradient(135deg, var(--color-green) 0%, var(--color-green-dark) 100%)` 26 times, against 16 uses of the token. spinner.component.css:74 uses hex values instead | Renders identically. |
| 5.3-14 | HYGIENE | footer/footer.component.css:16 | `--color-green-darkest: #001a04` (styles.css:60) | literal `#001a04` | |

### 4.4 §5.4 Section Content Container and §3 Spacing (doc 1509–1519, 177–217)

| # | Class | Where (file:line) | Spec (doc line) | Actual | Notes |
|---|---|---|---|---|---|
| 5.4-1 | BUG | styles.css:695-699 | `.container { max-width: var(--container-max-width); margin: 0 auto; }` (207-214) | `.container` sets only `margin: 0 auto; padding: 0 var(--container-padding)` and has no max-width. No template uses `class="container"`; the only match is a JSDoc example in core/directives/dropdown-position.directive.ts:23 | Dead selector. `--container-padding` and `--container-padding-mobile` (styles.css:30-31) exist only to feed it. |
| 5.4-2 | DOC-STALE | header/header.component.ts:136-144; footer/footer.component.css:48-52, 530-541 | "Used by header and footer components" (216) | The header and footer set `max-width: var(--container-max-width)` on their own classes | |
| 5.4-3 | DOC-STALE | styles.css:28; blog/components/blog-post.component.css:10-12; instructions/components/instruction/instruction.component.css:6-8 | three max-width tokens (189-193) | A fourth token, `--blog-container-max-width: 950px`, sets the width of the blog-post and instruction pages | Undocumented. |
| 5.4-4 | VISUAL | documents/documents.component.css:11-13; contacts/contacts.component.css:11-13 | `padding: var(--section-padding-y) …` (1517; 183) | The hero `.page-content` bottom padding is 2rem on documents and 1.5rem on contacts, against the 4rem token from 768px | [L] Looks intentional (a tighter hero), but the two pages disagree with each other and every other page keeps the token. |
| 5.4-5 | BYPASS | court-cases/components/court-case/court-case.component.css:10-15 | `.page-content` (styles.css:842-846); 1513-1518 | `.court-case-page` re-declares the container at narrow width inside `.page-bg-pattern` | Blog-post (10-12), instruction (6-8) and consultation (10-14) override `.page-content` instead. |
| 5.4-6 | HYGIENE | about 31 section containers, for example main/sections/services-section/services-section.component.css:16-20, main/sections/why-me-section/why-me-section.component.ts:91-95, about-me/about-me.component.css:203-207 | 1513-1518 | The same 3-line container is re-declared in every section, although the global `.page-content` is identical for the standard width | Duplication. |
| 5.4-7 | HYGIENE | blog/components/blog-list.component.css:17, 33, 63; main/sections/feedback-section/feedback-section.component.css:57; documents/documents.component.css:178, 556, 981 (all 900px); legal/privacy-policy.component.ts:146 and legal/public-offer.component.ts:160 (800px) | the narrow (900) and compact (800) tokens (styles.css:39-40; 192-193) | literal widths equal to the token values | |
| 5.4-8 | VISUAL | court-cases/components/court-cases-list/court-cases-list.component.css:37, 53, 228 (700px) vs blog/components/blog-list.component.css:17, 33, 63 (900px) | narrow 900 for text-heavy content (192) | The two archive lists differ by 200px, although court-cases-list.component.css:34 says it is aligned "as in the blog list" | [L] Intent *unverified*. |
| 5.4-9 | VISUAL | header/header.component.ts:142, 446-449 | `--section-padding-x` is 1rem below 768px (184) | From 480px the header is inset 2rem, while sections, the breadcrumb and the footer are inset 1rem until 768px. Between 480 and 767px the logo and the content edges are 16px apart | [L] Looks accidental. |
| 5.4-10 | HYGIENE | styles.css:999-1010; 27; 963-970, 993-997, 1012-1013 | spacing scale (197-201) | The ≤479px `:root` block re-declares `--font-size-h3`, `--spacing-sm/md/lg/xxl` and `--container-max-width` with identical values, so it does nothing. `--spacing-xxl` is never used. There are 4 empty media blocks | Dead code. |
| 5.4-11 | BUG | about-me/about-me.component.css:1041-1043 | — | `.mission-section { gap: 1rem }` at ≤479px has no effect, because `.mission-section` is a block element (426-430) | Rule does nothing. |

### 4.5 §8 Grid Patterns (doc 1665–1696)

These grids match the spec:
- main/sections/services-section/services-section.component.css:46-50, 232-236, 267-270: matches exactly.
- about-me qualification (209-213, 761-763, 947-950) and services (314-318, 765-767, 952-955): match, and expand to 3 columns at 1024 as the spec allows.
- services additional (280-284, 668-670, 754-757): matches.
- main/sections/court-cases-section/court-cases-section.component.css:119-123, 299-304, 349-352: matches the Blog/Case grid (2 → 3 columns).

| # | Class | Where (file:line) | Spec (doc line) | Actual | Notes |
|---|---|---|---|---|---|
| 8-1 | VISUAL | main/sections/blog-preview-section/blog-preview-section.component.css:55-59, 213-218 | Blog/Case: 2 columns at 640, 3 at 1024 (1688-1695) | 1 column (flex, gap 1rem), then a 3-column grid with gap 1.5rem at 768. Never 2 columns | [M] Looks intentional: there are always exactly 3 posts, which avoids a 2+1 orphan. Cards are about 219px wide between 768 and 1023px. |
| 8-2 | VISUAL | main/sections/pension-help-section/pension-help-section.component.ts:149-153, 247-251, 278-281 | gap 1.25rem → 1.5rem at 1024; 2 columns, sometimes 3 (1670-1683) | gap .875rem → 1rem; 4 columns at 1024 | [L] Intentional: 4 compact tiles. |
| 8-3 | VISUAL | services/services.component.css:42-46, 663-666, 729-732 | gap 1.25rem → 1.5rem (1673, 1681) | gap 1.5rem → 1.75rem | [L] |
| 8-4 | VISUAL | faq/faq.component.css:64-68, 303-306, 354-357 | gap 1.5rem at 1024 (1681) | 1.75rem at 1024 | [L] Looks accidental. |
| 8-5 | VISUAL | instructions/components/instructions-list/instructions-list.component.css:31-35, 125-130 | 2 columns at 640, gap 1.25rem / 1.5rem | 1 column with gap .75rem, then 2 columns with gap 1rem at 768 | [L] Looks accidental. |
| 8-6 | VISUAL | feedbacks/feedbacks.component.css:46-50, 298-304 | mobile-first, 2 columns at 640 (1676-1677) | Written desktop-first: 2 columns with gap 2rem from 1024; 1 column (max 700px) with gap 1.5rem at ≤1023 | [L] Intentional: the testimonials are long. |
| 8-7 | VISUAL | documents/documents.component.css:349-355, 893-895, 979-982, 1085-1088 | 2 columns at 640, 3 at 1024 | 2 columns from 480 (1 column via `max-width: 479px`), 3 at 1024; the grid's max-width goes from 700 to 900px | [L] Intentional: image thumbnails. |
| 8-8 | VISUAL | documents/documents.component.css:552-558, 947-950 | 2 columns at 640, gap 1.25rem / 1.5rem | 2 columns at 768, gap 1.5rem → 2rem, max 900px | [L] Looks accidental. |
| 8-9 | VISUAL | legal/public-offer.component.ts:223-227, 259-263 | gap 1.25rem → 1.5rem | gap 1.5rem at all widths | [L] |
| 8-10 | DOC-STALE | blog/components/blog-list.component.css:62-73; court-cases/components/court-cases-list/court-cases-list.component.css:42-54 | "Blog/Case Cards" go from 2 to 3 columns (1686-1696) | Both archive pages are single-column lists. The 2 → 3 grid exists only in the home court-cases section | The doc should separate the preview grid from the archive list. |

### 4.6 Incidental findings outside these sections (not counted)

| # | Class | Where | Note |
|---|---|---|---|
| I-1 | BUG | documents/documents.component.html:15 | The class `page-intro-secondary` has no CSS rule. The intended modifier is `.page-intro.secondary` (styles.css:922-927; doc 550-560), so the second intro paragraph renders with primary intro styling. |
| I-2 | BUG | court-cases/components/court-case/court-case.component.css:454 | `font-weight: var(--weight-medium)`: the token is undefined and there is no fallback. |
| I-3 | BUG | main/sections/blog-preview-section/blog-preview-section.component.css:289-292 | `.cta-button` is a dead selector: the template uses `appCtaOutlineButton`, whose host class is `cta-outline-button`. |
| I-4 | HYGIENE | styles.css:73-75, 129-131 | Unused tokens: `--color-navy`, `--color-navy-dark`, `--color-container-bg` and the `--breakpoint-*` set. |

---

## 5. Counts (within scope)

| Class | §5.1 | §5.2 | §5.3 | §5.4 + §3 | §8 | Total |
|---|---|---|---|---|---|---|
| VISUAL | 6 | 4 | 7 | 3 | 9 | **29** (7 medium, 22 low) |
| HYGIENE | 2 | 3 | 4 | 3 | 0 | **12** |
| BYPASS | 1 | 0 | 0 | 1 | 0 | **2** |
| DOC-STALE | 1 | 1 | 3 | 2 | 1 | **8** |
| BUG | 1 | 0 | 0 | 2 | 0 | **3** |
| **Total** | 11 | 8 | 14 | 11 | 10 | **54** (plus 4 incidental: 3 BUG, 1 HYGIENE) |

---

## 6. Decisions needed

1. **Canonical light backgrounds.**
   - **Current state:** there are **8 distinct section/page-level light backgrounds**, plus the breadcrumb strip and 3 hidden shell backgrounds. They are built from **9 cream shades plus white**, and none of them is a token.

     | Background | Uses |
     |---|---|
     | LB-1 `#fff → #f8f6f2` | 9 sections |
     | LB-2 `#f8f6f2 → #fff` | 4 sections + 1 dialog |
     | LB-6 `.page-bg-pattern` | 1 class on 15 page templates |
     | LB-3 `#f8f6f2 / #fff / #f8f6f2` | 3 sections |
     | LB-7 intro 5-stop | 1 section + 2 loader copies |
     | LB-8 CTA cream | 2 sections |
     | LB-4 `#fdfcfa` | 1 section |
     | LB-5 flat `#f8f6f2` | 1 section |

   - **Proposal: 2 or 3 tokens.**
     - (a) `--bg-section`: a cream ↔ white gradient. It absorbs LB-1 to LB-5, which covers 18 sections. It also needs a direction rule: one direction everywhere, a deliberate alternation, or the symmetric 3-stop version.
     - (b) `--bg-page-pattern`: the SVG with #f5f2ed/#faf8f5 (LB-6). Decide whether the intro (LB-7) is the same token with an extra white stop, or stays a hero-only variant.
     - (c) Either a separate `--bg-section-cta` for LB-8, or fold LB-8 into (a). Its shades are within about 3 units of #f8f6f2 and #f5f2ed.
   - **Base colour tokens to add:** `--color-cream` #f8f6f2 (22 uses), `--color-cream-deep` #f5f2ed and `--color-cream-light` #faf8f5.
   - **Shades to retire:** #fdfcfa, #faf9f6 and #f5f3ef.
   - **Card tints:** decide whether #fffdf8, #fefdfb and #faf9f7 (8 uses) become white or a single `--color-card-tint`.
2. **Separator stacking rule.** Choose between two rules:
   - Top separators only. This removes the intro `::after`, the about `.decorative-line` and the court-cases `::after`.
   - A section's bottom separator suppresses the next section's top separator.

   Also decide between the breadcrumb's `border-bottom` and the `.page-bg-pattern::before` line, which double up on 15 templates.
3. **Separator on dark backgrounds.** `-center` is used by 8 dark sections. Full is used by court-cases (twice), need-help and the footer. Pick one and say so in §5.1.
4. **Heading colour on dark backgrounds.** White is used by the 2 home Variant A sections; gold by 8 others. Fix the conflict between doc §1 (line 85, white) and §5.3 (gold).
5. **One end-of-page CTA pattern.** Today there are four:
   - a dark Variant A final CTA on about-me, services, faq and instruction (4 pages);
   - a light cream framed CTA on documents and contacts (2 pages);
   - a dark card aside on the court-case detail page;
   - a light frame inside the article on blog posts (blog-links).

   Choose one, or a documented pair, then extract a shared component. Today the dark CTA is 48 lines copied 3 times plus a variant, and the light CTA is about 190 lines copied twice.
6. **Variant A icon.** Either document the solid gold badge used by both home dark sections, or align it with the translucent wrapper the doc specifies.
7. **Document the dark card inside a light section as "Variant C".** It appears 4 times, plus 2 link cards. Choose one gradient: `--green-gradient` (used 3 times) or darkest → green (court-case only).
8. **Canonical card-grid values.**
   - **Current state:** desktop gaps of 1, 1.5, 1.75 and 2rem (the spec says 1.5); column switches at 480, 640, 768 and 1024px; two grids written desktop-first.
   - **To decide:** whether a switch at 768px and gaps of 1.75rem are allowed variants; whether 4-column tiles (pension-help) and 3 columns at 768 (blog preview) are sanctioned.
9. **Archive list width.** The blog list is 900px and the court-cases list 700px. Pick one; the narrow token is a candidate.
10. **Container tokens.**
    - `--container-max-width` and `--section-max-width` are both 1200px: merge them?
    - `--blog-container-max-width` is 950px against the 900px narrow token: document it or replace it.
    - `.container` is dead: delete it, or make it the shared section container that replaces the ~31 re-declarations.
    - Remove `--container-padding*` and `--spacing-xxl`.
11. **Hero bottom padding.** The token everywhere, or the 2rem (documents) / 1.5rem (contacts) overrides as a documented "tight hero" variant.
12. **App-shell backgrounds** (app.component.css `.main`, `.blog`, `.contacts`): delete them. They are off-palette, hidden, and the contacts photo is still downloaded.
