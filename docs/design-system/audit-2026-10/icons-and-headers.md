# Design-system audit A2: Icon Wrappers (4.4), Section Headers (4.5), Page Header (4.6)

> Appendix to [`../audit-report-2026-10.md`](../audit-report-2026-10.md). Rows were derived from the CSS with file:line evidence; the findings re-checked in a browser are listed in the main report (§7).

Spec: `docs/DESIGN_SYSTEM.md` (DS) sections 4.4 (lines 328-430), 4.5 (431-468), 4.6 (469-570), and section 9 "Creating a New Section" (1702-1760). Cross-references: DS 151/173 (intro type), 930-934 (4.14 action icon), 1478-1500 (5.3 dark sections).
Code: `src/styles.css`, all 25 component `.css` files, and the inline `styles:` of all 24 `.ts` components. Templates were checked for usage. Paths below are relative to `src/` unless they start with `docs/`. No files in the repo were changed and no build was run.

Classes: VISUAL = renders differently from spec; HYGIENE = same render, but a token is bypassed or code is duplicated; BYPASS = a hand-rolled variant instead of the shared pattern; DOC-STALE = code is consistent but the doc is outdated or wrong; BUG = broken reference, invalid value, or dead rule.

**Totals: 56 rows. VISUAL 27, HYGIENE 12, BYPASS 8, DOC-STALE 7, BUG 2.**

| Pattern | VISUAL | HYGIENE | BYPASS | DOC-STALE | BUG |
|---|---|---|---|---|---|
| 4.4 Icon wrappers (21 rows) | 9 | 5 | 2 | 5 | 0 |
| 4.5 Section headers (22 rows) | 12 | 5 | 5 | 0 | 0 |
| 4.6 Page header (13 rows) | 6 | 2 | 1 | 2 | 2 |

---

## 4.4 Icon Wrappers

### Spec summary
- Sizes (DS 334-338): `--icon-wrapper-sm` 2.25rem with 50% radius; `--icon-wrapper-md` 2.5rem with 0.5rem radius; `--icon-wrapper-lg` 4rem with 50% radius. No responsive steps are defined. The tokens match `styles.css:123-125`.
- Variant 1, Green Gradient, for light backgrounds (DS 340-365): md size, `var(--green-gradient)`, radius 0.5rem or 50%, shadow `0 4px 12px rgba(0,39,6,.2), inset 0 1px 0 rgba(201,165,92,.1)`, transition `transform .3s var(--ease-bounce)`, gold glyph.
- Variant 2, Translucent Gold, for dark backgrounds and action cards (DS 367-387, 421-423): 3rem circle, `rgba(201,165,92,.15)` background, `2px solid var(--color-gold)` border, gold glyph.
- Variant 3, Gold Gradient, for section header badges (DS 389-414, 422): lg circle, gold to gold-dark gradient, shadow `0 4px 20px gold .4, 0 0 40px gold .2`, green glyph.
- Shape rule (DS 425-427): a rounded square for service and block icons; a circle for qualifications, badges, avatars and headers.
- The doc presents classes named `.icon-wrapper-green`, `.icon-wrapper-gold-translucent` and `.icon-wrapper-gold`.

### Implementations found
- **Variant 1, rounded:**
  - about-me.component.css:373 `.service-icon`
  - services.component.css:109 `.service-icon-wrapper`
  - main/sections/services-section.component.css:109 `.service-icon-wrapper`
  - faq.component.css:120 `.related-card-icon`
  - main/sections/seo-section.component.css:134 `.block-icon`
  - blog/components/blog-list.component.css:166 `.blog-icon-wrapper`
- **Variant 1, circular:**
  - about-me.component.css:252 `.qualification-icon`
  - documents.component.css:202 `.document-icon`
  - services.component.css:351 `.additional-service-icon` (sm, then md at 768+)
  - why-me-section.component.ts:156 `.check-wrapper` (sm)
  - related-articles.component.ts:179 `.card-icon`
  - prev-next-navigator.component.ts:135 `.nav-icon`
  - blog-faq.component.ts:76 `.header-icon`
  - related-articles.component.ts:84 `.header-icon`
  - blog-links.component.ts:231 `.cta-icon`
  - consultation.component.css:76 `.legend-number` (a number, not an icon)
- **Green large badges and avatars:**
  - styles.css:853 `.page-header-badge`
  - documents-section.component.ts:68 `.badge-icon`
  - services.component.css:492 `.pricing-icon-wrapper`
  - feedbacks.component.css:145 `.reviewer-avatar`
  - feedback-section.component.css:164 `.reviewer-avatar`
  - intro-section.component.css:110 `.intro-header-badge`
  - core/components/spinner/spinner.component.css:68 `.spinner-badge`
  - breadcrumb badges: blog-post.component.css:49, instruction.component.css:43, court-case.component.css:26
- **Variant 2, 3rem with 2px border:**
  - `.format-icon-wrapper` at about-me.component.css:582, contacts.component.css:427, services.component.css:410 and services-section.component.css:194
  - contacts.component.css:198 `.primary-icon-wrap`
  - seo-section.component.css:207 `.cta-icon`
- **Variant 2, compact 2.25rem with 1px border, on dark chrome:**
  - header.component.ts:210 and :424
  - footer.component.css:204
  - drawer-content.component.css:99
  - about-me-dialog.component.ts:117
  - blog-iframe.component.ts:168
  - blog-links.component.ts:305 `.btn-icon`
  - styles.css:496 `.blog-cta-icon` (2.5rem; mirrors cta-button.component.ts:166)
- **Translucent gold on light backgrounds:**
  - blog-list.component.css:250 `.blog-arrow`
  - social-share.component.ts:228 `.item-icon`
