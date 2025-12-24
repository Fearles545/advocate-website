# Design System

Canonical design patterns for the advocate-pensia.com.ua website.

**Last Updated:** 2025-12-24

**Related Documents:**
- [`design-system/audit-report.md`](design-system/audit-report.md) — Initial design consistency audit
- [`design-system/normalization-log.md`](design-system/normalization-log.md) — Implementation tracking
- [`design-system/visual-review-desktop.md`](design-system/visual-review-desktop.md) — Desktop visual QA (1480px)

---

## 1. Colors

### Brand Colors

| Variable | Hex | Usage |
|----------|-----|-------|
| `--color-green` | `#002706` | Primary brand color, headings, text |
| `--color-green-dark` | `#003d0a` | Gradient endpoints |
| `--color-green-darkest` | `#001a04` | Dark section backgrounds |
| `--color-gold` | `#c9a55c` | Primary accent, CTAs |
| `--color-gold-accent` | `#bb925c` | Slightly darker gold for contrast |
| `--color-gold-dark` | `#a8854a` | Gold gradient endpoints |
| `--color-gold-light` | `#e0d6c1` | Light gold for borders, muted accents |

### Text Colors

| Variable | Hex | Usage |
|----------|-----|-------|
| `--text-color-primary` | `#444` | Body text, paragraphs |
| `--text-color-secondary` | `#666` | Meta text, dates, captions |

### Semantic Colors

| Variable | Value | Usage |
|----------|-------|-------|
| `--color-star` | `#f5b800` | Star ratings |
| `--color-success` | `#4ade80` | Victory badges, success indicators |
| `--color-success-bg` | `linear-gradient(135deg, #1a5c1a 0%, #0d3d0d 100%)` | Victory badge background |

### Usage on Backgrounds

| Background | Text Color | Accent Color |
|------------|------------|--------------|
| Light (`#fff`, `#f8f6f2`) | `--color-green`, `--text-color-primary` | `--color-gold-accent` |
| Dark (`--color-green-darkest`) | `white`, `--color-gold-light` | `--color-gold` |

---

## 2. Typography

### Font Stack

```css
--font-main: normal 400 16px/20px 'Lora', serif;
--font-heading: 'Cormorant Garamond', serif;
```

### Font Sizes

| Variable | Mobile | Desktop (768px+) | Usage |
|----------|--------|------------------|-------|
| `--font-size-h1` | `1.75rem` | `2.25rem` | Page titles |
| `--font-size-h2` | `1.5rem` | `1.75rem` | Section headings |
| `--font-size-h3` | `1.375rem` | `1.375rem` | Card titles |
| `--section-intro-font-size` | `1.1rem` | `1.2rem` | Section intro paragraphs |

### Font Weights

| Variable | Value | Usage |
|----------|-------|-------|
| `--weight-semibold` | `600` | Subheadings, emphasis |
| `--weight-bold` | `700` | Headings, buttons |

### Line Heights

| Context | Value |
|---------|-------|
| Headings | `1.3` |
| Body text | `1.55` - `1.7` |
| Intro paragraphs | `1.6` |

---

## 3. Spacing

### Section Padding

| Variable | Mobile | Desktop (768px+) | Usage |
|----------|--------|------------------|-------|
| `--section-padding-y` | `2rem` | `4rem` | Light background sections |
| `--section-padding-x` | `1rem` | `2rem` | Horizontal section padding |
| `--section-padding-y-accent` | `2.5rem` | `5rem` | Dark/accent sections (court-cases, need-help) |

### Section Max-Widths

| Variable | Value | Usage |
|----------|-------|-------|
| `--section-max-width` | `1200px` | Standard sections |
| `--section-max-width-narrow` | `900px` | Text-heavy sections (why-me, seo) |
| `--section-max-width-compact` | `800px` | Focused CTAs (documents, need-help) |

### General Spacing Scale

| Variable | Value |
|----------|-------|
| `--spacing-sm` | `1rem` |
| `--spacing-md` | `1.5rem` |
| `--spacing-lg` | `2rem` |
| `--spacing-xxl` | `4rem` |

---

## 4. Components

### 4.1 Primary CTA Button (`appCtaButton`)

Filled button with gradient background and optional icon.

```html
<!-- Green theme (default) - for light backgrounds -->
<a href="..." appCtaButton icon="call">Зателефонувати</a>

<!-- Gold theme - for dark backgrounds -->
<button appCtaButton theme="gold" icon="email">Надіслати</button>
```

**Properties:**
| Property | Value |
|----------|-------|
| Padding | `0.5rem` (icon area) + `1rem` text margin |
| Font size | `1.05rem` → `1.1rem` (640px+) |
| Font weight | `600` |
| Border radius | `3rem` |
| Icon wrapper | `2.5rem` circle |

**Themes:**
| Theme | Background | Text | Shadow |
|-------|------------|------|--------|
| `green` | Green gradient | `--color-gold` | `rgba(0, 39, 6, ...)` |
| `gold` | Gold gradient | `--color-green-darkest` | `rgba(168, 133, 74, ...)` |

