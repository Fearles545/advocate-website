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

Run `npm run build:ssg` as often as you need: it is the only check that every route still prerenders. A clean build prints no `ERROR` lines and ends with `Prerendered N static routes`.

That count is not proof on its own. When a component throws during prerender, the build still counts its route and exits 0, but writes no `index.html` for it, so the live page returns 404. After every build, confirm each route was written:

```bash
node -e "const fs=require('fs');const d='dist/advocate-website';const r=Object.keys(require('./'+d+'/prerendered-routes.json').routes);const m=r.filter(x=>!fs.existsSync(d+'/browser'+(x==='/'?'':x)+'/index.html'));console.log(m.length?'MISSING: '+m.join(' '):'all '+r.length+' routes written')"
```

The usual cause is a browser-only global (`window`, `document`, `localStorage`) touched during construction. Guard it with `isPlatformBrowser(inject(PLATFORM_ID))`, as in `core/directives/dropdown-position.directive.ts`, or move the code into `afterNextRender`.

Then confirm every internal fragment link resolves. The check scans every built page and the article fragments in `posts/`, and requires each `href="/path/#id"` (with or without the slash, query ignored) to find `id="id"` in that path's `index.html`. It prints `all N fragment links resolve`, or exits 1 listing each broken link, typically after an anchor id was renamed:

```bash
node -e "const fs=require('fs');const d='dist/advocate-website/browser';const ids={};const idsOf=t=>ids[t]??=new Set(fs.existsSync(t)?[...fs.readFileSync(t,'utf8').matchAll(/\sid=\"([^\"]+)\"/g)].map(m=>m[1]):[]);const bad=new Set();let n=0;for(const f of fs.readdirSync(d,{recursive:true}).filter(f=>f.endsWith('.html')))for(const[,p,id]of fs.readFileSync(d+'/'+f,'utf8').matchAll(/href=\"(\/[^\"#]*)#([^\"]+)\"/g)){n++;idsOf(d+p.split('?')[0].replace(/\/$/,'')+'/index.html').has(id)||bad.add(f+' -> '+p+'#'+id)}if(bad.size){console.error('BROKEN:\n'+[...bad].join('\n'));process.exit(1)}console.log('all '+n+' fragment links resolve')"
```

For a quick type check between builds, use:

```bash
npx tsc --noEmit
```

## Updating Angular

This project uses SSG (prerendering) which has specific requirements when updating Angular. See [`docs/ANGULAR_SSG_UPDATE_GUIDE.md`](docs/ANGULAR_SSG_UPDATE_GUIDE.md) for detailed instructions.

## Agent skills

### Issue tracker

Issues and specs live as local markdown files under `.scratch/<feature>/`. See `docs/agents/issue-tracker.md`.

### Triage labels

Default five-role vocabulary (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`), recorded as a `Status:` line in each issue file. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `GLOSSARY.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.
