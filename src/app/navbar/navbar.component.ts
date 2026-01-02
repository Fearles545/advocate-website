import { Component, ElementRef, HostListener, viewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NAV_ITEMS, type NavItem } from '../core/config/nav-items.config';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <section class="nav-container">
      <nav class="navbar">
        @for (navItem of mainNavItems; track navItem.route) {
          <li>
            <a
              [routerLink]="navItem.route"
              routerLinkActive="active"
              [routerLinkActiveOptions]="{ exact: navItem.exact || false }"
            >
              {{ navItem.label }}
            </a>
          </li>
          <span class="separator">|</span>
        }

        <li class="more-menu">
          <details #detailsEl>
            <summary>
              Ще
              <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </summary>
            <ul class="dropdown">
              @for (navItem of moreNavItems; track navItem.route) {
                <li>
                  <a
                    [routerLink]="navItem.route"
                    routerLinkActive="active"
                    (click)="closeDropdown()"
                  >
                    {{ navItem.label }}
                  </a>
                </li>
              }
            </ul>
          </details>
        </li>
      </nav>
    </section>
  `,
  styles: `
    .nav-container {
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 1) 0%,
        rgba(0, 39, 6, 1) 20%
      );
      width: 100%;
      box-shadow:
        rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
        rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
      padding: 1.5rem 0 1rem;
    }

    .navbar {
      font-size: 1.4rem;
      font-weight: 500;
      list-style-type: none;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 2rem;
      color: white;
    }

    .navbar li {
      cursor: pointer;
    }

    .navbar li:hover,
    .active {
      cursor: pointer;
      color: #bb925c;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    .separator {
      opacity: 0.5;
    }

    .more-menu {
      position: relative;
    }

    details {
      position: relative;
    }

    summary {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      cursor: pointer;
      list-style: none;
      transition: color 0.2s ease;

      &::-webkit-details-marker {
        display: none;
      }

      &:hover {
        color: #bb925c;
      }
    }

    .chevron {
      width: 1.1em;
      height: 1.1em;
      transition: transform 0.2s ease;
    }

    details[open] .chevron {
      transform: rotate(180deg);
    }

    .dropdown {
      position: absolute;
      top: calc(100% + 0.75rem);
      left: 50%;
      transform: translateX(-50%);
      min-width: 160px;
      background: var(--color-green);
      border: 1px solid rgba(201, 165, 92, 0.3);
      border-radius: 0.5rem;
      box-shadow:
        0 4px 20px rgba(0, 0, 0, 0.3),
        0 2px 8px rgba(0, 0, 0, 0.2);
      padding: 0.5rem 0;
      list-style: none;
      z-index: 100;

      li {
        padding: 0;
      }

      a {
        display: block;
        padding: 0.6rem 1rem;
        font-size: 1rem;
        transition: background 0.15s ease;

        &:hover {
          background: rgba(201, 165, 92, 0.15);
        }

        &.active {
          color: var(--color-gold);
          background: rgba(201, 165, 92, 0.1);
        }
      }
    }

    @media (max-width: 1200px) {
      .navbar {
        font-size: 1.25rem;
        gap: 1.5rem;
      }

      .separator {
        display: none;
      }
    }

    @media (max-width: 1000px) {
      .navbar {
        font-size: 1.1rem;
        gap: 1.25rem;
      }
    }

    @media (max-width: 900px) {
      .navbar {
        font-size: 1rem;
        gap: 1rem;
      }
    }
  `,
})
export class NavbarComponent {
  private readonly moreLabels = ['Документи'];
  private readonly detailsEl = viewChild<ElementRef<HTMLDetailsElement>>('detailsEl');

  readonly mainNavItems: NavItem[] = NAV_ITEMS.filter(
    (item) => !this.moreLabels.includes(item.label)
  );

  readonly moreNavItems: NavItem[] = NAV_ITEMS.filter((item) =>
    this.moreLabels.includes(item.label)
  );

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const details = this.detailsEl()?.nativeElement;
    if (details?.open && !details.contains(event.target as Node)) {
      details.open = false;
    }
  }

  closeDropdown(): void {
    const details = this.detailsEl()?.nativeElement;
    if (details) {
      details.open = false;
    }
  }
}
