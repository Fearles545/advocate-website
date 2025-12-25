import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';

import { courtCases } from '../cases';
import { CourtCasesPaginationService } from '../services/court-cases-pagination.service';
import { UkrainianPaginatorIntl } from '../../core/services/ukrainian-paginator-intl.service';

@Component({
  selector: 'app-court-cases-list',
  imports: [RouterLink, MatIcon, DatePipe, MatPaginatorModule],
  providers: [{ provide: MatPaginatorIntl, useClass: UkrainianPaginatorIntl }],
  template: `
    <section class="court-cases-page-bg">
      <div class="court-cases-page">
        <header class="page-header">
          <div class="header-badge">
            <mat-icon>gavel</mat-icon>
          </div>

          <h1>Судові рішення у пенсійних справах</h1>

          <p class="intro-text">
            У цьому розділі зібрані
            <strong>судові рішення у спорах з Пенсійним фондом України</strong>,
            які були успішно супроводжені адвокатом з пенсійних питань
            <strong>Поддячою Юлією Юріївною</strong>.
          </p>

          <p class="intro-text secondary">
            Розділ регулярно оновлюється, тому ви можете переглянути найновіші
            судові рішення, переконатися у практичному досвіді адвоката та
            оцінити результати пенсійних справ.
          </p>
        </header>

        @if (courtCases.length === 0) {
          <div class="empty-state">
            <mat-icon>folder_open</mat-icon>
            <p>Судові справи скоро з'являться</p>
          </div>
        } @else {
          <div class="court-cases-grid">
            @for (courtCase of paginatedCases(); track courtCase.caseNumber) {
              <article class="court-case-card">
                <div class="victory-badge">
                  <mat-icon>check_circle</mat-icon>
                </div>

                <a [routerLink]="['/court-cases', courtCase.caseNumber]">
                  <div class="card-header">
                    <span class="case-number"
                      >Справа №{{ courtCase.caseNumber }}</span
                    >
                    <time class="case-date" [attr.datetime]="courtCase.date">
                      {{ courtCase.date | date: 'dd.MM.yyyy' }}
                    </time>
                  </div>

                  <h3 class="case-title">{{ courtCase.title }}</h3>

                  <div class="card-footer">
                    <span class="read-more">Детальніше</span>
                    <mat-icon class="card-arrow">arrow_forward</mat-icon>
                  </div>
                </a>
              </article>
            }
          </div>

          @if (courtCases.length > pageSize()) {
            <mat-paginator
              [length]="courtCases.length"
              [pageSize]="pageSize()"
              [pageIndex]="pageIndex()"
              [hidePageSize]="true"
              (page)="handlePageEvent($event)"
              aria-label="Оберіть сторінку"
            />
          }
        }
      </div>
    </section>
  `,
  styles: `
    .court-cases-page-bg {
      background:
        url('/assets/images/main/first-section.pattern.svg'),
        linear-gradient(
          180deg,
          #f5f2ed 0%,
          #faf8f5 25%,
          #ffffff 50%,
          #faf8f5 75%,
          #f5f2ed 100%
        );
      min-height: 100vh;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: linear-gradient(
          90deg,
          transparent 0%,
          var(--color-gold-light) 20%,
          var(--color-gold) 50%,
          var(--color-gold-light) 80%,
          transparent 100%
        );
      }
    }

    .court-cases-page {
      max-width: var(--section-max-width-narrow);
      margin: 0 auto;
      padding: var(--section-padding-y) var(--section-padding-x);
    }

    .page-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .header-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--icon-wrapper-lg);
      height: var(--icon-wrapper-lg);
      background: linear-gradient(
        135deg,
        var(--color-green) 0%,
        var(--color-green-dark) 100%
      );
      border-radius: 50%;
      margin-bottom: 1.5rem;
      box-shadow:
        0 4px 20px rgba(0, 39, 6, 0.25),
        inset 0 1px 0 rgba(201, 165, 92, 0.15);

      mat-icon {
        font-size: 2rem;
        width: 2rem;
        height: 2rem;
        color: var(--color-gold);
      }
    }

    .page-header h1 {
      font-size: 2rem;
      margin: 0 0 1.5rem;
      line-height: 1.3;
      position: relative;
      display: inline-block;
      padding-bottom: 1.25rem;

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: var(--header-underline-width-accent);
        height: 3px;
        background: var(--header-underline-gradient);
        border-radius: 2px;
      }
    }

    .intro-text {
      max-width: 700px;
      margin: 0 auto 1rem;
      font-size: var(--section-intro-font-size);
      line-height: 1.65;
      color: var(--text-color-primary);

      strong {
        color: var(--color-green);
        font-weight: var(--weight-semibold);
      }

      &.secondary {
        color: var(--text-color-secondary);
        font-size: 1rem;
        margin-bottom: 0;
      }
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 4rem 2rem;
      color: var(--text-color-secondary);
      background: white;
      border-radius: var(--card-border-radius);
      border: var(--card-border);
      box-shadow: var(--card-box-shadow);

      mat-icon {
        font-size: 3rem;
        width: 3rem;
        height: 3rem;
        margin-bottom: 1rem;
        opacity: 0.5;
      }

      p {
        margin: 0;
        font-size: 1.1rem;
      }
    }

    .court-cases-grid {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .court-case-card {
      position: relative;
      background: linear-gradient(135deg, #fffdf8 0%, #fff 100%);
      border-radius: var(--card-border-radius);
      overflow: hidden;
      box-shadow:
        0 8px 32px rgba(0, 0, 0, 0.08),
        0 2px 8px rgba(0, 0, 0, 0.04);
      transition:
        transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
        box-shadow var(--transition-normal);

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(
          90deg,
          var(--color-gold) 0%,
          var(--color-gold-light) 50%,
          var(--color-gold) 100%
        );
      }

      a {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        padding: 1.5rem;
        padding-top: 1.75rem;
        text-decoration: none;
        color: inherit;
        min-height: 100%;
      }

      &:hover {
        transform: translateY(-6px) scale(1.01);
        box-shadow:
          0 16px 48px rgba(0, 0, 0, 0.12),
          0 8px 24px rgba(0, 0, 0, 0.08),
          0 0 0 1px rgba(201, 165, 92, 0.3);

        .case-title {
          color: var(--color-gold-accent);
        }

        .card-arrow {
          transform: translateX(4px);
          color: var(--color-gold);
        }

        .victory-badge {
          transform: scale(1.05);
        }
      }
    }

    .victory-badge {
      position: absolute;
      top: 1rem;
      right: 1rem;
      display: flex;
      align-items: center;
      gap: 0.35rem;
      padding: 0.1rem;
      background: var(--color-success-bg);
      border-radius: 2rem;
      box-shadow:
        0 2px 8px rgba(0, 39, 6, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
      transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);

      mat-icon {
        font-size: 1rem;
        width: 1rem;
        height: 1rem;
        color: var(--color-gold);
      }
    }

    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      padding-right: 2.5rem;
    }

    .case-number {
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--color-green);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding: 0.25rem 0.6rem;
      background: rgba(0, 39, 6, 0.08);
      border-radius: 0.25rem;
    }

    .case-date {
      font-size: 0.8rem;
      color: var(--text-color-secondary);
      font-weight: 500;
    }

    .case-title {
      margin: 0;
      font-size: 1.05rem;
      font-weight: 600;
      color: var(--color-green);
      line-height: 1.5;
      flex: 1;
      transition: color var(--transition-normal);
    }

    .card-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: auto;
      padding-top: 0.5rem;
      border-top: 1px solid rgba(201, 165, 92, 0.15);
    }

    .read-more {
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--color-gold-accent);
    }

    .card-arrow {
      font-size: 1.25rem;
      width: 1.25rem;
      height: 1.25rem;
      color: var(--color-green);
      transition:
        transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
        color var(--transition-normal);
    }

    mat-paginator {
      background: transparent;
      margin-top: 2rem;
    }

    @media (min-width: 640px) {
      .court-cases-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
      }

      .card-header {
        flex-direction: column;
        align-items: flex-start;
        padding-right: 0;
      }

      .case-date {
        order: -1;
      }
    }

    @media (min-width: 768px) {
      .page-header {
        margin-bottom: 3.5rem;
      }

      .header-badge {
        width: 4.5rem;
        height: 4.5rem;

        mat-icon {
          font-size: 2.25rem;
          width: 2.25rem;
          height: 2.25rem;
        }
      }

      .court-case-card a {
        padding: 1.75rem;
        padding-top: 2rem;
      }

      .case-title {
        font-size: 1.1rem;
      }
    }

    @media (min-width: 1024px) {
      .court-cases-grid {
        grid-template-columns: repeat(3, 1fr);
      }

      .court-case-card a {
        padding: 2rem;
        padding-top: 2.25rem;
      }
    }

    @media (max-width: 479px) {
      .header-badge {
        width: 3.5rem;
        height: 3.5rem;

        mat-icon {
          font-size: 1.75rem;
          width: 1.75rem;
          height: 1.75rem;
        }
      }

      .intro-text {
        font-size: 1rem;
      }

      .court-case-card a {
        padding: 1.25rem;
        padding-top: 1.5rem;
      }

      .victory-badge {
        top: 0.75rem;
        right: 0.75rem;
        padding: 0.25rem;

        mat-icon {
          font-size: 0.9rem;
          width: 0.9rem;
          height: 0.9rem;
        }
      }

      .card-header {
        padding-right: 2rem;
      }

      .case-title {
        font-size: 0.95rem;
      }
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
