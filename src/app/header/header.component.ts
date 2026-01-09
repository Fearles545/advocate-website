import { Component, computed, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { SocialIconData } from '../core/icons.data';
import { NavbarComponent } from '../navbar/navbar.component';
import { SocialIconLinkComponent } from '../social-icon-link/social-icon-link.component';

@Component({
  selector: 'app-header',
  imports: [
    SocialIconLinkComponent,
    NavbarComponent,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatTooltipModule,
  ],
  template: `
    <header>
      <div class="header-container">
        <!-- Brand -->
        <a routerLink="/" class="brand">
          <img
            class="logo"
            src="assets/logo/logo-white-transparent.png"
            alt="Адвокат Поддяча Юлія Юріївна"
          />
          <div class="brand-text">
            <span class="brand-title">Адвокат по пенсіях</span>
            <span class="brand-name">Поддяча Юлія Юріївна</span>
          </div>
        </a>

        <!-- Mobile: Burger menu (animated) -->
        <button
          class="menu-button"
          [class.is-open]="isDrawerOpen()"
          (click)="toggleDrawer.emit()"
          [attr.aria-label]="isDrawerOpen() ? 'Закрити меню' : 'Відкрити меню'"
          aria-expanded="false"
        >
          <span class="burger-line"></span>
          <span class="burger-line"></span>
          <span class="burger-line"></span>
        </button>

        <!-- Desktop: Contact actions -->
        <div class="header-actions">
          <!-- Messengers -->
          <div class="messenger-icons">
            @for (iconData of messengersData(); track iconData.alt) {
              <a
                [href]="iconData.link"
                target="_blank"
                class="messenger-link"
                [matTooltip]="iconData.name"
                [matTooltipShowDelay]="300"
                [attr.aria-label]="iconData.name"
              >
                <app-social-icon-link
                  [iconData]="iconData"
                  [iconColor]="'var(--color-gold)'"
                  [iconStyles]="{
                    width: '1.25rem',
                    height: '1.25rem',
                    backgroundColor: 'transparent',
                    borderRadius: '0',
                    padding: '0',
                  }"
                />
              </a>
            }
          </div>

          <!-- Phone -->
          <a class="phone-link" href="tel:+380999426056">
            <span class="phone-icon">
              <mat-icon>phone</mat-icon>
            </span>
            <span class="phone-number">+38 (099) 942-60-56</span>
          </a>
        </div>
      </div>

      <!-- Desktop: Navigation -->
      <app-navbar />

      <!-- Mobile: Contact bar -->
      <div class="mobile-contact-bar">
        <a href="tel:+380999426056" class="mobile-phone">
          <mat-icon>phone</mat-icon>
          <span>+38 (099) 942-60-56</span>
        </a>

        <div class="mobile-messengers">
          @for (iconData of messengersData(); track iconData.alt) {
            <a
              [href]="iconData.link"
              target="_blank"
              class="mobile-messenger-link"
              [attr.aria-label]="iconData.name"
            >
              <app-social-icon-link
                [iconData]="iconData"
                [iconColor]="'var(--color-gold)'"
                [iconStyles]="{
                  width: '1.5rem',
                  height: '1.5rem',
                  backgroundColor: 'transparent',
                  borderRadius: '0',
                  padding: '0',
                }"
              />
            </a>
          }
        </div>
      </div>
    </header>
  `,
  styles: `
    /* ==========================================================================
       HEADER - Premium Dark Theme
       ========================================================================== */
    header {
      background: #000;
      position: relative;
    }

    /* ==========================================================================
       MAIN HEADER ROW
       ========================================================================== */
    .header-container {
      max-width: var(--container-max-width);
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      gap: 1.5rem;
    }

    /* ==========================================================================
       BRAND
       ========================================================================== */
    .brand {
      display: flex;
      align-items: center;
      gap: 1rem;
      text-decoration: none;
      transition: opacity 0.3s ease;
    }

    .brand:hover {
      opacity: 0.85;
    }

    .logo {
      width: 4.5rem;
      height: auto;
      filter: drop-shadow(0 2px 8px rgba(201, 165, 92, 0.15));
      transition: filter 0.3s ease;
    }

    .brand:hover .logo {
      filter: drop-shadow(0 2px 12px rgba(201, 165, 92, 0.25));
    }

    .brand-text {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .brand-title {
      font-size: 0.9rem;
      font-weight: 500;
      color: var(--color-gold);
      letter-spacing: 0.5px;
      text-transform: uppercase;
      opacity: 0.9;
    }

    .brand-name {
      font-size: 1.1rem;
      font-weight: 600;
      color: white;
      line-height: 1.3;
    }

    /* ==========================================================================
       HEADER ACTIONS (Desktop)
       ========================================================================== */
    .header-actions {
      display: flex;
      align-items: center;
      gap: 1.75rem;
    }

    /* Messenger Icons */
    .messenger-icons {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .messenger-link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2.25rem;
      height: 2.25rem;
      background: rgba(201, 165, 92, 0.1);
      border: 1px solid rgba(201, 165, 92, 0.25);
      border-radius: 50%;
      transition: all 0.3s ease;
    }

    .messenger-link:hover {
      background: rgba(201, 165, 92, 0.2);
      border-color: var(--color-gold);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(201, 165, 92, 0.2);
    }

    .messenger-link app-social-icon-link {
      display: flex;
    }

    /* Phone Link */
    .phone-link {
      display: flex;
      align-items: center;
      gap: 0.625rem;
      text-decoration: none;
      padding: 0.5rem 1rem 0.5rem 0.5rem;
      background: rgba(201, 165, 92, 0.08);
      border: 1px solid rgba(201, 165, 92, 0.2);
      border-radius: 2rem;
      transition: all 0.3s ease;
    }

    .phone-link:hover {
      background: rgba(201, 165, 92, 0.15);
      border-color: rgba(201, 165, 92, 0.4);
      transform: translateY(-1px);
    }

    .phone-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1.75rem;
      height: 1.75rem;
      background: linear-gradient(
        135deg,
        var(--color-gold) 0%,
        var(--color-gold-dark) 100%
      );
      border-radius: 50%;
      box-shadow: 0 2px 8px rgba(201, 165, 92, 0.3);
    }

    .phone-icon mat-icon {
      font-size: 1rem;
      width: 1rem;
      height: 1rem;
      color: var(--color-green-darkest);
    }

    .phone-number {
      font-size: 0.95rem;
      font-weight: 600;
      color: white;
      letter-spacing: 0.3px;
    }

    .phone-link:hover .phone-number {
      color: var(--color-gold);
    }

    /* ==========================================================================
       MOBILE MENU BUTTON (Animated Burger)
       ========================================================================== */
    .menu-button {
      display: none;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 5px;
      width: 44px;
      height: 44px;
      padding: 10px;
      background: transparent;
      border: none;
      cursor: pointer;
      z-index: 1001;
    }

    .burger-line {
      display: block;
      width: 24px;
      height: 2px;
      background: white;
      border-radius: 2px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      transform-origin: center;
    }

    .menu-button:hover .burger-line {
      background: var(--color-gold);
    }

    /* Burger to X transformation */
    .menu-button.is-open .burger-line:nth-child(1) {
      transform: translateY(7px) rotate(45deg);
      background: var(--color-gold);
    }

    .menu-button.is-open .burger-line:nth-child(2) {
      opacity: 0;
      transform: scaleX(0);
    }

    .menu-button.is-open .burger-line:nth-child(3) {
      transform: translateY(-7px) rotate(-45deg);
      background: var(--color-gold);
    }

    /* ==========================================================================
       MOBILE CONTACT BAR
       ========================================================================== */
    .mobile-contact-bar {
      display: none;
    }

    /* ==========================================================================
       RESPONSIVE
       ========================================================================== */
    @media (max-width: 1100px) {
      .phone-number {
        display: none;
      }

      .phone-link {
        padding: 0.5rem;
        border-radius: 50%;
      }

      .phone-icon {
        width: 2rem;
        height: 2rem;
      }

      .phone-icon mat-icon {
        font-size: 1.1rem;
        width: 1.1rem;
        height: 1.1rem;
      }
    }

    @media (max-width: 899px) {
      .header-actions {
        display: none;
      }

      app-navbar {
        display: none;
      }

      .menu-button {
        display: flex;
      }

      .menu-button.is-open {
        position: fixed;
        top: 1rem;
        right: 1rem;
      }

      .mobile-contact-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.875rem 1.25rem;
        background: linear-gradient(
          180deg,
          rgba(0, 0, 0, 1) 0%,
          rgba(0, 39, 6, 1) 40%
        );
      }

      .mobile-phone {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: white;
        font-size: 1rem;
        font-weight: 600;
        text-decoration: none;
        transition: color 0.3s ease;
      }

      .mobile-phone mat-icon {
        font-size: 1.25rem;
        width: 1.25rem;
        height: 1.25rem;
        color: var(--color-gold);
      }

      .mobile-phone:hover,
      .mobile-phone:active {
        color: var(--color-gold);
      }

      .mobile-messengers {
        display: flex;
        gap: 0.625rem;
      }

      .mobile-messenger-link {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2.25rem;
        height: 2.25rem;
        background: rgba(201, 165, 92, 0.1);
        border: 1px solid rgba(201, 165, 92, 0.25);
        border-radius: 50%;
        transition: all 0.3s ease;
      }

      .mobile-messenger-link:active {
        background: rgba(201, 165, 92, 0.25);
        border-color: var(--color-gold);
      }

      .mobile-messenger-link app-social-icon-link {
        display: flex;
      }
    }

    @media (max-width: 479px) {
      .header-container {
        padding: 0.875rem 1rem;
      }

      .logo {
        width: 3.5rem;
      }

      .brand-title {
        font-size: 0.75rem;
      }

      .brand-name {
        font-size: 0.95rem;
      }

      .mobile-contact-bar {
        padding: 0.75rem 1rem;
      }

      .mobile-phone {
        font-size: 0.9rem;
      }
    }

    @media (max-width: 359px) {
      .brand-title {
        display: none;
      }

      .brand-name {
        font-size: 0.9rem;
      }

      .mobile-phone span {
        display: none;
      }

      .mobile-phone mat-icon {
        font-size: 1.5rem;
        width: 1.5rem;
        height: 1.5rem;
      }
    }
  `,
})
export class HeaderComponent {
  iconsData = input.required<SocialIconData[]>();
  isDrawerOpen = input<boolean>(false);

  messengersData = computed(() => {
    const desiredOrder = ['e-mail', 'viber', 'telegram', 'whatsApp'];

    return this.iconsData()
      .filter(
        (icon) =>
          icon.alt === 'telegram' ||
          icon.alt === 'viber' ||
          icon.alt === 'whatsApp' ||
          icon.alt === 'e-mail'
      )
      .sort((a, b) => {
        const indexA = desiredOrder.indexOf(a.alt);
        const indexB = desiredOrder.indexOf(b.alt);
        return indexA - indexB;
      });
  });

  toggleDrawer = output<void>();
}