- **Variant 3:**
  - court-cases-section.component.css:63 `.header-badge`
  - need-help-section.component.css:65 `.section-badge`
  - header.component.ts:252 `.phone-icon` (1.75rem pill icon)
- **Hand-rolled or other:**
  - pension-help-section.component.ts:180 `.problem-icon-wrapper`
  - instructions-list.component.css:61 `.card-icon`
  - instruction.component.css:390 `.step-number`
  - consultation.component.css:501 `.success-icon`
  - documents.component.css:107 `.registry-icon` (logo)
  - Semantic success pills, out of scope: court-cases-list.component.css:140, court-cases-section.component.css:185, instruction.component.css:257.

### Discrepancies

| # | Class | Where (file:line) | Spec (doc line) | Actual | Notes |
|---|---|---|---|---|---|
| I1 | DOC-STALE | No definition of `.icon-wrapper-green`, `.icon-wrapper-gold-translucent` or `.icon-wrapper-gold` exists in src (grep finds 0). | DS 345, 372, 394 present these as reusable classes. | About 40 wrappers are hand-rolled under about 30 different class names in about 25 files. | This is the root cause of rows I2-I8. Fix the doc, or add global classes to styles.css as was done for `.page-header-badge`. |
| I2 | HYGIENE | Literal `linear-gradient(135deg,var(--color-green) 0%,var(--color-green-dark) 100%)` in 17 wrappers: styles.css:860; about-me.component.css:380; faq.component.css:127; services.component.css:116, 358, 498; services-section.component.css:116; why-me-section.component.ts:163; documents-section.component.ts:74; blog-list.component.css:173; feedbacks.component.css:149; blog-faq.component.ts:82; related-articles.component.ts:90, 186; blog-links.component.ts:237; prev-next-navigator.component.ts:142; consultation.component.css:82. Hex form: spinner.component.css:74 (`#002706 0%, #003d0a 100%`). | DS 352: `background: var(--green-gradient)` | The literal is identical to the token in styles.css:92-96. | Only about-me.component.css:259, documents.component.css:209, seo-section.component.css:141, the 3 breadcrumb badges, feedback-section.component.css:168 and intro-section.component.css:116 use the token. |
| I3 | HYGIENE | Shadow and easing literals: about-me.component.css:261-266, 386-391; faq.component.css:133-138; services.component.css:122-127, 364-369, 504-506; services-section.component.css:118-123; why-me-section.component.ts:165-167; blog-list.component.css:180-181; blog-links.component.ts:243-245 | DS 52 says to use the alpha tokens instead of inline rgba(). DS 358 uses `var(--ease-bounce)`. | `rgba(0,39,6,.2)` equals `--green-alpha-20`; `rgba(201,165,92,.1)` equals `--gold-alpha-10`; `cubic-bezier(.34,1.56,.64,1)` equals `--ease-bounce`. | The DS 355-356 sample itself uses literals. documents.component.css:211-213 is the only fully tokenised copy. |
| I4 | HYGIENE | Size literals that equal tokens. 2.5rem (= md): blog-post.component.css:53; instruction.component.css:47; court-case.component.css:30; related-articles.component.ts:183, 277; prev-next-navigator.component.ts:139; blog-faq.component.ts:194; blog-list.component.css:296; contacts.component.css:928; seo-section.component.css:383. 40px (= md): instruction.component.css:394. 2.25rem (= sm): documents.component.css:1064; faq.component.css:371; blog-list.component.css:254, 372; blog-faq.component.ts:235; related-articles.component.ts:303, 335; blog-post.component.css:346; instruction.component.css:777; footer.component.css:208; header.component.ts:214, 428; drawer-content.component.css:103; about-me-dialog.component.ts:121; blog-iframe.component.ts:172; blog-links.component.ts:309. 4rem (= lg): feedbacks.component.css:146; intro-section.component.css:343; consultation.component.css:660. | DS 334-338: use `--icon-wrapper-sm/md/lg` | Hard-coded rem and px values | Renders the same, but a token change would not propagate. |
| I5 | HYGIENE | `.format-icon-wrapper` copied 4 times: about-me.component.css:582-600, contacts.component.css:427-445, services.component.css:410-428, services-section.component.css:194-213. The background literal `rgba(201,165,92,0.15)` is at about-me.component.css:590, services.component.css:418, services-section.component.css:203 and seo-section.component.css:214. | DS 372-386 | Identical blocks. contacts.component.css:435 uses `var(--gold-alpha-15)`; the other copies use the literal. | Candidate for a global class. |
| I6 | VISUAL | md wrappers grow or shrink off the 3-tier scale. 2.75rem at 768+: about-me.component.css:810, 826; documents.component.css:932; services.component.css:683; services-section.component.css:244. 3rem at 1024+: services.component.css:743; services-section.component.css:277; pension-help-section.component.ts:295. 3rem at 640+: faq.component.css:316. 2.75rem at 1024+: seo-section.component.css:329. 2.25rem below 480px: documents.component.css:1064; faq.component.css:371. | DS 337: md is a fixed 2.5rem; no responsive scale is documented. | 2.5 → 2.75 → 3rem, at inconsistent breakpoints (640, 768, 1024) | Looks intentional but is undocumented and uneven. See decision D4. |
| I7 | VISUAL | Off-scale base sizes and radius in blog components: blog-list.component.css:170-178 (2.75rem, radius 0.625rem); blog-list.component.css:375 (radius 0.5rem at 400px and below); blog-faq.component.ts:80 (2.75rem); related-articles.component.ts:88 (3rem); blog-links.component.ts:235 (3rem) | DS 336-338 (2.25 / 2.5 / 4rem); DS 337 and 426 (0.5rem radius) | 2.75rem and 3rem bases. The blog-list radius changes from 0.625rem to 0.5rem inside one component. | Looks accidental. These files also use desktop-first `max-width` queries. |
| I8 | VISUAL | Variant 1 shadow drift. Lighter: seo-section.component.css:143-145 and why-me-section.component.ts:165-167 (`0 2px 8px`). None: related-articles.component.ts:84-104 and 179-200; blog-faq.component.ts:76-96; prev-next-navigator.component.ts:135-156. | DS 354-356: `0 4px 12px rgba(0,39,6,.2)` plus a gold inset | Flatter or no shadow | Looks accidental. The blog-related components were built outside the pattern. |
| I9 | DOC-STALE | Gold large badges sit only on dark sections: court-cases-section.component.css:69-73 and need-help-section.component.css:71. Green large badges sit on light sections: styles.css:860 (12 page headers), documents-section.component.ts:74, services.component.css:498. | DS 389-391 and 422 say section header badges use the Gold Gradient. DS 494 says the page header badge uses the green gradient. | In code, badge colour follows the background: gold on dark, green on light. | The doc contradicts itself. Code is consistent with the "by background" rule. See D2. |
| I10 | VISUAL | Three different shadows on green large badges: styles.css:866-870 (2px gold-alpha-40 border, gold glow); documents-section.component.ts:77-80 (green-only 3-layer shadow, no border); services.component.css:504-506 (md shadow `0 4px 12px`, no border) | Not specified for green large badges (DS 494, 406-408 cover gold only) | Three treatments for the same element type | Looks accidental. |
| I11 | VISUAL | Gold badge deviations. court-cases-section.component.css:79 adds `inset 0 2px 0 rgba(255,255,255,.2)`; :323 is 4.5rem at 768+; :373 is 3.5rem below 480px. need-help-section.component.css:69-70 is a fixed 4.5rem; :74-77 has a stronger shadow (gold .5 / .25 plus a white inset); :78 runs `badge-pulse 3s infinite`. | DS 398-408: fixed lg (4rem) with a 2-layer shadow | 3.5 / 4 / 4.5rem scale (borrowed from DS 509-513) plus extra glow and an infinite pulse | Looks intentional (emphasis). The pulse has no reduced-motion guard. |
| I12 | DOC-STALE | contacts.component.css:205 `.primary-icon-wrap` uses `var(--gold-alpha-20)`. The format and CTA wrappers use 0.15. | DS 379 and 1497 use `rgba(201,165,92,0.15)`. DS 932 (4.14) uses `var(--gold-alpha-20)`. | Each copy follows a different doc section. | The doc contradicts itself about the action-card icon background. |
| I13 | DOC-STALE | Compact translucent-gold circles on dark chrome: header.component.ts:210-220 and 424-434; footer.component.css:204-214; drawer-content.component.css:99-109; about-me-dialog.component.ts:117-133; blog-iframe.component.ts:168-185 | DS 367-387 define only the 3rem circle with a `2px solid gold` border. | 2.25rem with a 1px alpha border, used about 6 times. Background alpha 0.1 or 0.15; border alpha 0.25, 0.3 or 0.4. | Consistent size and shape, but undocumented. The alphas drift. See D6. |
| I14 | BYPASS | pension-help-section.component.ts:180-202 (md circle, gradient `rgba(0,39,6,.06→.03)`, 1px `rgba(0,39,6,.1)` border, green glyph at .85 opacity). instructions-list.component.css:61-77 (48px, 12px radius, flat `rgba(0,39,6,.05)`, green glyph, px units). | DS 340-365 and 420: cards on light backgrounds use the green gradient with a gold glyph. | A muted green-tint variant not in the doc. The instructions list is also off-scale (3rem) and off-radius (0.75rem). | Looks intentional (de-emphasised). Document it or convert it. See D7. |
| I15 | BYPASS | blog-links.component.ts:266-352 hand-rolls `.cta-button`; its `.btn-icon` at :305-322 is 2.25rem with a gold .2 background and a .3 border. | DS 4.1 / 241: the appCtaButton icon wrapper is a 2.5rem circle (cta-button.component.ts:33-34, 166-174: .15 / .25). | A smaller wrapper with different alphas | styles.css:496-511 `.blog-cta-icon` deliberately mirrors appCtaButton for innerHTML content. That copy is acceptable. |
| I16 | VISUAL | Translucent-gold sizes change with breakpoints: seo-section.component.css:340-350 (3.5rem at 1024+) and 382-392 (2.5rem below 480px); contacts.component.css:927-937 (2.5rem below 480px) | DS 376-378: a fixed 3rem | 2.5 / 3 / 3.5rem | Looks intentional. |
| I17 | VISUAL | Two variants of the reviewer avatar. feedbacks.component.css:145-178: 4rem, shadow `0 6px 20px rgba(0,39,6,.25)`, 2px ring in `::after`, 3.5rem at 600px and below. feedback-section.component.css:164-183: 3.5rem, `0 2px 8px` plus an inset, 3rem at 800px and below. | DS 427: avatars are circular (no size given) | Different sizes, shadows and breakpoints for the same component concept | Looks accidental. |
| I18 | VISUAL | documents.component.css:107-123 `.registry-icon`: a white 3.5rem circle holding a logo (2.75rem below 480px, :1032) | DS 423 and 930-934: action cards use the 3rem translucent-gold variant | White background, 3.5rem | Intentional; the logo needs a white background. |
| I19 | VISUAL | instruction.component.css:390-403 `.step-number`: 40px, solid `--color-gold`, white digit. consultation.component.css:76-92 `.legend-number`: 1.75rem, green gradient, gold digit. | No numbered marker in the doc. The nearest is the DS 340-365 Variant 1 colours. | Two numbered-circle styles | White on #c9a55c has a contrast of about 2.3:1, which fails WCAG AA for 16px bold text. |
| I20 | HYGIENE | consultation.component.css:508 and 532 `.success-icon` | DS 47-48: `--color-success` and `--color-success-bg` | `linear-gradient(135deg,#1a5c1a 0%,#0d3d0d 100%)` and `#4ade80` hard-coded, both equal to the tokens | Also 5rem (off-scale; intentional hero icon). |
| I21 | DOC-STALE | md with 0.5rem radius: about-me.component.css:385, faq.component.css:132, services.component.css:121, services-section.component.css:117, seo-section.component.css:142. md with 50% radius: documents.component.css:210, about-me.component.css:260, related-articles.component.ts:191, prev-next-navigator.component.ts:147, pension-help-section.component.ts:192, services.component.css:363 (768+). | The DS 337 table gives md a 0.5rem radius. The DS 425-427 shape rule allows a circle. | Both radii are used, mostly following the shape rule. | Fix the table, for example "md: 0.5rem or 50% by context". |

