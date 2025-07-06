import { Component, OnInit, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NgOptimizedImage } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [NgOptimizedImage, MatButtonModule, RouterLink],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  private meta = inject(Meta);
  private title = inject(Title);

  ngOnInit() {
    // Set page title
    this.title.setTitle('Поддяча Юлія Юріївна | Адвокат по пенсіях в Україні');

    // Set meta description
    this.meta.updateTag({
      name: 'description',
      content:
        'Професійні адвокатські послуги з пенсійних питань. Оформлення пенсії без вашої присутності в ПФУ. Кваліфікована юридична допомога, досвід 10+ років.',
    });

    // Set keywords
    this.meta.updateTag({
      name: 'keywords',
      content:
        'адвокат, пенсія, пенсійні послуги, юридична допомога, ПФУ, Україна',
    });

    // Open Graph tags
    this.meta.updateTag({
      property: 'og:title',
      content: 'Поддяча Юлія Юріївна | Адвокат по пенсіях в Україні',
    });

    this.meta.updateTag({
      property: 'og:description',
      content:
        'Професійні адвокатські послуги з пенсійних питань. Оформлення пенсії без вашої присутності в ПФУ.',
    });

    this.meta.updateTag({
      property: 'og:type',
      content: 'website',
    });

    this.meta.updateTag({
      property: 'og:image',
      content:
        'https://www.advocate-pensia.com.ua/assets/main_photo_lower_size copy.webp',
    });
  }
}
