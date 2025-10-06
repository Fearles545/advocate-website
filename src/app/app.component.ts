import { Component, isDevMode } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { filter, map, startWith } from 'rxjs';

import { MatSidenavModule } from '@angular/material/sidenav';

import { iconsData } from './core/icons.data';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DrawerContentComponent } from './drawer-content/drawer-content.component';
import { RouteSeoService } from './core/services/route-seo.service';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    RouterOutlet,
    FooterComponent,
    MatSidenavModule,
    DrawerContentComponent,
    AsyncPipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  iconsData = iconsData;
  #router = inject(Router);
  isDevMode = isDevMode();
  private routeSeoService = inject(RouteSeoService);

  navigatedItems$ = this.#router.events.pipe(
    startWith(new NavigationEnd(0, this.#router.url, this.#router.url)),
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    map(
      () =>
        this.#router
          .parseUrl(this.#router.url)
          .root.children[
            'primary'
          ]?.segments.map((segment) => segment.path) || ['main']
    ),
    map((segments) => segments[0] || 'main')
  );

  constructor() {
    this.routeSeoService.init();
  }
}