---

## 4.5 Section Headers

### Spec summary
- DS 436-458, repeated in section 9 (DS 1737-1759):
  - `.section-header`: centered, `margin-bottom: 2.5rem`.
  - h2: `margin: 0`, `display: inline-block`, `padding-bottom: 1.25rem`.
  - `::after`: centered, `width: var(--header-underline-width)`, 3px tall, `var(--header-underline-gradient)`, `border-radius: 2px`.
- Tokens (DS 461-465): 80px for light sections, 100px for dark sections, and the fading-gold gradient. These match styles.css:42-49.
- Intro paragraphs: `--section-intro-font-size` is 1.1rem, and 1.2rem at 768+ (DS 151; styles.css:51 and 978). Line-height 1.6 (DS 173).
- No intro element or its placement is defined in 4.5 or section 9.
- Dark sections use gold headings (DS 1479-1481).

### Implementations found
- **Template usages of `class="section-header"` (23):**
  - about-me.component.html:45, 99, 198, 311, 347
  - documents.component.html:23, 119, 184
  - faq.component.html:29, 56
  - services.component.html:20, 102, 149, 177, 188
  - instruction.component.html:212
  - blog-preview-section.component.html:3
  - court-cases-section.component.html:5
  - feedback-section.component.html:3
  - seo-section.component.html:3
  - services-section.component.html:3
  - why-me-section.component.ts:10
  - pension-help-section.component.ts:10
