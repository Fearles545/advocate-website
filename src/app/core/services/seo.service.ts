import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { baseUrl } from '@core/config/base-url';
import { DEFAULT_SEO_CONFIG, GLOBAL_SEO_CONFIG } from '@core/config/seo.config';

export interface PageSEO {
  title: string;
  description: string;
  keywords?: string;
  image?: string; // For og:image
  type?: string; // For og:type
  canonical?: string;
  robots?: string; // e.g., "index,follow" or "noindex,nofollow"
  publishedTime?: string; // ISO string for article:published_time
  modifiedTime?: string; // ISO string for article:modified_time
  schema?: Record<string, any>; // JSON-LD object
}

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private meta = inject(Meta);
  private titleService = inject(Title);
  // Inject DOCUMENT in a platform-safe way for SSG/SSR
  private document = inject(DOCUMENT);
  private readonly siteUrl = baseUrl;

  updatePageSEO(route: keyof typeof GLOBAL_SEO_CONFIG): void {
    let seo = GLOBAL_SEO_CONFIG[route];

    if (!seo) {
      seo = DEFAULT_SEO_CONFIG;
    }

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

    if (seo.publishedTime) {
      this.meta.updateTag({
        property: 'article:published_time',
        content: seo.publishedTime,
      });
    }
    if (seo.modifiedTime) {
      this.meta.updateTag({
        property: 'article:modified_time',
        content: seo.modifiedTime,
      });
    }

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

    // Robots
    this.meta.updateTag({
      name: 'robots',
      content: seo.robots || 'index,follow',
    });

    this.upsertJsonLd(seo.schema);

    // Update canonical URL
    this.updateCanonical(url);
  }

  private upsertJsonLd(schema?: Record<string, any>): void {
    // Manage a single JSON-LD script we control via id
    const scriptId = 'app-jsonld';
    const existing = this.document.getElementById(scriptId);

    if (!schema) {
      if (existing) existing.remove();
      return;
    }

    const json = JSON.stringify(schema);
    if (existing) {
      existing.textContent = json;
      return;
    }

    const script = this.document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.setAttribute('id', scriptId);
    script.textContent = json;
    this.document.head.appendChild(script);
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
