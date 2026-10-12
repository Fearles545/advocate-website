# Design-system audit: components B (DESIGN_SYSTEM.md §4.7–4.12)

> Appendix to [`../audit-report-2026-10.md`](../audit-report-2026-10.md). Rows were derived from the CSS with file:line evidence; the findings re-checked in a browser are listed in the main report (§7).

Scope: §4.7 Photo Frame, §4.8 Content Wrapper, §4.9 Section Label, §4.10 Quote Marks, §4.11 Highlight Box, §4.12 Nav Links with Divider.
Sources checked: `src/styles.css`, all 25 component `.css` files, all 24 components with inline `styles:`, their templates (`.html` / inline `template:`), and blog post HTML (only to count usages).
"doc N" means a line in `docs/DESIGN_SYSTEM.md`. Every other path is relative to the repo root. Nothing in the repo was modified and no build was run.

Classes: **VISUAL** renders differently from the spec · **HYGIENE** renders the same but bypasses a token or duplicates code · **BYPASS** a hand-rolled variant used instead of the pattern · **DOC-STALE** the code is consistent but the doc is wrong or outdated · **BUG** a broken reference or a dead rule.

---

## §4.7 Photo Frame with Offset Border

**Spec summary.** A global `.photo-frame` (doc 573) with `--photo-frame-offset: 10px`, `border-radius: .5rem`, and a light-grey 135° gradient background. Its `::before` is offset down and right by the variable, with `3px solid var(--color-gold)`, radius .5rem and z-index 0 (doc 576-592). A nested `img` rule sets `position:relative; z-index:1; width:100%; height:100%; object-fit:cover; radius .5rem` (doc 594-601). Components should set sizing only, for example `max-width:280px; aspect-ratio:300/472`, and `--photo-frame-offset:14px` at ≥1024px (doc 605-617). Used in about-me, contacts and intro-section (doc 620).

**Implementations found**
- Global: `src/styles.css:705-722`. The token is also declared on `:root` at `src/styles.css:105`.
- about-me: template `about-me.component.html:27-36` (`img.profile-photo`). CSS `about-me.component.css:30-34` (sizing), `:36-47` (img), `:801-803`, `:887-889`, `:943-945` (offset 14px at ≥1024), `:978-980`, `:995-997` (offset 18px at ≥1280), `:1009-1011`.
- contacts: template `contacts.component.html:23-32`. CSS `contacts.component.css:40-43`, `:45-56` (img), `:786-788`, `:818-821` (offset 12px at ≥1024), `:889-891` (offset 14px at ≥1280), `:907-909`.
- intro-section: template `intro-section.component.html:29-40` (mobile) and `:78-88` (desktop), `img.main-photo`. CSS `intro-section.component.css:298-303`, `:305-316` (img), `:368-370`, `:375-378`, `:396-399`, `:457-461` (offset 12px at ≥768), `:539-543` (offset 14px at ≥1024), `:567-569`.
- Look-alike: main-page about-section photo, `.image-frame` with four `.corner-accent` elements: `about-section.component.ts:15-28`, `:120-246`, `:498-530`, `:555-589`.
- Excluded: blog `figure .phone-frame` (`styles.css:392-424`, a screenshot device frame) and the documents certificate thumbnails. Neither is a profile photo.

