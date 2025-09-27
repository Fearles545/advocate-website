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
      color="primary"
      matIconButton
      [matMenuTriggerFor]="menu"
      aria-label="Поділитися в соціальних мережах"
    >
      <mat-icon matIconSuffix>share</mat-icon>
    </button>

    <mat-menu #menu="matMenu">
      <button
        mat-menu-item
        [cdkCopyToClipboard]="blog().slug | appBlogBaseUrl"
        (click)="openSnackBar()"
      >
        <div
          style="
            display: flex;
            align-items: center;
            gap: 1rem;
            "
        >
          <mat-icon
            style="
              width: 1.5rem;
              height: 1.5rem;
              margin: 0;
            "
          >
            content_copy
          </mat-icon>

          <span>Копіювати посилання</span>
        </div>
      </button>

      @for (iconData of shareIcons; track iconData.alt) {
        @let shareLink =
          iconData.shareLink
            ? iconData?.shareLink(blog().slug | appBlogBaseUrl, blog().title)
            : '';
        <a mat-menu-item target="_blank" [href]="shareLink">
          <div style="display: flex; align-items: center; gap: 1rem;">
            <svg
              style="width: 1.5rem; height: 1.5rem;"
              [style.color]="iconData.color || iconColor"
              [attr.viewBox]="iconData.viewBox"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
            >
              <g [innerHTML]="sanitizedSvg(iconData)"></g>
            </svg>

            <span>{{ iconData.name }}</span>
          </div>
        </a>
      }
    </mat-menu>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class SocialShareComponent {
  private snackBar = inject(MatSnackBar);
  private domSanitizer = inject(DomSanitizer);

  blog = input.required<Blog>();

  shareIcons = shareIconsData;
  iconColor = 'var(--color-green)';

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
