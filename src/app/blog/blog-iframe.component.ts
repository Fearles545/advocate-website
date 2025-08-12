import { Component, computed, inject, input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-iframe',
  imports: [],
  template: `
    <iframe
      [width]="width()"
      [height]="height()"
      [src]="computedSrc()"
      [title]="title()"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    ></iframe>
  `,
  styles: ``,
})
export class BlogIframeComponent {
  sanitizer = inject(DomSanitizer);

  width = input<number>(350);
  height = input<number>(600);
  src = input.required<string>();
  title = input<string>();

  computedSrc = computed(() =>
    this.sanitizer.bypassSecurityTrustResourceUrl(this.src())
  );
}
