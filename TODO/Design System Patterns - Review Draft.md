# Design System Patterns - Review Draft

This document tracks undocumented patterns discovered in the codebase. Each item is reviewed and categorized before being added to `docs/DESIGN_SYSTEM.md`.

## Decision Legend
- **DOCUMENT** - Add to DESIGN_SYSTEM.md
- **REFACTORED** - Extracted to global styles (already done)
- **REMOVED** - Eliminated as unnecessary/problematic
- **SKIP** - Not worth documenting (too specific or obvious)
- **PENDING** - Needs discussion

---

## Resolved (No Documentation Needed)

### Item 8: Ambient Glow Effects
**Decision: REMOVED**

Subtle blur effects (6-12% opacity with 80px blur) that were imperceptible. Caused `overflow: hidden` requirement which clipped quote marks.

**Action taken:** Removed from `about-me.component` and `about-section.component`. Also removed unnecessary `overflow: hidden`.

---

## Items to Document

### Item 2: Gradient Tokens
**Decision: DOCUMENT (refactored to global tokens)**

Reusable gradient definitions for consistent visual elements across the site.

**Tokens in `styles.css` (lines 76-95):**
```css
/* Gold separator - fade in/out from edges */
--gold-separator: linear-gradient(
  90deg,
  transparent 0%,
  var(--color-gold-light) 20%,
  var(--color-gold) 50%,
  var(--color-gold-light) 80%,
  transparent 100%
);

/* Gold separator - center only */
--gold-separator-center: linear-gradient(
  90deg,
  transparent 0%,
  var(--color-gold) 50%,
  transparent 100%
);

/* Green gradient - for dark sections/badges */
--green-gradient: linear-gradient(
  135deg,
  var(--color-green) 0%,
  var(--color-green-dark) 100%
);
```

**Usage examples:**
- `--gold-separator`: Section divider lines, `::before`/`::after` decorations
- `--gold-separator-center`: Simpler centered dividers
- `--green-gradient`: Dark section backgrounds, badge backgrounds

**Used in:** about-me, contacts, documents, page headers, section dividers

---

### Item 3: Photo Frame with Offset Border
**Decision: DOCUMENT (already refactored to global)**

Gold offset border effect using `::before` pseudo-element. Refactored to global `.photo-frame` class in `styles.css` (lines 257-278).

**Pattern:**
```css
/* Global class in styles.css */
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
}
```

**Component usage (sizing only):**
```css
.photo-frame {
  width: 100%;
  max-width: 280px;
  aspect-ratio: 300 / 472;
}

/* Responsive offset override */
@media (min-width: 1024px) {
  .photo-frame {
    --photo-frame-offset: 14px;
  }
}
```

**Used in:** about-me, contacts, intro-section (main page)

---

### Item 4a: Content Wrapper (Frosted Glass Card)
**Decision: DOCUMENT**

Premium card container with frosted glass effect.

**Pattern:**
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

**Used in:** about-me, about-section (main page)

---

### Item 4b: Section Label (Golden Eyebrow)
**Decision: DOCUMENT**

Uppercase gold label with em-dash decorations, used above section headings.

**Pattern:**
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

**Used in:** about-section (main page)

**Note:** On desktop, left em-dash is hidden via `&::before { display: none; }` for left-aligned layouts.

---

### Item 4c: Decorative Quote Marks
**Decision: DOCUMENT**

Large decorative quotation marks for testimonial/about sections.

**Pattern:**
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

**Responsive scaling:**
- Mobile: 6rem
- 480px+: 7rem
- 768px+: 8rem
- 1024px+: 9rem (positioned outside container with negative values)

**Used in:** about-me, about-section (main page)

---

## Resolved (Skipped)

### Item 1: Page Header Pattern
**Decision: SKIP (already documented)**

Already fully documented in DESIGN_SYSTEM.md Section 4.6 "Page Header Pattern (Signature)" (lines 345-425). Covers structure, background, badge sizing, animations, usage guidelines.

---

### Item 12: Degree/Status Badges
**Decision: SKIP (too specific)**

Two-tone badge pattern for credentials (`.degree-master`, `.degree-bachelor`). Only used on documents page - not a reusable pattern.

---

### Item 5: Gold Corner Accents
**Decision: SKIP (too specific)**

