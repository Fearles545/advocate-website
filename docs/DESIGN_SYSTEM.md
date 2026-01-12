# Design System

Canonical design patterns for the advocate-pensia.com.ua website.

**Last Updated:** 2026-01-12

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

**Aliases** (for `--color-*` naming consistency):

| Alias | Points to |
|-------|-----------|
| `--color-text-primary` | `var(--text-color-primary)` |
| `--color-text-secondary` | `var(--text-color-secondary)` |

### Semantic Colors

| Variable | Value | Usage |
|----------|-------|-------|
| `--color-star` | `#f5b800` | Star ratings |
| `--color-success` | `#4ade80` | Victory badges, success indicators |
| `--color-success-bg` | `linear-gradient(135deg, #1a5c1a 0%, #0d3d0d 100%)` | Victory badge background |

### Alpha Color Variants

Pre-defined opacity variants for shadows, overlays, and borders. Use these instead of inline `rgba()` for consistency.

**Green Alpha (for shadows, subtle overlays):**

| Variable | Value | Usage |
|----------|-------|-------|
| `--green-alpha-03` | `rgba(0, 39, 6, 0.03)` | Very subtle shadows |
| `--green-alpha-04` | `rgba(0, 39, 6, 0.04)` | Card shadow secondary |
| `--green-alpha-06` | `rgba(0, 39, 6, 0.06)` | Card shadow primary |
| `--green-alpha-08` | `rgba(0, 39, 6, 0.08)` | Hover shadow light |
| `--green-alpha-10` | `rgba(0, 39, 6, 0.1)` | Hover shadow medium |
| `--green-alpha-15` | `rgba(0, 39, 6, 0.15)` | Overlays |
| `--green-alpha-20` | `rgba(0, 39, 6, 0.2)` | Badge inset shadows |
| `--green-alpha-25` | `rgba(0, 39, 6, 0.25)` | Strong overlays |
| `--green-alpha-30` | `rgba(0, 39, 6, 0.3)` | Dark overlays |

**Gold Alpha (for borders, accents, glows):**

| Variable | Value | Usage |
|----------|-------|-------|
| `--gold-alpha-06` | `rgba(201, 165, 92, 0.06)` | Very subtle gold tint |
| `--gold-alpha-10` | `rgba(201, 165, 92, 0.1)` | Light borders |
| `--gold-alpha-15` | `rgba(201, 165, 92, 0.15)` | Hover backgrounds |
| `--gold-alpha-20` | `rgba(201, 165, 92, 0.2)` | Card borders, borders |
| `--gold-alpha-30` | `rgba(201, 165, 92, 0.3)` | Focus rings |
| `--gold-alpha-35` | `rgba(201, 165, 92, 0.35)` | Badge shadows |
| `--gold-alpha-40` | `rgba(201, 165, 92, 0.4)` | Badge borders, glow effects |

### Usage on Backgrounds

| Background | Text Color | Accent Color |
|------------|------------|--------------|
| Light (`#fff`, `#f8f6f2`) | `--color-green`, `--text-color-primary` | `--color-gold-accent` |
| Dark (`--color-green-darkest`) | `white`, `--color-gold-light` | `--color-gold` |

### Gradient Tokens

Reusable gradient definitions for consistent visual elements across the site.

**Gold Separators (horizontal divider lines):**

```css
/* Full fade - visible from 20% to 80% of width */
--gold-separator: linear-gradient(
  90deg,
  transparent 0%,
  var(--color-gold-light) 20%,
  var(--color-gold) 50%,
  var(--color-gold-light) 80%,
  transparent 100%
);

/* Center fade - subtler, only visible in center portion */
--gold-separator-center: linear-gradient(
  90deg,
  transparent 0%,
  var(--color-gold) 50%,
  transparent 100%
);
```

**Background Gradients:**

```css
/* Green gradient - for dark sections, icon wrappers, badges */
--green-gradient: linear-gradient(
  135deg,
  var(--color-green) 0%,
  var(--color-green-dark) 100%
);

/* Gold highlight - for callout boxes */
--gold-highlight-gradient: linear-gradient(
  90deg,
  var(--gold-alpha-06) 0%,
  var(--gold-alpha-10) 50%,
  var(--gold-alpha-06) 100%
);
```

---

## 2. Typography

### Font Stack

```css
--font-main: normal 400 16px/20px 'Lora', serif;
```

### Font Sizes

