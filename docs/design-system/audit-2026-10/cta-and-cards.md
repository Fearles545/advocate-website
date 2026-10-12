# Design-system audit A1: §4.1 Primary CTA, §4.2 Outline CTA, §4.3 Cards (+ §9 "Creating a Card")

> Appendix to [`../audit-report-2026-10.md`](../audit-report-2026-10.md). Rows were derived from the CSS with file:line evidence; the findings re-checked in a browser are listed in the main report (§7).

Spec: `docs/DESIGN_SYSTEM.md`. All paths below are relative to the repo root.

**Method.** I scanned `src/styles.css`, all 25 component `.css` files and all 24 inline `styles:` blocks with a nesting-aware CSS extractor that records file, line and selector path. I reviewed every rule that has a border-radius, a box-shadow, a 2px border, a brand-filled background, a `--card-*` token or "card/btn/button/cta" in its selector. Templates (`.html` and inline `template:`) were read for every usage.

Limits:
- Nothing was rendered in a browser (no build, by instruction). Render claims come from the CSS cascade.
- Heights marked "≈" are computed from CSS, assuming the 20px line-height inherited from `body { font: var(--font-main) }` (`src/styles.css:159`).
- Contrast ratios are computed with the WCAG formula.

**Related sections owned elsewhere.** 4.8 Frosted Glass, 4.13 Service Card, 4.14 Prominent Action Card and 4.15 Expand/Toggle Button are cited only where they contradict 4.1–4.3, or where they decide whether something is a bypass.

**Classes:**
- **VISUAL**: renders differently from the spec.
- **HYGIENE**: renders the same, but bypasses tokens or duplicates code.
- **BYPASS**: a hand-rolled copy is used instead of the shared directive or recipe.
- **DOC-STALE**: the code is consistent and the doc is out of date.
- **BUG**: something is broken (a dead selector or a dead declaration).

## Totals

| Class | Rows | Notes |
|---|---|---|
| VISUAL | 17 | 3 in the CTA sections, 14 in cards. Look accidental: C10 (partly), C12, C13 (the drift), C14, C15, C18, C19, C24. Intent unclear: O1. Look intentional or contextual: P3, P4, C7, C8, C9, C11, C20, C21. |
| HYGIENE | 7 | |
| BYPASS | 4 | Two primary-CTA copies, two outline-CTA copies. |
| DOC-STALE | 8 | |
| BUG | 2 | C1 alone covers 6 card types. |
| **Total** | **38** | |

---

## 4.1 Primary CTA Button (`appCtaButton`)

### Spec summary (doc 222–256; animations §6 1594–1613; hover table 1555)
- **Size:** padding `0.5rem` around the icon plus `1rem` text margin (237). Font `1.05rem`, rising to `1.1rem` at 640px+ (238). Weight `600` (239). Radius `3rem` (240). Icon wrapper is a `2.5rem` circle (241).
- **Themes:**
  - green (default, for light backgrounds, 227): green gradient, `--color-gold` text, `rgba(0,39,6,…)` shadow (246).
  - gold (for dark backgrounds, 230): gold gradient, `--color-green-darkest` text, `rgba(168,133,74,…)` shadow (247).
- **Effects:** 4s shimmer (250), 0.4s icon shake on hover (251), `translateY(-2px)` lift (252), gradient-position shift (253).
- **Not specified anywhere:** focus, disabled, active, and size variants.

### Implementations found
- **Directive:** `src/app/shared/components/cta-button/cta-button.component.ts:5`. Template `:12-22`, styles `:23-226`, inputs `:229-230` (`theme`, `icon`). It matches every value in the spec table.
- **Usages (16).** Every usage passes an icon, and in all 16 the theme matches the background.
  - green, on a light background (9):
    - `services.component.html:89`, `:165`
    - `contacts.component.html:178`
    - `documents.component.html:316`
    - `intro-section.component.html:53`
    - `consultation.component.html:33`, `:485` (a `<button type="submit" [disabled]>`)
    - `about-me.component.html:83` and `:158` (both with inline overrides; see P3 and P4)
  - gold, on a dark background (7):
    - `services.component.html:201`
    - `about-me.component.html:354`
    - `faq.component.html:69`
    - `instruction.component.html:219`
    - `court-case.component.html:193`
    - `seo-section.component.html:144`
    - `need-help-section.component.html:24`
- **Layout-only host overrides (not discrepancies):** `seo-section.component.css:253-258`.
- **Hand-rolled look-alikes:**
  - `blog-links.component.ts:33/266`. `<app-blog-links/>` is rendered on all 61 blog posts (`blog-post.component.html:66`).
  - `src/styles.css:444` `.blog-cta`, used 4 times in 2 posts.
- **Dead remnant:** a commented-out legacy `<a class="cta-button">` at `court-cases-section.component.html:46-49`.
- **Considered and excluded** (not CTA buttons, and not covered by the spec):
  - header `.phone-link` (`header.component.ts:234`)
  - share menu trigger `.share-button` (`social-share.component.ts:91`)
  - tertiary text links `.cta-link`, in 7 files

### Discrepancies

