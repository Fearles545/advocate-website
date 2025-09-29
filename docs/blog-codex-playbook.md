# Blog Post Generator — Codex Playbook

**Мета:** На основі сирого тексту блогу згенерувати:

1. `src/app/blog/blog-posts/posts/<slug>.html`
2. `src/app/blog/blog-posts/posts/<slug>.seo.ts`
3. Додати імпорт у `src/app/blog/blog-posts/index.seo.ts` і розпилити в `BLOG_SEO_DATA`.

## 📥 Вхідні дані (заповнюй перед запуском)

- **H1:** `<H1 тут>`
- **Опис (≤160 симв.):** `<опис>`
- **Ключові слова (через кому):** `<ключ1, ключ2, ключ3>`
- **Основний текст/тези:** `<текст>`
- **Дата публікації (ISO +03:00):** `YYYY-MM-DDThh:mm:ss+03:00`
- **Дата оновлення (ISO +03:00, опц.):** `<якщо інша — вкажи; інакше як published>`
- **Slug (kebab-case):** `<якщо не задано — згенеруй зі H1>`

**Базовий URL:** `https://www.advocate-pensia.com.ua`  
**Author/Publisher (фіксовано):**

```json
author: {
  "@type": "Person",
  "name": "Поддяча Юлія Юріївна",
  "url": "https://www.advocate-pensia.com.ua/about-me"
},
publisher: {
  "@type": "Organization",
  "name": "Поддяча Юлія Юріївна",
  "logo": {
    "@type": "ImageObject",
    "url": "https://www.advocate-pensia.com.ua/assets/logo/logo-black-cut.png",
    "width": 512,
    "height": 512
  }
}


⸻

🧱 Правила/конвенції
	•	Імена файлів:
	•	HTML: src/app/blog/blog-posts/posts/<slug>.html
	•	SEO:  src/app/blog/blog-posts/posts/<slug>.seo.ts
	•	Експорт у SEO: змінна в snake_case від slug: <slug_in_snake_case>.
	•	Ключ у конфігу = <slug> (kebab-case).
	•	canonical — відносний: /blog/<slug>.
	•	У JSON-LD: BlogPosting + BreadcrumbList, mainEntityOfPage = WebPage.
	•	У JSON-LD url і @id — абсолютні.
	•	keywords: нагорі — рядок; у JSON-LD — масив.
	•	image: дефолтний OG або свій (бажано унікальний на пост).
	•	H1 рендериться реюзабельним компонентом; у JSON-LD ставимо headline.

⸻

🧩 Шаблон HTML → src/app/blog/blog-posts/posts/<slug>.html

<article>
  <blockquote class="blog-quote">
    <p><SHORT_TEASER></p>
  </blockquote>

  <section>
    <h2><H1_DUPLICATE_FOR_SECTION></h2>
    <p><INTRO_1_3_SENTENCES></p>
  </section>

  <hr />

  <section>
    <h2><SUBTITLE_1></h2>
    <ul>
      <li><POINT_1></li>
      <li><POINT_2></li>
      <li><POINT_3></li>
    </ul>
  </section>

  <hr />

  <section>
    <h2>Важливо знати</h2>
    <p><IMPORTANT_NOTE></p>
  </section>

  <hr />

  <footer>
    <h3>Професійна допомога</h3>
    <p>
      Надаю правову допомогу у справах щодо призначення, перерахунку та
      оскарження рішень Пенсійного фонду.
    </p>
    <address>
      <strong>Адвокат — Поддяча Юлія Юріївна</strong>
    </address>
  </footer>
</article>


⸻

🧠 Шаблон SEO → src/app/blog/blog-posts/posts/<slug>.seo.ts

export const <slug_in_snake_case> = {
  '<slug>': {
    title: '<H1> | Адвокат Поддяча Юлія Юріївна',
    description: '<META_DESCRIPTION_<=160>',
    keywords: '<kw1, kw2, kw3>',
    type: 'article',
    publishedTime: '<YYYY-MM-DDThh:mm:ss+03:00>',
    modifiedTime: '<YYYY-MM-DDThh:mm:ss+03:00>',
    canonical: '/blog/<slug>',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BlogPosting',
          headline: '<H1>',
          description: '<JSONLD_DESCRIPTION_(може відрізнятись від meta)>',
          datePublished: '<YYYY-MM-DDThh:mm:ss+03:00>',
          dateModified: '<YYYY-MM-DDThh:mm:ss+03:00>',
          author: {
            '@type': 'Person',
            name: 'Поддяча Юлія Юріївна',
            url: 'https://www.advocate-pensia.com.ua/about-me',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Поддяча Юлія Юріївна',
            logo: {
              '@type': 'ImageObject',
              url: 'https://www.advocate-pensia.com.ua/assets/logo/logo-black-cut.png',
              width: 512,
              height: 512,
            },
          },
          image: [
            'https://www.advocate-pensia.com.ua/assets/images/og/default-og-image.webp',
          ],
          inLanguage: 'uk-UA',
          keywords: ['<kw1>', '<kw2>', '<kw3>'],
          articleSection: 'Пенсійне право',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://www.advocate-pensia.com.ua/blog/<slug>',
          },
          url: 'https://www.advocate-pensia.com.ua/blog/<slug>',
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Блог', item: 'https://www.advocate-pensia.com.ua/blog' },
            { '@type': 'ListItem', position: 2, name: '<H1>', item: 'https://www.advocate-pensia.com.ua/blog/<slug>' }
          ],
        },
      ],
    },
  },
};


⸻

➕ Оновлення index.seo.ts

// src/app/blog/blog-posts/index.seo.ts

// 1) Імпорт нового конфігу
import { <slug_in_snake_case> } from './posts/<slug>.seo';

// 2) Додати в реєстр
export const BLOG_SEO_DATA = {
  // ...інші
  ...<slug_in_snake_case>,
};


⸻

🧪 Чек-лист перед комітом
	•	HTML і SEO мають однаковий <slug>.
	•	title ↔ headline узгоджені з H1.
	•	description ≤ 160 символів.
	•	keywords: рядок у меті, масив у JSON-LD.
	•	canonical відносний; url/@id абсолютні.
	•	Дати у форматі YYYY-MM-DDThh:mm:ss+03:00.
	•	Імпорт + розпилення додано в index.seo.ts.
	•	logo/og зображення доступні.

⸻

🚀 Як користуватись цим Playbook’ом
	1.	Відкрий docs/blog-codex-playbook.md у своєму редакторі (VS Code / Cursor / інший, де є Copilot/Codex).
	2.	Заповни блок “Вхідні дані” (H1, опис, ключові слова, текст, дати, slug).
	3.	Виділи секцію “Вхідні дані” + скажи асистенту:
«Згенеруй файли за Playbook’ом: HTML, .seo.ts і додай імпорт у index.seo.ts. Дотримуйся шаблонів і правил вище.»
	4.	Асистент має створити:
	•	src/app/blog/blog-posts/posts/<slug>.html
	•	src/app/blog/blog-posts/posts/<slug>.seo.ts
	•	змінити src/app/blog/blog-posts/index.seo.ts (імпорт + розпилення)
	5.	Перевір зміни за чек-листом і закоміть.

Так, твоя ідея правильна: показуєш асистенту цей Markdown, підставляєш текст посту й просиш «зробити по Playbook’у». Це і є “одна кнопка” для повторюваної генерації.

⸻

🧾 Міні-приклад (для тесту)
	•	H1: Кому перерахують пенсію з 1 квітня 2025 року?
	•	Slug: komu-pererakhuiut-pensii-1-kvitnia-2025
	•	Опис: Хто отримає автоматичний перерахунок з 1 квітня 2025 року, як враховуються стаж і зарплата, коли виплати та що робити, якщо 24 місяці стажу не набрано.
	•	Ключові слова: перерахунок пенсії 2025, працюючі пенсіонери, страховий стаж 24 місяці
	•	Дата: 2025-09-29T19:00:00+03:00

---
```
