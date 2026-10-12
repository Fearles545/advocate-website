import { PageSEO } from '@core/services/seo.service';
import {
  buildPriceFaq,
  formatPrice,
  Price,
  PriceList,
  priceListServices,
} from '../data';

const BASE_URL = 'https://www.advocate-pensia.com.ua';
const PAGE_PATH = '/prices/';
const PAGE_URL = `${BASE_URL}${PAGE_PATH}`;
const BREADCRUMB_LABEL = 'Вартість послуг';

const TITLE = 'Вартість послуг пенсійного адвоката | Адвокат Поддяча Юлія';
const DESCRIPTION =
  'Орієнтовна вартість послуг пенсійного адвоката: консультації, перевірка стажу та документів, призначення і перерахунок пенсії, звернення до ПФУ та судовий супровід.';
const PAGE_HEADING = 'Вартість послуг пенсійного адвоката';
const PRICE_LIST_HEADING = 'Вартість юридичних послуг з пенсійних питань';

function lowerFirst(text: string): string {
  return text.charAt(0).toLowerCase() + text.slice(1);
}

function priceSpecification(price: Price) {
  const amount =
    price.kind === 'fixed'
      ? { price: price.amount }
      : { minPrice: price.min, maxPrice: price.max };
  return { '@type': 'PriceSpecification', priceCurrency: 'UAH', ...amount };
}

function offerCatalog(priceList: PriceList) {
  const services = priceListServices(priceList);
  return {
    '@type': 'OfferCatalog',
    '@id': `${PAGE_URL}#offer-catalog`,
    name: PRICE_LIST_HEADING,
    url: PAGE_URL,
    numberOfItems: services.length,
    itemListElement: services.map((service) => ({
      '@type': 'Offer',
      url: `${PAGE_URL}#${service.id}`,
      offeredBy: { '@id': `${BASE_URL}/#org` },
      itemOffered: { '@type': 'Service', name: service.title },
      priceSpecification: priceSpecification(service.price),
    })),
  };
}

function faqPage(priceList: PriceList) {
  return {
    '@type': 'FAQPage',
    '@id': `${PAGE_URL}#faq`,
    inLanguage: 'uk-UA',
    mainEntity: buildPriceFaq(priceList, formatPrice).map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

export function generatePricesSeo(priceList: PriceList): PageSEO {
  const serviceTitles = priceListServices(priceList).map(
    (service) => service.title
  );

  return {
    title: TITLE,
    description: DESCRIPTION,
    keywords: [PAGE_HEADING, PRICE_LIST_HEADING, ...serviceTitles]
      .map(lowerFirst)
      .join(', '),
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
        offerCatalog(priceList),
        faqPage(priceList),
      ],
    },
  };
}
