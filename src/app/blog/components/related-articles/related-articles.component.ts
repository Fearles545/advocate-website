import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { Blog, blogs } from '../../blog-posts';
import {
  BlogCategorySlug,
  getCategoryBySlug,
  getCategoryDisplayLabel,
} from '../../blog-categories';

@Component({
  selector: 'app-related-articles',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatIconModule, DatePipe],
  template: `
    @if (relatedPosts().length > 0) {
      <aside class="related-articles">
        <header class="related-header">
          <div class="header-icon">
            <mat-icon>{{ headerIcon() }}</mat-icon>
          </div>
          <div class="header-text">
            <h2>{{ headerTitle() }}</h2>
            <p>{{ headerSubtitle() }}</p>
          </div>
        </header>

        <div class="related-grid">
          @for (post of relatedPosts(); track post.slug) {
            <a [routerLink]="['/blog', post.slug]" class="related-card">
              <div class="card-icon">
                <mat-icon>{{
                  post.src[0] ? 'play_circle' : 'description'
                }}</mat-icon>
              </div>
              <div class="card-content">
                <h3>{{ post.title }}</h3>
                @if (post.description) {
                  <p class="card-description">{{ post.description }}</p>
                }
                <time [attr.datetime]="post.date">
                  <mat-icon>calendar_today</mat-icon>
                  {{ post.date | date: 'dd.MM.yyyy' }}
                </time>
              </div>
              <div class="card-arrow">
                <mat-icon>arrow_forward</mat-icon>
              </div>
            </a>
          }
        </div>
      </aside>
    }
  `,
  styles: `
    .related-articles {
      margin: 2.5rem 0;
      padding: 2rem;
      background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.95) 0%,
        rgba(201, 165, 92, 0.08) 100%
      );
      border-radius: var(--card-border-radius);
      border: 1px solid rgba(201, 165, 92, 0.2);
    }

    .related-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid rgba(201, 165, 92, 0.15);
    }

    .header-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 3rem;
      height: 3rem;
      background: linear-gradient(
        135deg,
        var(--color-green) 0%,
        var(--color-green-dark) 100%
      );
      border-radius: 50%;
      flex-shrink: 0;

      mat-icon {
        font-size: 1.5rem;
        width: 1.5rem;
        height: 1.5rem;
        color: var(--color-gold);
      }
    }

    .header-text {
      h2 {
        margin: 0;
        font-size: 1.25rem;
        font-weight: 700;
        color: var(--color-green);
        line-height: 1.3;
      }

      p {
        margin: 0.25rem 0 0;
        font-size: 0.875rem;
        color: var(--color-text-secondary);
      }
    }

    .related-grid {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .related-card {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 1.25rem;
      background: white;
      border-radius: 0.75rem;
      border: 1px solid rgba(201, 165, 92, 0.15);
      text-decoration: none;
      transition: all 0.25s var(--ease-standard);

      &:hover {
        border-color: rgba(201, 165, 92, 0.4);
        box-shadow: 0 6px 20px rgba(0, 39, 6, 0.08);
        transform: translateX(4px);

        .card-icon {
          background: var(--color-gold);

          mat-icon {
            color: var(--color-green-darkest);
          }
        }

        .card-arrow mat-icon {
          transform: translateX(4px);
          color: var(--color-gold);
        }

        h3 {
          color: var(--color-gold-accent);
        }
      }
    }

    .card-icon {
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
        transition: color 0.25s ease;
      }
    }

    .card-content {
      flex: 1;
      min-width: 0;

      h3 {
        margin: 0;
        font-size: 0.95rem;
        font-weight: 600;
        color: var(--color-green);
        line-height: 1.4;
        transition: color 0.25s ease;

        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .card-description {
        margin: 0.375rem 0 0;
        font-size: 0.8rem;
        color: var(--color-text-secondary);
        line-height: 1.4;

        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      time {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        margin-top: 0.5rem;
        font-size: 0.75rem;
        color: var(--color-gold);
        font-weight: 500;

        mat-icon {
          font-size: 0.875rem;
          width: 0.875rem;
          height: 0.875rem;
        }
      }
    }

    .card-arrow {
      display: flex;
      align-items: center;
      flex-shrink: 0;

      mat-icon {
        font-size: 1.25rem;
        width: 1.25rem;
        height: 1.25rem;
        color: var(--color-green);
        opacity: 0.5;
        transition: all 0.25s ease;
      }
    }

    /* Responsive */
    @media (max-width: 768px) {
      .related-articles {
        margin: 2rem 0;
        padding: 1.5rem;
      }

      .related-header {
        gap: 0.875rem;
        margin-bottom: 1.25rem;
        padding-bottom: 0.875rem;
      }

      .header-icon {
        width: 2.5rem;
        height: 2.5rem;

        mat-icon {
          font-size: 1.25rem;
          width: 1.25rem;
          height: 1.25rem;
        }
      }

      .header-text {
        h2 {
          font-size: 1.1rem;
        }

        p {
          font-size: 0.8rem;
        }
      }

      .related-card {
        padding: 0.875rem 1rem;
        gap: 0.875rem;
      }

      .card-icon {
        width: 2.25rem;
        height: 2.25rem;
        min-width: 2.25rem;

        mat-icon {
          font-size: 1.1rem;
          width: 1.1rem;
          height: 1.1rem;
        }
      }

      .card-content {
        h3 {
          font-size: 0.9rem;
        }

        .card-description {
          display: none;
        }
      }
    }

    @media (max-width: 479px) {
      .related-articles {
        margin: 1.5rem 0;
        padding: 1rem;
      }

      .related-header {
        gap: 0.75rem;
      }

      .header-icon {
        width: 2.25rem;
        height: 2.25rem;

        mat-icon {
          font-size: 1.1rem;
          width: 1.1rem;
          height: 1.1rem;
        }
      }

      .header-text h2 {
        font-size: 1rem;
      }

      .related-card {
        padding: 0.75rem;
      }

      .card-icon {
        width: 2rem;
        height: 2rem;
        min-width: 2rem;

        mat-icon {
          font-size: 1rem;
          width: 1rem;
          height: 1rem;
        }
      }

      .card-content {
        h3 {
          font-size: 0.85rem;
          -webkit-line-clamp: 2;
        }

        time {
          font-size: 0.7rem;
        }
      }

      .card-arrow {
        display: none;
      }
    }
  `,
})
export class RelatedArticlesComponent {
  currentBlog = input.required<Blog>();

