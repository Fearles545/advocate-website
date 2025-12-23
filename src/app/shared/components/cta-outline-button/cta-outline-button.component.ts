import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: '[appCtaOutlineButton]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  host: {
    class: 'cta-outline-button',
    '[attr.data-theme]': 'theme()',
  },
  template: `
    <span class="cta-text">
      <ng-content />
    </span>
    @if (icon()) {
      <span class="cta-icon">
        <mat-icon>{{ icon() }}</mat-icon>
      </span>
    }
  `,
  styles: `
    /* =========================
       BASE STYLES (Green Theme)
       ========================= */
    :host {
      --cta-color: var(--color-green);
      --cta-color-hover: var(--color-gold);
      --cta-border: rgba(0, 39, 6, 0.2);
      --cta-border-hover: var(--color-green);
      --cta-bg-gradient-start: var(--color-green);
      --cta-bg-gradient-end: #003d0a;
      --cta-icon-bg: rgba(0, 39, 6, 0.08);
      --cta-icon-bg-hover: rgba(201, 165, 92, 0.2);
      --cta-shadow-color: rgba(0, 39, 6, 0.2);

      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem 1.5rem;
      background: transparent;
      color: var(--cta-color);
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: 600;
      letter-spacing: 0.5px;
      border-radius: 3rem;
      border: 2px solid var(--cta-border);
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition:
        transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
        box-shadow 0.4s ease,
        border-color 0.3s ease;
      -webkit-tap-highlight-color: transparent;
    }

    :host::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(
        135deg,
        var(--cta-bg-gradient-start) 0%,
        var(--cta-bg-gradient-end) 100%
      );
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 0;
    }

    :host(:hover) {
      transform: translateY(-3px);
      border-color: var(--cta-border-hover);
      box-shadow:
        0 8px 28px var(--cta-shadow-color),
        0 4px 12px var(--cta-shadow-color);
    }

    :host(:hover)::before {
      opacity: 1;
    }

    :host(:hover) .cta-text {
      color: var(--cta-color-hover);
    }

    :host(:hover) .cta-icon {
      background: var(--cta-icon-bg-hover);
      transform: translateX(4px);
    }

    :host(:hover) .cta-icon mat-icon {
      color: var(--cta-color-hover);
    }

    :host(:active) {
      transform: translateY(-1px);
    }

    /* =========================
       GOLD THEME (Dark backgrounds)
       ========================= */
    :host([data-theme='gold']) {
      --cta-color: var(--color-gold);
      --cta-color-hover: var(--color-green);
      --cta-border: rgba(201, 165, 92, 0.3);
      --cta-border-hover: var(--color-gold);
      --cta-bg-gradient-start: var(--color-gold);
      --cta-bg-gradient-end: #a8854a;
      --cta-icon-bg: rgba(201, 165, 92, 0.15);
      --cta-icon-bg-hover: rgba(0, 39, 6, 0.15);
      --cta-shadow-color: rgba(201, 165, 92, 0.3);
    }

    /* =========================
       ELEMENTS
       ========================= */
    .cta-text {
      position: relative;
      z-index: 1;
      transition: color 0.3s ease;
    }

    .cta-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1.5rem;
      height: 1.5rem;
      background: var(--cta-icon-bg);
      border-radius: 50%;
      position: relative;
      z-index: 1;
      transition:
        transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
        background 0.3s ease;

      mat-icon {
        font-size: 0.95rem;
        width: 0.95rem;
        height: 0.95rem;
        transition: color 0.3s ease;
      }
    }

    /* =========================
       RESPONSIVE
       ========================= */
    @media (min-width: 640px) {
      :host {
        font-size: 1.05rem;
      }
    }
  `,
})
export class CtaOutlineButtonComponent {
  theme = input<'green' | 'gold'>('green');
  icon = input<string>('arrow_forward');
}
