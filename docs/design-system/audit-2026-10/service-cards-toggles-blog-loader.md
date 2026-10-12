# Design-system audit: components C (DESIGN_SYSTEM.md 4.13 to 4.17)

> Appendix to [`../audit-report-2026-10.md`](../audit-report-2026-10.md). Rows were derived from the CSS with file:line evidence; the findings re-checked in a browser are listed in the main report (§7).

Scope: `docs/DESIGN_SYSTEM.md` sections 4.13 Service Card, 4.14 Prominent Action Card, 4.15 Expand/Toggle Button, 4.16 Blog Content Typography, 4.17 Branded Loader, compared against the code at HEAD `9af77e7` (clean working tree). Read-only: no repo file was changed, no build was run and `dist/` was not touched. "doc NNN" = line in `docs/DESIGN_SYSTEM.md`.

Path legend used in the tables:

| Short | Path |
|---|---|
| styles | `src/styles.css` |
| svc-sec | `src/app/main/sections/services-section/services-section.component.css` (html: `services-section.component.html`) |
| svc / svc.html | `src/app/services/services.component.css` / `.html` |
| about / about.html | `src/app/about-me/about-me.component.css` / `.html` |
| faq / faq.html | `src/app/faq/faq.component.css` / `.html` |
| seo / seo.html | `src/app/main/sections/seo-section/seo-section.component.css` / `.html` |
| contacts | `src/app/contacts/contacts.component.css` (html: `contacts.component.html`) |
| docs / docs.html | `src/app/documents/documents.component.css` / `.html` |
| spinner | `src/app/core/components/spinner/spinner.component.*` |
| posts/ | `src/app/blog/blog-posts/posts/` |

## Counts

| Class | 4.13 | 4.14 | 4.15 | 4.16 | 4.17 | Total |
|---|---|---|---|---|---|---|
| VISUAL | 5 | 2 | 5 | 4 | 1 | 17 |
| HYGIENE | 2 | 1 | 2 | 2 | 3 | 10 |
| BYPASS | 3 | 0 | 1 | 2 | 0 | 6 |
| DOC-STALE | 4 | 5 | 3 | 3 | 4 | 19 |
| BUG | 1 | 1 | 0 | 3 | 0 | 5 |
| Rows | 15 | 9 | 11 | 14 | 8 | 57 |

---

## 4.13 Service Card Pattern (doc 814-883)

### Spec summary
- `.service-card`: flex column, gap 0.75rem, white, padding 1.25rem, `--card-border-radius`, `--card-border`, `--card-box-shadow`, transition transform/box-shadow/border-color `--transition-normal` (doc 820-832).
- Hover: `translateY(-2px)`, shadow `0 8px 24px rgba(0,39,6,.08), 0 2px 8px rgba(0,39,6,.04)`, border `rgba(201,165,92,.4)`, `.service-icon-wrapper` `scale(1.05)`, h3 turns `--color-gold-accent` (doc 834-848).
- `.service-header`: flex, centered, gap 0.75rem; h3 `--font-size-card-title`, 700, green, colour transition (doc 853-866).
- Variants: main-service (column, rounded square), additional-service (column, circular), qualification (row, circular), service-card (column, rounded square) (doc 871-876).
- Padding: <480px 1 to 1.25rem; 768px+ 1.5 to 1.75rem; 1024px+ 2rem (doc 878-881). Used in services, about-me, services-section (doc 883).

### Implementations found
- Homepage `.service-card`: svc-sec:52-131, :238-286; services-section.component.html:8, :30, :52, :74 (4 cards).
- `.main-service-card`: svc:48-135, :677-692, :729-752, :772-779; svc.html:26 (4 cards via `@for`).
- `.additional-service-card`: svc:286-377, :704-718, :759-761, :781-783; svc.html:113 (12 cards).
- `.qualification-card`: about:215-274, :805-819, :1029-1031; about.html:104-152 (6 cards).
- About-me `.service-card`: about:320-399, :821-835, :1033-1035; about.html:203-282 (6 cards).
- Look-alikes (BYPASS rows 14 and 15): FAQ `.related-card` faq:70-186 (2 cards); `.seo-block` seo:103-153 (3 blocks).
- Related but separate patterns, not counted: `.trust-item` (why-me-section.component.ts:131), `.problem-item` (pension-help-section.component.ts:155), `.approach-item` (about:508; it carries exactly the hover values printed in 4.13), `.instruction-card` (instructions-list.component.css:37), blog `.related-card` (related-articles.component.ts:128), `.document-card` / `.education-card` (docs:170, :561).

