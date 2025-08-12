import { Component, inject } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { BlogIframeComponent } from './blog-iframe.component';

import { map } from 'rxjs';

import { blogs } from '@assets/blog';

@Component({
  selector: 'app-blog-post',
  imports: [BlogIframeComponent],
  template: `
    @if (blog()) {
      <section>
        <h1>{{ blog()!.title }}</h1>

        <p>{{ blog()!.description }}</p>
      </section>

      <app-blog-iframe [src]="blog()!.src" [title]="blog()!.title" />
    }
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      margin: 0 auto;
      padding: 1rem 0;
    }

    section {
      text-align: center;
    }
  `,
})
export class BlogPost {
  route = inject(ActivatedRoute);
  blogs = blogs;

  blog = toSignal(
    this.route.params.pipe(
      map((params) => params['slug']),
      map((slug) => this.blogs.find((blog) => blog.slug === slug))
    )
  );
}
