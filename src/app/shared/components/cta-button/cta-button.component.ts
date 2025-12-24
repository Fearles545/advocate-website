import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: '[appCtaButton]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  host: {
    class: 'cta-button',
    '[attr.data-theme]': 'theme()',
  },
  template: `
    <span class="btn-glow"></span>
    @if (icon()) {
      <span class="cta-icon-wrapper">
        <mat-icon>{{ icon() }}</mat-icon>
      </span>
    }
    <span class="cta-text">
      <ng-content />
    </span>
  `,
  styles: `
    /* =========================
       BASE STYLES (Green Theme)
       ========================= */
    :host {
      --cta-bg-start: var(--color-green);
      --cta-bg-mid: var(--color-green-dark);
      --cta-bg-end: var(--color-green);
      --cta-text: var(--color-gold);
      --cta-glow: rgba(201, 165, 92, 0.2);
      --cta-icon-bg: rgba(201, 165, 92, 0.15);
      --cta-icon-border: rgba(201, 165, 92, 0.25);
      --cta-shadow-color: rgba(0, 39, 6, 0.25);
      --cta-shadow-color-hover: rgba(0, 39, 6, 0.3);

      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.5rem;
      background: linear-gradient(
        135deg,
        var(--cta-bg-start) 0%,
        var(--cta-bg-mid) 50%,
        var(--cta-bg-end) 100%
      );
      background-size: 200% 200%;
      background-position: 0% 50%;
      color: var(--cta-text);
      text-decoration: none;
      font-size: 1.05rem;
      font-weight: 600;
      letter-spacing: 0.5px;
      border-radius: 3rem;
      border: 2px solid transparent;
      box-shadow:
        0 4px 20px var(--cta-shadow-color),
        0 2px 8px var(--cta-shadow-color),
        inset 0 1px 0 rgba(201, 165, 92, 0.1);
      transition:
        transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
        box-shadow 0.3s ease,
        background-position 0.5s ease,
        border-color 0.3s ease;
      overflow: hidden;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }

    :host(:hover) {
      transform: translateY(-2px);
      background-position: 100% 50%;
      border-color: var(--cta-glow);
      box-shadow:
        0 8px 32px var(--cta-shadow-color-hover),
        0 4px 12px var(--cta-shadow-color),
        inset 0 1px 0 rgba(201, 165, 92, 0.15);
    }

    :host(:active) {
      transform: translateY(0);
      box-shadow:
        0 2px 12px var(--cta-shadow-color),
        0 1px 4px var(--cta-shadow-color);
    }

    /* =========================
       GOLD THEME OVERRIDES
       ========================= */
    :host([data-theme='gold']) {
      --cta-bg-start: var(--color-gold);
      --cta-bg-mid: var(--color-gold-dark);
      --cta-bg-end: var(--color-gold);
      --cta-text: var(--color-green-darkest);
      --cta-glow: rgba(201, 165, 92, 0.3);
      --cta-shadow-color: rgba(168, 133, 74, 0.3);
      --cta-shadow-color-hover: rgba(168, 133, 74, 0.4);
      box-shadow:
        0 4px 20px var(--cta-shadow-color),
        0 2px 8px var(--cta-shadow-color),
        inset 0 1px 0 rgba(255, 255, 255, 0.15);
    }

    :host([data-theme='gold']:hover) {
      box-shadow:
        0 8px 32px var(--cta-shadow-color-hover),
        0 4px 12px var(--cta-shadow-color),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
    }

    :host([data-theme='gold']) .cta-icon-wrapper {
      background: var(--cta-glow);
      border-color: rgba(0, 26, 4, 0.3);
    }

    :host([data-theme='gold']) .cta-icon-wrapper mat-icon {
      color: var(--color-green-darkest);
    }

    :host([data-theme='gold']:hover) .cta-icon-wrapper {
      box-shadow: 0 0 0 4px rgba(0, 26, 4, 0.15);
    }

    :host([data-theme='gold']) .btn-glow {
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.25),
        transparent
      );
    }

    /* =========================
       SHIMMER ANIMATION
       ========================= */
    .btn-glow {
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(201, 165, 92, 0.35),
        transparent
      );
      animation: shimmer 4s ease-in-out infinite;
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

    /* =========================
       ICON WRAPPER
       ========================= */
    .cta-icon-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2.5rem;
      height: 2.5rem;
      background: var(--cta-icon-bg);
      border-radius: 50%;
      border: 1px solid var(--cta-icon-border);
      transition:
        transform 0.3s ease,
        box-shadow 0.3s ease;
      position: relative;
      z-index: 1;
      flex-shrink: 0;

      mat-icon {
        font-size: 1.25rem;
        width: 1.25rem;
        height: 1.25rem;
        color: var(--cta-text);
      }
    }

    :host(:hover) .cta-icon-wrapper {
      transform: scale(1.05);
      box-shadow: 0 0 0 4px var(--cta-glow);
      animation: icon-shake 0.4s ease-in-out;
    }

    @keyframes icon-shake {
      0%,
      100% {
        transform: scale(1.05) rotate(0deg);
      }
      25% {
        transform: scale(1.05) rotate(-8deg);
      }
      75% {
        transform: scale(1.05) rotate(8deg);
      }
    }

    /* =========================
       TEXT
       ========================= */
    .cta-text {
      position: relative;
      z-index: 1;
      margin: 0 1rem;
    }

    /* =========================
       RESPONSIVE
       ========================= */
    @media (min-width: 640px) {
      :host {
        font-size: 1.1rem;
      }
    }
  `,
})
export class CtaButtonComponent {
  theme = input<'green' | 'gold'>('green');
  icon = input<string>();
}
