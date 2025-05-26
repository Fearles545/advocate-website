import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { inject } from '@angular/core';
import { AsyncPipe, NgStyle } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

import { BreakpointObserver } from '@angular/cdk/layout';

import { filter, fromEvent, map, startWith } from 'rxjs';

import { MatSidenavModule } from '@angular/material/sidenav';

import { iconsData } from './core/icons.data';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DrawerContentComponent } from './drawer-content/drawer-content.component';

const breakpoints = {
  xs: '(max-width: 479px)',
  sm: '(max-width: 767px)',
  md: '(max-width: 1023px)',
  lg: '(max-width: 1279px)',
  xl: '(max-width: 1535px)',
  xxl: '(max-width: 1919px)',
};

const bgs: Record<string, string> = {
  main: '/assets/grey-marble-column-details-building.webp',
  'about-me': '/assets/library-bookshelves.webp',
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
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  iconsData = iconsData;
  phoneData = {
    link: 'tel:+380999426056',
    svg: '<path d="M3 5.5C3 14.0604 9.93959 21 18.5 21C18.8862 21 19.2691 20.9859 19.6483 20.9581C20.0834 20.9262 20.3009 20.9103 20.499 20.7963C20.663 20.7019 20.8185 20.5345 20.9007 20.364C21 20.1582 21 19.9181 21 19.438V16.6207C21 16.2169 21 16.015 20.9335 15.842C20.8749 15.6891 20.7795 15.553 20.6559 15.4456C20.516 15.324 20.3262 15.255 19.9468 15.117L16.74 13.9509C16.2985 13.7904 16.0777 13.7101 15.8683 13.7237C15.6836 13.7357 15.5059 13.7988 15.3549 13.9058C15.1837 14.0271 15.0629 14.2285 14.8212 14.6314L14 16C11.3501 14.7999 9.2019 12.6489 8 10L9.36863 9.17882C9.77145 8.93713 9.97286 8.81628 10.0942 8.64506C10.2012 8.49408 10.2643 8.31637 10.2763 8.1317C10.2899 7.92227 10.2096 7.70153 10.0491 7.26005L8.88299 4.05321C8.745 3.67376 8.67601 3.48403 8.55442 3.3441C8.44701 3.22049 8.31089 3.12515 8.15802 3.06645C7.98496 3 7.78308 3 7.37932 3H4.56201C4.08188 3 3.84181 3 3.63598 3.09925C3.4655 3.18146 3.29814 3.33701 3.2037 3.50103C3.08968 3.69907 3.07375 3.91662 3.04189 4.35173C3.01413 4.73086 3 5.11378 3 5.5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    alt: 'Phone',
    color: '#fff',
  };
  #router = inject(Router);

  customBreakpoints = breakpoints;
  currentScreenSize!: string;

  // breakpointObserver = inject(BreakpointObserver);

  // breakpointSubscription$ = this.breakpointObserver
  //   .observe(Object.values(this.customBreakpoints))
  //   .pipe(
  //     map((result) =>
  //       Object.entries(this.customBreakpoints).find(
  //         ([, query]) => result.breakpoints[query] || null
  //       )
  //     )
  //   );

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
    map((segments) => bgs[segments[0]])
  );
  // .subscribe(console.log);
}
