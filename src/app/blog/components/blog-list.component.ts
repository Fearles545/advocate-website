import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { blogs } from '../blog-posts';
import { MatIcon } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { BlogPaginationService } from '../services/blog-pagination.service';
import {
  PageChangeEvent,
  PaginationComponent,
} from './pagination/pagination.component';

@Component({
  selector: 'app-blog-list.component',
  imports: [RouterLink, MatIcon, DatePipe, PaginationComponent],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.css',
})
export class BlogListComponent {
  private blogPaginationService = inject(BlogPaginationService);

  blogs = blogs;
  isInitialLoad = signal(true);

  readonly pageSize = this.blogPaginationService.pageSize;
  readonly pageIndex = this.blogPaginationService.pageIndex;
  readonly pageSizeOptions = this.blogPaginationService.pageSizeOptions;

  readonly paginatedBlogs = computed(() => {
    const startIndex = this.pageIndex() * this.pageSize();
    const endIndex = startIndex + this.pageSize();
    return this.blogs.slice(startIndex, endIndex);
  });

  handlePageChange(event: PageChangeEvent): void {
    this.isInitialLoad.set(false);
    this.blogPaginationService.updatePage(event.pageIndex, event.pageSize);
  }
}
