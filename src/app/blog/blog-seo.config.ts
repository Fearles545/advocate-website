import { PageSEO } from '@core/services/seo.service';

export const BLOG_SEO_DATA: { [key: string]: PageSEO } = {
  'minimalnyi-rozmir-pensii-za-vikom-umovy-osoblyvosti': {
    title:
      'Мінімальний розмір пенсії за віком: умови та особливості | Адвокат Поддяча Юлія Юріївна',
    description:
      'Від якого страхового стажу залежить мінімальний розмір пенсії за віком, як враховується понаднормовий стаж і які правила діють для осіб 65+.',
    keywords:
      'мінімальний розмір пенсії, умови отримання, пенсія за віком, пенсійне забезпечення, соціальний захист, юридична консультація, адвокат по пенсіях',
    type: 'article',
    publishedTime: '2025-09-27T09:00:00+03:00',
    modifiedTime: '2025-09-27T18:00:00+03:00',
    canonical: '/blog/minimalnyi-rozmir-pensii-za-vikom-umovy-osoblyvosti',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BlogPosting',
          headline: 'Мінімальний розмір пенсії за віком: умови та особливості',
          description:
            'Від якого страхового стажу залежить мінімальний розмір пенсії за віком, як враховується понаднормовий стаж і які правила діють для осіб 65+.',
          datePublished: '2025-09-27T09:00:00+03:00',
          dateModified: '2025-09-27T18:00:00+03:00',
          author: { '@type': 'Person', name: 'Поддяча Юлія Юріївна' },
          publisher: { '@type': 'Organization', name: 'Поддяча Юлія Юріївна' },
          image: [
            'https://www.advocate-pensia.com.ua/assets/images/og/default-og-image.webp',
          ],
          inLanguage: 'uk-UA',
          keywords: [
            'мінімальний розмір пенсії',
            'пенсія за віком',
            'страховий стаж',
            'перерахунок пенсії',
            'пенсійне забезпечення',
            'юридична консультація',
          ],
          articleSection: 'Пенсійне право',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id':
              'https://www.advocate-pensia.com.ua/blog/minimalnyi-rozmir-pensii-za-vikom-umovy-osoblyvosti',
          },
          url: 'https://www.advocate-pensia.com.ua/blog/minimalnyi-rozmir-pensii-za-vikom-umovy-osoblyvosti',
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Блог',
              item: 'https://www.advocate-pensia.com.ua/blog',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Мінімальний розмір пенсії за віком: умови та особливості',
              item: 'https://www.advocate-pensia.com.ua/blog/minimalnyi-rozmir-pensii-za-vikom-umovy-osoblyvosti',
            },
          ],
        },
      ],
    },
  },
};
