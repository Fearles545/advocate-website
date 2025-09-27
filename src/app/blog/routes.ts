import { Routes } from '@angular/router';

import { BlogPostComponent } from './components/blog-post.component';
import { BlogListComponent } from './components/blog-list.component';
import { BLOG_SEO_DATA } from './blog-seo.config';

export const blogRoutes: Routes = [
  {
    path: '',
    component: BlogListComponent,
  },
  {
    path: ':slug',
    component: BlogPostComponent,
    data: {
      seo: BLOG_SEO_DATA,
    },
  },
];
