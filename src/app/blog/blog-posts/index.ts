export interface Blog {
  id?: number;
  title: string;
  slug: string;
  description?: string;
  src: string;
  date: string;
}

export const blogs = [
  {
    title: 'Щодо зарахування періодів УБД, АТО, ООС',
    slug: 'shchodo-zarakhuvannia-periodiv-ubd-ato-oos',
    src: 'https://www.youtube.com/embed/Y3Knuv9Rnew',
    date: '2025-06-30',
    description:
      'Пояснюємо, як підтвердити страховий стаж без трудової книжки.',
  },
  {
    title: 'Яка максимальна пенсія у 2025 році?',
    slug: 'yaka-maksymalna-pensiia-u-2025',
    src: 'https://www.youtube.com/embed/FZBqCZjdqjU',
    date: '2025-04-18',
  },
  {
    title: 'Хто має право на пенсію за віком у 2025 році?',
    slug: 'khto-maie-pravo-na-pensiiu-za-vikom-u-2025',
    src: 'https://www.youtube.com/embed/ZwtT8Ddv12c',
    date: '2025-04-02',
  },
  {
    title: 'Мінімальний розмір пенсії за віком: умови та особливості',
    slug: 'minimalnyi-rozmir-pensii-za-vikom-umovy-osoblyvosti',
    src: 'https://www.youtube.com/embed/52AMmLjUiFk',
    date: '2025-04-01',
  },
  {
    title: 'Кому перерахують пенсію з 1 квітня 2025 року?',
    slug: 'komu-pererakhuiut-pensii-1-kvitnia-2025',
    src: 'https://www.youtube.com/embed/6-P2rTCcoUY',
    date: '2025-03-28',
  },
];
