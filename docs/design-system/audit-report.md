# Design Consistency Audit Report

**Date:** 2025-12-21
**Scope:** Main page sections (`/src/app/main/sections/`)

---

## 1. BUTTON STYLES

### 1.1 Primary CTA Buttons (Major Inconsistency)

| Location | Padding | Font Size | Font Weight | Border Radius |
|----------|---------|-----------|-------------|---------------|
| `intro-section.component.css:222` | `0.5rem` + `1.5rem` right | `1.05rem` | 600 | `3rem` |
| `need-help-section.component.css:170` | `1.25rem 2.5rem` | `1.15rem` | **700** | `3rem` |

**Recommendation:** Standardize to the `need-help` variant:
- Padding: `1rem 2rem` (balanced)
- Font-size: `1.1rem`
- Font-weight: `700` (primary actions should feel bolder)
- Border-radius: `3rem` ✓

**Why:** The intro CTA has asymmetric padding that looks cramped. Bolder weight for primary CTAs improves click-through hierarchy.

---

### 1.2 Secondary/Outline CTA Buttons (Moderate Inconsistency)

| Location | Padding | Font Size | Border Color |
|----------|---------|-----------|--------------|
| `services-section.component.css:180` | `0.875rem 1.75rem` | `1rem` | `var(--color-green)` |
| `feedback-section.component.css:306` | `0.875rem 1.75rem` | **`0.95rem`** | `var(--color-green)` |
| `blog-preview-section.component.css:227` | `0.875rem 1.75rem` | **`0.95rem`** | `var(--color-green)` |
| `court-cases-section.component.css:303` | **`1rem 2rem`** | `1rem` | `var(--color-gold)` |
| `about-section.component.ts:420` | `0.875rem 1.75rem` | `0.95rem` | **`rgba(0,39,6,0.2)`** |
| `documents-section.component.ts:106` | **`0.75rem 1.5rem`** | `0.95rem` | `rgba(0,39,6,0.2)` |

**Recommendation:** Standardize:
- Padding: `0.875rem 1.75rem` (most common)
- Font-size: `1rem`
- Border: `2px solid var(--color-green)` (light bg) or `var(--color-gold)` (dark bg)
- Border-radius: `2rem` ✓

**Why:** `documents-section` and `about-section` use smaller/weaker styles that break visual rhythm. Court-cases differs because of dark background (acceptable).

---

### 1.3 Border Radius Conflict

| Location | Border Radius |
|----------|---------------|
| Most outline buttons | `2rem` |
| `about-section.component.ts:431` | **`3rem`** |

**Recommendation:** Use `2rem` for outline buttons, `3rem` only for primary filled buttons.

**Why:** Creates clear visual hierarchy between primary and secondary actions.

---

## 2. SECTION SPACING

### 2.1 Section Padding (Mobile Base)

| Section | Padding |
|---------|---------|
| `intro-section` | `2rem 1rem 2.5rem` |
| `pension-help` | `3.5rem 1rem 3rem` |
| `about-section` | `3.5rem 1rem` |
| `services-section` | `3.5rem 1rem 3rem` |
| `why-me-section` | `3.5rem 1rem 3rem` |
| `documents-section` | **`3rem 1rem`** |
| `feedback-section` | `3.5rem 1rem 3rem` |
| `blog-preview-section` | `3.5rem 1rem 3rem` |
| `court-cases-section` | **`4rem 1rem 3.5rem`** |
| `seo-section` | `3.5rem 1rem 3rem` |
| `need-help-section` | **`4rem 1rem 3.5rem`** |

**Recommendation:** Standardize to `3.5rem 1rem 3rem` for most sections.
- `intro-section` can have less top padding (hero section)
- `court-cases` and `need-help` extra padding is acceptable (dark bg sections need breathing room)
- Fix `documents-section` to match at `3.5rem 1rem 3rem`

---

### 2.2 Section Max-Width

| Section | Max-Width |
|---------|-----------|
| Most sections | `1200px` |
| `seo-section` | `900px` |
| `why-me-section` | `900px` |
| `documents-section` | `800px` |
| `need-help-section` | `800px` |

**Recommendation:** Keep as-is. Narrower widths for text-heavy sections improve readability (ideal line length ~65-75 characters).

---

## 3. TYPOGRAPHY

### 3.1 Section Header Underline Width

| Section | Width |
|---------|-------|
| intro (h1::after) | `80px` |
| pension-help | `80px` |
| services | **`100px`** |
| why-me | `80px` |
| feedback | `80px` |
| blog-preview | `80px` |
| court-cases | **`120px`** |
| seo | **`100px`** |
| need-help | **`120px`** |

**Recommendation:** Standardize to `80px` for light backgrounds, `100px` for dark backgrounds (court-cases, need-help).

**Why:** Creates visual consistency; wider underlines on dark sections help visibility.

