# Anchor Scroll with Fixed Header in Angular

Technical reference for handling fragment navigation (`#anchor` links) when using a fixed/sticky header in Angular applications.

## Problem Statement

When navigating to a URL with a fragment (e.g., `/services#priznannya-pensiyi`), the browser scrolls to the target element. However, with a fixed header, the target element gets partially or fully hidden behind the header.

```
┌─────────────────────────────────┐
│      FIXED HEADER (z-index:2)   │  ← Header covers content
├─────────────────────────────────┤
│ ▓▓▓▓ Target Element (hidden) ▓▓▓│  ← User can't see the anchor target
│                                 │
│      Visible Content            │
└─────────────────────────────────┘
```

**Expected behavior:**
```
┌─────────────────────────────────┐
│      FIXED HEADER               │
├─────────────────────────────────┤
│      (offset gap)               │  ← Breathing room
│ ──── Target Element ─────────── │  ← Fully visible
│      Content continues...       │
└─────────────────────────────────┘
```

## Why Common CSS Solutions Don't Work in Angular

### Attempted Solution 1: `scroll-margin-top`

```css
.target-element {
  scroll-margin-top: 160px; /* header height + padding */
}
```

**Result:** Does not work with Angular's `anchorScrolling`.

**Reason:** `scroll-margin-top` is respected by native browser scroll methods (`scrollIntoView()` with `behavior: 'smooth'`), but Angular's router uses `ViewportScroller.scrollToAnchor()` which doesn't apply CSS scroll margins.

### Attempted Solution 2: `scroll-padding-top`

```css
html {
  scroll-padding-top: 160px;
}
```

**Result:** Does not work with Angular's `anchorScrolling`.

**Reason:** Same as above. CSS scroll-padding applies to the scroll container for native scrolling, but Angular bypasses this by using JavaScript-based scrolling.

### Attempted Solution 3: Pseudo-element offset hack

```css
.target-element::before {
  content: '';
  display: block;
  height: 160px;
  margin-top: -160px;
  visibility: hidden;
}
```

**Result:** Partially works but causes layout issues and doesn't integrate with Angular's scrolling system.

## The Angular Solution: `ViewportScroller.setOffset()`

Angular provides `ViewportScroller` service specifically for controlling scroll behavior, including anchor navigation offset.

### Implementation

**1. Import and inject `ViewportScroller`:**

```typescript
// app.component.ts
import { ViewportScroller } from '@angular/common'; // NOT @angular/router!
import { inject } from '@angular/core';

export class AppComponent {
  #viewportScroller = inject(ViewportScroller);
}
```

**2. Set the offset:**

```typescript
// Static offset
this.#viewportScroller.setOffset([0, 160]); // [x, y] offset in pixels

// Dynamic offset based on header height
this.#viewportScroller.setOffset([0, headerHeight + 16]);
```

### Complete Implementation with Dynamic Header Height

Since header height can change (responsive design, content changes), use `ResizeObserver` to dynamically update the offset:

```typescript
// app.component.ts
import {
  Component,
  inject,
  afterNextRender,
  viewChild,
  ElementRef,
  DestroyRef,
} from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-root',
  template: `
    <app-header #headerEl />
    <main>
      <router-outlet />
    </main>
  `,
})
export class AppComponent {
  #viewportScroller = inject(ViewportScroller);
  #destroyRef = inject(DestroyRef);

  // viewChild with { read: ElementRef } is crucial for components!
  private headerEl = viewChild('headerEl', { read: ElementRef });

  constructor() {
    this.#initHeaderHeightObserver();
  }

  #initHeaderHeightObserver(): void {
    afterNextRender(() => {
      const headerElement = this.headerEl()?.nativeElement;
      if (!headerElement) return;

      const resizeObserver = new ResizeObserver((entries) => {
        const height = entries[0].borderBoxSize[0].blockSize;

        // Update CSS variable for other uses (margins, etc.)
        document.documentElement.style.setProperty(
          '--header-height',
          `${height}px`
        );

        // Update Angular's scroll offset
        this.#viewportScroller.setOffset([0, height + 16]); // +16 for padding
      });

      resizeObserver.observe(headerElement);

      // Cleanup on component destroy
      this.#destroyRef.onDestroy(() => resizeObserver.disconnect());
    });
  }
}
```

### Router Configuration

Ensure `anchorScrolling` is enabled in your router config:

```typescript
// app.config.ts
import { provideRouter, withInMemoryScrolling } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled', // optional but recommended
      })
    ),
  ],
};
```

## Key Gotchas

### 1. `viewChild` on Components Returns Component Instance, Not Element

```typescript
// WRONG - returns the component instance
private headerEl = viewChild<ElementRef>('headerEl');
// headerEl()?.nativeElement is undefined!

// CORRECT - explicitly read as ElementRef
private headerEl = viewChild('headerEl', { read: ElementRef });
// headerEl()?.nativeElement returns the DOM element
```

### 2. `ViewportScroller` Import Location

```typescript
// WRONG
import { ViewportScroller } from '@angular/router';

// CORRECT
import { ViewportScroller } from '@angular/common';
```

### 3. `mat-sidenav-content` Has Its Own Scroll Container

If using Angular Material's `mat-sidenav-container`, the `mat-sidenav-content` element has `overflow: auto`, making it the scroll container instead of the document body.

Angular's `ViewportScroller` works with the document by default. If your scroll container is different, the offset might not apply correctly. In our case, `setOffset()` still works because Angular Material's scrolling integrates with Angular's scroll service.

### 4. CSS Scroll Properties Are Still Useful

Even though Angular handles anchor scrolling, CSS scroll properties help with:
- User-initiated scrolling (dragging scrollbar, mouse wheel)
- `scrollIntoView()` calls from your own code
- Browser's "find in page" feature scrolling

```css
html {
  scroll-behavior: smooth;
  scroll-padding-top: calc(var(--header-height, 140px) + 1rem);
}

.scroll-target {
  scroll-margin-top: calc(var(--header-height, 140px) + 1rem);
}
```

## Testing Anchor Scrolling

1. **Direct URL navigation:** Enter `http://localhost:4200/page#anchor` in browser
2. **Link click:** Click a link like `<a routerLink="/page" fragment="anchor">`
3. **Programmatic navigation:**
   ```typescript
   this.router.navigate(['/page'], { fragment: 'anchor' });
   ```

All three methods should scroll the target element to be visible below the fixed header.

## Summary

| Approach | Works with Angular Router? | Use Case |
|----------|---------------------------|----------|
| `scroll-margin-top` | No | Native scrolling only |
| `scroll-padding-top` | No | Native scrolling only |
| `ViewportScroller.setOffset()` | Yes | Angular anchor navigation |
| ResizeObserver + setOffset | Yes | Dynamic header height |

**The canonical solution for Angular apps with fixed headers:**
1. Use `ResizeObserver` to measure header height
2. Call `ViewportScroller.setOffset([0, height + padding])`
3. Enable `anchorScrolling: 'enabled'` in router config
4. Optionally add CSS `scroll-padding-top` for non-Angular scrolling scenarios
