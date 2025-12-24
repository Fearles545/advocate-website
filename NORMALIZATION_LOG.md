# Design Normalization Log

Tracking design consistency improvements based on `design-audit-report.md`.

---

## 1. BUTTON STYLES

### 1.1 Primary CTA Buttons

**Status:** Completed
**Date:** 2025-12-22

**Solution:** Created reusable `CtaButtonComponent` with two theme variants.

**Files created:**
- `src/app/shared/components/cta-button/cta-button.component.ts`
- `src/app/shared/components/cta-button/index.ts`

**Files modified:**
- `tsconfig.json` - Added `@shared/*` path alias
- `src/app/main/sections/intro-section/intro-section.component.ts` - Uses new component
- `src/app/main/sections/intro-section/intro-section.component.html` - Updated markup
- `src/app/main/sections/intro-section/intro-section.component.css` - Removed old button styles
- `src/app/main/sections/need-help-section/need-help-section.component.ts` - Uses new component
- `src/app/main/sections/need-help-section/need-help-section.component.html` - Updated markup
- `src/app/main/sections/need-help-section/need-help-section.component.css` - Removed old `.cta-primary` styles (~100 lines)

**Component API:**
```html
<!-- Green theme (default) - dark green bg, gold text -->
<a href="..." appCtaButton icon="call">Text</a>

<!-- Gold theme - gold bg, dark green text -->
<button appCtaButton theme="gold" icon="email">Text</button>
```

**Features:**
- Attribute selector `[appCtaButton]` - works on `<a>`, `<button>`, any element
- Two themes: `green` (default), `gold`
- Optional icon with circular wrapper
- Shimmer animation (gold on green, white on gold)
- Icon shake animation on hover
- Gradient background shift on hover
- Mobile tap highlight fix

---

### 1.2 Secondary/Outline CTA Buttons

**Status:** Completed
**Date:** 2025-12-23

**Solution:** Created reusable `CtaOutlineButtonComponent` with two theme variants.

**Files created:**
- `src/app/shared/components/cta-outline-button/cta-outline-button.component.ts`
- `src/app/shared/components/cta-outline-button/index.ts`

**Files modified:**
- `src/app/main/sections/documents-section/documents-section.component.ts` - Uses new component
- `src/app/main/sections/documents-section/documents-section.component.html` - Updated markup
- `src/app/main/sections/documents-section/documents-section.component.css` - Removed old `.documents-cta` styles
- `src/app/main/sections/services-section/services-section.component.ts` - Uses new component
- `src/app/main/sections/services-section/services-section.component.html` - Updated markup
- `src/app/main/sections/services-section/services-section.component.css` - Removed old `.cta-button` styles (~43 lines)
- `src/app/main/sections/feedback-section/feedback-section.component.ts` - Uses new component
- `src/app/main/sections/feedback-section/feedback-section.component.html` - Updated markup
- `src/app/main/sections/feedback-section/feedback-section.component.css` - Removed old styles
- `src/app/main/sections/blog-preview-section/blog-preview-section.component.ts` - Uses new component
- `src/app/main/sections/blog-preview-section/blog-preview-section.component.html` - Updated markup
- `src/app/main/sections/court-cases-section/court-cases-section.component.ts` - Uses new component
- `src/app/main/sections/court-cases-section/court-cases-section.component.html` - Updated markup with `theme="gold"`
- `src/app/main/sections/court-cases-section/court-cases-section.component.css` - Removed old `.cta-button` styles (~47 lines)
- `src/app/main/sections/about-section/about-section.component.ts` - Uses new component, removed old `.about-cta` styles (~95 lines)

**Component API:**
```html
<!-- Green theme (default) - for light backgrounds -->
<a routerLink="..." appCtaOutlineButton>Text</a>

<!-- Gold theme - for dark backgrounds -->
<a routerLink="..." appCtaOutlineButton theme="gold">Text</a>

<!-- Custom icon (default: arrow_forward) -->
<a routerLink="..." appCtaOutlineButton icon="send">Text</a>
```

**Standardized values:**
- Padding: `1rem 1.5rem`
- Font-size: `0.9rem`
- Border: `2px solid var(--color-green)` or `var(--color-gold)`
- Border-radius: `3rem`
- Default icon: `arrow_forward`

**Features:**
- Attribute selector `[appCtaOutlineButton]` - works on `<a>`, `<button>`, any element
- Two themes: `green` (default for light bg), `gold` (for dark bg)
- Gradient fill on hover via `::before` pseudo-element
- Circular icon wrapper with translateX shift on hover
- Content projection for text

