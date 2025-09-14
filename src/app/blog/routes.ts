import { Routes } from '@angular/router';

import { BlogPostComponent } from './components/blog-post.component';
import { BlogListComponent } from './components/blog-list.component';

export const blogRoutes: Routes = [
  {
    path: '',
    component: BlogListComponent,
  },
  {
    path: ':slug',
    component: BlogPostComponent,
  },
];
