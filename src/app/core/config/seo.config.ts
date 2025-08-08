import { PageSEO } from '../services/seo.service';

/**
 * A centralized configuration object for page-specific SEO data.
 * Using a single source of truth like this makes maintenance and updates much simpler.
 * The keys should correspond to the route paths for easy mapping.
 */
export const SEO_DATA: { [key: string]: PageSEO } = {
  main: {
    title: 'Поддяча Юлія Юріївна | Адвокат по пенсіях в Україні',
    description:
      'Професійні адвокатські послуги з пенсійних питань. Оформлення пенсії без вашої присутності в ПФУ. Кваліфікована юридична допомога, досвід 10+ років.',
    keywords:
      'адвокат, пенсія, пенсійні послуги, юридична допомога, ПФУ, Україна',
    image: '/assets/main-og-image.webp',
    canonical: '/',
  },
  'about-me': {
    title: 'Про мене | Адвокат Поддяча Юлія Юріївна',
    description:
      'Досвід роботи адвокатом більше 10 років. Спеціалізація на пенсійних питаннях та соціальному захисті. Кваліфікована юридична допомога.',
    keywords:
      'адвокат про себе, юрист, пенсійні питання, соціальний захист, Юлія Поддяча, досвід роботи',
    // It's good practice to have a specific OG image for key pages.
    image: '/assets/about-me-og-image.webp',
    canonical: '/about-me',
  },
  services: {
    title: 'Послуги | Адвокат по пенсіях в Україні',
    description:
      'Повний спектр послуг з пенсійних питань: оформлення та перерахунок пенсій, судові спори з ПФУ, юридичні консультації. Професійна допомога без вашої присутності.',
    keywords:
      'послуги адвоката, оформлення пенсії, перерахунок пенсії, пенсійні послуги, юридична консультація, ПФУ, судові спори',
    image: '/assets/services-og-image.webp', // A specific image for sharing this page
    canonical: '/services',
  },
  documents: {
    title: 'Документи | Адвокат Поддяча Юлія Юріївна',
    description:
      'Документи та сертифікати, що підтверджують кваліфікацію адвоката Поддяча Юлії Юріївни. Дипломи, свідоцтво про право на заняття адвокатською діяльністю та сертифікати.',
    keywords:
      'документи адвоката, ліцензія адвоката, диплом юриста, сертифікати, кваліфікація, Юлія Поддяча',
    image: '/assets/documents-og-image.webp', // A representative image for social sharing
    canonical: '/documents',
  },
  contacts: {
    title: 'Контакти | Адвокат Поддяча Юлія Юріївна',
    description:
      'Контактна інформація адвоката Поддяча Юлії Юріївни. Телефон, email, Viber, Telegram. Запишіться на консультацію онлайн.',
    keywords:
      'контакти адвоката, телефон адвоката, email адвоката, записатися на консультацію, Юлія Поддяча',
    image: '/assets/contacts-og-image.webp', // A specific image for sharing this page
    canonical: '/contacts',
  },
};
