import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { Gallery, GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { LIGHTBOX_CONFIG, LightboxModule } from 'ng-gallery/lightbox';

import { CtaButtonComponent } from '../shared/components/cta-button';

@Component({
  selector: 'app-documents',
  imports: [
    RouterLink,
    MatIconModule,
    GalleryModule,
    LightboxModule,
    CtaButtonComponent,
  ],
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
  private gallery = inject(Gallery);

  showAllCertificates = signal(false);

  bachelorImages!: GalleryItem[];
  masterImages!: GalleryItem[];
  barImages!: GalleryItem[];
  qualificationImages!: GalleryItem[];

  bachelorImagesId = 'bachelorImages';
  masterImagesId = 'masterImages';
  barImagesId = 'barImages';
  qualificationImagesId = 'qualificationImages';

  ngOnInit(): void {
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
        src: 'assets/documents/qual-2025.webp',
        thumb: 'assets/documents/qual-2025.webp',
      }),
      new ImageItem({
        src: 'assets/documents/qual-2024.webp',
        thumb: 'assets/documents/qual-2024.webp',
      }),
      new ImageItem({
        src: 'assets/documents/qual-2023.webp',
        thumb: 'assets/documents/qual-2023.webp',
      }),
      new ImageItem({
        src: 'assets/documents/qual-2022.webp',
        thumb: 'assets/documents/qual-2022.webp',
      }),
      new ImageItem({
        src: 'assets/documents/qual-2021.webp',
        thumb: 'assets/documents/qual-2021.webp',
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

  toggleCertificates(): void {
    this.showAllCertificates.update((v) => !v);
  }
}
