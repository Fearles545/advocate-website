import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

import { finalize, map, of } from 'rxjs';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BlogIframeComponent } from './blog-iframe.component';
import { blogs } from '../blog-posts';
import { HttpClient } from '@angular/common/http';
import { AsyncPipe, DatePipe } from '@angular/common';
import { SpinnerComponent } from '@core/components/spinner/spinner.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-post',
  imports: [
    BlogIframeComponent,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    AsyncPipe,
    SpinnerComponent,
    DatePipe,
  ],
  template: `
    <app-spinner [show]="isLoading()" />

    @if (blog()) {
      <section class="blog-post-container">
        <header class="header-container">
          <a
            class="back-link"
            mat-icon-button
            color="primary"
            [routerLink]="['/blog']"
            aria-label="Back to Blog"
          >
            <mat-icon>arrow_back_ios_new</mat-icon>
          </a>

          <h1 class="main-title">{{ blog()!.title }}</h1>

          <h2 class="subtitle-date">
            @let formattedDate = blog()!.date | date: 'dd-MM-yyyy';

            <time [attr.datetime]="formattedDate">{{ formattedDate }}</time>
          </h2>
        </header>

        <section
          style="
            font-size: 1.25rem;
            font-weight: 500;
            line-height: 1.25;
            margin: 0;"
          [innerHTML]="blogHtml() | async"
        ></section>
        <!-- <p>{{ blog()!.description }}</p> -->

        <app-blog-iframe [src]="blog()!.src" [title]="blog()!.title" />
      </section>
    }
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      margin: 0 auto;
      padding: 1rem;
      width: var(--container-max-width);
      max-width: var(--container-max-width);

      border-left: 1px solid var(--color-green);
      border-right: 1px solid var(--color-green);
      background-color: var(--color-container-bg);
      // background-image:
      //   radial-gradient(circle 600px at 0% 200px, #bfdbfe, transparent),
      //   radial-gradient(circle 600px at 100% 200px, #bfdbfe, transparent);
      // background-image:
      //   repeating-linear-gradient(
      //     22.5deg,
      //     transparent,
      //     transparent 2px,
      //     rgba(75, 85, 99, 0.06) 2px,
      //     rgba(75, 85, 99, 0.06) 3px,
      //     transparent 3px,
      //     transparent 8px
      //   ),
      //   repeating-linear-gradient(
      //     67.5deg,
      //     transparent,
      //     transparent 2px,
      //     rgba(107, 114, 128, 0.05) 2px,
      //     rgba(107, 114, 128, 0.05) 3px,
      //     transparent 3px,
      //     transparent 8px
      //   ),
      //   repeating-linear-gradient(
      //     112.5deg,
      //     transparent,
      //     transparent 2px,
      //     rgba(55, 65, 81, 0.04) 2px,
      //     rgba(55, 65, 81, 0.04) 3px,
      //     transparent 3px,
      //     transparent 8px
      //   ),
      //   repeating-linear-gradient(
      //     157.5deg,
      //     transparent,
      //     transparent 2px,
      //     rgba(31, 41, 55, 0.03) 2px,
      //     rgba(31, 41, 55, 0.03) 3px,
      //     transparent 3px,
      //     transparent 8px
      //   );
    }

    h1.main-title {
      text-align: center;
      margin: 0;
    }

    h2.subtitle-date {
      font-size: 1rem;
      text-align: right;
      color: grey;
    }

    .back-link {
      position: absolute;
      transform: translateY(50%);
      left: 0;
    }

    .header-container {
      position: relative;
    }

    app-blog-iframe {
      display: block;
      width: fit-content;
      margin: 2rem auto;
    }

    .blog-post-container {
      width: 950px;
    }

    @media (max-width: 479px) {
      :host {
        padding: 1rem;
      }

      .back-link {
        display: none;
      }
    }
  `,
})
export class BlogPostComponent {
  sanitizer = inject(DomSanitizer);
  route = inject(ActivatedRoute);
  http = inject(HttpClient);
  blogs = blogs;

  isLoading = signal(true);
  blog = toSignal(
    this.route.params.pipe(
      map((params) => params['slug']),
      map((slug) => this.blogs.find((blog) => blog.slug === slug))
    )
  );

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
