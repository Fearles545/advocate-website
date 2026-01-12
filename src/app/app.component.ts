import {
  Component,
  isDevMode,
  inject,
  afterNextRender,
  viewChild,
  ElementRef,
  DestroyRef,
  PLATFORM_ID,
} from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { AsyncPipe, isPlatformBrowser, ViewportScroller } from '@angular/common';

import { filter, map, startWith } from 'rxjs';

import { MatSidenavModule } from '@angular/material/sidenav';

import { iconsData } from './core/icons.data';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DrawerContentComponent } from './drawer-content/drawer-content.component';
import { RouteSeoService } from './core/services/route-seo.service';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';
import { BreadcrumbComponent } from './core/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    RouterOutlet,
    FooterComponent,
    MatSidenavModule,
    DrawerContentComponent,
    AsyncPipe,
    ScrollToTopComponent,
    BreadcrumbComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  iconsData = iconsData;
  #router = inject(Router);
  #destroyRef = inject(DestroyRef);
  #viewportScroller = inject(ViewportScroller);
  #platformId = inject(PLATFORM_ID);
  isDevMode = isDevMode();
  private routeSeoService = inject(RouteSeoService);
  private headerEl = viewChild('headerEl', { read: ElementRef });

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
    this.#initHeaderHeightObserver();
    this.#removeLoader();
  }

  #removeLoader(): void {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.#platformId)) return;

      // Wait for fonts to be ready before removing loader
      if (document.fonts?.ready) {
        document.fonts.ready.then(() => this.#fadeOutLoader());
      } else {
        // Fallback for older browsers
        setTimeout(() => this.#fadeOutLoader(), 100);
      }
    });
  }

  #fadeOutLoader(): void {
    const loader = document.getElementById('app-loader');
    if (!loader) return;

    loader.classList.add('fade-out');
    setTimeout(() => loader.remove(), 600);
  }

  #initHeaderHeightObserver(): void {
    afterNextRender(() => {
      const headerElement = this.headerEl()?.nativeElement;
      if (!headerElement) return;

      // Set initial height immediately to avoid layout shift
      const initialHeight = headerElement.getBoundingClientRect().height;
      if (initialHeight > 0) {
        document.documentElement.style.setProperty(
          '--header-height',
          `${initialHeight}px`
        );
        this.#viewportScroller.setOffset([0, initialHeight + 16]);
      }

      // Continue observing for changes (e.g., window resize)
      const resizeObserver = new ResizeObserver((entries) => {
        const height = entries[0].borderBoxSize[0].blockSize;
        document.documentElement.style.setProperty(
          '--header-height',
          `${height}px`
        );
        this.#viewportScroller.setOffset([0, height + 16]);
      });

      resizeObserver.observe(headerElement);

      this.#destroyRef.onDestroy(() => resizeObserver.disconnect());
    });
  }
}