**Sections migrated:**
- [x] `documents-section`
- [x] `services-section`
- [x] `feedback-section`
- [x] `blog-preview-section`
- [x] `court-cases-section` (uses `theme="gold"`)
- [x] `about-section` (was the reference design)

---

### 1.3 Border Radius Conflict

**Status:** No action needed (resolved by 1.1 and 1.2)

**Original issue:** Outline buttons had inconsistent border-radius (`2rem` vs `3rem`).

**Resolution:** Both `CtaButtonComponent` and `CtaOutlineButtonComponent` now use `border-radius: 3rem`. Visual hierarchy is achieved through fill style (solid vs outline with gradient hover) rather than different radii.

---

## 2. SECTION SPACING

### 2.1 Section Padding

**Status:** Completed
**Date:** 2025-12-23

**Solution:** Created CSS variables for responsive section padding in `src/styles.css`.

**CSS Variables added:**
```css
:root {
  /* Section padding - mobile first */
  --section-padding-y: 2rem;
  --section-padding-x: 1rem;
  /* Extra breathing room for dark/accent sections */
  --section-padding-y-accent: 2.5rem;
}

@media (min-width: 768px) {
  :root {
    --section-padding-y: 4rem;
    --section-padding-x: 2rem;
    --section-padding-y-accent: 5rem;
  }
}
```

**Files modified:**
- `src/styles.css` - Added CSS variables and desktop media query
- `src/app/main/sections/intro-section/intro-section.component.css` - Uses `--section-padding-y/x`, removed responsive overrides
- `src/app/main/sections/pension-help-section/pension-help-section.component.ts` - Uses variables, removed responsive overrides
- `src/app/main/sections/about-section/about-section.component.ts` - Uses variables
- `src/app/main/sections/services-section/services-section.component.css` - Uses variables, removed responsive overrides
- `src/app/main/sections/why-me-section/why-me-section.component.ts` - Uses variables
- `src/app/main/sections/documents-section/documents-section.component.ts` - Uses variables
- `src/app/main/sections/feedback-section/feedback-section.component.css` - Uses variables
- `src/app/main/sections/blog-preview-section/blog-preview-section.component.css` - Uses variables
- `src/app/main/sections/seo-section/seo-section.component.css` - Uses variables
- `src/app/main/sections/court-cases-section/court-cases-section.component.css` - Uses `--section-padding-y-accent` (dark section)
- `src/app/main/sections/need-help-section/need-help-section.component.css` - Uses `--section-padding-y-accent` (dark section)

**Pattern:**
| Section Type | Variable |
|--------------|----------|
| Light background sections | `padding: var(--section-padding-y) var(--section-padding-x)` |
| Dark/accent sections (court-cases, need-help) | `padding: var(--section-padding-y-accent) var(--section-padding-x)` |

**Benefits:**
- Single source of truth for section spacing
- Responsive behavior controlled centrally via CSS variables
- Easy to adjust spacing site-wide by changing 3 values
- Dark sections automatically get extra breathing room

**Cleanup:** All legacy responsive padding overrides removed from section media queries. Sections now fully rely on CSS variables for responsive padding.

---

### 2.2 Section Max-Width

**Status:** Completed
**Date:** 2025-12-24

**Solution:** Created CSS variables for section max-widths in `src/styles.css`.

**CSS Variables added:**
```css
:root {
  /* Section content max-widths */
  --section-max-width: 1200px;
  --section-max-width-narrow: 900px; /* Text-heavy sections for better readability */
  --section-max-width-compact: 800px; /* Focused content sections */
}
```

**Files modified:**
- `src/styles.css` - Added CSS variables
- `src/app/main/sections/intro-section/intro-section.component.css` - Uses `--section-max-width`
- `src/app/main/sections/about-section/about-section.component.ts` - Uses `--section-max-width`
- `src/app/main/sections/pension-help-section/pension-help-section.component.ts` - Uses `--section-max-width`
- `src/app/main/sections/services-section/services-section.component.css` - Uses `--section-max-width`
- `src/app/main/sections/feedback-section/feedback-section.component.css` - Uses `--section-max-width`
- `src/app/main/sections/court-cases-section/court-cases-section.component.css` - Uses `--section-max-width`
- `src/app/main/sections/blog-preview-section/blog-preview-section.component.css` - Uses `--section-max-width`
- `src/app/main/sections/why-me-section/why-me-section.component.ts` - Uses `--section-max-width-narrow`
- `src/app/main/sections/seo-section/seo-section.component.css` - Uses `--section-max-width-narrow`
- `src/app/main/sections/documents-section/documents-section.component.ts` - Uses `--section-max-width-compact`
- `src/app/main/sections/need-help-section/need-help-section.component.css` - Uses `--section-max-width-compact`

