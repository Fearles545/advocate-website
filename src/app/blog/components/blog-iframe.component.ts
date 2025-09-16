import { Component, computed, inject, input, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SpinnerComponent } from '@core/components/spinner/spinner.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { LoaderDirective } from '@core/directives/loader.directive';

@Component({
  selector: 'app-blog-iframe',
  imports: [
    MatProgressSpinnerModule,
    // SpinnerComponent,
    MatExpansionModule,
    // LoaderDirective,
  ],
  template: `
    <mat-expansion-panel
      style="
        background-color: var(--color-container-bg);
        border: 1px solid var(--color-green);
        border-radius: 0.5rem;
        box-shadow: var(--color-green) 0 0 0.05rem;
        margin: 0 auto;
        width: fit-content;
      "
    >
      <mat-expansion-panel-header>
        <mat-panel-title> Відео версія блогу </mat-panel-title>
      </mat-expansion-panel-header>

      <!-- <ng-template matExpansionPanelContent> -->
      <!-- <app-spinner [show]="isIframeLoaded() === false" /> -->

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
      <!-- </ng-template> -->
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

  isIframeLoaded = signal(false);
  isIframeLoading = signal(true);

  x = (event: Event) => {
    // this.isIframeLoading.set(true);
    const iframe = event.target as HTMLIFrameElement;
    // Check if the src is not 'about:blank' or empty.
    // This is a safe way to check if the iframe has been given a URL to load.
    if (iframe.src && iframe.src !== 'about:blank') {
      this.isIframeLoading.set(false);
    } else {
      console.log('Initial load event. Ignoring.');
    }
  };
}