| # | Class | Where (file:line) | Spec (doc line) | Actual | Notes |
|---|---|---|---|---|---|
| 7.1 | DOC-STALE | `src/styles.css:705-722` | The global class includes the `img{position:relative;z-index:1;width:100%;height:100%;object-fit:cover;border-radius:.5rem}` rule (doc 594-601) | The global class has no `img` rule. All 3 users style their own img (`about-me.component.css:36-47`, `contacts.component.css:45-56`, `intro-section.component.css:305-316`) with `height:auto`, `object-position:center top`, a box-shadow and `animation: photoAppear`. | This matters for future use. A new `.photo-frame` that follows the doc gets an unpositioned img, so the positioned `::before` (z-index 0) paints the gold border **over** the photo. Fix it in code (preferred: move the shared img rule into `styles.css`) or in the doc. |
| 7.2 | HYGIENE | `about-me.component.css:36-47`, `contacts.component.css:45-56`, `intro-section.component.css:305-316` | One shared img rule (doc 594-601) | Three near-identical img rules, 10 declarations each, differing only in box-shadow | `intro-section.component.css:312` uses the literal `rgba(0,39,6,0.2)`. contacts uses `var(--green-alpha-20)` for the same value (`contacts.component.css:52`). |
| 7.3 | VISUAL | `about-me.component.css:43` | No img shadow in spec (doc 594-601). The two sibling users share `0 10px 40px` at α .2 (`contacts.component.css:52`, `intro-section.component.css:312`) | `box-shadow: 40px 20px 40px rgba(0,39,6,0.1)`, an offset shadow thrown right and down (the same direction as the gold offset) | This is the outlier against the other 2 users and has no comment. Looks accidental (unverified). |
| 7.4 | VISUAL | `contacts.component.css:818-821`, `:889-891` | Offset 14px at ≥1024 (doc 613-617) | 12px at ≥1024; 14px only at ≥1280 | No comment. Possibly contextual (the photo sits in a narrower 1.5fr column). Intent unverified. |
| 7.5 | VISUAL | `about-me.component.css:994-997` | 14px maximum (doc 615) | 18px at ≥1280 | Intentional: the comment says "even larger offset", and `.image-panel` padding reserves room for it (`about-me.component.css:974-976`). Undocumented. |
| 7.6 | VISUAL | `intro-section.component.css:457-461` | 10px until 1024 (doc 613-617) | 12px from ≥768 | Looks like an intentional tablet step. No comment. |
| 7.7 | HYGIENE | `src/styles.css:105` and `:706` | Declared on `.photo-frame` (doc 577) | The token is declared twice, on `:root` and on `.photo-frame` | `.photo-frame` re-declares the value, so the `:root` copy never reaches any consumer. Setting it on an ancestor also has no effect, despite the comment at `styles.css:103-104`. Only overrides on `.photo-frame` itself work, which is what all 3 components do. |
| 7.8 | HYGIENE | `src/styles.css:708`, `:719`; `about-me.component.css:42`; `contacts.component.css:51`; `intro-section.component.css:311` | Literal `.5rem` (doc 579, 590, 600) | `border-radius: 0.5rem` literal, equal to `--border-radius-md` / `--card-border-radius-sm` (`styles.css:110`, `:113`) | The doc snippet uses the same literal. Low priority. |
| 7.9 | BYPASS | `about-section.component.ts:15-28`, `:120-153`, `:156-246`, `:498-530`, `:555-589` | `.photo-frame` is the pattern "for profile photos" (doc 573) | The lawyer photo on the main page has inset gold L-corners (3px × 35–45px) and no offset border. The frame uses radius `var(--card-border-radius)` (.75rem), `overflow:hidden` and a hover zoom. Corner sizes use `!important` (`:504`, `:508`, `:561-567`). | Intentional: `docs/design-system/visual-review-desktop.md:56` approves "Photo with corner frames". It is not documented in DESIGN_SYSTEM.md. |

---

## §4.8 Content Wrapper (Frosted Glass)

**Spec summary.** `.content-wrapper` (doc 629-640): `position:relative`, padding `2rem 1.5rem`, background `rgba(255,255,255,.7)`, `backdrop-filter: blur(10px)` plus the `-webkit-` prefix, radius `var(--card-border-radius)`, border `var(--card-border)`, and the soft shadow `0 4px 24px rgba(0,39,6,.04), 0 1px 4px rgba(0,39,6,.02)`. There is no global class. Used in about-me and about-section (doc 649).

**Implementations found**
- about-me: `about-me.component.html:41` → `about-me.component.css:54-65`. Responsive overrides at `:735-737` (≥640), `:775-777`, `:895-897`, `:982-984` and `:1013-1015` (≤479).
- about-section: `about-section.component.ts:33` → `:253-262`. Responsive overrides at `:390-392` (≥480), `:410-412`, `:449-452`, `:551-553`.
- Look-alikes (frosted content surfaces):
  - contacts `.contact-methods`: `contacts.component.css:62-77`, used at `contacts.component.html:36`.
  - documents `.document-card`: `documents.component.css:170-185`.
  - Legal pages `.legal-content`: `public-offer.component.ts:159-169` (overrides `:266-268`, `:276-278`) and `privacy-policy.component.ts:145-155` (overrides `:223-225`, `:233-235`).
  - Blog `.blog-article`: `blog-post.component.css:73-91`.
  - Instructions `.instruction-article`: `instruction.component.css:173-188`.
  - Consultation `.consultation-form` (`consultation.component.css:24-40`) and `.success-card` (`:476-488`).
- Excluded (controls, not content wrappers): prev-next `.nav-link` (`prev-next-navigator.component.ts:68-80`, α .8, blur 8px) and scroll-to-top `::before` (`scroll-to-top.component.ts:81-93`, α .85, blur 8px).

