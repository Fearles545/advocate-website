import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { blogs } from '../blog-posts';
import { MatIcon } from '@angular/material/icon';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-blog-list.component',
  imports: [RouterLink, MatIcon, DatePipe],
  template: `
    <ul class="blog-list">
      @for (blog of blogs; track blog.id) {
        <li>
          <a [routerLink]="['/blog', blog.slug]">
            <div
              style="display: flex; flex-direction: column; gap: 0.25rem; width: 90%;"
            >
              <p>{{ blog.title }}</p>

              <small style="color: grey;">
                {{ blog.date | date: 'dd-MM-yyyy' }}
              </small>
            </div>

            <mat-icon
              style="align-self: center; width: fit-content;"
              color="primary"
            >
              arrow_forward_ios
            </mat-icon>
          </a>
        </li>
      }
    </ul>
  `,
  styles: `
    :host {
      max-width: var(--container-max-width);
      width: 100%;
      margin: 0 auto;
      padding: 1rem;
    }

    .blog-list {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      list-style: none;
      max-width: 800px;
      margin: 0 auto;
      padding: 0;

      border-radius: 0.5rem;
      border: 1px solid var(--color-green);
      box-shadow: var(--color-green) 0 0 0.25rem;
      background-color: var(--color-container-bg);

      li:last-child {
        border-bottom: none;
      }
      li:hover {
        background-color: #0027060f;
        overflow: hidden;
        transition: background-color 0.3s ease;
      }
      li {
        flex: 1;
        border-bottom: 1px solid var(--color-green);
        padding: 1rem;
        font-weight: 600;
        width: 100%;

        a {
          display: flex;
          justify-content: space-between;
          overflow: visible;
          color: var(--color-green)
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
  `,
})
export class BlogListComponent {
  blogs = blogs;
}
