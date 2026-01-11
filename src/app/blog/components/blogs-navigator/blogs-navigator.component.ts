import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { Blog, blogs } from '../../blog-posts';
import { BlogCategorySlug } from '../../blog-categories';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blogs-navigator',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, RouterLink],
  template: `
    @let prev = previousBlog();
    @let next = nextBlog();

    <nav class="blog-nav" aria-label="Навігація між статтями">
      @if (prev) {
        <a
          [routerLink]="['/blog', prev.slug]"
          rel="prev"
          [title]="prev.title"
          class="nav-link nav-prev"
        >
          <span class="nav-icon">
            <mat-icon>arrow_back</mat-icon>
          </span>
          <span class="nav-text">
            <span class="nav-label">Попередня</span>
            <span class="nav-title">{{ prev.title }}</span>
          </span>
        </a>
      }

      @if (next) {
        <a
          [routerLink]="['/blog', next.slug]"
          [title]="next.title"
          class="nav-link nav-next"
          [class.full-width]="!prev"
        >
          <span class="nav-text">
            <span class="nav-label">Наступна</span>
            <span class="nav-title">{{ next.title }}</span>
          </span>
          <span class="nav-icon">
            <mat-icon>arrow_forward</mat-icon>
          </span>
        </a>
      }
    </nav>
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
      margin-top: 0;
    }

    .blog-nav {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 1.25rem;
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border-radius: var(--card-border-radius);
      border: 1px solid rgba(201, 165, 92, 0.2);
      text-decoration: none;
      transition: all 0.3s var(--ease-standard);
      overflow: hidden;

      /* Only apply hover effects on devices that support hover */
      @media (hover: hover) {
        &:hover {
          background: white;
          border-color: rgba(201, 165, 92, 0.4);
          box-shadow: 0 8px 24px rgba(0, 39, 6, 0.1);
          transform: translateY(-2px);

          .nav-icon {
            background: var(--color-gold);

            mat-icon {
              color: var(--color-green-darkest);
            }
          }

          .nav-title {
            color: var(--color-gold-accent);
          }
        }
      }

      /* Active state for touch feedback */
      &:active {
        transform: scale(0.98);

        .nav-icon {
          background: var(--color-gold);

          mat-icon {
            color: var(--color-green-darkest);
          }
        }
      }
    }

    .nav-prev {
      justify-content: flex-start;
    }

    .nav-next {
      justify-content: flex-end;
      text-align: right;
      grid-column: 2;

      &.full-width {
        grid-column: 1 / -1;
        justify-content: flex-end;
        max-width: 50%;
        margin-left: auto;
      }
    }

    .nav-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2.5rem;
      height: 2.5rem;
      min-width: 2.5rem;
      background: linear-gradient(
        135deg,
        var(--color-green) 0%,
        var(--color-green-dark) 100%
      );
      border-radius: 50%;

      mat-icon {
        font-size: 1.25rem;
        width: 1.25rem;
        height: 1.25rem;
        color: var(--color-gold);
        transition: color 0.3s ease;
      }
    }

    .nav-text {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      min-width: 0;
    }

    .nav-label {
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--color-gold);
    }

    .nav-title {
      font-size: 0.95rem;
      font-weight: 600;
      color: var(--color-green);
      line-height: 1.4;
      transition: color 0.3s ease;

      /* Text truncation */
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .blog-nav {
        grid-template-columns: 1fr;
        gap: 0.75rem;
      }

      .nav-link {
        padding: 0.875rem 1rem;
      }

      .nav-next {
        grid-column: 1;
        justify-content: flex-start;
        text-align: left;
        flex-direction: row-reverse;

        &.full-width {
          grid-column: 1;
          max-width: 100%;
          margin-left: 0;
        }
      }

      .nav-icon {
        width: 2.25rem;
        height: 2.25rem;
        min-width: 2.25rem;

        mat-icon {
          font-size: 1.1rem;
          width: 1.1rem;
          height: 1.1rem;
        }
      }

      .nav-title {
        font-size: 0.9rem;
        -webkit-line-clamp: 1;
      }
    }

    @media (max-width: 479px) {
      .nav-link {
        padding: 0.75rem;
        gap: 0.75rem;
      }

      .nav-icon {
        width: 2rem;
        height: 2rem;
        min-width: 2rem;

        mat-icon {
          font-size: 1rem;
          width: 1rem;
          height: 1rem;
        }
      }

      .nav-label {
        font-size: 0.7rem;
      }

      .nav-title {
        font-size: 0.85rem;
      }
    }
  `,
})
export class BlogsNavigatorComponent {
  currentBlog = input<Blog>();
  category = input<BlogCategorySlug | null>(null);

  private filteredBlogs = computed(() => {
    const cat = this.category();
    if (!cat) return blogs;
    return blogs.filter((b) => b.categories?.some((c) => c === cat));
  });

  previousBlog = computed(() => {
    if (!this.currentBlog()) {
      return null;
    }

    const blogList = this.filteredBlogs();
    const currentIndex = blogList.findIndex(
      (blog) => blog.slug === this.currentBlog()!.slug
    );

    if (currentIndex > 0) {
      return blogList[currentIndex - 1];
    }

    return null;
  });

  nextBlog = computed(() => {
    if (!this.currentBlog()) {
      return null;
    }

    const blogList = this.filteredBlogs();
    const currentIndex = blogList.findIndex(
      (blog) => blog.slug === this.currentBlog()!.slug
    );

    if (currentIndex < blogList.length - 1) {
      return blogList[currentIndex + 1];
    }

    return null;
  });
}
