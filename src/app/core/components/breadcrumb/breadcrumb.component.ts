import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

interface BreadcrumbItem {
  label: string;
  path: string;
  isLast: boolean;
}

const ROUTE_LABELS: Record<string, string> = {
  'about-me': 'Про мене',
  services: 'Послуги',
  documents: 'Документи',
  blog: 'Блог',
  'court-cases': 'Судові справи',
  feedbacks: 'Відгуки',
  contacts: 'Контакти',
  'privacy-policy': 'Політика конфіденційності',
  'public-offer': 'Публічна оферта',
  faq: 'FAQ',
};

@Component({
  selector: 'app-breadcrumb',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatIconModule],
  template: `
    @if (breadcrumbs().length > 0) {
      <nav class="breadcrumb-strip" aria-label="Навігація по сайту">
        <div class="breadcrumb-container">
          <ol class="breadcrumb-list">
            <!-- Home -->
            <li class="breadcrumb-item">
              <a routerLink="/" class="breadcrumb-link home-link">
                <mat-icon>home</mat-icon>
                <span>Головна</span>
              </a>
            </li>

            @for (item of breadcrumbs(); track item.path; let i = $index) {
              <li class="breadcrumb-item" [style.--item-index]="i">
                <span class="breadcrumb-separator">
                  <mat-icon>chevron_right</mat-icon>
                </span>
                @if (item.isLast) {
                  <span class="breadcrumb-current">{{ item.label }}</span>
                } @else {
                  <a [routerLink]="item.path" class="breadcrumb-link">
                    {{ item.label }}
                  </a>
                }
              </li>
            }
          </ol>
        </div>
      </nav>
    }
  `,
  styles: `
    /* ==========================================================================
       BREADCRUMB STRIP - Golden Thread Navigation
       ========================================================================== */
    .breadcrumb-strip {
      position: relative;
      background: linear-gradient(
        180deg,
        rgba(245, 242, 237, 0.95) 0%,
        rgba(250, 248, 245, 0.9) 100%
      );
      border-bottom: 1px solid rgba(201, 165, 92, 0.2);

      /* Gold accent line at top */
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: linear-gradient(
          90deg,
          transparent 0%,
          var(--color-gold-light) 15%,
          var(--color-gold) 50%,
          var(--color-gold-light) 85%,
          transparent 100%
        );
      }
    }

    .breadcrumb-container {
      max-width: var(--section-max-width);
      margin: 0 auto;
      padding: 0.625rem var(--section-padding-x);
    }

    .breadcrumb-list {
      display: flex;
      align-items: center;
      gap: 0.125rem;
      margin: 0;
      padding: 0;
      list-style: none;

      /* Entrance animation */
      animation: breadcrumbSlideIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    }

    @keyframes breadcrumbSlideIn {
      from {
        opacity: 0;
        transform: translateX(-12px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    .breadcrumb-item {
      display: flex;
      align-items: center;

      /* Staggered entrance for each item */
      opacity: 0;
      animation: itemFadeIn 0.4s ease forwards;
      animation-delay: calc(0.1s + var(--item-index, 0) * 0.08s);
    }

    /* First item (Home) doesn't need stagger delay */
    .breadcrumb-item:first-child {
      animation-delay: 0.05s;
    }

    @keyframes itemFadeIn {
      from {
        opacity: 0;
        transform: translateY(-4px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* ==========================================================================
       LINKS
       ========================================================================== */
    .breadcrumb-link {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      font-family: var(--font-body);
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--color-green);
      text-decoration: none;
      transition: all 0.25s var(--ease-standard);

      &:hover {
        color: var(--color-gold-accent);
        background: rgba(201, 165, 92, 0.08);
      }

      &:active {
        transform: scale(0.98);
      }
    }

    .home-link {
      padding-left: 0.25rem;

      mat-icon {
        font-size: 1.125rem;
        width: 1.125rem;
        height: 1.125rem;
        color: var(--color-gold);
        transition: transform 0.3s var(--ease-bounce);
      }

      &:hover mat-icon {
        transform: scale(1.1);
      }
    }

    /* ==========================================================================
       SEPARATOR
       ========================================================================== */
    .breadcrumb-separator {
      display: flex;
      align-items: center;
      padding: 0 0.125rem;

      mat-icon {
        font-size: 1rem;
        width: 1rem;
        height: 1rem;
        color: rgba(201, 165, 92, 0.5);
      }
    }

    /* ==========================================================================
       CURRENT PAGE
       ========================================================================== */
    .breadcrumb-current {
      padding: 0.25rem 0.5rem;
      font-family: var(--font-body);
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--text-color-secondary);
      max-width: 200px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* ==========================================================================
       RESPONSIVE
       ========================================================================== */
    @media (max-width: 768px) {
      .breadcrumb-container {
        padding: 0.5rem var(--section-padding-x);
      }

      .breadcrumb-link,
      .breadcrumb-current {
        font-size: 0.8rem;
        padding: 0.2rem 0.375rem;
      }

      .home-link mat-icon {
        font-size: 1rem;
        width: 1rem;
        height: 1rem;
      }

      .breadcrumb-separator mat-icon {
        font-size: 0.875rem;
        width: 0.875rem;
        height: 0.875rem;
      }

      .breadcrumb-current {
        max-width: 150px;
      }
    }

    @media (max-width: 479px) {
      .breadcrumb-strip {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;

        /* Hide scrollbar */
        scrollbar-width: none;
        &::-webkit-scrollbar {
          display: none;
        }
      }

      .breadcrumb-container {
        padding: 0.4rem var(--section-padding-x);
      }

      .breadcrumb-list {
        flex-wrap: nowrap;
        min-width: max-content;
      }

      .breadcrumb-link,
      .breadcrumb-current {
        font-size: 0.75rem;
        padding: 0.15rem 0.25rem;
      }

      .home-link {
        span {
          display: none;
        }
      }

      .home-link mat-icon {
        font-size: 0.9rem;
        width: 0.9rem;
        height: 0.9rem;
      }

      .breadcrumb-current {
        max-width: 120px;
      }
    }
  `,
})
export class BreadcrumbComponent {
  #router = inject(Router);

  #urlSegments = toSignal(
    this.#router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      startWith(new NavigationEnd(0, this.#router.url, this.#router.url)),
      map(() => {
        const urlTree = this.#router.parseUrl(this.#router.url);
        return (
          urlTree.root.children['primary']?.segments.map((s) => s.path) || []
        );
      })
    ),
    { initialValue: [] }
  );

  breadcrumbs = computed<BreadcrumbItem[]>(() => {
    const segments = this.#urlSegments();

    // Don't show breadcrumbs on main page
    if (segments.length === 0) return [];

    const items: BreadcrumbItem[] = [];
    let currentPath = '';

    segments.forEach((segment, index) => {
      currentPath += '/' + segment;
      const isLast = index === segments.length - 1;

      // Get label from route map or use segment as fallback
      let label = ROUTE_LABELS[segment];

      // Handle nested routes (blog posts, court cases)
      if (!label && index > 0) {
        const parentSegment = segments[index - 1];
        if (parentSegment === 'blog') {
          label = 'Стаття';
        } else if (parentSegment === 'court-cases') {
          label = 'Справа';
        } else {
          label = segment;
        }
      }

      if (label) {
        items.push({
          label,
          path: currentPath,
          isLast,
        });
      }
    });

    return items;
  });
}