**Effects:**
- Shimmer animation (4s loop)
- Icon shake on hover (0.4s)
- `translateY(-2px)` lift on hover
- Gradient position shift on hover

---

### 4.2 Outline CTA Button (`appCtaOutlineButton`)

Transparent button with border, fills on hover.

```html
<!-- Green theme (default) - for light backgrounds -->
<a routerLink="..." appCtaOutlineButton>Детальніше</a>

<!-- Gold theme - for dark backgrounds -->
<a routerLink="..." appCtaOutlineButton theme="gold" icon="arrow_forward">Усі справи</a>
```

**Properties:**
| Property | Value |
|----------|-------|
| Padding | `1rem 1.5rem` |
| Font size | `0.9rem` → `1.05rem` (640px+) |
| Font weight | `600` |
| Border | `2px solid` |
| Border radius | `3rem` |
| Icon | `arrow_forward` (default), `1.5rem` circle |

**Themes:**
| Theme | Border Color | Text | Hover Fill |
|-------|--------------|------|------------|
| `green` | `rgba(0, 39, 6, 0.2)` | `--color-green` | Green gradient |
| `gold` | `rgba(201, 165, 92, 0.3)` | `--color-gold` | Gold gradient |

**Effects:**
- Gradient fill via `::before` on hover
- `translateY(-3px)` lift on hover
- Icon `translateX(4px)` shift on hover

---

### 4.3 Cards

Standard card styling for content containers.

```css
.card {
  background: white;
  border-radius: var(--card-border-radius); /* 0.75rem */
  border: var(--card-border); /* 1px solid rgba(201, 165, 92, 0.2) */
  box-shadow: var(--card-box-shadow);
  transition: transform var(--transition-normal), box-shadow var(--transition-normal);
}

.card:hover {
  transform: translateY(-4px);
  border-color: rgba(201, 165, 92, 0.4);
  box-shadow: 0 12px 32px rgba(0, 39, 6, 0.1), 0 4px 12px rgba(0, 39, 6, 0.06);
}
```

**Variables:**
| Variable | Value | Usage |
|----------|-------|-------|
| `--card-border-radius` | `0.75rem` | Standard cards |
| `--card-border-radius-sm` | `0.5rem` | Small items (list items, tags) |
| `--card-border` | `1px solid rgba(201, 165, 92, 0.2)` | Gold-tinted border |
| `--card-box-shadow` | `0 4px 16px rgba(0, 39, 6, 0.06), 0 1px 4px rgba(0, 39, 6, 0.04)` | Subtle green-tinted shadow |

**Dark Background Exception:**
Cards on dark backgrounds (court-cases) use stronger shadows:
```css
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2), 0 2px 8px rgba(0, 0, 0, 0.1);
```

---

### 4.4 Icon Wrappers

Three-tier scale for icon containers.

| Variable | Size | Usage | Border Radius |
|----------|------|-------|---------------|
| `--icon-wrapper-sm` | `2.25rem` | Inline checkmarks, list icons | `50%` |
| `--icon-wrapper-md` | `2.5rem` | Card icons, feature icons | `0.5rem` |
| `--icon-wrapper-lg` | `4rem` | Section header badges | `50%` |

**Icon Wrapper Pattern:**
```css
.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--icon-wrapper-md);
  height: var(--icon-wrapper-md);
  min-width: var(--icon-wrapper-md);
  background: linear-gradient(135deg, var(--color-green) 0%, var(--color-green-dark) 100%);
  border-radius: 0.5rem; /* or 50% for circular */
  box-shadow: 0 4px 12px rgba(0, 39, 6, 0.2), inset 0 1px 0 rgba(201, 165, 92, 0.1);
}

.icon-wrapper mat-icon {
  color: var(--color-gold);
}
```

---

### 4.5 Section Headers

Centered heading with gold underline.

```css
.section-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.section-header h2 {
  margin: 0;
  position: relative;
  display: inline-block;
  padding-bottom: 1.25rem;
}

.section-header h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: var(--header-underline-width); /* 80px light, 100px dark */
  height: 3px;
  background: var(--header-underline-gradient);
  border-radius: 2px;
}
```

| Variable | Value | Usage |
|----------|-------|-------|
| `--header-underline-width` | `80px` | Light background sections |
| `--header-underline-width-accent` | `100px` | Dark background sections |
| `--header-underline-gradient` | `linear-gradient(90deg, transparent, var(--color-gold), transparent)` | Fading gold line |

---

## 5. Section Backgrounds

### Light Sections

```css
.section-bg {
  background: linear-gradient(180deg, #f8f6f2 0%, #ffffff 100%);
  /* or reverse: #ffffff 0%, #f8f6f2 100% */
  position: relative;
}

/* Gold separator line at top */
.section-bg::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--color-gold-light) 20%,
    var(--color-gold) 50%,
    var(--color-gold-light) 80%,
    transparent 100%
  );
}
```

### Dark Sections (court-cases, need-help)