- **CSS copies of the pattern (11):**
  - services.component.css:14
  - faq.component.css:40
  - about-me.component.css:160
  - documents.component.css:24
  - services-section.component.css:22
  - seo-section.component.css:22
  - blog-preview-section.component.css:22
  - feedback-section.component.css:22
  - why-me-section.component.ts:97 (adds h2 `max-width: 600px`)
  - instruction.component.css:620
  - court-cases-section.component.css:55 / 89
- **Dark overrides (gold, 100px):**
  - faq.component.css:237
  - about-me.component.css:668
  - services.component.css:590
- **Underline look-alikes:**
  - about-me.component.css:92 / 120
  - contacts.component.css:80 `.contact-header`
  - about-section.component.ts:288 `.about-header`
  - need-help-section.component.css:104
  - pension-help-section.component.ts:119 `.header-accent` div
- **Section headings without the pattern:**
  - documents-section.component.ts:90
  - Format banners: about-me.component.css:603, contacts.component.css:451, services.component.css:431, services-section.component.css:216. These are dark compact banners, out of 4.5 scope.
  - CTA frame h2: documents.component.css:798, contacts.component.css:641
  - Legal h2: privacy-policy.component.ts:169, public-offer.component.ts:183
  - instructions-list.component.css:11
  - Detail-page icon headings: court-case.component.css:251, 358, 409, 492; instruction.component.css:238, 473, 524; blog-faq.component.ts:67; related-articles.component.ts:75
- **Intro paragraphs:**
  - styles.css:906 `.page-intro`
  - services.component.css:271
  - documents.component.css:49
  - blog-preview-section.component.css:45
  - feedback-section.component.css:45
  - court-cases-section.component.css:110
  - pension-help-section.component.ts:139
  - intro-section.component.css:171
  - need-help-section.component.css:134
  - faq.component.css:246 and services.component.css:599 `.final-cta-intro`
  - documents-section.component.ts:97
  - seo-section.component.css:96 (long-form SEO text)

### Discrepancies

