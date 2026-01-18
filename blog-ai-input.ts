/**
 * Blog Input Format for Claude AI
 *
 * Fill in this template and I'll create:
 * - HTML post file
 * - SEO config file
 * - Register in index.ts
 * - Update blog-seo.config.ts
 * - Update sitemap.xml
 */

// Available categories (use Ukrainian labels - I'll convert to slugs)
type CategoryLabel =
  | 'Загальні пенсійні питання' // → general
  | 'Пенсія за віком' // → pension-by-age
  | 'Пільгова пенсія' // → preferential
  | 'Дострокова пенсія' // → early-retirement
  | 'Пенсія за вислугу років' // → service-years
  | 'Стаж, індексація та перерахунок'; // → service-record

interface FaqItem {
  q: string; // Question
  a: string; // Answer
}

interface BlogInput {
  title: string; // H1 title (I'll generate slug from this)
  date: string; // YYYY-MM-DD format
  category: CategoryLabel; // Pick from list above
  src?: string | string[]; // YouTube embed URL(s), optional
  relatedSlugs?: string[]; // Existing blog slugs for related articles, optional
  faq?: FaqItem[] | string; // FAQ as array or markdown string, optional
  content: string; // Article content in markdown
}

// =============================================================================
// FILL IN YOUR BLOG POST BELOW
// =============================================================================

export const blogAiInput: BlogInput = {
  title: '',

  date: '', // YYYY-MM-DD

  category: 'Загальні пенсійні питання',

  src: '', // YouTube embed URL or ['url1', 'url2'] for multiple

  relatedSlugs: [
    // 'existing-post-slug-1',
    // 'existing-post-slug-2',
  ],

  faq: [
    // { q: 'Питання 1?', a: 'Відповідь 1.' },
    // { q: 'Питання 2?', a: 'Відповідь 2.' },
  ],

  // OR use markdown format for FAQ:
  // faq: `
  // **1. Питання?**
  // Відповідь.
  //
  // **2. Питання?**
  // Відповідь.
  // `,

  content: `
Your markdown content here...

---

## Section Title

Content...

---

## Another Section

* bullet point
* bullet point
`,
};
