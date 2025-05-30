import { Component, input, output } from '@angular/core';

import { SocialIconData } from '../core/icons.data';
import { NavbarComponent } from '../navbar/navbar.component';
import { SocialIconLinkComponent } from '../social-icon-link/social-icon-link.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    SocialIconLinkComponent,
    NavbarComponent,
    MatButtonModule,
    MatIconModule,
    RouterLink,
  ],
  template: `
    <header>
      <div class="container">
        <a routerLink="/main" class="left-content">
          <img
            class="logo"
            src="assets/logo/logo-white-transparent.png"
            alt="Адвокат Поддяча Юлія Юріївна"
          />
          <div class="center-content">
            <p>Адвокат по пенсіях</p>

            <p>Поддяча Юлія Юріївна</p>
          </div>
        </a>

        <button
          class="menu-button"
          mat-icon-button
          [disableRipple]="false"
          color="accent"
          (click)="toggleDrawer.emit()"
        >
          <mat-icon>menu</mat-icon>
        </button>

        <div class="social-icons">
          @for (iconData of iconsData(); track iconData) {
            <app-social-icon-link
              iconColor="#000"
              [iconData]="iconData"
              [iconStyles]="{
                width: '2.5rem',
                height: '2.5rem',
                backgroundColor: '#fff',
                borderRadius: '50%',
                padding: '0.3rem',
              }"
            ></app-social-icon-link>
          }
        </div>

        <a class="contacts" href="tel:+380999426056" target="_blank">
          <app-social-icon-link [iconData]="phoneData()"></app-social-icon-link>
          +38 (099) 942-60-56
        </a>
      </div>

      <app-navbar></app-navbar>
    </header>
  `,
  styles: `
    header {
      background-color: #000;
    }

    .container {
      max-width: var(--container-max-width);
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
    }

    .left-content {
      display: flex;
      gap: 1rem;
    }

    .center-content {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      color: white;
      font-size: 1rem;
    }

    .logo {
      width: 5rem;
      height: auto;
    }

    .social-icons {
      display: flex;
      gap: 1rem;
    }

    .social-icon-link {
      display: inline-block;
      width: 2rem;
      height: 2rem;
    }

    .social-icon-link img {
      fill: blue;
    }

    .contacts {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      color: white;
      text-decoration: none;
    }

    .menu-button {
      display: none;
    }

    @media (max-width: 1919px) {
    }

    @media (max-width: 1535px) {
    }

    @media (max-width: 1279px) {
    }

    @media (max-width: 1023px) {
    }

    @media (max-width: 800px) {
      .social-icons,
      .contacts {
        display: none;
      }

      app-navbar {
        display: none;
      }

      .menu-button {
        display: block;
      }
    }

    @media (max-width: 479px) {
      .container {
        padding: 1rem;
      }
    }

    @media (max-width: 320px) {
      .container {
        padding: 0.5rem 0.25rem;
      }

      .left-content,
      .center-content {
        gap: 0.25rem;
      }
    }
  `,
})
export class HeaderComponent {
  iconsData = input.required<SocialIconData[]>();
  phoneData = input.required<SocialIconData>();

  toggleDrawer = output<void>();
}
