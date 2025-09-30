/**
 * ШАБЛОН ЖОРСТКО ЗАХАРДКОДЖЕНОГО SEO-КОНФІГУ ДЛЯ ОКРЕМОГО ПОСТА
 *
 * Як використовувати:
 * 1) Заміни всі плейсхолдери у кутових дужках <...>.
 * 2) Перейменуй експорт змінної під свій slug у snake_case (для унікальності імпортів).
 * 3) Додай файл поруч із HTML поста.
 *
 * Конвенції:
 * - Ключ об’єкта зверху — це slug у kebab-case: '<slug-in-kebab-case>'
 * - 'keywords' у верхньому рівні — РЯДОК (зручно для <meta name="keywords">),
 *   а в JSON-LD — МАСИВ рядків (рекомендовано schema.org).
 * - У JSON-LD додано author.url та publisher.logo згідно з порадами.
 * - publisher у JSON-LD посилається на глобальний вузол організації через @id (…/#org); пост є частиною сайту через isPartOf (…/#website).
 */

export const slug_in_snake_case = {
  '<slug-in-kebab-case>': {
    title: '<H1> | Адвокат Поддяча Юлія Юріївна',
    description: '<короткий опис у 1–2 реченнях з ключовими словами>',
    keywords: '<ключ1, ключ2, ключ3>',
    type: 'article',
    publishedTime: '<YYYY-MM-DDThh:mm:ss+03:00>',
    modifiedTime: '<YYYY-MM-DDThh:mm:ss+03:00>',
    dateCreated: '<YYYY-MM-DDThh:mm:ss+03:00>',
    canonical: '/blog/<slug-in-kebab-case>/',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BlogPosting',
          headline: '<H1>',
          description:
            '<як у description, але можна трохи інакше сформулювати>',
          datePublished: '<YYYY-MM-DDThh:mm:ss+03:00>',
          dateModified: '<YYYY-MM-DDThh:mm:ss+03:00>',
          author: {
            '@type': 'Person',
            name: 'Поддяча Юлія Юріївна',
            url: 'https://www.advocate-pensia.com.ua/about-me/',
          },
          publisher: { '@id': 'https://www.advocate-pensia.com.ua/#org' },
          image: [
            'https://www.advocate-pensia.com.ua/assets/images/og/default-og-image.webp',
          ],
          inLanguage: 'uk-UA',
          isPartOf: { '@id': 'https://www.advocate-pensia.com.ua/#website' },
          keywords: ['<ключ1>', '<ключ2>', '<ключ3>'],
          articleSection: 'Пенсійне право',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id':
              'https://www.advocate-pensia.com.ua/blog/<slug-in-kebab-case>/',
          },
          url: 'https://www.advocate-pensia.com.ua/blog/<slug-in-kebab-case>/',
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Блог',
              item: 'https://www.advocate-pensia.com.ua/blog/',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: '<H1>',
              item: 'https://www.advocate-pensia.com.ua/blog/<slug-in-kebab-case>/',
            },
          ],
        },
      ],
    },
  },
};

// ===== Мінімальні типи для strict-перевірок важливих полів =====

export type IsoDateTime =
  `${number}-${number}-${number}T${number}:${number}:${number}${string}`;

export interface PostSeoEntry {
  title: string;
  description: string;
  /** Можна рядок "a, b, c" або масив */
  keywords: string | string[];
  type: 'article' | 'website';
  publishedTime: IsoDateTime;
  modifiedTime: IsoDateTime;
  /** Відносний canonical, напр. "/blog/my-slug" */
  canonical: `/${string}`;
  schema: BlogJsonLd;
}

export interface PostSeoConfig {
  /** Ключ — це slug у kebab-case */
  [slug: string]: PostSeoEntry;
}

/** ===== JSON-LD (мінімально достатньо, без монструозності) ===== */

export interface BlogJsonLd {
  '@context': 'https://schema.org';
  '@graph': [BlogPosting, BreadcrumbList];
}

export interface BlogPosting {
  '@type': 'BlogPosting';
  headline: string;
  description: string;
  datePublished: IsoDateTime;
  dateModified: IsoDateTime;
  author: Person;
  publisher: OrganizationRef;
  image: string[]; // масив URL
  inLanguage: string;
  isPartOf?: { '@id': string };
  keywords: string[]; // масив ключових слів
  articleSection?: string;
  mainEntityOfPage: {
    '@type': 'WebPage';
    '@id': string; // абсолютний URL
  };
  url: string; // абсолютний URL
}

export interface BreadcrumbList {
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item: string; // абсолютний URL
  }>;
}

export interface Person {
  '@type': 'Person';
  name: string;
  url?: string;
}

export interface OrganizationRef {
  '@id': string;
}

export interface Organization {
  '@type': 'Organization';
  name: string;
  logo?: ImageObject;
}

export interface ImageObject {
  '@type': 'ImageObject';
  url: string;
  width?: number;
  height?: number;
}