| # | Class | Where (file:line) | Spec (doc line) | Actual | Notes |
|---|---|---|---|---|---|
| 1 | DOC-STALE | svc-sec:75; svc:75, :332; about:237, :354 | hover `translateY(-2px)` (doc 835) | `translateY(-4px)` in all 5 implementations | Code is consistent and matches 4.3 Cards (doc 306) and section 6 "Cards -4px to -6px" (doc 1554). The 4.13 values exist only on `.approach-item` (about:539-543), a list item. |
| 2 | DOC-STALE | svc-sec:77-79; svc:77-79, :334-336; about:239-241, :356-358 | hover shadow `0 8px 24px rgba(0,39,6,.08), 0 2px 8px rgba(0,39,6,.04)` (doc 836-838) | `0 12px 32px rgba(0,39,6,.1), 0 4px 12px rgba(0,39,6,.06)` everywhere | Same as the 4.3 hover (doc 308). |
| 3 | DOC-STALE | svc-sec:85-90; svc:85-90, :342-347; about:243-248, :364-369 | icon hover = `scale(1.05)` only (doc 841-843) | also `box-shadow: 0 6px 16px rgba(0,39,6,.25), inset 0 1px 0 rgba(201,165,92,.15)` | Identical in all 5 implementations. |
| 4 | DOC-STALE | svc-sec:113-115, :243-246, :276-279; svc:113-115, :682-685, :742-745, :355-357, :708-711; about:256-258, :809-812, :377-379, :825-828 | 4.13 silent; 4.4 gives card icons a fixed `--icon-wrapper-md` 2.5rem (doc 337) | rounded-square icons grow 2.5rem to 2.75rem (768px+) to 3rem (1024px+, 2-column cards only); additional-service icon 2.25rem (sm) to 2.5rem (768px+); about-me icons 2.5rem to 2.75rem | 2.75rem and 3rem are off-scale literals. |
| 5 | BUG | svc:64-66 with :75; svc:301-303 with :332; faq:85-87 with :97 (look-alike) | hover lift (doc 835) | `opacity:0; transform:translateY(20px); animation: cardReveal ... forwards`. With fill-mode `forwards` the last keyframe `transform: translateY(0)` (styles:801) keeps applying, and animation values override normal author rules, so `:hover { transform }` never takes effect | No lift on 18 cards: 4 main + 12 additional (/services/) + 2 FAQ related cards. Shadow and border hover still work. The working pattern already exists at docs:370 (`backwards`). |
| 6 | VISUAL | svc-sec:57 (no max-width:479px query; only :232, :238, :267) | below 480px: 1 to 1.25rem (doc 879) | 1.5rem at every width below 768px, including small phones | Accidental: the other 4 implementations drop to 1 to 1.25rem at 479px and below (svc:774, :782; about:1030, :1034). Homepage, 4 cards. |
| 7 | VISUAL | svc:704-706 (no 1024px padding rule); about:805-807, :821-823 (no 1024px padding rule) | 1024px+: 2rem (doc 881) | `.additional-service-card`, `.qualification-card` and about-me `.service-card` stay at 1.5rem on desktop | Contextual: these are the 3-column grids (svc:755; about:948, :953). 2rem is used only by the 2-column grids (svc-sec:273; svc:735). The rule is undocumented. |
| 8 | VISUAL | svc:101, :739, :778 | h3 `var(--font-size-card-title)` = 1.15rem, 1.2rem at 1024px+ (doc 861; styles:21, :989) | `.main-service-card` h3 1.25rem, 1.35rem at 1024px+, 1.1rem at 479px and below (literals) | Contextual: primary services emphasised on /services/. Bypasses the token. |
| 9 | VISUAL | svc:316, :760 | as in row 8 | `.additional-service-card` h3 1.05rem, 1.1rem at 1024px+ | Contextual: secondary tier. Literals. |
| 10 | VISUAL | svc:51, :97, :315; about:218, :337 | card gap 0.75rem (doc 823); header gap 0.75rem (doc 857) | 1rem in the main-service card and its header, the additional h3, the qualification card and the about-me h3; only svc-sec uses 0.75rem (:55, :97) | Accidental-looking 4px drift. See Decisions. |
| 11 | BYPASS | about.html:204-210 (and 5 more cards to :277); svc.html:114-119; CSS about:334-344, svc:312-322 | `.service-header` wrapper holding icon + h3 (doc 853-866) | the icon `<div>` sits inside the `<h3>` (h3 made flex) on 18 cards (6 about-me + 12 additional) | `<div>` inside `<h3>` breaks the content model. The ligature text (for example `assignment_turned_in`) becomes part of each heading's text. mat-icon is aria-hidden, but crawlers still read the text (SEO effect unverified). |
| 12 | HYGIENE | svc-sec:52-131; svc:48-135, :286-377; about:215-274, :320-399 | one documented pattern | no global class: 5 component-local copies of card + icon + hover, with the icon wrapper under 4 names (`.service-icon-wrapper`, `.service-icon`, `.qualification-icon`, `.additional-service-icon`) | The doc names `.service-icon-wrapper` (doc 841). |
| 13 | HYGIENE | e.g. svc-sec:76 `rgba(201,165,92,.4)`, :78-79, :116 gradient, :122 `cubic-bezier(0.34,1.56,0.64,1)` | `--gold-alpha-40`, `--green-alpha-10/06`, `--green-gradient`, `--ease-bounce` | 44 literals that equal existing tokens across the 5 blocks (svc-sec 9, svc 18, about 17) | The doc snippet itself uses literals (doc 837-839). `.qualification-icon` already uses `var(--green-gradient)` (about:259). |
| 14 | BYPASS | faq:70-186, :303-384; faq.html:35-48 | 4.13 card (column, rounded-square icon) | `.related-card` (2 link cards) re-implements it with the same icon, hover and h3 colour, but h3 is a 1.15rem literal (faq:156), 1.25rem at 768px+ (:346), 1.05rem at 479px and below (:383); row layout below 640px; 10 literals equal tokens; hover lift dead (row 5) | Look-alike. |
| 15 | BYPASS | seo:103-153, :303-309, :324-338, :370-376; seo.html:26-32, :65-71, :109-115 | `.service-card` + `.service-header` + `.service-icon-wrapper` | `.seo-block` + `.block-header` + `.block-icon` (3 blocks): icon shadow `0 2px 8px` (seo:144) instead of `0 4px 12px`; h3 1.1rem (:127), 1.15rem at 768px+, 1rem at 479px and below; icon grows only at 1024px+; no hover | Static content card. It could be documented as a non-interactive variant. |

