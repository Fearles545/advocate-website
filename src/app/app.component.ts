import { Component, isDevMode } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { inject } from '@angular/core';
import { AsyncPipe, NgClass, NgStyle } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

import { filter, fromEvent, map, startWith } from 'rxjs';

import { MatSidenavModule } from '@angular/material/sidenav';

import { iconsData } from './core/icons.data';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DrawerContentComponent } from './drawer-content/drawer-content.component';

const bgs: Record<string, string> = {
  main: 'assets/grey-marble-column-details-building.webp',
  'about-me': 'assets/library-bookshelves.webp',
  services: 'assets/office-chair-still-life.webp',
  documents: 'assets/abstract-blur-defocused-bookshelf-library.webp',
};

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    RouterOutlet,
    FooterComponent,
    MatSidenavModule,
    DrawerContentComponent,
    AsyncPipe,
    NgStyle,
    NgClass,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  iconsData = iconsData;
  #router = inject(Router);
  isDevMode = isDevMode();

  isDesktop = toSignal(
    fromEvent(window, 'resize').pipe(
      startWith(0),
      map(() => ({
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
      }))
    )
  );

  navigatedItems$ = this.#router.events.pipe(
    startWith(new NavigationEnd(0, this.#router.url, this.#router.url)),
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    map(
      () =>
        this.#router
          .parseUrl(this.#router.url)
          .root.children['primary']?.segments.map((segment) => segment.path) ||
        []
    ),
    map((segments) => segments[0])
    // map((segments) => `url(${bgs[segments[0]]})`)
  );
}