| # | Class | Where (file:line) | Spec (doc line) | Actual | Notes |
|---|---|---|---|---|---|
| 8.1 | VISUAL | `about-section.component.ts:253-262` | `backdrop-filter: blur(10px)` and the `-webkit-` prefix are required (doc 633-634, 645-646), and the doc lists about-section as a user (doc 649) | Neither `backdrop-filter` nor `-webkit-backdrop-filter` is present | An accidental omission: the about-me twin has both. It is probably imperceptible here, because the backdrop is `.about-section-bg`, a plain gradient with no pattern (`about-section.component.ts:77-83`). Not render-verified. |
| 8.2 | BYPASS | `contacts.component.css:62-77` (template `contacts.component.html:36`) | `.content-wrapper` (doc 629-640, 649) | A verbatim copy of every `.content-wrapper` declaration under the name `.contact-methods`, plus a flex-column layout | contacts is missing from the doc's "Used in" list. It follows the same padding approach (`:833-835`, `:912-915`). |
| 8.3 | BYPASS | `documents.component.css:170-185`, `:885-887`, `:971-973`, `:1051-1053` | α .70 (doc 632); soft shadow (doc 637-639); padding `2rem 1.5rem` (doc 631) | α **.85**, blur 10px, `box-shadow: var(--card-box-shadow)` (stronger), padding 1.5rem (2rem at ≥640, 2.5rem at ≥1024, 1.25rem at ≤479) | Contextual (a card that holds certificate images). |
| 8.4 | BYPASS | `public-offer.component.ts:159-169`; `privacy-policy.component.ts:145-155` | doc 632, 637-639 | α **.80**, blur 10px, `var(--card-box-shadow)`, padding 2rem, 3rem at ≥768, 1.5rem at ≤479 | Contextual (long legal text). The two components hold verbatim copies of this rule (see 8.8). |
| 8.5 | BYPASS | `blog-post.component.css:73-91`; `instruction.component.css:173-188` | doc 632-639 | α **.85**, blur **12px**, border literal `1px solid rgba(201,165,92,0.2)`, shadow `0 8px 40px rgba(0,39,6,.08), 0 2px 12px rgba(0,39,6,.04)` | This is the frosted surface that reaches the most pages: 61 blog posts and 8 instructions. Contextual (article readability). |
| 8.6 | BYPASS | `consultation.component.css:24-34`, `:476-488` | doc 632-639 | α **.85** on the form and **.90** on the success card, blur **12px**, border `1px solid var(--gold-alpha-20)`, shadow `0 8px 32px var(--green-alpha-06), 0 2px 8px var(--green-alpha-04)` | Contextual (form). This is a fourth shadow recipe. |
| 8.7 | VISUAL | `about-me.component.css:1013-1015` and `:735-737`, compared with `about-section.component.ts:389-392` | Padding `2rem 1.5rem` at all sizes (doc 631) | about-me uses `1.5rem 1.25rem` at ≤479; about-section keeps `2rem 1.5rem`. The `2.5rem 2rem` step starts at 640px in about-me and at 480px in about-section. | The two documented users diverge on small screens. The tighter mobile padding looks contextual. |
| 8.8 | HYGIENE | `about-me.component.css:54-65` = `contacts.component.css:62-77` = `about-section.component.ts:253-262` (minus blur); `public-offer.component.ts:159-169` = `privacy-policy.component.ts:145-155`; `blog-post.component.css:73-91` = `instruction.component.css:173-188` | One pattern (doc 629-640) | Three groups of verbatim duplicates (diff-checked) and no global class. `@keyframes articleReveal` is also duplicated (`blog-post.component.css:93`, `instruction.component.css:162`). | Candidate for a global `.content-wrapper` with modifiers. |
| 8.9 | HYGIENE | `about-me.component.css:63`, `about-section.component.ts:260`, `contacts.component.css:75` (and doc 638) | "Use these instead of inline rgba()" (doc 52); the token `--green-alpha-04` exists (`styles.css:135`) | The shadow uses the literal `rgba(0, 39, 6, 0.04)` | The doc's own snippet breaks its alpha-token rule. Also: `blog-post.component.css:81` and `instruction.component.css:181` write out `var(--card-border)`'s exact value as a literal, and `consultation.component.css:29`, `:483` reach the same value through a different token (`--gold-alpha-20`). |
| 8.10 | DOC-STALE | `about-me.component.css:775-777`, `:895-897`, `:982-984`; `about-section.component.ts:410-412`, `:449-452`, `:551-553` | Only the base padding is given (doc 631) | Both users share a ramp: 3rem at ≥768, then `3rem 3.5rem` at ≥1024, then `3.5rem 4rem` at ≥1280 | Document the ramp. The 480 vs 640 split is covered in 8.7. |

---

## §4.9 Section Label (Golden Eyebrow)

**Spec summary.** `.section-label` (doc 658-672): inline-block, `.75rem`, weight 600, uppercase, `letter-spacing:3px`, gold, `margin-bottom:.75rem`, with `—` on both sides (`margin:0 .5rem; opacity:.5`). The desktop variant hides the left dash at ≥768px (doc 676-681). Used in about-section only (doc 684). There is no global class.

**Implementations found**
- `about-section.component.ts:38` → `:293-309`. Desktop rule at `:467-475` inside `@media (min-width:1024px)` (`:433`).
- Look-alike: intro `.profession-label`, the gold uppercase kicker inside the H1 (`intro-section.component.html:18`) → `intro-section.component.css:156-162`, `:347-350`, `:391-394`, `:444-447`, `:505-507`.
- Excluded:
  - header `.brand-title` (`header.component.ts:33`, `:178-185`) and footer `.footer-title` (`footer.component.html:15`, `footer.component.css:123-131`). These are a brand lockup above the name, not a section eyebrow.
  - prev-next `.nav-label` (`prev-next-navigator.component.ts:165-171`, a card kicker).
  - blog-links `.nav-label` (grey).
  - contacts `.messenger-title`, `.schedule-title` and `.primary-label` (UI labels).

