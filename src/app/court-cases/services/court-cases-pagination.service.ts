import { Injectable } from '@angular/core';

import { CategoryListState } from '@shared/category-list';
import {
  CourtCase,
  courtCases,
  DecisionCategorySlug,
  isDecisionCategorySlug,
} from '../cases';

/** The court decisions list's root-provided state: category, page and page size. */
@Injectable({
  providedIn: 'root',
})
export class CourtCasesPaginationService extends CategoryListState<
  DecisionCategorySlug,
  CourtCase
> {
  constructor() {
    super({
      listPath: '/court-cases',
      items: courtCases,
      isCategory: isDecisionCategorySlug,
    });
  }
}
