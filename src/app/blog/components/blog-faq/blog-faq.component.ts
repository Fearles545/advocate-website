import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { BlogCategorySlug } from '../../blog-categories';
import { getFaqForCategory, FaqItem } from '../../blog-faq-data';

@Component({
  selector: 'app-blog-faq',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    @if (faq()) {
      <section class="faq-section">
        <header class="faq-header">
          <div class="header-icon">
            <mat-icon>quiz</mat-icon>
          </div>
          <h2>{{ faq()!.title }}</h2>
        </header>

        <div class="faq-list">
          @for (item of faq()!.items; track item.question; let i = $index) {
            <div
              class="faq-item"
              [class.expanded]="expandedIndex() === i"
              (click)="toggleItem(i)"
            >
              <button class="faq-question" type="button">
                <span>{{ item.question }}</span>
                <mat-icon>{{
                  expandedIndex() === i ? 'expand_less' : 'expand_more'
                }}</mat-icon>
              </button>
              @if (expandedIndex() === i) {
                <div class="faq-answer">
                  <p>{{ item.answer }}</p>
                </div>
              }
            </div>
          }
        </div>
      </section>
    }
  `,
  styles: `
    :host {
      display: block;
    }

    .faq-section {
      padding: 1.5rem;
      background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.95) 0%,
        rgba(201, 165, 92, 0.06) 100%
      );
    }

    .faq-header {
      display: flex;
      align-items: center;
      gap: 0.875rem;
      margin-bottom: 1.25rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid rgba(201, 165, 92, 0.15);
    }

    .header-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2.75rem;
      height: 2.75rem;
      background: linear-gradient(
        135deg,
        var(--color-green) 0%,
        var(--color-green-dark) 100%
      );
      border-radius: 50%;
      flex-shrink: 0;

      mat-icon {
        font-size: 1.375rem;
        width: 1.375rem;
        height: 1.375rem;
        color: var(--color-gold);
      }
    }

    h2 {
      margin: 0;
      font-size: 1.125rem;
      font-weight: 700;
      color: var(--color-green);
      line-height: 1.3;
    }

    .faq-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .faq-item {
      background: white;
      border-radius: 0.625rem;
      border: 1px solid rgba(201, 165, 92, 0.12);
      overflow: hidden;
      transition: all 0.2s ease;

      &:hover {
        border-color: rgba(201, 165, 92, 0.3);
      }

      &.expanded {
        border-color: rgba(201, 165, 92, 0.4);
        box-shadow: 0 2px 8px rgba(0, 39, 6, 0.06);
      }
    }

    .faq-question {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      width: 100%;
      padding: 1rem 1.25rem;
      background: none;
      border: none;
      cursor: pointer;
      text-align: left;
      font-size: 0.95rem;
      font-weight: 600;
      color: var(--color-green);
      line-height: 1.4;
      transition: color 0.2s ease;

      &:hover {
        color: var(--color-gold-accent);
      }

      mat-icon {
        font-size: 1.5rem;
        width: 1.5rem;
        height: 1.5rem;
        color: var(--color-gold);
        flex-shrink: 0;
      }
    }

    .faq-answer {
      padding: 0 1.25rem 1.25rem;
      animation: fadeIn 0.2s ease;

      p {
        margin: 0;
        font-size: 0.9rem;
        line-height: 1.6;
        color: var(--color-text-secondary);
      }
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-4px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @media (max-width: 768px) {
      .faq-section {
        padding: 1.25rem;
      }

      .faq-header {
        gap: 0.75rem;
        margin-bottom: 1rem;
        padding-bottom: 0.875rem;
      }

      .header-icon {
        width: 2.5rem;
        height: 2.5rem;

        mat-icon {
          font-size: 1.25rem;
          width: 1.25rem;
          height: 1.25rem;
        }
      }

      h2 {
        font-size: 1rem;
      }

      .faq-question {
        padding: 0.875rem 1rem;
        font-size: 0.9rem;
        gap: 0.75rem;

        mat-icon {
          font-size: 1.375rem;
          width: 1.375rem;
          height: 1.375rem;
        }
      }

      .faq-answer {
        padding: 0 1rem 1rem;

        p {
          font-size: 0.85rem;
        }
      }
    }

    @media (max-width: 479px) {
      .faq-section {
        padding: 1rem;
      }

      .header-icon {
        width: 2.25rem;
        height: 2.25rem;

        mat-icon {
          font-size: 1.125rem;
          width: 1.125rem;
          height: 1.125rem;
        }
      }

      h2 {
        font-size: 0.95rem;
      }

      .faq-question {
        padding: 0.75rem;
        font-size: 0.85rem;
      }

      .faq-answer {
        padding: 0 0.75rem 0.875rem;

        p {
          font-size: 0.8rem;
        }
      }
    }
  `,
})
export class BlogFaqComponent {
  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);

  category = input<BlogCategorySlug>();

  readonly faq = computed(() => getFaqForCategory(this.category()));
  readonly expandedIndex = signal<number | null>(null);

  constructor() {
    effect(() => {
      const faqData = this.faq();
      if (faqData && isPlatformBrowser(this.platformId)) {
        this.injectJsonLd(faqData.items);
      }
    });
  }

  toggleItem(index: number): void {
    this.expandedIndex.update((current) => (current === index ? null : index));
  }

  private injectJsonLd(items: FaqItem[]): void {
    const existingScript = this.document.getElementById('faq-jsonld');
    if (existingScript) {
      existingScript.remove();
    }

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: items.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    };

    const script = this.document.createElement('script');
    script.id = 'faq-jsonld';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(jsonLd);
    this.document.head.appendChild(script);
  }
}