| # | Class | Where (file:line) | Spec (doc line) | Actual | Notes |
|---|---|---|---|---|---|
| 9.1 | DOC-STALE | `about-section.component.ts:433`, `:467-475` | Hide `::before` at ≥768 (doc 677-679) | Hidden at **≥1024**, plus `::after{margin-left:.75rem}` | The code is consistent with its own layout. The header only switches to left alignment at 1024 (`about-section.component.ts:454-456`) and stays centred at 768–1023, so the doc's 768 would put a one-dash label on a centred header. Update the doc to 1024 and add the `::after` margin. |
| 9.2 | HYGIENE | `about-section.component.ts:295` (and doc 660) | Token `--font-size-label: .75rem` ("Badges, small labels", `styles.css:22`) | Literal `font-size: 0.75rem` | `font-weight: 600` is likewise a literal equal to `--weight-semibold`. That is a site-wide habit (77 literals against 15 token uses), so it is low priority. |
| 9.3 | BYPASS | `intro-section.component.css:156-162`, `:347-350`, `:391-394`, `:444-447`, `:505-507` (template `intro-section.component.html:18`) | `.75rem` (doc 660); `letter-spacing:3px` (doc 663); em-dashes (doc 667-671) | A gold uppercase eyebrow above the name. Size `.85rem`: `.75` at ≤359, `.9` at ≥480, `1rem` at ≥768, `1.1rem` at ≥1024. Weight 600. Letter-spacing 2px (1px at ≤359, 2.5px at ≥768). No dashes. | Contextual and intentional: it is part of the H1 for SEO and scaled for a hero. Decide whether it becomes a documented "hero" variant or stays bespoke. |

---

## §4.10 Decorative Quote Marks

**Spec summary.** `.quote-mark` (doc 693-703): absolute, `'Cormorant Garamond','Georgia',serif`, 6rem, weight 600, line-height 1, gold at opacity .15, `pointer-events:none`, `user-select:none`. `.quote-open` sits at top −.5rem / left .5rem; `.quote-close` at bottom 0 / right .5rem with `rotate(180deg)` (doc 705-714). Size steps are 6rem, 7rem at ≥480, 8rem at ≥768, and 9rem at ≥1024, where the marks move outside (doc 719-724). The doc says the pattern is "for testimonial or about sections" (doc 690) and lists about-me and about-section as users (doc 726). There is no global class.

**Implementations found**
- about-me: `about-me.component.html:43`, `:66` → `about-me.component.css:67-89`, `:739-751` (≥**640**), `:779-791`, `:928-940`.
- about-section: `about-section.component.ts:35`, `:63` → `:264-286`, `:394-406` (≥480), `:418-430`, `:486-496`.
- Both apply `aria-hidden="true"` correctly.
- Look-alikes: the testimonial `<mat-icon class="quote-icon">format_quote</mat-icon>` at `feedbacks.component.html:50` (CSS `feedbacks.component.css:266-276`, hover `:105-108`, ≤600px `:365-370`) and at `feedback-section.component.html:49` (CSS `feedback-section.component.css:216-224`).
- Related, documented in §4.16: the blog `blockquote::before` glyph (`styles.css:358-369`, 3rem at opacity .3).

| # | Class | Where (file:line) | Spec (doc line) | Actual | Notes |
|---|---|---|---|---|---|
| 10.1 | VISUAL | `about-me.component.css:734-751` | 7rem from **480px** (doc 722) | 7rem and the first offset step start at **640px**. At 480–639px about-me shows 6rem at the base offsets, while about-section shows 7rem (`about-section.component.ts:389-406`). | Likely incidental: about-me's CSS has no 480px query, so the step went into its 640px block. |
| 10.2 | BYPASS | `feedbacks.component.css:266-276`, `:105-108`, `:365-370`; `feedback-section.component.css:216-224` | The doc says the pattern is for testimonials (doc 690); glyph at 6–9rem, gold at opacity .15 (doc 693-703) | Testimonial cards use the Material `format_quote` icon. It is 4rem (3rem at ≤600) on /feedbacks and 3rem on the home page, coloured `rgba(201,165,92,.2)`, placed top-right and not rotated. On hover (/feedbacks) it rotates −5°, scales 1.1 and goes to α .4. | Looks intentional for the card context, but it contradicts the doc's stated scope. The colour literals equal `--gold-alpha-20` / `--gold-alpha-40` (HYGIENE). |
| 10.3 | HYGIENE | `about-me.component.css:67-89`, `:739-751`, `:779-791`, `:928-940` = `about-section.component.ts:264-286`, `:394-406`, `:418-430`, `:486-496` | One pattern (doc 693-714) | Verbatim duplicate: the base block is diff-identical and the responsive offsets match | The comment "matches about-section" (`about-me.component.css:67`) shows the two are kept in sync by hand. Candidate for a global class. |
| 10.4 | HYGIENE | `about-me.component.css:70`; `about-section.component.ts:267` (and doc 695) | Token `--font-heading` (`styles.css:8`) | Literal `'Cormorant Garamond', 'Georgia', serif` | `--font-heading` has **0** uses site-wide against 7 Cormorant literals. Adopting it drops the Georgia fallback unless the token is extended. |
| 10.5 | DOC-STALE | `about-me.component.css:743-751`, `:783-791`, `:932-940`; `about-section.component.ts:398-406`, `:422-430`, `:486-496` | Positions are given only as "Inside container" or "Outside (negative offset)" (doc 719-724) | Both users use identical offsets. Second step: open at top −1rem / left 1rem, close at bottom 2.5rem / right 1rem. ≥768: −1.5rem / 1.5rem and 3rem / 1.5rem. ≥1024: open at top .5rem / left −1rem, close at bottom .5rem / right −1rem. | Document the real offsets. The close mark is lifted 2.5–3rem to clear the CTA that follows it. |

