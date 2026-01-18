# Court Case Creation Guide

This guide documents the process for adding new court cases to the advocate-website.

---

## Using Claude AI (Recommended)

For streamlined case creation, use the AI input template:

**Template file:** `court-case-ai-input.ts` (project root)

### Workflow

1. Fill in `court-case-ai-input.ts` with case details
2. Tell Claude: "case content in court-case-ai-input.ts"
3. Claude will automatically:
   - Create case TypeScript file
   - Register in `cases/index.ts`
   - Update `sitemap.xml`
   - Verify TypeScript compilation

**Note:** SEO is auto-generated - no separate SEO file needed!

### Template Structure

```typescript
export const courtCaseInput: CourtCaseInput = {
  caseNumber: string;        // "420/14018/25" (slug auto-generated)
  slug?: string;             // Override for appeals: "420-14018-25-appeal"
  title: string;             // Headline describing outcome
  date: string;              // YYYY-MM-DD
  tags: string[];            // Classification tags
  registryLinks: [{url, label?}]; // Court registry URL(s)

  essence: string;           // Background (markdown → HTML)
  courtReview: string;       // Court findings (markdown → HTML)
  result: string[];          // Outcome points (plain text)

  usefulFor?: string[];      // Target audience
  relatedCases?: string[];   // Related case slugs
  relatedBlogs?: string[];   // Related blog slugs
  seo?: SeoOverrides;        // Optional SEO overrides
};
```

### Slug Conventions

| Case Type | Slug Format | Example |
|-----------|-------------|---------|
| First instance | `{number}` | `420-14018-25` |
| Appeal | `{number}-appeal` | `420-14018-25-appeal` |
| Cassation | `{number}-cassation` | `420-14018-25-cassation` |

### Tips

- **Markdown**: Write `essence` and `courtReview` in markdown - converted to HTML
- **result/usefulFor**: Plain text only (no markdown)
- **Date**: Use today's date for new publications; sitemap uses same date
- **Related cases**: Reference other case slugs to link them together

---

## Manual Creation

For manual case creation without AI assistance, follow the steps below.

## Overview

Court cases are stored as TypeScript data files and rendered dynamically. Unlike blog posts, **SEO is auto-generated** from case data - no separate SEO file needed.

## File Structure

```
src/app/court-cases/
├── cases/
│   ├── court-case.model.ts    # Interface definitions
│   ├── index.ts               # Case registry (imports + exports)
│   └── XXX-XXXX-XX-case.ts    # Individual case files
├── components/
├── services/
│   └── court-case-seo.generator.ts  # Auto SEO generation
├── court-cases-seo.config.ts  # Auto-generated SEO config
└── routes.ts
```

## Step-by-Step Process

### 1. Create Case File

Create a new file: `src/app/court-cases/cases/{slug}-case.ts`

**Naming convention**: Use the case number with dashes, e.g., `420-14018-25-case.ts`

For appeals, add suffix: `420-14018-25-case-appeal.ts`

### 2. Define Case Data

```typescript
import { CourtCase } from './court-case.model';

export const case_XXX_XXXX_XX: CourtCase = {
  // === Required Fields ===
  slug: '420-14018-25',           // URL path segment (unique)
  caseNumber: '420/14018/25',     // Display format with slashes
  title: 'Headline describing the outcome',
  date: '2025-01-18',             // Publication date (YYYY-MM-DD)

  // === Classification ===
  tags: ['пенсія за віком', 'страховий стаж'],  // For filtering & SEO

  // === Registry Links ===
  registryLinks: [
    { url: 'https://reyestr.court.gov.ua/Review/XXXXXXXX' },
    // For appeals, add label:
    { url: '...', label: 'Апеляційне рішення' },
  ],

  // === Main Content (HTML allowed) ===
  essence: `<p>Case background...</p>`,      // Суть справи
  courtReview: `<p>Court findings...</p>`,   // Судовий розгляд
  result: [                                   // Результат (plain text)
    'First outcome point',
    'Second outcome point',
  ],

  // === Optional Fields ===
  usefulFor: [                    // Кому буде корисно
    'People in similar situation',
  ],
  relatedCaseSlugs: ['420-14018-25'],         // Related cases
  relatedBlogSlugs: ['blog-post-slug'],       // Related blog posts

  // === SEO Overrides (optional) ===
  seo: {
    title: 'Custom SEO title',      // Defaults to: {title} | Адвокат...
    description: 'Custom desc',     // Defaults to: first 155 chars of essence
    keywords: ['custom', 'keywords'], // Defaults to: tags
  },
};
```

### 3. Register in index.ts

Edit `src/app/court-cases/cases/index.ts`:

```typescript
// Add import
import { case_XXX_XXXX_XX } from './XXX-XXXX-XX-case';

// Add to courtCases array
export const courtCases: CourtCase[] = [
  case_582_867_21,
  case_XXX_XXXX_XX,  // Add new case
  // ...other cases
].sort((a, b) => b.date.localeCompare(a.date));  // Auto-sorted by date
```

### 4. Update Sitemap

Add entry to `public/sitemap.xml`:

```xml
<url>
  <loc>https://www.advocate-pensia.com.ua/court-cases/{slug}/</loc>
  <lastmod>2026-01-18</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
</url>
```

**Note**: `lastmod` should be the actual publication date (today), not the case's internal date.

### 5. Verify

```bash
npx tsc --noEmit
```

## Content Guidelines

### `essence` (Суть справи)
- Background of the client's situation
- What went wrong with PFU
- Use `<p>` tags, `<strong>` for emphasis
- 2-4 paragraphs typical

### `courtReview` (Судовий розгляд)
- Court's analysis and conclusions
- Can include `<ul>/<li>` for ordered findings
- Reference specific legal norms if relevant

### `result` (Результат)
- Plain text bullet points (no HTML)
- 2-4 key outcomes
- Action verbs: "Підтверджено право...", "Зобов'язано ПФУ..."

### `usefulFor` (Кому буде корисно)
- Target audience for this case
- Plain text bullet points
- 2-4 items describing similar situations

### `tags`
- Use existing tags for consistency
- Common tags:
  - `пенсія за віком`, `пільгова пенсія`, `пенсія за вислугу років`
  - `страховий стаж`, `спеціальний стаж`
  - `індексація пенсії`, `перерахунок пенсії`
  - `Список №1`, `Список №2`

## Input Format for AI

When providing case details to Claude, use this format:

```typescript
interface CourtCaseInput {
  caseNumber: string;      // e.g., "420/14018/25"
  registryUrl: string;     // Court registry link
  title: string;           // Main headline
  date: string;            // YYYY-MM-DD
  tags: string[];          // Classification tags

  essence: string;         // Background (markdown)
  courtReview: string;     // Court findings (markdown)
  result: string[];        // Outcome points
  usefulFor?: string[];    // Target audience

  relatedCases?: string[]; // Related case slugs
  relatedBlogs?: string[]; // Related blog slugs
}
```

## SEO Notes

SEO is auto-generated by `court-case-seo.generator.ts`:

- **Title**: `{title} | Адвокат Поддяча Юлія Юріївна` (or custom)
- **Description**: First 155 chars of essence (or custom)
- **Keywords**: From tags array (or custom)
- **Schema**: BlogPosting with BreadcrumbList

Override specific fields via the `seo` property if needed.

## Checklist

- [ ] Create case file: `cases/{slug}-case.ts`
- [ ] Import and add to `cases/index.ts`
- [ ] Add sitemap entry with today's date
- [ ] Run `npx tsc --noEmit` to verify