```css
.dark-section-bg {
  background: linear-gradient(
    135deg,
    var(--color-green-darkest) 0%,
    var(--color-green) 50%,
    var(--color-green-darkest) 100%
  );
  position: relative;
  overflow: hidden;
}

/* Decorative glow effect */
.section-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(201, 165, 92, 0.08) 0%, transparent 70%);
  pointer-events: none;
}
```

### Section Content Container

```css
.section-content {
  max-width: var(--section-max-width);
  margin: 0 auto;
  padding: var(--section-padding-y) var(--section-padding-x);
}
```

---

## 6. Animations & Transitions

### Standard Transition

```css
--transition-normal: 0.3s ease;
```

### Bouncy Transition (for interactive elements)

```css
transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
```

### Hover Effects

| Element | Effect |
|---------|--------|
| Cards | `translateY(-4px)` to `translateY(-6px)` |
| Primary buttons | `translateY(-2px)` |
| Outline buttons | `translateY(-3px)` |
| Icon wrappers | `scale(1.05)` |
| Arrows/icons | `translateX(4px)` |

### Shimmer Animation (Primary CTA)

```css
@keyframes shimmer {
  0% { left: -100%; }
  50%, 100% { left: 100%; }
}
/* Duration: 4s, ease-in-out, infinite */
```

### Icon Shake Animation (Primary CTA hover)

```css
@keyframes icon-shake {
  0%, 100% { transform: scale(1.05) rotate(0deg); }
  25% { transform: scale(1.05) rotate(-8deg); }
  75% { transform: scale(1.05) rotate(8deg); }
}
/* Duration: 0.4s, ease-in-out */
```

---

## 7. Responsive Breakpoints

| Variable | Value | Usage |
|----------|-------|-------|
| `--breakpoint-mobile` | `767px` | max-width for mobile |
| `--breakpoint-tablet` | `768px` | min-width for tablet+ |
| `--breakpoint-desktop` | `1200px` | min-width for desktop |

### Media Query Pattern

```css
/* Mobile first - base styles are mobile */

@media (min-width: 640px) {
  /* Small tablets, 2-column grids */
}

@media (min-width: 768px) {
  /* Tablets - section padding increases */
}

@media (min-width: 1024px) {
  /* Desktop - 3-column grids */
}

@media (max-width: 479px) {
  /* Small mobile - reduced font sizes */
}
```

### Responsive CSS Variables

The following variables update at `768px`:
- `--section-padding-y`: `2rem` → `4rem`
- `--section-padding-x`: `1rem` → `2rem`
- `--section-padding-y-accent`: `2.5rem` → `5rem`
- `--section-intro-font-size`: `1.1rem` → `1.2rem`

At `479px` (max-width):
- `--font-size-h1`: `2.25rem` → `1.75rem`
- `--font-size-h2`: `1.75rem` → `1.5rem`

---

## 8. Grid Patterns

### Service/Feature Cards

```css
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}

@media (min-width: 640px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
  .grid { gap: 1.5rem; }
  /* Some grids expand to 3 columns at this breakpoint */
}
```

### Blog/Case Cards

```css
@media (min-width: 640px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}
```

---

## 9. Quick Reference

### Creating a New Section

```html
<section class="my-section-bg">
  <div class="my-section">
    <div class="section-header">
      <h2>Section Title</h2>
    </div>
    <!-- content -->
  </div>
</section>
```

```css
.my-section-bg {
  background: linear-gradient(180deg, #f8f6f2 0%, #ffffff 100%);
  position: relative;

  &::before {
    /* gold separator - copy from services-section */
  }
}

.my-section {
  max-width: var(--section-max-width);
  margin: 0 auto;
  padding: var(--section-padding-y) var(--section-padding-x);
}

.section-header {
  text-align: center;
  margin-bottom: 2.5rem;

  h2 {
    margin: 0;
    position: relative;
    display: inline-block;
    padding-bottom: 1.25rem;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: var(--header-underline-width);
      height: 3px;
      background: var(--header-underline-gradient);
      border-radius: 2px;
    }
  }
}
```

### Creating a Card

```css
.my-card {
  background: white;
  padding: 1.5rem;
  border-radius: var(--card-border-radius);
  border: var(--card-border);
  box-shadow: var(--card-box-shadow);
  transition:
    transform var(--transition-normal),
    box-shadow var(--transition-normal),
    border-color var(--transition-normal);

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(201, 165, 92, 0.4);
    box-shadow: 0 12px 32px rgba(0, 39, 6, 0.1), 0 4px 12px rgba(0, 39, 6, 0.06);
  }
}
```

---

## 10. Files Reference

| File | Purpose |
|------|---------|
| `src/styles.css` | Global CSS variables |
| `src/app/shared/components/cta-button/` | Primary CTA component |
| `src/app/shared/components/cta-outline-button/` | Outline CTA component |
| `docs/DESIGN_SYSTEM.md` | This document |
| `NORMALIZATION_LOG.md` | Change history for design normalization |
