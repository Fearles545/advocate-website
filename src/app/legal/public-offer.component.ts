import { Component } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-public-offer',
  imports: [MatIconModule],
  template: `
    <section class="page-bg-pattern">
      <div class="page-content">
        <header class="page-header">
          <div class="page-header-badge">
            <mat-icon>description</mat-icon>
          </div>
          <h1>Публічна оферта</h1>
          <p class="page-intro secondary">Умови надання юридичних послуг</p>
        </header>

        <article class="legal-content">
          <section class="legal-section">
            <h2>Загальні положення</h2>
            <p>
              Цей документ є публічною офертою адвоката
              <strong>Поддячої Юлії Юріївни</strong> щодо надання юридичних
              послуг у сфері пенсійного забезпечення.
            </p>
            <p>
              Звернення за консультацією, подання заявки або отримання юридичної
              допомоги означає прийняття цих умов.
            </p>
          </section>

          <section class="legal-section">
            <h2>Предмет оферти</h2>
            <p>Адвокат надає юридичні послуги з пенсійних питань, зокрема:</p>
            <ul>
              <li>
                консультації з питань призначення, перерахунку та виплати
                пенсій;
              </li>
              <li>аналіз документів та стажу;</li>
              <li>підготовку заяв, звернень, адвокатських запитів;</li>
              <li>
                представництво інтересів у спорах з Пенсійним фондом України;
              </li>
              <li>судовий захист пенсійних прав.</li>
            </ul>
          </section>

          <section class="legal-section">
            <h2>Формат надання послуг</h2>
            <p>Юридична допомога може надаватися:</p>
            <ul>
              <li>дистанційно (онлайн, телефоном, через месенджери);</li>
              <li>у письмовій формі;</li>
              <li>шляхом судового представництва.</li>
            </ul>
            <p class="highlight-box">
              Особиста присутність клієнта не є обов'язковою, якщо інше не
              узгоджено сторонами.
            </p>
          </section>

          <section class="legal-section">
            <h2>Вартість послуг</h2>
            <p>Вартість юридичних послуг:</p>
            <ul>
              <li>визначається <strong>індивідуально</strong>;</li>
              <li>
                залежить від складності справи, обсягу документів та необхідних
                дій;
              </li>
              <li>
                узгоджується <strong>після первинної консультації</strong>.
              </li>
            </ul>
            <p>
              Оплата здійснюється у порядку та на умовах, погоджених з клієнтом.
            </p>
          </section>

          <section class="legal-section">
            <h2>Відсутність гарантії результату</h2>
            <p>
              Адвокат не гарантує конкретного результату справи, оскільки він
              залежить від:
            </p>
            <ul>
              <li>фактичних обставин;</li>
              <li>наданих документів;</li>
              <li>позиції органів Пенсійного фонду;</li>
              <li>судової практики та законодавства.</li>
            </ul>
            <p class="highlight-box">
              Адвокат зобов'язується діяти
              <strong>професійно, добросовісно та в інтересах клієнта</strong>.
            </p>
          </section>

          <section class="legal-section">
            <h2>Права та обов'язки сторін</h2>
            <div class="obligations-grid">
              <div class="obligation-block">
                <h3>Клієнт зобов'язується:</h3>
                <ul>
                  <li>надавати достовірну інформацію;</li>
                  <li>своєчасно передавати необхідні документи;</li>
                  <li>виконувати узгоджені умови співпраці.</li>
                </ul>
              </div>
              <div class="obligation-block">
                <h3>Адвокат зобов'язується:</h3>
                <ul>
                  <li>дотримуватися адвокатської етики;</li>
                  <li>зберігати конфіденційність інформації;</li>
                  <li>інформувати клієнта про перебіг справи.</li>
                </ul>
              </div>
            </div>
          </section>

          <section class="legal-section">
            <h2>Конфіденційність</h2>
            <p>
              Уся інформація, отримана під час надання юридичної допомоги, є
              конфіденційною та охороняється адвокатською таємницею.
            </p>
          </section>

          <section class="legal-section">
            <h2>Заключні положення</h2>
            <p>
              Ця публічна оферта діє з моменту її розміщення на Сайті та
              застосовується до всіх звернень за юридичною допомогою.
            </p>
          </section>

          <section class="legal-section">
            <h2>Контактна інформація</h2>
            <div class="contact-info">
              <p><strong>Адвокат:</strong> Поддяча Юлія Юріївна</p>
              <p><strong>Сайт:</strong> advocate-pensia.com.ua</p>
              <p>
                <strong>Зв'язок:</strong> через форму на сайті або зазначені
                месенджери
              </p>
            </div>
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

    .legal-section h3 {
      font-size: 1rem;
      color: var(--color-green);
      margin: 0 0 0.75rem;
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

    .obligations-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .obligation-block {
      background: var(--gold-alpha-06);
      padding: 1rem 1.25rem;
      border-radius: 0.5rem;
      border-left: 3px solid var(--color-gold);
    }

    .obligation-block ul {
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

    @media (min-width: 640px) {
      .obligations-grid {
        grid-template-columns: repeat(2, 1fr);
      }
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
export class PublicOfferComponent {}