---

## §4.11 Highlight Box (Callout)

**Spec summary.** A global `.highlight-box` (doc 735-740): padding `1rem 1.25rem`, `background: var(--gold-highlight-gradient)` (a 90° gold gradient at α .06/.10/.06, `styles.css:97-102`), radius .5rem, and `border-left: 3px solid gold`. The documented extensions are `.highlight-text` (italic, green) and `.block-note` (padding `.75rem 1rem`, `var(--gold-alpha-06)`) (doc 743-756). Used in about-me, contacts, documents and seo-section (doc 764).

**Implementations found.** The global class (`styles.css:728-733`) matches the spec exactly. It has 10 template uses:
- about-me: `about-me.component.html:57`, with `.highlight-text` (`about-me.component.css:149-154`, `:1025-1027`).
- contacts: `contacts.component.html:40`, with `.schedule-badge` (`contacts.component.css:104-109`, `:837-839`, `:917-920`).
- documents: `documents.component.html:105`, `:243`, `:287`, with `.document-caption` (`documents.component.css:302-321`, `:1080-1083`).
- seo-section: `seo-section.component.html:58`, `:103`, with `.block-note` (`seo-section.component.css:182-188`). This one matches the doc.
- Legal pages, plain `.highlight-box`, matching the spec: `public-offer.component.ts:58`, `:94` and `privacy-policy.component.ts:60`.

**Hand-rolled look-alikes**
- about-section `.highlight-text`: `about-section.component.ts:57`, `:356-369`.
- public-offer `.obligation-block` ×2 (`:103`, `:111`; CSS `:229-234`) and `.contact-info` (`:140`; CSS `:240-245`).
- privacy-policy `.contact-info` (`:118`; CSS `:203-208`).
- consultation `.form-footer`: `consultation.component.html:461`, `consultation.component.css:396-406`.
- instruction `.prerequisite-callout`: `instruction.component.html:56`, `instruction.component.css:202-221`.
- Never rendered: blog `.article-footer .blog-post-section` (`blog-post.component.css:245-259`, `:379-386`). No template uses `.article-footer`; the blog template only has `.article-footer-sections`.

**Related or excluded**
- Blog-content callouts documented in §4.16: `blockquote` / `.blog-quote` (`styles.css:343-370`, 122 uses in 60 of the 61 posts; `_template.blog.html` excluded), `.law-citation` (`:373-381`), `.footer-quote` (`:575-600`).
- Not documented anywhere: `aside` (`styles.css:551-557`, 3px green) and `.blog-warning` (`:560-572`, 4px gold-dark).
- Semantic warning, off-palette orange `#ff9800`: instruction `.step-warning` (`instruction.component.css:426-445`).
- Not callouts: court-case `.result-list li` (`court-case.component.css:318-329`, a white list card) and `.related-links li` (`:432-447`).

