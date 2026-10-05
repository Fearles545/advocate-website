import { Component, computed, inject, input, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { finalize, map, of } from 'rxjs';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BlogIframeComponent } from './blog-iframe.component';
import { Blog, blogs } from '../blog-posts';
import { HttpClient } from '@angular/common/http';
import { AsyncPipe, DatePipe } from '@angular/common';
import { SpinnerComponent } from '@core/components/spinner/spinner.component';
import { DomSanitizer } from '@angular/platform-browser';
import { MatMenuModule } from '@angular/material/menu';
import { SocialShareComponent } from './social-share/social-share.component';
import { RelatedArticlesComponent } from './related-articles/related-articles.component';
import { BlogLinksComponent } from './blog-links/blog-links.component';
import { BlogFaqComponent } from './blog-faq/blog-faq.component';
import {
  BlogCategorySlug,
  getCategoryDisplayLabel,
} from '../blog-categories';
import { BlogPaginationService } from '../services/blog-pagination.service';
import {
  PrevNextItem,
  PrevNextNavigatorComponent,
} from '@shared/components/prev-next-navigator';

@Component({
  selector: 'app-blog-post',
  imports: [
    AsyncPipe,
    DatePipe,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    BlogIframeComponent,
    SpinnerComponent,
    SocialShareComponent,
    PrevNextNavigatorComponent,
    RelatedArticlesComponent,
    BlogLinksComponent,
    BlogFaqComponent,
  ],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.css',
})
export class BlogPostComponent {
  private sanitizer = inject(DomSanitizer);
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private blogPaginationService = inject(BlogPaginationService);

  slug = input.required<string>();
  blog = input.required<Blog>();

  isLoading = signal(true);
  activeCategory = computed(() => this.blogPaginationService.selectedCategory());

  private navigableBlogs = computed(() => {
    const category = this.activeCategory();
    if (!category) return blogs;
    return blogs.filter((b) => b.categories?.some((c) => c === category));
  });

  previousArticle = computed(() => {
    const list = this.navigableBlogs();
    const index = list.findIndex((blog) => blog.slug === this.blog().slug);
    return index > 0 ? toPrevNextItem(list[index - 1]) : null;
  });

  nextArticle = computed(() => {
    const list = this.navigableBlogs();
    const index = list.findIndex((blog) => blog.slug === this.blog().slug);
    return index < list.length - 1 ? toPrevNextItem(list[index + 1]) : null;
  });

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

  getCategoryLabel(slug: BlogCategorySlug): string {
    return getCategoryDisplayLabel(slug);
  }
}

function toPrevNextItem(blog: Blog): PrevNextItem {
  return { link: ['/blog', blog.slug], title: blog.title };
}
