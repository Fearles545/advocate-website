import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-blog',
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet> `,
  styles: `
    :host {
      display: block;
      max-width: var(--container-max-width);
      width: 100%;
      margin: 0 auto;
      padding: 0;
    }
  `,
})
export class BlogComponent {}
