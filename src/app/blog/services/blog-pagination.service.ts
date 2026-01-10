import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BlogPaginationService {
  readonly pageSizeOptions = [5, 10, 15, 20] as const;

  pageIndex = signal(0);
  pageSize = signal(10);

  updatePage(pageIndex: number, pageSize: number): void {
    this.pageIndex.set(pageIndex);
    this.pageSize.set(pageSize);
  }

  reset(): void {
    this.pageIndex.set(0);
  }
}
