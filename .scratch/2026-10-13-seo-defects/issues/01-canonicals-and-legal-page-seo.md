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

**Status:** ready-for-agent

- [ ] The eight articles' canonicals are relative paths with a trailing slash, as in `_template.seo.ts`, and the prerendered `<link rel="canonical">` and `og:url` of each equal `https://www.advocate-pensia.com.ua/blog/<slug>/`.
- [ ] In the same eight `.seo.ts` files, every JSON-LD URL that points to a page of the site ends with a trailing slash (the article's own `url`/`@id`, `about-me`, the blog). No other article is touched.
- [ ] `/privacy-policy/` and `/public-offer/` each get an SEO entry with their own title (50–60 characters, after the pattern «… | Адвокат Поддяча Юлія»), a description of 150–160 characters drawn from the page's own text, keywords, a canonical with a trailing slash, and a BreadcrumbList (Головна → page) in the JSON-LD. Their breadcrumb label matches the page's H1.
- [ ] The articles' published and modified dates do not change. The sitemap lastmod of the two legal pages moves to the commit date; the articles' lastmod stays, since their content did not change.
- [ ] CLAUDE.md "Build Behavior" gains a one-line post-build check, next to the route and anchor checks, that fails and lists every sitemap URL whose prerendered HTML has a canonical different from that URL, or a title shared with another sitemap URL. It passes on the fixed build and fails, naming the page, when one canonical is deliberately broken and the site rebuilt (don't commit the breakage).
- [ ] `npm run build:ssg` prints no `ERROR` lines, the route count is unchanged, every route writes its `index.html`, and the anchor check passes.

## Comments
