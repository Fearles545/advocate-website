# Links

Blog draft - https://docs.google.com/document/d/1rEme7bCg6W6PnBFMJL2nQ9NG2osWwGIdcCOIqexZGJY/edit?tab=t.0

# Tasks

- think about blog implementation

  - with SEO in mind and at the first place
  - add TikTok integration (not the case, implement YouTube integration)

- update schema.org script type="application/ld+json" (look chat at Gemini - Канонічні URL в SEO: Пояснення)

- check SEO suggestions with plerdy

- add breadcrumbs (learn more about seo it adds)

- add share in social media option on the bottom of the blog post

#New
Коротко: глобальний JSON-LD — це добре, але сам по собі “не закриває” всі кейси.
• Те, що ти вже вставив у index.html як LegalService, чудово ідентифікує сайт/практику (E-E-A-T, бренд, контактні дані).
• Але для різних типів сторінок пошуковики очікують додаткові, більш вузькі схеми. Тому глобального блоку інколи недостатньо, якщо ти хочеш rich-results саме для цих сторінок.

Що залишити глобальним (на всіх сторінках)
• WebSite + Organization або LegalService (у тебе вже є LegalService — ок).
• Постійні атрибути (назва, сайт, телефон, логотип, image).
• Опційно — sameAs, ContactPoint.

Що додавати пер-сторінково
• Блог-пости: BlogPosting (+ BreadcrumbList). Це дає шанси на article-rich-results, каруселі тощо.
• Список блогу (/blog): CollectionPage або Blog (+ BreadcrumbList).
• Про мене: тип сторінки AboutPage і блок Person (узгоджений з автором у постах).
• Контакти: ContactPage (можна додати ContactPoint).
• Послуги: або залишити глобальний LegalService, або додати Service для конкретних оферів (не обов’язково, але корисно).
• FAQ-секції: FAQPage для реальних питань-відповідей (часто дає розширені сніпети).

Чому так
• Глобальний LegalService відповідає за ідентичність і “entity” сайту.
• Пер-сторінкові схеми відповідають за наміри сторінки (стаття, колекція, про автора, контакти) і відкривають доступ до відповідних rich-результатів.
• Можна мати кілька JSON-LD на одній сторінці — це норм. Головне, щоб не було суперечливих даних (назва, URL, логотип мають збігатись).

Практичний чек-лист
• Залиш свій глобальний LegalService як є.
• Для блогу продовжуй додавати локальний BlogPosting (+ BreadcrumbList).
• Для /about-me додай AboutPage + Person (узгоджені з автором у постах).
• Для /blog додай CollectionPage/Blog + BreadcrumbList.
• Для сторінок з питаннями-відповідями — FAQPage.
• Стеж, щоб logo та image вказувалися абсолютними URL і були доступні; розмір логотипа ≥112×112.
• Бажано мати сталу політику canonical (відносний у мета й абсолютний в JSON-LD — ок; головне — послідовність).

Якщо хочеш, я можу підкинути міні-шаблони JSON-LD для /about-me, /blog та FAQPage під твою структуру—щоб просто вставити й підредагувати текст.

# Done

- make links to pages config driven to make it easier to add new routes in one place
- make favicon readable
- check all images for alt attribute
- create og:image for each page (use one for all)
- create og images with native mac preview app
- change image at contact to one of Yuliia sent