**Pattern:**
| Width | Variable | Usage | Sections |
|-------|----------|-------|----------|
| 1200px | `--section-max-width` | Standard sections | intro, about, pension-help, services, feedback, court-cases, blog-preview |
| 900px | `--section-max-width-narrow` | Text-heavy sections (~65-75 char line length) | why-me, seo |
| 800px | `--section-max-width-compact` | Focused content, CTAs | documents, need-help |

**Design rationale:**
- Narrower widths for text-heavy sections improve readability (optimal line length is 65-75 characters)
- Compact width for call-to-action sections keeps focus tight
- All widths now centrally managed via CSS variables

---

## 3. TYPOGRAPHY

### 3.1 Section Header Underline Width

**Status:** Completed
**Date:** 2025-12-24

**Solution:** Created CSS variables for header underline in `src/styles.css`.

**CSS Variables added:**
```css
:root {
  /* Section header underline */
  --header-underline-width: 80px;
  --header-underline-width-accent: 100px; /* Dark/accent sections - wider for visibility */
  --header-underline-gradient: linear-gradient(90deg, transparent, var(--color-gold), transparent);
}
```

**Files modified:**
- `src/styles.css` - Added CSS variables

**Light background sections (80px → variable):**
- `src/app/main/sections/intro-section/intro-section.component.css`
- `src/app/main/sections/pension-help-section/pension-help-section.component.ts`
- `src/app/main/sections/about-section/about-section.component.ts`
- `src/app/main/sections/services-section/services-section.component.css` (was 100px, fixed)
- `src/app/main/sections/why-me-section/why-me-section.component.ts`
- `src/app/main/sections/feedback-section/feedback-section.component.css`
- `src/app/main/sections/blog-preview-section/blog-preview-section.component.css`
- `src/app/main/sections/seo-section/seo-section.component.css` (was 100px, fixed)

**Dark background sections (120px → 100px via accent variable):**
- `src/app/main/sections/court-cases-section/court-cases-section.component.css`
- `src/app/main/sections/need-help-section/need-help-section.component.css`

**Pattern:**
| Background | Variable | Width | Sections |
|------------|----------|-------|----------|
| Light | `--header-underline-width` | 80px | intro, pension-help, about, services, why-me, feedback, blog-preview, seo |
| Dark/accent | `--header-underline-width-accent` | 100px | court-cases, need-help |

**Cleanup:**
- Removed responsive width override from intro-section (was changing to 100px at 768px breakpoint)
- Fixed services-section and seo-section from 100px to standard 80px
- Fixed court-cases and need-help from 120px to 100px

**Design rationale:**
- Wider underlines on dark backgrounds improve visibility
- Consistent 80px across all light sections creates visual harmony
- Gradient variable eliminates 5-line duplication in each section (reduced ~50 lines total)

---

### 3.2 Section Intro Text Sizes

**Status:** Completed
**Date:** 2025-12-24

**Solution:** Created responsive CSS variable for section intro text in `src/styles.css`.

**CSS Variables added:**
```css
:root {
  /* Section intro text - leads reader into section content */
  --section-intro-font-size: 1.1rem;
}

@media (min-width: 768px) {
  :root {
    --section-intro-font-size: 1.2rem;
  }
}
```

**Sections updated:**
| Section | Class | Before | After |
|---------|-------|--------|-------|
| intro-section | `.intro-tagline` | 1rem + responsive overrides | var |
| pension-help-section | `.problems-intro` | 1.1rem + responsive overrides | var |
| blog-preview-section | `.section-intro` | 1.05rem + responsive overrides | var |
| feedback-section | `.section-intro` | 1.05rem + responsive overrides | var |
| court-cases-section | `.section-intro` | 1.1rem + responsive overrides | var |
| need-help-section | `.description-main` | 1.1rem + responsive overrides | var |

**Cleanup:**
- Removed all responsive font-size overrides for intro text (variable handles responsiveness)
- Removed ~15 lines of redundant responsive CSS across 6 sections

**Design rationale:**
- 1.1rem on mobile provides readable intro text without overwhelming h2 headings
- 1.2rem on tablet+ adds subtle emphasis on larger screens
- Variable-based approach ensures consistency and simplifies maintenance

---

### 3.3 Body Text Colors

**Status:** Completed
**Date:** 2025-12-24

**Solution:** Created CSS variables for body text colors in `src/styles.css`.

**CSS Variables added:**
```css
:root {
  /* Body text colors - for content on light backgrounds */
  --text-color-primary: #444;
  --text-color-secondary: #666;
}
```

**Files modified:**

