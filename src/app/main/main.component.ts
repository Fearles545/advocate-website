import { NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { SeoService } from '../core/services/seo.service';

@Component({
  selector: 'app-main',
  imports: [NgOptimizedImage, MatButtonModule, RouterLink],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.updatePageSEO({
      title: 'Поддяча Юлія Юріївна | Адвокат по пенсіях в Україні',
      description:
        'Професійні адвокатські послуги з пенсійних питань. Оформлення пенсії без вашої присутності в ПФУ. Кваліфікована юридична допомога, досвід 10+ років.',
      keywords:
        'адвокат по пенсіях, Поддяча Юлія Юріївна, пенсійні питання України, оформлення пенсії без присутності, пенсійне право',
      canonical: 'https://www.advocate-pensia.com.ua/',
    });
  }
}
