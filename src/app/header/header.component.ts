import { Component, computed, input, output } from '@angular/core';

import { SocialIconData } from '../core/icons.data';
import { NavbarComponent } from '../navbar/navbar.component';
import { SocialIconLinkComponent } from '../social-icon-link/social-icon-link.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [
    SocialIconLinkComponent,
    NavbarComponent,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatTooltipModule,
    TitleCasePipe,
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
          @for (iconData of messengersData(); track iconData) {
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
              [matTooltip]="iconData.alt | titlecase"
              [matTooltipShowDelay]="300"
            ></app-social-icon-link>
          }
        </div>

        <a class="contacts" href="tel:+380999426056" target="_blank">
          <!-- <app-social-icon-link
            [iconData]="phoneData()"
            [iconStyles]="{
              width: '1.5rem',
              height: '1.5rem',
              backgroundColor: 'transparent',
              borderRadius: '0',
              padding: '0',
            }"
          ></app-social-icon-link> -->
          +38 (099) 942-60-56
        </a>
      </div>

      <app-navbar></app-navbar>

      <div class="contacts--sm">
        <a href="tel:+380999426056" target="_blank"> +38 (099) 942-60-56 </a>

        <div class="social-icons">
          @for (iconData of messengersData(); track iconData) {
            <app-social-icon-link
              iconColor="#fff"
              [iconData]="iconData"
              [iconStyles]="{
                width: '2rem',
                height: '2rem',
                backgroundColor: 'transparent',
                borderRadius: '0',
                padding: '0.3rem',
              }"
            ></app-social-icon-link>
          }
        </div>
      </div>
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
      font-weight: 600;
      text-decoration: none;
    }

    .contacts:hover {
      color: var(--color-gold);
    }

    .menu-button {
      display: none;
    }

    .contacts--sm {
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

      .contacts--sm {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 0.5rem;
        text-decoration: none;

        background: linear-gradient(
          180deg,
          rgba(0, 0, 0, 1) 0%,
          rgba(0, 39, 6, 1) 20%
        );
        width: 100%;
        box-shadow:
          rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
          rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
        padding: 1rem 1rem 0.5rem;
      }

      .contacts--sm a {
        font-weight: 600;
        color: white;
      }

      .contacts--sm .social-icons {
        display: flex;
        gap: 0.5rem;
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

  messengersData = computed(() => {
    const desiredOrder = ['e-mail', 'viber', 'telegram', 'whatsApp'];

    return this.iconsData()
      .filter(
        (icon) =>
          icon.alt === 'e-mail' ||
          icon.alt === 'telegram' ||
          icon.alt === 'viber' ||
          icon.alt === 'whatsApp'
      )
      .sort((a, b) => {
        const indexA = desiredOrder.indexOf(a.alt);
        const indexB = desiredOrder.indexOf(b.alt);
        return indexA - indexB;
      });
  });

  toggleDrawer = output<void>();
}
