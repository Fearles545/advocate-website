import { Component, inject, OnInit } from '@angular/core';

import { Gallery, GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { Lightbox, LIGHTBOX_CONFIG, LightboxModule } from 'ng-gallery/lightbox';
import { SeoService } from '../core/services/seo.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-documents',
  imports: [GalleryModule, LightboxModule],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css',
  providers: [
    {
      provide: LIGHTBOX_CONFIG,
      useValue: {
        keyboardShortcuts: false,
      },
    },
  ],
})
export class DocumentsComponent implements OnInit {
  // private seoService = inject(SeoService);
  private meta = inject(Meta);
  private title = inject(Title);

  bachelorImages!: GalleryItem[];
  masterImages!: GalleryItem[];
  barImages!: GalleryItem[];
  qualificationImages!: GalleryItem[];

  bachelorImagesId = 'bachelorImages';
  masterImagesId = 'masterImages';
  barImagesId = 'barImages';
  qualificationImagesId = 'qualificationImages';

  gallery = inject(Gallery);
  lightbox = inject(Lightbox);

  setSeo() {
    this.title.setTitle('Документи | Адвокат Поддяча Юлія Юріївна');

    this.meta.updateTag({
      name: 'description',
      content:
        'Документи та сертифікати адвоката Поддяча Юлії Юріївни. Ліцензії, дипломи, посвідчення про кваліфікацію.',
    });

    this.meta.updateTag({
      property: 'og:title',
      content: 'Документи | Адвокат Поддяча Юлія Юріївна',
    });

    this.meta.updateTag({
      property: 'og:description',
      content:
        'Документи та сертифікати адвоката. Ліцензії, дипломи, посвідчення про кваліфікацію.',
    });
  }

  ngOnInit() {
    this.setSeo();

    this.bachelorImages = [
      new ImageItem({
        src: 'assets/documents/bachelor-diploma-1.webp',
        thumb: 'assets/documents/bachelor-diploma-1-thumb.webp',
      }),
      new ImageItem({
        src: 'assets/documents/bachelor-diploma-2.webp',
        thumb: 'assets/documents/bachelor-diploma-2-thumb.webp',
      }),
    ];

    this.masterImages = [
      new ImageItem({
        src: 'assets/documents/master-diploma-1.webp',
        thumb: 'assets/documents/master-diploma-1-thumb.webp',
      }),
      new ImageItem({
        src: 'assets/documents/master-diploma-2.webp',
        thumb: 'assets/documents/master-diploma-2-thumb.webp',
      }),
    ];

    this.barImages = [
      new ImageItem({
        src: 'assets/documents/lawyer-license-1.webp',
        thumb: 'assets/documents/lawyer-license-1-thumb.webp',
      }),
      new ImageItem({
        src: 'assets/documents/lawyer-license-2.webp',
        thumb: 'assets/documents/lawyer-license-2-thumb.webp',
      }),
    ];

    this.qualificationImages = [
      new ImageItem({
        src: 'assets/documents/qual-2021.webp',
        thumb: 'assets/documents/qual-2021.webp',
      }),
      new ImageItem({
        src: 'assets/documents/qual-2022.webp',
        thumb: 'assets/documents/qual-2022.webp',
      }),
      new ImageItem({
        src: 'assets/documents/qual-2023.webp',
        thumb: 'assets/documents/qual-2023.webp',
      }),
      new ImageItem({
        src: 'assets/documents/qual-2024.webp',
        thumb: 'assets/documents/qual-2024.webp',
      }),
      new ImageItem({
        src: 'assets/documents/qual-2025.webp',
        thumb: 'assets/documents/qual-2025.webp',
      }),
    ];

    this.gallery
      .ref(this.bachelorImagesId, {
        thumbPosition: 'top',
        imageSize: 'cover',
        autoHeight: true,
      })
      .load(this.bachelorImages);

    this.gallery
      .ref(this.masterImagesId, {
        thumbPosition: 'top',
        imageSize: 'cover',
        autoHeight: true,
      })
      .load(this.masterImages);

    this.gallery
      .ref(this.barImagesId, {
        thumbPosition: 'top',
        imageSize: 'cover',
        autoHeight: true,
      })
      .load(this.barImages);

    this.gallery
      .ref(this.qualificationImagesId, {
        thumbPosition: 'top',
        imageSize: 'cover',
        autoHeight: true,
      })
      .load(this.qualificationImages);
  }
}