---

## 4.14 Prominent Action Card (doc 887-944)

### Spec summary
- `.prominent-action-card`: flex, centered, gap 1rem, padding 1rem 1.25rem, `--green-gradient`, card radius, no underline, white text, shadow `0 4px 20px var(--green-alpha-25), 0 2px 8px var(--green-alpha-15)`, `transition: all .3s var(--ease-standard)`, relative + overflow hidden (doc 892-906).
- `::before` gold sheen (135deg, transparent to `--gold-alpha-10`), opacity 0 to 1 on hover. Hover `translateY(-2px)` with shadow `0 8px 28px var(--green-alpha-30)` (doc 909-923).
- `.prominent-action-icon`: 3rem circle, `--gold-alpha-20` fill, 2px gold border, gold icon (doc 926-937).
- Variations: `.primary-contact` (contacts) and `.registry-card` (documents) (doc 940-944).

### Implementations found
- `.primary-contact`: contacts:146-251, :728-734, :922-941; contacts.component.html:53-68.
- `.registry-card`: docs:62-154, :881-883, :1027-1044; docs.html:34-56.
- Related, not counted:
  - seo `.cta-block` + `.cta-icon` (seo:190-224) is a green CTA container that holds an appCtaButton; it is not clickable itself.
  - `.format-icon-wrapper` icons on dark bands: svc:410, svc-sec:194, contacts:427, about:582.
  - The same registry URL is an appCtaButton on about-me (about.html:79-88).
  - Other phone links use other patterns legitimately: header.component.ts:80, :94; footer.component.html:33; appCtaButton in intro/seo.

| # | Class | Where (file:line) | Spec (doc line) | Actual | Notes |
|---|---|---|---|---|---|
| 1 | HYGIENE | contacts:146-251; docs:62-154 | single `.prominent-action-card` + `.prominent-action-icon` (doc 892-937) | neither class exists. The pattern is copy-pasted into 2 components and has already drifted (rows 2-4, 7) | Neither card has a `:focus-visible` style, so keyboard focus is the browser outline on dark green. The doc is silent on focus. |
| 2 | VISUAL | docs:72-74 | rest shadow `0 4px 20px var(--green-alpha-25), 0 2px 8px var(--green-alpha-15)` (doc 901-903) | `0 4px 20px var(--green-alpha-20), 0 2px 8px var(--green-alpha-10)` | Accidental: the registry card looks flatter than `.primary-contact` (contacts:157-159 matches the spec). |
| 3 | VISUAL | docs:92 | hover `translateY(-2px)` (doc 919) | `translateY(-3px)` | Accidental. -3px is the outline-button lift (doc 287). |
| 4 | DOC-STALE | contacts:180-182; docs:93-95 | hover shadow `0 8px 28px var(--green-alpha-30)`, one layer (doc 920) | both use two layers: contacts α30 + `0 4px 12px` α20; docs α25 + `0 4px 12px` α15 | The two-layer shadow is consistent, so the doc is stale. The alphas differ (see Decisions). |
| 5 | DOC-STALE | contacts:188-190, :239-251; docs:101-103, :138-154 | spec has icon + content only | both cards add a trailing icon (`arrow_forward` / `open_in_new`) that moves `translateX(3px)` on hover | Section 6 says arrows and icons move 4px (doc 1558). |
| 6 | DOC-STALE | docs:107-123, :1032-1036 | icon 3rem, `--gold-alpha-20` fill, 2px gold border (doc 926-937) | registry variant: 3.5rem white circle with a logo image, padding .35rem (2.75rem at 479px and below) | The doc names this variation (doc 942) but gives none of its values. |
| 7 | DOC-STALE | contacts:728-730, :922-937; docs:881-883, :1027-1044 | no responsive rules | at 479px and below both use padding .85rem 1rem and gap .75rem, icon 2.5rem / 2.75rem; at 640px+ padding is 1.15rem 1.5rem (contacts) vs 1.25rem 1.5rem (docs) | The 640px+ padding already differs between the two cards. |
| 8 | DOC-STALE | doc 379, 423 vs doc 932; contacts:205 vs svc:418, contacts:435, seo:214, svc-sec:203, about:590 | translucent-gold icon fill: 4.4 says `rgba(201,165,92,.15)` and assigns it to "Action cards (CTAs)"; 4.14 says `--gold-alpha-20` | `.primary-icon-wrap` uses α20 (1 use); every other translucent-gold icon uses α15 (5 uses) | The two doc sections contradict each other (see Decisions). |
| 9 | BUG | about:924-926 (`.registry-link`), about:920-922 (`.credentials-row`) | n/a | dead selectors: about.html has no `.registry-link` (its registry link is an appCtaButton, about.html:79-88), and the `.credentials-row` markup is commented out (about.html:69-78) | Remnant of an earlier registry/credentials block. Tangential to this pattern. |

