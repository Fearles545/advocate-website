import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { blogs } from '../blog-posts';
import { MatIcon } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { BlogPaginationService } from '../services/blog-pagination.service';
import {
  PageChangeEvent,
  PaginationComponent,
} from './pagination/pagination.component';
import { CategoryFilterComponent } from './category-filter/category-filter.component';
import {
  ACTIVE_CATEGORIES,
  BlogCategorySlug,
} from '../blog-categories';

@Component({
  selector: 'app-blog-list.component',
  imports: [
    RouterLink,
    MatIcon,
    DatePipe,
    PaginationComponent,
    CategoryFilterComponent,
  ],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.css',
})
export class BlogListComponent implements OnInit {
  private blogPaginationService = inject(BlogPaginationService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  readonly allBlogs = blogs;
  isInitialLoad = signal(true);
  selectedCategory = signal<BlogCategorySlug | null>(null);

  ngOnInit(): void {
    const categoryParam = this.route.snapshot.queryParamMap.get('category');
    if (categoryParam && ACTIVE_CATEGORIES.includes(categoryParam as BlogCategorySlug)) {
      this.selectedCategory.set(categoryParam as BlogCategorySlug);
    }
  }

  readonly pageSize = this.blogPaginationService.pageSize;
  readonly pageIndex = this.blogPaginationService.pageIndex;
  readonly pageSizeOptions = this.blogPaginationService.pageSizeOptions;

  /**
   * Count posts per category for filter badges
   * Posts with multiple categories are counted in each
   */
  readonly categoryCounts = computed(() => {
    const counts = {} as Record<BlogCategorySlug, number>;
    for (const slug of ACTIVE_CATEGORIES) {
      counts[slug] = 0;
    }
    for (const blog of this.allBlogs) {
      if (blog.categories) {
        for (const cat of blog.categories) {
          if (counts[cat] !== undefined) {
            counts[cat]++;
          }
        }
      }
    }
    return counts;
  });

  /**
   * Filter blogs by selected category
   * Shows posts that have the category in their categories array
   */
  readonly filteredBlogs = computed(() => {
    const category = this.selectedCategory();
    if (!category) {
      return this.allBlogs;
    }
    return this.allBlogs.filter(
      (blog) => blog.categories?.some((c) => c === category)
    );
  });

  /**
   * Paginate the filtered blogs
   */
  readonly paginatedBlogs = computed(() => {
    const startIndex = this.pageIndex() * this.pageSize();
    const endIndex = startIndex + this.pageSize();
    return this.filteredBlogs().slice(startIndex, endIndex);
  });

  /**
   * Check if any posts have categories assigned
   */
  readonly hasCategorizedPosts = computed(() => {
    return this.allBlogs.some((blog) => blog.categories?.length);
  });

  handlePageChange(event: PageChangeEvent): void {
    this.isInitialLoad.set(false);
    this.blogPaginationService.updatePage(event.pageIndex, event.pageSize);
  }

  handleCategoryChange(category: BlogCategorySlug | null): void {
    this.selectedCategory.set(category);
    this.blogPaginationService.updatePage(0, this.pageSize());
    this.isInitialLoad.set(true);

    // Update URL query params
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: category ? { category } : {},
      queryParamsHandling: category ? 'merge' : '',
    });
  }
}
