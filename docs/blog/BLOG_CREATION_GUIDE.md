# Blog Creation Guide

Complete workflow for adding new blog posts to the advocate-pensia.com.ua website.

## Quick Reference

**Files to create per post:**
1. `src/app/blog/blog-posts/posts/{slug}.html` - Article content
2. `src/app/blog/blog-posts/posts/{slug}.seo.ts` - SEO configuration

**Files to update per post:**
3. `src/app/blog/blog-posts/index.ts` - Add post metadata
4. `src/app/blog/blog-seo.config.ts` - Import & spread SEO config
5. `public/sitemap.xml` - Add URL entry

---

## Naming Conventions

| Context | Format | Example |
|---------|--------|---------|
| Post slug | kebab-case | `khto-maie-pravo-na-pensiiu-za-vikom-u-2025` |
| SEO variable | snake_case | `khto_maie_pravo_na_pensiiu_za_vikom_u_2025` |
| File names | kebab-case.ext | `khto-maie-pravo-na-pensiiu-za-vikom-u-2025.html` |
| Object key | kebab-case | `'khto-maie-pravo-na-pensiiu-za-vikom-u-2025'` |

---

## Available Categories

```typescript
type BlogCategorySlug =
  | 'general'          // Загальні пенсійні питання
  | 'pension-by-age'   // Пенсія за віком
  | 'preferential'     // Пільгова пенсія (Списки 1 та 2)
  | 'early-retirement' // Дострокова пенсія
  | 'service-years'    // Пенсія за вислугу років
  | 'service-record';  // Стаж, індексація та перерахунок
```

---

## Step 1: Create HTML Post

**File:** `src/app/blog/blog-posts/posts/{slug}.html`

```html
<article>
  <blockquote class="blog-quote">
    <p>Short teaser or key insight (1-2 sentences)</p>
  </blockquote>

  <section>
    <h2>Section Title</h2>
    <p>Introduction paragraph...</p>
  </section>

  <hr />

  <section>
    <h2>Another Section</h2>
    <ul>
      <li>Point 1</li>
      <li>Point 2</li>
      <li>Point 3</li>
    </ul>
  </section>

  <hr />

  <section>
    <h2>Важливо знати</h2>
    <p>Important note or summary...</p>
  </section>

  <hr />

  <footer>
    <h3>Професійна допомога</h3>
    <p>
      Надаю правову допомогу у справах щодо призначення, перерахунку та
      оскарження рішень Пенсійного фонду.
    </p>
    <address>
      <strong>Адвокат — Поддяча Юлія Юріївна</strong>
    </address>
  </footer>
</article>
```

### HTML Elements Reference

| Element | Usage |
|---------|-------|
| `<article>` | Root wrapper (required) |
| `<section>` | Content sections |
| `<h2>` | Section headings |
| `<blockquote class="blog-quote">` | Key quotes/highlights |
| `<hr />` | Section separators |
| `<ul>/<li>` | Lists |
| `<cite>` | Law references |
| `<time datetime="YYYY-MM-DD">` | Dates |
| `<aside>` | Supplementary info |
| `<strong>` | Critical information |
| `<footer>` | Professional help CTA |

---

## Step 2: Create SEO Configuration

**File:** `src/app/blog/blog-posts/posts/{slug}.seo.ts`

