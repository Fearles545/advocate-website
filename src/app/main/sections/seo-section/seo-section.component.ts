import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { CtaButtonComponent } from '@shared/components/cta-button';

@Component({
  selector: 'app-seo-section',
  imports: [MatIcon, CtaButtonComponent],
  templateUrl: './seo-section.component.html',
  styleUrl: './seo-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeoSectionComponent {
  isSeoExpanded = signal(false);

  toggleSeoSection(): void {
    this.isSeoExpanded.update((v) => !v);
  }
}
