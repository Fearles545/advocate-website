import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-pension-help-section',
  imports: [MatIcon],
  template: `
    <section class="pension-help-section-bg">
      <div class="pension-help-section">
        <div class="section-header">
          <h2>Пенсійний адвокат — юридична допомога з пенсійних питань</h2>
          <div class="header-accent"></div>
        </div>

        <div class="content-grid">
          <div class="problems-block">
            <p class="problems-intro">
              Пенсійні спори часто пов'язані з відмовою у призначенні пенсії,
              незарахуванням страхового або пільгового стажу, неправильним
              розрахунком розміру пенсії чи ігноруванням документів Пенсійним
              фондом.
            </p>

            <div class="problem-items">
              <div class="problem-item">
                <div class="problem-icon-wrapper">
                  <mat-icon>block</mat-icon>
                </div>
                <span>Відмова у призначенні пенсії</span>
              </div>

              <div class="problem-item">
                <div class="problem-icon-wrapper">
                  <mat-icon>event_busy</mat-icon>
                </div>
                <span>Незарахування страхового стажу</span>
              </div>

              <div class="problem-item">
                <div class="problem-icon-wrapper">
                  <mat-icon>calculate</mat-icon>
                </div>
                <span>Неправильний розрахунок пенсії</span>
              </div>

              <div class="problem-item">
                <div class="problem-icon-wrapper">
                  <mat-icon>folder_off</mat-icon>
                </div>
                <span>Ігнорування документів ПФУ</span>
              </div>
            </div>
          </div>

          <div class="solution-block">
            <div class="solution-content">
              <mat-icon class="solution-icon">verified_user</mat-icon>
              <p>
                Як адвокат з пенсійних питань, я допомагаю клієнтам захистити
                свої права та домогтися призначення або перерахунку пенсії
                відповідно до вимог законодавства.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .pension-help-section-bg {
      background: linear-gradient(
        180deg,
        #f8f6f2 0%,
        #ffffff 50%,
        #f8f6f2 100%
      );
      position: relative;
      overflow: hidden;
    }

    .pension-help-section-bg::before {
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

    .pension-help-section {
      max-width: var(--section-max-width);
      margin: 0 auto;
      padding: var(--section-padding-y) var(--section-padding-x);
    }

    .section-header {
      text-align: center;
      margin-bottom: 2.5rem;
    }

    .section-header h2 {
      margin: 0 0 1.25rem;
      font-size: 1.5rem;
      line-height: 1.35;
      color: var(--color-green);
      max-width: 700px;
      margin-left: auto;
      margin-right: auto;
    }

    .header-accent {
      width: var(--header-underline-width);
      height: 3px;
      background: var(--header-underline-gradient);
      margin: 0 auto;
      border-radius: 2px;
    }

    .content-grid {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .problems-block {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .problems-intro {
      font-size: var(--section-intro-font-size);
      line-height: 1.6;
      color: var(--text-color-primary);
      text-align: center;
      max-width: 800px;
      margin: 0 auto;
      font-weight: 500;
    }

    .problem-items {
      display: grid;
      grid-template-columns: 1fr;
      gap: 0.875rem;
    }

    .problem-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 1.25rem;
      background: rgba(255, 255, 255, 0.9);
      border-radius: var(--card-border-radius-sm);
      border: 1px solid rgba(0, 39, 6, 0.08);
      box-shadow:
        0 2px 8px rgba(0, 39, 6, 0.04),
        0 1px 2px rgba(0, 39, 6, 0.02);
      transition:
        transform var(--transition-normal),
        box-shadow var(--transition-normal),
        border-color var(--transition-normal);
    }

    .problem-item:hover {
      transform: translateX(4px);
      border-color: rgba(201, 165, 92, 0.3);
      box-shadow:
        0 4px 12px rgba(0, 39, 6, 0.08),
        0 2px 4px rgba(0, 39, 6, 0.04);
    }

    .problem-icon-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2.5rem;
      height: 2.5rem;
      min-width: 2.5rem;
      background: linear-gradient(
        135deg,
        rgba(0, 39, 6, 0.06) 0%,
        rgba(0, 39, 6, 0.03) 100%
      );
      border-radius: 50%;
      border: 1px solid rgba(0, 39, 6, 0.1);

      mat-icon {
        font-size: 1.25rem;
        width: 1.25rem;
        height: 1.25rem;
        color: var(--color-green);
        opacity: 0.85;
      }
    }

    .problem-item span {
      font-size: 0.95rem;
      font-weight: 600;
      color: var(--color-green);
      letter-spacing: 0.2px;
    }

    .solution-block {
      margin-top: 0.5rem;
    }

    .solution-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      padding: 1rem 1.5rem 1.5rem;
      background: linear-gradient(135deg, var(--color-green) 0%, #003d0a 100%);
      border-radius: var(--card-border-radius);
      border: var(--card-border);
      box-shadow:
        0 8px 32px rgba(0, 39, 6, 0.2),
        0 4px 12px rgba(0, 39, 6, 0.15),
        inset 0 1px 0 rgba(201, 165, 92, 0.1);
      text-align: center;
    }

    .solution-icon {
      font-size: 2.5rem;
      width: 2.5rem;
      height: 2.5rem;
      color: var(--color-gold);
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
    }

    .solution-content p {
      margin: 0;
      font-size: 1.05rem;
      line-height: 1.6;
      color: var(--color-gold-light);
      font-weight: 500;
    }

    @media (min-width: 640px) {
      .problem-items {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (min-width: 768px) {
      .section-header h2 {
        font-size: 1.75rem;
      }

      .solution-content {
        flex-direction: row;
        text-align: left;
        padding: 1.75rem 2rem;
        gap: 1.5rem;
      }

      .solution-icon {
        font-size: 3rem;
        width: 3rem;
        height: 3rem;
        min-width: 3rem;
      }
    }

    @media (min-width: 1024px) {
      .content-grid {
        gap: 2.5rem;
      }

      .problem-items {
        grid-template-columns: repeat(4, 1fr);
        gap: 1rem;
      }

      .problem-item {
        flex-direction: column;
        text-align: center;
        padding: 1.25rem 1rem;
        gap: 0.75rem;
      }

      .problem-item:hover {
        transform: translateY(-4px);
      }

      .problem-icon-wrapper {
        width: 3rem;
        height: 3rem;

        mat-icon {
          font-size: 1.5rem;
          width: 1.5rem;
          height: 1.5rem;
        }
      }

      .solution-content {
        padding: 2rem 2.5rem;
      }

      .solution-content p {
        font-size: 1.1rem;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PensionHelpSectionComponent {}
