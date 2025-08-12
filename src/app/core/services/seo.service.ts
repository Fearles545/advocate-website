import { Inject, Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

export interface PageSEO {
  title: string;
  description: string;
  keywords?: string;
  image?: string; // For og:image
  type?: string; // For og:type
  canonical?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private meta = inject(Meta);
  private titleService = inject(Title);
  // Inject DOCUMENT in a platform-safe way for SSG/SSR
  private document = inject(DOCUMENT);
  private readonly siteUrl = 'https://www.advocate-pensia.com.ua';

  updatePageSEO(seo: PageSEO): void {
    const url = seo.canonical
      ? `${this.siteUrl}${seo.canonical}`
      : this.document.location.href;

    // Update title
    this.titleService.setTitle(seo.title);

    // Update meta tags
    this.meta.updateTag({ name: 'description', content: seo.description });
    if (seo.keywords) {
      this.meta.updateTag({ name: 'keywords', content: seo.keywords });
    } else {
      this.meta.removeTag("name='keywords'");
    }

    // Update Open Graph tags
    this.meta.updateTag({ property: 'og:title', content: seo.title });
    this.meta.updateTag({
      property: 'og:description',
      content: seo.description,
    });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({
      property: 'og:type',
      content: seo.type || 'website',
    });

    // if (seo.image) {
    //   this.meta.updateTag({
    //     property: 'og:image',
    //     content: `${this.siteUrl}${seo.image}`,
    //   });
    // } else {
    // It's good practice to have a default fallback image
    this.meta.updateTag({
      property: 'og:image',
      content: `${this.siteUrl}/assets/images/og/default-og-image.webp`,
    });
    // }

    // Update canonical URL
    this.updateCanonical(url);
  }

  private updateCanonical(url: string): void {
    // This approach is safer for server-side rendering
    let link: HTMLLinkElement | null = this.document.querySelector(
      "link[rel='canonical']"
    );

    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