| # | Class | Where (file:line) | Spec (doc line) | Actual | Notes |
|---|---|---|---|---|---|
| S1 | HYGIENE | No global `.section-header`; grep finds none in styles.css. The underline block is copied 17 times: 11 `.section-header` copies (listed above), 5 look-alikes (about-me.component.css:105, contacts.component.css:90, about-section.component.ts:320, need-help-section.component.css:113, intro-section.component.css:143) and the global styles.css:894. pension-help adds an 18th as a div. | DS 436-458. DS 1737-1759 tells authors to paste the block into each component. | 23 template usages served by about 17 copies of the same 9-line `::after` | instruction.component.css:620-639 also restructures it, moving margin-bottom 2.5rem onto the h2. Recommend a global class next to `.page-header`. |
| S2 | VISUAL | documents.component.css:26 (1.5rem) and :924 (2rem at 768+) | DS 438: `margin-bottom: 2.5rem` | 1.5rem, then 2rem at 768+, on the 3 /documents headers | Looks accidental. The following intro carries the spacing instead. |
| S3 | VISUAL | blog-preview-section.component.css:27 and feedback-section.component.css:27 (h2 `margin: 0 0 1.5rem`); court-cases-section.component.css:90 (`0 0 1.25rem`). The intro is nested inside `.section-header` (blog-preview :45-52, feedback :45-52, court-cases :110-117). | DS 442: h2 `margin: 0`. The intro is not in the spec. | Intro placed inside the header, with a gap of 1.5rem or 1.25rem under the underline | Looks intentional. Competes with S4 and S5. See D3. |
| S4 | VISUAL | services.component.css:271-278 `.section-intro` | DS 151 and 173. Other intros use `--text-color-primary` at weight 500 (blog-preview-section.component.css:50-51). | `margin: -1.5rem auto 2.5rem` (pulls up to a 1rem gap), `color: var(--text-color-secondary)`, weight 400 | The only grey intro. Looks accidental. |
| S5 | VISUAL | documents.component.css:51-55 (`font-size: var(--font-size-body-lg)`, `line-height: 1.7`, max-width 800px), :927-929, :1022-1025 (`--font-size-body` below 480px); documents-section.component.ts:99 (body-lg) | DS 151: `--section-intro-font-size` is 1.1rem, then 1.2rem at 768+. DS 173: 1.6. | 1.05rem, then 1.15rem at 768, then 1.2rem at 1024, and 0.95rem below 480px. Line-height 1.7. | Renders smaller on mobile and tablet. Looks accidental. Covers 4 intros. |
| S6 | VISUAL | Line-height 1.7: documents.component.css:52 and need-help-section.component.css:137. Line-height 1.65: styles.css:910, faq.component.css:249, services.component.css:602. | DS 173: intro paragraphs use 1.6 | Intro line-heights are 1.6 (7 places), 1.65 (3) and 1.7 (2). | Minor drift. |
| S7 | VISUAL | faq.component.css:248 and services.component.css:601 `.final-cta-intro { font-size: 1.1rem }`; :386-388 and :803-805 set 1rem below 480px | DS 151: 1.1rem, then 1.2rem at 768+ | A fixed 1.1rem (no tablet step) and 1rem on small phones. Duplicated in 2 files. | 1.1rem vs 1.2rem on tablet and desktop. Looks accidental. |
| S8 | VISUAL | pension-help-section.component.ts:111-112 (h2 1.5rem, line-height 1.35; 1.75rem at 768+, :255); need-help-section.component.css:107 (h2 1.75rem literal); seo-section.component.css:362 and court-cases-section.component.css:384 (1.4rem below 480px) | DS 149: `--font-size-h2` is 1.75rem, or 1.5rem below 480px. DS 171: headings use 1.3. | 1.5rem at 480-767px (pension-help); 1.75rem on phones (need-help stays large); 1.4rem on phones (seo, court-cases) | Mixed. The need-help result looks accidental. |
| S9 | HYGIENE | blog-preview-section.component.css:267-269 and feedback-section.component.css:377-379: h2 `font-size: 1.5rem` below 480px | DS 149 (the token is already 1.5rem below 480px; styles.css:1002) | A redundant literal override | Renders the same. |
| S10 | VISUAL | margin-bottom 2rem below 480px: seo-section.component.css:359, blog-preview-section.component.css:265, feedback-section.component.css:375. Dark header: court-cases-section.component.css:60 (3rem), :319 (3.5rem at 768+), :369 (2.5rem below 480px). | DS 438: a fixed 2.5rem | Tighter on mobile in 3 sections; larger in the dark section with a badge | Looks intentional, but uneven. |
| S11 | BYPASS | pension-help-section.component.ts:10-13 (template), :109-125 | DS 441-458: the underline is the h2 `::after` with `padding-bottom: 1.25rem` | A separate `<div class="header-accent">` (80px, 3px, gradient) under an h2 with `margin: 0 0 1.25rem` and max-width 700px | Renders close to the spec but is a structural fork. |
| S12 | BYPASS | documents-section.component.ts:13-17, :90-95, :106-109 | DS 433: a centered heading with a gold underline | An h2 with no underline (1.5rem, then 1.65rem at 768+) under a large badge | The only light home section without the underline. Looks intentional (compact band). |
| S13 | VISUAL | Editorial header: about-section.component.ts:288-331 (eyebrow `.section-label` :293-309; Cormorant 2.25 / 2.5 / 2.75rem; `padding-bottom: 1rem`; underline left-aligned at 1024+, :458-465). Copied at about-me.component.css:120-129, 757-759, 797-799, 912-914, 990-992, 1021-1023. | DS 441-446: inherits h2 (1.75rem, Lora), padding-bottom 1.25rem, centered | A larger serif-display heading, left-aligned on desktop. The two copies drift: about-me adds 2.35rem at 640+ and 2.85rem at 1280+. | Intentional. On /about-me this h2 (2.25-2.85rem) is at least as large as the page h1 (2.25rem; 1.75rem below 480px, styles.css:883 and 1001), so the heading hierarchy is inverted. See D8. |
| S14 | HYGIENE | `font-family: 'Cormorant Garamond'` literal at about-section.component.ts:313, about-me.component.css:124, documents.component.css:800, contacts.component.css:643 | styles.css:8 defines `--font-heading: 'Cormorant Garamond', serif` | The token is defined but never used; 0 references. | Renders the same. |
| S15 | HYGIENE | about-me.component.css:98-99, 103, 753-755, 793-795, 903, 986-988, 1017-1019 (`.content-wrapper .section-header h2` font-size, weight and padding) | — | Always overridden by `.about-me-section .section-header h2`, which has the same specificity and comes later (:124-127, 757-759, 797-799, 912-914, 990-992, 1021-1023). The only `.content-wrapper` is inside `.about-me-section` (about-me.component.html:23, 41). | Dead declarations. Removing them changes nothing. |
| S16 | VISUAL | contacts.component.css:80-102 `.contact-header` (h2 `padding-bottom: 0.75rem` :88; h2 margin not reset, so the global 1.5rem from styles.css:180 applies; container `margin-bottom: 0.5rem` :82; left-aligned underline at 1024+, :824-831) | DS 438, 442, 445 | Tighter underline gap, about 2rem below, left-aligned on desktop | Intentional (heading inside a card). |
| S17 | VISUAL | court-cases-section.component.css:91 and 95; need-help-section.component.css:106 and 109 (h2 white plus text-shadow) | DS 1480: headings in dark sections use `--color-gold`, as the gold h2s in faq.component.css:238, about-me.component.css:669, services.component.css:591 and instruction.component.css:621 do | White headings in 2 dark sections, gold in 4 | Two competing dark treatments. See D5. |
| S18 | BYPASS | privacy-policy.component.ts:169-176 and public-offer.component.ts:183-190 (also responsive :227-229/242-244 and :270-272/285-287) | DS 448-458: a gradient 80px `::after` | `border-bottom: 2px solid var(--color-gold)` on an inline-block, left-aligned h2 (1.25rem; 1.35rem at 768+; 1.1rem below 480px). Duplicated in both legal components. | Intentional document style, but a third underline style. |
| S19 | BYPASS | instructions-list.component.css:11-28 `.category-heading` | DS 433-458 | Icon plus a left-aligned h2 with a full-width `border-bottom: 2px solid rgba(201,165,92,.3)` (equal to `--gold-alpha-30`) and a 28px icon | A fourth heading style. |
| S20 | BYPASS | In-article icon headings: court-case.component.css:251-266, 358-373, 409-424, 492-509; instruction.component.css:473-484, 524-535; blog-faq.component.ts:67-104; related-articles.component.ts:75-120 | No in-article heading pattern in the doc (4.5 is centered and underlined) | Left-aligned icon plus h2 with no underline. Icon colour is gold (court-case :264, :371) or green (:422, :506). Sizes range from 1.05 to 1.4rem. The blog footers use a circular icon plus a 1px border. | Used on 98 detail routes. See D9. |
| S21 | VISUAL | instruction.component.css:528 (`.footer-section h2` is `--font-size-h3`, 1.375rem) and :713 (1.25rem at 600px and above) | DS 149-150 scale headings up with width | The heading shrinks on larger screens. The court-case equivalents grow (court-case.component.css:657, 676, 688). | Looks accidental. |
| S22 | HYGIENE | about-me.component.html:100 `[style.width]="'99%'"`; services.component.css:18-20 `.main-services-title { width: 99% }` | DS 444: `display: inline-block` | A one-off width hack on 2 section h2s | Visually identical, since text and underline stay centered. The intent is unverified. |

