Generate ALL artifacts for a NEW blog post, using ONLY the data I paste in INPUT.

## PROJECT CONTEXT

- Framework: Angular 20, SSR/SSG.
- Site base URL: https://www.advocate-pensia.com.ua
- Blog files:
  - HTML: src/app/blog/blog-posts/posts/<slug>.html
  - SEO: src/app/blog/blog-posts/posts/<slug>.seo.ts
- Indexes:
  - Blogs list: src/app/blog/blog-posts/index.ts (manual sorting: NEWEST first)
  - SEO registry: central SEO map file in posts/ (import and merge like existing posts)
- HTML reference pattern:
  - src/app/blog/blog-posts/posts/\_template.blog.html
  - Or mirror existing posts:
    - posts/khto-maie-pravo-na-pensiiu-za-vikom-u-2025.html
    - posts/komu-pererakhuiut-pensii-1-kvitnia-2025.html
    - posts/minimalnyi-rozmir-pensii-za-vikom-umovy-osoblyvosti.html
- SITEMAP PATH (exact):
  - public/sitemap.xml ← update this file

## INTERFACE (shape only)

export interface Blog {
id?: number;
title: string; // H1 is rendered by BlogPostComponent (NO <h1> in HTML)
slug: string; // auto-generated from title (kebab-case, ASCII-safe)
description?: string;
src: string; // handled by component; NO <iframe> in post HTML
date: string; // YYYY-MM-DD (UI + sorting)
}

## CRITICAL HTML RULES

### Blog Quote (Lead Paragraph)

- The <blockquote class="blog-quote"> is not a title but a 1–2 sentence lead summary.
- It should briefly explain the essence of the article: who it concerns, what problem it solves, and the key benefit or outcome.
- Avoid copying the title or using generic openings like “In this article…”.
- Include 1–2 main keywords naturally within the lead.
- Length: 180–300 characters (1–2 sentences max).

- Use EXACT blog HTML pattern:
  <article>
    <blockquote class="blog-quote">…</blockquote>
    <section>…</section>
    <hr />
    <section>…</section>
    <hr />
    <section>…</section>
  </article>
- Start headings from <h2>. NO <h1>.
- NO <iframe> (video is rendered by component via `src`).
- Keep semantic tags only: <article>, <blockquote>, <section>, <h2>/<h3>, <ul>/<ol>, <p>, <aside>, <hr />, <time>.
- Preserve author-provided links (<a>) from content. Do NOT invent URLs.
- If content has dates, allow <time datetime="YYYY-MM-DD">…</time> inline.
- No placeholder prose. Use exactly the content I provide (Markdown or HTML). If Markdown is provided, convert to this pattern.

## SEO RULES

