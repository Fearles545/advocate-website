import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { blogs } from '../blog-posts';
import { MatIcon } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { BlogPaginationService } from '../services/blog-pagination.service';
import {
  PageChangeEvent,
  PaginationComponent,
} from '@shared/components/pagination';
import {
  CategoryFilterComponent,
  CategoryOption,
} from '@shared/components/category-filter';
import {
  ACTIVE_CATEGORIES,
  BLOG_CATEGORIES,
  BlogCategorySlug,
  getCategoryDisplayLabel,
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
  private route = inject(ActivatedRoute);
  protected readonly list = inject(BlogPaginationService);

  readonly allBlogs = blogs;
  isInitialLoad = signal(true);

  ngOnInit(): void {
    this.list.restoreFromUrl(this.route.snapshot.queryParamMap);
  }

  readonly categoryOptions: readonly CategoryOption<BlogCategorySlug>[] =
    ACTIVE_CATEGORIES.map((slug) => ({
      slug,
      label: getCategoryDisplayLabel(slug),
      icon: BLOG_CATEGORIES[slug].icon,
    }));

  /**
   * Check if any posts have categories assigned
   */
  readonly hasCategorizedPosts = computed(() => {
    return this.allBlogs.some((blog) => blog.categories?.length);
  });

  handlePageChange(event: PageChangeEvent): void {
    this.isInitialLoad.set(false);
    this.list.changePage(event);
  }

  handleCategoryChange(category: BlogCategorySlug | null): void {
    this.list.selectCategory(category);
    this.isInitialLoad.set(true);
  }
}
