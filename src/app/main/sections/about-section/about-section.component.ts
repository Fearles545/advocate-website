import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about-section',
  imports: [MatIcon, RouterLink],
  template: `
    <section class="about-section-bg">
      <div class="about-section">
        <div class="about-content">
          <div class="about-header">
            <h2>Про мене</h2>
          </div>

          <div class="about-text">
            <span class="quote-mark" aria-hidden="true">"</span>
            <p>
              Я — адвокат, який спеціалізується на пенсійних справах. У своїй
              практиці працюю з питаннями призначення пенсії, перерахунку
              пенсійних виплат та оскарження незаконних рішень Пенсійного фонду
              України.
            </p>
            <p>
              Допомагаю клієнтам розібратися у складних пенсійних питаннях,
              оцінити перспективи справи та обрати правовий шлях захисту своїх
              прав.
            </p>
          </div>

          <a routerLink="/about-me" class="about-cta">
            <span>Детальніше про адвоката</span>
            <mat-icon>arrow_forward</mat-icon>
          </a>
        </div>
      </div>
    </section>
  `,
  styles: `
    .about-section-bg {
      background: white;
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

    .about-section {
      max-width: 1200px;
      margin: 0 auto;
      padding: 3rem 1rem;
    }

    .about-content {
      max-width: 720px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .about-header {
      text-align: center;
      margin-bottom: 2rem;

      h2 {
        margin: 0;
        position: relative;
        display: inline-block;
        padding-bottom: 1rem;

        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
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

    .about-text {
      position: relative;
      text-align: center;
      margin-bottom: 2rem;

      p {
        font-size: 1.1rem;
        line-height: 1.7;
        color: #333;
        margin: 0 0 1.25rem;
        font-weight: 500;

        &:last-of-type {
          margin-bottom: 0;
        }
      }
    }

    .quote-mark {
      position: absolute;
      top: -1.5rem;
      left: 50%;
      transform: translateX(-50%);
      font-family: 'Georgia', serif;
      font-size: 5rem;
      line-height: 1;
      color: var(--color-gold);
      opacity: 0.15;
      pointer-events: none;
      user-select: none;
    }

    .about-cta {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      background: transparent;
      color: var(--color-green);
      text-decoration: none;
      font-size: 0.95rem;
      font-weight: 600;
      letter-spacing: 0.5px;
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
      .about-section {
        padding: 4rem 2rem;
      }

      .about-text p {
        font-size: 1.15rem;
      }

      .quote-mark {
        font-size: 6rem;
        top: -2rem;
      }
    }

    @media (min-width: 1024px) {
      .about-section {
        padding: 4.5rem 2rem;
      }

      .about-text p {
        font-size: 1.2rem;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutSectionComponent {}
