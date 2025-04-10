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
  barImages!: GalleryItem[];

  bachelorImagesId = 'bachelorImages';
  masterImagesId = 'masterImages';
  barImagesId = 'barImages';
  // Set items array

  gallery = inject(Gallery);
  lightbox = inject(Lightbox);

  ngOnInit() {
    this.bachelorImages = [
      new ImageItem({
        src: 'assets/documents/bachelor-diploma-1.webp',
        thumb: 'assets/documents/bachelor-diploma-1-thumb.webp',
      }),
      new ImageItem({
        src: '/assets/documents/bachelor-diploma-2.webp',
        thumb: 'assets/documents/bachelor-diploma-2-thumb.webp',
      }),
    ];

    this.masterImages = [
      new ImageItem({
        src: 'assets/documents/master-diploma-1.webp',
        thumb: 'assets/documents/master-diploma-1-thumb.webp',
      }),
      new ImageItem({
        src: '/assets/documents/master-diploma-2.webp',
        thumb: 'assets/documents/master-diploma-2-thumb.webp',
      }),
    ];

    this.barImages = [
      new ImageItem({
        src: 'assets/documents/lawyer-license-1.webp',
        thumb: 'assets/documents/lawyer-license-1-thumb.webp',
      }),
      new ImageItem({
        src: '/assets/documents/lawyer-license-2.webp',
        thumb: 'assets/documents/lawyer-license-2-thumb.webp',
      }),
    ];
    // Load images into gallery
    // const bachelorGalleryRef =
    this.gallery
      .ref(this.bachelorImagesId, {
        thumbPosition: 'top',
        imageSize: 'cover',
        autoHeight: false,
      })
      .load(this.bachelorImages);

    // const masterGalleryRef =
    this.gallery
      .ref(this.masterImagesId, {
        thumbPosition: 'top',
        imageSize: 'cover',
        autoHeight: false,
      })
      .load(this.masterImages);

    this.gallery
      .ref(this.barImagesId, {
        thumbPosition: 'top',
        imageSize: 'cover',
        autoHeight: false,
      })
      .load(this.barImages);
  }
}
