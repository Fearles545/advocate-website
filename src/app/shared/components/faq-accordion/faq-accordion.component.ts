import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';

export interface FaqItem {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-faq-accordion',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatExpansionModule],
  template: `
    <mat-accordion class="faq-accordion">
      @for (faq of items(); track faq.question) {
        <mat-expansion-panel>
          <mat-expansion-panel-header>
            <mat-panel-title>{{ faq.question }}</mat-panel-title>
          </mat-expansion-panel-header>
          <p>{{ faq.answer }}</p>
        </mat-expansion-panel>
      }
    </mat-accordion>
  `,
  styles: `
    :host {
      display: block;
    }

    .faq-accordion {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .mat-expansion-panel-spacing {
      margin: 0 !important;
    }

    .faq-accordion ::ng-deep .mat-expansion-panel {
      background: white;
      border-radius: 0.75rem !important;
      box-shadow: none !important;
      border: 1px solid rgba(0, 39, 6, 0.1);
      overflow: hidden;
      transition:
        border-color 0.3s ease,
        box-shadow 0.3s ease;
    }

    .faq-accordion ::ng-deep .mat-expansion-panel:hover {
      border-color: rgba(201, 165, 92, 0.4);
    }

    .faq-accordion ::ng-deep .mat-expansion-panel.mat-expanded {
      border-color: #c9a55c;
      box-shadow:
        0 4px 16px rgba(0, 39, 6, 0.08),
        0 2px 8px rgba(0, 39, 6, 0.04) !important;
    }

    .faq-accordion ::ng-deep .mat-expansion-panel-header {
      padding: 0.875rem 1rem;
      height: auto !important;
      min-height: unset !important;
      border-radius: 0.75rem;
    }

    .faq-accordion ::ng-deep .mat-expansion-panel-header:hover {
      background: rgba(201, 165, 92, 0.06) !important;
    }

    .faq-accordion ::ng-deep .mat-expansion-panel-body {
      padding: 0 1.25rem 1.25rem;
    }

    /* Gold arrow indicator */
    .faq-accordion ::ng-deep .mat-expansion-indicator::after {
      color: #c9a55c !important;
    }

    /* Panel title base style */
    .faq-accordion ::ng-deep .mat-expansion-panel-header-title {
      font-size: 0.9rem;
      color: #002706;
      line-height: 1.5;
      transition:
        color 0.3s ease,
        font-weight 0.3s ease;
    }

    /* Active/expanded title - more prominent */
    .faq-accordion ::ng-deep .mat-expanded .mat-expansion-panel-header-title {
      font-weight: 600;
      color: #c9a55c;
    }

    .faq-accordion p {
      margin: 0;
      font-size: 0.85rem;
      line-height: 1.75;
      color: #374151;
    }

    /* Tablet and up */
    @media (min-width: 600px) {
      .faq-accordion ::ng-deep .mat-expansion-panel-header {
        padding: 1.25rem 1.5rem;
      }

      .faq-accordion ::ng-deep .mat-expansion-panel-body {
        padding: 0 1.5rem 1.5rem;
      }

      .faq-accordion ::ng-deep .mat-expansion-panel-header-title {
        font-size: 1.05rem;
      }

      .faq-accordion p {
        font-size: 1rem;
      }
    }
  `,
})
export class FaqAccordionComponent {
  items = input.required<FaqItem[]>();
}
