import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { blogs, Blog } from '../blog-posts';
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
  template: `
    <div class="blog-container">
      <ul class="blog-list">
        @for (blog of paginatedBlogs(); track blog.slug) {
          <li>
            <a [routerLink]="['/blog', blog.slug]">
              <div
                style="
                  display: flex;
                  flex-direction: column;
                  gap: 0.25rem;
                  width: 90%;
                "
              >
                <p>{{ blog.title }}</p>

                <small style="color: grey">
                  {{ blog.date | date: 'dd-MM-yyyy' }}
                </small>
              </div>

              <mat-icon
                style="align-self: center; width: fit-content"
                color="primary"
              >
                arrow_forward_ios
              </mat-icon>
            </a>
          </li>
        }
      </ul>
      <mat-paginator
        [length]="blogs.length"
        [pageSize]="pageSize()"
        [pageIndex]="pageIndex()"
        [hidePageSize]="true"
        (page)="handlePageEvent($event)"
        aria-label="Select page"
      >
      </mat-paginator>
    </div>
  `,
  styles: `
    :host {
      max-width: var(--container-max-width);
      width: 100%;
      margin: 0 auto;
      padding: 1rem;
    }

    .blog-container {
      border-radius: 0.5rem;
      border: 1px solid var(--color-green);
      box-shadow: var(--color-green) 0 0 0.25rem;
      background-color: var(--color-container-bg);
      max-width: 800px;
      margin: 0 auto;
      overflow: hidden;
    }

    .blog-list {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      list-style: none;
      padding: 0;
      margin: 0;

      li:hover {
        background-color: #0027060f;
        transition: background-color 0.3s ease;
      }
      li {
        flex: 1;
        border-bottom: 1px solid var(--color-green);
        padding: 0;
        font-weight: 600;
        width: 100%;

        a {
          display: flex;
          justify-content: space-between;
          overflow: visible;
          color: var(--color-green);
          padding: 1rem;
          width: 100%;

          mat-icon {
            transition: color 0.3s ease;
          }
        }

        a:hover {
          color: var(--color-navy);

          mat-icon {
            color: var(--color-gold);
          }
        }
      }
    }

    mat-paginator {
      background-color: transparent;
      color: var(--color-navy);
    }
  `,
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