| # | Class | Where (file:line) | Spec (doc line) | Actual | Notes |
|---|---|---|---|---|---|
| 11.1 | BYPASS | `about-section.component.ts:356-369` (template `:57`) | `.highlight-box` with `.highlight-text` (doc 735-749) | A hand-rolled box without `.highlight-box` that re-declares the radius, border, background and padding | The same quote box on /about-me uses `highlight-box highlight-text` (`about-me.component.html:57`). `normalization-log.md:420` exempted it only from the radius-token pass. |
| 11.2 | VISUAL | `about-section.component.ts:358-364` | Padding `1rem 1.25rem` (doc 736); α .06/.10/.06 (doc 737 → `styles.css:97-102`) | α **.08/.12/.08** (a stronger tint) and **1.5rem** side padding | Looks accidental, probably a copy from before the class became global. The /about-me twin is lighter and tighter. |
| 11.3 | BYPASS | `public-offer.component.ts:229-234`, `:240-245`; `privacy-policy.component.ts:203-208` | `.highlight-box` (doc 735-740) | `.obligation-block` ×2 and `.contact-info` ×2. Padding, radius and border are identical; the background is a flat `var(--gold-alpha-06)` instead of the gradient | The same components already use `.highlight-box` 3 times. The visual difference is small (a flat 6% tint against the 6→10→6% gradient). This could be `.highlight-box` with a solid modifier using the `.block-note` background. |
| 11.4 | BYPASS | `consultation.component.css:396-406` (template `consultation.component.html:461`) | doc 736-737 | Padding **1.25rem** on all sides. Background `linear-gradient(135deg, gold-alpha-06, gold-alpha-10)`, a two-stop diagonal instead of the three-stop 90° token. Radius via `--card-border-radius-sm` (.5rem, matches). Border matches. | A near-identical hand-roll that looks accidental. |
| 11.5 | BYPASS | `instruction.component.css:202-209` (template `instruction.component.html:56`) | doc 736-739 | A flat `rgba(201,165,92,0.08)` background (there is no .08 token). Radius `0 .5rem .5rem 0`, so the left corners are square, as in the blockquote. `margin: 0 2rem`. Padding and border match. | It mixes the §4.11 and §4.16 recipes. Intent unverified. |
| 11.6 | BUG | `blog-post.component.css:245-259`, `:379-386` | — (a callout look-alike: compare doc 736-739) | Dead selectors. `.article-footer` and `.article-footer .blog-post-section` style a callout (4px border, .75rem radius, 135° gradient α .06→.02, 1.5rem padding), but no template in `src/` uses the class `article-footer`. `blog-post.component.html:60` uses `.article-footer-sections`. | Never renders. Delete it, or wire it up if a footer callout was intended. |
| 11.7 | VISUAL | `contacts.component.css:837-839` (≥1024), `:917-920` (≤479) | Padding `1rem 1.25rem` (doc 736) | `.schedule-badge` uses `1.15rem 1.5rem` on desktop and `.85rem 1rem` on small mobile | Contextual. The doc shows `.schedule-badge` only in its HTML example (doc 761). |
| 11.8 | VISUAL | `documents.component.css:307`, `:1080-1083` | Padding `1rem 1.25rem` (doc 736) | `.document-caption` uses padding `1rem` (`.75rem` at ≤479), a flex row with an icon, italic, body-sm | Contextual. An undocumented extension (see 11.11). |
| 11.9 | VISUAL | `about-me.component.css:1025-1027` | Padding `1rem 1.25rem` (doc 736) | `.highlight-text` uses `.85rem 1rem` at ≤479 | Contextual. It matches contacts' small-mobile override (`contacts.component.css:918`); if that is meant to apply site-wide, move it into the global class. |
| 11.10 | DOC-STALE | `public-offer.component.ts:58`, `:94`; `privacy-policy.component.ts:60` | "Used in: about-me, contacts, documents, seo-section" (doc 764) | Also used on /public-offer (2) and /privacy-policy (1) | — |
| 11.11 | DOC-STALE | `documents.component.css:302-321`; `about-me.component.css:150-153` | The doc lists only the `.highlight-text` and `.block-note` extensions (doc 743-756) | `.document-caption` (3 uses) is not documented. `.highlight-text` also sets `text-align:left !important` and `position:relative`, which gives a left-aligned box inside centred text on mobile. | — |
| 11.12 | HYGIENE | `src/styles.css:731` (and doc 738); also `public-offer.component.ts:232`, `:243`; `privacy-policy.component.ts:206` | Tokens `--border-radius-md` / `--card-border-radius-sm` = .5rem | Literal `0.5rem` | Low priority. |
| 11.13 | HYGIENE | `public-offer.component.ts:240-257` = `privacy-policy.component.ts:203-220` | — | `.contact-info` and its 3 `p` rules are duplicated verbatim (diff-checked) | Resolve together with 11.3. |

---

## §4.12 Navigation Links with Divider

**Spec summary.** `.cta-nav` (doc 773-778): flex, centred, `gap:1.5rem`. `.nav-divider` (doc 780-789): 1px × 1.5rem with a vertical gradient from transparent to gold to transparent. `.nav-link` (doc 791-807): inline-flex, `gap:.5rem`, no underline, green, weight 600. Its icon is gold, transitions `transform .3s var(--ease-bounce)`, and moves `translateX(4px)` on hover. Used in contacts and documents (doc 810). There is no global class.

**Implementations found.** Both canonical uses wrap the row in `<nav aria-label>` and mark the divider `aria-hidden`.
- contacts: `contacts.component.html:189-199` → `contacts.component.css:667-717`, with overrides at `:870-876` (≥1024) and `:1012-1014` (≤479).
- documents: `documents.component.html:329-339` → `documents.component.css:824-874`, with overrides at `:1004-1010` and `:1165-1167`.

