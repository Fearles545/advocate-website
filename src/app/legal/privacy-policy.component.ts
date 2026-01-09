import { Component } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-privacy-policy',
  imports: [MatIconModule],
  template: `
    <section class="page-bg-pattern">
      <div class="page-content">
        <header class="page-header">
          <div class="page-header-badge">
            <mat-icon>shield</mat-icon>
          </div>
          <h1>Політика конфіденційності</h1>
        </header>

        <article class="legal-content">
          <section class="legal-section">
            <h2>Загальні положення</h2>
            <p>
              Ця Політика конфіденційності визначає порядок збору, використання
              та захисту персональних даних користувачів сайту
              <strong>«Адвокат по пенсіях Поддяча Юлія Юріївна»</strong> (далі —
              Сайт).
            </p>
            <p>
              Користуючись Сайтом, заповнюючи форми зворотного зв'язку або
              звертаючись за консультацією, ви підтверджуєте свою згоду з цією
              Політикою конфіденційності.
            </p>
          </section>

          <section class="legal-section">
            <h2>Які персональні дані я збираю</h2>
            <p>
              Під час користування Сайтом можуть збиратися такі персональні
              дані:
            </p>
            <ul>
              <li>ім'я;</li>
              <li>номер телефону;</li>
              <li>адреса електронної пошти;</li>
              <li>
                інша інформація, яку ви добровільно повідомляєте у зверненні або
                під час консультації.
              </li>
            </ul>
          </section>

          <section class="legal-section">
            <h2>Мета обробки персональних даних</h2>
            <p>Персональні дані використовуються виключно для:</p>
            <ul>
              <li>зв'язку з вами;</li>
              <li>надання юридичної консультації;</li>
              <li>аналізу вашої ситуації з пенсійних питань;</li>
              <li>подальшої комунікації у межах надання юридичних послуг.</li>
            </ul>
            <p class="highlight-box">
              Ваші персональні дані
              <strong>не використовуються для реклами третіх осіб</strong> та
              <strong>не передаються стороннім особам без вашої згоди</strong>,
              за винятком випадків, передбачених законодавством України.
            </p>
          </section>

          <section class="legal-section">
            <h2>Способи збору даних</h2>
            <p>Персональні дані можуть збиратися:</p>
            <ul>
              <li>
                через форму запису на консультацію (у тому числі Google Forms);
              </li>
              <li>
                під час звернення через месенджери (Viber, WhatsApp, Telegram);
              </li>
              <li>під час телефонного або електронного звернення.</li>
            </ul>
          </section>

          <section class="legal-section">
            <h2>Захист персональних даних</h2>
            <p>
              Я вживаю необхідних організаційних і технічних заходів для захисту
              персональних даних від несанкціонованого доступу, втрати або
              розголошення.
            </p>
            <p>Доступ до персональних даних маю лише я як адвокат.</p>
          </section>

          <section class="legal-section">
            <h2>Термін зберігання даних</h2>
            <p>
              Персональні дані зберігаються
              <strong>не довше, ніж це необхідно</strong> для досягнення мети їх
              обробки або відповідно до вимог законодавства України.
            </p>
          </section>

          <section class="legal-section">
            <h2>Права користувача</h2>
            <p>Ви маєте право:</p>
            <ul>
              <li>знати, які персональні дані обробляються;</li>
              <li>
                вимагати виправлення або видалення ваших персональних даних;
              </li>
              <li>відкликати згоду на обробку персональних даних.</li>
            </ul>
            <p>
              Для цього достатньо звернутися за контактами, вказаними на Сайті.
            </p>
          </section>

          <section class="legal-section">
            <h2>Контактна інформація</h2>
            <div class="contact-info">
              <p><strong>Адвокат:</strong> Поддяча Юлія Юріївна</p>
              <p><strong>Спеціалізація:</strong> пенсійні справи</p>
              <p>
                <strong>Зв'язок:</strong> через форму на сайті або у зазначених
                месенджерах
              </p>
            </div>
          </section>

          <section class="legal-section">
            <h2>Зміни до Політики конфіденційності</h2>
            <p>
              Я залишаю за собою право оновлювати цю Політику конфіденційності.
              Актуальна версія завжди розміщена на Сайті.
            </p>
          </section>
        </article>
      </div>
    </section>
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
    }

    .legal-content {
      max-width: 800px;
      margin: 0 auto;
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border-radius: var(--card-border-radius);
      border: var(--card-border);
      padding: 2rem;
      box-shadow: var(--card-box-shadow);
    }

    .legal-section {
      margin-bottom: 2rem;
      padding-bottom: 2rem;
      border-bottom: 1px solid var(--gold-alpha-20);
    }

    .legal-section:last-child {
      margin-bottom: 0;
      padding-bottom: 0;
      border-bottom: none;
    }

    .legal-section h2 {
      font-size: 1.25rem;
      color: var(--color-green);
      margin: 0 0 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid var(--color-gold);
      display: inline-block;
    }

    .legal-section p {
      color: var(--text-color-primary);
      line-height: 1.7;
      margin: 0 0 1rem;
    }

    .legal-section p:last-child {
      margin-bottom: 0;
    }

    .legal-section ul {
      margin: 0 0 1rem;
      padding-left: 1.5rem;
    }

    .legal-section li {
      color: var(--text-color-primary);
      line-height: 1.7;
      margin-bottom: 0.5rem;
    }

    .legal-section li:last-child {
      margin-bottom: 0;
    }

    .contact-info {
      background: var(--gold-alpha-06);
      padding: 1rem 1.25rem;
      border-radius: 0.5rem;
      border-left: 3px solid var(--color-gold);
    }

    .contact-info p {
      margin: 0.5rem 0;
    }

    .contact-info p:first-child {
      margin-top: 0;
    }

    .contact-info p:last-child {
      margin-bottom: 0;
    }

    @media (min-width: 768px) {
      .legal-content {
        padding: 3rem;
      }

      .legal-section h2 {
        font-size: 1.35rem;
      }
    }

    @media (max-width: 479px) {
      .legal-content {
        padding: 1.5rem;
      }

      .legal-section {
        margin-bottom: 1.5rem;
        padding-bottom: 1.5rem;
      }

      .legal-section h2 {
        font-size: 1.1rem;
      }
    }
  `,
})
export class PrivacyPolicyComponent {}
