export type {
  CourtCase,
  CourtCaseSeoOverrides,
  FaqItem,
} from './court-case.model';
export { COURT_CASE_FAQ } from './court-case.model';

import { CourtCase } from './court-case.model';
import { case_582_867_21 } from './582-867-21-case';
import { case_420_14018_25 } from './420-14018-25-case';
import { case_420_14489_25 } from './420-14489-25-case';
import { case_200_5966_25 } from './200-5966-25-case';
import { case_200_7851_25 } from './200-7851-25-case';
import { case_420_22036_25 } from './420-22036-25-case';
import { case_500_5783_25 } from './500-5783-25-case';
import { case_420_14018_25_appeal } from './420-14018-25-case-appeal';
import { case_280_9134_25 } from './280-9134-25-case';
import { case_420_14018_25_cassation } from './420-14018-25-case-cassation';

/**
 * All court cases data.
 * Sorted by date (newest first).
 */
export const courtCases: CourtCase[] = [
  case_582_867_21,
  case_420_14018_25,
  case_420_14489_25,
  case_420_14018_25_appeal,
  case_420_14018_25_cassation,
  case_200_5966_25,
  case_200_7851_25,
  case_420_22036_25,
  case_500_5783_25,
  case_280_9134_25,
].sort((a, b) => b.date.localeCompare(a.date));

/**
 * Find a court case by its slug.
 */
export function findBySlug(slug: string): CourtCase | undefined {
  return courtCases.find((c) => c.slug === slug);
}

/**
 * Get related court cases by slugs.
 */
export function getRelatedCases(slugs: string[]): CourtCase[] {
  return slugs
    .map((slug) => findBySlug(slug))
    .filter((c): c is CourtCase => c !== undefined);
}
