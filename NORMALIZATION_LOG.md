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

**Status:** Pending

---

### 1.3 Border Radius Conflict

**Status:** Pending

---

## 2. SECTION SPACING

### 2.1 Section Padding

**Status:** Pending

---

### 2.2 Section Max-Width

**Status:** No action needed (intentional variation for readability)

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
