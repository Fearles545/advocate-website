import { Component, inject, OnInit } from '@angular/core';

import { Gallery, GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { Lightbox, LIGHTBOX_CONFIG, LightboxModule } from 'ng-gallery/lightbox';

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
  //TODO format images to .webp; create thumb images
  // images!: GalleryItem[];
  bachelorImages!: GalleryItem[];
  masterImages!: GalleryItem[];

  galleryId = 'myLightbox';
  // Set items array
  images = [
    new ImageItem({
      src: 'https://legaldesire.com/wp-content/uploads/2021/04/AdobeStock_205600667.jpeg',
      thumb:
        'https://legaldesire.com/wp-content/uploads/2021/04/AdobeStock_205600667.jpeg',
    }),
    new ImageItem({
      src: 'https://thenationaltriallawyers.org/wp-content/uploads/KRN9bQUaOmq_e50p21vq2A1XMV07Lb1RZpW6_vtzJRj6wr7fMF0B9j8CbYZLGcKSoLxfcweCMr2PgsE678GDOaQeLCxnXsVTKmR52BTncWtKTgpuY_yOQZQ6jbsaE2zJuizEHPJ3.jpeg',
      thumb:
        'https://legaldesire.com/wp-content/uploads/2021/04/AdobeStock_205600667.jpeg',
    }),
    new ImageItem({
      src: 'https://legaldesire.com/wp-content/uploads/2021/04/AdobeStock_205600667.jpeg',
      thumb:
        'https://legaldesire.com/wp-content/uploads/2021/04/AdobeStock_205600667.jpeg',
    }),
    new ImageItem({
      src: 'https://legaldesire.com/wp-content/uploads/2021/04/AdobeStock_205600667.jpeg',
      thumb:
        'https://legaldesire.com/wp-content/uploads/2021/04/AdobeStock_205600667.jpeg',
    }),
  ];

  gallery = inject(Gallery);
  lightbox = inject(Lightbox);

  ngOnInit() {
    this.bachelorImages = [
      new ImageItem({
        src: 'assets/documents/bachelor-diploma-1.jpg',
        thumb: 'assets/documents/bachelor-diploma-1.jpg',
      }),
      new ImageItem({
        src: '/assets/documents/bachelor-diploma-2.jpg',
        thumb: 'assets/documents/bachelor-diploma-2.jpg',
      }),
    ];
    // Load images into gallery
    const galleryRef = this.gallery
      .ref(this.galleryId, {
        thumbPosition: 'top',
        imageSize: 'cover',
        autoHeight: false,
      })
      .load(this.bachelorImages);
  }
}