**Look-alikes**
- (a) Same class names, different design: blog-links, `blog-links.component.ts:42-65` → `:367-433`, `:498-522`, `:569-586`. It renders on every blog post (`blog-post.component.html:66`).
- (b) A dark-section pipe-glyph variant made of `.cta-links`, `<span class="link-divider">` and `.cta-link`, in 6 components:
  - about-me: `about-me.component.html:366-377`, `about-me.component.css:691-728`, `:1076-1078`
  - services: `services.component.html:213-223`, `services.component.css:620-657`, `:807-809`
  - instruction: `instruction.component.html:231-241`, `instruction.component.css:655-692`
  - court-case: `court-case.component.html:205-215`, `court-case.component.css:548-585`, `:706-708`
  - need-help-section: `need-help-section.component.html:33-43`, `need-help-section.component.css:167-204`, `:285-289`, `:367-373`
  - faq: `faq.component.html:76-91`, `faq.component.css:260-297`, `:390-397`
  - All six sit on dark green sections.
- (c) navbar `.separator`: `navbar.component.ts:21`, `:119-123`, `:230-232`.
- Excluded:
  - Footer legal links (`footer.component.html:194-200`, `footer.component.css:550-569`). This is a utility row that also uses an un-hidden pipe glyph.
  - Breadcrumb separators (`breadcrumb.component.ts:52`).
  - intro `.trust-divider`, whose template is commented out (`intro-section.component.html:63-73`).

| # | Class | Where (file:line) | Spec (doc line) | Actual | Notes |
|---|---|---|---|---|---|
| 12.1 | DOC-STALE | `contacts.component.css:686-717`, `:870-876`, `:1012-1014`; `documents.component.css:843-874`, `:1004-1010`, `:1165-1167` | `.nav-link` is mixed-case 600 text with no hover colour (doc 791-807); gap 1.5rem (doc 777) | Both implementations are identical and add the following. A `.nav-label` child: **uppercase**, `letter-spacing:.02em`, .9rem (1rem at ≥1024, .8rem at ≤479), with the weight on the label. On the link: `padding:.5rem 0`, `transition: all .25s ease`, hover colour `var(--color-gold-accent)`. Icon 1.1rem. `.cta-nav` gap **2.5rem** at ≥1024. | Update the doc. Also add the HTML structure: `<nav aria-label>`, `.nav-label`, and the `aria-hidden` divider. |
| 12.2 | HYGIENE | `contacts.component.css:667-717` = `documents.component.css:824-874` (overrides identical too) | One pattern (doc 772-807) | A 51-line block duplicated verbatim (diff-checked) | Candidate for a global class. Mind the name collision in 12.4. |
| 12.3 | BYPASS | `about-me.component.css:691-728`; `services.component.css:620-657`; `instruction.component.css:655-692`; `court-case.component.css:548-585`; `need-help-section.component.css:167-204`; `faq.component.css:260-297` | Divider is 1px × 1.5rem with a gold gradient (doc 780-789); gap 1.5rem (doc 777); links green, 600, gap .5rem (doc 794-797) | The divider is a text pipe glyph (U+007C) in `rgba(255,255,255,.3)` at weight 300. Row gap 1rem with `flex-wrap`. Links are gold-light, .95rem, gap .35rem, with a 1rem icon; on hover they turn gold and the icon moves `translateX(4px)`. | A de-facto dark variant on **~41 pages** (about-me, services, faq, home, 8 instructions, 29 court cases), against **2** pages for the canonical one. It is consistent across all 6 components and undocumented. **A11y:** the 7 pipe spans lack `aria-hidden="true"`, so screen readers announce "vertical line". services and faq hide the divider at ≤479 (`services.component.css:807-809`, `faq.component.css:390-397`); the other 4 keep it, which can leave an orphaned pipe when the links wrap (not render-verified). |
| 12.4 | VISUAL | `blog-links.component.ts:367-433`, `:498-522`, `:569-586` | doc 773-807 | Same class names, different design. Column layout with a "Дивіться також:" label and a top border. Four links with **leading** icons. The divider is **1rem** tall with an `rgba(201,165,92,.4)` peak, and is hidden at ≤479. Links are .8rem at weight **500** with a tinted pill hover in gold-accent. Icon opacity .7. No `translateX`. | Intentional (a compact "see also" nav on all 61 blog posts). Because the names are shared, a globalized `.nav-link` / `.nav-divider` would leak in wherever this component does not override them (for example, the hover `translateX`). prev-next-navigator has the same risk with `.nav-link` / `.nav-label` (`prev-next-navigator.component.ts:68-80`, `:165-171`). |
| 12.5 | HYGIENE | `about-me.component.css:718`; `services.component.css:647`; `instruction.component.css:682`; `court-case.component.css:575`; `need-help-section.component.css:194`; `faq.component.css:287` | `var(--ease-bounce)` (doc 801; `styles.css:128`) | Literal `cubic-bezier(0.34, 1.56, 0.64, 1)` | The 38-line block appears 6 times and is otherwise identical. The only difference: services, court-case, need-help-section and faq use the literal `.95rem` (`services.component.css:637`, `court-case.component.css:565`, `need-help-section.component.css:184`, `faq.component.css:277`) where about-me and instruction use `var(--font-size-body)`. |
| 12.6 | HYGIENE | `blog-links.component.ts:373`, `:399`, `:426` | Tokens `--gold-alpha-15`, `--gold-alpha-40`, `--gold-alpha-10` | Literals `rgba(201,165,92,.15)`, `.4` and `.1` | — |
| 12.7 | BUG | `navbar.component.ts:21`, `:119-123`, `:230-232` | A divider needs a box: width, height and background (doc 780-789) | `.separator` is an empty `<span aria-hidden>` styled only with `color`, `font-size` and `user-select`. It has no content, size or background, and `.navbar` has `gap:0` (`:77`), so it renders nothing and the rule is dead. The span is also a direct child of `<ul>`, which is an invalid content model. | Unverified whether the visible divider was removed on purpose. Either delete it or give it the `.nav-divider` treatment inside an `<li role="none">`. |