---

### 3.2 Section Intro Text Sizes

| Location | Font Size |
|----------|-----------|
| `intro-tagline` | `1rem` |
| `pension-help .problems-intro` | `1.1rem` |
| `feedback .section-intro` | `1.05rem` |
| `blog-preview .section-intro` | `1.05rem` |
| `court-cases .section-intro` | `1.1rem` |
| `need-help .description-main` | `1.1rem` |

**Recommendation:** Standardize to `1.05rem` for all section introductory text.

---

### 3.3 Body Text Colors

| Usage | Color |
|-------|-------|
| Most sections | `#444` |
| feedback, about | `#333` |
| blog description | `#555` |
| seo block-note | `#666` |
| court-cases date | `#777` |

**Recommendation:**
- Primary text: `#444` (or add `--color-text-primary: #444`)
- Secondary/meta text: `#666` (or add `--color-text-secondary: #666`)

---

## 4. DECORATIVE PROPERTIES

### 4.1 Card Border Radius (Mostly Consistent)

- Main cards: `0.75rem` ✓
- Smaller items (problem-item, trust-item): `0.5rem` ✓

**Status:** Good, keep as-is.

---

### 4.2 Card Box Shadows (Mostly Consistent)

Standard pattern:
```css
0 4px 16px rgba(0, 39, 6, 0.06),
0 1px 4px rgba(0, 39, 6, 0.04)
```

**Exception:** `court-cases-section.component.css:145` uses:
```css
0 8px 32px rgba(0, 0, 0, 0.2),
0 2px 8px rgba(0, 0, 0, 0.1)
```

**Recommendation:** Keep exception—darker shadows on dark backgrounds is correct.

---

### 4.3 Card Borders

| Location | Border |
|----------|--------|
| Most cards | `1px solid rgba(201, 165, 92, 0.2)` |
| `why-me-section.component.ts:143` | `1px solid rgba(201, 165, 92, 0.15)` |
| `problem-item` | `1px solid rgba(0, 39, 6, 0.08)` |

**Recommendation:** Standardize to `rgba(201, 165, 92, 0.2)` for gold-tinted borders.

---

### 4.4 Icon Wrapper Sizes

Current sizes vary significantly:
- `2.25rem` (why-me check-wrapper)
- `2.5rem` (services, pension-help, seo block-icon)
- `3rem` (format-icon-wrapper, seo cta-icon)
- `3.5rem` (feedback reviewer-avatar)
- `4rem` (court-cases header-badge, documents badge-icon)
- `4.5rem` (need-help section-badge)

**Recommendation:** Establish a scale:
- Small (inline with text): `2.25rem`
- Medium (card icons): `2.75rem`
- Large (section badges): `4rem`

---

## 5. COLORS (Hardcoded Values)

### 5.1 Unlisted Hardcoded Colors

| Color | Usage | Recommendation |
|-------|-------|----------------|
| `#003d0a` | Darker green gradients | Add `--color-green-dark` |
| `#001a04` | Darkest green (dark sections) | Add `--color-green-darkest` |
| `#a8854a` | Darker gold gradient | Add `--color-gold-dark` |
| `#f5b800` | Star rating | Add `--color-star` |
| `#4ade80` | Victory badge | Add `--color-success` |
| `#1a5c1a` / `#0d3d0d` | Victory badge bg | Use `--color-success` variants |

**Why:** Centralizing colors makes theme changes trivial and prevents drift.

---

### 5.2 CSS Variable Suggestion

Add to `styles.css:root`:
```css
--color-green-dark: #003d0a;
--color-green-darkest: #001a04;
--color-gold-dark: #a8854a;
--color-text-primary: #444;
--color-text-secondary: #666;
--color-star: #f5b800;
--color-success: #4ade80;
```

---

## 6. SUMMARY: Priority Fixes

### High Priority (Visual Disharmony)
1. **Button font sizes**: Standardize outline CTAs to `1rem`
2. **Button padding**: Fix `documents-section` (`0.75rem → 0.875rem`)
3. **About section border**: Change `rgba(0,39,6,0.2)` to `var(--color-green)` or match others

### Medium Priority (Consistency)
4. **Section padding**: Fix `documents-section` to `3.5rem 1rem 3rem`
5. **Header underlines**: Standardize to `80px` (light bg) / `100px` (dark bg)
6. **Intro text sizes**: Standardize to `1.05rem`

### Low Priority (Technical Debt)
7. Add missing CSS variables for hardcoded colors
8. Standardize icon wrapper sizes to a 3-tier scale
9. Unify card border opacity to `0.2`

---

## Notes

- **Why this matters for a business site:**
  1. **Trust signals** - Consistent UI subconsciously signals professionalism
  2. **Maintainability** - Standardized values make future updates faster
  3. **Responsive predictability** - Consistent base values simplify breakpoint logic
