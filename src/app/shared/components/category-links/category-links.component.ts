import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, UrlTree } from '@angular/router';

export interface CategoryLink {
  label: string;
  /** The section list filtered by this category. */
  url: UrlTree;
}

/**
 * The «Категорії» row of an article or a court decision page: one link per
 * category to the section list filtered by it.
 */
@Component({
  selector: 'app-category-links',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <div class="categories-list">
      <span class="categories-label">Категорії</span>
      @for (category of categories(); track category.label) {
        <a [routerLink]="category.url" class="category-link">
          {{ category.label }}
        </a>
      }
    </div>
  `,
  styles: `
    :host {
      display: block;
    }

    .categories-list {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.4rem;
      width: 100%;
    }

    .categories-label {
      font-size: var(--font-size-label);
      font-weight: 600;
      color: var(--text-color-secondary);
      padding: 0.2rem 0.5rem 0.2rem 0;
      white-space: nowrap;
    }

    .category-link {
      flex: 1 1 auto;
      text-align: center;
      font-size: 0.7rem;
      font-weight: 600;
      color: var(--color-gold-accent);
      padding: 0.2rem 0.5rem;
      background: rgba(201, 165, 92, 0.12);
      border-radius: 0.25rem;
      letter-spacing: 0.02em;
      text-decoration: none;
      transition:
        background-color var(--transition-normal),
        color var(--transition-normal);

      &:hover {
        background: var(--gold-alpha-20);
        color: var(--color-green);
      }
    }

    @media (min-width: 480px) {
      .categories-label {
        padding-left: 0.5rem;
      }

      .category-link {
        font-size: var(--font-size-label);
        padding: 0.25rem 0.625rem;
      }
    }

    @media (min-width: 600px) {
      .category-link {
        font-size: 0.8rem;
        padding: 0.25rem 0.6rem;
      }
    }
  `,
})
export class CategoryLinksComponent {
  categories = input.required<readonly CategoryLink[]>();
}
