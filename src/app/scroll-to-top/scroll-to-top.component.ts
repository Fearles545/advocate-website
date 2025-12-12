import {
  Component,
  ChangeDetectionStrategy,
  signal,
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </button>
    }
  `,
  styles: `
    .scroll-to-top-btn {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: var(--color-gold);
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      transition:
        transform 0.3s ease,
        box-shadow 0.3s ease,
        opacity 0.3s ease;
      z-index: 1000;

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
      }

      &:active {
        transform: translateY(0);
      }

      svg {
        width: 24px;
        height: 24px;
        color: white;
      }
    }

    @media (max-width: 479px) {
      .scroll-to-top-btn {
        bottom: 1rem;
        right: 1rem;
        width: 44px;
        height: 44px;

        svg {
          width: 20px;
          height: 20px;
        }
      }
    }
  `,
})
export class ScrollToTopComponent {
  private platformId = inject(PLATFORM_ID);
  isVisible = signal(false);

  @HostListener('window:scroll')
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.isVisible.set(window.scrollY > 300);
    }
  }

  scrollToTop() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
