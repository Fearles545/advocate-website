import { Instruction } from './instruction.model';

export const kepPrivatbank: Instruction = {
  slug: 'kep-privatbank',
  title:
    'Як отримати електронний підпис (КЕП) через ПриватБанк — покрокова інструкція',
  shortTitle: 'КЕП через ПриватБанк',
  category: 'kep',
  date: '2026-04-12',
  estimatedTime: '15 хвилин',
  prerequisites: [
    'Смартфон з встановленим додатком Приват24',
    'Доступ до інтернету (Wi-Fi або мобільний інтернет)',
    'Пароль від Приват24',
  ],
  intro:
    '<p>Кваліфікований електронний підпис (КЕП) потрібен для входу на Портал Пенсійного фонду України та інші державні сервіси. Ця інструкція допоможе Вам отримати КЕП через веб-версію Приват24.</p>',
  steps: [
    {
      title: 'Відкрийте браузер та знайдіть Приват24',
      description:
        'Відкрийте Google Chrome (або інший браузер) на телефоні. У рядку пошуку введіть «приват24». У результатах пошуку натисніть «Вхід до Приват24».',
      image: '/assets/images/instructions/kep-privatbank/step-1.webp',
    },
    {
      title: 'Введіть номер телефону',
      description:
        'На сторінці «Вхід/Реєстрація» введіть свій номер телефону (той, що прив\'язаний до Приват24). Натисніть зелену кнопку «Продовжити».',
      image: '/assets/images/instructions/kep-privatbank/step-2.webp',
    },
    {
      title: 'Введіть пароль Приват24',
      description:
        'Оберіть тип входу «Персональний». Введіть пароль від Приват24. Натисніть зелену кнопку «Увійти».',
      image: '/assets/images/instructions/kep-privatbank/step-3.webp',
    },
    {
      title: 'Підтвердіть вхід через додаток Приват24',
      description:
        'На екрані з\'явиться повідомлення, що підтвердження відправлено у додаток Приват24. Також прийде push-повідомлення на телефон.',
      image: '/assets/images/instructions/kep-privatbank/step-4.webp',
    },
    {
      title: 'Відкрийте сповіщення у додатку Приват24',
      description:
        'Відкрийте додаток Приват24 на телефоні. Натисніть на іконку дзвіночка (сповіщення) у правому верхньому куті.',
      image: '/assets/images/instructions/kep-privatbank/step-5.webp',
    },
    {
      title: 'Підтвердіть авторизацію',
      description:
        'У сповіщеннях з\'явиться запит «Підтвердження Авторизації в Приват24». Перевірте дані (операційна система, браузер, IP-адреса) та натисніть зелену кнопку «Підтвердити».',
      image: '/assets/images/instructions/kep-privatbank/step-6.webp',
    },
    {
      title: 'Відкрийте меню Приват24',
      description:
        'Після успішного входу у веб-версію Приват24 натисніть на іконку меню (≡) у лівому верхньому куті екрана.',
      image: '/assets/images/instructions/kep-privatbank/step-7.webp',
    },
    {
      title: 'Прокрутіть меню до низу',
      description:
        'У меню, що відкрилося, прокрутіть список сервісів до низу. Вам потрібно знайти розділ «Бізнес».',
      image: '/assets/images/instructions/kep-privatbank/step-8.webp',
    },
    {
      title: 'Оберіть розділ «Бізнес»',
      description:
        'У самому низу списку сервісів натисніть на «Бізнес».',
      image: '/assets/images/instructions/kep-privatbank/step-9.webp',
    },
    {
      title: 'Оберіть «Електронний підпис»',
      description:
        'У розділі «Бізнес» натисніть на перший пункт — «Електронний підпис».',
      image: '/assets/images/instructions/kep-privatbank/step-10.webp',
    },
    {
      title: 'Підтвердіть перехід на сайт АЦСК',
      description:
        'З\'явиться вікно «Відкрити сервіс?» з попередженням про перехід на інший сайт. Натисніть зелену кнопку «Так, відкрити».',
      image: '/assets/images/instructions/kep-privatbank/step-11.webp',
      warning:
        'Іноді може з\'явитися помилка «Виникла помилка при отриманні даних авторизованого користувача». Просто закрийте це вікно (натисніть ×) та спробуйте ще раз.',
      warningImage: '/assets/images/instructions/kep-privatbank/step-12.webp',
    },
    {
      title: 'Натисніть «Отримати сертифікат»',
      description:
        'На сайті АЦСК ПриватБанку (acsk.privatbank.ua) натисніть на зелену кнопку «Отримати сертифікат».',
      image: '/assets/images/instructions/kep-privatbank/step-13.webp',
    },
    {
      title: 'Повторно авторизуйтесь',
      description:
        'Сайт АЦСК попросить повторну авторизацію. Введіть номер телефону та натисніть «Продовжити».',
      image: '/assets/images/instructions/kep-privatbank/step-14.webp',
    },
    {
      title: 'Введіть пароль Приват24 та увійдіть',
      description:
        'Введіть пароль від Приват24 та натисніть «Увійти».',
      image: '/assets/images/instructions/kep-privatbank/step-15.webp',
    },
    {
      title: 'Підтвердіть вхід через додаток',
      description:
        'Знову підтвердіть авторизацію у додатку Приват24 (як у кроці 5-6).',
      image: '/assets/images/instructions/kep-privatbank/step-16.webp',
    },
    {
      title: 'Перевірте свої дані',
      description:
        'Після авторизації з\'являться Ваші дані: П.І.Б., населений пункт та область. Якщо дані правильні, натисніть зелену кнопку «Так, дані правильні». Якщо є помилки — натисніть «Ні, актуалізувати».',
      image: '/assets/images/instructions/kep-privatbank/step-17.webp',
    },
    {
      title: 'Створіть пароль для сховища ключів',
      description:
        'Вигадайте пароль для сховища ключів. Вимоги до пароля: мінімум 8 символів, латинські літери та цифри, без спеціальних символів. Введіть пароль двічі. Поставте галочку біля договору про надання електронних довірчих послуг. Натисніть зелену кнопку «Далі».',
      image: '/assets/images/instructions/kep-privatbank/step-18.webp',
    },
    {
      title: 'Підтвердіть створення ключа',
      description:
        'Прийде ще одне підтвердження у додаток Приват24. Підтвердіть його.',
      image: '/assets/images/instructions/kep-privatbank/step-19.webp',
    },
    {
      title: 'Очікуйте підтвердження',
      description:
        'На сайті АЦСК з\'явиться екран «Підтвердження» з повідомленням, що підтвердження відправлено у додаток Приват24. Відкрийте додаток Приват24.',
      image: '/assets/images/instructions/kep-privatbank/step-20.webp',
    },
    {
      title: 'Підтвердіть випуск сертифіката КЕП',
      description:
        'У додатку Приват24 з\'явиться запит «Ви підтверджуєте випуск сертифіката КЕП?». Натисніть зелену кнопку «Підтвердити».',
      image: '/assets/images/instructions/kep-privatbank/step-21.webp',
    },
    {
      title: 'Дочекайтесь завантаження файлу',
      description:
        'Після підтвердження файл сертифіката автоматично почне завантажуватись на Ваш телефон. Дочекайтесь завершення завантаження.',
      image: '/assets/images/instructions/kep-privatbank/step-22.webp',
    },
    {
      title: 'Сертифікат успішно завантажений!',
      description:
        'З\'явиться повідомлення «Сертифікат підпису успішно завантажений». Файл з розширенням .jks буде збережено у папку «Завантаження» на Вашому телефоні.',
      image: '/assets/images/instructions/kep-privatbank/step-23.webp',
    },
    {
      title: 'Перевірте файл у завантаженнях',
      description:
        'Файл ключа (формат .jks) збережено у папці «Завантаження» на Вашому телефоні. Назва файлу починається з «pb_» та містить цифри.',
      image: '/assets/images/instructions/kep-privatbank/step-24.webp',
    },
  ],
  importantNotes: [
    "Обов'язково запам'ятайте або запишіть пароль до сховища ключів!",
  ],
  relatedInstructionSlugs: ['kep-monobank', 'dovidka-dokhody-portal-pfu', 'dovidka-ok5-diia'],
  seo: {
    title:
      'Як отримати КЕП через ПриватБанк — інструкція зі скріншотами',
    description:
      'Покрокова інструкція з отримання кваліфікованого електронного підпису (КЕП) через веб-версію Приват24 за 23 кроки зі скріншотами.',
    keywords: [
      'КЕП ПриватБанк',
      'електронний підпис ПриватБанк',
      'отримати КЕП',
      'АЦСК ПриватБанк',
      'покрокова інструкція',
    ],
  },
};