---

## 4.15 Expand/Toggle Button (doc 948-1001)

### Spec summary
- `.expand-btn`: flex, centered, gap .5rem, margin `2rem auto 0`, padding `.75rem 1.5rem`, transparent, border `2px solid var(--green-alpha-20)`, radius 3rem, `--font-size-body`, 600, green, `transition: all .3s var(--ease-standard)` (doc 953-967).
- The icon rotates 180deg via `.rotated` (`transform .3s var(--ease-bounce)`). Hover: `--green-alpha-06` fill, green border, `bounceDown` on the un-rotated icon (doc 969-990).
- Usage: text + `keyboard_arrow_down` with `[class.rotated]` (doc 994-998). Used in documents `.show-more-btn` and seo-section `.seo-toggle-btn` (doc 1001).

### Implementations found
- `.show-more-btn`: docs:441-492, :1090-1093; docs.html:163-177. It matches the spec except the glyph name.
- `.seo-toggle-btn`: seo:260-300, :398-401; seo.html:155-158.
- Related disclosure toggles (not "show more" buttons):
  - Hand-rolled blog accordion: blog-faq.component.ts:29-49.
  - Shared `app-faq-accordion` (faq-accordion.component.ts:13-24), used in svc.html:181, faq.html:21, court-case.component.html:177 and instruction.component.html:201.
  - Instruction steps `mat-expansion-panel`: instruction.component.html:85.
  - Video panel header: blog-iframe.component.ts:30-52.
  - Dropdown chevrons: category-filter.component.ts:43-44, :65-66; social-share.component.ts:37-38.
  - `<details>` in 3 posts (4.16 row 8).
- Checked, no toggle found:
  - Court-cases `.read-more` (court-cases-list.component.css:210, court-cases-section.component.css:266) is a static label inside a card link.
  - feedbacks and feedback-section have no read-more control.

| # | Class | Where (file:line) | Spec (doc line) | Actual | Notes |
|---|---|---|---|---|---|
| 1 | DOC-STALE | doc 953, 995 | class `.expand-btn` | no `.expand-btn` anywhere in `src/`; two local classes instead, `.show-more-btn` (docs:441) and `.seo-toggle-btn` (seo:260) | Doc line 1001 lists the aliases. No shared class exists. |
| 2 | VISUAL | seo:273 | border `2px solid var(--green-alpha-20)` (doc 961) | `2px solid var(--color-green)` | Looks intentional (a stronger homepage button) but is undocumented. |
| 3 | VISUAL | seo:289-295, :297-299 | hover: `--green-alpha-06` fill, green border, icon `bounceDown` (doc 977-984) | hover: solid green fill, gold text, shadow `0 8px 24px rgba(0,39,6,.2), 0 4px 8px rgba(0,39,6,.1)`, no bounce; `:active scale(.98)` | Looks intentional (CTA-like), but it turns a quiet toggle into a filled button. |
| 4 | VISUAL | seo.html:157; seo:282-287 | `keyboard_arrow_down` + `[class.rotated]` giving `rotate(180deg)` over .3s `--ease-bounce` (doc 969-974, 997) | swaps the glyph `expand_more` to `expand_less`: an instant change with no rotation. Its `transition: transform .3s ease` (seo:286) never fires | Accidental. blog-faq does the same glyph swap (blog-faq.component.ts:38-40). |
| 5 | VISUAL | seo:265-268 | padding `.75rem 1.5rem`, width fits the content (doc 959) | padding `.875rem 2rem`, `width:100%; max-width:280px` (`.75rem 1.5rem` at 479px and below, :399) | Minor; contextual. |
| 6 | HYGIENE | seo:274 | radius 3rem (doc 962) | 2rem | Renders the same: the button is about 52px tall, so both values give a full pill. |
| 7 | HYGIENE | seo:276-280, :293-294 | `transition: all .3s var(--ease-standard)` (doc 967) | per-property transitions with a literal `cubic-bezier(0.34,1.56,0.64,1)` (= `--ease-bounce`) and `rgba(0,39,6,.2/.1)` (= `--green-alpha-20/10`) | 3 literals that equal tokens. |
| 8 | DOC-STALE | docs.html:175; category-filter.component.ts:44, :66; social-share.component.ts:38; blog-iframe.component.ts:50 | glyph `keyboard_arrow_down` (doc 997) | every chevron toggle in `src/` uses `expand_more` | Same chevron shape. Only the doc example differs. |
| 9 | DOC-STALE | docs:478-481, :1090-1093; docs.html:165, :168; seo.html:155 | spec has no focus state, responsive rule, `type` or `aria-expanded` | `.show-more-btn` adds a gold `:focus-visible` outline, padding `.65rem 1.25rem` + `--font-size-body-sm` at 479px and below, `type="button"` and `aria-expanded`. `.seo-toggle-btn` has none of these | `.show-more-btn` is the more complete reference. No `prefers-reduced-motion` handling for `bounceDown` (none exists anywhere in `src/`). |
| 10 | BYPASS | blog-faq.component.ts:29-49, :112-169 | the shared `app-faq-accordion` (Material expansion panel, used by 4 templates) | blog posts use a hand-rolled accordion: glyph swap (:38-40); no `aria-expanded` on `.faq-question` (:36); the click handler is on the wrapper div (:34), so clicking the answer text collapses it; the answer is removed from the DOM when closed (:42) | The doc has no accordion or disclosure pattern (see Decisions). |
| 11 | VISUAL | category-filter.component.ts:142-146; social-share.component.ts:129-133; blog-iframe.component.ts:115-117, :220; docs:462-466 | chevron rotation .3s `--ease-bounce` (doc 970) | three timings for the same 180deg chevron: .25s standard easing (literal `cubic-bezier(0.4,0,0.2,1)`, 2 components), .35s standard (video panel), .3s bounce (documents) | Accidental drift. These are dropdown and panel toggles, not show-more buttons, but they share the chevron sub-pattern. |