**Headings:**

| Variable | Mobile (<480px) | Default | Usage |
|----------|-----------------|---------|-------|
| `--font-size-h1` | `1.75rem` | `2.25rem` | Page titles |
| `--font-size-h2` | `1.5rem` | `1.75rem` | Section headings |
| `--font-size-h3` | `1.375rem` | `1.375rem` | Card titles |
| `--section-intro-font-size` | `1.1rem` | `1.2rem` (768px+) | Section intro paragraphs |

**Body Text:**

| Variable | Value | Usage |
|----------|-------|-------|
| `--font-size-body-lg` | `1.05rem` | Large body text, lead paragraphs |
| `--font-size-body` | `0.95rem` | Standard body text |

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

### Container Utility

Global container class for consistent max-width and centering:

```css
--container-max-width: 1200px;

.container {
  max-width: var(--container-max-width);
  margin: 0 auto;
}
```

Used by header and footer components for layout consistency.

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
  border-color: var(--gold-alpha-40);
  box-shadow: 0 12px 32px var(--green-alpha-10), 0 4px 12px var(--green-alpha-06);
}
```

**Variables:**
| Variable | Value | Usage |
|----------|-------|-------|
| `--card-border-radius` | `0.75rem` | Standard cards |
| `--card-border-radius-sm` | `0.5rem` | Small items (list items, tags) |
| `--card-border` | `1px solid var(--gold-alpha-20)` | Gold-tinted border |
| `--card-box-shadow` | `0 4px 16px var(--green-alpha-06), 0 1px 4px var(--green-alpha-04)` | Subtle green-tinted shadow |

**Dark Background Exception:**
Cards on dark backgrounds (court-cases) use stronger shadows:
```css
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2), 0 2px 8px rgba(0, 0, 0, 0.1);
```

---

### 4.4 Icon Wrappers

Three-tier scale for icon containers with multiple visual variants.

**Size Scale:**

| Variable | Size | Usage | Border Radius |
|----------|------|-------|---------------|
| `--icon-wrapper-sm` | `2.25rem` | Inline checkmarks, list icons | `50%` |
| `--icon-wrapper-md` | `2.5rem` | Card icons, feature icons | `0.5rem` |
| `--icon-wrapper-lg` | `4rem` | Section header badges | `50%` |

**Variant 1: Green Gradient (Light Backgrounds)**

Default for cards on light backgrounds. Green gradient with gold icon.

```css
.icon-wrapper-green {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--icon-wrapper-md);
  height: var(--icon-wrapper-md);
  min-width: var(--icon-wrapper-md);
  background: var(--green-gradient);
  border-radius: 0.5rem; /* or 50% for circular */
  box-shadow:
    0 4px 12px rgba(0, 39, 6, 0.2),
    inset 0 1px 0 rgba(201, 165, 92, 0.1);
  transition:
    transform 0.3s var(--ease-bounce),
    box-shadow var(--transition-normal);

  mat-icon {
    color: var(--color-gold);
  }
}
```

**Variant 2: Translucent Gold (Dark Backgrounds)**

For icons inside dark sections or action cards. Transparent gold with border.

```css
.icon-wrapper-gold-translucent {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  min-width: 3rem;
  background: rgba(201, 165, 92, 0.15);
  border-radius: 50%;
  border: 2px solid var(--color-gold);

  mat-icon {
    color: var(--color-gold);
  }
}
```

**Variant 3: Gold Gradient (Headers/Accents)**

For section header badges. Full gold gradient with green icon.

```css
.icon-wrapper-gold {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--icon-wrapper-lg);
  height: var(--icon-wrapper-lg);
  background: linear-gradient(
    135deg,
    var(--color-gold) 0%,
    var(--color-gold-dark) 100%
  );
  border-radius: 50%;
  box-shadow:
    0 4px 20px rgba(201, 165, 92, 0.4),
    0 0 40px rgba(201, 165, 92, 0.2);

  mat-icon {
    color: var(--color-green);
  }
}
```

**When to Use Each Variant:**

| Context | Variant | Shape | Size |
|---------|---------|-------|------|
| Cards on light backgrounds | Green Gradient | Rounded/Circular | md |
| Inside dark sections | Translucent Gold | Circular | 3rem |
| Section header badges | Gold Gradient | Circular | lg |
| Action cards (CTAs) | Translucent Gold | Circular | 3rem |

**Shape Guidelines:**
- **Rounded square** (`0.5rem`): Service cards, block icons
- **Circular** (`50%`): Qualification cards, badges, avatars, headers

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

### 4.6 Page Header Pattern (Signature)

The signature page header pattern creates a recognizable, branded look across content pages (court-cases, feedbacks, blog list, etc.).

**Structure:**
```html
<section class="page-bg-pattern">
  <div class="page-content">
    <header class="page-header">
      <div class="page-header-badge">
        <mat-icon>gavel</mat-icon>
      </div>
      <h1>Page Title Here</h1>
      <p class="page-intro">Optional intro paragraph...</p>
    </header>
    <!-- page content -->
  </div>
