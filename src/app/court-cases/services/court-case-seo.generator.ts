import { PageSEO } from '@core/services/seo.service';
import { CourtCase } from '../cases';

const BASE_URL = 'https://www.advocate-pensia.com.ua';
const AUTHOR_NAME = 'Поддяча Юлія Юріївна';

/**
 * Strip HTML tags from a string.
 */
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

/**
 * Convert date string (YYYY-MM-DD) to ISO datetime with timezone.
 */
function toIsoDateTime(dateStr: string): string {
  return `${dateStr}T12:00:00+02:00`;
}

/**
 * Generate SEO configuration for a court case.
 * Uses case data for defaults, with optional overrides from case.seo.
 */
export function generateCourtCaseSeo(courtCase: CourtCase): PageSEO {
  const caseUrl = `${BASE_URL}/court-cases/${courtCase.caseNumber}/`;
  const canonicalPath = `/court-cases/${courtCase.caseNumber}/`;

  // Generate defaults from case data
  const defaultTitle = `${courtCase.title} | Адвокат ${AUTHOR_NAME}`;
  const defaultDescription = stripHtml(courtCase.essence).slice(0, 155) + '...';
  const defaultKeywords = courtCase.tags;

  // Apply overrides if provided
  const title = courtCase.seo?.title ?? defaultTitle;
  const description = courtCase.seo?.description ?? defaultDescription;
  const keywords = courtCase.seo?.keywords ?? defaultKeywords;
  const keywordsString = keywords.join(', ');

  const isoDate = toIsoDateTime(courtCase.date);

  return {
    title,
    description,
    keywords: keywordsString,
    type: 'article',
    canonical: canonicalPath,
    publishedTime: isoDate,
    modifiedTime: isoDate,
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        // BreadcrumbList
        {
          '@type': 'BreadcrumbList',
          '@id': `${caseUrl}#breadcrumbs`,
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Головна',
              item: {
                '@type': 'WebPage',
                '@id': `${BASE_URL}/`,
                name: 'Головна',
              },
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Судові рішення',
              item: {
                '@type': 'WebPage',
                '@id': `${BASE_URL}/court-cases/`,
                name: 'Судові рішення',
              },
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: courtCase.title,
              item: {
                '@type': 'WebPage',
                '@id': caseUrl,
                name: courtCase.title,
              },
            },
          ],
        },
        // WebPage
        {
          '@type': 'WebPage',
          '@id': `${caseUrl}#webpage`,
          name: title,
          url: caseUrl,
          inLanguage: 'uk-UA',
          isPartOf: { '@id': `${BASE_URL}/#website` },
          breadcrumb: { '@id': `${caseUrl}#breadcrumbs` },
        },
        // Article (court case as legal article)
        {
          '@type': 'Article',
          '@id': `${caseUrl}#article`,
          headline: courtCase.title,
          description,
          datePublished: isoDate,
          dateModified: isoDate,
          author: {
            '@type': 'Person',
            name: AUTHOR_NAME,
            url: `${BASE_URL}/about-me/`,
          },
          publisher: { '@id': `${BASE_URL}/#org` },
          image: [`${BASE_URL}/assets/images/og/default-og-image.webp`],
          inLanguage: 'uk-UA',
          isPartOf: { '@id': `${BASE_URL}/#website` },
          keywords,
          articleSection: 'Судові рішення',
          mainEntityOfPage: { '@id': `${caseUrl}#webpage` },
          url: caseUrl,
          about: {
            '@type': 'Thing',
            name: `Справа №${courtCase.caseNumber}`,
            description: `Пенсійна справа: ${courtCase.tags.join(', ')}`,
          },
        },
      ],
    },
  };
}
