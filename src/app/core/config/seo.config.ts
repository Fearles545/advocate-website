import { BLOG_SEO_DATA } from '../../blog/blog-seo.config';
import { COURT_CASES_SEO_DATA } from '../../court-cases/court-cases-seo.config';
import { INSTRUCTIONS_SEO_DATA } from '../../instructions/instructions-seo.config';
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
    title: 'Юридичні послуги з пенсійних питань | Адвокат Поддяча Юлія',
    description:
      'Юридичні послуги з призначення та перерахунку пенсії, оскарження рішень Пенсійного фонду України, судовий захист пенсійних прав. Онлайн допомога адвоката з пенсійних питань.',
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
    title:
      'Документи адвоката Поддячої Юлії Юріївни — освіта, сертифікати, статус',
    description:
      'Офіційні документи адвоката Поддячої Юлії Юріївни: свідоцтво, освіта, сертифікати підвищення кваліфікації, профіль у реєстрі НААУ.',
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
    title: 'Контакти адвоката з пенсійних питань — Поддяча Юлія Юріївна',
    description:
      "Контакти адвоката з пенсійних питань Поддячої Юлії Юріївни. Консультації онлайн по всій Україні та за кордоном. Телефон, месенджери, форма зворотного зв'язку.",
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
  consultation: {
    title: 'Запис на консультацію з пенсійних питань | Адвокат Поддяча Юлія',
    description:
      "Заповніть форму для запису на консультацію з адвокатом по пенсіях. Швидкий зворотний зв'язок, консультації онлайн по всій Україні та за кордоном.",
    keywords:
      'запис на консультацію, консультація адвоката пенсія, запис до адвоката онлайн, юридична консультація пенсія, консультація по пенсії онлайн',
    canonical: '/consultation/',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          '@id': 'https://www.advocate-pensia.com.ua/consultation/#breadcrumbs',
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
              name: 'Консультація',
              item: {
                '@type': 'WebPage',
                '@id': 'https://www.advocate-pensia.com.ua/consultation/',
                name: 'Консультація',
              },
            },
          ],
        },
        {
          '@type': 'ContactPage',
          '@id': 'https://www.advocate-pensia.com.ua/consultation/#webpage',
          name: 'Запис на консультацію | Адвокат Поддяча Юлія Юріївна',
          url: 'https://www.advocate-pensia.com.ua/consultation/',
          inLanguage: 'uk-UA',
          isPartOf: { '@id': 'https://www.advocate-pensia.com.ua/#website' },
          about: { '@id': 'https://www.advocate-pensia.com.ua/#org' },
          breadcrumb: {
            '@id':
              'https://www.advocate-pensia.com.ua/consultation/#breadcrumbs',
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
      'Корисні статті та відповіді на питання з пенсійного права від адвоката Поддячої Юлії Юріївни: призначення пенсії, перерахунок, підтвердження стажу, судова практика та зміни в законодавстві',
    keywords:
      'блог адвоката, статті про пенсії, поради юриста, новини пенсійного законодавства, Юлія Поддяча',
    canonical: '/blog/',
    type: 'website',
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
          name: 'Блог | Адвокат Поддяча Юлія Юріївна',
          url: 'https://www.advocate-pensia.com.ua/blog/',
          inLanguage: 'uk-UA',
          isPartOf: { '@id': 'https://www.advocate-pensia.com.ua/#website' },
          about: { '@id': 'https://www.advocate-pensia.com.ua/#org' },
          breadcrumb: {
            '@id': 'https://www.advocate-pensia.com.ua/blog/#breadcrumbs',
          },
        },
      ],
    },
  },

  instructions: {
    title:
      'Покрокові інструкції — КЕП, довідки, оплата | Адвокат Поддяча Юлія',
    description:
      'Покрокові інструкції з отримання КЕП, довідок через Дію, Портал ПФУ, Приват24 та Монобанк, а також оплати юридичних послуг. Зі скріншотами кожного кроку.',
    keywords:
      'інструкція КЕП, отримати КЕП ПриватБанк, довідка ОК-5 Дія, довідка про доходи пенсіонера, заява про виплату пенсії Монобанк, оплата через Приват24, покрокова інструкція',
    canonical: '/instructions/',
    type: 'website',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          '@id': 'https://www.advocate-pensia.com.ua/instructions/#breadcrumbs',
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
              name: 'Інструкції',
              item: {
                '@type': 'WebPage',
                '@id': 'https://www.advocate-pensia.com.ua/instructions/',
                name: 'Інструкції',
              },
            },
          ],
        },
        {
          '@type': 'CollectionPage',
          '@id': 'https://www.advocate-pensia.com.ua/instructions/#webpage',
          name: 'Покрокові інструкції | Адвокат Поддяча Юлія Юріївна',
          url: 'https://www.advocate-pensia.com.ua/instructions/',
          inLanguage: 'uk-UA',
          isPartOf: { '@id': 'https://www.advocate-pensia.com.ua/#website' },
          about: { '@id': 'https://www.advocate-pensia.com.ua/#org' },
          breadcrumb: {
            '@id':
              'https://www.advocate-pensia.com.ua/instructions/#breadcrumbs',
          },
        },
      ],
    },
  },

  'court-cases': {
    title:
      'Судові рішення у пенсійних спорах — практика адвоката з пенсійних прав',
    description:
      'Ознайомтеся з прикладами судових рішень у спорах з Пенсійним фондом України: зарахування стажу, перерахунок пенсії, оскарження відмов та інші виграні справи від адвоката з пенсійних питань.',
    keywords:
      'судові рішення пенсія, виграні справи ПФУ, пенсійний адвокат практика, індексація пенсії суд, пільговий стаж суд, Список №1, Список №2, відмова Пенсійного фонду',
    canonical: '/court-cases/',
    type: 'website',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          '@id': 'https://www.advocate-pensia.com.ua/court-cases/#breadcrumbs',
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
              name: 'Судові рішення',
              item: {
                '@type': 'WebPage',
                '@id': 'https://www.advocate-pensia.com.ua/court-cases/',
                name: 'Судові рішення',
              },
            },
          ],
        },
        {
          '@type': 'CollectionPage',
          '@id': 'https://www.advocate-pensia.com.ua/court-cases/#webpage',
          name: 'Судові рішення | Адвокат Поддяча Юлія Юріївна',
          url: 'https://www.advocate-pensia.com.ua/court-cases/',
          inLanguage: 'uk-UA',
          isPartOf: { '@id': 'https://www.advocate-pensia.com.ua/#website' },
          about: { '@id': 'https://www.advocate-pensia.com.ua/#org' },
          breadcrumb: {
            '@id':
              'https://www.advocate-pensia.com.ua/court-cases/#breadcrumbs',
          },
        },
      ],
    },
  },
  faq: {
    title:
      'Поширені питання про пенсійні справи — консультація пенсійного адвоката',
    description:
      "Відповіді на поширені питання про призначення та перерахунок пенсії, стаж, відмови ПФУ та судовий захист. Роз'яснення пенсійного адвоката, консультації онлайн.",
    keywords:
      'поширені питання пенсія, FAQ пенсійний адвокат, консультація юриста пенсія, питання про пенсію, пенсійний стаж питання, оскарження ПФУ питання, судовий захист пенсії',
    canonical: '/faq/',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          '@id': 'https://www.advocate-pensia.com.ua/faq/#breadcrumbs',
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
              name: 'FAQ',
              item: {
                '@type': 'WebPage',
                '@id': 'https://www.advocate-pensia.com.ua/faq/',
                name: 'Поширені питання',
              },
            },
          ],
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://www.advocate-pensia.com.ua/faq/#webpage',
          name: 'Поширені питання | Адвокат Поддяча Юлія Юріївна',
          url: 'https://www.advocate-pensia.com.ua/faq/',
          inLanguage: 'uk-UA',
          isPartOf: { '@id': 'https://www.advocate-pensia.com.ua/#website' },
          about: { '@id': 'https://www.advocate-pensia.com.ua/#org' },
          breadcrumb: {
            '@id': 'https://www.advocate-pensia.com.ua/faq/#breadcrumbs',
          },
          mainEntity: [
            {
              '@type': 'Question',
              name: 'Що робить пенсійний адвокат?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Пенсійний адвокат спеціалізується на питаннях пенсійного забезпечення: призначенні пенсії, перерахунку, підтвердженні страхового та пільгового стажу, оскарженні рішень Пенсійного фонду України та захисті прав клієнта в суді.',
              },
            },
            {
              '@type': 'Question',
              name: 'Як надається юридична допомога?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Юридична допомога надається дистанційно (онлайн) і не потребує особистих візитів до Пенсійного фонду. Робота здійснюється через телефон, Viber, Telegram, WhatsApp та електронний кабінет Пенсійного фонду України.',
              },
            },
            {
              '@type': 'Question',
              name: 'Коли варто звертатися до пенсійного адвоката?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Доцільно звернутися за юридичною допомогою, якщо виникають сумніви щодо права на пенсію, ви готуєте документи для призначення або перерахунку пенсії, Пенсійний фонд не зарахував стаж чи заробіток, отримано відмову у призначенні або перерахунку пенсії, або необхідно оскаржити рішення ПФУ в суді.',
              },
            },
            {
              '@type': 'Question',
              name: 'Чи можна працювати з адвокатом, якщо я не в Україні?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: "Так. Юридична допомога надається клієнтам по всій Україні та за кордоном у дистанційному форматі через зручні засоби зв'язку (Viber, WhatsApp, Telegram, електронна пошта).",
              },
            },
            {
              '@type': 'Question',
              name: 'Чи можна подати заяву на пенсію, якщо я проживаю за кордоном?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Так, громадяни України можуть подати заяву на призначення пенсії, навіть якщо тимчасово проживають за кордоном. Правильне оформлення документів та взаємодія з Пенсійним фондом часто потребують юридичного супроводу.',
              },
            },
            {
              '@type': 'Question',
              name: 'Як визначається страховий стаж?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Страховий стаж визначається на підставі документів про роботу, навчання, службу та інших підтверджених періодів. Якщо Пенсійний фонд не зараховує окремі роки, їх можна підтвердити в юридичному порядку, у тому числі через суд.',
              },
            },
            {
              '@type': 'Question',
              name: 'Чи можу я самостійно звернутися до Пенсійного фонду?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Так, звернення до Пенсійного фонду можливе самостійно. Однак у складних випадках юридичний супровід пенсійного адвоката значно підвищує шанси на позитивний результат.',
              },
            },
            {
              '@type': 'Question',
              name: 'Чи можна оскаржити рішення Пенсійного фонду в суді?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Так. Адвокат допомагає підготувати та подати позовну заяву, зібрати необхідні докази, сформувати правову позицію та представляти інтереси клієнта в судах першої, апеляційної та касаційної інстанцій.',
              },
            },
            {
              '@type': 'Question',
              name: 'Скільки часу займає судовий розгляд пенсійної справи?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Строки залежать від складності справи, судової інстанції та завантаженості суду. У середньому розгляд справи в суді першої інстанції може тривати кілька місяців.',
              },
            },
            {
              '@type': 'Question',
              name: 'Чи потрібно особисто бути присутнім у суді?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: "У більшості пенсійних справ можливе письмове провадження або участь через відеоконференцію. Адвокат представляє інтереси клієнта в суді, тому особиста присутність зазвичай не є обов'язковою.",
              },
            },
            {
              '@type': 'Question',
              name: 'Що потрібно мати для першої консультації?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Для первинної консультації бажано підготувати документи про стаж та роботу (трудову книжку або її копії), а також документи Пенсійного фонду (рішення, відмови, якщо вони є).',
              },
            },
            {
              '@type': 'Question',
              name: 'Скільки коштують послуги адвоката?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Вартість юридичних послуг визначається індивідуально та залежить від виду пенсії, обсягу документів, складності справи та наявності судового спору. Остаточна вартість узгоджується після консультації.',
              },
            },
          ],
        },
      ],
    },
  },
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
  ...COURT_CASES_SEO_DATA,
  ...INSTRUCTIONS_SEO_DATA,
};
