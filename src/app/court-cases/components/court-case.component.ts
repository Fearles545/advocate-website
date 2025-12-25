import { Component, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { finalize, map, of } from 'rxjs';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { CourtCase } from '../cases';
import { SpinnerComponent } from '@core/components/spinner/spinner.component';

@Component({
  selector: 'app-court-case',
  imports: [
    AsyncPipe,
    DatePipe,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    SpinnerComponent,
  ],
  template: `
    @if (courtCase()) {
      <section class="court-case-container">
        <header class="header-container">
          <a
            class="back-link"
            mat-button
            color="primary"
            [routerLink]="['/court-cases']"
            aria-label="Назад до судових справ"
          >
            Судові справи
            <mat-icon>arrow_back_ios_new</mat-icon>
          </a>

          <h1 class="main-title">{{ courtCase()!.title }}</h1>

          <div class="subtitle">
            @let formattedDate = courtCase().date | date: 'dd-MM-yyyy';
            <time [attr.datetime]="formattedDate">{{ formattedDate }}</time>

            @if (courtCase().outcome) {
              <span class="outcome-badge" [class]="courtCase().outcome">
                @switch (courtCase().outcome) {
                  @case ('win') {
                    Виграно
                  }
                  @case ('partial') {
                    Часткове рішення
                  }
                  @case ('pending') {
                    В процесі
                  }
                }
              </span>
            }
          </div>

          @if (courtCase().caseNumber || courtCase().court) {
            <div class="case-meta">
              @if (courtCase().caseNumber) {
                <span class="case-number">
                  <mat-icon>description</mat-icon>
                  {{ courtCase().caseNumber }}
                </span>
              }
              @if (courtCase().court) {
                <span class="court-name">
                  <mat-icon>account_balance</mat-icon>
                  {{ courtCase().court }}
                </span>
              }
            </div>
          }
        </header>

        <section
          class="court-case-content"
          [innerHTML]="caseHtml() | async"
        ></section>

        <section
          class="court-case-content"
          [innerHTML]="footerCard() | async"
        ></section>
      </section>
    }

    <app-spinner [show]="isLoading()" />
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      margin: 0 auto;
      padding: 1rem 1rem 2rem;
      width: var(--container-max-width);
      max-width: var(--container-max-width);
      border-left: 1px solid var(--color-green);
      border-right: 1px solid var(--color-green);
      background-color: var(--color-container-bg);
    }

    h1.main-title {
      text-align: center;
      margin: 0;
    }

    .subtitle {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 1rem;
      color: grey;
      margin: 1rem 0 0;
    }

    .outcome-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 0.25rem;
      font-size: 0.875rem;
      font-weight: 600;

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

    .case-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 1.5rem;
      margin-top: 1rem;
      padding: 1rem;
      background-color: #f8f9fa;
      border-radius: 0.5rem;
      border: 1px solid #e9ecef;

      span {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--color-green);
        font-weight: 500;

        mat-icon {
          font-size: 1.25rem;
          width: 1.25rem;
          height: 1.25rem;
          color: var(--color-gold);
        }
      }
    }

    .header-container {
      position: relative;
    }

    .court-case-container {
      width: var(--blog-container-max-width);
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    @media (max-width: 950px) {
      .court-case-container {
        width: fit-content;
      }
    }

    @media (max-width: 479px) {
      :host {
        padding: 1rem 1rem 2rem;
        width: 100%;
      }

      .case-meta {
        flex-direction: column;
        gap: 0.75rem;
      }
    }
  `,
})
export class CourtCaseComponent {
  private sanitizer = inject(DomSanitizer);
  private http = inject(HttpClient);

  slug = input.required<string>();
  courtCase = input.required<CourtCase>();

  isLoading = signal(true);

  caseHtml = computed(() =>
    this.courtCase() ? this.getCase(this.courtCase()?.slug!) : of('')
  );

  footerCard = computed(() =>
    this.courtCase() ? this.getCase('footer-card') : of('')
  );

  getCase(slug: string) {
    return this.http
      .get(`court-cases/${slug}.html`, {
        responseType: 'text',
      })
      .pipe(
        map((html) => this.sanitizer.bypassSecurityTrustHtml(html)),
        finalize(() => this.isLoading.set(false))
      );
  }
}
