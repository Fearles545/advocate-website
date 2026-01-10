import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  ACTIVE_CATEGORIES,
  BLOG_CATEGORIES,
  BlogCategorySlug,
  getCategoryDisplayLabel,
} from '../../blog-categories';

@Component({
  selector: 'app-category-filter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <div class="category-filter">
      <button
        class="category-chip"
        [class.active]="!selectedCategory()"
        (click)="selectCategory(null)"
      >
        <mat-icon>apps</mat-icon>
        <span>Усі статті</span>
        <span class="count">{{ totalPosts() }}</span>
      </button>

      @for (slug of activeCategories; track slug) {
        @let category = categories[slug];
        @let count = categoryCounts()[slug] || 0;
        @if (count > 0) {
          <button
            class="category-chip"
            [class.active]="selectedCategory() === slug"
            (click)="selectCategory(slug)"
          >
            <mat-icon>{{ category.icon }}</mat-icon>
            <span>{{ getDisplayLabel(slug) }}</span>
            <span class="count">{{ count }}</span>
          </button>
        }
      }
    </div>
  `,
  styles: `
    .category-filter {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }

    .category-chip {
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
      padding: 0.5rem 0.875rem;
      background: white;
      border: 1px solid rgba(201, 165, 92, 0.25);
      border-radius: 2rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--color-green);
      cursor: pointer;
      transition: all 0.2s ease;
      white-space: nowrap;

      mat-icon {
        font-size: 1.125rem;
        width: 1.125rem;
        height: 1.125rem;
        color: var(--color-gold);
        transition: color 0.2s ease;
      }

      .count {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 1.25rem;
        height: 1.25rem;
        padding: 0 0.375rem;
        background: rgba(201, 165, 92, 0.15);
        border-radius: 0.625rem;
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--color-green);
      }

      &:hover:not(.active) {
        border-color: rgba(201, 165, 92, 0.5);
        background: rgba(201, 165, 92, 0.08);
      }

      &.active {
        background: linear-gradient(
          135deg,
          var(--color-green) 0%,
          var(--color-green-dark) 100%
        );
        border-color: var(--color-green);
        color: var(--color-gold);
        box-shadow: 0 2px 8px rgba(0, 39, 6, 0.2);

        mat-icon {
          color: var(--color-gold);
        }

        .count {
          background: rgba(201, 165, 92, 0.25);
          color: var(--color-gold);
        }
      }
    }

    @media (max-width: 768px) {
      .category-filter {
        gap: 0.375rem;
        margin-bottom: 1.25rem;
      }

      .category-chip {
        padding: 0.375rem 0.625rem;
        font-size: 0.8rem;

        mat-icon {
          font-size: 1rem;
          width: 1rem;
          height: 1rem;
        }

        .count {
          min-width: 1.125rem;
          height: 1.125rem;
          font-size: 0.7rem;
        }
      }
    }

    @media (max-width: 480px) {
      .category-filter {
        overflow-x: auto;
        flex-wrap: nowrap;
        padding-bottom: 0.5rem;
        margin-bottom: 1rem;
        -webkit-overflow-scrolling: touch;

        &::-webkit-scrollbar {
          height: 4px;
        }

        &::-webkit-scrollbar-track {
          background: rgba(201, 165, 92, 0.1);
          border-radius: 2px;
        }

        &::-webkit-scrollbar-thumb {
          background: rgba(201, 165, 92, 0.3);
          border-radius: 2px;
        }
      }
    }
  `,
})
export class CategoryFilterComponent {
  categoryCounts = input.required<Record<BlogCategorySlug, number>>();
  totalPosts = input.required<number>();
  selectedCategory = input<BlogCategorySlug | null>(null);
  categoryChange = output<BlogCategorySlug | null>();

  readonly categories = BLOG_CATEGORIES;
  readonly activeCategories = ACTIVE_CATEGORIES;

  getDisplayLabel(slug: BlogCategorySlug): string {
    return getCategoryDisplayLabel(slug);
  }

  selectCategory(slug: BlogCategorySlug | null): void {
    this.categoryChange.emit(slug);
  }
}
