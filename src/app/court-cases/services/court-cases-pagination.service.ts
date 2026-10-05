import { Injectable, signal } from '@angular/core';
import { DecisionCategorySlug } from '../cases';

@Injectable({
  providedIn: 'root',
})
export class CourtCasesPaginationService {
  readonly pageSizeOptions = [5, 10, 15, 20] as const;

  pageIndex = signal(0);
  pageSize = signal(10);
  selectedCategory = signal<DecisionCategorySlug | null>(null);

  updatePage(pageIndex: number, pageSize: number): void {
    this.pageIndex.set(pageIndex);
    this.pageSize.set(pageSize);
  }

  updateCategory(category: DecisionCategorySlug | null): void {
    if (this.selectedCategory() !== category) {
      this.selectedCategory.set(category);
      this.pageIndex.set(0);
    }
  }
}
