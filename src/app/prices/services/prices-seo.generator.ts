import { PageSEO } from '@core/services/seo.service';
import { PriceList } from '../data';

const BASE_URL = 'https://www.advocate-pensia.com.ua';
const PAGE_PATH = '/prices/';
const PAGE_URL = `${BASE_URL}${PAGE_PATH}`;
const BREADCRUMB_LABEL = 'Вартість послуг';

const TITLE = 'Вартість послуг пенсійного адвоката | Адвокат Поддяча Юлія';
const DESCRIPTION =
  'Орієнтовна вартість послуг пенсійного адвоката: консультації, перевірка стажу та документів, призначення і перерахунок пенсії, звернення до ПФУ та судовий супровід.';
const HEADINGS = [
  'Вартість послуг пенсійного адвоката',
  'Вартість юридичних послуг з пенсійних питань',
];

function lowerFirst(text: string): string {
  return text.charAt(0).toLowerCase() + text.slice(1);
}

export function generatePricesSeo(priceList: PriceList): PageSEO {
  const serviceTitles = priceList.groups.flatMap((group) =>
    group.services.map((service) => service.title)
  );

  return {
    title: TITLE,
    description: DESCRIPTION,
    keywords: [...HEADINGS, ...serviceTitles].map(lowerFirst).join(', '),
    canonical: PAGE_PATH,
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          '@id': `${PAGE_URL}#breadcrumbs`,
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
              name: BREADCRUMB_LABEL,
              item: {
                '@type': 'WebPage',
                '@id': PAGE_URL,
                name: BREADCRUMB_LABEL,
              },
            },
          ],
        },
        {
          '@type': 'WebPage',
          '@id': `${PAGE_URL}#webpage`,
          name: TITLE,
          description: DESCRIPTION,
          url: PAGE_URL,
          inLanguage: 'uk-UA',
          isPartOf: { '@id': `${BASE_URL}/#website` },
          about: { '@id': `${BASE_URL}/#org` },
          breadcrumb: { '@id': `${PAGE_URL}#breadcrumbs` },
        },
      ],
    },
  };
}
