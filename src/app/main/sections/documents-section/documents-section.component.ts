import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CtaOutlineButtonComponent } from '@shared/components/cta-outline-button';

@Component({
  selector: 'app-documents-section',
  imports: [MatIcon, RouterLink, CtaOutlineButtonComponent],
  template: `
    <section class="documents-section-bg">
      <div class="documents-section">
        <div class="documents-content">
          <div class="badge-icon">
            <mat-icon>workspace_premium</mat-icon>
          </div>

          <h2>Документи та підтвердження кваліфікації</h2>

          <p>
            На сайті у відкритому доступі розміщені документи, що підтверджують
            юридичну освіту, статус адвоката та щорічне підвищення кваліфікації
            відповідно до вимог законодавства.
          </p>

          <a routerLink="/documents" appCtaOutlineButton>
            Переглянути документи адвоката
          </a>
        </div>
      </div>
    </section>
  `,
  styles: `
    .documents-section-bg {
      background: #f8f6f2;
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

    .documents-section {
      max-width: var(--section-max-width-compact);
      margin: 0 auto;
      padding: var(--section-padding-y) var(--section-padding-x);
    }

    .documents-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .badge-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--icon-wrapper-lg);
      height: var(--icon-wrapper-lg);
      background: linear-gradient(135deg, var(--color-green) 0%, #003d0a 100%);
      border-radius: 50%;
      margin-bottom: 1.5rem;
      box-shadow:
        0 4px 16px rgba(0, 39, 6, 0.2),
        0 2px 6px rgba(0, 39, 6, 0.15),
        inset 0 1px 0 rgba(201, 165, 92, 0.15);

      mat-icon {
        font-size: 2rem;
        width: 2rem;
        height: 2rem;
        color: var(--color-gold);
      }
    }

    h2 {
      margin: 0 0 1rem;
      color: var(--color-green);
      font-size: 1.5rem;
      line-height: 1.3;
    }

    p {
      margin: 0 0 1.75rem;
      font-size: 1.05rem;
      line-height: 1.6;
      color: var(--text-color-primary);
      font-weight: 500;
      max-width: 600px;
    }

    @media (min-width: 768px) {
      h2 {
        font-size: 1.65rem;
      }

      p {
        font-size: 1.1rem;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentsSectionComponent {}
