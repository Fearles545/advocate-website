import { Component, inject, signal } from '@angular/core';
import { NgOptimizedImage, CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ContactFormDialogComponent } from '../contacts/contact-form-dialog/contact-form-dialog.component';
import { iconsData, SocialIconData } from '../core/icons.data';
import { SocialIconLinkComponent } from '../social-icon-link/social-icon-link.component';

interface Feedback {
  user?: string;
  name?: string;
  comment: string;
}

@Component({
  selector: 'app-main',
  imports: [
    CommonModule,
    NgOptimizedImage,
    MatButtonModule,
    RouterLink,
    MatIcon,
    MatListModule,
    MatDividerModule,
    MatIconButton,
    SocialIconLinkComponent,
  ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  private dialog = inject(MatDialog);

  currentFeedbackIndex = 0;
  private touchStartX = 0;
  private touchEndX = 0;

  isSeoExpanded = signal(false);

  toggleSeoSection(): void {
    this.isSeoExpanded.update((v) => !v);
  }

  // Get only messengers (Telegram, Viber, WhatsApp)
  get messengerIcons(): SocialIconData[] {
    return iconsData.filter((icon) =>
      ['telegram', 'viber', 'whatsApp'].includes(icon.alt)
    );
  }

  feedbacks: Feedback[] = [
    {
      user: 'Микола',
      comment:
        "Дякую Юлії Юріївна у допомозі по виходу на пенсію як шахтарь. Після того як сходив у пенсійний, відразу зрозумів, що сам не доб'юся пенсії і там не допоможуть, а навпаки викидають, що хочуть із стажу. Мені не засчитали шахти де не було справок. Сподобалося, що всім процесом займалася особисто адвокат і перевірка документів, і подача в пенсійний, і суд, все контролювала, тримала в курсі, що там відбувається, шо зроблено. Оперативно все робила. Через суд мені пенсію призначили, завдяки професійній допомозі адвоката. Вже отримав першу пенсію. Тому я дуже вдячний Поддячій Юлії Юріївні!",
    },
    {
      user: 'Володимир Трубніков',
      comment:
        'Всім бажаю здоров\'я. Я на даний час військовослужбовець і в січні 2025 оформив пенсію в 55 років по УБД. Проте до загального стажу ПФ не врахував мені навчання денної форми в коледжі 2.8 років бо в Дипломі були неточності по періоду навчання. Для зарахування стажу потрібно було подати до ПФ Довідку з місця навчання з зазначенням періоду. Враховуючи ті обставини, що я перебуваю в ЗСУ, звернувся за допомогою до адвоката такої компанії "Адвокат Поддяча Юлія Юріївна". Інформацію про діяльність адвоката якісної і швидкої допомоги людям перед пенсійного та пенсійного віку по пенсійних справах знайшов в ютуб каналі. За поданням адвокатського запиту до мого навчального закладу за короткий час було отримано архівну Довідку і як позитивний результат: Довідку подано до ПФ , зараховано стаж, перераховано пенсію в +1124 грн. Результатом я звісно задоволений. Велике подяка Юлії Юрівні за проведену оперативну роботу по моїй справі та всім рекомендую не зволікати та звертатись до цього адвоката по пенсійним справам як до професіонала і фахівця своєї справи тому як "Час рікою тече..."🫡',
    },
    {
      user: 'Лілія',
      comment:
        'Поддяча Юлія професійно надала консультацію з питання призначення пенсії моєму батькові. Розповіла про всі нюанси, проблемні моменти, та які документи потрібно дозбирати...З перших слів стало зрозуміло, що людина добре знає свою роботу, і має великий досвід в цій сфері.\nТому, з пенсійних питань однозначно рекомендую звертатися до Поддячої Юлії.',
    },
    {
      user: 'Ігор',
      comment:
        'Рекомендую адвоката Поддячую Юлію Юріївну! Звернувся до неї з питанням перевірки документів і оцифрування трудової книжки. Юлія Юріївна уважно перевірила всі документи, знайшла проблемні моменти, допомогла зібрати необхідні довідки та правильно подати оцифровані дані до Пенсійного фонду. У результаті мені зарахували всі періоди роботи та навчання. Дуже вдячний за професійну допомогу!',
    },
    {
      name: 'Анастасія',
      comment:
        'Всім дуже рекомендую адвоката Юлію Поддячу! Вона дуже професійна та приємна в спілкуванні, максимально зрозуміло все пояснила. Юлія провела швидку та якісну консультацію. Допомогла моїй мамі розібратися з періодами роботи та декрету та іншими нюансами, які впливають на стаж, та допомогла правильно їх зарахувати. Дуже їй вдячна, вона уважна, відповідальна та компетентна, тому раджу всім!',
    },
  ];

  get currentFeedback(): Feedback {
    return this.feedbacks[this.currentFeedbackIndex];
  }

  get reviewerName(): string {
    return this.currentFeedback.user || this.currentFeedback.name || 'Клієнт';
  }

  nextFeedback(): void {
    this.currentFeedbackIndex =
      (this.currentFeedbackIndex + 1) % this.feedbacks.length;
  }

  previousFeedback(): void {
    this.currentFeedbackIndex =
      this.currentFeedbackIndex === 0
        ? this.feedbacks.length - 1
        : this.currentFeedbackIndex - 1;
  }

  goToFeedback(index: number): void {
    this.currentFeedbackIndex = index;
  }

  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchEnd(event: TouchEvent): void {
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleSwipe();
  }

  private handleSwipe(): void {
    const swipeThreshold = 50; // minimum distance for swipe
    const difference = this.touchStartX - this.touchEndX;

    if (Math.abs(difference) > swipeThreshold) {
      if (difference > 0) {
        // Swiped left - next feedback
        this.nextFeedback();
      } else {
        // Swiped right - previous feedback
        this.previousFeedback();
      }
    }
  }

  openContactForm(): void {
    this.dialog.open(ContactFormDialogComponent, {
      data: {
        width: 'fit-content',
        height: 'auto',
      },
      width: '100%',
      maxWidth: '100vw',
      height: 'auto',
      panelClass: 'contact-form-dialog',
      autoFocus: false,
    });
  }
}