</section>
```

**Visual Elements:**

| Element | Description |
|---------|-------------|
| Background | SVG pattern + cream gradient (full viewport width) |
| Badge | Circular icon, green gradient bg, gold icon |
| H1 | Centered, gold underline via `::after` |
| Intro | Centered paragraph below title |

**Background Pattern:**
```css
.page-bg-pattern {
  background:
    url('/assets/images/main/first-section.pattern.svg'),
    linear-gradient(180deg, #f5f2ed 0%, #faf8f5 50%, #f5f2ed 100%);
}
```

**Badge Sizing:**

| Breakpoint | Badge Size | Icon Size |
|------------|------------|-----------|
| Mobile (<480px) | `3.5rem` | `1.75rem` |
| Default | `4rem` | `2rem` |
| Tablet (768px+) | `4.5rem` | `2.25rem` |

**Entrance Animations — "Judicial Reveal":**

The Page Header Pattern includes built-in entrance animations for a premium feel:

| Element | Animation | Duration | Delay | Easing |
|---------|-----------|----------|-------|--------|
| Badge | Scale + gold pulse | 0.8s | 0s | `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| H1 | Rise + letter-spacing | 0.7s | 0.3s | `cubic-bezier(0.22, 1, 0.36, 1)` |
| Intro | Fade up | 0.6s | 0.5s | `ease-out` |
| Intro (secondary) | Fade up | 0.6s | 0.6s | `ease-out` |

**Keyframes (in styles.css):**
- `badgeReveal` — Scale from 0.6 with gold glow pulse at 60%
- `titleReveal` — TranslateY with subtle letter-spacing change
- `introReveal` — Simple fade-up

**Animation Design Philosophy:**
- Badge appears first as the visual anchor point
- Title follows when badge "lands" (0.3s delay)
- Intro text fades in as user processes the title
- Staggered timing creates sense of orchestrated reveal

**Usage Guidelines:**
- Use for standalone content pages (not homepage sections)
- Badge icon should represent the page content (gavel for court cases, people for feedbacks, etc.)
- H1 must use the gold underline pattern for consistency
- Background extends full viewport width; content container uses `--section-max-width`
- Animations are automatic — no extra classes needed

**CSS Classes (in styles.css):**
- `.page-bg-pattern` — Full-width patterned background
- `.page-header` — Centered header container
- `.page-header-badge` — Circular icon badge (includes `badgeReveal` animation)
- `.page-intro` — Intro paragraph styling (includes `introReveal` animation)

**Page Intro Secondary Variant:**

For pages with multiple intro paragraphs, use the `.secondary` modifier for supporting text:

```css
.page-intro.secondary {
  color: var(--text-color-secondary);
  font-size: 1rem;
  animation-delay: 0.6s;
}
```

```html
<p class="page-intro">Primary intro text with main message.</p>
<p class="page-intro secondary">Secondary, supporting context.</p>
```

The secondary variant uses muted text color and an additional 0.1s animation delay to create visual hierarchy.

---

### 4.7 Photo Frame with Offset Border

Gold offset border effect creating a layered, premium look for profile photos. Available as a global `.photo-frame` class in `styles.css`.

```css
.photo-frame {
  --photo-frame-offset: 10px;
  position: relative;
  border-radius: 0.5rem;
  background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);

  &::before {
    content: '';
    position: absolute;
    top: var(--photo-frame-offset);
    left: var(--photo-frame-offset);
    right: calc(var(--photo-frame-offset) * -1);
    bottom: calc(var(--photo-frame-offset) * -1);
    border: 3px solid var(--color-gold);
    border-radius: 0.5rem;
    z-index: 0;
  }

  img {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.5rem;
  }
}
```

**Component Usage (sizing only):**
```css
.photo-frame {
  width: 100%;
  max-width: 280px;
  aspect-ratio: 300 / 472;
}

@media (min-width: 1024px) {
  .photo-frame {
    --photo-frame-offset: 14px; /* Larger offset on desktop */
  }
}
```

**Used in:** about-me, contacts, intro-section

---

### 4.8 Content Wrapper (Frosted Glass)

Premium card container with frosted glass effect for elevated content areas.

```css
.content-wrapper {
  position: relative;
  padding: 2rem 1.5rem;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: var(--card-border-radius);
  border: var(--card-border);
  box-shadow:
    0 4px 24px rgba(0, 39, 6, 0.04),
    0 1px 4px rgba(0, 39, 6, 0.02);
}
```

**Key Characteristics:**
- Semi-transparent white background (70% opacity)
- `backdrop-filter: blur(10px)` for glass effect
- Requires `-webkit-` prefix for Safari support
- Softer shadows than standard cards

**Used in:** about-me, about-section (main page)

---

### 4.9 Section Label (Golden Eyebrow)

Uppercase gold label with em-dash decorations, used above section headings for context.

```css
.section-label {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: var(--color-gold);
  margin-bottom: 0.75rem;

  &::before, &::after {
    content: '—';
    margin: 0 0.5rem;
    opacity: 0.5;
  }
}
```

**Desktop Variant (left-aligned layouts):**
```css
@media (min-width: 768px) {
  .section-label::before {
    display: none; /* Hide left em-dash when left-aligned */
  }
}
```

**Used in:** about-section (main page)

---

### 4.10 Decorative Quote Marks

Large decorative quotation marks for testimonial or about sections.

```css
.quote-mark {
  position: absolute;
  font-family: 'Cormorant Garamond', 'Georgia', serif;
  font-size: 6rem;
  font-weight: 600;
  line-height: 1;
  color: var(--color-gold);
  opacity: 0.15;
  pointer-events: none;
  user-select: none;
}

.quote-open {
  top: -0.5rem;
  left: 0.5rem;
}

.quote-close {
  bottom: 0;
  right: 0.5rem;
  transform: rotate(180deg);
}
```

**Responsive Scaling:**

| Breakpoint | Font Size | Position |
|------------|-----------|----------|
| Mobile | `6rem` | Inside container |
| 480px+ | `7rem` | Inside container |
| 768px+ | `8rem` | Inside container |
| 1024px+ | `9rem` | Outside (negative offset) |

**Used in:** about-me, about-section (main page)

---

### 4.11 Highlight Box (Callout)

Emphasized callout/blockquote with gold gradient background and left border accent. Available as a global `.highlight-box` class in `styles.css`.

```css
.highlight-box {
  padding: 1rem 1.25rem;
  background: var(--gold-highlight-gradient);
  border-radius: 0.5rem;
  border-left: 3px solid var(--color-gold);
}
```

**Component Extensions:**
```css
/* Italic quote variant (about-me) */
.highlight-text {
  font-style: italic;
  color: var(--color-green);
}

/* Solid background variant (seo-section) */
.block-note {
  padding: 0.75rem 1rem;
  background: var(--gold-alpha-06); /* Override gradient */
}
```

**HTML Usage:**
```html
<p class="highlight-box highlight-text">Emphasized quote here...</p>
<div class="highlight-box schedule-badge">Schedule content...</div>
```

**Used in:** about-me, contacts, documents, seo-section

---

### 4.12 Navigation Links with Divider

Bottom-of-section navigation pattern with gradient vertical divider between links.

```css
.cta-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
}

.nav-divider {
  width: 1px;
  height: 1.5rem;
  background: linear-gradient(
    180deg,
    transparent 0%,
    var(--color-gold) 50%,
    transparent 100%
  );
}

.nav-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: var(--color-green);
  font-weight: 600;

  mat-icon {
    color: var(--color-gold);
    transition: transform 0.3s var(--ease-bounce);
  }

  &:hover mat-icon {
    transform: translateX(4px);
  }
}
```

**Used in:** contacts, documents

---

### 4.13 Service Card Pattern

Card container for displaying services, qualifications, or features with icon, title, and description.

**Base Pattern:**
```css
.service-card {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  background: white;
  padding: 1.25rem;
  border-radius: var(--card-border-radius);
  border: var(--card-border);
  box-shadow: var(--card-box-shadow);
  transition:
    transform var(--transition-normal),
    box-shadow var(--transition-normal),
    border-color var(--transition-normal);

  &:hover {
    transform: translateY(-2px);
    box-shadow:
      0 8px 24px rgba(0, 39, 6, 0.08),
      0 2px 8px rgba(0, 39, 6, 0.04);
    border-color: rgba(201, 165, 92, 0.4);

    .service-icon-wrapper {
      transform: scale(1.05);
    }

    h3 {
      color: var(--color-gold-accent);
    }
  }
}
```

**Card Header:**
```css
.service-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;

  h3 {
    margin: 0;
    font-size: var(--font-size-card-title);
    font-weight: 700;
    color: var(--color-green);
    transition: color var(--transition-normal);
  }
}
```

**Card Variants:**

| Variant | Layout | Icon Shape | Use Case |
|---------|--------|------------|----------|
| `.main-service-card` | Column | Rounded square | Primary services with features list |
| `.additional-service-card` | Column | Circular | Secondary services |
| `.qualification-card` | Row | Circular | Credentials, qualifications |
| `.service-card` | Column | Rounded square | Generic service display |

**Responsive Padding:**
- Mobile (< 480px): `1rem` - `1.25rem`
- Tablet (768px+): `1.5rem` - `1.75rem`
- Desktop (1024px+): `2rem`

**Used in:** services, about-me, services-section (main page)

---

### 4.14 Prominent Action Card

High-emphasis card for primary actions (calls, external links). Uses green gradient background.

```css
.prominent-action-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: var(--green-gradient);
  border-radius: var(--card-border-radius);
  text-decoration: none;
  color: white;
  box-shadow:
    0 4px 20px var(--green-alpha-25),
    0 2px 8px var(--green-alpha-15);
  transition: all 0.3s var(--ease-standard);
  position: relative;
  overflow: hidden;

  /* Gold shimmer on hover */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, transparent 0%, var(--gold-alpha-10) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 28px var(--green-alpha-30);

    &::before { opacity: 1; }
  }
}

.prominent-action-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  background: var(--gold-alpha-20);
  border: 2px solid var(--color-gold);
  border-radius: 50%;

  mat-icon { color: var(--color-gold); }
}
```

**Variations:**
- `.primary-contact` (contacts) — Phone call action with number display
- `.registry-card` (documents) — External link with logo and action text

**Used in:** contacts, documents

---

### 4.15 Expand/Toggle Button

Expandable content toggle with animated icon for "show more" patterns.

```css
.expand-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 2rem auto 0;
  padding: 0.75rem 1.5rem;
  background: transparent;
  border: 2px solid var(--green-alpha-20);
  border-radius: 3rem;
  font-size: var(--font-size-body);
  font-weight: 600;
  color: var(--color-green);
  cursor: pointer;
  transition: all 0.3s var(--ease-standard);

  mat-icon {
    transition: transform 0.3s var(--ease-bounce);

    &.rotated {
      transform: rotate(180deg);
    }
  }

  &:hover {
    background: var(--green-alpha-06);
    border-color: var(--color-green);

    mat-icon:not(.rotated) {
      animation: bounceDown 0.4s ease;
    }
  }
}

@keyframes bounceDown {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(4px); }
}
```

**Usage:**
```html
<button class="expand-btn" (click)="toggle()">
  {{ expanded ? 'Згорнути' : 'Показати більше' }}
  <mat-icon [class.rotated]="expanded">keyboard_arrow_down</mat-icon>
</button>
```

**Used in:** documents (`.show-more-btn`), seo-section (`.seo-toggle-btn`)

---

### 4.16 Blog Content Typography (`.blog-post-section`)

Premium article typography for blog post content. Provides consistent, readable styling for rendered HTML content.

**Base Typography:**

| Property | Value | Purpose |
|----------|-------|---------|
| `font-size` | `1.05rem` | Comfortable reading size |
| `line-height` | `1.7` | Generous spacing for readability |
| `font-weight` | `400` | Light body text, bold reserved for emphasis |
| `color` | `var(--text-color-primary)` | Standard body text color |

**Heading Styles:**

```css
.blog-post-section h2 {
  font-size: 1.375rem;
  font-weight: 700;
  color: var(--color-green);
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(201, 165, 92, 0.2);
}

.blog-post-section h3 {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--color-green);
}
```

**Links:**

```css
.blog-post-section a {
  color: var(--color-gold-accent);
  text-decoration: underline;
  text-decoration-color: rgba(201, 165, 92, 0.4);
  text-underline-offset: 2px;
}

.blog-post-section a:hover {
  color: var(--color-green);
  text-decoration-color: var(--color-green);
}
```

**Lists - Custom Gold Markers:**

Unordered lists use gold circular bullets, ordered lists use gold-colored numbers.

```css
/* Unordered list */
.blog-post-section ul li::before {
  content: '';
  width: 6px;
  height: 6px;
  background: var(--color-gold);
  border-radius: 50%;
}

/* Ordered list */
.blog-post-section ol li::before {
  content: counter(list-counter) '.';
  font-weight: 700;
  color: var(--color-gold);
}
```

**Horizontal Rule:**

Uses the signature gold separator gradient instead of browser default.

```css
.blog-post-section hr {
  border: none;
  height: 1px;
  background: var(--gold-separator-center);
}
```

**Blockquote / `.blog-quote`:**

Premium callout styling with decorative quote mark.

```css
.blog-post-section blockquote,
.blog-post-section .blog-quote {
  padding: 1.25rem 1.5rem;
  background: linear-gradient(
    135deg,
    rgba(201, 165, 92, 0.08) 0%,
    rgba(201, 165, 92, 0.03) 100%
  );
  border-left: 4px solid var(--color-gold);
  border-radius: 0 0.5rem 0.5rem 0;
  font-style: italic;
  color: var(--color-green);
}

/* Decorative quote mark */
.blog-post-section blockquote::before {
  content: '"';
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 3rem;
  color: var(--color-gold);
  opacity: 0.3;
}
```

**Special Classes:**

| Class | Purpose | Styling |
|-------|---------|---------|
| `.law-citation` | Legal references | Italic, green left border, subtle green background |
| `.footer-quote` | Closing quotes | Green right border, address aligned right |

**Responsive Scaling:**

| Breakpoint | Font Size | Line Height |
|------------|-----------|-------------|
| Desktop | `1.05rem` | `1.7` |
| Tablet (≤768px) | `1rem` | `1.65` |
| Mobile (≤479px) | `0.95rem` | `1.65` |

**HTML Structure Expected:**

```html
<article>
  <blockquote class="blog-quote">
    Highlighted introduction text...
  </blockquote>

  <section>
    <h2>Section Title</h2>
    <p>Paragraph content...</p>
    <ul>
      <li><p>List item with paragraph</p></li>
    </ul>
  </section>

  <hr />

  <section>
    <h2>Another Section</h2>
    <p>More content with <strong>emphasis</strong> and <a href="#">links</a>.</p>
  </section>
</article>
```

**Used in:** Blog post pages (`blog-post.component`)

---

### 4.17 Branded Loader

Premium loading indicator featuring the brand logo badge with animated gold progress ring. Creates a cohesive, professional loading experience across the app.

**Visual Structure:**
```
    ╭─────────────╮
 ╭──│             │──╮  ← Gold progress ring (spinning)
 │  │   [LOGO]    │  │
 ╰──│             │──╯
    ╰─────────────╯
        Badge (green gradient, gold border)
```

**Implementation Locations:**

| Location | File | Mode |
|----------|------|------|
| App startup | `src/index.html` | Full-screen with light patterned background |
| Blog loading | `src/app/core/components/spinner/` | Full-screen (blocking) or inline |

**Badge Styling:**

```css
.loader-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #002706 0%, #003d0a 100%);
  border-radius: 50%;
  border: 2px solid rgba(201, 165, 92, 0.4);
  box-shadow:
    0 4px 24px rgba(201, 165, 92, 0.35),
    0 2px 8px rgba(0, 39, 6, 0.2),
    inset 0 1px 0 rgba(201, 165, 92, 0.2);
}

.loader-badge img {
  width: 60%;
  height: auto;
  object-fit: contain;
}
```

**Progress Ring (SVG):**

```html
<svg class="loader-progress" viewBox="0 0 100 100">
  <circle class="loader-progress-track" cx="50" cy="50" r="46" />
  <circle class="loader-progress-fill" cx="50" cy="50" r="46" />
</svg>
```

```css
.loader-progress {
  position: absolute;
  inset: -8px;
  width: calc(100% + 16px);
  height: calc(100% + 16px);
  transform: rotate(-90deg);  /* Start from top */
}

.loader-progress-track {
  fill: none;
  stroke: rgba(201, 165, 92, 0.15);
  stroke-width: 2;
}

.loader-progress-fill {
  fill: none;
  stroke: #c9a55c;
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-dasharray: 289;      /* Circle circumference */
  stroke-dashoffset: 216;     /* ~75% hidden = 25% visible arc */
  animation: spin 1.4s linear infinite;
  transform-origin: center;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

**Background Pattern:**

The loader uses the intro section's signature background for brand consistency:

```css
.loader-backdrop {
  background:
    url('/assets/images/main/first-section.pattern.svg'),
    linear-gradient(
      180deg,
      #f5f2ed 0%,
      #faf8f5 25%,
      #ffffff 50%,
      #faf8f5 75%,
      #f5f2ed 100%
    );
}
```

**Sizing:**

| Context | Badge Size | Progress Ring Offset |
|---------|------------|---------------------|
| App loader (`index.html`) | `6rem` | `8px` |
| Spinner component | `5rem` | `8px` |

**Fade-Out Transition:**

```css
.app-loader {
  opacity: 1;
  transition: opacity 0.6s ease-out;
}

.app-loader.fade-out {
  opacity: 0;
  pointer-events: none;
}
```

**Angular Removal Logic:**

The app loader is removed after hydration + fonts load:

```typescript
afterNextRender(() => {
  document.fonts?.ready.then(() => {
    const loader = document.getElementById('app-loader');
    loader?.classList.add('fade-out');
    setTimeout(() => loader?.remove(), 600);
  });
});
```

**Component Usage:**

```html
<!-- Full-screen blocking loader -->
<app-spinner [show]="isLoading()" [blocking]="true" />

<!-- Inline loader (within content) -->
<app-spinner [show]="isLoading()" [blocking]="false" />
```

**Design Philosophy:**
- Matches the `.intro-header-badge` styling from the hero section
- Gold progress ring creates visual continuity with gold accent color
- Light patterned background (blocking mode) feels premium, not jarring
- Subtle fade-out animation (0.6s) for smooth reveal

**Used in:** App initialization (`index.html`), blog post loading (`SpinnerComponent`)

---

## 5. Section Backgrounds

### 5.1 Gold Separator Lines

The most frequently used decorative element in the design system (24+ instances). Essential brand element that creates visual rhythm between sections.

**Gradient Tokens:**

```css
/* Full fade - visible from 20% to 80% of width */
--gold-separator: linear-gradient(
  90deg,
  transparent 0%,
  var(--color-gold-light) 20%,
  var(--color-gold) 50%,
  var(--color-gold-light) 80%,
  transparent 100%
);

/* Center fade - subtler, only visible in center portion */
--gold-separator-center: linear-gradient(
  90deg,
  transparent 0%,
  var(--color-gold) 50%,
  transparent 100%
);
```

**Implementation Pattern:**

All gold separator lines follow the same implementation:

```css
.section-name {
  position: relative;  /* Required for pseudo-element positioning */

  &::before {  /* or ::after */
    content: '';
    position: absolute;
    top: 0;      /* Use top: 0 for top border, bottom: 0 for bottom */
    left: 0;
    right: 0;
    height: 1px;
    background: var(--gold-separator);
  }
}
```

**When to Use Each Variant:**

| Token | Visual | Best For |
|-------|--------|----------|
| `--gold-separator` | ══════════ | Section dividers on light backgrounds |
| `--gold-separator-center` | ───══─── | Subtler dividers, CTA sections, dark backgrounds |

**Common Placements:**
- **Top of section** (`top: 0`) — Separates from previous section
- **Bottom of section** (`bottom: 0`) — Separates from next section
- **Both top and bottom** — For sections that need clear boundaries

**Design Guidelines:**
- Always use 1px height for consistency
- Full-width only (no short underlines) — the gradient handles visual "shortening"
- Use `--gold-separator` as default; `--gold-separator-center` for subtler effect

---

### 5.2 Light Sections

Standard light background with cream-to-white gradient.

```css
.section-bg {
  background: linear-gradient(180deg, #f8f6f2 0%, #ffffff 100%);
  /* Alternate: #ffffff 0%, #f8f6f2 100% for reverse direction */
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: var(--gold-separator);
  }
}
```

---

### 5.3 Dark Sections

Two distinct dark section patterns exist:

**Variant A: Full Dark (court-cases, need-help)**

Large, immersive dark sections with glow effect.

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

**Variant B: Compact Green Gradient (format banners)**

Smaller accent sections between light content. Creates visual rhythm without overwhelming.

```css
.format-section-bg {
  background: var(--green-gradient);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: var(--gold-separator-center);
  }
}

