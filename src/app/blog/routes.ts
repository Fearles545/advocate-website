import { Routes } from '@angular/router';

import { BlogListComponent } from './blog-list.component';
import { BlogPost } from './blog-post';

export const blogRoutes: Routes = [
  {
    path: 'list',
    component: BlogListComponent,
  },
  {
    path: ':slug',
    component: BlogPost,
  },
  {
    path: '**',
    redirectTo: 'list',
  },
];
