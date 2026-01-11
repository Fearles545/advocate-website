import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  input,
  signal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Clipboard } from '@angular/cdk/clipboard';
import { DropdownPositionDirective } from '../../../core/directives/dropdown-position.directive';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { Blog } from '../../blog-posts';
import { BlogBaseUrlPipe } from './base-url.pipe';
import { shareIconsData, SocialIconData } from './share-icons.data';

@Component({
  selector: 'app-social-share',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, MatSnackBarModule, DropdownPositionDirective],
  template: `
    <div
      class="social-share"
      appDropdownPosition
      [dpIsOpen]="isOpen()"
      #position="dropdownPosition"
    >
      <button
        class="share-button"
        (click)="toggleDropdown()"
        [attr.aria-expanded]="isOpen()"
        aria-haspopup="menu"
        aria-label="Поділитися в соціальних мережах"
      >
        <mat-icon>share</mat-icon>
        <span class="share-text">Поділитися</span>
        <mat-icon class="dropdown-icon" [class.rotated]="isOpen()"
          >expand_more</mat-icon
        >
      </button>

      @if (isOpen()) {
        <div
          class="dropdown-panel"
          [class.open-up]="position.openUp()"
          role="menu"
        >
          <!-- Copy Link -->
          <button class="dropdown-item" (click)="copyLink()" role="menuitem">
            <span class="item-icon copy-icon">
              <mat-icon>content_copy</mat-icon>
            </span>
            <span class="item-text">Копіювати посилання</span>
          </button>

          <!-- Social Share Links -->
          @for (iconData of shareIcons; track iconData.alt) {
            <a
              class="dropdown-item"
              target="_blank"
              rel="noopener noreferrer"
              [href]="getShareLink(iconData)"
              (click)="closeDropdown()"
              role="menuitem"
            >
              <span class="item-icon" [style.--icon-color]="iconData.color">
                <svg
                  [style.color]="iconData.color"
                  [attr.viewBox]="iconData.viewBox"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                >
                  <g [innerHTML]="sanitizedSvg(iconData)"></g>
                </svg>
              </span>
              <span class="item-text">{{ iconData.name }}</span>
            </a>
          }
        </div>
      }
    </div>
  `,
  styles: `
    .social-share {
      position: relative;
    }

    /* ==========================================================================
       SHARE BUTTON
       ========================================================================== */
    .share-button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      background: linear-gradient(
        135deg,
        var(--color-green) 0%,
        var(--color-green-dark) 100%
      );
      border: none;
      border-radius: 2rem;
      cursor: pointer;
      transition: all 0.3s var(--ease-standard);
      box-shadow:
        0 2px 8px rgba(0, 39, 6, 0.15),
        inset 0 1px 0 rgba(201, 165, 92, 0.1);

      mat-icon {
        font-size: 1.1rem;
        width: 1.1rem;
        height: 1.1rem;
        color: var(--color-gold);
        transition: transform 0.3s var(--ease-bounce);
      }

      .share-text {
        font-size: 0.85rem;
        font-weight: 600;
        color: white;
      }

      .dropdown-icon {
        font-size: 1rem;
        width: 1rem;
        height: 1rem;
        color: rgba(201, 165, 92, 0.7);
        margin-left: -0.25rem;
        transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);

        &.rotated {
          transform: rotate(180deg);
        }
      }

      &:hover {
        transform: translateY(-2px);
        box-shadow:
          0 4px 12px rgba(0, 39, 6, 0.2),
          inset 0 1px 0 rgba(201, 165, 92, 0.15);

        mat-icon:first-child {
          transform: scale(1.1);
        }
      }

      &:active {
        transform: translateY(0);
      }
    }

    /* ==========================================================================
       DROPDOWN PANEL
       ========================================================================== */
    .dropdown-panel {
      position: absolute;
      top: calc(100% + 0.5rem);
      right: 0;
      z-index: 1000;
      min-width: 220px;
      padding: 0.5rem;
      background: #fffcf7;
      border: 1px solid rgba(201, 165, 92, 0.25);
      border-radius: 0.625rem;
      box-shadow:
        0 12px 40px rgba(0, 39, 6, 0.15),
        0 4px 12px rgba(0, 39, 6, 0.08);

      animation: dropdownReveal 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    @keyframes dropdownReveal {
      from {
        opacity: 0;
        transform: translateY(-8px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes dropdownRevealUp {
      from {
        opacity: 0;
        transform: translateY(8px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .dropdown-panel.open-up {
      top: auto;
      bottom: calc(100% + 0.5rem);
      animation-name: dropdownRevealUp;
    }

    /* ==========================================================================
       DROPDOWN ITEMS
       ========================================================================== */
    .dropdown-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      width: 100%;
      padding: 0.625rem 0.875rem;
      background: transparent;
      border: none;
      border-radius: 0.5rem;
      font-family: var(--font-body);
      font-size: 0.9rem;
      text-align: left;
      text-decoration: none;
      cursor: pointer;
      transition: all 0.15s ease;

      &:hover {
        background: rgba(201, 165, 92, 0.1);

        .item-icon {
          transform: scale(1.1);
        }
      }
    }

    .item-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2rem;
      height: 2rem;
      min-width: 2rem;
      background: rgba(201, 165, 92, 0.1);
      border-radius: 0.5rem;
      transition: transform 0.2s var(--ease-bounce);

      mat-icon,
      svg {
        width: 1.25rem;
        height: 1.25rem;
      }

      mat-icon {
        font-size: 1.25rem;
        color: var(--color-gold);
      }

      &.copy-icon {
        mat-icon {
          color: var(--color-gold);
        }
      }
    }

    .item-text {
      font-weight: 500;
      color: var(--color-green);
    }

    /* ==========================================================================
       RESPONSIVE
       ========================================================================== */
    @media (max-width: 479px) {
      .share-button {
        padding: 0.4rem 0.875rem;
        gap: 0.375rem;

        mat-icon:first-child {
          font-size: 1rem;
          width: 1rem;
          height: 1rem;
        }

        .share-text {
          font-size: 0.8rem;
        }

        .dropdown-icon {
          font-size: 0.875rem;
          width: 0.875rem;
          height: 0.875rem;
        }
      }

      .dropdown-panel {
        min-width: 200px;
      }

      .dropdown-item {
        padding: 0.5rem 0.75rem;
        gap: 0.625rem;
      }

      .item-icon {
        width: 1.75rem;
        height: 1.75rem;
        min-width: 1.75rem;

        mat-icon,
        svg {
          width: 1.1rem;
          height: 1.1rem;
        }

        mat-icon {
          font-size: 1.1rem;
        }
      }

      .item-text {
        font-size: 0.85rem;
      }
    }
  `,
})
export class SocialShareComponent {
  private snackBar = inject(MatSnackBar);
  private clipboard = inject(Clipboard);
  private domSanitizer = inject(DomSanitizer);
  private elementRef = inject(ElementRef);
  private baseUrlPipe = new BlogBaseUrlPipe();

  blog = input.required<Blog>();

  shareIcons = shareIconsData;
  isOpen = signal(false);

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.closeDropdown();
    }
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    this.closeDropdown();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (this.isOpen()) {
      this.closeDropdown();
    }
  }

  toggleDropdown(): void {
    this.isOpen.update((open) => !open);
  }

  closeDropdown(): void {
    this.isOpen.set(false);
  }

  sanitizedSvg(iconData: SocialIconData) {
    return iconData.svg.includes('.svg')
      ? ''
      : this.domSanitizer.bypassSecurityTrustHtml(iconData.svg);
  }

  getShareLink(iconData: SocialIconData): string {
    if (!iconData.shareLink) return '';
    const url = this.baseUrlPipe.transform(this.blog().slug);
    return iconData.shareLink(url, this.blog().title);
  }

  copyLink(): void {
    const url = this.baseUrlPipe.transform(this.blog().slug);
    this.clipboard.copy(url);
    this.snackBar.open('Посилання скопійовано в буфер обміну', 'Закрити', {
      duration: 3000,
    });
    this.closeDropdown();
  }
}
