import { Routes } from '@angular/router';

import { BlogPostComponent } from './components/blog-post.component';
import { BlogListComponent } from './components/blog-list.component';
import { BLOG_SEO_DATA } from './blog-seo.config';
import { blogs } from './blog-posts';

export const blogRoutes: Routes = [
  {
    path: '',
    component: BlogListComponent,
  },
  // {
  //   path: ':slug',
  //   component: BlogPostComponent,
  // },
  ...blogs.map((blog) => ({
    path: blog.slug,
    component: BlogPostComponent,
    // 3. Pass the slug and other metadata via the `data` property.
    // This makes it easy for the component to fetch the correct content
    // and for a meta tag service to set the correct SEO tags.
    data: {
      slug: blog.slug,
    },
  })),
];
