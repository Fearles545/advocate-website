# 09: Batch sign-off: sitemap lastmod and full browser pass

**What to build:** Once everything is merged, two things remain:
- the sitemap lastmod is updated for every page the batch changed;
- the whole batch is verified on the production build served locally, at ~390 px and ~1280 px, as the spec's "Testing Decisions" describe.

This ticket is Leo's «готово». Spec: `.scratch/2026-10-04-batch/spec.md`, sections "Documentation and sitemap" and "Testing Decisions".

**Blocked by:** 02, 06, 07, 08

**Status:** resolved

- [x] lastmod is set to the commit date for:
  - the home page and the reviews page, which now show new reviews and the newest decisions;
  - `/blog/` and `/court-cases/`;
  - all 29 court decision URLs.

  The eight new URLs from tickets 03, 04 and 08 are present.
- [x] `npm run build:ssg` reports the baseline route count recorded in ticket 01, plus 8.
- [x] On the preview server, every sitemap URL returns prerendered HTML with its own title, description and canonical.
- [x] Every internal link on the new and edited pages resolves.
- [x] A browser pass at ~390 px and ~1280 px finds the layout correct and the content matching the sources on:
  - the court decisions list: all six categories with their members checked against the spec's table, pagination, deep links, and state after coming back;
  - the six new decisions and the three edited ones;
  - the prev/next scenarios;
  - the blog list, both new articles, and an older article's navigator;
  - the homepage and the reviews page.
- [x] A report lists what was checked, with screenshots, plus anything that failed.
- [x] A message for the advocate, in Ukrainian, covers:
  - the three open questions from the spec;
  - an FYI on the 130 → 135 грн correction;
  - the note that each article lists four recommended articles but the block shows three.

## Comments

**2026-10-05, expectations.** Expected route count: 102 + 8 = 110, with every route's `index.html` written (CLAUDE.md "Build Behavior"). Since 847cba0 blog posts prerender their full body, which visitors never see (the client re-renders), so check the prerendered HTML of the two new articles directly: H1, body, internal links and images. The message for the advocate also says that the list items of the six new decisions follow the site's format (capital first letter, no trailing «;»).

**2026-10-05, resolved.** Commits: eaea964. lastmod 2026-10-05 on 35 sitemap entries (home, reviews, both lists, 29 decisions, 2 new articles); 109 URLs; every sitemap URL returns prerendered HTML, and the only title/description/canonical defects (10 URLs) are identical in the cf86310 build. Independent check on the final build (after the review fixes, 62ac80b): `npm run build:ssg` printed 0 `ERROR` lines and `Prerendered 110 static routes`; every route wrote its `index.html`; the browser suite at 390 and 1280 px passed 513/513 (blog 40, reviews 22, articles 41 + 41, decisions 236, edits 5, court decisions list 128).

**2026-10-05, message for the advocate** (to send after the push; Ukrainian):

> Юлія Юріївна, добрий день!
>
> Матеріали з Вашого листа від 4 жовтня вже на сайті: два відгуки, дві статті, шість судових рішень (№24–29), а в трьох попередніх рішеннях додано посилання на продовження справ. У розділі «Судові рішення» з'явилися фільтр за категоріями, посторінкова навігація і перехід «Попереднє / Наступне» між рішеннями.
>
> Для інформації:
> 1. У рішенні 380/9255/26 SEO Title (заголовок сторінки в пошуку Google) був «…100 грн і 130 грн…». В обох документах справи (рішенні суду першої інстанції та постанові апеляційного суду) йдеться про 135 грн, тому ми виправили на «…100 грн і 135 грн…».
> 2. У кожній новій статті Ви вказали чотири рекомендовані статті, а блок на сайті показує три, перші з Вашого списку. Не потрапили в блок «Постанову Кабінету Міністрів України №821 визнано протиправною: апеляцію відхилено» (стаття від 02.10) і «Як підвищити пенсію за вислугу років?» (стаття від 03.10). Якщо котрусь із них важливо показати, напишіть, яку замінити.
> 3. Пункти списків «Результат» і «Кому буде корисним це рішення» в нових рішеннях оформлено так само, як на інших сторінках сайту: кожен пункт з великої літери, без «;» в кінці, без позначок ✔ і жирного шрифту.
>
> Питання:
> 1. У справі 500/5783/25 постанову апеляційного суду Ви віднесли також до «Інших пенсійних спорів», а рішення першої інстанції ні. Так і має бути?
> 2. Для статей Ви вказали «Призначення пенсії» і «Перерахунок пенсії», але це категорії судових рішень. У блозі свої категорії, тому статтю від 02.10 ми віднесли до «Пенсія за віком» і «Загальні пенсійні питання», а статтю від 03.10 до «Стаж та перерахунок» і «Загальні пенсійні питання». Чи хочете Ви один спільний набір категорій для статей і рішень?
> 3. Чи потрібні окремі сторінки для кожної категорії рішень, наприклад «Індексація пенсії»? Для них знадобиться Ваш короткий вступний текст до кожної категорії.
