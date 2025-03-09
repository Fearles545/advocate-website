import { Component, input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SocialIconData } from '../core/icons.data';

@Component({
  selector: 'app-social-icon-link',
  imports: [],
  template: `
    <a class="social-icon-link" [href]="iconData().link" target="_blank">
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        [style.color]="iconData().color"
        fill="currentColor"
      >
        <g [innerHTML]="sanitizedSvg"></g>
      </svg>
    </a>
  `,
  styles: `
  .social-icon-link {
    display: inline-block;
    width: 2rem;
    height: 2rem;
  }

  svg {
    transition: fill 0.3s ease;
  }
  
  .social-icon-link:hover svg {
    fill: #fff;
  }
  `,
})
export class SocialIconLinkComponent {
  iconData = input.required<SocialIconData>();
  sanitizedSvg!: SafeHtml;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    if (!this.isPathToFile()) {
      this.sanitizedSvg = this.sanitizer.bypassSecurityTrustHtml(
        this.iconData().svg
      );
    }
  }

  isPathToFile(): boolean {
    return this.iconData().svg.includes('.svg');
  }

  // This function creates a CSS filter to recolor the SVG when using as an image
  getColorFilter(): string {
    // A simple approach - you may need a more sophisticated color conversion
    // This just applies a color overlay
    const color = this.iconData().color;
    if (color === 'blue') {
      return 'invert(39%) sepia(57%) saturate(3557%) hue-rotate(206deg) brightness(98%) contrast(99%)';
    }
    return '';
  }
}
