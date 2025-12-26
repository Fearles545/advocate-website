import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';

import { courtCases } from '../../cases';
import { CourtCasesPaginationService } from '../../services/court-cases-pagination.service';
import { UkrainianPaginatorIntl } from '../../../core/services/ukrainian-paginator-intl.service';

@Component({
  selector: 'app-court-cases-list',
  imports: [RouterLink, MatIcon, DatePipe, MatPaginatorModule],
  providers: [{ provide: MatPaginatorIntl, useClass: UkrainianPaginatorIntl }],
  templateUrl: './court-cases-list.component.html',
  styleUrl: './court-cases-list.component.css',
})
export class CourtCasesListComponent {
  private paginationService = inject(CourtCasesPaginationService);

  courtCases = courtCases;

  readonly pageSize = this.paginationService.pageSize;
  readonly pageIndex = this.paginationService.pageIndex;

  readonly paginatedCases = computed(() => {
    const startIndex = this.pageIndex() * this.pageSize();
    const endIndex = startIndex + this.pageSize();
    return this.courtCases.slice(startIndex, endIndex);
  });

  handlePageEvent(event: PageEvent) {
    this.pageIndex.set(event.pageIndex);
  }

  getCaseRoute(caseNumber: string): string[] {
    return ['/court-cases', ...caseNumber.split('/')];
  }
}
