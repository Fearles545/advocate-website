import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';

import { courtCases, CourtCase } from '../cases';
import { CourtCasesPaginationService } from '../services/court-cases-pagination.service';
import { UkrainianPaginatorIntl } from '../../core/services/ukrainian-paginator-intl.service';

@Component({
  selector: 'app-court-cases-list',
  imports: [RouterLink, MatIcon, DatePipe, MatPaginatorModule],
  providers: [{ provide: MatPaginatorIntl, useClass: UkrainianPaginatorIntl }],
  template: `
    <div class="court-cases-container">
      @if (courtCases.length === 0) {
        <div class="empty-state">
          <mat-icon>gavel</mat-icon>
          <p>Судові справи скоро з'являться</p>
        </div>
      } @else {
        <ul class="court-cases-list">
          @for (courtCase of paginatedCases(); track courtCase.slug) {
            <li>
              <a [routerLink]="['/court-cases', courtCase.slug]">
                <div class="case-info">
                  <p class="case-title">{{ courtCase.title }}</p>
                  @if (courtCase.caseNumber) {
                    <small class="case-number">{{ courtCase.caseNumber }}</small>
                  }
                  <small class="case-date">
                    {{ courtCase.date | date: 'dd-MM-yyyy' }}
                  </small>
                </div>
                @if (courtCase.outcome) {
                  <span class="outcome-badge" [class]="courtCase.outcome">
                    @switch (courtCase.outcome) {
                      @case ('win') {
                        Виграно
                      }
                      @case ('partial') {
                        Часткове
                      }
                      @case ('pending') {
                        В процесі
                      }
                    }
                  </span>
                }
                <mat-icon class="arrow-icon" color="primary">
                  arrow_forward_ios
                </mat-icon>
              </a>
            </li>
          }
        </ul>
        <mat-paginator
          [length]="courtCases.length"
          [pageSize]="pageSize()"
          [pageIndex]="pageIndex()"
          [hidePageSize]="true"
          (page)="handlePageEvent($event)"
          aria-label="Оберіть сторінку"
        >
        </mat-paginator>
      }
    </div>
  `,
  styles: `
    :host {
      max-width: var(--container-max-width);
      width: 100%;
      margin: 0 auto;
      padding: 1rem;
    }

    .court-cases-container {
      border-radius: 0.5rem;
      border: 1px solid var(--color-green);
      box-shadow: var(--color-green) 0 0 0.25rem;
      background-color: #f0f2f3;
      max-width: 800px;
      margin: 0 auto;
      overflow: hidden;
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 3rem 1rem;
      color: var(--color-green);

      mat-icon {
        font-size: 3rem;
        width: 3rem;
        height: 3rem;
        margin-bottom: 1rem;
        opacity: 0.6;
      }

      p {
        margin: 0;
        font-size: 1.125rem;
        opacity: 0.8;
      }
    }

    .court-cases-list {
      display: flex;
      flex-direction: column;
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        border-bottom: 1px solid var(--color-green);
        transition: background-color 0.3s ease;

        &:hover {
          background-color: #0027060f;
        }

        a {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          color: var(--color-green);

          &:hover {
            color: var(--color-navy);

            .arrow-icon {
              color: var(--color-gold);
            }
          }
        }
      }
    }

    .case-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .case-title {
      margin: 0;
      font-weight: 600;
    }

    .case-number {
      color: var(--color-gold);
      font-weight: 500;
    }

    .case-date {
      color: grey;
    }

    .outcome-badge {
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      white-space: nowrap;

      &.win {
        background-color: #d4edda;
        color: #155724;
      }

      &.partial {
        background-color: #fff3cd;
        color: #856404;
      }

      &.pending {
        background-color: #cce5ff;
        color: #004085;
      }
    }

    .arrow-icon {
      transition: color 0.3s ease;
    }

    mat-paginator {
      background-color: transparent;
      color: var(--color-navy);
    }
  `,
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
}
