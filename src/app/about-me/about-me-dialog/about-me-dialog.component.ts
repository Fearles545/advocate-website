import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-about-me-dialog',
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="dialog-container">
      <header class="dialog-header">
        <div class="dialog-header-icon">
          <mat-icon>history</mat-icon>
        </div>
        <h2 mat-dialog-title>Професійна біографія</h2>
        <button mat-icon-button mat-dialog-close class="close-btn">
          <mat-icon>close</mat-icon>
        </button>
      </header>

      <mat-dialog-content class="dialog-content">
        <ul class="timeline">
          <li class="timeline-item">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
              <span class="timeline-date">2010–2015</span>
              <p class="timeline-text">
                Навчання у Національному юридичному університеті імені Ярослава
                Мудрого
              </p>
            </div>
          </li>

          <li class="timeline-item">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
              <span class="timeline-date">2015–2016</span>
              <p class="timeline-text">
                Державний реєстратор у Східному міжрегіональному управлінні
                Міністерства юстиції
              </p>
            </div>
          </li>

          <li class="timeline-item">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
              <span class="timeline-date">2016–2017</span>
              <p class="timeline-text">
                Юрисконсульт у Недригайлівській районній раді Сумської області
              </p>
            </div>
          </li>

          <li class="timeline-item">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
              <span class="timeline-date">2018–2021</span>
              <p class="timeline-text">
                Головний спеціаліст-юрисконсульт відділу представництва
                інтересів у судах та інших органах Головного управління
                Пенсійного фонду України в Харківській області
              </p>
            </div>
          </li>

          <li class="timeline-item timeline-item--current">
            <div class="timeline-marker timeline-marker--current"></div>
            <div class="timeline-content">
              <span class="timeline-date">з червня 2021</span>
              <p class="timeline-text timeline-text--current">
                Адвокат з пенсійних справ
              </p>
            </div>
          </li>
        </ul>
      </mat-dialog-content>
    </div>
  `,
  styles: `
    .dialog-container {
      background: linear-gradient(180deg, #f8f6f2 0%, #ffffff 100%);
      border-radius: 0.75rem;
      overflow: hidden;
    }

    .mat-mdc-dialog-title::before {
      display: none;
    }

    .mat-mdc-dialog-title {
      margin: 0;
      padding: 0;
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--color-green);
      flex: 1;
    }

    .dialog-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem 1.25rem;
      background: linear-gradient(
        135deg,
        var(--color-green) 0%,
        var(--color-green-dark) 100%
      );
      border-bottom: 2px solid var(--color-gold);
    }

    .dialog-header h2 {
      color: var(--color-gold);
    }

    .dialog-header-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2.25rem;
      height: 2.25rem;
      background: rgba(201, 165, 92, 0.15);
      border-radius: 50%;
      border: 1px solid rgba(201, 165, 92, 0.3);

      mat-icon {
        font-size: 1.1rem;
        width: 1.1rem;
        height: 1.1rem;
        color: var(--color-gold);
      }
    }

    .close-btn {
      color: var(--color-gold-light);
      transition: color 0.3s ease;
      position: absolute;
      right: 0.1rem;

      &:hover {
        color: var(--color-gold);
      }
    }

    .dialog-content {
      padding: 1.5rem !important;
      max-height: 70vh;
    }

    .timeline {
      list-style: none;
      margin: 0;
      padding: 0;
      position: relative;
    }

    .timeline::before {
      content: '';
      position: absolute;
      left: 6px;
      top: 8px;
      bottom: 8px;
      width: 2px;
      background: linear-gradient(
        180deg,
        var(--color-gold-light) 0%,
        var(--color-gold) 100%
      );
      border-radius: 1px;
    }

    .timeline-item {
      display: flex;
      gap: 1rem;
      padding-bottom: 1.25rem;
      position: relative;

      &:last-child {
        padding-bottom: 0;
      }
    }

    .timeline-marker {
      width: 14px;
      height: 14px;
      min-width: 14px;
      background: white;
      border: 2px solid var(--color-gold);
      border-radius: 50%;
      position: relative;
      z-index: 1;
      margin-top: 3px;
    }

    .timeline-marker--current {
      background: var(--color-gold);
      box-shadow: 0 0 0 4px rgba(201, 165, 92, 0.2);
    }

    .timeline-content {
      flex: 1;
    }

    .timeline-date {
      display: inline-block;
      font-size: var(--font-size-body-sm);
      font-weight: 700;
      color: var(--color-gold-accent);
      margin-bottom: 0.25rem;
    }

    .timeline-text {
      margin: 0;
      font-size: var(--font-size-body);
      line-height: 1.5;
      color: var(--text-color-primary);
    }

    .timeline-text--current {
      font-weight: 600;
      color: var(--color-green);
    }

    .timeline-item--current .timeline-date {
      color: var(--color-green);
    }
  `,
})
export class AboutMeDialogComponent {}
