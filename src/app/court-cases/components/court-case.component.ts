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
    <section class="court-case-page-bg">
      <div class="court-case-page">
        @if (courtCase()) {
          <header class="page-header">
            <a
              class="back-link"
              mat-button
              color="primary"
              [routerLink]="['/court-cases']"
              aria-label="Назад до судових рішень"
            >
              <mat-icon>arrow_back_ios_new</mat-icon>
              Судові рішення
            </a>

            <div class="case-meta">
              <time class="case-date" [attr.datetime]="courtCase().date">
                {{ courtCase().date | date: 'dd.MM.yyyy' }}
              </time>
              <span class="case-number">
                Справа № {{ courtCase().caseNumber }}
              </span>
            </div>

            <h1>{{ courtCase()!.title }}</h1>
          </header>

          <article class="case-content">
            <section [innerHTML]="caseHtml() | async"></section>
            <section [innerHTML]="footerCard() | async"></section>
          </article>
        }
      </div>

      <app-spinner [show]="isLoading()" />
    </section>
  `,
  styles: `
    .court-case-page-bg {
      background: linear-gradient(180deg, #f8f6f2 0%, #ffffff 50%, #f8f6f2 100%);
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

    .court-case-page {
      max-width: var(--section-max-width-narrow);
      margin: 0 auto;
      padding: var(--section-padding-y) var(--section-padding-x);
    }

    .page-header {
      margin-bottom: 2.5rem;
    }

    .back-link {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      margin-bottom: 1.5rem;
      font-weight: var(--weight-semibold);
      color: var(--color-green);

      mat-icon {
        font-size: 1rem;
        width: 1rem;
        height: 1rem;
      }

      &:hover {
        color: var(--color-gold-accent);
      }
    }

    .case-meta {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .case-date {
      font-size: 0.9rem;
      font-weight: var(--weight-bold);
      color: var(--color-green);
    }

    .case-number {
      font-size: 0.85rem;
      font-weight: var(--weight-semibold);
      color: var(--color-gold-accent);
      padding: 0.25rem 0.75rem;
      background: rgba(201, 165, 92, 0.1);
      border-radius: 2rem;
    }

    .page-header h1 {
      margin: 0;
      color: var(--color-green);
      font-family: var(--font-heading);
      font-size: var(--font-size-h1);
      font-weight: var(--weight-bold);
      line-height: 1.35;
    }

    .case-content {
      background: white;
      border-radius: var(--card-border-radius);
      border: var(--card-border);
      box-shadow: var(--card-box-shadow);
      padding: 2rem;

      section {
        line-height: 1.7;
        color: var(--text-color-primary);

        &:not(:last-child) {
          margin-bottom: 2rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid rgba(201, 165, 92, 0.15);
        }
      }
    }

    @media (min-width: 768px) {
      .case-content {
        padding: 2.5rem 3rem;
      }
    }

    @media (max-width: 479px) {
      .page-header h1 {
        font-size: 1.4rem;
      }

      .case-content {
        padding: 1.5rem;
      }

      .case-meta {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
      }
    }
  `,
})
export class CourtCaseComponent {
  private sanitizer = inject(DomSanitizer);
  private http = inject(HttpClient);

  courtCase = input.required<CourtCase>();

  isLoading = signal(true);

  caseHtml = computed(() =>
    this.courtCase() ? this.getCase(this.courtCase()?.caseNumber!) : of('')
  );

  footerCard = computed(() =>
    this.courtCase() ? this.getCase('footer-card') : of('')
  );

  getCase(caseNumber: string) {
    return this.http
      .get(`court-cases/${caseNumber}.html`, {
        responseType: 'text',
      })
      .pipe(
        map((html) => this.sanitizer.bypassSecurityTrustHtml(html)),
        finalize(() => this.isLoading.set(false))
      );
  }
}
