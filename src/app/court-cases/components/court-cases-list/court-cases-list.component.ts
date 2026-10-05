import { Component, computed, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';

import {
  CategoryFilterComponent,
  CategoryOption,
} from '@shared/components/category-filter';
import {
  CourtCase,
  courtCases,
  DECISION_CATEGORIES,
  DecisionCategorySlug,
  isDecisionCategorySlug,
} from '../../cases';
import { CourtCasesPaginationService } from '../../services/court-cases-pagination.service';
import { UkrainianPaginatorIntl } from '../../../core/services/ukrainian-paginator-intl.service';
import { CaseRoutePipe } from '../../pipes/case-route.pipe';

@Component({
  selector: 'app-court-cases-list',
  imports: [
    RouterLink,
    MatIcon,
    DatePipe,
    MatPaginatorModule,
    CaseRoutePipe,
    CategoryFilterComponent,
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: UkrainianPaginatorIntl }],
  templateUrl: './court-cases-list.component.html',
  styleUrl: './court-cases-list.component.css',
})
export class CourtCasesListComponent implements OnInit {
  private paginationService = inject(CourtCasesPaginationService);
  private route = inject(ActivatedRoute);
  private location = inject(Location);

  courtCases = courtCases;

  readonly pageSize = this.paginationService.pageSize;
  readonly pageIndex = this.paginationService.pageIndex;
  readonly selectedCategory = computed(() =>
    this.paginationService.selectedCategory()
  );

  readonly categoryOptions: readonly CategoryOption<DecisionCategorySlug>[] =
    DECISION_CATEGORIES;
  readonly categoryCounts = countByCategory(courtCases);

  readonly filteredCases = computed(() => {
    const category = this.selectedCategory();
    if (!category) {
      return this.courtCases;
    }
    return this.courtCases.filter((courtCase) =>
      courtCase.categories.includes(category)
    );
  });

  readonly paginatedCases = computed(() => {
    const startIndex = this.pageIndex() * this.pageSize();
    const endIndex = startIndex + this.pageSize();
    return this.filteredCases().slice(startIndex, endIndex);
  });

  ngOnInit(): void {
    const urlCategory = this.route.snapshot.queryParamMap.get('category');

    if (urlCategory && isDecisionCategorySlug(urlCategory)) {
      this.paginationService.updateCategory(urlCategory);
    } else if (!urlCategory && this.selectedCategory()) {
      this.location.replaceState(
        `/court-cases?category=${this.selectedCategory()}`
      );
    }

    this.clampPageIndex();
  }

  handlePageEvent(event: PageEvent) {
    this.paginationService.updatePage(event.pageIndex, event.pageSize);
  }

  handleCategoryChange(category: DecisionCategorySlug | null): void {
    this.paginationService.updateCategory(category);

    const url = category ? `/court-cases?category=${category}` : '/court-cases';
    this.location.replaceState(url);
  }

  private clampPageIndex(): void {
    const totalPages = Math.ceil(this.filteredCases().length / this.pageSize());
    if (totalPages > 0 && this.pageIndex() >= totalPages) {
      this.paginationService.updatePage(totalPages - 1, this.pageSize());
    }
  }
}

/** A decision counts once in each of its categories. */
function countByCategory(
  cases: readonly CourtCase[]
): Partial<Record<DecisionCategorySlug, number>> {
  const counts: Partial<Record<DecisionCategorySlug, number>> = {};
  for (const courtCase of cases) {
    for (const category of courtCase.categories) {
      counts[category] = (counts[category] ?? 0) + 1;
    }
  }
  return counts;
}
