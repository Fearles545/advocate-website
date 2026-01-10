import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  input,
  output,
  signal,
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
      @if (selectedCategory(); as selected) {
        <!-- Active filter chip -->
        <div class="active-filter">
          <button
            class="filter-chip active"
            (click)="toggleDropdown()"
            [attr.aria-expanded]="isOpen()"
            aria-haspopup="listbox"
          >
            <mat-icon>{{ categories[selected].icon }}</mat-icon>
            <span>{{ getDisplayLabel(selected) }}</span>
            <mat-icon class="dropdown-icon" [class.rotated]="isOpen()"
              >expand_more</mat-icon
            >
          </button>
          <button
            class="clear-btn"
            (click)="selectCategory(null)"
            aria-label="Скинути фільтр"
          >
            <mat-icon>close</mat-icon>
          </button>
        </div>
      } @else {
        <!-- Default filter button -->
        <button
          class="filter-chip"
          (click)="toggleDropdown()"
          [attr.aria-expanded]="isOpen()"
          aria-haspopup="listbox"
        >
          <mat-icon>filter_list</mat-icon>
          <span>Фільтрувати за категорією</span>
          <mat-icon class="dropdown-icon" [class.rotated]="isOpen()"
            >expand_more</mat-icon
          >
        </button>
      }

      <!-- Custom dropdown panel -->
      @if (isOpen()) {
        <div class="dropdown-panel" role="listbox">
          @for (slug of activeCategories; track slug) {
            @let category = categories[slug];
            @let count = categoryCounts()[slug] || 0;
            @if (count > 0) {
              <button
                class="dropdown-item"
                [class.selected]="selectedCategory() === slug"
                (click)="selectCategory(slug)"
                role="option"
                [attr.aria-selected]="selectedCategory() === slug"
              >
                <mat-icon>{{ category.icon }}</mat-icon>
                <span class="item-label">{{ getDisplayLabel(slug) }}</span>
                <span class="item-count">({{ count }})</span>
              </button>
            }
          }
        </div>
      }

    </div>
  `,
  styles: `
    .category-filter {
      position: relative;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1.5rem;
      flex-wrap: wrap;
    }

    .active-filter {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    .filter-chip {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.625rem 1rem;
      background: white;
      border: 1px solid rgba(201, 165, 92, 0.3);
      border-radius: 2rem;
      font-size: 0.9rem;
      font-weight: 500;
      color: var(--color-green);
      cursor: pointer;
      transition: all 0.2s ease;

      mat-icon {
        font-size: 1.25rem;
        width: 1.25rem;
        height: 1.25rem;
        color: var(--color-gold);
      }

      .dropdown-icon {
        font-size: 1.125rem;
        width: 1.125rem;
        height: 1.125rem;
        color: var(--color-text-secondary);
        margin-left: -0.125rem;
        transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);

        &.rotated {
          transform: rotate(180deg);
        }
      }

      &:hover {
        border-color: rgba(201, 165, 92, 0.5);
        background: rgba(201, 165, 92, 0.08);

        .dropdown-icon {
          color: var(--color-gold);
        }
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
        padding-right: 0.75rem;

        mat-icon {
          color: var(--color-gold);
        }

        .dropdown-icon {
          color: rgba(201, 165, 92, 0.7);
        }
      }
    }

    .clear-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1.75rem;
      height: 1.75rem;
      padding: 0;
      background: rgba(0, 39, 6, 0.08);
      border: none;
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.2s ease;

      mat-icon {
        font-size: 1rem;
        width: 1rem;
        height: 1rem;
        color: var(--color-green);
      }

      &:hover {
        background: rgba(201, 165, 92, 0.2);

        mat-icon {
          color: var(--color-gold-accent);
        }
      }
    }

    /* ─── DROPDOWN PANEL ─── */
    .dropdown-panel {
      position: absolute;
      top: calc(100% + 0.5rem);
      left: 0;
      z-index: 1000;
      min-width: 260px;
      padding: 0.5rem;
      background: #fffcf7;
      border: 1px solid rgba(201, 165, 92, 0.25);
      border-radius: 0.625rem;
      box-shadow:
        0 12px 40px rgba(0, 39, 6, 0.15),
        0 4px 12px rgba(0, 39, 6, 0.08);

      /* Entrance animation */
      animation: dropdownReveal 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    @keyframes dropdownReveal {
      from {
        opacity: 0;
        transform: translateY(-8px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* ─── DROPDOWN ITEMS ─── */
    .dropdown-item {
      position: relative;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      width: 100%;
      padding: 0.75rem 1rem 0.75rem 1.125rem;
      background: transparent;
      border: none;
      border-radius: 0.5rem;
      font-family: var(--font-body);
      font-size: 0.9rem;
      text-align: left;
      cursor: pointer;
      transition: all 0.15s ease;

      /* Gold accent bar - hidden by default */
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%) scaleY(0);
        width: 3px;
        height: 55%;
        background: linear-gradient(
          180deg,
          var(--color-gold-light) 0%,
          var(--color-gold) 50%,
          var(--color-gold-light) 100%
        );
        border-radius: 0 2px 2px 0;
        transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
      }

      mat-icon {
        font-size: 1.25rem;
        width: 1.25rem;
        height: 1.25rem;
        color: var(--color-gold-accent);
        opacity: 0.7;
        flex-shrink: 0;
        transition: all 0.15s ease;
      }

      .item-label {
        flex: 1;
        font-weight: 500;
        color: var(--color-green);
      }

      .item-count {
        font-weight: 400;
        font-size: 0.85rem;
        color: rgba(0, 39, 6, 0.4);
        margin-left: 0.25rem;
      }

      /* ─── HOVER STATE ─── */
      &:hover:not(.selected) {
        background: rgba(201, 165, 92, 0.1);

        mat-icon {
          color: var(--color-gold);
          opacity: 1;
        }

        .item-count {
          color: rgba(0, 39, 6, 0.55);
        }
      }

      /* ─── SELECTED STATE ─── */
      &.selected {
        background: linear-gradient(
          135deg,
          rgba(0, 39, 6, 0.05) 0%,
          rgba(201, 165, 92, 0.12) 100%
        );

        &::before {
          transform: translateY(-50%) scaleY(1);
        }

        mat-icon {
          color: var(--color-gold);
          opacity: 1;
        }

        .item-label {
          font-weight: 600;
        }

        .item-count {
          color: var(--color-green);
          font-weight: 500;
        }
      }
    }

    /* ─── RESPONSIVE ─── */
    @media (max-width: 768px) {
      .category-filter {
        gap: 0.5rem;
        margin-bottom: 1.25rem;
      }

      .filter-chip {
        padding: 0.5rem 0.75rem;
        font-size: 0.85rem;
        gap: 0.375rem;

        mat-icon {
          font-size: 1.125rem;
          width: 1.125rem;
          height: 1.125rem;
        }

        .dropdown-icon {
          font-size: 1rem;
          width: 1rem;
          height: 1rem;
        }
      }

      .clear-btn {
        width: 1.5rem;
        height: 1.5rem;

        mat-icon {
          font-size: 0.875rem;
          width: 0.875rem;
          height: 0.875rem;
        }
      }

      .dropdown-panel {
        min-width: 240px;
      }
    }

    @media (max-width: 480px) {
      .category-filter {
        margin-bottom: 1rem;
      }

      .filter-chip {
        padding: 0.4rem 0.625rem;
        font-size: 0.8rem;
      }

      .dropdown-panel {
        min-width: 220px;
        right: 0;
        left: auto;
      }
    }
  `,
})
export class CategoryFilterComponent {
  private document = inject(DOCUMENT);
  private elementRef = inject(ElementRef);

  categoryCounts = input.required<Record<BlogCategorySlug, number>>();
  selectedCategory = input<BlogCategorySlug | null>(null);
  categoryChange = output<BlogCategorySlug | null>();

  readonly categories = BLOG_CATEGORIES;
  readonly activeCategories = ACTIVE_CATEGORIES;

  isOpen = signal(false);

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.closeDropdown();
    }
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    this.closeDropdown();
  }

  toggleDropdown(): void {
    if (this.isOpen()) {
      this.closeDropdown();
    } else {
      this.openDropdown();
    }
  }

  private openDropdown(): void {
    this.isOpen.set(true);
    this.document.body.style.overflow = 'hidden';
  }

  private closeDropdown(): void {
    this.isOpen.set(false);
    this.document.body.style.overflow = '';
  }

  getDisplayLabel(slug: BlogCategorySlug): string {
    return getCategoryDisplayLabel(slug);
  }

  selectCategory(slug: BlogCategorySlug | null): void {
    this.categoryChange.emit(slug);
    this.closeDropdown();
  }
}
