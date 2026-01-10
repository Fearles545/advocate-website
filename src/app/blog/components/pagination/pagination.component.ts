import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

export interface PageChangeEvent {
  pageIndex: number;
  pageSize: number;
}

@Component({
  selector: 'app-pagination',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, MatSelectModule, MatFormFieldModule],
  template: `
    <nav class="pagination" aria-label="Навігація по сторінках">
      <!-- Page size selector -->
      <div class="page-size-selector">
        <span class="page-size-label">Показувати:</span>
        <mat-form-field appearance="outline" subscriptSizing="dynamic">
          <mat-select
            [value]="pageSize()"
            (selectionChange)="onPageSizeChange($event.value)"
          >
            @for (size of pageSizeOptions(); track size) {
              <mat-option [value]="size">{{ size }}</mat-option>
            }
          </mat-select>
        </mat-form-field>
      </div>

      <!-- Page numbers -->
      <div class="page-numbers">
        <!-- Previous button -->
        <button
          class="page-btn nav-btn"
          [class.disabled]="pageIndex() === 0"
          [disabled]="pageIndex() === 0"
          (click)="goToPage(pageIndex() - 1)"
          aria-label="Попередня сторінка"
        >
          <mat-icon>chevron_left</mat-icon>
        </button>

        <!-- Page buttons -->
        @for (page of visiblePages(); track $index) {
          @if (page === '...') {
            <span class="ellipsis">...</span>
          } @else {
            <button
              class="page-btn"
              [class.active]="page === pageIndex() + 1"
              (click)="goToPage(page - 1)"
              [attr.aria-label]="'Сторінка ' + page"
              [attr.aria-current]="page === pageIndex() + 1 ? 'page' : null"
            >
              {{ page }}
            </button>
          }
        }

        <!-- Next button -->
        <button
          class="page-btn nav-btn"
          [class.disabled]="pageIndex() >= totalPages() - 1"
          [disabled]="pageIndex() >= totalPages() - 1"
          (click)="goToPage(pageIndex() + 1)"
          aria-label="Наступна сторінка"
        >
          <mat-icon>chevron_right</mat-icon>
        </button>
      </div>

      <!-- Results info -->
      <div class="results-info">
        {{ startItem() }}–{{ endItem() }} з {{ totalItems() }}
      </div>
    </nav>
  `,
  styles: `
    .pagination {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1.5rem;
      padding: 1rem 1.5rem;
      background: linear-gradient(
        180deg,
        rgba(248, 246, 242, 0.5) 0%,
        rgba(248, 246, 242, 0.8) 100%
      );
      border-top: 1px solid rgba(201, 165, 92, 0.15);
    }

    /* Page Size Selector */
    .page-size-selector {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .page-size-label {
      font-size: 0.875rem;
      color: var(--text-color-secondary);
      white-space: nowrap;
    }

    mat-form-field {
      width: 70px;

      --mdc-outlined-text-field-outline-color: rgba(201, 165, 92, 0.3);
      --mdc-outlined-text-field-hover-outline-color: rgba(201, 165, 92, 0.5);
      --mdc-outlined-text-field-focus-outline-color: var(--color-gold);
      --mdc-outlined-text-field-container-shape: 0.5rem;
      --mat-form-field-container-height: 36px;
      --mat-form-field-container-vertical-padding: 6px;
      --mat-select-trigger-text-size: 0.875rem;
    }

    /* Page Numbers Container */
    .page-numbers {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    /* Page Button Base */
    .page-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 2.25rem;
      height: 2.25rem;
      padding: 0 0.5rem;
      border: 1px solid rgba(201, 165, 92, 0.2);
      border-radius: 0.5rem;
      background: white;
      color: var(--color-green);
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover:not(.disabled):not(.active) {
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
        font-weight: 600;
        box-shadow: 0 2px 8px rgba(0, 39, 6, 0.2);
      }

      &.disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }
    }

    /* Navigation Buttons */
    .nav-btn {
      min-width: 2.25rem;
      padding: 0;

      mat-icon {
        font-size: 1.25rem;
        width: 1.25rem;
        height: 1.25rem;
      }

      &:hover:not(.disabled) {
        background: var(--color-gold);
        border-color: var(--color-gold);

        mat-icon {
          color: var(--color-green-darkest);
        }
      }
    }

    /* Ellipsis */
    .ellipsis {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 1.5rem;
      color: var(--text-color-secondary);
      font-size: 0.875rem;
      user-select: none;
    }

    /* Results Info */
    .results-info {
      font-size: 0.875rem;
      color: var(--text-color-secondary);
      white-space: nowrap;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .pagination {
        flex-wrap: wrap;
        gap: 1rem;
        padding: 1rem;
      }

      .page-size-selector {
        order: 2;
      }

      .page-numbers {
        order: 1;
        width: 100%;
        justify-content: center;
      }

      .results-info {
        order: 3;
      }
    }

    @media (max-width: 479px) {
      .pagination {
        padding: 0.75rem;
        gap: 0.75rem;
      }

      .page-size-label {
        display: none;
      }

      .page-btn {
        min-width: 2rem;
        height: 2rem;
        font-size: 0.8rem;
      }

      .nav-btn mat-icon {
        font-size: 1.1rem;
        width: 1.1rem;
        height: 1.1rem;
      }

      .results-info {
        font-size: 0.8rem;
      }
    }
  `,
})
export class PaginationComponent {
  totalItems = input.required<number>();
  pageIndex = input<number>(0);
  pageSize = input<number>(10);
  pageSizeOptions = input<readonly [5, 10, 15, 20]>([5, 10, 15, 20]);

  pageChange = output<PageChangeEvent>();

  totalPages = computed(() => Math.ceil(this.totalItems() / this.pageSize()));

  startItem = computed(() =>
    this.totalItems() === 0 ? 0 : this.pageIndex() * this.pageSize() + 1
  );

  endItem = computed(() =>
    Math.min((this.pageIndex() + 1) * this.pageSize(), this.totalItems())
  );

  visiblePages = computed(() => {
    const total = this.totalPages();
    const current = this.pageIndex() + 1;
    const pages: (number | '...')[] = [];

    if (total <= 7) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (current > 3) {
        pages.push('...');
      }

      const start = Math.max(2, current - 1);
      const end = Math.min(total - 1, current + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (current < total - 2) {
        pages.push('...');
      }

      pages.push(total);
    }

    return pages;
  });

  goToPage(index: number): void {
    if (index >= 0 && index < this.totalPages()) {
      this.pageChange.emit({
        pageIndex: index,
        pageSize: this.pageSize(),
      });
    }
  }

  onPageSizeChange(newSize: number): void {
    const newTotalPages = Math.ceil(this.totalItems() / newSize);
    const newPageIndex = Math.min(this.pageIndex(), newTotalPages - 1);

    this.pageChange.emit({
      pageIndex: Math.max(0, newPageIndex),
      pageSize: newSize,
    });
  }
}
