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
- Add or update exactly ONE <url> entry for the new post:
  <url>
  <loc>https://www.advocate-pensia.com.ua/blog/<slug>/</loc>
  <lastmod>TODAY_EUROPE_KYIV_YYYY-MM-DD</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
  </url>
- For the blog listing page `/blog/`:
  **DO NOT create a new <url>**.
  **Only update <lastmod> if an entry for `/blog/` already exists.**
- Do not duplicate <loc> entries; keep ordering consistent.

## INPUT

(Paste REAL values; content may be inline Markdown/HTML OR a file path.)
<<INPUT
title: "Як зараховується стаж, набутий у російській федерації?"
src: "https://www.youtube.com/embed/ZcfOD4OclCQ"
date: "2025-04-09"
content: `
Питання зарахування стажу, набутого за межами України, зокрема на території російської федерації, є надзвичайно актуальним для багатьох громадян, які працювали там у різні роки. З 2024 року законодавство України зазнало суттєвих змін, що вплинуло на порядок обчислення пенсій.

Нормативна база
Закон України «Про загальнообов’язкове державне пенсійне страхування» №1058-IV від 09.07.2003 року.

Закон України від 25.04.2024 року, яким внесено зміни до порядку зарахування стажу за межами України.

Вихід України з Угоди про гарантії прав громадян держав-учасниць СНД у сфері пенсійного забезпечення (26.03.2023 року).

Які періоди стажу зараховує Пенсійний фонд?
До 01.01.1992 року – усі періоди трудової діяльності, набуті в Росії та інших республіках колишнього СРСР, зараховуються до страхового стажу в Україні.

Після 01.01.1992 року – Пенсійний фонд відмовляється зараховувати такі періоди, посилаючись на зміни в законодавстві та припинення міжнародної угоди.

Чому це є проблемою?
Відмова Пенсійного фонду у зарахуванні стажу після 1992 року суперечить принципам права та фактично позбавляє багатьох громадян законного стажу.
Згідно з практикою судів, періоди роботи з 01.01.1992 по 26.03.2023 повинні враховуватись, оскільки на той час діяла міжнародна угода, яка зобов’язувала Україну визнавати цей стаж.

Як відновити право на зарахування стажу?
Єдиним ефективним способом є звернення до суду.
Суд може:
визнати протиправними дії Пенсійного фонду щодо відмови у зарахуванні стажу;

зобов’язати зарахувати періоди роботи на території Росії у страховий стаж для обчислення пенсії.

Які документи підтверджують стаж?
Для підтвердження трудової діяльності в Росії можуть використовуватися:
трудова книжка з відповідними записами;

довідки з підприємств чи установ (якщо вони збереглися);

архівні довідки (якщо підприємство ліквідоване);

інші офіційні документи, які підтверджують трудову діяльність та сплату внесків.

Висновок
Сьогодні Пенсійний фонд зараховує стаж роботи в Росії лише до 01.01.1992 року. Проте періоди роботи з 1992 по 26.03.2023 підлягають врахуванню у судовому порядку.
`

# Optional:

publishedTime: "YYYY-MM-DDThh:mm:ss+03:00"
modifiedTime: "YYYY-MM-DDThh:mm:ss+03:00"

# Optional alternative:

contentFile: "relative/path/to/text.md" # if set, ignore `content` above and load file
INPUT>>

## TASKS

1. SLUG

- Generate from `title`: UA→Latin, lowercase, kebab-case, ASCII [a-z0-9-], collapse dashes.

2. BLOG HTML (create: posts/<slug>.html)

- Take `content` (or `contentFile`) and:
  - If Markdown: convert to HTML; keep links; remove any <h1>; headings start from <h2>.
  - Wrap into the EXACT pattern:
    <article>
      <blockquote class="blog-quote">Use the first 1–2 sentences from the beginning as lead if present; else keep the first paragraph. Keep author text verbatim.</blockquote>
      <section>…first major section…</section>
      <hr />
      <section>…second…</section>
      <hr />
      <section>…third or conclusions…</section>
    </article>
  - Keep <aside> blocks if they exist; do not invent any.
  - If there is an inline date, you may format it as <time datetime="YYYY-MM-DD">…</time> (no invention).

3. SEO CONFIG (create: posts/<slug>.seo.ts)

- Title: `${title} | Адвокат Поддяча Юлія Юріївна`
- Description: if provided — use it; if empty — derive from the first 1–2 sentences of the content (max ~160 chars), no TODOs.
- Keywords: if not provided — extract 5–8 key phrases from title+content (dedupe, lowercase nouns), no TODOs.
- Type: "article"
- publishedTime: from INPUT or `${date}T09:00:00+03:00`
- modifiedTime: from INPUT or same as publishedTime
- canonical: `/blog/<slug>/`
- JSON-LD @graph per SEO RULES (ids/urls consistent with site). JSON-LD must be complete; no empty arrays or placeholder comments.

