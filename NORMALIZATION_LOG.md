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

**Status:** Pending

---

### 3.2 Section Intro Text Sizes

**Status:** Pending

---

### 3.3 Body Text Colors

**Status:** Pending

---

## 4. DECORATIVE PROPERTIES

### 4.1 Card Border Radius

**Status:** No action needed (already consistent)

---

### 4.2 Card Box Shadows

**Status:** No action needed (exception for dark bg is correct)

---

### 4.3 Card Borders

**Status:** Pending

---

### 4.4 Icon Wrapper Sizes

**Status:** Pending

---

## 5. COLORS

### 5.1 Unlisted Hardcoded Colors

**Status:** Pending

---

### 5.2 CSS Variable Additions

**Status:** Pending

---
