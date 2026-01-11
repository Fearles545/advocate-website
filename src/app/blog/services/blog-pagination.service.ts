import { Injectable, signal } from '@angular/core';
import { BlogCategorySlug } from '../blog-categories';

@Injectable({
  providedIn: 'root',
})
export class BlogPaginationService {
  readonly pageSizeOptions = [5, 10, 15, 20] as const;

  pageIndex = signal(0);
  pageSize = signal(10);
  selectedCategory = signal<BlogCategorySlug | null>(null);

  updatePage(pageIndex: number, pageSize: number): void {
    this.pageIndex.set(pageIndex);
    this.pageSize.set(pageSize);
  }

  updateCategory(category: BlogCategorySlug | null): void {
    if (this.selectedCategory() !== category) {
      this.selectedCategory.set(category);
      this.pageIndex.set(0);
    }
  }

  reset(): void {
    this.pageIndex.set(0);
  }
}