L-shaped gold corner decorations on images. Used in about-section image frame, contacts CTA, documents CTA - but too specific to each context to extract a reusable pattern.

---

### Item 13: Trust Indicators / Stats Display
**Decision: SKIP (single usage)**

Trust badges with icon + label (e.g., "Індивідуальний підхід"). Only actively used in feedbacks page - too specific to document.

---

## Resolved (Skipped) - Additional

### Item 15: Responsive Breakpoint Patterns
**Decision: SKIP (already documented)**

Already comprehensively covered in DESIGN_SYSTEM.md Section 7 "Responsive Breakpoints" (lines 565-630). Documents key breakpoints (479px, 640px, 768px, 1024px) with usage guidelines and common responsive patterns for grids, spacing, and typography.

---

## Items to Document (from original list - recovered)

### Item 8: Navigation Links with Divider
**Decision: DOCUMENT**

Bottom-of-section navigation pattern with gradient vertical divider.

**Pattern:**
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

### Item 13b: Prominent Action Card
**Decision: DOCUMENT**

High-emphasis card for primary actions (calls, external links). Uses green gradient background with icon + text + action indicator.

**Pattern:**
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
- `.primary-contact` (contacts) - Phone call action with number display
- `.registry-card` (documents) - External link with logo and action text

**Used in:** contacts, documents

---

### Item 14b: Show More / Expand Button
**Decision: DOCUMENT**

Expandable content toggle with animated icon.

**Pattern:**
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

**Used in:** documents (`.show-more-btn`), seo-section (`.seo-toggle-btn`)

---

### Item 15b: Page Intro Secondary
**Decision: DOCUMENT**

Secondary intro paragraph variant with muted styling and additional animation delay.

**Pattern (already in styles.css):**
```css
.page-intro.secondary {
  color: var(--text-color-secondary);
  font-size: 1rem;
  animation-delay: 0.6s;
}
```

**Usage:**
```html
<p class="page-intro">Primary intro text here.</p>
<p class="page-intro secondary">Secondary, supporting text here.</p>
```

**Used in:** Global styles, available for any page

---

### Item 6: Image Hover Scale Effect
**Decision: DOCUMENT**

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
| Small thumbnails / dense layouts | `1.02-1.03` | Subtle effect, avoids visual noise |
| Standard cards / images | `1.05` | Default, balanced effect |
| Animation overshoot (entrance) | `1.08` | Different use - "pop" effect in keyframes |

**Timing function:** `cubic-bezier(0.25, 0.46, 0.45, 0.94)` - smooth ease-out that starts fast and decelerates gently.

**Used in:** about-me, services, documents, feedbacks, court-cases-list, intro-section, services-section, court-cases-section (10 files total)

---

### Item 7: Highlight Box (Callout)
**Decision: DOCUMENT + REFACTORED**

Emphasized callout/blockquote with gold gradient background and left border. Refactored to global `.highlight-box` class.

**Global class in `styles.css`:**
```css
/* Token */
--gold-highlight-gradient: linear-gradient(
  90deg,
  var(--gold-alpha-06) 0%,
  var(--gold-alpha-10) 50%,
  var(--gold-alpha-06) 100%
);

/* Class */
.highlight-box {
  padding: 1rem 1.25rem;
  background: var(--gold-highlight-gradient);
  border-radius: 0.5rem;
  border-left: 3px solid var(--color-gold);
}
```

**Component usage (extend with specific styles):**
```css
/* Example: about-me */
.highlight-text {
  font-style: italic;
  color: var(--color-green);
}

/* Example: seo-section (solid background variant) */
.block-note {
  padding: 0.75rem 1rem;
  background: var(--gold-alpha-06); /* Override gradient */
}
```

**HTML usage:**
```html
<p class="highlight-box highlight-text">Emphasized text here</p>
<div class="highlight-box schedule-badge">...</div>
```

**Used in:** about-me, contacts, documents, seo-section

**Note:** Court-case list items use a similar gold left border but with white background and box-shadow - a distinct "list item card" pattern, not refactored.

---

### Item 9: Gold Separator Lines
**Decision: DOCUMENT**

Horizontal gradient lines used as section dividers. The most frequently used decorative element in the design system (24+ instances). Essential brand element that creates visual rhythm between sections.

