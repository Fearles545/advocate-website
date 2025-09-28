import { Component, computed, inject, input, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DomSanitizer } from '@angular/platform-browser';
import { MatExpansionModule } from '@angular/material/expansion';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  fromEvent,
  startWith,
  debounceTime,
  map,
  distinctUntilChanged,
} from 'rxjs';
import { SpinnerComponent } from '@core/components/spinner/spinner.component';

@Component({
  selector: 'app-blog-iframe',
  imports: [MatProgressSpinnerModule, MatExpansionModule, SpinnerComponent],
  template: `
    <mat-expansion-panel
      [expanded]="isDesktop()"
      style="
        background-color: var(--color-container-bg);
        border: 1px solid var(--color-green);
        border-radius: 0.1rem;
        box-shadow: var(--color-green) 0 0 0.05rem;
        margin: 0 auto;
        width: 100%;
      "
    >
      <mat-expansion-panel-header>
        <mat-panel-title> Відео-версія блогу </mat-panel-title>
      </mat-expansion-panel-header>

      <app-spinner [show]="isIframeLoading()" />

      <iframe
        style="
          display: block;
          width: fit-content;
          margin: 0 auto;"
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
    </mat-expansion-panel>
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

  isIframeLoading = signal(true);

  isDesktop = toSignal(
    fromEvent(window, 'resize').pipe(
      startWith(0),
      debounceTime(200),
      map(() => window.innerWidth > 768),
      distinctUntilChanged()
    )
  );

  x = (event: Event) => {
    // this.isIframeLoading.set(true);
    const iframe = event.target as HTMLIFrameElement;
    // Check if the src is not 'about:blank' or empty.
    // This is a safe way to check if the iframe has been given a URL to load.
    if (iframe.src && iframe.src !== 'about:blank') {
      this.isIframeLoading.set(false);
    }
  };
}
