import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';

import { MatDialog } from '@angular/material/dialog';
import { AboutMeDialogComponent } from './about-me-dialog/about-me-dialog.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-about-me',
  imports: [NgOptimizedImage, RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css',
})
export class AboutMeComponent {
  private dialog = inject(MatDialog);

  openDialog() {
    this.dialog.open(AboutMeDialogComponent, {
      width: '400px',
      height: 'auto',
      autoFocus: false,
    });
  }
}
