import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-seo-section',
  imports: [MatIcon],
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