  private readonly allBlogs = blogs;
  private readonly MAX_RELATED = 3;
  private readonly MIN_CATEGORY_POSTS = 3;

  readonly primaryCategory = computed((): BlogCategorySlug | null => {
    const categories = this.currentBlog().categories;
    return categories?.[0] ?? null;
  });

  readonly relatedPosts = computed(() => {
    const current = this.currentBlog();
    const categories = current.categories;

    if (!categories?.length) {
      return this.getRecentPosts(current.slug);
    }

    const primaryCategory = categories[0];
    let related = this.getPostsByCategory(primaryCategory, current.slug);

    if (related.length < this.MIN_CATEGORY_POSTS) {
      for (const cat of categories.slice(1)) {
        const additional = this.getPostsByCategory(cat, current.slug);
        const newPosts = additional.filter(
          (p) => !related.some((r) => r.slug === p.slug)
        );
        related = [...related, ...newPosts];
        if (related.length >= this.MAX_RELATED) break;
      }
    }

    if (related.length < this.MIN_CATEGORY_POSTS) {
      const recent = this.getRecentPosts(current.slug);
      const newPosts = recent.filter(
        (p) => !related.some((r) => r.slug === p.slug)
      );
      related = [...related, ...newPosts];
    }

    return related.slice(0, this.MAX_RELATED);
  });

  readonly headerIcon = computed(() => {
    const cat = this.primaryCategory();
    if (cat) {
      const category = getCategoryBySlug(cat);
      return category?.icon ?? 'auto_stories';
    }
    return 'auto_stories';
  });

  readonly headerTitle = computed(() => {
    const cat = this.primaryCategory();
    if (cat && this.hasCategoryPosts()) {
      return 'Схожі статті';
    }
    return 'Останні статті';
  });

  readonly headerSubtitle = computed(() => {
    const cat = this.primaryCategory();
    if (cat && this.hasCategoryPosts()) {
      return getCategoryDisplayLabel(cat);
    }
    return 'Дивіться також';
  });

  private hasCategoryPosts(): boolean {
    const current = this.currentBlog();
    const cat = this.primaryCategory();
    if (!cat) return false;
    return this.getPostsByCategory(cat, current.slug).length >= 1;
  }

  private getPostsByCategory(
    category: BlogCategorySlug,
    excludeSlug: string
  ): Blog[] {
    return this.allBlogs
      .filter(
        (blog) =>
          blog.slug !== excludeSlug &&
          blog.categories?.some((c) => c === category)
      )
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  private getRecentPosts(excludeSlug: string): Blog[] {
    return this.allBlogs
      .filter((blog) => blog.slug !== excludeSlug)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, this.MAX_RELATED);
  }
}