.format-section {
  max-width: 900px;
  margin: 0 auto;
  padding: var(--section-padding-y-accent) var(--section-padding-x);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.25rem;
}
```

**Text Styling on Dark Backgrounds:**

```css
/* Headings - bright gold */
.dark-section h2, .dark-section h3 {
  color: var(--color-gold);
  font-weight: 700;
}

/* Body text - softer gold */
.dark-section p {
  color: var(--color-gold-light);
  font-weight: 500;
  line-height: 1.6;
}
```

**Icon Wrapper Inside Dark Sections:**

Use the Translucent Gold variant from Section 4.4:
```css
.icon-wrapper {
  background: rgba(201, 165, 92, 0.15);
  border-radius: 50%;
  border: 2px solid var(--color-gold);
}
```

**Used in:**
- Variant A: court-cases-section, need-help-section
- Variant B: about-me, contacts, services, services-section (format banners)

---

### 5.4 Section Content Container

Standard container for section content.

```css
.section-content {
  max-width: var(--section-max-width);
  margin: 0 auto;
  padding: var(--section-padding-y) var(--section-padding-x);
}
```

---

## 6. Animations & Transitions

### Timing Variables

| Variable | Value | Usage |
|----------|-------|-------|
| `--transition-normal` | `0.3s ease` | Standard hover/state transitions |
| `--ease-standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | Material Design standard easing |
| `--ease-bounce` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Bouncy, playful interactions |