```typescript
export const {slug_in_snake_case} = {
  '{slug-in-kebab-case}': {
    title: '{H1} | Адвокат Поддяча Юлія Юріївна',
    description: '{150-160 chars description}',
    keywords: '{keyword1, keyword2, keyword3}',
    type: 'article',
    publishedTime: '{YYYY-MM-DDThh:mm:ss+03:00}',
    modifiedTime: '{YYYY-MM-DDThh:mm:ss+03:00}',
    canonical: '/blog/{slug}/',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Головна',
              item: 'https://www.advocate-pensia.com.ua/',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Блог',
              item: 'https://www.advocate-pensia.com.ua/blog/',
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: '{H1}',
              item: 'https://www.advocate-pensia.com.ua/blog/{slug}/',
            },
          ],
        },
        {
          '@type': 'WebPage',
          '@id': 'https://www.advocate-pensia.com.ua/blog/{slug}/#webpage',
          url: 'https://www.advocate-pensia.com.ua/blog/{slug}/',
          name: '{H1} | Адвокат Поддяча Юлія Юріївна',
          isPartOf: {
            '@id': 'https://www.advocate-pensia.com.ua/#website',
          },
          breadcrumb: {
            '@id': 'https://www.advocate-pensia.com.ua/blog/{slug}/#breadcrumb',
          },
          inLanguage: 'uk-UA',
          datePublished: '{YYYY-MM-DDThh:mm:ss+03:00}',
          dateModified: '{YYYY-MM-DDThh:mm:ss+03:00}',
        },
        {
          '@type': 'BlogPosting',
          '@id': 'https://www.advocate-pensia.com.ua/blog/{slug}/#blogposting',
          headline: '{H1}',
          description: '{JSON-LD description}',
          datePublished: '{YYYY-MM-DDThh:mm:ss+03:00}',
          dateModified: '{YYYY-MM-DDThh:mm:ss+03:00}',
          author: {
            '@type': 'Person',
            name: 'Поддяча Юлія Юріївна',
            url: 'https://www.advocate-pensia.com.ua/about-me/',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Адвокат Поддяча Юлія Юріївна',
            logo: {
              '@type': 'ImageObject',
              url: 'https://www.advocate-pensia.com.ua/assets/logo/logo-black-cut.png',
              width: 512,
              height: 512,
            },
          },
          image: [
            'https://www.advocate-pensia.com.ua/assets/images/og/default-og-image.webp',
          ],
          mainEntityOfPage: {
            '@id': 'https://www.advocate-pensia.com.ua/blog/{slug}/#webpage',
          },
          keywords: ['{keyword1}', '{keyword2}', '{keyword3}'],
          articleSection: 'Пенсійне право',
          inLanguage: 'uk-UA',
        },
      ],
    },
  },
};
```

### SEO Fields Reference

| Field | Requirements |
|-------|--------------|
| `title` | 50-60 chars, ends with `\| Адвокат Поддяча Юлія Юріївна` |
| `description` | 150-160 chars, conversational tone |
| `keywords` | Comma-separated string (top level), array in JSON-LD |
| `canonical` | Relative path WITH trailing slash: `/blog/{slug}/` |
| `publishedTime` | ISO 8601 with Ukraine timezone: `+03:00` |
| `url/@id` | Absolute URLs in JSON-LD |

---

## Step 3: Register in Blog Index

**File:** `src/app/blog/blog-posts/index.ts`

Add entry at the TOP of the `blogs` array (sorted by date descending):

```typescript
{
  title: '{Post Title}',
  slug: '{slug-in-kebab-case}',
  description: '{Optional short description}',
  src: ['https://www.youtube.com/embed/{videoId}'], // YouTube embeds or empty []
  date: '{YYYY-MM-DD}',
  categories: ['{category-slug}'] as const,
},
```

### Blog Interface

```typescript
interface Blog {
  id?: number;
  title: string;
  slug: string;
  description?: string;
  src: string[];           // YouTube embed URLs
  date: string;            // YYYY-MM-DD format
  categories?: readonly BlogCategorySlug[];
  relatedSlugs?: readonly string[];  // Custom related article slugs (optional)
  faq?: readonly FaqItem[];          // Custom FAQ items (optional)
}

interface FaqItem {
  question: string;
  answer: string;
}
```

### Example with Custom Related Articles and FAQ

