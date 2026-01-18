/**
 * Court Case Input Format for Claude AI
 *
 * Fill in this template and I'll create:
 * - Case TypeScript file
 * - Register in index.ts
 * - Update sitemap.xml
 *
 * SEO is auto-generated from case data (no separate SEO file needed)
 */

// Common tags for consistency
type CommonTag =
  | 'пенсія за віком'
  | 'пільгова пенсія'
  | 'пенсія за вислугу років'
  | 'страховий стаж'
  | 'спеціальний стаж'
  | 'індексація пенсії'
  | 'перерахунок пенсії'
  | 'Список №1'
  | 'Список №2'
  | string; // Allow custom tags

interface RegistryLink {
  url: string;
  label?: string; // e.g., "Апеляційне рішення" for appeals
}

interface SeoOverrides {
  title?: string; // Defaults to: {title} | Адвокат...
  description?: string; // Defaults to: first 155 chars of essence
  keywords?: string[]; // Defaults to: tags
}

interface CourtCaseInput {
  caseNumber: string; // Display format: "420/14018/25"
  slug?: string; // URL segment (auto-generated from caseNumber if not provided)
  // For appeals, provide explicit slug: "420-14018-25-appeal"

  title: string; // Main headline describing outcome
  date: string; // Publication date: YYYY-MM-DD

  tags: CommonTag[]; // For filtering and SEO keywords

  registryLinks: RegistryLink[]; // Court registry URL(s)

  // === Main Content (markdown supported, converted to HTML) ===
  essence: string; // Суть справи - background, what went wrong
  courtReview: string; // Судовий розгляд - court's analysis
  result: string[]; // Результат - outcome bullet points (plain text)

  // === Optional ===
  usefulFor?: string[]; // Кому буде корисно - target audience
  relatedCases?: string[]; // Related case slugs
  relatedBlogs?: string[]; // Related blog post slugs

  seo?: SeoOverrides; // Override auto-generated SEO
}

// =============================================================================
// FILL IN YOUR COURT CASE BELOW
// =============================================================================

export const courtCaseInput: CourtCaseInput = {
  caseNumber: '000/0000/00', // e.g., "420/14018/25"
  // slug: '420-14018-25-appeal',  // Only if different from auto-generated

  title: 'Заголовок справи, що описує результат',

  date: '2026-01-18', // YYYY-MM-DD

  tags: ['пенсія за віком', 'страховий стаж'],

  registryLinks: [
    { url: 'https://reyestr.court.gov.ua/Review/XXXXXXXX' },
    // For appeals with multiple decisions:
    // { url: '...', label: 'Рішення першої інстанції' },
    // { url: '...', label: 'Апеляційне рішення' },
  ],

  essence: `
Опис ситуації клієнта.

Що сталося з Пенсійним фондом.

**Виділення** важливих моментів.
`,

  courtReview: `
Висновки суду.

Можна використовувати списки:
- пункт 1
- пункт 2

Або нумеровані:
1. перше
2. друге
`,

  result: [
    'Перший результат справи',
    'Другий результат справи',
    'Третій результат справи',
  ],

  usefulFor: [
    'Опис ситуації, для якої корисна ця справа',
    'Інша подібна ситуація',
  ],

  relatedCases: [
    // '420-14018-25',
    // '500-5783-25',
  ],

  relatedBlogs: [
    // 'nepravylna-indeksatsiia-pensii-...',
  ],

  // seo: {
  //   title: 'Custom SEO title if needed',
  //   description: 'Custom description if auto-generated is not good',
  // },
};