---

## Totals

| Class | 4.7 | 4.8 | 4.9 | 4.10 | 4.11 | 4.12 | Total |
|---|---|---|---|---|---|---|---|
| VISUAL | 4 | 2 | 0 | 1 | 4 | 1 | **12** |
| HYGIENE | 3 | 2 | 1 | 2 | 2 | 3 | **13** |
| BYPASS | 1 | 5 | 1 | 1 | 4 | 1 | **13** |
| DOC-STALE | 1 | 1 | 1 | 1 | 2 | 1 | **7** |
| BUG | 0 | 0 | 0 | 0 | 1 | 1 | **2** |

## Decisions needed

1. **Nav links with divider (§4.12).** There are three competing variants:
   - (A) the canonical gradient `.nav-divider` in `.cta-nav`, on light sections: 2 components, 2 pages;
   - (B) the dark-section pipe glyph `.cta-links` / `.link-divider` / `.cta-link`: 6 components, about 41 pages;
   - (C) the compact blog-links row: 1 component, 61 blog pages.

   Choose the canon, decide whether B becomes the documented dark variant (ideally with a gradient divider and `aria-hidden`), and pick a label case: the code uses uppercase, the doc uses sentence case.
2. **Frosted surface (§4.8).** There are five recipes:
   - α .70, blur 10, soft shadow (the spec): 3 sites (about-me, contacts, about-section without blur), 3 pages;
   - α .85, blur 12, article shadow: 2 sites, 69 pages (61 posts and 8 instructions);
   - α .80, blur 10, `--card-box-shadow`: 2 legal pages;
   - α .85, blur 10, `--card-box-shadow`: documents;
   - α .85–.90, blur 12, consultation shadow: 2 sites.

   Pick one or two tiers (for example "wrapper" and "article surface") and turn alpha, blur and shadow into tokens.
3. **Gold left-border callouts (§4.11 against §4.16).** There are two families:
   - (A) 3px border, .5rem radius on all corners, 90° symmetric gradient: `.highlight-box` with 10 uses, plus 7 near-copies (legal ×4, consultation, instruction, about-section);
   - (B) 4px border, radius on the right corners only, 135° fading gradient: blog blockquotes (122 uses in 60 of the 61 posts).
   - The instruction `.prerequisite-callout` is a hybrid: a 3px border with right-only radius.

   Decide the border width, radius and gradient per role (quote, note or solid), and fold the hand-rolled copies into modifiers.
4. **Quote marks (§4.10).** Two treatments compete:
   - (A) the Cormorant glyph `.quote-mark`: 2 components (about-me, about-section);
   - (B) the Material `format_quote` icon: 2 components (/feedbacks and the home page testimonial carousel).

   The doc assigns A to testimonials, but the code uses B there. Also pick the 7rem breakpoint: 480 (doc and about-section) or 640 (about-me).
5. **Photo frame (§4.7).** The three users each have a different offset ramp: about-me 10/14/18, contacts 10/12/14, intro 10/12/14 at 768. Two img shadows compete: `0 10px 40px` α .2 (2 users) and `40px 20px 40px` α .1 (1 user). Pick a canonical ramp and shadow and move the img rule into the global class. Also decide whether the about-section corner-accent photo is an official §4.7 variant.

## Incidental findings (outside the six patterns)

- **BUG:** `court-case.component.css:454` uses `font-weight: var(--weight-medium)`, which is undefined (only `--weight-semibold` and `--weight-bold` exist, `styles.css:9-10`) and has no fallback. The declaration is invalid at computed-value time and the weight falls back to the inherited value. This was the only undefined custom property in an all-source scan.
- `--font-heading` (`styles.css:8`) is defined but never used.
- The footer legal-links pipe glyph (`footer.component.html:197`) also lacks `aria-hidden`.
