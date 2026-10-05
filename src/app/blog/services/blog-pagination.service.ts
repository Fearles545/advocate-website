import { Injectable } from '@angular/core';

import { CategoryListState } from '@shared/category-list';
import { Blog, blogs } from '../blog-posts';
import { BlogCategorySlug, isActiveCategory } from '../blog-categories';

/** The blog list's root-provided state: category, page and page size. */
@Injectable({
  providedIn: 'root',
})
export class BlogPaginationService extends CategoryListState<
  BlogCategorySlug,
  Blog
> {
  constructor() {
    super({ listPath: '/blog', items: blogs, isCategory: isActiveCategory });
  }
}
