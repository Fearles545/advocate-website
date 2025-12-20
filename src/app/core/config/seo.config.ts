import { BLOG_SEO_DATA } from '../../blog/blog-seo.config';
import { PageSEO } from '../services/seo.service';

/**
 * A centralized configuration object for page-specific SEO data.
 * Using a single source of truth like this makes maintenance and updates much simpler.
 * The keys should correspond to the route paths for easy mapping.
 */
// Canonicals use trailing slash for directory-like routes to match server 301 behavior.
export const SEO_DATA: { [key: string]: PageSEO } = {
  '': {
    title:
      'Адвокат по пенсіях — Поддяча Юлія | призначення, перерахунок, спори з ПФУ',
    description:
      'Юридична допомога з пенсійних питань: призначення та перерахунок пенсії, оскарження рішень Пенсійного фонду України. Адвокат Поддяча Юлія Юріївна.',
    keywords:
      'адвокат по пенсії, адвокат по пенсіях, пенсійний адвокат, юрист по пенсіях, пенсійний юрист, адвокат Поддяча Юлія Юріївна, пенсійне право, пенсійні питання, пенсійна допомога, оформлення та перерахунок пенсії, юридичні послуги з пенсій, консультація адвоката онлайн, правова допомога пенсіонерам',
    canonical: '/',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          '@id': 'https://www.advocate-pensia.com.ua/#breadcrumbs-home',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Головна',
              item: {
                '@type': 'WebPage',
                '@id': 'https://www.advocate-pensia.com.ua/',
                name: 'Головна',
              },
            },
          ],
        },
        {
          '@type': 'WebPage',
          '@id': 'https://www.advocate-pensia.com.ua/#webpage',
          name: 'Адвокат по пенсіях в Україні | Поддяча Юлія Юріївна',
          url: 'https://www.advocate-pensia.com.ua/',
          inLanguage: 'uk-UA',
          isPartOf: { '@id': 'https://www.advocate-pensia.com.ua/#website' },
          about: { '@id': 'https://www.advocate-pensia.com.ua/#org' },
          breadcrumb: {
            '@id': 'https://www.advocate-pensia.com.ua/#breadcrumbs-home',
          },
        },
      ],
    },
  },
  'about-me': {
    title: 'Про пенсійного адвоката Поддячу Юлію — спеціаліст з пенсій',
    description:
      'Адвокат Поддяча Юлія Юріївна — фахівець з пенсійного права. Більше 10 років досвіду, успішні справи з оформлення та перерахунку пенсій. Індивідуальний підхід, відповідальність та професійна репутація.',
    keywords:
      'адвокат Поддяча Юлія Юріївна, адвокат по пенсіях, адвокат по пенсіях онлайн, адвокат по пенсіях Київ, адвокат по пенсіях Харків, адвокат по пенсіях Львів, адвокат по пенсіях Дніпро, адвокат по пенсіях Одеса, адвокат по пенсіях Запоріжжя, адвокат по пенсіях Вінниця, адвокат по пенсіях Полтава, адвокат по пенсіях Черкаси, адвокат по пенсіях Чернігів, адвокат по пенсіях Житомир, адвокат по пенсіях Кропивницький, адвокат по пенсіях Суми, адвокат по пенсіях Рівне, адвокат по пенсіях Тернопіль, адвокат по пенсіях Івано-Франківськ, адвокат по пенсіях Луцьк, адвокат по пенсіях Ужгород, досвідчений адвокат по пенсійних справах, фахівець з пенсійного права, юридична допомога пенсіонерам',
    canonical: '/about-me/',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          '@id': 'https://www.advocate-pensia.com.ua/about-me/#breadcrumbs',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Головна',
              item: {
                '@type': 'WebPage',
                '@id': 'https://www.advocate-pensia.com.ua/',
                name: 'Головна',
              },
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Про мене',
              item: {
                '@type': 'WebPage',
                '@id': 'https://www.advocate-pensia.com.ua/about-me/',
                name: 'Про мене',
              },
            },
          ],
        },
        {
          '@type': 'AboutPage',
          '@id': 'https://www.advocate-pensia.com.ua/about-me/#webpage',
          name: 'Про мене | Адвокат Поддяча Юлія Юріївна',
          url: 'https://www.advocate-pensia.com.ua/about-me/',
          inLanguage: 'uk-UA',
          isPartOf: { '@id': 'https://www.advocate-pensia.com.ua/#website' },
          about: { '@id': 'https://www.advocate-pensia.com.ua/#org' },
          breadcrumb: {
            '@id': 'https://www.advocate-pensia.com.ua/about-me/#breadcrumbs',
          },
        },
      ],
    },
  },
  services: {
    title: 'Послуги адвоката з пенсій Поддячої Юлії - оформлення пенсії',
    description:
      'Адвокат Поддяча Юлія Юріївна надає повний спектр послуг з пенсійних питань: оформлення пенсії за віком, за вислугу років, по інвалідності, пільгових пенсій (Список №1, №2), перерахунок виплат, індексація пенсій, судові спори з ПФУ. Допомога онлайн та без відвідування Пенсійного фонду.',
    keywords:
      'оформлення пенсії, перерахунок пенсії, пенсія за віком, пенсія по інвалідності, пільгова пенсія Список №1, пільгова пенсія Список №2, військова пенсія, пенсія за вислугу років, підтвердження стажу, довідка про заробітну плату, суд з Пенсійним фондом, оскарження рішення ПФУ, консультація адвоката онлайн, допомога з пенсійними виплатами',
    canonical: '/services/',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          '@id': 'https://www.advocate-pensia.com.ua/services/#breadcrumbs',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Головна',
              item: {
                '@type': 'WebPage',
                '@id': 'https://www.advocate-pensia.com.ua/',
                name: 'Головна',
              },
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Послуги',
              item: {
                '@type': 'WebPage',
                '@id': 'https://www.advocate-pensia.com.ua/services/',
                name: 'Послуги',
              },
            },
          ],
        },
        {
          '@type': 'CollectionPage',
          '@id': 'https://www.advocate-pensia.com.ua/services/#webpage',
          name: 'Послуги | Адвокат по пенсіях в Україні',
          url: 'https://www.advocate-pensia.com.ua/services/',
          inLanguage: 'uk-UA',
          isPartOf: { '@id': 'https://www.advocate-pensia.com.ua/#website' },
          about: { '@id': 'https://www.advocate-pensia.com.ua/#org' },
          breadcrumb: {
            '@id': 'https://www.advocate-pensia.com.ua/services/#breadcrumbs',
          },
        },
      ],
    },
  },
  documents: {
    title: 'Документи адвоката з пенсійних справ Поддячої Юлії',
    description:
      'Документи адвоката Поддяча Юлії Юріївни: свідоцтво про право на заняття адвокатською діяльністю, диплом юриста, професійні сертифікати. Підтвердження кваліфікації та відповідність вимогам адвокатської етики.',
    keywords:
      'документи адвоката, свідоцтво адвоката, свідоцтво про право на заняття адвокатською діяльністю, диплом юриста, сертифікати адвоката, підтвердження кваліфікації, кваліфікація адвоката, досвід адвоката, офіційні документи адвоката, адвокат Поддяча Юлія Юріївна',
    canonical: '/documents/',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          '@id': 'https://www.advocate-pensia.com.ua/documents/#breadcrumbs',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Головна',
              item: {
                '@type': 'WebPage',
                '@id': 'https://www.advocate-pensia.com.ua/',
                name: 'Головна',
              },
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Документи',
              item: {
                '@type': 'WebPage',
                '@id': 'https://www.advocate-pensia.com.ua/documents/',
                name: 'Документи',
              },
            },
          ],
        },
        {
          '@type': 'WebPage',
          '@id': 'https://www.advocate-pensia.com.ua/documents/#webpage',
          name: 'Документи | Адвокат Поддяча Юлія Юріївна',
          url: 'https://www.advocate-pensia.com.ua/documents/',
          inLanguage: 'uk-UA',
          isPartOf: { '@id': 'https://www.advocate-pensia.com.ua/#website' },
          about: { '@id': 'https://www.advocate-pensia.com.ua/#org' },
          breadcrumb: {
            '@id': 'https://www.advocate-pensia.com.ua/documents/#breadcrumbs',
          },
        },
      ],
    },
  },
  contacts: {
    title: 'Консультація пенсійного юриста — контакти | Поддяча Юлія',
    description:
      "Зв'язок з адвокатом Поддячою Юлією Юріївною: телефон, email, Viber, Telegram. Онлайн-консультації з пенсійних питань по всій Україні. Запишіться на зручний час уже сьогодні.",
    keywords:
      "контакти адвоката, телефон адвоката, email адвоката, консультація адвоката онлайн, запис на консультацію, адвокат по пенсіях, зв'язатися з адвокатом, Вайбер адвокат, Телеграм адвокат, консультація по пенсії",
    canonical: '/contacts/',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          '@id': 'https://www.advocate-pensia.com.ua/contacts/#breadcrumbs',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Головна',
              item: {
                '@type': 'WebPage',
                '@id': 'https://www.advocate-pensia.com.ua/',
                name: 'Головна',
              },
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Контакти',
              item: {
                '@type': 'WebPage',
                '@id': 'https://www.advocate-pensia.com.ua/contacts/',
                name: 'Контакти',
              },
            },
          ],
        },
        {
          '@type': 'ContactPage',
          '@id': 'https://www.advocate-pensia.com.ua/contacts/#webpage',
          name: 'Контакти | Адвокат Поддяча Юлія Юріївна',
          url: 'https://www.advocate-pensia.com.ua/contacts/',
          inLanguage: 'uk-UA',
          isPartOf: { '@id': 'https://www.advocate-pensia.com.ua/#website' },
          about: { '@id': 'https://www.advocate-pensia.com.ua/#org' },
          breadcrumb: {
            '@id': 'https://www.advocate-pensia.com.ua/contacts/#breadcrumbs',
          },
        },
      ],
    },
  },
  feedbacks: {
    title: 'Відгуки клієнтів пенсійного адвоката (юриста) Поддячої Юлії',
    description:
      'Реальні відгуки клієнтів про роботу адвоката Поддячої Юлії Юріївни з пенсійних справ. Дізнайтесь, як ми допомогли іншим отримати заслужену пенсію.',
    keywords:
      'відгуки адвокат пенсія, відгуки клієнтів адвоката, адвокат Поддяча відгуки, пенсійний адвокат відгуки, реальні відгуки пенсійна справа, відгуки про адвоката по пенсіях',
    canonical: '/feedbacks/',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          '@id': 'https://www.advocate-pensia.com.ua/feedbacks/#breadcrumbs',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Головна',
              item: {
                '@type': 'WebPage',
                '@id': 'https://www.advocate-pensia.com.ua/',
                name: 'Головна',
              },
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Відгуки',
              item: {
                '@type': 'WebPage',
                '@id': 'https://www.advocate-pensia.com.ua/feedbacks/',
                name: 'Відгуки',
              },
            },
          ],
        },
        {
          '@type': 'WebPage',
          '@id': 'https://www.advocate-pensia.com.ua/feedbacks/#webpage',
          name: 'Відгуки клієнтів | Адвокат Поддяча Юлія Юріївна',
          url: 'https://www.advocate-pensia.com.ua/feedbacks/',
          inLanguage: 'uk-UA',
          isPartOf: { '@id': 'https://www.advocate-pensia.com.ua/#website' },
          about: { '@id': 'https://www.advocate-pensia.com.ua/#org' },
          breadcrumb: {
            '@id': 'https://www.advocate-pensia.com.ua/feedbacks/#breadcrumbs',
          },
        },
      ],
    },
  },
  blog: {
    title: 'Блог про пенсії в Україні — поради юриста з пенсійних питань',
    description:
      'Корисні статті та поради адвоката Поддячої Юлії Юріївни з питань пенсійного права. Останні новини, роз’яснення та практичні кейси.',
    keywords:
      'блог адвоката, статті про пенсії, поради юриста, новини пенсійного законодавства, Юлія Поддяча',
    canonical: '/blog/',
    type: 'website',
    robots: 'noindex,follow',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          '@id': 'https://www.advocate-pensia.com.ua/blog/#breadcrumbs',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Блог',
              item: {
                '@type': 'WebPage',
                '@id': 'https://www.advocate-pensia.com.ua/blog/',
                name: 'Блог',
              },
            },
          ],
        },
        {
          '@type': 'CollectionPage',
          '@id': 'https://www.advocate-pensia.com.ua/blog/#webpage',
          name: 'Блог',
          url: 'https://www.advocate-pensia.com.ua/blog/',
          inLanguage: 'uk-UA',
          breadcrumb: {
            '@id': 'https://www.advocate-pensia.com.ua/blog/#breadcrumbs',
          },
        },
      ],
    },
  },

  //Оскарження рішень ПФУ в суді — виграні справи | Поддяча Юлія
};

export const DEFAULT_SEO_CONFIG: PageSEO = {
  title:
    'Адвокат по пенсіях — Поддяча Юлія | призначення, перерахунок, спори з ПФУ',
  description:
    'Юридична допомога з пенсійних питань: призначення та перерахунок пенсії, оскарження рішень Пенсійного фонду України. Адвокат Поддяча Юлія Юріївна.',
  keywords:
    'адвокат по пенсії, адвокат по пенсіях, пенсійний адвокат, юрист по пенсіях, юрист по пенсії, пенсійний юрист, адвокат Поддяча, юрист Поддяча, Поддяча Юлія Юріївна, пенсійні питання, пенсійна допомога, юридичні послуги з пенсій, оформлення пенсії, перерахунок пенсії, пенсійні виплати, правова допомога пенсіонерам, консультація по пенсії, пенсійні спори, допомога по пенсіях',
  canonical: '/',
};

export const GLOBAL_SEO_CONFIG: { [key: string]: PageSEO } = {
  ...SEO_DATA,
  ...BLOG_SEO_DATA,
};