**Gradient Tokens (in `styles.css`):**

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

/* Center fade - only visible in center portion */
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
| `--gold-separator` | ══════════ | Section dividers on light backgrounds, between content blocks |
| `--gold-separator-center` | ───══─── | Subtler dividers, CTA sections, dark backgrounds |

**Common Placements:**

1. **Top of section** (`top: 0`) - Separates from previous section
2. **Bottom of section** (`bottom: 0`) - Separates from next section
3. **Both top and bottom** - For sections that need clear boundaries (e.g., dark sections between light ones)

**Usage Examples:**

```css
/* Section with top separator only */
.services-section {
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

/* Section with both top and bottom separators */
.court-cases-section {
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

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: var(--gold-separator);
  }
}

/* CTA section with center-fade variant */
.cta-section {
  position: relative;
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
```

**Used in (24+ instances):**
- Main page sections: intro, services, feedback, court-cases, blog-preview, seo, need-help
- Standalone pages: about-me, contacts, documents, services
- Detail pages: court-case

**Design Guidelines:**
- Always use 1px height for consistency
- Full-width only (no short underlines) - the gradient handles the visual "shortening"
- Use `--gold-separator` as default; `--gold-separator-center` for subtler effect
- Position relative to parent container, not viewport

---

### Item 10: Dark Section with Green Gradient
**Decision: DOCUMENT**

Full-width dark accent sections that create visual rhythm between light content areas. Uses the brand green gradient as background with gold accents for text and decorative elements.

**Background Pattern:**

```css
.dark-section-bg {
  background: var(--green-gradient);
  position: relative;
  overflow: hidden;

  /* Gold separator at top - integrates with Item 9 pattern */
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
```

**Content Container Pattern:**

