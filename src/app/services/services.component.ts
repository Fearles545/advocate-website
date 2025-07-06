import { Component, inject, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [MatListModule, MatIconModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
})
export class ServicesComponent implements OnInit {
  private meta = inject(Meta);
  private title = inject(Title);

  ngOnInit(): void {
    this.title.setTitle('Послуги | Адвокат по пенсіях');

    this.meta.updateTag({
      name: 'description',
      content:
        'Повний спектр послуг з пенсійних питань: оформлення пенсій, перерахунок, апеляції, юридичні консультації. Професійна допомога без вашої присутності.',
    });

    this.meta.updateTag({
      name: 'keywords',
      content:
        'оформлення пенсії, перерахунок пенсії, пенсійні послуги, юридична консультація, ПФУ',
    });

    this.meta.updateTag({
      property: 'og:title',
      content: 'Послуги | Адвокат по пенсіях',
    });

    this.meta.updateTag({
      property: 'og:description',
      content:
        'Повний спектр послуг з пенсійних питань: оформлення пенсій, перерахунок, апеляції, юридичні консультації.',
    });
  }

  serviceCategories = [
    {
      name: 'ПЕНСІЙНІ',
      items: [
        { icon: 'handshake', title: 'Консультації з пенсійних питань' },
        { icon: 'mail', title: 'Звернення з адвокатським запитом' },
        { icon: 'people', title: 'Допомога у зборі необхідних довідок' },
        { icon: 'lock', title: 'Оформлення різних видів пенсій' },
        { icon: 'calculator', title: 'Перерахунок/допризначення пенсій' },
        { icon: 'card', title: 'Оформлення пенсійного посвідчення' },
        { icon: 'checklist', title: 'Розрахунки різних видів стажу' },
        { icon: 'check', title: 'Перевірка документів для призначення пенсії' },
        { icon: 'question', title: 'Інші пенсійні питання' },
      ],
    },
    {
      name: 'СУДОВІ',
      items: [
        { icon: 'person', title: 'Представництво інтересів у судах' },
        {
          icon: 'legal-case',
          title:
            'Написання та подання позовів (оскарження відмов Пенсійного фонду)',
        },
        { icon: 'letter', title: 'Відповіді на відзиви ПФУ' },
        {
          icon: 'document',
          title: 'Написання інших документів для суду (клопотання, заяви тощо)',
        },
        { icon: 'document-appeal', title: 'Апеляційні скарги' },
        {
          icon: 'executive',
          title: 'Отримання виконавчих листів та подання до виконавчої служби',
        },
        {
          icon: 'question-1',
          title: 'Вирішення інших питань у пенсійних справах',
        },
      ],
    },
  ];
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    const iconNames = [
      'handshake',
      'mail',
      'people',
      'lock',
      'calculator',
      'card',
      'checklist',
      'check',
      'question',
      'person',
      'legal-case',
      'letter',
      'document',
      'document-appeal',
      'executive',
      'question-1',
    ];
    iconNames.forEach((iconName) => {
      iconRegistry.addSvgIcon(
        iconName,
        sanitizer.bypassSecurityTrustResourceUrl(
          `assets/services-icons/${iconName}.svg`
        )
      );
    });
  }
}