---

## 4.6 Page Header Pattern (Signature)

### Spec summary
- Structure (DS 474-487): `section.page-bg-pattern > .page-content > header.page-header`, containing `.page-header-badge` with a mat-icon, an h1, and an optional `p.page-intro`.
- Background (DS 499-504): the SVG pattern plus a cream gradient.
- Badge (DS 494, 509-513): a green-gradient circle with a gold icon. Sizes are 3.5rem below 480px, 4rem by default and 4.5rem at 768+; icons are 1.75, 2 and 2.25rem.
- H1 (DS 495, 540): centered, with a gold `::after` underline.
- Animations (DS 519-529): badge 0.8s bounce; h1 0.7s with a 0.3s delay; intro 0.6s with a 0.5s delay; secondary intro with a 0.6s delay.
- Container uses `--section-max-width` (DS 541).
- `.page-intro.secondary` (DS 552-567): `--text-color-secondary`, 1rem, 0.6s delay.
- Not for the homepage (DS 538).
- Global implementation: styles.css:744-961.

### Implementations found
- **Using the pattern (12 routes):**
  - about-me.component.html:2-20
  - services.component.html:2-16
  - documents.component.html:2-19
  - blog-list.component.html:1-13
  - court-cases-list.component.html:1-22
  - instructions-list.component.html:1-15
  - faq.component.html:2-17
  - feedbacks.component.html:1-13
  - consultation.component.html:1-17
  - contacts.component.html:2-16
  - privacy-policy.component.ts:9-16 (no intro)
  - public-offer.component.ts:9-17 (secondary intro only)
- **Not using it:**
  - Detail templates for 98 routes: blog-post.component.html:5-42 (60 posts), court-case.component.html:5-59 (30 cases), instruction.component.html:4-45 (8 instructions).
  - Homepage hero look-alike, excluded by DS 538: intro-section.component.html:6-25 with intro-section.component.css:110-178.
  - Spinner copy of the badge: spinner.component.css:68.
- **Values that match the spec:**
  - Badge sizes 3.5 / 4 / 4.5rem and icon sizes 1.75 / 2 / 2.25rem: styles.css:857-858, 876-878, 934-943, 946-956.
  - All four animation timings and easings: styles.css:872, 891, 914, 926.
  - The three keyframes: styles.css:749-791.
  - Background: styles.css:820-822.
  - The secondary modifier's colour, size and delay: styles.css:922-927.

### Discrepancies

