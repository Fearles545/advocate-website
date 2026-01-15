import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { AboutMeDialogComponent } from './about-me-dialog/about-me-dialog.component';
import { CtaButtonComponent } from '../shared/components/cta-button/cta-button.component';
import { CtaOutlineButtonComponent } from '../shared/components/cta-outline-button/cta-outline-button.component';

@Component({
  selector: 'app-about-me',
  imports: [
    NgOptimizedImage,
    RouterLink,
    MatIconModule,
    CtaButtonComponent,
    CtaOutlineButtonComponent,
  ],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css',
})
export class AboutMeComponent {
  private dialog = inject(MatDialog);

  openDialog(): void {
    this.dialog.open(AboutMeDialogComponent, {
      width: '500px',
      maxWidth: '90vw',
      height: 'auto',
      autoFocus: false,
    });
  }
}
