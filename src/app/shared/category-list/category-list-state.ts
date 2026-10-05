import { computed, inject, signal } from '@angular/core';
import { Location } from '@angular/common';
import { ParamMap, Router, UrlTree } from '@angular/router';

import { PageChangeEvent } from '@shared/components/pagination';

export interface CategoryListConfig<TSlug extends string, TItem> {
  /** The section's list route, such as `/blog`. */
  listPath: string;
  /** Every item of the list, in list order. */
  items: readonly TItem[];
  /** Whether a `?category=` value names one of the list's categories. */
  isCategory: (value: string) => value is TSlug;
}

/**
 * State of a section's list that is filtered by category and paged: the
 * selected category, the page index and the page size. Each section provides
 * its own instance in root, so the state survives opening an item and coming
 * back to the list.
 *
 * The selected category shows in the list URL as `?category=<slug>`, written
 * through a history state replacement rather than a router navigation.
 */
export abstract class CategoryListState<
  TSlug extends string,
  TItem extends { categories?: readonly TSlug[] },
> {
  private readonly location = inject(Location);
  private readonly router = inject(Router);

  readonly pageSizeOptions = [5, 10, 15, 20] as const;

  private readonly category = signal<TSlug | null>(null);
  private readonly index = signal(0);
  private readonly size = signal(10);

  readonly selectedCategory = this.category.asReadonly();
  readonly pageIndex = this.index.asReadonly();
  readonly pageSize = this.size.asReadonly();

  /** The items of the selected category in list order, or all of them. */
  readonly filteredItems = computed(() => {
    const category = this.category();
    if (!category) {
      return this.config.items;
    }
    return this.config.items.filter(
      (item) => item.categories?.includes(category) ?? false
    );
  });

  /** The filtered items on the current page. */
  readonly pageItems = computed(() => {
    const start = this.index() * this.size();
    return this.filteredItems().slice(start, start + this.size());
  });

  /** Item count per category; an item counts once in each of its categories. */
  readonly categoryCounts = computed(() => {
    const counts: Partial<Record<TSlug, number>> = {};
    for (const item of this.config.items) {
      for (const category of item.categories ?? []) {
        counts[category] = (counts[category] ?? 0) + 1;
      }
    }
    return counts;
  });

  protected constructor(
    private readonly config: CategoryListConfig<TSlug, TItem>
  ) {}

  /**
   * Applies the `?category=` value the list was opened with. A known category
   * is selected. Without a value, a remembered category is written back into
   * the URL. The page index then moves to the last page that still exists.
   */
  restoreFromUrl(queryParams: ParamMap): void {
    const value = queryParams.get('category');

    if (value && this.config.isCategory(value)) {
      this.setCategory(value);
    } else if (!value && this.category()) {
      this.replaceUrl(this.category());
    }

    this.clampPageIndex();
  }

  /** Selects a category, or none, and shows the selection in the URL. */
  selectCategory(category: TSlug | null): void {
    this.setCategory(category);
    this.replaceUrl(category);
  }

  changePage({ pageIndex, pageSize }: PageChangeEvent): void {
    this.index.set(pageIndex);
    this.size.set(pageSize);
  }

  /**
   * A link to the list filtered by `category`, scrolled to the `categories`
   * anchor around the list's category filter.
   */
  categoryLink(category: TSlug): UrlTree {
    return this.listUrl(category, 'categories');
  }

  /** A category change returns to the first page. */
  private setCategory(category: TSlug | null): void {
    if (this.category() !== category) {
      this.category.set(category);
      this.index.set(0);
    }
  }

  private clampPageIndex(): void {
    const totalPages = Math.ceil(this.filteredItems().length / this.size());
    if (totalPages > 0 && this.index() >= totalPages) {
      this.index.set(totalPages - 1);
    }
  }

  private replaceUrl(category: TSlug | null): void {
    this.location.replaceState(
      this.router.serializeUrl(this.listUrl(category))
    );
  }

  private listUrl(category: TSlug | null, fragment?: string): UrlTree {
    return this.router.createUrlTree([this.config.listPath], {
      queryParams: { category },
      fragment,
    });
  }
}
