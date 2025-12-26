/**
 * Court Case Data Model
 *
 * Comprehensive structure for pension law court cases.
 * Based on the case presentation template from court-case.md
 */

export interface RegistryLink {
  url: string;
  label?: string; // e.g., "Рішення першої інстанції", "Апеляційне рішення"
}

export interface RelatedArticle {
  title: string;
  slug: string; // Blog post slug for routerLink
}

export interface CourtCaseSeo {
  title?: string;
  description?: string;
  keywords?: string[];
}

export interface CourtCase {
  // === Basic Identification ===
  caseNumber: string; // e.g., "420/22036/25"
  title: string; // Main headline
  date: string; // Publication date (ISO format)

  // === Classification ===
  category?: string; // e.g., "пільговий стаж / Список №2 / відмова ПФУ"
  tags?: string[]; // For filtering: ["список-2", "пільговий-стаж", "відмова-пфу"]

  // === Registry Links ===
  registryLinks: RegistryLink[];

  // === Main Content Sections ===
  essence: string; // Суть справи (HTML allowed for formatting)
  courtReview: string; // Судовий розгляд (HTML allowed)
  result: string[]; // Результат - array of bullet points (plain text)

  // === Enrichment Sections ===
  usefulFor?: string[]; // "Кому буде корисно" bullet points

  // === Related Content ===
  relatedCaseNumbers?: string[]; // Links to other cases by caseNumber
  relatedArticles?: RelatedArticle[];

  // === SEO ===
  seo?: CourtCaseSeo;
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