### Usage Examples

**Standard transition:**
```css
transition: transform var(--transition-normal);
```

**Bouncy interaction (buttons, cards):**
```css
transition: transform 0.3s var(--ease-bounce);
```

**Smooth UI animations (page reveals):**
```css
animation: fadeIn 0.6s var(--ease-standard) forwards;
```

### Hover Effects

| Element | Effect |
|---------|--------|
| Cards | `translateY(-4px)` to `translateY(-6px)` |
| Primary buttons | `translateY(-2px)` |
| Outline buttons | `translateY(-3px)` |
| Icon wrappers | `scale(1.05)` |
| Arrows/icons | `translateX(4px)` |

### Image Hover Scale

Subtle zoom effect on image hover. Scale magnitude varies by image size to maintain visual balance.

**Pattern:**
```css
.image-container {
  overflow: hidden;
  border-radius: var(--card-border-radius);

  img {
    transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  &:hover img {
    transform: scale(1.05); /* default */
  }
}
```

**Scale Guidelines:**

| Context | Scale | Rationale |
|---------|-------|-----------|
| Small thumbnails / dense layouts | `1.02` - `1.03` | Subtle effect, avoids visual noise |
| Standard cards / images | `1.05` | Default, balanced effect |
| Animation overshoot (entrance) | `1.08` | Different use — "pop" effect in keyframes |

