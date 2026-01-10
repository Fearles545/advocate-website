import {
  Component,
  PLATFORM_ID,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  fromEvent,
  startWith,
  debounceTime,
  map,
  distinctUntilChanged,
  of,
} from 'rxjs';
import { SpinnerComponent } from '@core/components/spinner/spinner.component';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-blog-iframe',
  imports: [MatIconModule, SpinnerComponent],
  template: `
    @for (item of computedSrc(); track item; let i = $index) {
      <div class="video-panel" [class.expanded]="expandedStatesWithManual()[i]">
        <!-- Panel Header -->
        <button
          class="panel-header"
          (click)="togglePanel(i)"
          [attr.aria-expanded]="expandedStatesWithManual()[i]"
          [attr.aria-controls]="'video-content-' + i"
        >
          <span class="header-content">
            <span class="panel-icon">
              <mat-icon>play_circle</mat-icon>
            </span>
            <span class="panel-title">
              Відео-версія блогу
              @if (computedSrc().length > 1) {
                <span class="panel-number"
                  >{{ i + 1 }} / {{ computedSrc().length }}</span
                >
              }
            </span>
          </span>
          <span class="expand-indicator">
            <mat-icon>expand_more</mat-icon>
          </span>
        </button>

        <!-- Panel Content with CSS grid animation -->
        <div
          class="panel-content-wrapper"
          [id]="'video-content-' + i"
          role="region"
        >
          <div class="panel-content">
            <div class="video-container">
              <app-spinner [show]="isIframeLoading()" />

              <iframe
                class="video-iframe"
                [width]="width()"
                [height]="height()"
                [src]="item"
                [title]="title()"
                (load)="onIframeLoad($event)"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    }
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    /* ==========================================================================
       VIDEO PANEL - Custom Expansion
       ========================================================================== */
    .video-panel {
      background: white;
      border-radius: var(--card-border-radius);
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      border: 1px solid rgba(201, 165, 92, 0.25);
      box-shadow:
        0 4px 16px rgba(0, 39, 6, 0.06),
        0 1px 4px rgba(0, 39, 6, 0.04);
      overflow: hidden;
      transition: box-shadow 0.3s ease;

      &:hover {
        box-shadow:
          0 6px 24px rgba(0, 39, 6, 0.1),
          0 2px 6px rgba(0, 39, 6, 0.06);
      }

      &.expanded {
        box-shadow:
          0 8px 32px rgba(0, 39, 6, 0.12),
          0 2px 8px rgba(0, 39, 6, 0.06);

        .expand-indicator mat-icon {
          transform: rotate(180deg);
        }

        .panel-content-wrapper {
          grid-template-rows: 1fr;
        }
      }
    }

    /* ==========================================================================
       PANEL HEADER
       ========================================================================== */
    .panel-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 1rem 1.25rem;
      background: linear-gradient(
        135deg,
        var(--color-green) 0%,
        var(--color-green-dark) 100%
      );
      border: none;
      cursor: pointer;
      transition: background 0.3s ease;

      &:hover {
        background: linear-gradient(
          135deg,
          color-mix(in srgb, var(--color-green) 90%, white) 0%,
          var(--color-green) 100%
        );

        .panel-icon {
          transform: scale(1.05);
          border-color: rgba(201, 165, 92, 0.6);
        }
      }

      &:focus-visible {
        outline: 2px solid var(--color-gold);
        outline-offset: -2px;
      }
    }

    .header-content {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .panel-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2.25rem;
      height: 2.25rem;
      background: rgba(201, 165, 92, 0.15);
      border-radius: 50%;
      border: 1px solid rgba(201, 165, 92, 0.4);
      transition: all 0.25s ease;

      mat-icon {
        font-size: 1.25rem;
        width: 1.25rem;
        height: 1.25rem;
        color: var(--color-gold);
      }
    }

    .panel-title {
      display: flex;
      align-items: center;
      gap: 0.625rem;
      font-family: var(--font-body);
      font-size: 1rem;
      font-weight: 600;
      color: white;
      letter-spacing: 0.01em;
    }

    .panel-number {
      font-size: 0.75rem;
      font-weight: 500;
      padding: 0.2rem 0.625rem;
      background: rgba(201, 165, 92, 0.2);
      border-radius: 1rem;
      color: var(--color-gold-light);
      border: 1px solid rgba(201, 165, 92, 0.25);
    }

    .expand-indicator {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1.75rem;
      height: 1.75rem;

      mat-icon {
        font-size: 1.5rem;
        width: 1.5rem;
        height: 1.5rem;
        color: var(--color-gold);
        transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
      }
    }

    /* ==========================================================================
       PANEL CONTENT - CSS Grid Animation
       ========================================================================== */
    .panel-content-wrapper {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .panel-content {
      overflow: hidden;
    }

    /* ==========================================================================
       VIDEO CONTAINER
       ========================================================================== */
    .video-container {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1.5rem;
      background: linear-gradient(
        180deg,
        rgba(0, 39, 6, 0.02) 0%,
        rgba(248, 246, 242, 0.6) 30%,
        rgba(255, 255, 255, 0.9) 100%
      );
      position: relative;
      min-height: 200px;

      /* Subtle top border accent */
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 1.5rem;
        right: 1.5rem;
        height: 1px;
        background: linear-gradient(
          90deg,
          transparent 0%,
          rgba(201, 165, 92, 0.3) 20%,
          rgba(201, 165, 92, 0.3) 80%,
          transparent 100%
        );
      }
    }

    .video-iframe {
      display: block;
      max-width: 100%;
      border-radius: 0.625rem;
      box-shadow:
        0 8px 32px rgba(0, 0, 0, 0.15),
        0 2px 8px rgba(0, 0, 0, 0.08);
    }

    /* ==========================================================================
       RESPONSIVE
       ========================================================================== */
    @media (max-width: 768px) {
      .panel-header {
        padding: 0.875rem 1rem;
      }

      .header-content {
        gap: 0.625rem;
      }

      .panel-icon {
        width: 2rem;
        height: 2rem;

        mat-icon {
          font-size: 1.1rem;
          width: 1.1rem;
          height: 1.1rem;
        }
      }

      .panel-title {
        font-size: 0.9rem;
        gap: 0.5rem;
      }

      .expand-indicator mat-icon {
        font-size: 1.25rem;
        width: 1.25rem;
        height: 1.25rem;
      }

      .video-container {
        padding: 1rem;

        &::before {
          left: 1rem;
          right: 1rem;
        }
      }
    }

    @media (max-width: 479px) {
      .video-panel {
        border-radius: 0.75rem;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }

      .panel-header {
        padding: 0.75rem 0.875rem;
      }

      .panel-icon {
        width: 1.75rem;
        height: 1.75rem;

        mat-icon {
          font-size: 1rem;
          width: 1rem;
          height: 1rem;
        }
      }

      .panel-title {
        font-size: 0.85rem;
      }

      .panel-number {
        font-size: 0.7rem;
        padding: 0.15rem 0.5rem;
      }

      .expand-indicator {
        width: 1.5rem;
        height: 1.5rem;

        mat-icon {
          font-size: 1.125rem;
          width: 1.125rem;
          height: 1.125rem;
        }
      }

      .video-container {
        padding: 0.875rem;

        &::before {
          left: 0.875rem;
          right: 0.875rem;
        }
      }

      .video-iframe {
        border-radius: 0.5rem;
      }
    }
  `,
})
export class BlogIframeComponent {
  private readonly sanitizer = inject(DomSanitizer);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly initialDesktop = this.isBrowser
    ? window.innerWidth > 768
    : false;

