import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-blog-links',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatIconModule],
  template: `
    <aside class="cta-section-bg">
      <!-- Radial glow overlay -->
      <div class="section-glow"></div>

      <div class="cta-section">
        <!-- Framed Card with Gold Corners -->
        <div class="cta-frame">
          <!-- Decorative L-shaped corners -->
          <span class="corner top-left"></span>
          <span class="corner top-right"></span>
          <span class="corner bottom-left"></span>
          <span class="corner bottom-right"></span>

          <div class="cta-inner">
            <!-- Header -->
            <div class="cta-header">
              <div class="cta-icon">
                <mat-icon>support_agent</mat-icon>
              </div>
              <p class="cta-intro">Потрібна допомога з пенсійними питаннями?</p>
            </div>

            <!-- Primary CTA Button -->
            <a routerLink="/contacts" class="cta-button">
              <span class="btn-icon">
                <mat-icon>mail</mat-icon>
              </span>
              <span class="btn-text">Записатися на консультацію</span>
              <mat-icon class="btn-arrow">arrow_forward</mat-icon>
            </a>

            <!-- Navigation Links -->
            <nav class="cta-nav">
              <span class="nav-label">Дивіться також:</span>
              <div class="nav-links">
                <a routerLink="/services" class="nav-link">
                  <mat-icon>description</mat-icon>
                  <span>Послуги</span>
                </a>
                <span class="nav-divider"></span>
                <a routerLink="/court-cases" class="nav-link">
                  <mat-icon>gavel</mat-icon>
                  <span>Судові справи</span>
                </a>
                <span class="nav-divider"></span>
                <a routerLink="/feedbacks" class="nav-link">
                  <mat-icon>reviews</mat-icon>
                  <span>Відгуки</span>
                </a>
                <span class="nav-divider"></span>
                <a routerLink="/about-me" class="nav-link">
                  <mat-icon>person</mat-icon>
                  <span>Про адвоката</span>
                </a>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </aside>
  `,
  styles: `
    /* ==========================================================================
       CTA SECTION BACKGROUND
       ========================================================================== */
    .cta-section-bg {
      position: relative;
      margin-top: 2rem;
      padding: 2rem 0;
      overflow: hidden;

      /* Top gold separator */
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: var(--gold-separator-center);
      }
    }

    .section-glow {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 600px;
      height: 400px;
      background: radial-gradient(
        ellipse,
        rgba(201, 165, 92, 0.08) 0%,
        transparent 65%
      );
      pointer-events: none;
    }

    /* ==========================================================================
       CTA SECTION CONTAINER
       ========================================================================== */
    .cta-section {
      position: relative;
      z-index: 1;
      display: flex;
      justify-content: center;
      padding: 0 1rem;
    }

    /* ==========================================================================
       FRAMED CARD
       ========================================================================== */
    .cta-frame {
      position: relative;
      width: 100%;
      max-width: 560px;
      padding: 2rem 1.75rem;
      background: white;
      border-radius: 0.25rem;
      box-shadow:
        0 1px 3px var(--green-alpha-04),
        0 8px 32px var(--green-alpha-06);
    }

    /* ==========================================================================
       DECORATIVE GOLD CORNERS
       ========================================================================== */
    .corner {
      --corner-size: 20px;
      --corner-thickness: 2px;
      position: absolute;
      width: var(--corner-size);
      height: var(--corner-size);
      pointer-events: none;

      &::before,
      &::after {
        content: '';
        position: absolute;
        background: var(--color-gold);
      }

      /* Horizontal line */
      &::before {
        height: var(--corner-thickness);
        width: 100%;
      }

      /* Vertical line */
      &::after {
        width: var(--corner-thickness);
        height: 100%;
      }

      &.top-left {
        top: -1px;
        left: -1px;

        &::before {
          top: 0;
          left: 0;
        }
        &::after {
          top: 0;
          left: 0;
        }
      }

      &.top-right {
        top: -1px;
        right: -1px;

        &::before {
          top: 0;
          right: 0;
        }
        &::after {
          top: 0;
          right: 0;
        }
      }

      &.bottom-left {
        bottom: -1px;
        left: -1px;

        &::before {
          bottom: 0;
          left: 0;
        }
        &::after {
          bottom: 0;
          left: 0;
        }
      }

      &.bottom-right {
        bottom: -1px;
        right: -1px;

        &::before {
          bottom: 0;
          right: 0;
        }
        &::after {
          bottom: 0;
          right: 0;
        }
      }
    }

    /* ==========================================================================
       CARD INNER CONTENT
       ========================================================================== */
    .cta-inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
      text-align: center;
    }

    .cta-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.875rem;
    }

    .cta-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 3rem;
      height: 3rem;
      background: linear-gradient(
        135deg,
        var(--color-green) 0%,
        var(--color-green-dark) 100%
      );
      border-radius: 50%;
      box-shadow:
        0 4px 12px rgba(0, 39, 6, 0.2),
        inset 0 1px 0 rgba(201, 165, 92, 0.1);

      mat-icon {
        font-size: 1.5rem;
        width: 1.5rem;
        height: 1.5rem;
        color: var(--color-gold);
      }
    }

    .cta-intro {
      margin: 0;
      font-size: 1.05rem;
      font-weight: 600;
      color: var(--color-green);
      line-height: 1.4;
    }

    /* ==========================================================================
       PRIMARY CTA BUTTON
       ========================================================================== */
    .cta-button {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.875rem 1.5rem 0.875rem 0.875rem;
      background: linear-gradient(
        135deg,
        var(--color-green) 0%,
        var(--color-green-dark) 100%
      );
      color: white;
      text-decoration: none;
      border-radius: 3rem;
      font-size: 0.95rem;
      font-weight: 600;
      box-shadow:
        0 4px 16px rgba(0, 39, 6, 0.2),
        0 2px 6px rgba(0, 39, 6, 0.1);
      transition: all 0.3s var(--ease-standard);
      position: relative;
      overflow: hidden;

      /* Shimmer effect */
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          90deg,
          transparent 0%,
          rgba(201, 165, 92, 0.2) 50%,
          transparent 100%
        );
        animation: shimmer 4s ease-in-out infinite;
      }

      .btn-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2.25rem;
        height: 2.25rem;
        background: rgba(201, 165, 92, 0.2);
        border-radius: 50%;
        border: 1px solid rgba(201, 165, 92, 0.3);
        transition: all 0.3s ease;

        mat-icon {
          font-size: 1.1rem;
          width: 1.1rem;
          height: 1.1rem;
          color: var(--color-gold);
        }
      }

      .btn-text {
        color: var(--color-gold);
      }

      .btn-arrow {
        font-size: 1.25rem;
        width: 1.25rem;
        height: 1.25rem;
        color: rgba(201, 165, 92, 0.6);
        transition: all 0.3s ease;
      }

      &:hover {
        transform: translateY(-2px);
        box-shadow:
          0 8px 24px rgba(0, 39, 6, 0.25),
          0 4px 8px rgba(0, 39, 6, 0.15);

        .btn-icon {
          background: rgba(201, 165, 92, 0.3);
          border-color: rgba(201, 165, 92, 0.5);
        }

        .btn-arrow {
          transform: translateX(4px);
          color: var(--color-gold);
        }
      }
    }

    @keyframes shimmer {
      0% {
        left: -100%;
      }
      50%,
      100% {
        left: 100%;
      }
    }

    /* ==========================================================================
       NAVIGATION LINKS
       ========================================================================== */
    .cta-nav {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
      padding-top: 1.25rem;
      border-top: 1px solid rgba(201, 165, 92, 0.15);
      width: 100%;
    }

    .nav-label {
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--color-text-secondary);
    }

    .nav-links {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      gap: 0.5rem 0.25rem;
    }

    .nav-divider {
      width: 1px;
      height: 1rem;
      background: linear-gradient(
        180deg,
        transparent 0%,
        rgba(201, 165, 92, 0.4) 50%,
        transparent 100%
      );
    }

    .nav-link {
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
      padding: 0.375rem 0.625rem;
      text-decoration: none;
      color: var(--color-green);
      font-size: 0.8rem;
      font-weight: 500;
      border-radius: 0.25rem;
      transition: all 0.2s ease;

      mat-icon {
        font-size: 0.95rem;
        width: 0.95rem;
        height: 0.95rem;
        color: var(--color-gold);
        opacity: 0.7;
        transition: all 0.2s ease;
      }

      &:hover {
        background: rgba(201, 165, 92, 0.1);
        color: var(--color-gold-accent);

        mat-icon {
          opacity: 1;
        }
      }
    }

    /* ==========================================================================
       RESPONSIVE
       ========================================================================== */
    @media (max-width: 768px) {
      .cta-section-bg {
        margin-top: 1.5rem;
        padding: 1.5rem 0;
      }

      .section-glow {
        width: 400px;
        height: 300px;
      }

      .cta-frame {
        padding: 1.5rem 1.25rem;
      }

      .corner {
        --corner-size: 16px;
      }

      .cta-inner {
        gap: 1.25rem;
      }

      .cta-icon {
        width: 2.5rem;
        height: 2.5rem;

        mat-icon {
          font-size: 1.25rem;
          width: 1.25rem;
          height: 1.25rem;
        }
      }

      .cta-intro {
        font-size: 0.95rem;
      }

      .cta-button {
        padding: 0.75rem 1.25rem 0.75rem 0.75rem;
        font-size: 0.875rem;
        gap: 0.625rem;

        .btn-icon {
          width: 2rem;
          height: 2rem;

          mat-icon {
            font-size: 1rem;
            width: 1rem;
            height: 1rem;
          }
        }

        .btn-arrow {
          font-size: 1.1rem;
          width: 1.1rem;
          height: 1.1rem;
        }
      }

      .cta-nav {
        padding-top: 1rem;
        gap: 0.625rem;
      }

      .nav-label {
        font-size: 0.7rem;
      }

      .nav-links {
        gap: 0.375rem 0.125rem;
      }

      .nav-divider {
        height: 0.875rem;
      }

      .nav-link {
        font-size: 0.75rem;
        padding: 0.3rem 0.5rem;

        mat-icon {
          font-size: 0.875rem;
          width: 0.875rem;
          height: 0.875rem;
        }
      }
    }

    @media (max-width: 479px) {
      .cta-section-bg {
        margin-top: 1rem;
        padding: 1.25rem 0;
      }

      .cta-frame {
        padding: 1.25rem 1rem;
      }

      .corner {
        --corner-size: 14px;
      }

      .cta-inner {
        gap: 1rem;
      }

      .cta-header {
        gap: 0.625rem;
      }

      .cta-icon {
        width: 2.25rem;
        height: 2.25rem;

        mat-icon {
          font-size: 1.1rem;
          width: 1.1rem;
          height: 1.1rem;
        }
      }

      .cta-intro {
        font-size: 0.875rem;
      }

      .cta-button {
        width: 100%;
        justify-content: center;
        padding: 0.625rem 1rem;
      }

      .nav-divider {
        display: none;
      }

      .nav-links {
        gap: 0.25rem;
      }

      .nav-link {
        padding: 0.25rem 0.4rem;
        font-size: 0.7rem;

        mat-icon {
          font-size: 0.8rem;
          width: 0.8rem;
          height: 0.8rem;
        }
      }
    }
  `,
})
export class BlogLinksComponent {}
