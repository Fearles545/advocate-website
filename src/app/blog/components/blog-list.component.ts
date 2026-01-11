import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Location } from '@angular/common';

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
  private location = inject(Location);

  readonly allBlogs = blogs;
  isInitialLoad = signal(true);

  readonly selectedCategory = computed(
    () => this.blogPaginationService.selectedCategory()
  );

  ngOnInit(): void {
    const urlCategory = this.route.snapshot.queryParamMap.get('category');

    if (
      urlCategory &&
      ACTIVE_CATEGORIES.includes(urlCategory as BlogCategorySlug)
    ) {
      this.blogPaginationService.updateCategory(urlCategory as BlogCategorySlug);
    } else if (!urlCategory && this.blogPaginationService.selectedCategory()) {
      const category = this.blogPaginationService.selectedCategory();
      this.location.replaceState(`/blog?category=${category}`);
    }

    this.clampPageIndex();
  }

  private clampPageIndex(): void {
    const totalPages = Math.ceil(
      this.filteredBlogs().length / this.pageSize()
    );
    if (totalPages > 0 && this.pageIndex() >= totalPages) {
      this.blogPaginationService.updatePage(totalPages - 1, this.pageSize());
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
    this.blogPaginationService.updateCategory(category);
    this.isInitialLoad.set(true);

    const url = category ? `/blog?category=${category}` : '/blog';
    this.location.replaceState(url);
  }
}
