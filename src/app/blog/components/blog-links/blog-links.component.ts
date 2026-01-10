import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-blog-links',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatIconModule],
  template: `
    <aside class="blog-links">
      <a routerLink="/contacts" class="cta-button">
        <mat-icon>mail</mat-icon>
        <span>Записатися на консультацію</span>
      </a>

      <nav class="links-nav">
        <span class="links-label">Дивіться також:</span>
        <div class="links-list">
          <a routerLink="/services">Послуги</a>
          <a routerLink="/court-cases">Судові справи</a>
          <a routerLink="/feedbacks">Відгуки</a>
          <a routerLink="/about-me">Про адвоката</a>
        </div>
      </nav>
    </aside>
  `,
  styles: `
    .blog-links {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      padding: 1.5rem;
      background: linear-gradient(
        135deg,
        rgba(201, 165, 92, 0.08) 0%,
        rgba(201, 165, 92, 0.03) 100%
      );
      border-radius: 0.75rem;
      border: 1px solid rgba(201, 165, 92, 0.15);
    }

    .cta-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.625rem;
      padding: 0.875rem 1.5rem;
      background: linear-gradient(
        135deg,
        var(--color-green) 0%,
        var(--color-green-dark) 100%
      );
      color: var(--color-gold);
      text-decoration: none;
      border-radius: 2rem;
      font-size: 0.95rem;
      font-weight: 600;
      transition: all 0.25s var(--ease-standard);
      width: fit-content;

      mat-icon {
        font-size: 1.25rem;
        width: 1.25rem;
        height: 1.25rem;
      }

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0, 39, 6, 0.25);
      }
    }

    .links-nav {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.5rem 0.75rem;
      padding-top: 1rem;
      border-top: 1px solid rgba(201, 165, 92, 0.15);
    }

    .links-label {
      font-size: 0.8rem;
      font-weight: 500;
      color: var(--color-text-secondary);
    }

    .links-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.375rem;

      a {
        padding: 0.375rem 0.75rem;
        background: rgba(255, 255, 255, 0.8);
        border: 1px solid rgba(201, 165, 92, 0.2);
        border-radius: 1rem;
        font-size: 0.8rem;
        font-weight: 500;
        color: var(--color-green);
        text-decoration: none;
        transition: all 0.2s ease;

        &:hover {
          background: white;
          border-color: rgba(201, 165, 92, 0.4);
          color: var(--color-gold-accent);
        }
      }
    }

    @media (max-width: 768px) {
      .blog-links {
        padding: 1.25rem;
        gap: 1rem;
      }

      .cta-button {
        padding: 0.75rem 1.25rem;
        font-size: 0.9rem;
        width: 100%;
        justify-content: center;

        mat-icon {
          font-size: 1.125rem;
          width: 1.125rem;
          height: 1.125rem;
        }
      }

      .links-nav {
        padding-top: 0.875rem;
        gap: 0.375rem 0.5rem;
      }

      .links-label {
        font-size: 0.75rem;
        width: 100%;
      }

      .links-list {
        gap: 0.25rem;

        a {
          padding: 0.3rem 0.625rem;
          font-size: 0.75rem;
        }
      }
    }

    @media (max-width: 479px) {
      .blog-links {
        padding: 1rem;
      }

      .cta-button {
        padding: 0.625rem 1rem;
        font-size: 0.85rem;
      }
    }
  `,
})
export class BlogLinksComponent {}
