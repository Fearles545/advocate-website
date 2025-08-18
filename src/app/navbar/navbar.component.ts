import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NAV_ITEMS, type NavItem } from '../core/config/nav-items.config';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <section class="nav-container">
      <nav class="navbar">
        @for (navItem of navItems; track navItem.route) {
          <li>
            <a
              [routerLink]="navItem.route"
              routerLinkActive="active"
              [routerLinkActiveOptions]="{ exact: navItem.exact || false }"
            >
              {{ navItem.label }}
            </a>
          </li>
          @if (!$last) {
            |
          }
        }
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

    @media (max-width: 1000px) {
      .navbar {
        font-size: 1.25rem;
        gap: 1.5rem;
      }
    }

    @media (max-width: 900px) {
      .navbar {
        font-size: 1rem;
      }
    }
  `,
})
export class NavbarComponent {
  readonly navItems: NavItem[] = NAV_ITEMS;
}