- canonical must end with a trailing slash: /blog/<slug>/
- WebPage.name = title (WITHOUT brand). `<title>` field includes brand.
- JSON-LD @graph: BreadcrumbList, WebPage, BlogPosting (author Person "Поддяча Юлія Юріївна", publisher by @id website/#org, image = default OG, inLanguage "uk-UA", articleSection "Пенсійне право", mainEntityOfPage → WebPage, isPartOf → …/#website).
- publishedTime/modifiedTime: TODAY (Europe/Kyiv) as `${YYYY-MM-DD}T09:00:00+03:00` unless `publishedTime`/`modifiedTime` explicitly provided in INPUT.

## SITEMAP UPDATE RULES (public/sitemap.xml)

- Do NOT create a new <url> for /blog/.
- Only update <lastmod> if an entry for /blog/ already exists.
- For the new post: add/update exactly one <url> with <loc> .../blog/<slug>/
  and <lastmod> = TODAY (Europe/Kyiv).

- XML namespace already present: keep as-is.
- Follow the project’s style:
  - posts have: <changefreq>monthly</changefreq> and <priority>0.7</priority>
  - homepage weekly (leave untouched)
- Add or update the <url> entry for the new post:
  <url>
  <loc>https://www.advocate-pensia.com.ua/blog/<slug>/</loc>
  <lastmod>TODAY_EUROPE_KYIV_YYYY-MM-DD</lastmod> <!-- today -->
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
  </url>
- For the blog listing page `/blog/`:
  **DO NOT create a new <url>**.
  **Only update <lastmod> if an entry for `/blog/` already exists.**
- Do not duplicate <loc> entries; keep ordering consistent.

## RUNTIME INPUT (Chat-delivered)

### What you will paste into the chat

Paste **one fenced block** with label `INPUT_JSON`. CodeX must treat this as the _only_ dynamic input for the run.

```INPUT_JSON
{
  "title": "<string>",
  "src": "<string | optional>",
  "date": "YYYY-MM-DD",
  "content": "<markdown or html string>",
  "contentFile": "<relative/path.md | optional>",
  "description": "<string | optional>",
  "keywords": ["<string>", "<string>"],
  "publishedTime": "YYYY-MM-DDThh:mm:ss+03:00",
  "modifiedTime": "YYYY-MM-DDThh:mm:ss+03:00"
}
```

Rules:

- If `contentFile` is provided, ignore `content` and load file content relative to repo root.
- `src` is handled by the component (no `<iframe>` in HTML output).
- Dates use Europe/Kyiv timezone; if `publishedTime`/`modifiedTime` are missing — default to `${date}T09:00:00+03:00`.
- Do **not** echo this block back verbatim in outputs.

## HOW TO USE WITH CodeX

1. In chat, write: **“Use static instruction file at `src/app/blog/blog-posts/posts-automatation.md`.”**
2. Immediately paste the single `INPUT_JSON` block shown above with your real values.
3. CodeX must read this file for all static rules and use only `INPUT_JSON` for dynamic data.

## OUTPUT

Return **exactly these fenced blocks in this order** (no extra commentary):

```FILE:posts/<slug>.html
<full HTML file content>
```

```FILE:posts/<slug>.seo.ts
<full SEO TS file content>
```

```DIFF:blog-posts/index.ts
<contextual diff that inserts the new blog item keeping newest-first>
```

```DIFF:blog-posts/<SEO_REGISTRY_INDEX_FILE>
<import of posts/<slug>.seo + merge into master SEO map>
```

```DIFF:public/sitemap.xml
<added/updated <url> for /blog/<slug>/> and updated <lastmod> for /blog/ if present>
```

## INPUT

(Paste REAL values; content may be inline Markdown/HTML OR a file path.)
<<INPUT
title: "Що таке Список №1?"
src: "https://www.youtube.com/embed/9pS1349TKfU"
date: "2025-04-11"
content: `
Список №1 — це нормативно-правовий акт, що містить перелік виробництв, робіт, професій, посад та показників, зайнятість на яких повний робочий день віднесена до особливо шкідливих і особливо важких умов праці.
Працівники, які мають підтверджений стаж за Списком №1, отримують право на призначення пенсії за віком на пільгових умовах.

Хто затверджує Список №1?
Список №1 затверджується постановами Кабінету Міністрів України.

Чинним є Список №1, затверджений постановою Кабінету Міністрів України від 24.06.2016 №461.

Попередні редакції втратили чинність, але застосовуються до періодів роботи, які відбувалися під час їх дії.

Які пільги передбачені для працівників за Списком №1?
Призначення пенсії раніше загальновстановленого пенсійного віку.

Зменшені вимоги до загального страхового стажу.

Додаткове зарахування стажу:

відповідно до статті 24 Закону України «Про загальнообов’язкове державне пенсійне страхування» №1058-IV від 09.07.2003 року, за кожний повний рік роботи на підземних роботах або на роботах із особливо шкідливими і важкими умовами праці за Списком №1 до страхового стажу додається ще один рік.

Типові проблеми при підтвердженні стажу за Списком №1
На практиці Пенсійний фонд України може відмовляти у зарахуванні пільгового стажу через:
відсутність уточнюючих довідок, що підтверджують пільговий характер роботи;

неможливість отримати такі довідки у зв’язку з тим, що підприємство знаходиться на тимчасово окупованій території або архівні документи знищені;

відсутність атестації робочих місць;

відмови навіть при наявності даних у системі персоніфікованого обліку, якщо відсутні уточнюючі документи.

У таких випадках підтвердити стаж можливо лише у судовому порядку.

Висновок
Список №1 — це нормативний перелік професій, посад і робіт з особливо шкідливими та важкими умовами праці, робота на яких дає право на призначення пенсії за віком на пільгових умовах та додаткове зарахування стажу.
У разі неправомірної відмови Пенсійного фонду у зарахуванні стажу працівник має право звернутися до суду для захисту своїх прав.
`
INPUT>>
