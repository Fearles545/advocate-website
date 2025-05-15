import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <section class="nav-container">
      <nav class="navbar">
        <li>
          <a routerLink="main" routerLinkActive="active">Головна</a>
        </li>
        |
        <li>
          <a routerLink="about-me" routerLinkActive="active">Про мене</a>
        </li>
        |
        <li>
          <a>Послуги</a>
        </li>
        |
        <li>
          <a routerLink="documents" routerLinkActive="active">Мої документи</a>
        </li>
        |
        <li>
          <a>Блог</a>
        </li>
        |
        <li>
          <a routerLink="contacts" routerLinkActive="active">Контакти</a>
        </li>
      </nav>
    </section>
  `,
  styles: `
    .nav-container {
      /* background-color: var(--color-green); */
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 1) 0%,
        rgba(0, 39, 6, 1) 20%
      );
      width: 100%;
      padding: 1rem;
      box-shadow:
        rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
        rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
      padding: 2rem 0 1.5rem;
    }

    .navbar {
      font-size: 1.2rem;
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
      // text-decoration: underline;
      color: #bb925c;
    }

    a {
      color: inherit;
      text-decoration: none;
    }
  `,
})
export class NavbarComponent {}
