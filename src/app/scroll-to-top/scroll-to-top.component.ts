import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  HostListener,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-scroll-to-top',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (isVisible()) {
      <button
        class="scroll-to-top-btn"
        (click)="scrollToTop()"
        aria-label="Прокрутити вгору"
        title="Прокрутити вгору"
      >
        <!-- Progress ring -->
        <svg class="progress-ring" viewBox="0 0 52 52">
          <circle
            class="progress-ring-track"
            cx="26"
            cy="26"
            r="24"
          />
          <circle
            class="progress-ring-fill"
            cx="26"
            cy="26"
            r="24"
            [style.stroke-dashoffset]="progressOffset()"
          />
        </svg>

        <!-- Inner button -->
        <span class="btn-inner">
          <svg
            class="arrow-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </span>
      </button>
    }
  `,
  styles: `
    :host {
      --btn-size: 52px;
      --inner-size: 44px;
      --ring-circumference: 150.796;
    }

    .scroll-to-top-btn {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      width: var(--btn-size);
      height: var(--btn-size);
      padding: 0;
      border: none;
      border-radius: 50%;
      background: transparent;
      cursor: pointer;
      z-index: 1000;
      animation: slideUp 0.5s var(--ease-bounce) forwards;
    }

    /* Frosted glass backdrop - visible on any background */
    .scroll-to-top-btn::before {
      content: '';
      position: absolute;
      inset: -3px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      box-shadow:
        0 2px 12px var(--green-alpha-10),
        inset 0 0 0 1px var(--gold-alpha-20);
      z-index: -1;
    }

    /* Progress ring container */
    .progress-ring {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      transform: rotate(-90deg);
    }

    .progress-ring-track {
      fill: none;
      stroke: var(--gold-alpha-30);
      stroke-width: 2.5;
    }

    .progress-ring-fill {
      fill: none;
      stroke: var(--color-gold);
      stroke-width: 2.5;
      stroke-linecap: round;
      stroke-dasharray: var(--ring-circumference);
      transition: stroke-dashoffset 0.15s ease-out;
    }

    /* Inner circular button */
    .btn-inner {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: var(--inner-size);
      height: var(--inner-size);
      border-radius: 50%;
      background: var(--green-gradient);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow:
        0 4px 16px var(--green-alpha-25),
        0 2px 6px var(--green-alpha-15),
        inset 0 1px 0 rgba(201, 165, 92, 0.15);
      transition:
        transform 0.3s var(--ease-bounce),
        box-shadow 0.3s var(--ease-standard);
    }

    .arrow-icon {
      width: 22px;
      height: 22px;
      color: var(--color-gold);
      transition: transform 0.3s var(--ease-bounce);
    }

    /* Hover state */
    .scroll-to-top-btn:hover .btn-inner {
      box-shadow:
        0 6px 20px var(--green-alpha-30),
        0 3px 10px var(--green-alpha-20),
        inset 0 1px 0 rgba(201, 165, 92, 0.2);
    }

    .scroll-to-top-btn:hover .arrow-icon {
      transform: translateY(-3px);
    }

    .scroll-to-top-btn:hover .progress-ring-fill {
      stroke: var(--color-gold-accent);
    }

    /* Active state */
    .scroll-to-top-btn:active .btn-inner {
      box-shadow:
        0 2px 8px var(--green-alpha-20),
        0 1px 4px var(--green-alpha-15),
        inset 0 2px 4px var(--green-alpha-15);
    }

    .scroll-to-top-btn:active .arrow-icon {
      transform: translateY(-1px);
    }

    /* Focus state for accessibility */
    .scroll-to-top-btn:focus-visible {
      outline: none;
    }

    .scroll-to-top-btn:focus-visible .btn-inner {
      outline: 2px solid var(--color-gold);
      outline-offset: 4px;
    }

    /* Entrance animation */
    @keyframes slideUp {
      0% {
        opacity: 0;
        transform: translateY(20px) scale(0.8);
      }
      100% {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    /* Responsive */
    @media (max-width: 479px) {
      :host {
        --btn-size: 50px;
        --inner-size: 38px;
      }

      .scroll-to-top-btn {
        bottom: 1rem;
        right: 1rem;
      }

      .scroll-to-top-btn::before {
        inset: -2px;
        background: rgba(255, 255, 255, 0.92);
      }

      .progress-ring-track {
        stroke: var(--color-gold-light);
        stroke-width: 3.5;
      }

      .progress-ring-fill {
        stroke: var(--color-gold-accent);
        stroke-width: 3.5;
      }

      .arrow-icon {
        width: 18px;
        height: 18px;
      }
    }
  `,
})
export class ScrollToTopComponent {
  private platformId = inject(PLATFORM_ID);

  isVisible = signal(false);
  scrollProgress = signal(0);

  private readonly circumference = 150.796;

  progressOffset = computed(() => {
    return this.circumference - (this.scrollProgress() / 100) * this.circumference;
  });

  @HostListener('window:scroll')
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      this.scrollProgress.set(Math.min(100, Math.max(0, progress)));
      this.isVisible.set(scrollTop > 300);
    }
  }

  scrollToTop() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
