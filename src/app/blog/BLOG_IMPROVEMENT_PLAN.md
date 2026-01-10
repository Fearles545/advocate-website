# Blog Improvement Plan

> This document tracks the blog rebranding implementation progress.
> Last updated: 2026-01-10

## Overview

Improving the blog section based on SEO and UX recommendations from rebranding documents.

---

## Categories (8 total)

| # | Category (UA) | Slug | Posts* |
|---|---------------|------|--------|
| 1 | Загальні пенсійні питання | `general` | 7 |
| 2 | Пенсія за віком | `pension-by-age` | 25 |
| 3 | Пільгова пенсія (Списки №1 і №2) | `preferential` | 18 |
| 4 | Дострокова пенсія | `early-retirement` | 7 |
| 5 | Пенсія за вислугу років | `service-years` | 3 |
| 6 | Стаж, індексація та перерахунок | `service-record` | 36 ⭐ |
| 7 | Пенсія по інвалідності | `disability` | 0 (future) |
| 8 | Пенсія у зв'язку з втратою годувальника | `survivor` | 0 (future) |

*Posts count includes secondary categories (multi-category support)

---

## Phase 1: Blog List Improvements ✅ COMPLETE

### Tasks

- [x] **1.1 Custom Pagination Component**
  - Created `pagination.component.ts` with "1, 2, 3 ... N" style
  - Page size selector (5, 10, 15, 20)
  - Default page size: 10
  - Matches gold/green design system

- [x] **1.2 Show Article Descriptions**
  - Descriptions now display under each blog title
  - 2-line max with ellipsis, muted text color
  - Responsive sizing for mobile

- [x] **1.3 Sync Missing Descriptions**
  - Added 5 missing descriptions from `.seo.ts` files
  - Now 50 out of 51 posts have descriptions

### Files modified
- `src/app/blog/components/blog-list.component.ts` - New pagination import
- `src/app/blog/components/blog-list.component.html` - Descriptions + new pagination
- `src/app/blog/components/blog-list.component.css` - Description styles
- `src/app/blog/services/blog-pagination.service.ts` - Page size options
- `src/app/blog/blog-posts/index.ts` - Added missing descriptions
- NEW: `src/app/blog/components/pagination/pagination.component.ts`

---

## Phase 2: Category System ✅ COMPLETE

### Tasks

- [x] **2.1 Add categories field to Blog interface**
  - Updated `src/app/blog/blog-posts/index.ts`
  - Uses `categories?: readonly BlogCategorySlug[]` for multi-category support
  - Posts can belong to multiple categories (primary + secondary)

- [x] **2.2 Create category constants**
  - Created `src/app/blog/blog-categories.ts`
  - Labels, slugs, icons for all 8 categories
  - Helper functions: `getCategoryBySlug`, `getCategoryDisplayLabel`

- [x] **2.3 Categorize ALL existing posts with multi-category**
  - All 50 posts have primary + secondary categories based on spec
  - Category appearances (primary + secondary):
    - service-record: 36 posts (appears as secondary in most categories)
    - pension-by-age: 25 posts
    - preferential: 18 posts (Списки №1 і №2)
    - general: 7 posts
    - early-retirement: 7 posts
    - service-years: 3 posts

- [x] **2.4 Category filter UI**
  - Created `CategoryFilterComponent` with chip-style buttons
  - Shows category counts dynamically
  - Resets to page 1 when category changes
  - Responsive design with horizontal scroll on mobile
  - Filter hidden until posts are categorized

### Files created/modified
- NEW: `src/app/blog/blog-categories.ts` - Category types and constants
- NEW: `src/app/blog/components/category-filter/category-filter.component.ts`
- `src/app/blog/blog-posts/index.ts` - Added category field + all 50 posts categorized
- `src/app/blog/components/blog-list.component.ts` - Category filtering logic
- `src/app/blog/components/blog-list.component.html` - Filter integration

### Pending for Phase 2 (optional)
- [ ] URL query param support (?category=preferential)

---

## Phase 3: Related Articles 🔜 PENDING

### Tasks

- [ ] **3.1 Create RelatedArticlesComponent**
  - Shows 3-4 posts from same category
  - Displayed after article content, before footer-card

- [ ] **3.2 Fallback logic**
  - If category has <3 posts, show recent/popular instead

- [ ] **3.3 Update blog-post.component**
  - Add RelatedArticlesComponent to template

---

## Phase 4: Footer Enhancements 🔜 PENDING

### Tasks

- [ ] **4.1 Update footer-card.html**
  - Add internal links section (Services, Court Cases, Reviews, About)
  - Keep existing CTA text

- [ ] **4.2 Optional: Consultation CTA button**
  - Link to contacts or Google Form
  - Subtle, not aggressive

---

## Phase 5: Optional Enhancements 💭 FUTURE

- [ ] FAQ component (template-based, for key topics only)
- [ ] Keyword tags (in addition to categories)
- [ ] "Popular posts" section (requires analytics data)

---

## Notes

- **Don't modify 50+ HTML post files** - use template-level changes
- **Descriptions source**: Use `index.ts`, sync from `.seo.ts` where missing
- **Pagination style**: Custom "1 2 3 ... N" instead of mat-paginator
- **Categories**: Gradual assignment, not all at once

---

## Reference Documents

- `src/app/blog/blog-rebranding.md` - Blog list page recommendations
- `src/app/blog/blog-post-rebranding.md` - Individual post template
- `src/app/blog/blog-automation-rebranding.md` - Related articles logic
- `src/app/blog/blog-post-categories-rebranding.md` - Category assignments
