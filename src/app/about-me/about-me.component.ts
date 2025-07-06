import { NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';

import { MatDialog } from '@angular/material/dialog';
import { AboutMeDialogComponent } from './about-me-dialog/about-me-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about-me',
  imports: [NgOptimizedImage, RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css',
})
export class AboutMeComponent implements OnInit {
  private dialog = inject(MatDialog);
  private meta = inject(Meta);
  private title = inject(Title);

  setSeo() {
    this.title.setTitle('Про мене | Поддяча Юлія Юріївна');

    this.meta.updateTag({
      name: 'description',
      content:
        'Досвід роботи адвокатом більше 10 років. Спеціалізація на пенсійних питаннях та соціальному захисті. Кваліфікована юридична допомога.',
    });

    this.meta.updateTag({
      property: 'og:title',
      content: 'Про мене | Поддяча Юлія Юріївна',
    });

    this.meta.updateTag({
      property: 'og:description',
      content:
        'Досвід роботи адвокатом більше 10 років. Спеціалізація на пенсійних питаннях та соціальному захисті.',
    });
  }

  ngOnInit(): void {
    this.setSeo();
  }

  openDialog() {
    this.dialog.open(AboutMeDialogComponent, {
      width: '400px',
      height: 'auto',
      autoFocus: false,
    });
  }
}
