/**
 * Court Case Data Model
 *
 * Comprehensive structure for pension law court cases.
 * SEO is auto-generated from case data with optional overrides.
 */

export interface RegistryLink {
  url: string;
  label?: string; // e.g., "Рішення першої інстанції", "Апеляційне рішення"
}

/**
 * SEO override fields.
 * When not provided, values are auto-generated from case data.
 */
export interface CourtCaseSeoOverrides {
  title?: string; // Override: defaults to `${title} | Адвокат...`
  description?: string; // Override: defaults to first 155 chars of essence
  keywords?: string[]; // Override: defaults to tags
}

export interface CourtCase {
  // === Identification ===
  slug: string; // Unique identifier for URL and tracking (e.g., "420-14018-25-appeal")
  caseNumber: string; // Official court case number for display (e.g., "420/14018/25")
  title: string; // Main headline
  date: string; // Publication date (ISO format: YYYY-MM-DD)

  // === Classification ===
  tags: string[]; // Required for filtering and SEO keywords

  // === Registry Links ===
  registryLinks: RegistryLink[];

  // === Main Content ===
  essence: string; // Суть справи (HTML allowed)
  courtReview: string; // Судовий розгляд (HTML allowed)
  result: string[]; // Результат - bullet points (plain text)

  // === Enrichment ===
  usefulFor?: string[]; // "Кому буде корисно" bullet points

  // === Related Content (for internal linking / SEO) ===
  relatedCaseSlugs?: string[]; // Links to other cases by slug
  relatedBlogSlugs?: string[]; // Links to blog posts by slug

  // === SEO Overrides ===
  seo?: CourtCaseSeoOverrides;
}

/**
 * Universal FAQ for all court case pages.
 * Defined separately as it's the same for all cases.
 */
export interface FaqItem {
  question: string;
  answer: string;
}

export const COURT_CASE_FAQ: FaqItem[] = [
  {
    question: 'Чи можна застосувати це судове рішення до моєї ситуації?',
    answer:
      'Кожна пенсійна справа має свої обставини, але подібні рішення показують, що відмови Пенсійного фонду часто є незаконними. Якщо ваша ситуація схожа — є підстави для захисту прав, у тому числі в судовому порядку.',
  },
  {
    question: 'Чи гарантує виграш у суді наявність такого рішення?',
    answer:
      'Ні, суд не приймає рішення автоматично. Але позитивна судова практика суттєво підсилює правову позицію та збільшує шанси на успішний результат за умови правильно підготовлених документів.',
  },
  {
    question: "Чи обов'язково звертатися до суду, якщо Пенсійний фонд відмовив?",
    answer:
      'Не завжди. У деяких випадках проблему можна вирішити шляхом повторного звернення або подання додаткових документів. Однак, якщо ПФУ наполягає на відмові — судовий захист є ефективним інструментом.',
  },
  {
    question: 'Скільки часу займає розгляд пенсійної справи в суді?',
    answer:
      'Тривалість розгляду залежить від складності справи, судової інстанції та завантаженості суду. У середньому розгляд у суді першої інстанції може тривати кілька місяців. Апеляційний або касаційний перегляд — довше.',
  },
  {
    question:
      'Чи можна звернутися за допомогою, якщо я проживаю в іншому місті або за кордоном?',
    answer:
      'Так. Юридична допомога з пенсійних питань надається дистанційно — консультації, підготовка документів і супровід справ можливі онлайн.',
  },
];
