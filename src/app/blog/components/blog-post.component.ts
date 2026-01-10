import { Component, computed, inject, input, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { finalize, map, of } from 'rxjs';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BlogIframeComponent } from './blog-iframe.component';
import { Blog } from '../blog-posts';
import { HttpClient } from '@angular/common/http';
import { AsyncPipe, DatePipe } from '@angular/common';
import { SpinnerComponent } from '@core/components/spinner/spinner.component';
import { DomSanitizer } from '@angular/platform-browser';
import { MatMenuModule } from '@angular/material/menu';
import { SocialShareComponent } from './social-share/social-share.component';
import { BlogsNavigatorComponent } from './blogs-navigator/blogs-navigator.component';
import { RelatedArticlesComponent } from './related-articles/related-articles.component';
import { BlogLinksComponent } from './blog-links/blog-links.component';
import { BlogFaqComponent } from './blog-faq/blog-faq.component';

@Component({
  selector: 'app-blog-post',
  imports: [
    AsyncPipe,
    DatePipe,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    BlogIframeComponent,
    SpinnerComponent,
    SocialShareComponent,
    BlogsNavigatorComponent,
    RelatedArticlesComponent,
    BlogLinksComponent,
    BlogFaqComponent,
  ],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.css',
})
export class BlogPostComponent {
  sanitizer = inject(DomSanitizer);
  route = inject(ActivatedRoute);
  http = inject(HttpClient);

  slug = input.required<string>();
  blog = input.required<Blog>();

  isLoading = signal(true);

  blogHtml = computed(() =>
    this.blog() ? this.getPost(this.blog()?.slug!) : of('')
  );

  footerCard = computed(() =>
    this.blog() ? this.getPost('footer-card') : of('')
  );

  getPost(slug: string) {
    return this.http
      .get(`posts/${slug}.html`, {
        responseType: 'text',
      })
      .pipe(
        map((html) => this.sanitizer.bypassSecurityTrustHtml(html)),
        finalize(() => this.isLoading.set(false))
      );
  }
}
