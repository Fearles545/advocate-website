import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { Blog, blogs } from '../../blog-posts';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { baseUrl } from '@core/config/base-url';
import { BlogBaseUrlPipe } from '../social-share/base-url.pipe';

@Component({
  selector: 'app-blogs-navigator',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, RouterLink],
  template: `
    @let prev = previousBlog();
    @let next = nextBlog();

    @if (prev) {
      <a
        [routerLink]="['/blog', prev.slug]"
        rel="prev"
        [title]="prev.title"
        [style.paddingRight]="'1rem'"
      >
        <mat-icon
          fontIcon="arrow_forward_ios"
          color="primary"
          style="rotate: 180deg"
        />
        <span> Попередній </span>
      </a>
    }

    @if (next) {
      <a
        [routerLink]="['/blog', next.slug]"
        [title]="next.title"
        [style.paddingLeft]="'1rem'"
        [style.marginLeft]="prev ? null : 'auto'"
      >
        <span> Наступний </span>
        <mat-icon color="primary" fontIcon="arrow_forward_ios" />
      </a>
    }
  `,
  styles: `
    :host {
      display: flex;
      justify-content: space-between;
      margin: 1rem 0 0;
      max-width: var(--blog-container-max-width);
      width: 100%;

      mat-icon {
        transition: background-color 0.3s;
      }

      a {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: var(--color-green);
        transition: color 0.3s;

        background-color: var(--color-container-bg);
        border: 1px solid var(--color-container-bg);
        padding: 0.5rem;
        border-radius: 2rem;
        overflow: hidden;
        font-size: 1rem;
      }

      a:hover,
      a:active {
        background-color: #0027060f;
      }
    }
  `,
})
export class BlogsNavigatorComponent {
  currentBlog = input<Blog>();

  baseUrl = baseUrl;
  blogs = blogs;

  previousBlog = computed(() => {
    if (!this.currentBlog()) {
      return null;
    }

    const currentIndex = this.blogs.findIndex(
      (blog) => blog.slug === this.currentBlog()!.slug
    );

    if (currentIndex > 0) {
      return this.blogs[currentIndex - 1];
    }

    return null;
  });

  nextBlog = computed(() => {
    if (!this.currentBlog()) {
      return null;
    }

    const currentIndex = this.blogs.findIndex(
      (blog) => blog.slug === this.currentBlog()!.slug
    );

    if (currentIndex < this.blogs.length - 1) {
      return this.blogs[currentIndex + 1];
    }

    return null;
  });
}
