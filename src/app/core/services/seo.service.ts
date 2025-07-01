import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface PageSEO {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private meta = inject(Meta);
  private titleService = inject(Title);

  updatePageSEO(seo: PageSEO): void {
    // Update title
    this.titleService.setTitle(seo.title);

    // Update meta tags
    this.meta.updateTag({ name: 'description', content: seo.description });
    if (seo.keywords) {
      this.meta.updateTag({ name: 'keywords', content: seo.keywords });
    }

    // Update Open Graph tags
    this.meta.updateTag({ property: 'og:title', content: seo.title });
    this.meta.updateTag({
      property: 'og:description',
      content: seo.description,
    });
    this.meta.updateTag({
      property: 'og:url',
      content: seo.canonical || window.location.href,
    });

    // Update canonical URL
    this.updateCanonical(seo.canonical || window.location.href);
  }

  private updateCanonical(url: string): void {
    let link = document.querySelector(
      "link[rel='canonical']"
    ) as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
