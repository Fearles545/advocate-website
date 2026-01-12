import {
  ApplicationConfig,
  LOCALE_ID,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { registerLocaleData } from '@angular/common';
import localeUk from '@angular/common/locales/uk';

import { GALLERY_CONFIG, GalleryConfig } from 'ng-gallery';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';

// Register Ukrainian locale
registerLocaleData(localeUk);

export const appConfig: ApplicationConfig = {
  providers: [
    // Note: provideClientHydration() removed due to conflicts with custom SVG icons
    // registered via MatIconRegistry. The branded loader provides smooth UX instead.
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withViewTransitions(),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled',
      }),
      withComponentInputBinding()
    ),
    provideAnimationsAsync(),
    {
      provide: GALLERY_CONFIG,
      useValue: {
        autoHeight: true,
        imageSize: 'cover',
      } as GalleryConfig,
    },
    provideHttpClient(withFetch()),
    { provide: LOCALE_ID, useValue: 'uk' },
  ],
};
