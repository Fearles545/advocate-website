import { isPlatformBrowser } from '@angular/common';
import { Component, computed, inject, input, PLATFORM_ID } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { SocialIconData } from '../core/icons.data';

@Component({
  selector: 'app-social-icon-link',
  imports: [],
  template: `
    <a
      class="social-icon-link"
      [href]="iconData().link"
      target="_blank"
      [style]="iconStyles()"
    >
      @if (isBrowser) {
        <svg
          [attr.viewBox]="iconData().viewBox"
          xmlns="http://www.w3.org/2000/svg"
          [style.color]="iconColor() || iconData().color"
          fill="currentColor"
        >
          <g [innerHTML]="sanitizedSvg()"></g>
        </svg>
      } @else {
        <!-- Fallback for SSR -->
        <div
          class="svg-placeholder"
          [style.width]="iconStyles().width"
          [style.height]="iconStyles().height"
        ></div>
      }
    </a>
  `,
  styles: `
    :host {
      display: flex;
    }

    :host:hover svg {
      fill: var(--color-gold);
    }

    .social-icon-link {
      display: flex;
    }

    svg {
      transition: fill 0.3s ease;
    }

    svg:hover {
      fill: var(--color-gold);
    }
  `,
})
export class SocialIconLinkComponent {
  iconData = input.required<SocialIconData>();
  iconStyles = input<{
    width: string;
    height: string;
    backgroundColor: string;
    borderRadius: string;
    padding: string;
  }>({
    width: '2rem',
    height: '2rem',
    backgroundColor: 'initial',
    borderRadius: '0',
    padding: '0',
  });
  iconColor = input<string | null>(null);
  hoverColor = input<string | null>(null);

  private platformId = inject(PLATFORM_ID);

  isBrowser = isPlatformBrowser(this.platformId);

  #sanitizer = inject(DomSanitizer);

  sanitizedSvg = computed(() =>
    this.iconData().svg.includes('.svg')
      ? ''
      : this.#sanitizer.bypassSecurityTrustHtml(this.iconData().svg)
  );

  isPathToFile(): boolean {
    return this.iconData().svg.includes('.svg');
  }
}