---

## 4.16 Blog Content Typography `.blog-post-section` (doc 1005-1155)

### Spec summary
- Base: 1.05rem / 1.7 / 400 / `--text-color-primary`.
- h2: 1.375rem, 700, green, `.5rem` bottom padding, 1px gold α.2 border. h3: 1.15rem, 700, green.
- Links: gold-accent, underline in gold α.4, offset 2px; hover green.
- Lists: 6px gold dots for `ul`, bold gold counters for `ol`. `hr` uses `--gold-separator-center`.
- `blockquote` / `.blog-quote`: padding `1.25rem 1.5rem`, gold gradient, 4px gold left border, radius `0 .5rem .5rem 0`, italic, green, plus a 3rem Cormorant quote mark at α.3.
- Special classes: `.law-citation` and `.footer-quote`.
- Responsive: 1rem / 1.65 at 768px and below; .95rem at 479px and below.
- Expected HTML: `article > blockquote.blog-quote + section(h2, p, ul > li > p) + hr` (doc 1009-1153).

All documented values match the CSS: styles:206-209 base, :226-233 h2, :237-239 h3, :256-266 links, :285-294 ul, :313-318 ol, :335-338 hr, :347-368 blockquote, :373-381 `.law-citation`, :604-607 and :639 responsive.

### Implementations found
- styles:205-601, with media queries at :604-635 and :637-693.
- Only consumer: blog-post.component.html:53-56. Overrides: blog-post.component.css:238-240 (dead rules at :245-259 and :379-386).
- Content: 62 HTML files in posts/ = 60 posts + `_template.blog.html` + `footer-card.html` (never rendered).
- Class census across the 62 files (parse5):
  - `blockquote.blog-quote` 61, `p.law-citation` 49 (21 posts), `aside.blog-warning` 7 (4 posts), `div.phone-frame` 7 (1 post), `a.blog-cta` 4 (2 posts), `strong.law-citation` 1, `footer.footer-quote` 1.
  - 7 inline `style` attributes. No ids.

