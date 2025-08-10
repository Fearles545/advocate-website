import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { blogs } from '@assets/blog';

@Component({
  selector: 'app-blog-list.component',
  imports: [RouterLink],
  template: `
    <ul class="blog-list">
      @for (blog of blogs; track blog.id) {
        <li>
          <a [routerLink]="['/blog', blog.slug]">
            {{ blog.title }}
          </a>
        </li>
      }
    </ul>
  `,
  styles: `
    :host {
      display: block;
      max-width: var(--container-max-width);
      width: 100%;
      margin: 0 auto;
      padding: 1rem;
    }

    .blog-list {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
      max-width: calc(var(--container-max-width) / 2);
      margin: 0 auto;
    }
  `,
})
export class BlogListComponent {
  blogs = blogs;
}
