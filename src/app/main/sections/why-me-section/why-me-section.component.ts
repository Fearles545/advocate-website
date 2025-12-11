import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-why-me-section',
  imports: [MatIcon],
  template: `
    <section class="why-me-section-bg">
      <div class="why-me-section">
        <h2>Чому обирають мене?</h2>

        <div class="why-me-cards-container">
          <div class="why-me-card">
            <div class="why-me-icon-wrapper">
              <mat-icon class="why-me-icon">gavel</mat-icon>
            </div>
            <div class="why-me-content">
              <h3>Вузька спеціалізація</h3>
              <p>100% спеціалізація на пенсійних справах</p>
            </div>
          </div>

          <div class="why-me-card">
            <div class="why-me-icon-wrapper">
              <mat-icon class="why-me-icon">balance</mat-icon>
            </div>
            <div class="why-me-content">
              <h3>Експертні знання</h3>
              <p>
                Глибоке знання законодавства та судової практики з пенсійних питань
              </p>
            </div>
          </div>

          <div class="why-me-card">
            <div class="why-me-icon-wrapper">
              <mat-icon class="why-me-icon">business_center</mat-icon>
            </div>
            <div class="why-me-content">
              <h3>Багаторічний досвід</h3>
              <p>Досвід роботи у пенсійних питаннях з 2018 року</p>
            </div>
          </div>

          <div class="why-me-card">
            <div class="why-me-icon-wrapper">
              <mat-icon class="why-me-icon">account_circle</mat-icon>
            </div>
            <div class="why-me-content">
              <h3>Індивідуальний підхід</h3>
              <p>Персональний підхід до кожного клієнта та постійний зв'язок</p>
            </div>
          </div>

          <div class="why-me-card">
            <div class="why-me-icon-wrapper">
              <mat-icon class="why-me-icon">handshake</mat-icon>
            </div>
            <div class="why-me-content">
              <h3>Надійність</h3>
              <p>Відповідальність та чесність перед клієнтом</p>
            </div>
          </div>

          <div class="why-me-card">
            <div class="why-me-icon-wrapper">
              <mat-icon class="why-me-icon">travel_explore</mat-icon>
            </div>
            <div class="why-me-content">
              <h3>Зручний формат</h3>
              <p>
                Працюю дистанційно по всій території України та за кордоном: без
                черг, поїздок і стресу
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .why-me-section-bg {
      background-color: white;
    }

    .why-me-section {
      max-width: 1200px;
      margin: 0 auto;
      padding: 3rem 1rem 2rem;

      h2 {
        text-align: center;
        margin: 0 0 2.5rem;
        position: relative;
      }

      h2::after {
        content: '';
        position: absolute;
        bottom: -15px;
        left: 50%;
        transform: translateX(-50%);
        width: 100px;
        height: 3px;
        background-color: var(--color-gold);
        border-radius: 10px;
      }

      .why-me-cards-container {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1.25rem;
      }

      .why-me-card {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        background: linear-gradient(135deg, #002706 0%, #003d0a 100%);
        padding: 1.25rem;
        border-radius: 0.5rem;
        border-left: 4px solid var(--color-gold);
        box-shadow: 0 4px 15px rgba(0, 39, 6, 0.3);
        transition:
          transform var(--transition-normal),
          box-shadow var(--transition-normal);
      }

      .why-me-card:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 25px rgba(0, 39, 6, 0.4);
      }

      .why-me-icon-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 3rem;
        height: 3rem;
        min-width: 3rem;
        background-color: rgba(201, 165, 92, 0.15);
        border-radius: 50%;
        border: 2px solid var(--color-gold);
      }

      .why-me-icon {
        color: var(--color-gold);
        font-size: 1.5rem;
        width: 1.5rem;
        height: 1.5rem;
      }

      .why-me-content {
        display: flex;
        flex-direction: column;
        gap: 0.35rem;

        h3 {
          margin: 0;
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--color-gold);
          letter-spacing: 0.3px;
        }

        p {
          margin: 0;
          color: var(--color-gold-light);
          font-size: 0.95rem;
          font-weight: 500;
          line-height: 1.4;
        }
      }
    }

    @media (min-width: 768px) {
      .why-me-section .why-me-cards-container {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (min-width: 1024px) {
      .why-me-section .why-me-cards-container {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhyMeSectionComponent {}
