import {
  Component,
  PLATFORM_ID,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DomSanitizer } from '@angular/platform-browser';
import { MatExpansionModule } from '@angular/material/expansion';
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
  imports: [
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatIconModule,
    SpinnerComponent,
  ],
  template: `
    @for (item of computedSrc(); track item; let i = $index) {
      <mat-expansion-panel
        [expanded]="isDesktop()"
        class="video-panel"
      >
        <mat-expansion-panel-header>
          <mat-panel-title>
            <span class="panel-icon">
              <mat-icon>play_circle</mat-icon>
            </span>
            <span class="panel-text">
              Відео-версія блогу
              @if (computedSrc().length > 1) {
                <span class="panel-number">{{ i + 1 }} / {{ computedSrc().length }}</span>
              }
            </span>
          </mat-panel-title>
        </mat-expansion-panel-header>

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
      </mat-expansion-panel>
    }
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    /* ==========================================================================
       VIDEO PANEL
       ========================================================================== */
    .video-panel {
      background: white;
      border-radius: var(--card-border-radius) !important;
      border: 1px solid rgba(201, 165, 92, 0.25);
      box-shadow:
        0 4px 16px rgba(0, 39, 6, 0.06),
        0 1px 4px rgba(0, 39, 6, 0.04);
      overflow: hidden;

      /* Override Material styles */
      --mat-expansion-header-collapsed-state-height: auto;
      --mat-expansion-header-expanded-state-height: auto;

      &.mat-expansion-panel {
        box-shadow:
          0 4px 16px rgba(0, 39, 6, 0.06),
          0 1px 4px rgba(0, 39, 6, 0.04);
      }

      /* Panel header */
      mat-expansion-panel-header {
        padding: 1rem 1.25rem;
        background: linear-gradient(
          135deg,
          var(--color-green) 0%,
          var(--color-green-dark) 100%
        );
        transition: background 0.3s ease;

        &:hover {
          background: linear-gradient(
            135deg,
            var(--color-green-dark) 0%,
            var(--color-green) 100%
          );
        }
      }

      /* Panel title */
      mat-panel-title {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        color: white;
        font-weight: 600;
        font-size: 1rem;

        /* Override Material color */
        --mat-expansion-header-text-color: white;
      }

      /* Expansion indicator */
      --mat-expansion-header-indicator-color: var(--color-gold);
    }

    .panel-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2rem;
      height: 2rem;
      background: rgba(201, 165, 92, 0.2);
      border-radius: 50%;
      border: 1px solid rgba(201, 165, 92, 0.4);

      mat-icon {
        font-size: 1.1rem;
        width: 1.1rem;
        height: 1.1rem;
        color: var(--color-gold);
      }
    }

    .panel-text {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .panel-number {
      font-size: 0.8rem;
      font-weight: 500;
      padding: 0.125rem 0.5rem;
      background: rgba(201, 165, 92, 0.2);
      border-radius: 1rem;
      color: var(--color-gold-light);
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
        rgba(248, 246, 242, 0.5) 0%,
        rgba(255, 255, 255, 0.8) 100%
      );
      position: relative;
      min-height: 200px;
    }

    .video-iframe {
      display: block;
      max-width: 100%;
      border-radius: 0.5rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    }

    /* ==========================================================================
       RESPONSIVE
       ========================================================================== */
    @media (max-width: 768px) {
      .video-panel {
        mat-expansion-panel-header {
          padding: 0.875rem 1rem;
        }

        mat-panel-title {
          font-size: 0.9rem;
          gap: 0.5rem;
        }
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

      .video-container {
        padding: 1rem;
      }
    }

    @media (max-width: 479px) {
      .video-panel {
        border-radius: 0.75rem !important;

        mat-expansion-panel-header {
          padding: 0.75rem;
        }

        mat-panel-title {
          font-size: 0.85rem;
        }
      }

      .panel-icon {
        width: 1.5rem;
        height: 1.5rem;

        mat-icon {
          font-size: 0.9rem;
          width: 0.9rem;
          height: 0.9rem;
        }
      }

      .panel-number {
        font-size: 0.7rem;
        padding: 0.1rem 0.4rem;
      }

      .video-container {
        padding: 0.75rem;
      }

      .video-iframe {
        border-radius: 0.375rem;
      }
    }
  `,
})
export class BlogIframeComponent {
  sanitizer = inject(DomSanitizer);
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

  isDesktop = toSignal(
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

  onIframeLoad = (event: Event) => {
    const iframe = event.target as HTMLIFrameElement;
    if (iframe.src && iframe.src !== 'about:blank') {
      this.isIframeLoading.set(false);
    }
  };
}
