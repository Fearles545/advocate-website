import { PageSEO } from '@core/services/seo.service';
import { PRICE_LIST } from './data';
import { generatePricesSeo } from './services/prices-seo.generator';

export const PRICES_SEO_DATA: { [key: string]: PageSEO } = {
  prices: generatePricesSeo(PRICE_LIST),
};
