import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CtaOutlineButtonComponent } from '@shared/components/cta-outline-button';

@Component({
  selector: 'app-about-section',
  imports: [RouterLink, CtaOutlineButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="about-section-bg">
      <!-- Ambient glow effects -->
      <div class="ambient-glow ambient-glow-1"></div>
      <div class="ambient-glow ambient-glow-2"></div>

      <div class="about-section">
        <!-- Image Panel with Gold Corner Accents -->
        <div class="image-panel">
          <div class="image-frame">
            <img
              src="/assets/images/main/about-section-1.jpg"
              alt="Адвокат з пенсійних питань"
              fill
            />
            <!-- Gold corner accents -->
            <div class="corner-accent corner-tl"></div>
            <div class="corner-accent corner-tr"></div>
            <div class="corner-accent corner-bl"></div>
            <div class="corner-accent corner-br"></div>
          </div>
        </div>

        <!-- Content Section -->
        <div class="about-content">
          <div class="content-wrapper">
            <!-- Decorative quote marks -->
            <span class="quote-mark quote-open" aria-hidden="true">"</span>

            <div class="about-header">
              <span class="section-label">Знайомство</span>
              <h2>Про мене</h2>
            </div>

            <div class="about-text">
              <p class="text-reveal" style="--delay: 0">
                Я — адвокат з пенсійних питань, який спеціалізується на
                супроводі пенсійних справ — від перевірки документів і
                розрахунку страхового та пільгового стажу до призначення або
                перерахунку пенсії, а також захисту пенсійних прав у спорах з
                Пенсійним фондом України.
              </p>

              <p class="text-reveal" style="--delay: 1">
                У своїй роботі я допомагаю клієнтам зрозуміти реальну ситуацію,
                оцінити право на пенсію, можливі ризики та перспективи справи, і
                обрати законний та доцільний шлях вирішення пенсійного питання.
              </p>

              <p class="text-reveal highlight-text" style="--delay: 2">
                Працюю без необґрунтованих обіцянок і з повагою до кожної
                конкретної ситуації.
              </p>
            </div>

            <span class="quote-mark quote-close" aria-hidden="true">"</span>

            <a routerLink="/about-me" appCtaOutlineButton>
              Детальніше про адвоката
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom decorative line -->
      <div class="decorative-line"></div>
    </section>
  `,
  styles: `
    .about-section-bg {
      background: linear-gradient(
        180deg,
        #f8f6f2 0%,
        #ffffff 40%,
        #fdfcfa 100%
      );
      position: relative;
      overflow: hidden;

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

    /* Ambient glow effects */
    .ambient-glow {
      position: absolute;
      border-radius: 50%;
      pointer-events: none;
      filter: blur(80px);
    }

    .ambient-glow-1 {
      top: 10%;
      left: 5%;
      width: 300px;
      height: 300px;
      background: radial-gradient(
        circle,
        rgba(201, 165, 92, 0.12) 0%,
        transparent 70%
      );
      animation: float-glow 8s ease-in-out infinite;
    }

    .ambient-glow-2 {
      bottom: 20%;
      right: 10%;
      width: 250px;
      height: 250px;
      background: radial-gradient(
        circle,
        rgba(0, 39, 6, 0.06) 0%,
        transparent 70%
      );
      animation: float-glow 10s ease-in-out infinite reverse;
    }

    @keyframes float-glow {
      0%,
      100% {
        transform: translate(0, 0) scale(1);
      }
      50% {
        transform: translate(20px, -20px) scale(1.1);
      }
    }

    .about-section {
      max-width: 1200px;
      margin: 0 auto;
      padding: var(--section-padding-y) var(--section-padding-x);
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      gap: 2.5rem;
    }

    /* Image Panel */
    .image-panel {
      display: none;
    }

    .image-frame {
      position: relative;
      width: 100%;
      aspect-ratio: 3 / 4;
      border-radius: 0.75rem;
      overflow: hidden;
      box-shadow:
        0 8px 32px rgba(0, 39, 6, 0.12),
        0 4px 16px rgba(0, 39, 6, 0.08);

      img {
        object-fit: cover;
        object-position: center top;
        transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }

      &:hover img {
        transform: scale(1.03);
      }

      /* Subtle overlay gradient for depth */
      &::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(
          180deg,
          transparent 60%,
          rgba(0, 39, 6, 0.15) 100%
        );
        pointer-events: none;
        border-radius: 0.75rem;
      }
    }

    /* Gold corner accents */
    .corner-accent {
      position: absolute;
      width: 50px;
      height: 50px;
      z-index: 2;
      pointer-events: none;

      &::before,
      &::after {
        content: '';
        position: absolute;
        background: var(--color-gold);
        box-shadow: 0 1px 4px rgba(201, 165, 92, 0.4);
      }
    }

    .corner-tl {
      top: 12px;
      left: 12px;

      &::before {
        top: 0;
        left: 0;
        width: 35px;
        height: 3px;
      }

      &::after {
        top: 0;
        left: 0;
        width: 3px;
        height: 35px;
      }
    }

    .corner-tr {
      top: 12px;
      right: 12px;

      &::before {
        top: 0;
        right: 0;
        width: 35px;
        height: 3px;
      }

      &::after {
        top: 0;
        right: 0;
        width: 3px;
        height: 35px;
      }
    }

    .corner-bl {
      bottom: 12px;
      left: 12px;

      &::before {
        bottom: 0;
        left: 0;
        width: 35px;
        height: 3px;
      }

      &::after {
        bottom: 0;
        left: 0;
        width: 3px;
        height: 35px;
      }
    }

    .corner-br {
      bottom: 12px;
      right: 12px;

      &::before {
        bottom: 0;
        right: 0;
        width: 35px;
        height: 3px;
      }

      &::after {
        bottom: 0;
        right: 0;
        width: 3px;
        height: 35px;
      }
    }

    /* Content Section */
    .about-content {
      position: relative;
    }

    .content-wrapper {
      position: relative;
      padding: 2rem 1.5rem;
      background: rgba(255, 255, 255, 0.7);
      border-radius: 0.75rem;
      border: 1px solid rgba(201, 165, 92, 0.15);
      box-shadow:
        0 4px 24px rgba(0, 39, 6, 0.04),
        0 1px 4px rgba(0, 39, 6, 0.02);
    }

    /* Quote marks */
    .quote-mark {
      position: absolute;
      font-family: 'Cormorant Garamond', 'Georgia', serif;
      font-size: 6rem;
      font-weight: 600;
      line-height: 1;
      color: var(--color-gold);
      opacity: 0.15;
      pointer-events: none;
      user-select: none;
    }

    .quote-open {
      top: -0.5rem;
      left: 0.5rem;
    }

    .quote-close {
      bottom: 0;
      right: 0.5rem;
      transform: rotate(180deg);
    }

    .about-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .section-label {
      display: inline-block;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 3px;
      color: var(--color-gold);
      margin-bottom: 0.75rem;
      position: relative;

      &::before,
      &::after {
        content: '—';
        margin: 0 0.5rem;
        opacity: 0.5;
      }
    }

    .about-header h2 {
      margin: 0;
      font-family: 'Cormorant Garamond', serif;
      font-size: 2.25rem;
      font-weight: 600;
      color: var(--color-green);
      position: relative;
      padding-bottom: 1rem;

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

    .about-text {
      text-align: center;
      margin-bottom: 2rem;

      p {
        font-size: 1.05rem;
        line-height: 1.8;
        color: #333;
        margin: 0 0 1.25rem;
        font-weight: 500;

        &:last-of-type {
          margin-bottom: 0;
        }
      }
    }

    .cta-outline-button {
      display: flex;
      width: fit-content;
      margin: auto;
    }

    .highlight-text {
      position: relative;
      padding: 1rem 1.5rem;
      background: linear-gradient(
        90deg,
        rgba(201, 165, 92, 0.08),
        rgba(201, 165, 92, 0.12),
        rgba(201, 165, 92, 0.08)
      );
      border-radius: 0.5rem;
      border-left: 3px solid var(--color-gold);
      font-style: italic;
      color: var(--color-green) !important;
    }

    .decorative-line {
      position: absolute;
      bottom: 0;
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

    /* ===== RESPONSIVE STYLES ===== */

    @media (min-width: 480px) {
      .content-wrapper {
        padding: 2.5rem 2rem;
      }

      .quote-mark {
        font-size: 7rem;
      }

      .quote-open {
        top: -1rem;
        left: 1rem;
      }

      .quote-close {
        bottom: 2.5rem;
        right: 1rem;
      }
    }

    @media (min-width: 768px) {
      .content-wrapper {
        padding: 3rem 3rem;
      }

      .about-header h2 {
        font-size: 2.5rem;
      }

      .about-text p {
        font-size: 1.15rem;
      }

      .quote-mark {
        font-size: 8rem;
      }

      .quote-open {
        top: -1.5rem;
        left: 1.5rem;
      }

      .quote-close {
        bottom: 3rem;
        right: 1.5rem;
      }
    }

    @media (min-width: 1024px) {
      .about-section {
        display: grid;
        grid-template-columns: 320px 1fr;
        gap: 3rem;
        align-items: center;
      }

      .image-panel {
        display: block;
      }

      .about-content {
        max-width: 680px;
      }

      .content-wrapper {
        padding: 3rem 3.5rem;
        text-align: left;
      }

      .about-header {
        text-align: left;
      }

      .about-header h2 {
        font-size: 2.75rem;

        &::after {
          left: 0;
          transform: none;
        }
      }

      .section-label {
        &::before {
          display: none;
        }

        &::after {
          margin-left: 0.75rem;
        }
      }

      .about-text {
        text-align: left;
      }

      .about-text p {
        font-size: 1.2rem;
      }

      .highlight-text {
        margin-left: 0;
        margin-right: 0;
      }

      .quote-open {
        top: 0.5rem;
        left: -1rem;
        font-size: 9rem;
      }

      .quote-close {
        bottom: 0.5rem;
        right: -1rem;
        font-size: 9rem;
      }

      .ambient-glow-1 {
        width: 400px;
        height: 400px;
      }

      .ambient-glow-2 {
        width: 350px;
        height: 350px;
      }

      /* Corner accents - slightly larger on desktop */
      .corner-accent {
        width: 55px;
        height: 55px;

        &::before {
          width: 40px !important;
        }

        &::after {
          height: 40px !important;
        }
      }

      .corner-tl,
      .corner-tr {
        top: 16px;
      }

      .corner-bl,
      .corner-br {
        bottom: 16px;
      }

      .corner-tl,
      .corner-bl {
        left: 16px;
      }

      .corner-tr,
      .corner-br {
        right: 16px;
      }

      .cta-outline-button {
        margin: initial;
      }
    }

    @media (min-width: 1280px) {
      .about-section {
        grid-template-columns: 380px 1fr;
        gap: 4rem;
      }

      .image-frame {
        aspect-ratio: 3 / 4;
      }

      .about-content {
        max-width: 720px;
      }

      .content-wrapper {
        padding: 3.5rem 4rem;
      }

      /* Larger corner accents on large screens */
      .corner-accent {
        width: 60px;
        height: 60px;

        &::before {
          width: 45px !important;
          height: 3px !important;
        }

        &::after {
          width: 3px !important;
          height: 45px !important;
        }
      }

      .corner-tl,
      .corner-tr {
        top: 20px;
      }

      .corner-bl,
      .corner-br {
        bottom: 20px;
      }

      .corner-tl,
      .corner-bl {
        left: 20px;
      }

      .corner-tr,
      .corner-br {
        right: 20px;
      }
    }
  `,
})
export class AboutSectionComponent {}
