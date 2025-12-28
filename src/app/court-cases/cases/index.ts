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

/**
 * All court cases data.
 * Sorted by date (newest first).
 */
export const courtCases: CourtCase[] = [
  case_582_867_21,
  case_420_14018_25,
  case_420_14489_25,
  case_420_14018_25_appeal,
  case_200_5966_25,
  case_200_7851_25,
  case_420_22036_25,
  case_500_5783_25,
].sort((a, b) => b.date.localeCompare(a.date));

/**
 * Find a court case by its case number.
 */
export function findCourtCase(caseNumber: string): CourtCase | undefined {
  return courtCases.find((c) => c.caseNumber === caseNumber);
}

/**
 * Get related court cases by case numbers.
 */
export function getRelatedCases(caseNumbers: string[]): CourtCase[] {
  return caseNumbers
    .map((num) => findCourtCase(num))
    .filter((c): c is CourtCase => c !== undefined);
}
