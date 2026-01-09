import { Component, ElementRef, HostListener, viewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NAV_ITEMS, type NavItem } from '../core/config/nav-items.config';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar-container">
      <ul class="navbar">
        @for (navItem of mainNavItems; track navItem.route; let last = $last) {
          <li>
            <a
              [routerLink]="navItem.route"
              routerLinkActive="active"
              [routerLinkActiveOptions]="{ exact: navItem.exact || false }"
            >
              {{ navItem.label }}
            </a>
          </li>
          <span class="separator" aria-hidden="true"></span>
        }

        <li class="more-menu">
          <details #detailsEl>
            <summary>
              Ще
              <svg
                class="chevron"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
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
      </ul>
    </nav>
  `,
  styles: `
    /* ==========================================================================
       NAVBAR - Desktop Navigation
       ========================================================================== */
    .navbar-container {
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 1) 0%,
        rgba(0, 39, 6, 1) 25%
      );
      width: 100%;
      padding: 1.25rem 2rem 1rem;
    }

    .navbar {
      max-width: var(--container-max-width);
      margin: 0 auto;
      list-style: none;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0;
      padding: 0;
    }

    .navbar a {
      color: white;
      font-size: 1.1rem;
      font-weight: 500;
      text-decoration: none;
      padding: 0.5rem 1.25rem;
      transition: color 0.3s ease;
      position: relative;
    }

    .navbar a::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 2px;
      background: var(--color-gold);
      transition: width 0.3s ease;
    }

    .navbar a:hover {
      color: var(--color-gold);
    }

    .navbar a:hover::after {
      width: calc(100% - 2rem);
    }

    .navbar a.active {
      color: var(--color-gold);
    }

    .navbar a.active::after {
      width: calc(100% - 2rem);
    }

    .separator {
      color: rgba(255, 255, 255, 0.25);
      font-size: 0.75rem;
      user-select: none;
    }

    /* ==========================================================================
       MORE DROPDOWN
       ========================================================================== */
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
      color: white;
      font-size: 1.1rem;
      font-weight: 500;
      padding: 0.5rem 1.25rem;
      transition: color 0.3s ease;

      &::-webkit-details-marker {
        display: none;
      }

      &:hover {
        color: var(--color-gold);
      }
    }

    details[open] summary {
      color: var(--color-gold);
    }

    .chevron {
      width: 1em;
      height: 1em;
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

        &::after {
          display: none;
        }

        &:hover {
          background: rgba(201, 165, 92, 0.15);
        }

        &.active {
          color: var(--color-gold);
          background: rgba(201, 165, 92, 0.1);
        }
      }
    }

    /* ==========================================================================
       RESPONSIVE: LARGE SCREENS
       ========================================================================== */
    @media (max-width: 1279px) {
      .navbar a,
      summary {
        font-size: 1rem;
        padding: 0.5rem 1rem;
      }
    }

    @media (max-width: 1100px) {
      .navbar a,
      summary {
        font-size: 0.95rem;
        padding: 0.5rem 0.75rem;
      }

      .separator {
        display: none;
      }
    }

    @media (max-width: 1000px) {
      .navbar a,
      summary {
        font-size: 0.9rem;
        padding: 0.4rem 0.6rem;
      }
    }
  `,
})
export class NavbarComponent {
  private readonly moreLabels = ['Документи'];
  private readonly detailsEl =
    viewChild<ElementRef<HTMLDetailsElement>>('detailsEl');

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
