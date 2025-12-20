import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-documents-section',
  imports: [MatIcon, RouterLink],
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

          <a routerLink="/documents" class="documents-cta">
            <span>Переглянути документи адвоката</span>
            <mat-icon>arrow_forward</mat-icon>
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
      max-width: 800px;
      margin: 0 auto;
      padding: 3rem 1rem;
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
      width: 4rem;
      height: 4rem;
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
      color: #444;
      font-weight: 500;
      max-width: 600px;
    }

    .documents-cta {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      background: transparent;
      color: var(--color-green);
      text-decoration: none;
      font-size: 0.95rem;
      font-weight: 600;
      letter-spacing: 0.3px;
      border-radius: 2rem;
      border: 2px solid rgba(0, 39, 6, 0.2);
      transition:
        transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
        box-shadow var(--transition-normal),
        background var(--transition-normal),
        border-color var(--transition-normal),
        color var(--transition-normal);

      mat-icon {
        font-size: 1.1rem;
        width: 1.1rem;
        height: 1.1rem;
        transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      }

      &:hover {
        transform: translateY(-2px);
        background: var(--color-green);
        border-color: var(--color-green);
        color: var(--color-gold);
        box-shadow:
          0 6px 20px rgba(0, 39, 6, 0.2),
          0 2px 8px rgba(0, 39, 6, 0.1);

        mat-icon {
          transform: translateX(4px);
        }
      }

      &:active {
        transform: translateY(0);
      }
    }

    @media (min-width: 768px) {
      .documents-section {
        padding: 3.5rem 2rem;
      }

      h2 {
        font-size: 1.65rem;
      }

      p {
        font-size: 1.1rem;
      }
    }

    @media (min-width: 1024px) {
      .documents-section {
        padding: 4rem 2rem;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentsSectionComponent {}