```typescript
{
  title: 'Оцифрування трудової книжки до 10 червня 2026',
  slug: 'otsyfruvannia-trudovoi-knyzhky-do-10-chervnia-2026',
  description: 'Що потрібно знати про оцифрування трудової книжки...',
  src: [],
  date: '2026-01-18',
  categories: ['service-record'] as const,
  relatedSlugs: [
    'yak-pidtverdyty-stazh-bez-trudovoi-knyzhky',
    'pererahunok-pensii-za-stazhom',
  ] as const,
  faq: [
    {
      question: 'До якої дати потрібно оцифрувати трудову книжку?',
      answer: 'До 10 червня 2026 року.',
    },
    {
      question: 'Чи можна оцифрувати книжку самостійно?',
      answer: 'Так, через електронний кабінет ПФУ або Дію.',
    },
  ] as const,
},
```

---

## Step 4: Add SEO Import

**File:** `src/app/blog/blog-seo.config.ts`

1. Add import at the top:
```typescript
import { {slug_in_snake_case} } from './blog-posts/posts/{slug}.seo';
```

2. Spread in the `blogSeoConfig` object:
```typescript
export const blogSeoConfig: PageSEO = {
  // ... existing imports
  ...{slug_in_snake_case},
};
```

---

## Step 5: Update Sitemap

**File:** `public/sitemap.xml`

Add entry in the blog section:

```xml
<url>
  <loc>https://www.advocate-pensia.com.ua/blog/{slug}/</loc>
  <lastmod>{YYYY-MM-DD}</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
</url>
```

---

## Optional: Custom Related Articles

By default, related articles are auto-generated based on categories. To specify custom related articles:

```typescript
relatedSlugs: [
  'existing-post-slug-1',
  'existing-post-slug-2',
  'existing-post-slug-3',
] as const,
```

**Behavior:**
- If `relatedSlugs` is provided → shows those specific posts (up to 3)
- If not provided → auto-generates from same category, falls back to recent posts
- Header shows "Рекомендовані статті" for custom, "Повʼязані статті" for auto

---

## Optional: Custom FAQ

By default, FAQ is shown based on the post's category. To specify custom FAQ:

```typescript
faq: [
  {
    question: 'Питання 1?',
    answer: 'Відповідь на питання 1.',
  },
  {
    question: 'Питання 2?',
    answer: 'Відповідь на питання 2.',
  },
] as const,
```

**Behavior:**
- If `faq` is provided → shows custom FAQ items
- If not provided → shows category-based FAQ from `blog-faq-data.ts`
- FAQ generates JSON-LD FAQPage schema automatically

---

## Pre-Commit Checklist

**Required:**
- [ ] HTML and SEO files have matching `{slug}`
- [ ] `title` matches `headline` in JSON-LD
- [ ] `description` is ≤160 characters
- [ ] `keywords`: string in meta, array in JSON-LD
- [ ] `canonical` has trailing slash: `/blog/{slug}/`
- [ ] All URLs in JSON-LD are absolute
- [ ] Dates in ISO 8601 format with `+03:00` timezone
- [ ] Post added to `index.ts` (sorted by date)
- [ ] SEO imported and spread in `blog-seo.config.ts`
- [ ] URL added to `sitemap.xml`
- [ ] BreadcrumbList has 3 items: Головна → Блог → Post

**If using custom related articles:**
- [ ] All slugs in `relatedSlugs` exist in the blog
- [ ] Maximum 3 related slugs

**If using custom FAQ:**
- [ ] Each FAQ item has `question` and `answer`
- [ ] Answers are concise but informative

---

## Constants

**Base URL:** `https://www.advocate-pensia.com.ua`

**Author:**
```json
{
  "@type": "Person",
  "name": "Поддяча Юлія Юріївна",
  "url": "https://www.advocate-pensia.com.ua/about-me/"
}
```

**Publisher:**
```json
{
  "@type": "Organization",
  "name": "Адвокат Поддяча Юлія Юріївна",
  "logo": {
    "@type": "ImageObject",
    "url": "https://www.advocate-pensia.com.ua/assets/logo/logo-black-cut.png",
    "width": 512,
    "height": 512
  }
}
```

**Default OG Image:** `/assets/images/og/default-og-image.webp`

**Article Section:** `Пенсійне право`

**Language:** `uk-UA`

**Timezone:** `+03:00` (Ukraine)
