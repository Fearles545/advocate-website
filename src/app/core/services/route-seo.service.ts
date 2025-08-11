import { Injectable, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';
import { SeoService } from './seo.service';

@Injectable({
  providedIn: 'root',
})
export class RouteSeoService {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private seoService = inject(SeoService);

  /**
   * Initializes the service to listen for route changes and update SEO tags.
   * This method should be called once, typically in the root AppComponent.
   * This is an implementation of the "Observer" pattern, where we react to
   * router events as they are emitted.
   */
  init() {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        ),
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        switchMap((route) => route.data),
        map((data) => data['seo'])
      )
      .subscribe((seoData) => {
        if (seoData) {
          this.seoService.updatePageSEO(seoData);
        }
      });
  }
}
