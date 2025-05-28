import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { GALLERY_CONFIG, GalleryConfig } from 'ng-gallery';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withViewTransitions()),
    provideAnimationsAsync(),
    {
      provide: GALLERY_CONFIG,
      useValue: {
        autoHeight: true,
        imageSize: 'cover',
      } as GalleryConfig,
    },
    provideHttpClient(),
  ],
};