**Timing Function:** `cubic-bezier(0.25, 0.46, 0.45, 0.94)` — smooth ease-out that starts fast and decelerates gently.

**Used in:** about-me, services, documents, feedbacks, court-cases-list, intro-section, services-section, court-cases-section

---

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

### Key Breakpoints

| Breakpoint | Value | Usage |
|------------|-------|-------|
| Mobile max | `479px` | Small mobile devices |
| Small tablet | `640px` | 2-column grids begin |
| Tablet | `768px` | Section padding increases |
| Desktop | `1024px` | 3-column grids, full layouts |
| Large desktop | `1200px` | Max content width |

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
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: var(--gold-separator);
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
    border-color: var(--gold-alpha-40);
    box-shadow: 0 12px 32px var(--green-alpha-10), 0 4px 12px var(--green-alpha-06);
  }
}
```

---

## 10. Files Reference

| File | Purpose |
|------|---------|
| `src/styles.css` | Global CSS variables |
| `src/index.html` | App-level branded loader |
| `src/app/shared/components/cta-button/` | Primary CTA component |
| `src/app/shared/components/cta-outline-button/` | Outline CTA component |
| `src/app/core/components/spinner/` | Branded spinner component |
| `docs/DESIGN_SYSTEM.md` | This document |
| `NORMALIZATION_LOG.md` | Change history for design normalization |
