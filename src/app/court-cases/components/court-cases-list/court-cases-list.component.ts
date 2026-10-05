import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

import {
  CategoryFilterComponent,
  CategoryOption,
} from '@shared/components/category-filter';
import { PaginationComponent } from '@shared/components/pagination';
import {
  courtCases,
  DECISION_CATEGORIES,
  DecisionCategorySlug,
} from '../../cases';
import { CourtCasesPaginationService } from '../../services/court-cases-pagination.service';
import { CaseRoutePipe } from '../../pipes/case-route.pipe';

@Component({
  selector: 'app-court-cases-list',
  imports: [
    RouterLink,
    MatIcon,
    DatePipe,
    CaseRoutePipe,
    CategoryFilterComponent,
    PaginationComponent,
  ],
  templateUrl: './court-cases-list.component.html',
  styleUrl: './court-cases-list.component.css',
})
export class CourtCasesListComponent implements OnInit {
  private route = inject(ActivatedRoute);
  protected readonly list = inject(CourtCasesPaginationService);

  courtCases = courtCases;

  readonly categoryOptions: readonly CategoryOption<DecisionCategorySlug>[] =
    DECISION_CATEGORIES;

  ngOnInit(): void {
    this.list.restoreFromUrl(this.route.snapshot.queryParamMap);
  }
}
