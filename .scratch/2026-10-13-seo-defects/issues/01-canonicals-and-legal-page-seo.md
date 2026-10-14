# 01: Broken canonicals on eight articles and missing SEO on the two legal pages

**What to build:** Every page in the sitemap tells search engines its own address and its own title. Today ten pages don't, and these defects are already live:

- **Six articles** have the domain written twice in their canonical, e.g. `https://www.advocate-pensia.com.uahttps://www.advocate-pensia.com.ua/blog/…`. Their `.seo.ts` passes an absolute URL, but `SeoService` (`core/services/seo.service.ts:45`) prepends the site URL to `canonical`. The template (`_template.seo.ts:26`, type comment at :128) expects a relative path. The six slugs:
  - `pensiia-na-pilhovykh-umovakh-za-spyskom-1-dlia-cholovikiv-porivnialnyi-analiz-zakoniv-1788-xii-ta-1058-iv`
  - `pensiia-na-pilhovykh-umovakh-za-spyskom-1-dlia-zhinok-porivnialnyi-analiz-zakoniv-1788-xii-ta-1058-iv`
  - `pensiia-na-pilhovykh-umovakh-za-spyskom-2-dlia-cholovikiv-porivnialnyi-analiz-zakoniv-1788-xii-ta-1058-iv`
  - `pensiia-na-pilhovykh-umovakh-za-spyskom-2-dlia-zhinok-porivniannia-zakoniv-1788-xii-ta-1058-iv`
  - `chomu-pensiinyi-fond-ne-zarakhovuie-periody-uchasti-v-boiovykh-diiakh-u-kratnomu-obchyslenni-1-3-do-stazhu-pry-pryznachenni-pensii`
  - `chy-zarakhovuietsia-viiskova-sluzhba-do-zahalnoho-stazhu-ta-pilhovoho-spetsstazhu-roziasnennia-zakonodavstva`
- **Two articles** have a canonical without the trailing slash that CLAUDE.md requires:
  - `pilhova-pensiia-vodiiam-miskoho-pasazhyrskoho-transportu-avtobusiv-trolejbusiv-tramvaiv-i-velykovahovykh-avtomobiliv`
  - `iak-zarakhovuiutsia-periody-roboty-za-spyskom-1-do-strakhovoho-stazhu`
- **`/privacy-policy/` and `/public-offer/`** have no SEO entry, so their prerendered HTML carries the home page's title, description and canonical (`https://www.advocate-pensia.com.ua/`). A canonical pointing at the home page tells Google these pages are duplicates of it. Both are in the sitemap (priority 0.3), so they are meant to be indexed.

Found during the sign-off of `.scratch/2026-10-12-cost-of-services/` (ticket 06, Comments); that work did not cause them.

**Blocked by:** None (can start immediately)

**Status:** resolved

- [x] The eight articles' canonicals are relative paths with a trailing slash, as in `_template.seo.ts`, and the prerendered `<link rel="canonical">` and `og:url` of each equal `https://www.advocate-pensia.com.ua/blog/<slug>/`.
- [x] In the same eight `.seo.ts` files, every JSON-LD URL that points to a page of the site ends with a trailing slash (the article's own `url`/`@id`, `about-me`, the blog). No other article is touched.
- [x] `/privacy-policy/` and `/public-offer/` each get an SEO entry with their own title (50–60 characters, after the pattern «… | Адвокат Поддяча Юлія»), a description of 150–160 characters drawn from the page's own text, keywords, a canonical with a trailing slash, and a BreadcrumbList (Головна → page) in the JSON-LD. Their breadcrumb label matches the page's H1.
- [x] The articles' published and modified dates do not change. The sitemap lastmod of the two legal pages moves to the commit date; the articles' lastmod stays, since their content did not change.
- [x] CLAUDE.md "Build Behavior" gains a one-line post-build check, next to the route and anchor checks, that fails and lists every sitemap URL whose prerendered HTML has a canonical different from that URL, or a title shared with another sitemap URL. It passes on the fixed build and fails, naming the page, when one canonical is deliberately broken and the site rebuilt (don't commit the breakage).
- [x] `npm run build:ssg` prints no `ERROR` lines, the route count is unchanged, every route writes its `index.html`, and the anchor check passes.

## Comments

### 2026-10-14: done

- **Commits:** `808d303` (the eight articles), `bfff80b` (SEO entries for the two legal pages), `944e8d7` (their sitemap lastmod → 2026-10-14), `0c4d42a` (the check in CLAUDE.md "Build Behavior").
- **Articles:** the canonical in each of the eight `.seo.ts` is now `/blog/<slug>/`. Every site URL in their JSON-LD ends with a slash, including `@id`s with a fragment (`/<slug>/#article`, not `/<slug>#article`) and the bare domain in two places of the drivers article. An audit of all 60 articles' `.seo.ts` found these eight and no others; no other article changed. Prettier passes on all eight.
- **Legal pages:** «Політика конфіденційності сайту | Адвокат Поддяча Юлія» (54 characters) and «Публічна оферта на юридичні послуги | Адвокат Поддяча Юлія» (58); descriptions of 159 and 158 characters drawn from each page's opening and section headings; keywords; canonical with a trailing slash; BreadcrumbList «Головна > <H1>» plus a WebPage node, as on `/contacts/`.
- **Build:** `npm run build:ssg` exits 0 with 0 `ERROR` lines and `Prerendered 111 static routes.`; the three checks in CLAUDE.md, run from the file itself, print `all 111 routes written`, `all 223 fragment links resolve`, `all 110 sitemap URLs have their own canonical and title`. The built `sitemap.xml` is byte-identical to `public/sitemap.xml`.
- **Prerendered HTML of the ten pages:** canonical and `og:url` equal the sitemap URL; the JSON-LD parses and none of its site URLs lacks the trailing slash; for the articles, `article:published_time`, `article:modified_time` and `datePublished` equal the pre-fix build's; for the legal pages, the breadcrumb reads «Головна > Політика конфіденційності» and «Головна > Публічна оферта», matching their H1.
- **The new check, red:** against the pre-fix build it exits 1 and lists the two legal pages (canonical = home), the six doubled-domain canonicals, the two slashless ones, and the title the home page shares with both legal pages. With `/faq/`'s canonical changed to `/faq` and the site rebuilt, it exits 1 naming only `https://www.advocate-pensia.com.ua/faq/ -> canonical https://www.advocate-pensia.com.ua/faq`. The breakage was reverted before committing.
- **Browser (served build, headless Chromium, 390 and 1280 px):** direct loads of both legal pages and one article, footer clicks home → privacy policy → public offer and Back, and a click into each of the eight articles from a page that links to it (court decision pages and related articles). After every navigation the live DOM has exactly one canonical and an `og:url`, both equal to the page's URL with the slash. No page errors. Scripts and output: `/private/tmp/claude-504/-Users-Leo-Documents-L-Angular-advocate-website/a4e0c721-b60c-4ee4-8390-645c896b41ab/scratchpad/checks/`.

