import { PageSEO } from '@core/services/seo.service';
import { Instruction } from '../data';

const BASE_URL = 'https://www.advocate-pensia.com.ua';
const AUTHOR_NAME = 'Поддяча Юлія Юріївна';

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

function toIsoDateTime(dateStr: string): string {
  return `${dateStr}T12:00:00+02:00`;
}

function estimatedTimeToIsoDuration(time: string): string | undefined {
  const match = time.match(/(\d+)/);
  if (!match) return undefined;
  return `PT${match[1]}M`;
}

export function generateInstructionSeo(instruction: Instruction): PageSEO {
  const instructionUrl = `${BASE_URL}/instructions/${instruction.slug}/`;
  const canonicalPath = `/instructions/${instruction.slug}/`;

  const defaultTitle = `${instruction.title} | Адвокат ${AUTHOR_NAME}`;
  const defaultDescription =
    stripHtml(instruction.intro).slice(0, 155) + '...';
  const defaultKeywords = [
    instruction.shortTitle.toLowerCase(),
    instruction.category === 'kep' ? 'електронний підпис' : '',
    instruction.category === 'dovidky' ? 'довідка' : '',
    'покрокова інструкція',
    'пенсія',
  ].filter(Boolean);

  const title = instruction.seo?.title ?? defaultTitle;
  const description = instruction.seo?.description ?? defaultDescription;
  const keywords = instruction.seo?.keywords ?? defaultKeywords;
  const keywordsString = keywords.join(', ');
  const isoDate = toIsoDateTime(instruction.date);

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
        {
          '@type': 'BreadcrumbList',
          '@id': `${instructionUrl}#breadcrumbs`,
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
              name: 'Інструкції',
              item: {
                '@type': 'WebPage',
                '@id': `${BASE_URL}/instructions/`,
                name: 'Інструкції',
              },
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: instruction.shortTitle,
              item: {
                '@type': 'WebPage',
                '@id': instructionUrl,
                name: instruction.shortTitle,
              },
            },
          ],
        },
        {
          '@type': 'WebPage',
          '@id': `${instructionUrl}#webpage`,
          name: title,
          url: instructionUrl,
          inLanguage: 'uk-UA',
          isPartOf: { '@id': `${BASE_URL}/#website` },
          breadcrumb: { '@id': `${instructionUrl}#breadcrumbs` },
        },
        {
          '@type': 'HowTo',
          '@id': `${instructionUrl}#howto`,
          name: instruction.title,
          description: stripHtml(instruction.intro),
          ...(instruction.estimatedTime
            ? {
                totalTime: estimatedTimeToIsoDuration(
                  instruction.estimatedTime
                ),
              }
            : {}),
          inLanguage: 'uk-UA',
          author: {
            '@type': 'Person',
            name: AUTHOR_NAME,
            url: `${BASE_URL}/about-me/`,
          },
          publisher: { '@id': `${BASE_URL}/#org` },
          mainEntityOfPage: { '@id': `${instructionUrl}#webpage` },
          step: instruction.steps.map((step, index) => ({
            '@type': 'HowToStep',
            position: index + 1,
            name: step.title,
            text: step.description,
            ...(step.image
              ? {
                  image: {
                    '@type': 'ImageObject',
                    url: `${BASE_URL}${step.image}`,
                  },
                }
              : {}),
          })),
        },
      ],
    },
  };
}
