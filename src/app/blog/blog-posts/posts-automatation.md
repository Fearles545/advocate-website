Generate ALL artifacts for a NEW blog post, using ONLY the data I paste in INPUT.

## PROJECT CONTEXT

- Framework: Angular 20, SSG.
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
- publishedTime/modifiedTime: derive from `date` as `${date}T09:00:00+03:00` unless `publishedTime`/`modifiedTime` explicitly provided in INPUT.

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
  - If an entry already exists, only update <lastmod> to TODAY_EUROPE_KYIV_YYYY-MM-DD and keep existing changefreq/priority.
- Also ensure the blog listing page exists; if missing, add it (or update its <lastmod> to today):
  <url>
  <loc>https://www.advocate-pensia.com.ua/blog/</loc>
  <lastmod>TODAY_EUROPE_KYIV_YYYY-MM-DD</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
  </url>
- Keep indentation and ordering consistent. Do not duplicate <loc> entries.

## INPUT

(Paste REAL values; content may be inline Markdown/HTML OR a file path.)
<<INPUT
title: "<UA title>"
src: "<YouTube embed or ''>"
date: "YYYY-MM-DD"
description: "<short meta description or ''>"
content: |
<Markdown or HTML full body you want to publish (WITHOUT H1 and WITHOUT iframe).
Headings may be present; normalize to start from H2.>

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
- Description: use `description` exactly; if empty → leave empty string and add comment `// TODO: set meaningful description`
- Keywords: leave empty string `''` with comment `// TODO: add 5–8 ключових фраз` (do NOT invent)
- Type: "article"
- publishedTime: from INPUT or `${date}T09:00:00+03:00`
- modifiedTime: from INPUT or same as publishedTime
- canonical: `/blog/<slug>/`
- JSON-LD @graph per SEO RULES (ids/urls consistent with site)

4. BLOGS INDEX (update: blog-posts/index.ts)

- Insert `{ title, slug, src, date, description }` into `blogs` array keeping manual order: newest first.
- Follow existing formatting and commas.

5. SEO REGISTRY INDEX (update)

- Import new `<slug>.seo.ts` export and merge into the master SEO map as in existing posts.

6. SITEMAP.XML (update: public/sitemap.xml)

- Insert or update the <url> for `/blog/<slug>/` with TODAY_EUROPE_KYIV_YYYY-MM-DD in <lastmod>.
- Insert or update the <url> for `/blog/` with TODAY_EUROPE_KYIV_YYYY-MM-DD in <lastmod>.
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
- [ ] Author links preserved; no invented URLs.
- [ ] Canonical ends with `/`.
- [ ] WebPage.name = title (no brand); <title> has brand.
- [ ] Blogs array remains sorted (newest first).
- [ ] JSON-LD valid; ids consistent; builds compile.
- [ ] public/sitemap.xml updated: new post <url> + <lastmod>=today; blog listing <lastmod>=today; XML valid.

## SEO completeness

- description: if missing, derive from the first 1–2 sentences of the provided content,
  max ~160 chars, no TODOs.
- keywords: if missing, extract 5–8 key phrases from title+content (dedupe, lowercase nouns),
  no TODOs.
- JSON-LD must be complete; no empty arrays or placeholder comments.
