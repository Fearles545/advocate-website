import { PageSEO } from '@core/services/seo.service';
import { courtCases } from './cases';
import { generateCourtCaseSeo } from './services/court-case-seo.generator';

/**
 * Auto-generated SEO config for all court cases.
 * Keys are slugs (used as route path segments).
 */
export const COURT_CASES_SEO_DATA: { [key: string]: PageSEO } = Object.fromEntries(
  courtCases.map((courtCase) => [
    courtCase.slug,
    generateCourtCaseSeo(courtCase),
  ])
);