| # | Class | Where (file:line) | Spec (doc line) | Actual | Notes |
|---|---|---|---|---|---|
| P1 | BUG | documents.component.html:15 `class="page-intro page-intro-secondary"` | DS 552-565: the modifier is `.secondary` (styles.css:922) | `.page-intro-secondary` is defined nowhere (grep finds only this template line). | Visible on /documents. The second paragraph renders as a primary intro: #444 instead of #666, 1.1 or 1.2rem instead of 1rem, 0.5s delay instead of 0.6s (no stagger), and a 1rem bottom margin. |
| P2 | BUG | styles.css:867-870 vs :763-765 and :872. Same issue at intro-section.component.css:119-123. | DS 494 (no shadow specified) | The badge declares a 3-layer shadow including `inset 0 1px 0 rgba(201,165,92,.2)`. `animation: badgeReveal … forwards` holds the 100% keyframe, which has 2 layers and no inset. | The inset highlight never renders on the 12 page headers or the homepage badge. This is a dead declaration. |
| P3 | VISUAL | court-case.component.css:35-38 (`.breadcrumb-badge` shadow `0 3px 12px rgba(201,165,92,.25), 0 1px 4px rgba(0,39,6,.15)` plus `badgeReveal forwards`) vs blog-post.component.css:49-68 and instruction.component.css:43-62 (no animation) | — | The court-case badge renders the larger page-header glow (`0 4px 24px .35 …`) and a pop-in. The blog and instruction badges keep their declared lighter shadow. Court-case also lacks the 2.25rem step below 480px (blog-post.component.css:345-354, instruction.component.css:776-785). | The three detail badges look different. Looks accidental. |
| P4 | BYPASS | blog-post.component.html:5-42, court-case.component.html:5-59, instruction.component.html:4-45, with CSS at blog-post.component.css:17-120, court-case.component.css:6-82 and instruction.component.css:10-78 | DS 471 and 537-542: "standalone content pages"; DS 540: "H1 must use the gold underline"; DS 515-524 reveal animations | A `.breadcrumb` with a 2.5rem `.breadcrumb-badge`, a centered h1 at h2 size (1.75rem), no underline, no title or intro reveal, and a meta card. Implemented three times. | Covers 98 of 110 content routes. See D1. |
| P5 | VISUAL | blog-post.component.css:115 (1.75rem literal), :319-321 (1.5rem at 768px and below), :364-367 (1.25rem below 480px); instruction.component.css:73 (`--font-size-h2`), :787-790 (1.25rem below 480px); court-case.component.css:6-8 (`--font-size-h2`), :616-621 (1.25rem only at 400px and below) | Detail headers are not in the doc. DS 149 gives the h2 scale. | At 480-768px: blog 1.5rem vs 1.75rem elsewhere. At 401-479px: court-case 1.5rem vs 1.25rem elsewhere. | Three copies drifting apart. Looks accidental. |
| P6 | DOC-STALE | styles.css:900 `.page-header h1::after { width: var(--header-underline-width-accent) }`; intro-section.component.css:149 (homepage h1) | DS 464: the 100px accent width is for "dark background sections". DS 495 and 540 say only "gold underline". | Every h1 underline is 100px on light backgrounds; every light h2 is 80px; every dark h2 is 100px. | Code consistently follows "h1 or dark = 100px". Update the DS 461-465 table. |
| P7 | DOC-STALE | styles.css:866 (badge border `2px solid rgba(201,165,92,.4)`); :818 (`.page-bg-pattern` `min-height: 100vh`); :825-840 (top gold separator `::before`); :850 and :931 (header margin-bottom 3rem, then 3.5rem); :884 (h1 margin 1.5rem); :907 (intro max-width 700px); :842-846 `.page-content` | DS 491-505 and 544-548 | Consistent global rules that the doc never mentions. `.page-content` is used in the DS 476 structure but missing from the DS 544-548 class list. | documents.component.css:7-9 and contacts.component.css:7-9 override `min-height` to auto. |
| P8 | HYGIENE | styles.css:860-864 (gradient equal to `--green-gradient`); :866 (equal to `--gold-alpha-40`); :868-870 (equal to `--gold-alpha-35`, `--green-alpha-20`, `--gold-alpha-20`); :872 (easing equal to `--ease-bounce`); :885 (1.3 equal to `--line-height-heading`); :832-839 (equal to `--gold-separator`) | DS 52 and 87-111: use the tokens | Literals inside the reference implementation | Renders the same. |
| P9 | VISUAL | styles.css:910 (`.page-intro` line-height 1.65); :958-960 (`.page-intro` 1rem below 480px) | DS 173: intro line-height 1.6. DS 151: 1.1rem below 480px. | 1.65; 1rem on small phones | Global, so all 12 pages. Minor and intentional-looking. Fix the doc or the code. |
| P10 | VISUAL | blog-post.component.css:10-12 and instruction.component.css:6-8 (950px via `--blog-container-max-width`); consultation.component.css:10-14 (900px, and it re-declares margin and padding); court-case.component.css:10-15 (its own `.court-case-page`, 900px, instead of `.page-content`) | DS 541: the container uses `--section-max-width` (1200px) | 950px or 900px on 4 templates | Intentional reading width, but undocumented. |
| P11 | HYGIENE | `.breadcrumb-badge` copied three times: blog-post.component.css:49-68, instruction.component.css:43-62, court-case.component.css:26-46 (2.5rem and the `rgba(201,165,92,.4)` border are literals). `.intro-header-badge` at intro-section.component.css:110-130 and `.spinner-badge` at spinner.component.css:68-81 (hex #002706/#003d0a) re-declare the same border and shadow as `.page-header-badge`. | DS 494 and 547: `.page-header-badge` is the one badge | Five near-copies of the badge | The homepage and spinner copies are allowed by DS 538, but the CSS is still duplicated. |
| P12 | VISUAL | public-offer.component.ts:16 `<p class="page-intro secondary">` used as the only intro | DS 550-567: secondary is supporting text after a primary intro | A muted 1rem subtitle with a 0.6s delay and no primary intro | Intentional subtitle. Low priority. |
| P13 | VISUAL | about-me.component.html:17 `<b>Поддяча Юлія Юріївна</b>` inside `.page-intro` | styles.css:917-920: `.page-intro strong` is green, weight 600, as used on contacts.component.html:12 and court-cases-list.component.html:12-14 | `<b>` gets the browser default bolder (700) in #444. The `b` selector at styles.css:271 is scoped to `.blog-post-section` only. | The name on /about-me is not green, unlike the emphasis on the other pages. Looks accidental. |

---

## Notes outside the 5 classes (not counted)
- No `prefers-reduced-motion` handling exists anywhere in src (grep finds 0). The page-header reveal (styles.css:872, 891, 914; h1 and intro start at `opacity: 0`, :890 and :913) and the infinite `badge-pulse` (need-help-section.component.css:78) always run.
- Badge markup differs: only documents.component.html:5 and contacts.component.html:5 put `aria-hidden="true"` on `.page-header-badge`. MatIcon itself is aria-hidden by default (not verified at runtime).
- Incidental findings outside my scope, for the other auditors:
  - court-case.component.css:454 uses `var(--weight-medium)`, which is undefined and has no fallback. This is the only undefined custom property in src.
  - styles.css:177 sets `font-family: var(--font-main)`, but `--font-main` is a `font` shorthand (styles.css:6). The value is invalid at computed-value time, so headings just inherit Lora from body.
  - `--section-padding-y` is 1.5rem in code (styles.css:33) but 2rem in DS 183. This affects `.page-content` top padding.

## Decisions needed (competing variants, with usage counts)
1. **D1 Page-level header.** The signature `.page-header` (badge, underlined h1, intro, reveal) serves **12 routes**. The detail header (breadcrumb with a 2.5rem badge, plain h2-size h1, meta card) has **3 drifting copies serving 98 routes**: 60 blog posts, 30 court cases, 8 instructions. Choose one:
   - document the detail header as an official sibling pattern and centralise its CSS, or
   - move the detail pages onto `.page-header`.

   Either way, settle whether the detail h1 gets the gold underline (DS 540) and the reveal animation.
2. **D2 Large badge colour.**
   - Gold gradient (DS 4.4 Variant 3): **2 uses**, both on dark sections (court-cases-section, need-help).
   - Green gradient (DS 4.6): the `.page-header-badge` on **12 routes**, plus documents-section, the services pricing icon, the homepage hero, 3 breadcrumb badges and the spinner.

   Make "gold on dark, green on light" canonical and correct DS 422, or recolour. Also pick one shadow for green large badges; 3 are in use today.
3. **D3 Section intro.**
   - Placement: inside `.section-header` (**3**: blog-preview, feedback-section, court-cases-section) or after it (**4**: services with a −1.5rem pull-up, documents ×3 with a 1.5rem header margin).
   - Font size: `--section-intro-font-size` (**8**), `--font-size-body-lg` (**4**), or a literal 1.1rem (**2** final-CTA intros).
   - Line-height: 1.6 (**7**), 1.65 (**3**) or 1.7 (**2**).
   - Colour: primary (**6**) or secondary (**1**).
   - Mobile size: 1.1rem (most), 1rem (page-intro, final-CTA) or 0.95rem (documents).

   Choose one spec and add it to DS 4.5 and section 9.
4. **D4 Icon-wrapper responsiveness.** The doc defines fixed tiers, but code steps up and down:
   - 2.75rem at 768+: **5** wrappers
   - 3rem at 1024+: **3**
   - 3rem at 640+: **1**
   - 2.75rem at 1024+: **1**
   - 2.25rem below 480px: **2**, plus the blog components' desktop-first steps

   Define a responsive md scale (for example by overriding `--icon-wrapper-md` in media queries) or freeze the size.
5. **D5 Dark-section h2 colour.** White with a text-shadow (**2**: court-cases-section, need-help) vs gold (**4**: final-CTA sections, and DS 1480).
6. **D6 Translucent-gold wrapper.**
   - The doc's 3rem with a 2px solid gold border: **6** uses (4 format banners, the seo CTA, contacts primary).
   - Compact 2.25rem with a 1px alpha border: **6+** (header ×2, footer, drawer, dialog, video panel, blog-links).
   - Background alpha: 0.15 (DS 379 and 1497; **5** uses), 0.2 (DS 932; contacts) or 0.1 (header, drawer).

   Pick the alphas and document the compact size.
7. **D7 Muted icon wrapper.** A green tint with a green glyph (**2**: pension-help problems, instructions-list cards; each different) vs Variant 1 (about **20**). Document it as a "muted" variant, or convert both.
8. **D8 Editorial section header.** Cormorant Garamond with an eyebrow and a left-aligned desktop underline (**2**, already drifted: home about-section, /about-me "Про мене") vs the standard 4.5 header (**23**). Document it or drop it, and fix the h2 being larger than the h1 on /about-me.
9. **D9 Left-aligned in-article headings.** None are documented. Current styles:
   - icon plus h2 (court-case **7**, instruction **4**, plus 2 blog-footer headers with circular icons)
   - a solid 2px gold rule (legal pages, **2** components)
   - a full-width alpha rule plus an icon (instructions-list, **1**)

   Choose one.
10. **D10 Minor pairs.** Reviewer avatar: 4rem on /feedbacks vs 3.5rem in the homepage carousel. Numbered circle: green gradient with a gold digit (consultation) vs solid gold with a white digit at about 2.3:1 contrast (instruction steps). Medium-icon shape: 0.5rem radius (**5**) vs circle (**6**); the DS 337 table allows only 0.5rem.