**CSS files:**
- `src/app/main/sections/intro-section/intro-section.component.css`
  - `.intro-tagline` → primary
  - `.trust-item span` → secondary
- `src/app/main/sections/blog-preview-section/blog-preview-section.component.css`
  - `.section-intro` → primary
  - `.blog-description` → secondary (was #555)
- `src/app/main/sections/services-section/services-section.component.css`
  - `.service-card p` → primary
- `src/app/main/sections/seo-section/seo-section.component.css`
  - `.seo-content p` → primary
  - `.intro-block p` → primary (was #333)
  - `.check-list li` → primary
  - `.block-note` → secondary
- `src/app/main/sections/feedback-section/feedback-section.component.css`
  - `.section-intro` → primary
  - `.feedback-text` → primary (was #333)
- `src/app/main/sections/court-cases-section/court-cases-section.component.css`
  - `.case-date` → secondary (was #777)

**TypeScript files (inline styles):**
- `src/app/main/sections/pension-help-section/pension-help-section.component.ts`
  - `.problems-intro` → primary
- `src/app/main/sections/about-section/about-section.component.ts`
  - `.about-text p` → primary (was #333)
- `src/app/main/sections/documents-section/documents-section.component.ts`
  - `p` → primary

**Color standardization:**
| Original | Mapped To | Variable |
|----------|-----------|----------|
| #444 | #444 | `--text-color-primary` |
| #333 | #444 | `--text-color-primary` |
| #555 | #666 | `--text-color-secondary` |
| #666 | #666 | `--text-color-secondary` |
| #777 | #666 | `--text-color-secondary` |

**Not changed (intentional):**
- `#4ade80` in court-cases (green success checkmark icon)
- `#f5b800` in feedback (gold star rating)

**Design rationale:**
- Two-tier hierarchy: primary (#444) for main content, secondary (#666) for supporting text
- Both colors pass WCAG AA contrast on light backgrounds
- Standardizing to CSS variables enables easy theming/dark mode in future

---

## 4. DECORATIVE PROPERTIES

### 4.1 Card Border Radius

**Status:** Completed
**Date:** 2025-12-24

**Solution:** Created CSS variables for card border radius in `src/styles.css`.

**CSS Variables added:**
```css
:root {
  /* Card border radius - 4.1 */
  --card-border-radius: 0.75rem;
  --card-border-radius-sm: 0.5rem; /* Smaller items like problem-item, trust-item */
}
```

**Files modified (0.75rem → var(--card-border-radius)):**
- `src/app/main/sections/blog-preview-section/blog-preview-section.component.css` - `.blog-card`
- `src/app/main/sections/services-section/services-section.component.css` - `.service-card`
- `src/app/main/sections/feedback-section/feedback-section.component.css` - `.feedback-card`
- `src/app/main/sections/seo-section/seo-section.component.css` - `.seo-block`, `.cta-block`
- `src/app/main/sections/court-cases-section/court-cases-section.component.css` - `.court-case-card`
- `src/app/main/sections/pension-help-section/pension-help-section.component.ts` - `.solution-content`
- `src/app/main/sections/about-section/about-section.component.ts` - `.image-frame`, `::after`, `.content-wrapper`

**Files modified (0.5rem → var(--card-border-radius-sm)):**
- `src/app/main/sections/pension-help-section/pension-help-section.component.ts` - `.problem-item`

**Not changed (intentional):**
- Photo container borders in `intro-section` (image-specific styling)
- Decorative elements like `.block-note`, `.highlight-text` (different semantic purpose)

---

### 4.2 Card Box Shadows

**Status:** Completed
**Date:** 2025-12-24

**Solution:** Created CSS variable for standard card box shadow in `src/styles.css`.

**CSS Variable added:**
```css
:root {
  /* Card box shadow - 4.2 (uses brand green for subtle warmth) */
  --card-box-shadow: 0 4px 16px rgba(0, 39, 6, 0.06), 0 1px 4px rgba(0, 39, 6, 0.04);
}
```

**Files modified:**
- `src/app/main/sections/blog-preview-section/blog-preview-section.component.css` - `.blog-card`
- `src/app/main/sections/services-section/services-section.component.css` - `.service-card`
- `src/app/main/sections/feedback-section/feedback-section.component.css` - `.feedback-card`
- `src/app/main/sections/seo-section/seo-section.component.css` - `.seo-block`

**Not changed (intentional exceptions):**
| Element | Shadow | Reason |
|---------|--------|--------|
| `.court-case-card` | `0 8px 32px rgba(0,0,0,0.2)` | Dark background needs stronger shadow |
| `.cta-block` | Custom with inset | Dark gradient block with premium feel |
| `.solution-content` | Custom stronger | Dark CTA block needs emphasis |
| `.image-frame` | Custom softer | Image containers have unique treatment |

**Design rationale:**
- Standard card shadow uses brand green (`rgba(0, 39, 6, ...)`) instead of pure black for subtle warmth
- Dark background elements keep stronger shadows for proper depth perception
- Variable enables easy adjustment of card depth across the site

---

### 4.3 Card Borders

**Status:** Completed
**Date:** 2025-12-24

**Solution:** Created CSS variable for card border in `src/styles.css`.

**CSS Variable added:**
```css
:root {
  /* Card border - 4.3 (gold-tinted for premium feel) */
  --card-border: 1px solid rgba(201, 165, 92, 0.2);
}
```

**Files modified:**
- `src/app/main/sections/services-section/services-section.component.css` - `.service-card`
- `src/app/main/sections/feedback-section/feedback-section.component.css` - `.feedback-card`
- `src/app/main/sections/seo-section/seo-section.component.css` - `.seo-block`
- `src/app/main/sections/blog-preview-section/blog-preview-section.component.css` - `.blog-card`
- `src/app/main/sections/pension-help-section/pension-help-section.component.ts` - `.solution-content`
- `src/app/main/sections/about-section/about-section.component.ts` - `.content-wrapper` (was 0.15, now 0.2)
- `src/app/main/sections/why-me-section/why-me-section.component.ts` - `.trust-item` (was 0.15, now 0.2)

**Also updated (bonus):**
- `why-me-section` `.trust-item` - `border-radius: 0.5rem` → `var(--card-border-radius-sm)`

**Not changed (intentional):**
| Element | Border | Reason |
|---------|--------|--------|
| `.problem-item` | `rgba(0, 39, 6, 0.08)` | Green-tinted for "problem" semantic |
| `.intro-badge` | `rgba(0, 39, 6, 0.08)` | Neutral items, different purpose |
| `.problem-icon-wrapper` | `rgba(0, 39, 6, 0.1)` | Icon wrapper, not a card |

**Standardization:**
- Previous: `0.15` and `0.2` opacity variants
- Now: All gold-tinted card borders use `0.2` opacity via variable

**Design rationale:**
- Gold-tinted border (`rgba(201, 165, 92, 0.2)`) creates subtle premium feel
- Matches the brand gold color at low opacity
- Green-tinted borders kept for neutral/problem items (different semantic purpose)

---

### 4.4 Icon Wrapper Sizes

**Status:** Completed
**Date:** 2025-12-24

**Solution:** Created CSS variables for 3-tier icon wrapper scale in `src/styles.css`.

**CSS Variables added:**
```css
:root {
  /* Icon wrapper sizes - 4.4 (3-tier scale) */
  --icon-wrapper-sm: 2.25rem; /* Small inline icons (checkmarks, list items) */
  --icon-wrapper-md: 2.5rem; /* Card icons (service icons, block icons) */
  --icon-wrapper-lg: 4rem; /* Section badges (documents, court-cases headers) */
}
```

**Files modified:**

**Small (--icon-wrapper-sm: 2.25rem):**
- `src/app/main/sections/why-me-section/why-me-section.component.ts` - `.check-wrapper`

**Medium (--icon-wrapper-md: 2.5rem):**
- `src/app/main/sections/services-section/services-section.component.css` - `.service-icon-wrapper`
- `src/app/main/sections/pension-help-section/pension-help-section.component.ts` - `.problem-icon-wrapper`
- `src/app/main/sections/seo-section/seo-section.component.css` - `.block-icon`

**Large (--icon-wrapper-lg: 4rem):**
- `src/app/main/sections/documents-section/documents-section.component.ts` - `.badge-icon`
- `src/app/main/sections/court-cases-section/court-cases-section.component.css` - `.header-badge`

**Not changed (intentional):**
| Element | Size | Reason |
|---------|------|--------|
| `need-help .section-badge` | `4.5rem` | Main CTA emphasis (larger for prominence) |
| Responsive desktop overrides | Various | Media query adjustments kept as explicit values |
| `feedback .reviewer-avatar` | `3.5rem` | Avatar, not icon wrapper |

**Design rationale:**
- 3-tier scale creates clear visual hierarchy
- Small: inline with text (checkmarks, indicators)
- Medium: card-level icons (services, features)
- Large: section-level badges (headers, focal points)
- Responsive overrides remain explicit for fine-tuned control

---

## 5. COLORS

### 5.1 Unlisted Hardcoded Colors

**Status:** Pending

---

### 5.2 CSS Variable Additions

**Status:** Pending

---
