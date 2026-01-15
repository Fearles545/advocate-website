# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About This Project

A professional Angular 20 website for **Поддяча Юлія Юріївна**, a Ukrainian lawyer specializing in pension law. The site serves as a client acquisition tool with an extensive blog system focused on Ukrainian pension law topics.

**Live site**: https://www.advocate-pensia.com.ua/

## Tech Stack

- **Angular 20.3.x** with standalone components (no NgModules)
- **Angular Material 20.2.x** for UI components
- **ng-gallery 12.0.0** for image galleries
- **TypeScript 5.8.3** with strict mode
- **SSG (Static Site Generation)** for optimal performance and SEO
- **ESLint + Prettier** for code quality

## Project Structure

```
src/app/
├── core/
│   ├── config/           # base-url.ts, seo.config.ts
│   ├── services/         # SeoService, RouteSeoService
│   └── directives/
├── blog/
│   ├── blog-posts/posts/ # HTML posts + .seo.ts files
│   ├── components/       # BlogListComponent, BlogPostComponent
│   ├── blog-seo.config.ts
│   └── routes.ts         # Lazy-loaded routes
├── main/, about-me/, services/, documents/, contacts/
└── app.routes.ts

public/
├── robots.txt            # Search engine directives
├── sitemap.xml           # XML sitemap (update manually!)
└── site.webmanifest
```

## SEO Implementation (CRITICAL)

**This is a business website that depends on search engine visibility to attract clients. SEO is the highest priority.**

### SEO Architecture

1. **SeoService** (`core/services/seo.service.ts`)
   - Updates `<title>`, meta description, keywords, Open Graph tags
   - Manages canonical URLs and robots directives
   - Injects JSON-LD structured data

2. **RouteSeoService** (`core/services/route-seo.service.ts`)
   - Auto-applies SEO config on route navigation
   - Initialized in AppComponent constructor

3. **SEO Configuration**
   - `core/config/seo.config.ts` - Main pages SEO
   - `blog/blog-seo.config.ts` - Aggregates all blog SEO
   - `blog/blog-posts/posts/*.seo.ts` - Per-post SEO configs

### SEO Best Practices

- **Unique titles** (50-60 chars) and **descriptions** (150-160 chars) for every page
- **JSON-LD structured data**: LegalService, BreadcrumbList, BlogPosting schemas
- **Canonical URLs** with trailing slash: `https://www.advocate-pensia.com.ua/path/`
- **Open Graph tags** on all pages for social sharing
- **sitemap.xml** must be updated when adding/modifying pages
- **hreflang tags** for Ukrainian language targeting (uk, uk-UA)

### Adding New Blog Posts

1. Create HTML post in `blog/blog-posts/posts/`
2. Create `.seo.ts` file using `_template.seo.ts`:
   - Unique title with main keyword
   - Description 150-160 chars
   - publishedTime/modifiedTime in ISO format
   - Complete JSON-LD (BreadcrumbList, WebPage, BlogPosting)
3. Add post to `blog/blog-posts/index.ts`
4. Import and spread in `blog-seo.config.ts`
5. **Add entry to `public/sitemap.xml`**

### Analytics

- Google Tag Manager: GTM-NFGBSDQH
- Google Analytics 4: G-PEMD1W1X33

## Development Principles

- **Mobile-first responsive design** - flexbox/grid, %, vw/vh, rem units
- **Accessibility** - semantic HTML, ARIA attributes

## Design System

**See [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md) for the complete design system documentation.**

## Consultation Form

**See [`docs/CONSULTATION_FORM.md`](docs/CONSULTATION_FORM.md) for the consultation form system documentation.**

The consultation form (`/consultation`) is a custom Angular form integrated with:
- **Cloudflare Worker** - Serverless backend for form processing
- **Telegram Bot** - Instant notifications on form submission
- **Rate limiting & honeypot** - Spam protection

The design system defines canonical patterns for:

- **Colors** - Brand palette (green/gold), text colors, semantic colors
- **Typography** - Font stack, size scale, weights
- **Spacing** - Section padding, max-widths, spacing scale
- **Components** - CTA buttons, cards, icon wrappers, section headers
- **Section backgrounds** - Light/dark patterns with gold separators
- **Animations** - Transitions and hover effects
- **Breakpoints** - Responsive design targets

### Key Design Tokens

```css
/* Brand colors */
--color-green: #002706;
--color-gold: #c9a55c;
```

When creating new sections or components, **always reference the design system** to maintain visual consistency.

## Key Files

| File                                     | Purpose                         |
| ---------------------------------------- | ------------------------------- |
| `docs/DESIGN_SYSTEM.md`                  | **Design system documentation** |
| `src/styles.css`                         | Global CSS variables and tokens |
| `core/config/base-url.ts`                | Site base URL                   |
| `core/config/seo.config.ts`              | Global SEO config               |
| `core/services/seo.service.ts`           | SEO tag management              |
| `blog/blog-posts/posts/_template.seo.ts` | Blog SEO template               |
| `public/sitemap.xml`                     | XML sitemap                     |
| `src/index.html`                         | Global meta, JSON-LD, GTM       |

## Content Notes

- All content in **Ukrainian**
- Focus on **pension law** topics
- Blog posts often include YouTube embeds
- Target: Ukrainian citizens needing pension assistance

## Build Behavior

**DO NOT run `npm run build` unless explicitly requested.** The build output is verbose and wastes context.

**To check for TypeScript errors**, use:

```bash
npx tsc --noEmit
```

This runs quickly, produces minimal output, and catches type errors without triggering SSG.

### Known SSG Warnings (IGNORE THESE)

During `npm run build`, you'll see many `NotYetImplemented` errors like:

```
ERROR Error: NotYetImplemented
    at Ne.nyi (...)
    at hu.setProperty (...)
```

**These are harmless.** They occur because:

- Angular's SSR uses `domino` (a DOM emulator for Node.js)
- `domino` doesn't implement `CSSStyleDeclaration.setProperty()`
- Angular Material internally calls this method

The build **succeeds despite these warnings** - all 66 routes are prerendered correctly. This is a known Angular limitation with no official fix. Do not attempt to fix or suppress these errors.

## Updating Angular

This project uses SSG (prerendering) which has specific requirements when updating Angular. See [`docs/ANGULAR_SSG_UPDATE_GUIDE.md`](docs/ANGULAR_SSG_UPDATE_GUIDE.md) for detailed instructions.
