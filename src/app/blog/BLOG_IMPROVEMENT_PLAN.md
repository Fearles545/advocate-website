# Blog Improvement Plan

> This document tracks the blog rebranding implementation progress.
> Last updated: 2025-01-10

## Overview

Improving the blog section based on SEO and UX recommendations from rebranding documents.

---

## Categories (8 total)

| # | Category (UA) | Slug | Status |
|---|---------------|------|--------|
| 1 | Загальні пенсійні питання | `general` | Empty (future) |
| 2 | Пенсія за віком | `pension-by-age` | Has posts |
| 3 | Пільгова пенсія (Списки №1 і №2) | `preferential` | Has posts (strongest) |
| 4 | Дострокова пенсія | `early-retirement` | Has posts |
| 5 | Пенсія за вислугу років | `service-years` | Has posts |
| 6 | Стаж, індексація та перерахунок | `service-record` | Has posts (2nd strongest) |
| 7 | Пенсія по інвалідності | `disability` | Empty (future) |
| 8 | Пенсія у зв'язку з втратою годувальника | `survivor` | Empty (future) |

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

## Phase 2: Category System 🔜 PENDING

### Tasks

- [ ] **2.1 Add category field to Blog interface**
  - Update `src/app/blog/blog-posts/index.ts`
  - Add `BlogCategory` type enum

- [ ] **2.2 Create category constants**
  - Labels, slugs, icons for each category

- [ ] **2.3 Categorize existing posts (gradual)**
  - Start with strongest clusters (Пільгова, Стаж)
  - Can be done incrementally

- [ ] **2.4 Category filter UI**
  - Filter chips or dropdown above blog list
  - URL query param support (?category=preferential)

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