```css
.dark-section-content {
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

**Text Styling on Dark Background:**

```css
/* Headings - bright gold */
.dark-section h2 {
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

**Icon Wrapper Inside Dark Section:**

```css
/* Translucent gold background with gold border */
.dark-section .icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  background: rgba(201, 165, 92, 0.15);
  border-radius: 50%;
  border: 2px solid var(--color-gold);

  mat-icon {
    color: var(--color-gold);
  }
}
```

**Full Example - Format Section:**

```html
<section class="format-section-bg">
  <div class="format-section">
    <div class="format-icon-wrapper">
      <mat-icon>videocam</mat-icon>
    </div>
    <div class="format-text">
      <h2>Формат роботи</h2>
      <p>Консультації онлайн та по телефону...</p>
    </div>
  </div>
</section>
```

**Key Characteristics:**
- Creates visual break between light content sections
- Always includes gold separator at top (from Item 9)
- Text uses gold palette (not white) for premium feel
- Icons use translucent gold background with gold border
- Centered, narrow content (max-width: 900px)
- Compact padding using `--section-padding-y-accent`

**Used in (4 instances):**
- `about-me.component.css` - `.format-section-bg`
- `contacts.component.css` - `.format-section-bg`
- `services.component.css` - `.format-section-bg`
- `services-section.component.css` - `.format-banner`

**Related Patterns:**
- Uses `--gold-separator-center` from Item 9
- Icon wrapper style overlaps with Item 11b

---

### Item 11a: Service/Qualification Card
**Decision: DOCUMENT**

Card container pattern for displaying services, qualifications, or features. Combines icon wrapper, title, and description in a consistent layout with hover effects.

**Base Card Pattern:**

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
}
```

**Hover Effect:**

```css
.service-card:hover {
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
```

**Card Variants:**

| Variant | Layout | Icon Shape | Use Case |
|---------|--------|------------|----------|
| `.main-service-card` | Column | Rounded square | Primary services with features list |
| `.additional-service-card` | Column | Circular | Secondary services |
| `.qualification-card` | Row | Circular | Credentials, qualifications |
| `.service-card` | Column | Rounded square | Generic service display |

**Card Structure:**

```html
<div class="service-card">
  <div class="service-header">
    <div class="service-icon-wrapper">
      <mat-icon>icon_name</mat-icon>
    </div>
    <h3>Service Title</h3>
  </div>
  <p>Service description text...</p>
</div>
```

**Horizontal Variant (Qualification Card):**

```html
<div class="qualification-card">
  <div class="qualification-icon">
    <mat-icon>verified</mat-icon>
  </div>
  <p>Qualification description</p>
</div>
```

**Responsive Padding Scale:**
- Mobile (< 480px): `1rem - 1.25rem`
- Tablet (768px+): `1.5rem - 1.75rem`
- Desktop (1024px+): `2rem`

**Used in:** services, about-me, services-section (main page)

**Tokens Used:** `--card-border-radius`, `--card-border`, `--card-box-shadow`, `--transition-normal`

---

### Item 11b: Icon Wrapper Variants
**Decision: DOCUMENT**

Circular or rounded icon containers with multiple visual variants based on context.

**Size Scale (tokens in `styles.css`):**

```css
--icon-wrapper-sm: 2.25rem;  /* Inline icons, checkmarks */
--icon-wrapper-md: 2.5rem;   /* Card icons, block icons */
--icon-wrapper-lg: 4rem;     /* Section badges, headers */
```

**Variant 1: Green Gradient (Light Context)**

Used in cards on light backgrounds.

```css
.icon-wrapper-green {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--icon-wrapper-md);
  height: var(--icon-wrapper-md);
  min-width: var(--icon-wrapper-md);
  background: var(--green-gradient);
  border-radius: 0.5rem;  /* or 50% for circular */
  box-shadow:
    0 4px 12px rgba(0, 39, 6, 0.2),
    inset 0 1px 0 rgba(201, 165, 92, 0.1);
  transition:
    transform 0.3s var(--ease-bounce),
    box-shadow var(--transition-normal);

  mat-icon {
    font-size: 1.25rem;
    color: white;
  }
}
```

**Variant 2: Translucent Gold (Dark Context)**

Used inside dark sections.

```css
.icon-wrapper-gold-translucent {
  width: 3rem;
  height: 3rem;
  background: rgba(201, 165, 92, 0.15);
  border-radius: 50%;
  border: 2px solid var(--color-gold);

  mat-icon {
    color: var(--color-gold);
  }
}
```

**Variant 3: Gold Gradient (Accent/Header)**

Used in section headers as prominent badges.

```css
.icon-wrapper-gold {
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
| Action cards (CTA) | Translucent Gold | Circular | 3rem |

**Shape Guidelines:**
- **Rounded square** (`0.5rem`): Service cards, block icons
- **Circular** (`50%`): Qualification cards, badges, avatars

**Used in:** services, about-me, documents, seo-section, feedback-section, court-cases-section, page headers

---

### Item 14: CTA Button Components
**Decision: DOCUMENT**

Two Angular standalone components provide the primary call-to-action buttons across the site. Both support theming via the `theme` input and optional icons.

**Component 1: `CtaButtonComponent` (Solid/Filled)**

Selector: `<app-cta-button>`

Primary action button with green gradient background, gold text, and shimmer animation.

```typescript
// Inputs
theme = input<'green' | 'gold'>('green');
icon = input<string>();  // Material icon name
```

```css
/* Core pattern */
.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 1.75rem;
  border: none;
  border-radius: 2rem;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow:
    0 4px 15px var(--cta-shadow),
    0 1px 3px var(--cta-shadow-light);

  /* Shimmer effect */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.15) 50%,
      transparent 100%
    );
    transition: none;
  }

  &:hover::before {
    left: 100%;
    transition: left 0.6s ease;
  }
}
```

**Theme Variants:**

```css
/* Green theme (default) - for light backgrounds */
:host([data-theme='green']) {
  --cta-bg: var(--green-gradient);
  --cta-color: var(--color-gold);
  --cta-shadow: rgba(0, 39, 6, 0.25);
  --cta-shadow-light: rgba(0, 39, 6, 0.1);
}

/* Gold theme - for dark backgrounds */
:host([data-theme='gold']) {
  --cta-bg: linear-gradient(135deg, var(--color-gold), var(--color-gold-dark));
  --cta-color: var(--color-green);
  --cta-shadow: rgba(201, 165, 92, 0.3);
  --cta-shadow-light: rgba(201, 165, 92, 0.15);
}
```

**Icon Animation (shake on hover):**

```css
mat-icon {
  font-size: 1.25rem;
  transition: transform 0.3s ease;
}

&:hover mat-icon {
  animation: iconShake 0.4s ease;
}

@keyframes iconShake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-3px); }
  75% { transform: translateX(3px); }
}
```

---

**Component 2: `CtaOutlineButtonComponent` (Outline)**

Selector: `<app-cta-outline-button>`

Secondary action button with transparent background and colored border. Features gradient fill animation on hover.

```typescript
// Inputs
theme = input<'green' | 'gold'>('green');
icon = input<string>();
```

```css
/* Core pattern */
.cta-outline-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: 2px solid var(--cta-border-color);
  border-radius: 2rem;
  background: transparent;
  font-size: 1rem;
  font-weight: 600;
  color: var(--cta-color);
  text-decoration: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  /* Gradient fill on hover */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--cta-hover-bg);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }

  &:hover {
    color: var(--cta-hover-color);
    border-color: transparent;

    &::before { opacity: 1; }
  }
}
```

**Theme Variants:**

```css
/* Green theme (default) */
:host([data-theme='green']) {
  --cta-border-color: var(--color-green);
  --cta-color: var(--color-green);
  --cta-hover-bg: var(--green-gradient);
  --cta-hover-color: var(--color-gold);
}

/* Gold theme - for dark backgrounds */
:host([data-theme='gold']) {
  --cta-border-color: var(--color-gold);
  --cta-color: var(--color-gold);
  --cta-hover-bg: linear-gradient(135deg, var(--color-gold), var(--color-gold-dark));
  --cta-hover-color: var(--color-green);
}
```

**Arrow Icon Animation:**

```css
mat-icon {
  font-size: 1.1rem;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

&:hover mat-icon {
  transform: translateX(4px);
}
```

---

**Usage Examples:**

```html
<!-- Primary CTA on light background -->
<a app-cta-button routerLink="/contacts">
  Записатись на консультацію
</a>

<!-- Primary CTA with icon -->
<a app-cta-button routerLink="/contacts" icon="arrow_forward">
  Записатись
</a>

<!-- Primary CTA on dark background -->
<a app-cta-button theme="gold" routerLink="/services">
  Переглянути послуги
</a>

<!-- Secondary/outline CTA -->
<a app-cta-outline-button routerLink="/services" icon="arrow_forward">
  Детальніше
</a>

<!-- Outline CTA on dark background -->
<a app-cta-outline-button theme="gold" href="tel:+380..." icon="phone">
  Зателефонувати
</a>
```

**When to Use Each:**

| Button | Use Case |
|--------|----------|
| `app-cta-button` | Primary action, high emphasis, conversion goals |
| `app-cta-button theme="gold"` | Primary action on dark backgrounds |
| `app-cta-outline-button` | Secondary action, navigation, less emphasis |
| `app-cta-outline-button theme="gold"` | Secondary action on dark backgrounds |

**File Locations:**
- `src/app/shared/components/cta-button/cta-button.component.ts`
- `src/app/shared/components/cta-outline-button/cta-outline-button.component.ts`

**Used in:** 19 files across main page sections, standalone pages, and shared layouts

---

## Review Complete

All 15 items have been reviewed. Summary:

**Items to Add to DESIGN_SYSTEM.md:**
- Item 2: Gradient Tokens (already refactored)
- Item 3: Photo Frame with Offset Border (already refactored)
- Item 4a: Content Wrapper (Frosted Glass Card)
- Item 4b: Section Label (Golden Eyebrow)
- Item 4c: Decorative Quote Marks
- Item 6: Image Hover Scale Effect
- Item 7: Highlight Box (refactored to global class)
- Item 8: Navigation Links with Divider
- Item 9: Gold Separator Lines
- Item 10: Dark Section with Green Gradient
- Item 11a: Service/Qualification Card
- Item 11b: Icon Wrapper Variants
- Item 13b: Prominent Action Card
- Item 14: CTA Button Components
- Item 14b: Show More / Expand Button
- Item 15b: Page Intro Secondary

**Items Skipped:**
- Item 1: Already documented in DESIGN_SYSTEM.md
- Item 5: Too specific (gold corner accents)
- Item 8 (original): Removed (ambient glow effects)
- Item 12: Too specific (degree badges)
- Item 13: Single usage (trust indicators)
- Item 15: Already documented in DESIGN_SYSTEM.md

## Next Step

Update `docs/DESIGN_SYSTEM.md` with all approved patterns from this draft.