  width = input<number>(350);
  height = input<number>(600);
  src = input.required<string[]>();
  title = input<string>();

  computedSrc = computed(() =>
    this.src().map((item) =>
      this.sanitizer.bypassSecurityTrustResourceUrl(item)
    )
  );

  isIframeLoading = signal(true);

  private readonly isDesktop = toSignal(
    this.isBrowser
      ? fromEvent(window, 'resize').pipe(
          startWith(0),
          debounceTime(200),
          map(() => window.innerWidth > 768),
          distinctUntilChanged()
        )
      : of(this.initialDesktop),
    { initialValue: this.initialDesktop }
  );

  expandedStates = computed(() => {
    const count = this.src().length;
    const desktop = this.isDesktop();
    return Array.from({ length: count }, () => desktop);
  });

  private manualStates = signal<Record<number, boolean>>({});

  expandedStatesWithManual = computed(() => {
    const base = this.expandedStates();
    const manual = this.manualStates();
    return base.map((auto, i) => (i in manual ? manual[i] : auto));
  });

  togglePanel(index: number): void {
    const current = this.expandedStatesWithManual()[index];
    this.manualStates.update((states) => ({
      ...states,
      [index]: !current,
    }));
  }

  onIframeLoad = (event: Event) => {
    const iframe = event.target as HTMLIFrameElement;
    if (iframe.src && iframe.src !== 'about:blank') {
      this.isIframeLoading.set(false);
    }
  };
}