| # | Class | Where (file:line) | Spec (doc line) | Actual | Notes |
|---|---|---|---|---|---|
| P1 | BYPASS | `src/app/blog/components/blog-links/blog-links.component.ts:33` (markup); `:266-352` (styles); `:475-496` (≤768px); `:563-567` (≤479px) | Primary CTA = `appCtaButton` (222-253). Font 1.05→1.1rem @640+ (238). Padding .5rem + 1rem text margin (237). Icon 2.5rem (241). Green shadow (246). Shimmer, shake, −2px lift, gradient shift (250-253). | Hand-rolled `.cta-button`. Font `0.95rem` (`:279`), dropping to `0.875rem` at ≤768px (`:477`), which is the opposite direction to the spec's step up. Padding `0.875rem 1.5rem 0.875rem 0.875rem` (`:270`). 2-stop gradient with no `background-size` or position shift (`:271-275`). Icon `2.25rem`, or `2rem` at ≤768px (`:309-310`, `:481-482`). Shadow `.2/.1` vs `.25/.25` (`:281-283`). Shimmer alpha `.2` vs `.35` (`:299`). No icon shake, no `:active`, no hover border glow. Extra trailing arrow (`:328-334`). `transition: all .3s var(--ease-standard)` (`:284`). | **The most visible issue in this section.** It is the primary CTA on 61 blog posts. It is an inline-template component, so `<a appCtaButton icon="mail">` would work as is. It also links to `/contacts/`, while the other 10 consultation `appCtaButton`s go to `/consultation/`. Accidental drift. |
| P2 | BYPASS | `src/styles.css:443-548` (`.blog-post-section .blog-cta`). Used at `blog-posts/posts/holosuvannia-proty-proiektu-kmu-821.html:16, 221, 407` and `postanova-kmu-821-skasovana-shcho-tse-oznachaie-dlia-pensioneriv.html:101` | Same as P1 (237-253) | Font `0.9rem` at every width (`:460`). Padding `0.5rem 0.75rem` plus `gap .75rem` (`:449-450`), instead of .5rem + 1rem text margins. On hover the icon only scales (`:530-533`); there is no shake. Separate `blogCtaShimmer` keyframes (`:540-548`). Gradient, shadows, radius, 2.5rem icon, lift and gradient shift all match. One instance adds inline `style="width: 100%; justify-content: flex-start;"` (`postanova…html:102`). | Unavoidable bypass: posts are injected with `[innerHTML]` (`blog-post.component.html:53-56`, `blog-post.component.ts:86-94`), so directives cannot run there. The comment at `:443` says it "matches appCtaButton visual style", but font size and padding do not match. Not documented in 4.16. |
| P3 | VISUAL | `src/app/about-me/about-me.component.html:83-85` | Font 1.05→1.1rem (238) | `[style.fontSize]="'0.9rem'"`. The inline style beats the directive's media query, so it is 0.9rem at every width. | Looks intentional: the label is long ("Профіль у Єдиному реєстрі адвокатів України"). The directive has no size input, hence the inline override. |
| P4 | VISUAL | `src/app/about-me/about-me.component.html:158-161` | Font (238). Icon leads the label (padding model 237; template `cta-button.component.ts:14-21`). | `0.9rem` plus `[style.flexDirection]="'row-reverse'"`, which puts the arrow icon on the right | Looks intentional (imitates 4.2's trailing arrow). This is the only primary CTA with a trailing icon, and it is done with inline styles. |
| P5 | HYGIENE | `cta-button.component.ts:32, 33, 35, 36, 54, 61, 63-66, 79, 97, 147, 170-171, 175-177` | Alpha tokens (56-78). `--weight-semibold` (164). `--transition-normal`, `--ease-bounce` (1529-1531). `--icon-wrapper-md` (337). | Literals equal to tokens: `rgba(201,165,92,.2/.15/.1/.3/.35)` = `--gold-alpha-20/15/10/30/35`. `rgba(0,39,6,.25/.3)` = `--green-alpha-25/30`. `600`. `.3s cubic-bezier(0.34,1.56,0.64,1)` = `.3s var(--ease-bounce)`. `.3s ease` = `--transition-normal`. `2.5rem` = `--icon-wrapper-md`. | Renders identically. `rgba(201,165,92,.25)` (`:34`) and `rgba(168,133,74,.3/.4)` (`:98-99`) have no token. |
| P6 | HYGIENE | `cta-button.component.ts:153-161`; `blog-links.component.ts:354-362`; `styles.css:540-548` | Shimmer keyframes (1594-1602) | The same keyframes are defined 3 times (`shimmer`, `shimmer`, `blogCtaShimmer`). | Consequence of P1 and P2. |
| P7 | DOC-STALE | `cta-button.component.ts:55, 57, 75, 82-87, 192` | Effects list (249-253) | The code also has: letter-spacing .5px (`:55`); a 2px transparent border that turns `--cta-glow` on hover (`:57, 75`); an `:active` state that returns to translateY(0) with a smaller shadow (`:82-87`); a `0 0 0 4px` ring around the icon on hover (`:192`). | The directive is the single source of truth and is consistent everywhere. The doc just omits these. |
| P8 | DOC-STALE | Doc 165 vs `cta-button.component.ts:54` and `cta-outline-button.component.ts:45` | `--weight-bold` (700) is labelled "Headings, buttons" (165). That contradicts 4.1 weight 600 (239) and 4.2 (274). | Every CTA uses 600. | The doc contradicts itself; the code is consistently 600. |

---

## 4.2 Outline CTA Button (`appCtaOutlineButton`)

### Spec summary (doc 257–291; hover table 1556)
- **Size:** padding `1rem 1.5rem` (272). Font `0.9rem`, rising to `1.05rem` at 640px+ (273). Weight 600 (274). Border `2px solid` (275). Radius `3rem` (276). Default icon `arrow_forward` in a `1.5rem` circle (277).
- **Themes:**
  - green (light backgrounds): border `rgba(0,39,6,.2)`, text `--color-green`, green gradient fill on hover (282).
  - gold (dark backgrounds): border `rgba(201,165,92,.3)`, text `--color-gold`, gold gradient fill on hover (283).
- **Effects:** gradient fill via `::before` on hover (286), `translateY(-3px)` (287), icon `translateX(4px)` (288).

### Implementations found
- **Directive:** `src/app/shared/components/cta-outline-button/cta-outline-button.component.ts:5`. Template `:12-21`, styles `:22-156`, inputs `:159-160`. It matches every value in the spec table.
- **Usages (8 live).** In all of them the theme matches the background.
  - green, on light backgrounds (7):
    - `about-me.component.html:168` (a `<button>` with an inline padding override; see O1) and `:286`
    - `feedback-section.component.html:77`
    - `about-section.component.ts:65`
    - `blog-preview-section.component.html:33`
    - `services-section.component.html:98`
    - `documents-section.component.ts:25`
  - gold, on a dark background (1): `court-cases-section.component.html:52`
- **Commented out (not counted):** `feedbacks.component.html:62`, inside `<!-- -->` and carrying `[style.color]="'initial'"`. Its import is also commented out (`feedbacks.component.ts:4`).
- **Layout-only host overrides:** `about-section.component.ts:350-354`, `:532-534`.
- **Hand-rolled look-alikes:**
  - `services.component.css:181` `.service-cta-btn` (renders 3 times on /services/)
  - `consultation.component.css:566` `.reset-btn`
- **Not counted as bypasses:** documented separately in 4.15 (doc 948-1001):
  - `documents.component.css:441` `.show-more-btn`
  - `seo-section.component.css:260` `.seo-toggle-btn`

### Discrepancies

| # | Class | Where (file:line) | Spec (doc line) | Actual | Notes |
|---|---|---|---|---|---|
| O1 | VISUAL | `src/app/about-me/about-me.component.html:168-170` | Padding `1rem 1.5rem` (272) | `[style.padding]="'0.75rem 1.25rem'"`. Height ≈52px, against ≈60px for every other outline CTA and for the primary CTA directly above it (`:158`). | Intent unclear; probably meant to de-emphasise the secondary action. Heights are computed, not measured. |
| O2 | BYPASS | `src/app/services/services.component.html:74-80`; `src/app/services/services.component.css:181-211` (3 renders) | Secondary CTA = `appCtaOutlineButton` (257-288). Gold theme only on dark backgrounds (265, 283). Radius 3rem (276). Padding 1rem 1.5rem (272). Font .9→1.05rem (273). Hover = gradient fill + −3px (286-287). | A gold outline pill on a white card (light background). Text `--color-gold-accent` (`:186`). Border `rgba(201,165,92,.3)` (`:189`). Radius `2rem` (`:190`). Padding `.75rem 1.25rem` (`:184`). Font `.9rem` fixed (`:187`). Leading calendar icon, spaced with a `width: 2rem` hack on a 1.1rem glyph (`:199-203`). Hover: flat gold-accent fill, white text, −2px (`:205-210`). | Accidental. `#bb925c` on white has a contrast of **2.85:1** (computed), at rest and also for white text on hover. That fails WCAG AA (4.5:1). The same page uses the canonical `appCtaButton` at `services.component.html:89`. |
| O3 | BYPASS | `src/app/consultation/consultation.component.html:34`; `src/app/consultation/consultation.component.css:566-582` | Secondary action = `appCtaOutlineButton` (257-288) | `.reset-btn` copies the 4.15 Expand/Toggle recipe (doc 953-985): padding `.75rem 1.5rem`, `.95rem` literal, border `2px solid var(--green-alpha-20)`, radius 3rem. Its hover only tints the background (`--green-alpha-06`): no fill, no lift, no icon. | It is not a toggle. It sits next to `appCtaButton icon="home"` (`:33`), so the pair is ≈48px vs ≈60px tall (computed). Low traffic (success screen only). |
| O4 | BUG | `src/app/main/sections/blog-preview-section/blog-preview-section.component.css:289-292` (in `@media (max-width: 479px)`) | — | `.cta-button { padding: .75rem 1.25rem; font-size: .9rem }` matches nothing. The template (`blog-preview-section.component.html:33`) uses `appCtaOutlineButton`, whose host class is `.cta-outline-button` (`cta-outline-button.component.ts:9`). | Dead selector: the intended mobile shrink never applies. |
| O5 | HYGIENE | `cta-outline-button.component.ts:29, 33-35, 45, 53, 55, 108, 112-114, 137` | Alpha tokens (56-78); `--weight-semibold`; `--ease-bounce` | Literals: `rgba(0,39,6,.2/.08/.15)` = `--green-alpha-20/08/15`. `rgba(201,165,92,.2/.3/.15)` = `--gold-alpha-20/30/15`. `600`. The bounce `cubic-bezier`. | Renders identically. |
| O6 | DOC-STALE | `cta-outline-button.component.ts:28, 46, 85-96, 98-100, 107` | Effects (285-288) | The code also: swaps the label colour on hover (green→gold in the green theme, gold→green in the gold theme) (`:85-87`, `:28`, `:107`); swaps the icon background tint (`:90`); has an `:active` state of translateY(−1px) (`:98-100`); uses letter-spacing .5px (`:46`). | Consistent single source. The doc is incomplete. |

---

## 4.3 Cards

### Spec summary (doc 292–326; §9 recipe 1762–1782; §6 hover range 1554, "bouncy cards" 1540–1543)
- **Base:** `background: white` (298). Radius `--card-border-radius` = .75rem (299, 315). Border `--card-border` = `1px solid var(--gold-alpha-20)` (300, 317). Shadow `--card-box-shadow` = `0 4px 16px green-alpha-06, 0 1px 4px green-alpha-04` (301, 318). Transition on transform and box-shadow (302).
- **Hover:** `translateY(-4px)`, border `--gold-alpha-40`, shadow `0 12px 32px green-alpha-10, 0 4px 12px green-alpha-06` (305-309).
- **Small items:** `--card-border-radius-sm` .5rem (316). Nothing else is specified for them.
- **Dark-background exception:** shadow `0 8px 32px rgba(0,0,0,.2), 0 2px 8px rgba(0,0,0,.1)` (320-324).
- **§9 recipe:** adds `padding: 1.5rem` (1767) and adds `border-color` to the transition (1774).

### Implementations found (card-like blocks, by family)
- **A. Canonical, interactive with the spec hover (9):**
  - `about-me.component.css:215` `.qualification-card`, `:320` `.service-card`
  - `blog-preview-section.component.css:61` `.blog-card`
  - `faq.component.css:70` `.related-card`
  - `services-section.component.css:52` `.service-card`
  - `services.component.css:48` `.main-service-card`, `:286` `.additional-service-card`
  - `documents.component.css:561` `.education-card`, `:389` `.certificate-image-btn` (radius-sm)
- **A'. Canonical, static (no hover):**
  - `seo-section.component.css:103` `.seo-block`
  - `services.component.css:472` `.pricing-content`
  - `court-case.component.css:236` `.case-content`
  - `court-cases-list.component.css:7` `.empty-state`
  - `feedback-section.component.css:142` `.feedback-card`
  - `documents.component.css:170` `.document-card`, `:520` `.university-badge`
  - `privacy-policy.component.ts:145` and `public-offer.component.ts:159` `.legal-content`
- **B. Small items (radius-sm):**
  - `about-me.component.css:508` `.approach-item`
  - `why-me-section.component.ts:131` `.trust-item`
  - `pension-help-section.component.ts:155` `.problem-item`
- **C. Court-case cards:**
  - `court-cases-section.component.css:125` (dark section)
  - `court-cases-list.component.css:50` (light page)
- **D. Elevated page containers:**
  - `consultation.component.css:24` `.consultation-form`, `:476` `.success-card`
  - `blog-list.component.css:62` `.blog-list-container`
  - `blog-post.component.css:73` `.blog-article`
  - `instruction.component.css:173` `.instruction-article`
  - `court-cases-list.component.css:227` `.pagination-card`
- **E. Meta cards:**
  - `blog-post.component.css:136` `.article-meta-card`
  - `instruction.component.css:92` `.article-meta-card`
  - `court-case.component.css:96` `.case-meta-card`
- **F. Framed CTA cards:**
  - `blog-links.component.ts:114` `.cta-frame`
  - `contacts.component.css:553` `.cta-frame`
  - `documents.component.css:712` `.cta-frame`
- **G. Link rows and nav tiles:**
  - `related-articles.component.ts:128` `.related-card`
  - `instruction.component.css:545` `.related-card`
  - `instructions-list.component.css:37` `.instruction-card`
  - `prev-next-navigator.component.ts:68` `.nav-link`
- **H. Banners:**
  - `blog-list.component.css:13` `.blog-stats`
  - `feedbacks.component.css:7` `.trust-banner`
  - `feedbacks.component.css:53` `.feedback-card`
- **I. Tinted and dark cards:**
  - `court-case.component.css:347` `.useful-for-card`
  - `pension-help-section.component.ts:215` `.solution-content`
  - `about-me.component.css:432` `.mission-content`
  - `seo-section.component.css:190` `.cta-block`
  - `court-case.component.css:513` `.cta-section`
  - `documents.component.css:238` `.document-image-btn`
- **J. Accordion items (card-like):**
  - `blog-faq.component.ts:112` `.faq-item`
  - `faq-accordion.component.ts:40` panels
  - `instruction.component.css:282` steps-toc panels
- **Governed by other sections (not judged against 4.3):**
  - 4.8 Frosted Glass: `about-me.component.css:54`, `about-section.component.ts:253`, `contacts.component.css:62`
  - 4.14 Prominent Action Card: `contacts.component.css:146` `.primary-contact`, `documents.component.css:62` `.registry-card`
- **No `.card` class exists anywhere in `src/`** (grep). Every card re-declares the recipe: 19 × `var(--card-box-shadow)`, 26 × `var(--card-border)`, 46 × `var(--card-border-radius)`.

### Discrepancies

| # | Class | Where (file:line) | Spec (doc line) | Actual | Notes |
|---|---|---|---|---|---|
| C1 | BUG | Each pair is the `forwards` entrance animation → the dead `:hover` transform:<br>`services.component.css:66→75` (`.main-service-card`)<br>`services.component.css:303→332` (`.additional-service-card`)<br>`documents.component.css:575→585` (`.education-card`)<br>`faq.component.css:87→97` (`.related-card`)<br>`feedbacks.component.css:69→91` (`.feedback-card`)<br>`court-cases-list.component.css:66→118` (`.court-case-card`) | Hover `translateY(-4px)` (306; recipe 1777; §6 1554) | `animation: cardReveal … forwards` animates `transform` (keyframes at `styles.css:794-803`). After the animation ends it keeps `transform: translateY(0)` applied. Animation values outrank normal author declarations in the cascade, so the hover lift (and court-case `scale(1.01)`) never applies. Only the shadow and border change on hover. | 6 card types on /services/, /documents/, /faq/, /feedbacks/ and /court-cases/. Based on cascade rules; **not browser-tested**. Suggested fix: use `animation-fill-mode: backwards` and drop the base `opacity: 0` / `transform: translateY(20px)`, or animate `translate` instead of `transform`. |
| C2 | HYGIENE | The spec hover is copied 9 times; 7 copies use literals:<br>`about-me.component.css:238-239, 355-356`<br>`blog-preview-section.component.css:91-92`<br>`faq.component.css:98-99`<br>`services-section.component.css:76-77`<br>`services.component.css:76-77, 333-334`<br>Token-based copies: only `documents.component.css:405-406, 586-587` | `.card` (296-309); hover tokens `--gold-alpha-40`, `--green-alpha-10/06` (307-308) | `rgba(201,165,92,.4)` and `rgba(0,39,6,.1/.06)` written as literals. No shared `.card` class exists, so the base recipe is also re-declared in about 20 rules. | Renders identically. A global `.card` / `.card--interactive` utility in `styles.css` (the same approach as the existing `.highlight-box` and `.photo-frame`) would remove the copies. |
| C3 | HYGIENE | `src/styles.css:109-121` | `--card-border: 1px solid var(--gold-alpha-20)`; `--card-box-shadow: … var(--green-alpha-06), … var(--green-alpha-04)` (317-318) | Defined with raw `rgba()` (`:119`, `:121`). The comments label the card tokens "4.1 / 4.2 / 4.3" (`:111`, `:117`, `:120`), but all of them belong to 4.3; 4.1 and 4.2 are the CTA sections. `--border-radius-md` (`:110`) duplicates `--card-border-radius-sm` (`:113`); both are .5rem. | Same values; housekeeping only. |
| C4 | DOC-STALE | Doc 302 vs recipe 1771-1774 and every hover card (e.g. `services-section.component.css:61`, `about-me.component.css:224`) | The 4.3 transition lists only `transform, box-shadow` (302), yet the hover changes `border-color` (307). | The code and the §9 recipe also transition `border-color`. §6 adds a third recipe, "bouncy cards" `transform .3s var(--ease-bounce)` (1540-1543), which only the court-case cards use. | The 4.3 snippet is stale. The doc gives three different transitions for the same card. |
| C5 | DOC-STALE | Doc 834-839 (4.13 hover) vs 305-309 (4.3 hover) | 4.13: −2px with `0 8px 24px .08, 0 2px 8px .04`. 4.3: −4px with `0 12px 32px .1, 0 4px 12px .06`. | Every card that 4.13 names follows 4.3: `.main-service-card` (`services.component.css:74-78`), `.additional-service-card` (`:331-335`), `.qualification-card` (`about-me.component.css:236-240`), `.service-card` (`about-me.component.css:353-357`; `services-section.component.css:74-78`). Only `.approach-item` (`about-me.component.css:538-542`) uses the 4.13 values. | The doc contradicts itself and the code sides with 4.3. Cross-reference for the 4.13 auditor. |
| C6 | DOC-STALE | `court-cases-section.component.css:125-183`; `court-cases-list.component.css:50-136` | The dark-background exception covers only the resting shadow (320-324). | The shadow matches exactly (`court-cases-section.component.css:130-132`). Both court-case cards also share undocumented traits:<br>• no border<br>• a 4px gold top bar `::before` (`:137-150` / `:89-102`)<br>• cream gradient `#fffdf8→#fff` (`:127` / `:54`)<br>• hover `translateY(-6px) scale(1.01)` plus a gold `0 0 0 1px` ring (`:163-168` / `:117-122`)<br>• bounce easing (`:133-135` / `:60-62`) | Consistent between the two. §6 allows −4…−6px (1554), but the scale, the top bar and the missing border are documented nowhere. |
| C7 | VISUAL | `court-cases-list.component.css:57-59, 119-122` (on the light `.page-bg-pattern`, `court-cases-list.component.html:1`) | Light-background cards use the green-tinted `--card-box-shadow` (301, 318). Black shadows are only for dark backgrounds (320-324). | Neutral black shadows `rgba(0,0,0,.08/.04)`, `.12/.08` on hover; no border. | Intentional: the dark-section card ported to a light page with lower alphas. It is the only light-background card with black shadows. |
| C8 | VISUAL | `why-me-section.component.ts:139-141` (`.trust-item`); `pension-help-section.component.ts:163-165` (`.problem-item`) | `--card-box-shadow` (301, 318). Only the radius is defined for small items (316). | `0 2px 8px rgba(0,39,6,.04), 0 1px 2px rgba(0,39,6,.02)`: a lighter shadow, and `.02` has no token. | Probably intentional for dense lists, but the sibling small item `.approach-item` uses the full token (`about-me.component.css:516`). |
| C9 | VISUAL | `about-me.component.css:538-542`; `why-me-section.component.ts:148-152`; `pension-help-section.component.ts:172-176` and `:290-292` (≥1024px) | Hover −4px, border `.4`, `0 12px 32px…` (305-309) | Three different small-item hovers:<br>• `.approach-item`: −2px lift, border .4<br>• `.trust-item`: `translateX(4px)` slide, border .35<br>• `.problem-item`: slide below 1024px, then a −4px lift, border .3 | Each one is plausible in its context, but none is documented. |
| C10 | VISUAL | `pension-help-section.component.ts:162`; `instructions-list.component.css:44`; `instruction.component.css:551` (accordion panels: see C24) | `--card-border`, gold `rgba(201,165,92,.2)` (300, 317) | `1px solid rgba(0,39,6,.08)`: a green-tinted border. | Probably accidental on `.problem-item` (its sibling `.trust-item` uses the token). Applied consistently across the instruction pages. |
| C11 | VISUAL | `related-articles.component.ts:128-161`; `instructions-list.component.css:37-59`; `instruction.component.css:545-563`; `prev-next-navigator.component.ts:68-89` | Resting `--card-box-shadow`; hover −4px with the spec shadow (301, 305-309) | No resting shadow on any of them. Hovers:<br>• related-articles: `translateX(4px)` + `0 6px 20px .08` (`:141-144`)<br>• `.instruction-card`: −2px + `0 4px 16px .08, 0 2px 8px .04` (`:53-59`)<br>• instruction `.related-card`: no lift; gold border and a tint (`:560-563`)<br>• prev-next: −2px + `0 8px 24px .1` (`:84-88`)<br>Radius is a literal `.75rem` (related-articles `:134`) and `.5rem` (instruction `:552`). | Intentional "flat row" look for link lists. The class name `.related-card` now has three looks: /faq canonical (`faq.component.css:70`), blog, and instruction. |
| C12 | VISUAL | `feedbacks.component.css:53-108` (/feedbacks/) | Radius .75rem (299); `--card-border` (300); `--card-box-shadow` (301); hover −4px (306) | Radius `1rem` (`:55`). Border `rgba(201,165,92,.25)` (`:57`). Shadow `0 4px 25px rgba(0,39,6,.08)` (`:61`). `transition: all .4s` (`:62`). Hover −8px (dead, see C1) with `0 20px 50px .15` plus a gold glow (`:90-93`). | Accidental (legacy). The home carousel shows the same reviews with canonical tokens (`feedback-section.component.css:142-156`), so the same content has two looks. |
| C13 | VISUAL | `consultation.component.css:30-32, 484-486`; `blog-list.component.css:68-70`; `court-cases-list.component.css:233`; `blog-post.component.css:82-84`; `instruction.component.css:182-184` | `--card-box-shadow` = `0 4px 16px .06, 0 1px 4px .04` (318) | Three different "elevated container" shadows, 2 uses each:<br>• `0 8px 32px .06, 0 2px 8px .04` (form, success card)<br>• `0 8px 32px .08, 0 2px 8px .04` (blog list, pagination card)<br>• `0 8px 40px .08, 0 2px 12px .04` (blog article, instruction article) | Elevating page-level containers looks intentional; the drift between the three values looks accidental. Other page containers use the token: `.legal-content` ×2, `.case-content`, `.document-card`, `.pricing-content`, `.seo-block`. |
| C14 | VISUAL | `blog-post.component.css:136-146`; `instruction.component.css:92-102`; `court-case.component.css:96-106` | Border `.2` (317); shadow `0 4px 16px .06, 0 1px 4px .04` (318) | Border `rgba(201,165,92,.18)`; shadow `0 4px 20px .06, 0 1px 3px .04`; gradient background plus a gold top bar. | Near-identical to the tokens (practically imperceptible); accidental drift. Triplicated (see C22). |
| C15 | VISUAL | `blog-list.component.css:13-28` (`.blog-stats`); `feedbacks.component.css:7-21` (`.trust-banner`) | Radius .75rem (315); `--card-box-shadow` (318) | Radius `1rem`; single-layer shadow `0 4px 20px rgba(0,39,6,.06)`; the border is a literal. | A copy-pasted pair; the radius drift looks accidental. |
| C16 | DOC-STALE | `blog-links.component.ts:114-124`; `contacts.component.css:553-563`; `documents.component.css:712-722` | Not covered by 4.3 (radius .75rem and a gold border, 299-301) | `.cta-frame`: radius `0.25rem`, no border, shadow `0 1px 3px green-alpha-04, 0 8px 32px green-alpha-06`, gold L-shaped corners. | A deliberate, consistent variant used on 3 surfaces (all blog posts, /contacts/, /documents/), but undocumented. The `.25rem` could use the existing `--border-radius-sm` (`styles.css:109`). |
| C17 | DOC-STALE | `pension-help-section.component.ts:215-229` (`.solution-content`); `about-me.component.css:432-450` (`.mission-content`) | There is no dark-card spec; 4.3 only covers white cards on dark backgrounds (320-324). | Both use an identical recipe: green gradient + `--card-border` + `0 8px 32px rgba(0,39,6,.2), 0 4px 12px .15, inset 0 1px 0 gold .1`. | Consistent and undocumented. `about-me.component.css:408` even says "Card style like solution-content". |
| C18 | VISUAL | `seo-section.component.css:190-200` (`.cta-block`); `court-case.component.css:513-522` (`.cta-section`) | Closest pattern: the C17 dark card | `.cta-block`: no border; shadow `0 8px 24px .15` + inset. `.cta-section`: green-darkest→green gradient, no border, no shadow. | Two more dark-card variants that drift from the C17 pair. Likely accidental. |
| C19 | VISUAL | `documents.component.css:238-253` (`.document-image-btn`) vs `:389-407` (`.certificate-image-btn`) | `--card-border`, `--card-box-shadow`, spec hover (300-308) | `.document-image-btn`: `border: 0`; background `--green-alpha-03`; shadow `0 4px 16px green-alpha-10`; hover `0 12px 32px green-alpha-15, 0 4px 12px green-alpha-10`. The certificate button on the same page follows the spec. | Two treatments for image-thumbnail buttons on one page; accidental. |
| C20 | VISUAL | `documents.component.css:171` (`.document-card`, bg .85); `privacy-policy.component.ts:148` and `public-offer.component.ts:162` (`.legal-content`, bg .8 + blur); `documents.component.css:528` (`.university-badge`, gradient .9) | `background: white` (298) | Translucent white backgrounds on cards that otherwise follow the tokens. | Intentional (they sit on the patterned page background). Overlaps 4.8, which specifies `.7` (632). See D4. |
| C21 | VISUAL | `court-case.component.css:347-357` (`.useful-for-card`) | White background, `--card-box-shadow` (298, 301) | Gold-tinted gradient background, no shadow, literal border. | Intentional highlight card; low priority. |
| C22 | HYGIENE | Duplicated blocks:<br>• `privacy-policy.component.ts:145-155` = `public-offer.component.ts:159-169` (verbatim)<br>• `contacts.component.css:505-720` ≈ `documents.component.css:669-880` (~210 lines; `diff` shows only comments and formatting)<br>• the 3 meta cards (C14)<br>• `.blog-stats` = `.trust-banner` (C15)<br>• `instruction.component.css:282-300` copies `faq-accordion.component.ts:40-60` | — | Copy-pasted card CSS. | Renders identically. Maintenance risk: C14 and C15 show the copies already drifting. |
| C23 | HYGIENE | **Literal `--card-border` equivalents:** `blog-list.component.css:26, 67`; `blog-post.component.css:81`; `instruction.component.css:181`; `court-case.component.css:356`; `prev-next-navigator.component.ts:77`; `feedbacks.component.css:19`; `consultation.component.css:29, 483`.<br>**Redundant fallback:** `var(--card-border-radius, 0.75rem)` (`instructions-list.component.css:43`).<br>**Dead declarations:** `border: 0` overridden by `border: var(--card-border)` in the same rule (`documents.component.css:394` vs `:400`); `.video-panel` has its card border and shadow commented out, leaving an empty `&:hover {}` (`blog-iframe.component.ts:92-109`). | `--card-border` (317); `--card-border-radius` (315) | — | Renders identically. |
| C24 | VISUAL | `blog-faq.component.ts:112-126` (`.faq-item`) vs `faq-accordion.component.ts:40-60` and `instruction.component.css:282-300` | Card radius tokens .75 / .5rem (315-316); `--card-border` (317) | Blog FAQ: radius `.625rem` (no token), gold border `.12`, hover `.3`. Shared accordion: radius `.75rem !important` (literal), green border `rgba(0,39,6,.1)`, hover gold `.4`, expanded `0 4px 16px .08, 0 2px 8px .04`. | FAQ accordion items have two looks: blog posts vs /faq, /services, court-case and instruction. The doc has no accordion section, so they are included here as card-like blocks. Accidental. |

---

## Gaps: states that neither the spec nor the shared code define (not counted above)
- **G1. No `:focus-visible` on either CTA directive.** They fall back to the browser's default outline. The same applies to the hand-rolled copies (P1, P2, O2, O3) and to all link cards.
  - The doc assigns `--gold-alpha-30` to "Focus rings" (76).
  - The site already has a focus convention elsewhere: `outline: 2px solid var(--color-gold); outline-offset: 2px` (`documents.component.css:266-268, 419-421, 478-481`).
- **G2. No disabled state in `appCtaButton`.**
  - The only disabled usage is `consultation.component.html:485` (`[disabled]="isSubmitting()"`). It is patched locally at `consultation.component.css:456-459` (opacity .7, `not-allowed` cursor).
  - The hover lift, icon shake and shimmer still run on the disabled button: `cta-button.component.ts:72-80, 190-194` have no `:not([disabled])` guard.
- **G3. No `prefers-reduced-motion` anywhere in `src/`** (grep).
  - The 4s infinite shimmer on every primary CTA (`cta-button.component.ts:150`) always runs.
  - All card entrance animations always run.

## Out-of-scope observations (for the owners of those sections)
- **Typography:** `--weight-medium` is undefined and has no fallback (`court-case.component.css:454`).
- **4.15:** `.seo-toggle-btn` (`seo-section.component.css:260-300`) is listed as a user (doc 1001), but it deviates from the recipe:
  - border is solid green, not green-alpha-20
  - radius 2rem, not 3rem
  - padding .875rem 2rem
  - hover is a solid fill
- **4.14:** `.registry-card` hover is −3px with green-alpha 25/15 (`documents.component.css:91-95`); the doc says −2px with green-alpha-30 (919-920).
- **4.8:**
  - `contacts.component.css:62-78` uses the 4.8 recipe but is missing from "Used in" (649).
  - `about-section.component.ts:253-262` has no `backdrop-filter`, which 4.8 requires (633).
- **Undocumented tertiary patterns:**
  - `.back-link` is triplicated (`blog-post.component.css:25`, `court-case.component.css:48`, `instruction.component.css:19`). Only court-case adds `font-size: .9rem` (`:53`).
  - The `.cta-link` text link is repeated in 7 files.

---

## Decisions needed (competing variants, each in real use)

1. **Card hover motion.** The doc itself gives three answers: 4.3 says −4px (306), 4.13 says −2px (835), and §6 says −4…−6px (1554).
   - (a) −4px lift: **9** elements (family A). 4 of them are currently dead because of C1.
   - (b) −2px lift: **3** (`.approach-item`, `.instruction-card`, prev-next `.nav-link`).
   - (c) `translateX(4px)` slide for list rows: **3** (`.trust-item`, `.problem-item` below 1024px, related-articles `.related-card`).
   - (d) −6px + `scale(1.01)`: **2** (the court-case cards).
   - (e) −8px: **1** (/feedbacks/).
2. **Should non-clickable cards lift on hover?** 4.3 does not distinguish clickable from static cards.
   - **9** card types that are not links themselves still lift: `.qualification-card`, about-me `.service-card`, services-section `.service-card` (contains an inner link), `.main-service-card`, `.additional-service-card`, `.education-card`, `.approach-item`, `.trust-item`, `.problem-item`.
   - **7** static containers have no hover: `.seo-block`, `.pricing-content`, `.case-content`, `.empty-state`, home `.feedback-card`, `.document-card`, `.legal-content`.
3. **Elevation for page-level containers.**
   - `--card-box-shadow`: **6** containers (`.legal-content` ×2, `.case-content`, `.document-card`, `.pricing-content`, `.seo-block`).
   - Three ad-hoc "large" shadows: **2 + 2 + 2** (C13).
   - Either pick the token, or add a single `--card-box-shadow-lg`.
4. **Card surface.**
   - Opaque `white` (spec): the large majority of card rules (roughly 25 or more).
   - Translucent white: `.7` (4.8: **3**), `.8` (**3**), `.85` (**4**), `.9` (**2**).
5. **Card border tint.**
   - Gold `--card-border`: **26** token uses plus **9** literal equivalents.
   - Green `rgba(0,39,6,.08/.1)`: **5** (`.problem-item`, `.instruction-card`, instruction `.related-card`, the 2 accordion panel sets).
6. **Secondary and compact buttons.**
   - `appCtaOutlineButton`: **8** uses.
   - The 4.15 ghost recipe reused for a non-toggle action: **1** (`.reset-btn`).
   - A gold pill on a light background: **3** renders (`.service-cta-btn`).
   - There is also a de-facto demand for a smaller CTA:
     - inline overrides: **3** (about-me ×2 font size, ×1 padding)
     - `.blog-cta` at .9rem: **4**
     - blog-links at .95rem: **61** pages
   - Decide whether to add `size="sm"` (and an `iconPosition` input) to the directives, or to keep a single size.
7. **End-of-page CTA container.**
   - Framed white card with gold corners (`.cta-frame`): **3** (blog posts, /contacts/, /documents/).
   - Full-bleed dark section (`.final-cta-section-bg`): **4** (/services/, /about-me/, /faq/, instruction), plus need-help on the home page.
   - Rounded dark card: **2** (court-case `.cta-section`, seo `.cta-block`).
8. **Small-item card treatment (radius-sm)** (low usage).
   - Light shadow + slide: **2** (`.trust-item`, `.problem-item`).
   - Full card shadow + −2px lift: **1** (`.approach-item`).
   - Pick one and document it next to `--card-border-radius-sm` (316).