| # | Class | Where (file:line) | Spec (doc line) | Actual | Notes |
|---|---|---|---|---|---|
| 1 | BUG | styles:540-548 (referenced at :492) | not in the doc. The `.blog-cta` shimmer is meant to match appCtaButton (comment at styles:443) | `@keyframes blogCtaShimmer` is nested inside `.blog-post-section {}`. CSS Nesting allows only conditional group rules, @layer, @scope and @container inside style rules, so browsers drop it. esbuild 0.28.0 (the version @angular/build 20.3.27 pins) leaves it nested even when it lowers nesting for Angular's default targets (Chrome 107 / Safari 16). Transforming the block gives `.blog-post-section{...;@keyframes blogCtaShimmer{...}}` | The shimmer on all 4 `.blog-cta` links (2 posts) never runs. Fix: move the @keyframes to the top level. Browser behaviour was not checked at runtime. |
| 2 | BUG | styles:575-600; blog-post.component.ts:82-84; posts/footer-card.html | `.footer-quote` is documented as a special class (doc 1120) | its only markup, posts/footer-card.html, is loaded by `footerCard`, a computed that no template reads. It is never requested or rendered, so every `.footer-quote` rule is dead | The doc documents a class that no visitor sees. |
| 3 | BUG | blog-post.component.css:245-259, :379-386 | n/a | `.article-footer` and `.article-footer .blog-post-section` match nothing; the template uses `.article-footer-sections` (blog-post.component.html:60) | Dead selectors, probably the old footer-card container. |
| 4 | VISUAL | styles:296-298 (`ul li p {display:inline}`); posts/shcho-robyty-iakshcho-pensiinyi-fond-ne-zarakhovuie-periody-roboty-do-strakhovoho-stazhu.html:26-37, :46-57, :58 | expected structure assumes one `<p>` per `<li>` (doc 1141-1143) | 3 list items contain an `<h3>` and two `<p>`; both paragraphs become inline and run together on one line | Accidental. |
| 5 | VISUAL | styles:220-222 (p margin 0) and :343-356 (blockquote is not a flex container); 6 posts with 2-paragraph leads, e.g. posts/pidstavy-dlia-prypynennia-vyplaty-pensii.html:2-14; aside in posts/holosuvannia-proty-proiektu-kmu-821.html:91 | paragraph rhythm comes from the 1.25rem gap on `article, section` (styles:212-217) | consecutive `<p>` inside `blockquote.blog-quote` (6 posts) and `aside` (1 post) have no space between them | Accidental. The gap exists only on article and section. |
| 6 | VISUAL | posts/iak-zarakhovuiutsia-periody-roboty-za-spyskom-1-do-strakhovoho-stazhu.html:22-28 | `.law-citation` is a block callout, used on `<p>` 49 times (doc 1119) | here it is on an inline `<strong>` after `<br><br>`: padding, background and left border break on every line box, and #666 from `.law-citation` overrides strong's green | Accidental. It should be `<p class="law-citation">`. |
| 7 | VISUAL | styles:444-538 vs cta-button.component.ts:42-56, :215, :221-225 | `.blog-cta` claims to match appCtaButton (styles:443); 4.1 sets the font at 1.05rem, 1.1rem from 640px (doc 238) | `.blog-cta` is 0.9rem at every width, with padding `.5rem .75rem` + gap .75rem (about .75rem after the text instead of 1.5rem) and no icon shake on hover | Accidental drift: the comment says it matches. |
| 8 | BYPASS | posts/dostrokove-pryznachennia-pensii-dlia-druzhyn-cholovikiv-ta-batkiv-zahyblykh-viiskovosluzhbovtsiv.html:30-34; posts/dostrokove-pryznachennia-pensii-dlia-osib-z-invalidnistiu-vnaslidok-zakhystu-batkivshchyny.html:31-36; posts/pravo-uchasnykiv-boiovykh-dii-ato-ta-oos-na-dostrokove-pryznachennia-pensii.html:34-39 | law text belongs in `.law-citation` (doc 1119); 4.16 has no disclosure style | `<details><summary style="font-weight: bold; cursor: pointer">` + `<p style="font-size: smaller">` holding the full text of a law article. `.blog-post-section` has no rules for details/summary | 6 of the 7 inline styles in the 60 posts. |
| 9 | BYPASS | posts/postanova-kmu-821-skasovana-shcho-tse-oznachaie-dlia-pensioneriv.html:102 | `.blog-cta` | inline `style="width: 100%; justify-content: flex-start;"` | The 7th inline style. A modifier class would do. |
| 10 | HYGIENE | styles:444-548 vs src/app/shared/components/cta-button/cta-button.component.ts:27-216 | reuse appCtaButton (4.1) | about 100-line hand copy for raw HTML; the `!important` on color/text-decoration (styles:459, :463, :523) is unnecessary because `.blog-post-section .blog-cta` (0,2,0) already beats `.blog-post-section a` (0,1,1) | A copy is needed because posts are raw HTML, but it has already drifted (rows 1 and 7). |
| 11 | HYGIENE | styles:233, :259, :378, :401-402, :414, :432-433, :467-469, :471, :489, :502, :522, :525-527, :532, :553, :581; font stack at :363 | alpha, easing and font tokens | 21 literals that equal tokens (e.g. :233 `rgba(201,165,92,.2)` = `--gold-alpha-20`; :378 and :553 `rgba(0,39,6,.03)` = `--green-alpha-03`; :471 = `--ease-bounce`). The literal `'Cormorant Garamond', Georgia, serif` duplicates `--font-heading` (styles:8) | The doc snippets also use literals (doc 1026, 1042, 1096-1097). |
| 12 | DOC-STALE | styles:212-217, :220-222, :245-253, :270-274, :329-332, :383-441, :444-538, :551-557, :560-572 | 4.16 documents base, h2, h3, links, list markers, hr, blockquote, `.law-citation`, `.footer-quote` | the CSS also defines, and posts use: article/section flex gap 1.25rem; `p` margin 0; h4-h6 (1 `h4` in posts); strong/b (about 850); nested lists; figure, `.phone-frame`, figcaption (7, 1 post); `.blog-cta` + `.blog-cta-icon` (4 in 2 posts); plain `aside` (13 in 11 posts); `.blog-warning` (7 in 4 posts) | Also, the `figure img` border and shadow (styles:432-433) leak onto `.phone-frame img`, which only overrides radius and size (styles:419-424). |
| 13 | DOC-STALE | styles:609-633, :641-691 | the responsive table lists only font-size and line-height (doc 1124-1128) | also changes: h2 1.25rem / 1.15rem; h3 1.1rem / 1.05rem; blockquote padding, 3px border, quote mark 2.5rem / 2rem; 5px bullets; `ol` offset 1.5rem; figcaption; aside padding | The blog uses `max-width: 768px`, while the section 7 tiers start at `min-width: 768px` (doc 1625). At exactly 768px the article uses the mobile scale. |
| 14 | DOC-STALE | doc 1132-1153; posts/_template.blog.html:12-17 | expected structure `<li><p>...</p></li>`; no guidance for reference blocks | 829 of 843 `<li>` hold bare text (14 contain `<p>`). The post template prescribes `<aside><p><cite>...</cite></p></aside>` for legal references, which the doc never mentions. `<cite>` (15), `<time>` (27) and `<br>` (32) appear unstyled (cite falls back to the browser's italic) | |

---

## 4.17 Branded Loader (doc 1159-1314)

### Spec summary
- Badge: green gradient (hex), 50% radius, 2px gold α.4 border, 3-layer gold/green shadow; image width 60% (doc 1183-1200).
- SVG ring r=46: track gold α.15, stroke 2. Fill `#c9a55c`, 2.5, round caps, dasharray 289 / dashoffset 216, `spin 1.4s linear infinite`. Ring box inset -8px, +16px, `rotate(-90deg)` (doc 1205-1241).
- Patterned backdrop `.loader-backdrop` (doc 1249-1260).
- Sizes: 6rem for the app loader, 5rem for the spinner, 8px ring offset (doc 1265-1268).
- `.app-loader` fades out over .6s (doc 1272-1282). Removal: `afterNextRender`, then `fonts.ready`, then `fade-out`, then `remove()` after 600ms (doc 1286-1295).
- `<app-spinner [show] [blocking]>`: blocking for full-screen, `false` for loaders inside content (doc 1300-1306).

### Implementations found
- App shell loader: index.html:255-272 (markup), :274-361 (styles); removal in app.component.ts:65-91. All values match the spec.
- SpinnerComponent: spinner.component.ts:1-12, .html:1-23, .css:1-96. Values match the spec, under renamed classes.
- Usages: blog-post.component.html:80 (blocking by default) and blog-iframe.component.ts:62 (also blocking by default, see row 1).
- Unused or competing:
  - `LoaderComponent` (src/app/core/components/loader/loader.component.ts) + `LoaderDirective` (src/app/core/directives/loader.directive.ts).
  - A commented-out backup loader at index.html:363-389.
- Related: the badge look is shared with `.intro-header-badge` (intro-section.component.css:110-130) and `.page-header-badge` (styles:853-873).

| # | Class | Where (file:line) | Spec (doc line) | Actual | Notes |
|---|---|---|---|---|---|
| 1 | VISUAL | blog-iframe.component.ts:62; spinner.component.ts:11; spinner.component.css:2-9, :11-25; blog-post.component.css:78, :89-90 | loaders inside content use inline mode `[blocking]="false"` (doc 1178, 1304-1305) | the video spinner omits `[blocking]`, so the default `blocking = input(true)` renders the fixed full-screen overlay (z-index 1050, patterned backdrop at .97 opacity). `.blog-article` has `backdrop-filter` and a `forwards` transform animation, and either one makes it the containing block for fixed elements. So the overlay covers the whole article card (video, text and footer sections) until the YouTube iframe fires `load` | Accidental: `.video-container` (blog-iframe.component.ts:240-253) is `position: relative; min-height: 200px`, built for an inline spinner. 54 of the 60 posts embed a video. In long articles the centred badge can sit off-screen. Inferred from the CSS, not checked at runtime. One `isIframeLoading` signal is shared by all videos in a post (:401). |
| 2 | DOC-STALE | doc 1173-1178, 1314; blog-iframe.component.ts:62 | used in index.html and blog post loading | also used for video loading inside blog posts | |
| 3 | DOC-STALE | doc 1183-1236, 1249; index.html:256-347; spinner.component.css:11-87 | classes `.loader-badge`, `.loader-progress*`, `.loader-backdrop` | index.html uses `.loader-*` but puts the backdrop on `.app-loader` (index.html:282-291). The component uses `.spinner-badge-wrapper`, `.spinner-badge`, `.spinner-progress*` and `.spinner-backdrop`. No `.loader-backdrop` exists | The values match the spec in both copies (badge, ring 289/216, 1.4s, 6rem/5rem, 8px offset). |
| 4 | DOC-STALE | doc 1286-1295; app.config.ts:26-27; app.component.ts:71-91; spinner.component.ts:7 | "removed after hydration + fonts load" | hydration is disabled (`provideClientHydration()` removed at app.config.ts:26). The loader fades after the first client render (`afterNextRender`) and `document.fonts.ready`, with an `isPlatformBrowser` guard and a 100 ms `setTimeout` fallback that the doc snippet lacks | `host: { ngSkipHydration: 'true' }` on SpinnerComponent does nothing without hydration. |
| 5 | DOC-STALE | spinner.component.css:24, :27-33; spinner.component.html:1 | the backdrop has no opacity; inline mode and the spinner's exit are not described; fade-out .6s (doc 1270-1282, 1312) | the blocking backdrop has `opacity: .97`; inline mode is centred with `padding: 3rem 0`; the spinner disappears instantly through `@if` (the fade applies only to the app loader) | Neither loader has `role="status"`, `aria-busy`, a text alternative or a `prefers-reduced-motion` fallback (none exist anywhere in `src/`). The spec is silent on these. |
| 6 | HYGIENE | spinner.component.css:1-96 vs index.html:301-360 | one implementation | the badge, ring and `@keyframes spin` are duplicated. The Angular copy uses 7 literals that equal tokens: :53 `--gold-alpha-15`, :59 `#c9a55c`, :74 `linear-gradient(135deg,#002706,#003d0a)` = `--green-gradient`, :76 `--gold-alpha-40`, :78 `--gold-alpha-35`, :79 `--green-alpha-20`, :80 `--gold-alpha-20` | Literals in index.html are defensible because the shell is self-contained. The component loads after styles.css, so tokens are available there. |
| 7 | HYGIENE | src/app/core/components/loader/loader.component.ts:1-18; src/app/core/directives/loader.directive.ts:1-29 | branded loader only | an unused, off-brand `<mat-spinner>` `LoaderComponent` and `appLoader` directive (0 usages). Its selector `app-loader` also shares the name of the `#app-loader` shell | Dead code. If used, it would bypass the branded loader. |
| 8 | HYGIENE | index.html:363-389 | n/a | a 27-line commented-out "BACKUP: Dark Loader Design" (its own markup, styles and keyframes) inside `<body>` | Shipped in every prerendered page unless the build strips it (unverified). |

---

## Decisions needed

1. **FAQ accordion.** The shared `app-faq-accordion` (Material expansion panel; 4 templates: svc.html:181, faq.html:21, court-case.component.html:177, instruction.component.html:201) competes with the hand-rolled `app-blog-faq` (blog-post.component.html:61, rendered on every blog post that has a category or custom FAQ). DESIGN_SYSTEM.md documents neither.
2. **Chevron state change.**
   - Option A, rotate 180deg: documents show-more, video panel, category-filter, social-share (4 components). It currently runs at three timings: .25s standard (2), .3s bounce (1), .35s standard (1).
   - Option B, glyph swap `expand_more` to `expand_less`: `.seo-toggle-btn`, blog-faq (2).
3. **Show-more button look.** The spec and `.show-more-btn` (/documents/) are quiet: α.2 border with an α.06 hover tint. `.seo-toggle-btn` (homepage) has a full-green border and a solid green hover fill. Each is used once, and the doc lists both as instances of the same pattern.
4. **Service-card gaps.** 1rem is used on 28 cards (main services 4, additional 12, about-me services 6, qualifications 6, the last as a row gap). 0.75rem is the doc value, used on the homepage service cards (4) and `.seo-block` headers (3).
5. **Service-card desktop padding.**
   - 2rem (the doc value) on 2-column grids: 8 cards (homepage 4, main services 4).
   - 1.5rem on 3-column grids: 24 cards (additional 12, qualifications 6, about-me services 6).
   - Probably document it as "2rem for 2-column, 1.5rem for 3-column".
6. **Card title size tiers.**
   - The token `--font-size-card-title` on 10 cards (homepage 4, about-me 6).
   - Larger literals 1.25 / 1.35rem on main services (4).
   - Smaller literals 1.05 / 1.1rem on additional services (12).
   - Look-alikes add 1.15 / 1.25rem (FAQ) and 1.1 / 1.15rem (seo).
   - Either add primary and secondary title tokens, or force one size.
7. **Translucent-gold icon fill.** α.15 (section 4.4) is used 5 times (4 `.format-icon-wrapper` + seo `.cta-icon`); α.20 (section 4.14) is used only on `.primary-icon-wrap`.
8. **Prominent action card depth.**
   - `.primary-contact`: rest α25/α15, hover α30 + α20, 2px lift.
   - `.registry-card`: rest α20/α10, hover α25 + α15, 3px lift.
   - The doc shows a single-layer α30 hover. Each card is used once.
9. **Legal-reference markup in posts.**
   - `p.law-citation`: 49 uses in 21 posts (documented).
   - `<aside><p><cite>`: prescribed by the post template, 2 asides.
   - `<details>` with inline styles: 3 posts.
10. **Callout for important notes.**
    - Plain `aside`: 13 in 11 posts; 5 of them start with «Важливо:».
    - `aside.blog-warning`: 7 in 4 posts.
    - Plain `aside` and `.law-citation` are also nearly identical: 3px green left border on a `rgba(0,39,6,.03)` background.
11. **Collapse label.** «Згорнути» (doc, seo toggle) or «Приховати» (documents).

## Noticed outside scope (pointers)

- styles:176-177: `h1...h6 { font-family: var(--font-main) }`. `--font-main` is a full `font` shorthand (styles:6), so as a font-family value it is invalid when computed and the declaration is ignored. Headings inherit Lora from body.
- The same `cardReveal ... forwards` problem kills the hover lift on:
  - feedbacks.component.css:69 with :90-91 (`.feedback-card`)
  - court-cases-list.component.css:66 with :117-118 (`.court-case-card`)
  - docs:575 with :584-585 (`.education-card`)
- svc:181-211: `.service-cta-btn` inside `.main-service-card` hand-rolls a gold outline button instead of using appCtaOutlineButton. Its mat-icon box is 2rem x 1.1rem (:200-203).
- blog-links.component.ts:33-38 hand-rolls a `.cta-button` (icon + text + arrow), a 4.1 look-alike. Its styles were not compared.

## Method

- Read the doc sections and every implementation listed above, including inline `styles:` in `.ts` files.
- Ran a parse5 census of the 62 post HTML files and a scan for literals that equal tokens.
- Ran an in-memory esbuild 0.28.0 transform of the `.blog-post-section` block with Angular's default browser targets (Chrome 107, Safari 16, Firefox 104).
- The census and transform scripts were one-off and are not kept in the repo. Nothing was run in a browser.
