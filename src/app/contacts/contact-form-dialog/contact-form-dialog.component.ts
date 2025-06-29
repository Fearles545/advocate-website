import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-contact-form-dialog',
  imports: [
    MatDialogModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
  ],
  template: `
    <h2
      mat-dialog-title
      [style]="{
        backgroundImage:
          'linear-gradient(
          109.6deg,
          rgba(204, 228, 247, 1) 11.2%,
          rgba(237, 246, 250, 1) 100.2%
        )',
        margin: '0',
        borderBottom: '1px solid var(--color-green)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.5rem 1.5rem',
      }"
    >
      <span>Зворотній звʼязок</span>

      <button mat-icon-button mat-dialog-close>
        <mat-icon>close</mat-icon>
      </button>
    </h2>

    <mat-dialog-content
      [style]="{
        backgroundImage:
          'linear-gradient(
          109.6deg,
          rgba(204, 228, 247, 1) 11.2%,
          rgba(237, 246, 250, 1) 100.2%
        )',
        padding: '0',
      }"
    >
      <div class="iframe-container">
        @if (isLoading) {
          <div class="loading-spinner">
            <mat-spinner></mat-spinner>
          </div>
        }

        <iframe
          style="max-width: 100%"
          [style]="{ visibility: isLoading ? 'hidden' : 'visible' }"
          src="https://docs.google.com/forms/d/e/1FAIpQLScDRWOAGdq3qR9vlZDiC5yuEKIflb49hEd90ttWmGQ1mWfPCg/viewform?embedded=true"
          [width]="width > 500 ? width : '100%'"
          height="1397"
          frameborder="0"
          marginheight="0"
          marginwidth="0"
          (load)="onIframeLoad()"
        >
        </iframe>
      </div>
    </mat-dialog-content>
  `,
  styles: [
    `
      .mat-mdc-dialog-title::before {
        display: none;
      }

      .loading-spinner {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.8);
        z-index: 10;
      }
    `,
  ],
})
export class ContactFormDialogComponent {
  data = inject<{
    width: number;
    height: number;
  }>(MAT_DIALOG_DATA);
  isLoading = true;

  width = this.data.width;
  height = this.data.height;

  onIframeLoad(): void {
    this.isLoading = false;
  }
}
