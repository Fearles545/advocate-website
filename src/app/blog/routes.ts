import { Routes } from '@angular/router';

import { BlogPostComponent } from './components/blog-post.component';
import { BlogListComponent } from './components/blog-list.component';
import { blogs } from './blog-posts';

export const blogRoutes: Routes = [
  {
    path: '',
    component: BlogListComponent,
  },
  ...blogs.map((blog) => ({
    path: blog.slug,
    component: BlogPostComponent,
    data: {
      blog,
    },
  })),
];