4. BLOGS INDEX (update: blog-posts/index.ts)

- Insert `{ title, slug, src, date, description }` into `blogs` array keeping manual order: newest first.
- Follow existing formatting and commas.

5. SEO REGISTRY INDEX (update)

- Import new `<slug>.seo.ts` export and merge into the master SEO map as in existing posts.

6. SITEMAP.XML (update: public/sitemap.xml)

- Insert or update the <url> for `/blog/<slug>/` with TODAY_EUROPE_KYIV_YYYY-MM-DD in <lastmod>.
- If `/blog/` entry exists: update its <lastmod> to TODAY_EUROPE_KYIV_YYYY-MM-DD. Do NOT create a new one.
- Validate XML.

## OUTPUT

- Full contents:
  1. posts/<slug>.html
  2. posts/<slug>.seo.ts
- Diffs: 3) blog-posts/index.ts (context around insertion) 4) SEO registry index (new import + merge) 5) public/sitemap.xml (added/updated <url> entries with <lastmod>)
- All text Ukrainian. ESLint/Prettier clean.

## ACCEPTANCE CHECKLIST

- [ ] HTML uses the exact article→blockquote→sections(+<hr/>) pattern.
- [ ] No <h1>; headings start from <h2>.
- [ ] No <iframe>.
- [ ] Content integrated from provided input/file; author links preserved; no invented URLs.
- [ ] Canonical ends with `/`.
- [ ] WebPage.name = title (no brand); <title> has brand.
- [ ] Blogs array remains sorted (newest first).
- [ ] JSON-LD valid; ids consistent; builds compile.
- [ ] public/sitemap.xml updated: new post <url> + <lastmod>=today; blog listing <lastmod>=today if exists; XML valid.

## SEO completeness

- description: if missing, derive from the first 1–2 sentences of the provided content,
  max ~160 chars, no TODOs.
- keywords: if missing, extract 5–8 key phrases from title+content (dedupe, lowercase nouns),
  no TODOs.
- JSON-LD must be complete; no empty arrays or placeholder comments.

## Best SEO Practices

- **Title (meta tag and H1):**

  - Ideal length: **30–60 characters** (up to 70 max, ~580–600 px).
  - If longer, automatically **trim less important parts**, keeping the main keyword phrase at the beginning.
  - Meta title format:  
    `"[main keyword or topic] | Адвокат Поддяча Юлія Юріївна"`.
  - H1 (from `Blog.title`) should be **short and natural**, without the brand name, **10–70 characters**.
  - Avoid identical meta title and H1; they should be similar but not exact duplicates.

- **Description (meta description):**

  - Recommended length: **120–160 characters**.
  - Should be a meaningful sentence containing the main keyword at the beginning.
  - Avoid filler phrases like “In this article you will learn…”.
  - Use action verbs (“find out”, “check”, “apply”) to increase CTR.

- **Keywords:**

  - Use **5–8 real keyword phrases**, deduplicated and relevant.
  - Avoid repetitive synonyms or keyword stuffing.
  - Prefer medium-frequency, intent-focused phrases.

- **Canonical:**

  - Must **always end with a trailing slash `/`**.
  - One unique canonical per page.

- **Structured Data (JSON-LD):**

  - Required entities: `BreadcrumbList`, `WebPage`, and `BlogPosting`.
  - `WebPage.name` = short, clear title **without brand**.
  - `BlogPosting.headline` = same as visible H1.
  - `description` and `keywords` must match the meta tags.
  - Always include: `author`, `publisher`, `mainEntityOfPage`, `isPartOf`.

- **Headings (H1–H3 hierarchy):**

  - H1 = main topic (comes from component).
  - H2–H3 = logical hierarchy, no level skipping.
  - Naturally include keywords in headings (1–2 occurrences maximum).
  - Only one H1 per page.

- **Image alt attributes:**

  - If images are present, provide short, descriptive alt text (<100 chars).
  - Avoid using words like “image” or “photo” in alt text.

- **Internal linking:**

  - Preserve internal links between posts when provided.
  - Use meaningful anchor text (e.g., “learn more about pension recalculation” instead of “click here”).

- **Sitemap and lastmod:**

  - New posts: `<lastmod>` = today (Europe/Kyiv).
  - For `/blog/`: only update `<lastmod>`, do NOT create duplicates.
  - Default values: `<changefreq>monthly</changefreq>`, `<priority>0.7</priority>`.

- **Avoid:**
  - `<iframe>`, `<script>`, `<meta refresh>`, or `nofollow` attributes unless explicitly required.
  - Empty fields, placeholder comments (`TODO`), or redundant JSON-LD keys.
  - Duplicate meta titles or descriptions across different posts.
