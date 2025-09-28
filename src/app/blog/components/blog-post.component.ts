import { Component, computed, inject, input, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { finalize, map, of } from 'rxjs';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BlogIframeComponent } from './blog-iframe.component';
import { blogs } from '../blog-posts';
import { HttpClient } from '@angular/common/http';
import { AsyncPipe, DatePipe } from '@angular/common';
import { SpinnerComponent } from '@core/components/spinner/spinner.component';
import { DomSanitizer } from '@angular/platform-browser';
import { MatMenuModule } from '@angular/material/menu';
import { SocialShareComponent } from './social-share/social-share.component';

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
  ],
  template: `
    @if (blog()) {
      <section class="blog-post-container">
        <header class="header-container">
          <a
            class="back-link"
            mat-button
            color="primary"
            [routerLink]="['/blog']"
            aria-label="Назад до блогу"
          >
            Блог
            <mat-icon>arrow_back_ios_new</mat-icon>
          </a>
          <h1 class="main-title">
            {{ blog()!.title }}
          </h1>

          <div class="subtitle">
            @let formattedDate = blog()!.date | date: 'dd-MM-yyyy';

            <time [attr.datetime]="formattedDate">{{ formattedDate }}</time>

            <app-social-share [blog]="blog()!" />
          </div>
        </header>

        <app-blog-iframe [src]="blog()!.src" [title]="blog()!.title" />

        <section
          class="blog-post-section"
          style="
            font-size: 1.25rem;
            font-weight: 500;
            line-height: 1.25;
            margin: 0;"
          [innerHTML]="blogHtml() | async"
        ></section>
      </section>
    }

    <app-spinner [show]="isLoading()" />
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      margin: 0 auto;
      padding: 1rem 1rem 2rem;
      width: var(--container-max-width);
      max-width: var(--container-max-width);
      border-left: 1px solid var(--color-green);
      border-right: 1px solid var(--color-green);
      background-color: var(--color-container-bg);
    }

    h1.main-title {
      text-align: center;
      margin: 0;
    }

    .subtitle {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 1rem;
      color: grey;
      margin: 1rem 0 -1rem;
    }

    .header-container {
      position: relative;
    }

    app-blog-iframe {
      display: block;
      width: 100%;
    }

    .blog-post-container {
      width: 950px;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    @media (max-width: 950px) {
      .blog-post-container {
        width: fit-content;
      }
    }

    @media (max-width: 479px) {
      :host {
        padding: 1rem 1rem 2rem;
      }

      .back-link {
      }
    }
  `,
})
export class BlogPostComponent {
  sanitizer = inject(DomSanitizer);
  route = inject(ActivatedRoute);
  http = inject(HttpClient);
  blogs = blogs;

  slug = input.required<string>();

  isLoading = signal(true);
  blog = computed(() => this.blogs.find((blog) => blog.slug === this.slug()));
  // blog = toSignal(
  //   this.route.params.pipe(
  //     map((params) => params['slug']),
  //     map((slug) => this.blogs.find((blog) => blog.slug === slug))
  //   )
  // );

  blogHtml = computed(() =>
    this.blog() ? this.getPost(this.blog()?.slug!) : of('')
  );

  getPost(slug: string) {
    // this.isLoading.set(true);

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
