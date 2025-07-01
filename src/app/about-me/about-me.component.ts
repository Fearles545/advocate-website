import { NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';

import { MatDialog } from '@angular/material/dialog';
import { AboutMeDialogComponent } from './about-me-dialog/about-me-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { SeoService } from '../core/services/seo.service';

@Component({
  selector: 'app-about-me',
  imports: [NgOptimizedImage, RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css',
})
export class AboutMeComponent implements OnInit {
  private dialog = inject(MatDialog);
  private seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.updatePageSEO({
      title: 'Про мене - Поддяча Юлія Юріївна | Адвокат по пенсіях',
      description:
        'Досвідчений адвокат з пенсійних питань. Випускниця НЮУ ім. Ярослава Мудрого, 10+ років досвіду, свідоцтво адвоката з 2021 року. Професійна допомога з пенсійного права.',
      keywords:
        'Поддяча Юлія Юріївна, адвокат біографія, освіта адвокат, досвід роботи пенсійний фонд, НЮУ Ярослава Мудрого, свідоцтво адвоката',
      canonical: 'https://www.advocate-pensia.com.ua/about-me',
    });
  }

  openDialog() {
    this.dialog.open(AboutMeDialogComponent, {
      width: '400px',
      height: 'auto',
      autoFocus: false,
    });
  }
}
