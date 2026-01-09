import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { MatMenuModule } from '@angular/material/menu';
import { DomSanitizer } from '@angular/platform-browser';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Blog } from '../../blog-posts';
import { BlogBaseUrlPipe } from './base-url.pipe';
import { shareIconsData, SocialIconData } from './share-icons.data';

@Component({
  selector: 'app-social-share',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    ClipboardModule,
    MatSnackBarModule,
    BlogBaseUrlPipe,
  ],
  template: `
    <button
      class="share-button"
      [matMenuTriggerFor]="menu"
      aria-label="Поділитися в соціальних мережах"
    >
      <mat-icon>share</mat-icon>
      <span class="share-text">Поділитися</span>
    </button>

    <mat-menu #menu="matMenu" class="share-menu">
      <button
        mat-menu-item
        class="share-menu-item"
        [cdkCopyToClipboard]="blog().slug | appBlogBaseUrl"
        (click)="openSnackBar()"
      >
        <span class="menu-icon copy-icon">
          <mat-icon>content_copy</mat-icon>
        </span>
        <span class="menu-text">Копіювати посилання</span>
      </button>

      @for (iconData of shareIcons; track iconData.alt) {
        @let shareLink =
          iconData.shareLink
            ? iconData?.shareLink(blog().slug | appBlogBaseUrl, blog().title)
            : '';
        <a
          mat-menu-item
          class="share-menu-item"
          target="_blank"
          [href]="shareLink"
        >
          <span class="menu-icon" [style.--icon-color]="iconData.color">
            <svg
              [style.color]="iconData.color"
              [attr.viewBox]="iconData.viewBox"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
            >
              <g [innerHTML]="sanitizedSvg(iconData)"></g>
            </svg>
          </span>
          <span class="menu-text">{{ iconData.name }}</span>
        </a>
      }
    </mat-menu>
  `,
  styles: `
    :host {
      display: block;
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

      &:hover {
        transform: translateY(-2px);
        box-shadow:
          0 4px 12px rgba(0, 39, 6, 0.2),
          inset 0 1px 0 rgba(201, 165, 92, 0.15);

        mat-icon {
          transform: scale(1.1);
        }
      }

      &:active {
        transform: translateY(0);
      }
    }

    /* ==========================================================================
       SHARE MENU ITEM
       ========================================================================== */
    .share-menu-item {
      display: flex;
      align-items: center;
      gap: 0.875rem;
      padding: 0.75rem 1rem !important;
      min-height: auto !important;

      &:hover .menu-icon {
        transform: scale(1.1);
      }
    }

    .menu-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2rem;
      height: 2rem;
      min-width: 2rem;
      background: rgba(201, 165, 92, 0.1);
      border-radius: 0.5rem;
      transition: transform 0.3s var(--ease-bounce);

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
        background: linear-gradient(
          135deg,
          var(--color-green) 0%,
          var(--color-green-dark) 100%
        );

        mat-icon {
          color: var(--color-gold);
        }
      }
    }

    .menu-text {
      font-size: 0.9rem;
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

        mat-icon {
          font-size: 1rem;
          width: 1rem;
          height: 1rem;
        }

        .share-text {
          font-size: 0.8rem;
        }
      }
    }
  `,
})
export class SocialShareComponent {
  private snackBar = inject(MatSnackBar);
  private domSanitizer = inject(DomSanitizer);

  blog = input.required<Blog>();

  shareIcons = shareIconsData;

  sanitizedSvg = (iconData: SocialIconData) =>
    iconData.svg.includes('.svg')
      ? ''
      : this.domSanitizer.bypassSecurityTrustHtml(iconData.svg);

  openSnackBar() {
    this.snackBar.open('Посилання скопійовано в буфер обміну', 'Закрити', {
      duration: 3000,
    });
  }
}
