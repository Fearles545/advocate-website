import { Component, computed, inject, input, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SpinnerComponent } from '../../core/components/spinner/spinner.component';

@Component({
  selector: 'app-blog-iframe',
  imports: [MatProgressSpinnerModule, SpinnerComponent],
  template: `
    <app-spinner [show]="isIframeLoaded() === false" />

    <iframe
      [style]="{
        visibility: isIframeLoaded() ? 'visible' : 'hidden',
      }"
      [width]="width()"
      [height]="height()"
      [src]="computedSrc()"
      [title]="title()"
      (load)="x($event)"
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

  isIframeLoaded = signal(false);

  x = (event: Event) => {
    const iframe = event.target as HTMLIFrameElement;
    // Check if the src is not 'about:blank' or empty.
    // This is a safe way to check if the iframe has been given a URL to load.
    if (iframe.src && iframe.src !== 'about:blank') {
      this.isIframeLoaded.set(true);
      console.log('Iframe has loaded with content.');
    } else {
      console.log('Initial load event. Ignoring.');
    }
  };
}
