import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-why-me-section',
  imports: [MatIcon],
  template: `
    <section class="why-me-section-bg">
      <div class="why-me-section">
        <div class="section-header">
          <h2>
            Чому клієнти обирають адвоката з пенсійних питань (пенсійного
            юриста)
          </h2>
        </div>

        <ul class="trust-list">
          <li class="trust-item">
            <span class="check-wrapper">
              <mat-icon>check</mat-icon>
            </span>
            <span class="trust-text"
              >Адвокатський статус та офіційна діяльність</span
            >
          </li>

          <li class="trust-item">
            <span class="check-wrapper">
              <mat-icon>check</mat-icon>
            </span>
            <span class="trust-text"
              >Практичний досвід у пенсійних і соціальних спорах</span
            >
          </li>

          <li class="trust-item">
            <span class="check-wrapper">
              <mat-icon>check</mat-icon>
            </span>
            <span class="trust-text"
              >Чітке пояснення перспектив справи без обіцянок «гарантованого
              результату»</span
            >
          </li>

          <li class="trust-item">
            <span class="check-wrapper">
              <mat-icon>check</mat-icon>
            </span>
            <span class="trust-text"
              >Супровід клієнта від першого звернення до отримання
              результату</span
            >
          </li>

          <li class="trust-item">
            <span class="check-wrapper">
              <mat-icon>check</mat-icon>
            </span>
            <span class="trust-text"
              >Робота виключно в межах закону та адвокатської етики</span
            >
          </li>
        </ul>
      </div>
    </section>
  `,
  styles: `
    .why-me-section-bg {
      background: linear-gradient(180deg, #ffffff 0%, #f8f6f2 100%);
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

    .why-me-section {
      max-width: var(--section-max-width-narrow);
      margin: 0 auto;
      padding: var(--section-padding-y) var(--section-padding-x);
    }

    .section-header {
      text-align: center;
      margin-bottom: 2.5rem;

      h2 {
        margin: 0;
        position: relative;
        display: inline-block;
        padding-bottom: 1.25rem;
        max-width: 600px;

        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 3px;
          background: linear-gradient(
            90deg,
            transparent,
            var(--color-gold),
            transparent
          );
          border-radius: 2px;
        }
      }
    }

    .trust-list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .trust-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 1.25rem;
      background: white;
      border-radius: 0.5rem;
      border: 1px solid rgba(201, 165, 92, 0.15);
      box-shadow:
        0 2px 8px rgba(0, 39, 6, 0.04),
        0 1px 2px rgba(0, 39, 6, 0.02);
      transition:
        transform var(--transition-normal),
        box-shadow var(--transition-normal),
        border-color var(--transition-normal);
    }

    .trust-item:hover {
      transform: translateX(4px);
      border-color: rgba(201, 165, 92, 0.35);
      box-shadow:
        0 4px 16px rgba(0, 39, 6, 0.08),
        0 2px 4px rgba(0, 39, 6, 0.04);
    }

    .check-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2.25rem;
      height: 2.25rem;
      min-width: 2.25rem;
      background: linear-gradient(135deg, var(--color-green) 0%, #003d0a 100%);
      border-radius: 50%;
      box-shadow:
        0 2px 8px rgba(0, 39, 6, 0.2),
        inset 0 1px 0 rgba(201, 165, 92, 0.1);

      mat-icon {
        font-size: 1.25rem;
        width: 1.25rem;
        height: 1.25rem;
        color: var(--color-gold);
        font-weight: bold;
      }
    }

    .trust-text {
      font-size: 1rem;
      font-weight: 600;
      color: var(--color-green);
      line-height: 1.4;
    }

    @media (min-width: 768px) {
      .trust-list {
        gap: 0.875rem;
      }

      .trust-item {
        padding: 1.125rem 1.5rem;
      }

      .trust-text {
        font-size: 1.05rem;
      }
    }

    @media (min-width: 1024px) {
      .trust-text {
        font-size: 1.1rem;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhyMeSectionComponent {}
