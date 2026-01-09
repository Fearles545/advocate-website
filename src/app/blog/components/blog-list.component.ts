import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { blogs } from '../blog-posts';
import { MatIcon } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { UkrainianPaginatorIntl } from '../../core/services/ukrainian-paginator-intl.service';
import { BlogPaginationService } from '../services/blog-pagination.service';

@Component({
  selector: 'app-blog-list.component',
  imports: [RouterLink, MatIcon, DatePipe, MatPaginatorModule],
  providers: [{ provide: MatPaginatorIntl, useClass: UkrainianPaginatorIntl }],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.css',
})
export class BlogListComponent {
  private blogPaginationService = inject(BlogPaginationService);

  blogs = blogs;

  readonly pageSize = this.blogPaginationService.pageSize;
  readonly pageIndex = this.blogPaginationService.pageIndex;

  readonly paginatedBlogs = computed(() => {
    const startIndex = this.pageIndex() * this.pageSize();
    const endIndex = startIndex + this.pageSize();
    return this.blogs.slice(startIndex, endIndex);
  });

  handlePageEvent(event: PageEvent) {
    this.pageIndex.set(event.pageIndex);
  }
}
