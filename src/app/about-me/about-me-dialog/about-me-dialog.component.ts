import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-about-me-dialog',
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <h2
      mat-dialog-title
      [style]="{
        backgroundImage:
          'linear-gradient(
          180deg,
          rgba(204, 228, 247, 1) 11.2%,
          rgba(237, 246, 250, 1) 100.2%
        )',
        margin: '0',
        borderBottom: '1px solid var(--color-green)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.5rem 0.5rem 0.5rem 1rem',
        fontWeight: '600',
        fontSize: '1.35rem',
        color: '#000000a1',
      }"
    >
      <span>Професійна біографія</span>

      <button mat-icon-button mat-dialog-close>
        <mat-icon>close</mat-icon>
      </button>
    </h2>
    <mat-dialog-content
      [style]="{
        backgroundImage:
          'linear-gradient(
          0deg,
          rgba(204, 228, 247, 1) 11.2%,
          rgba(237, 246, 250, 1) 100.2%
        )',
        padding: '0',
      }"
    >
      <ul class="profile-list">
        <li class="profile-list-item">
          <span class="profile-list-date"> 2010-2015 </span>

          <span>-</span>

          <span class="profile-list-value">
            навчання у Національному юридичному університеті імені Ярослава
            Мудрого
          </span>
        </li>

        <li class="profile-list-item">
          <span class="profile-list-date"> 2015-2016 </span>

          <span>-</span>

          <span class="profile-list-value">
            державний реєстратор у Східному міжрегіональному управлінні
            Міністерства юстиції
          </span>
        </li>

        <li class="profile-list-item">
          <span class="profile-list-date"> 2016-2017 </span>

          <span>-</span>

          <span class="profile-list-value">
            юрисконсульт у Недригайлівській районній раді
          </span>
        </li>

        <li class="profile-list-item">
          <span class="profile-list-date"> 2018-2021 </span>

          <span>-</span>

          <span class="profile-list-value">
            головний спеціаліст-юрисконсульт відділу представництва інтересів в
            судах та інших органах Головного управління Пенсійного фонду України
            в Харківській області
          </span>
        </li>

        <li class="profile-list-item">
          <span class="profile-list-date"> з 23.06.2021 </span>

          <span>-</span>

          <span class="profile-list-value"> адвокат з пенсійних справ </span>
        </li>
      </ul>
    </mat-dialog-content>
  `,
  styles: `
    .mat-mdc-dialog-title::before {
      display: none;
    }

    .profile-list {
      padding: 1rem 1rem 1rem 2rem;
      line-height: 1.25;
    }

    .profile-list-item {
      color: var(--color-green);
      font-size: 1.2rem;
      font-weight: 500;
      margin-bottom: 1rem;
    }

    .profile-list-date {
      font-weight: 600;
      color: var(--color-dark);
    }
  `,
})
export class AboutMeDialogComponent {}
