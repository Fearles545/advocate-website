# 04: Deep links from two articles and the anchor build check

**What to build:** A reader of «Скоро пенсія за віком…» or «Навіщо перевіряти пенсійну справу…» finds one new sentence that links into the price list.
- From the first article, the reader lands on the «Призначення пенсії» group.
- From the second, the reader lands on «Перевірка (аудит) пенсійної справи», already expanded.

In both cases the target appears fully below the fixed header.

A one-line post-build check, documented next to the existing «every route written» check, fails whenever an internal `#anchor` link points to an id that does not exist on its target page. A renamed service id can then no longer break these links silently.

Spec: `.scratch/2026-10-12-cost-of-services/spec.md`, sections:
- "Anchors and fragment navigation"
- "Other pages" (the two articles)
- "Build check"

**Blocked by:** 02

**Status:** ready-for-agent

- [x] Entering `/prices/#<service id>` opens that service and scrolls it fully into view below the fixed header. This holds on a fresh load (fragment typed into the address bar) and on in-app navigation.
- [x] Entering `/prices/#<group id>` scrolls the group heading into view below the fixed header and opens nothing.
- [x] Scrolling follows the project's documented fixed-header anchor recipe. The handling runs after the application has rendered, because the app does not hydrate and re-renders the prerendered DOM on start.
- [x] «Скоро пенсія за віком: що потрібно зробити до звернення в Пенсійний фонд України» gets a sentence at the end of the section «Чи можу я допомогти безпосередньо з поданням документів на пенсію»: «Орієнтовну вартість перевірки документів та супроводу звернення за призначенням пенсії можна переглянути у розділі «Вартість послуг».» The words «Вартість послуг» link to `/prices/#pryznachennia-pensii`.
- [x] «Навіщо перевіряти пенсійну справу після призначення пенсії» gets a sentence at the end of the section «Повна або часткова перевірка пенсійної справи - що обрати»: «Орієнтовну вартість повної або часткової перевірки пенсійної справи дивіться у розділі «Вартість послуг».» The words «Вартість послуг» link to `/prices/#audyt-pensiinoi-spravy`.
- [x] Both links are root-relative with a trailing slash before the fragment, like the articles' existing internal links. The articles' published and modified dates are unchanged.
- [x] At ~390 px and ~1280 px, following each link from its article lands as described above. Screenshots go in Comments.
- [x] CLAUDE.md "Build Behavior" gains a one-line command, next to the route check, that:
  - scans the built site, including the article HTML fragments;
  - finds every internal link with a fragment;
  - fails and lists each link whose target page has no element with that id.
- [x] Record in Comments:
  - the check passes on the current build;
  - the check fails, naming the link, after one of the two article links is deliberately misspelled and the site rebuilt;
  - the check passes again after the misspelling is reverted.
- [x] `npm run build:ssg` prints no `ERROR` lines, and every route writes its `index.html`.

## Comments

### 2026-10-12: implemented

- **Commits:**
  - `a9bff9e` feat(prices): open the service a URL fragment names and land it below the header
  - `47aa037` feat(blog): link two articles to their prices on the price page
  - `7e32935` docs(CLAUDE.md): add a post-build check that every fragment link resolves
- **Build at `7e32935`:** `npm run build:ssg` exits 0, prints 0 `ERROR` lines and ends with `Prerendered 111 static routes.` The route check printed `all 111 routes written`. `npx tsc --noEmit -p tsconfig.app.json` is clean, and Prettier leaves every changed file unchanged.
- **How it works:** after the page renders (`afterNextRender`), the component follows `ActivatedRoute.fragment` and opens the `details` whose id matches. A group id matches an `h3`, so nothing opens. The scroll itself stays with the documented recipe: the router's `anchorScrolling` and `ViewportScroller.setOffset([0, header + 16])` from `app.component.ts`. One addition: on a fresh page load only, the component repeats `ViewportScroller.scrollToAnchor(id)` once `document.fonts.ready` resolves. Without it, a cold load ran the router's scroll before the Google Fonts swap. The swap made the content above taller, so the target landed 171–244 px low at 390 and 34 px low at 1280. The loader stays up until the fonts are ready, so the visitor does not see the correction.
- **Check script:** `/private/tmp/claude-504/-Users-Leo-Documents-L-Angular-advocate-website/a4e0c721-b60c-4ee4-8390-645c896b41ab/scratchpad/checks/04/anchors-04.mjs`. It ran against the production build, served by `http-server` on :8093, over HTTP and in headless Chromium 151. Its expected ids, sentences and hrefs are typed from the ticket and the spec. The final run is `checks/04/final.out`: 32 passed, 0 failed. The red runs are kept beside it:
  - `red-slice1.out`: the row was not opened.
  - `red-slice2.out`: with late fonts, the target landed low.
  - `red-slice4.out`: an in-app fragment change scrolled but did not open the row.
  - `red-slice5.out`: no sentence and no link in either article.
- **Landing.** Each cell gives the target's top edge against the header's bottom edge, which is 132 px at 390 and 151 px at 1280. The recipe's spot is the header bottom plus 16 px.

  | Case | 390 × 844 | 1280 × 800 |
  | --- | --- | --- |
  | Fresh load `/prices/#audyt-pensiinoi-spravy` | 148, open, title and price end at 274 | 167, open, end at 247 |
  | Fresh load, Google Fonts delayed 1.5 s, all 17 service ids | 148 each, open, the only open row | 167 each, same |
  | Fresh load, fonts delayed, all 5 group ids | 148 each, no row open | 167 each, no row open |
  | «Скоро пенсія…» link clicked: full load of `/prices/#pryznachennia-pensii` | 148, no row open | 167, no row open |
  | «Навіщо перевіряти…» link clicked: full load of `/prices/#audyt-pensiinoi-spravy` | 148, open | 167, open |
  | In-app on `/prices`, fragment changed to `#pryznachennia-pensii` (same document) | 148, no row open | 167, no row open |
  | In-app, then `#audyt-pensiinoi-spravy` (same document) | 148, open | 167, open |
  | Back from `/services` to `/prices#audyt-pensiinoi-spravy` (not asserted) | page at top, row open | page at top, row open |

  "In-app" here means a fragment entered on the page itself, as in the address bar. The router handles it without a reload; the script asserts that a marker set on `window` survives. No `routerLink` with a fragment to `/prices/` exists in the product, so a cross-route forward navigation could not be driven. It would take the same router `scrollToAnchor` path, and the component opens the row on creation.
- **Articles:**
  - Each sentence is now the last `<p>` of its named section, verbatim, in both `/blog/<slug>/` and `/posts/<slug>.html`.
  - «Вартість послуг» is its only link, written like the existing 821 link: `/prices/#pryznachennia-pensii` and `/prices/#audyt-pensiinoi-spravy`, root-relative with a trailing slash.
  - Dates: `article:published_time`, `article:modified_time`, the JSON-LD `datePublished` and `dateModified`, and the `<time>` values all equal the baseline taken from the build before any change (`checks/04/dates-baseline.txt`). `git diff bf77d97 HEAD` is empty for `blog-posts/index.ts`, every `*.seo.ts` and `public/sitemap.xml`.
- **Anchor check**, run verbatim from CLAUDE.md:
  - On the current build it prints `all 223 fragment links resolve` and exits 0. That is the 219 links found before this ticket, plus the 2 new links, each found once in the article page and once in its `posts/` fragment.
  - Misspelled run: `#audyt-pensiinoi-spravy` became `#audyt-pensiinoi-spravyy` in the second article, and the site was rebuilt. The build still exited 0 with 111 routes. The check printed the following and exited 1:
    ```
    BROKEN:
    posts/navishcho-pereviriaty-pensiinu-spravu-pislia-pryznachennia-pensii.html -> /prices/#audyt-pensiinoi-spravyy
    blog/navishcho-pereviriaty-pensiinu-spravu-pislia-pryznachennia-pensii/index.html -> /prices/#audyt-pensiinoi-spravyy
    ```
  - After reverting with `git checkout` and rebuilding, it printed `all 223 fragment links resolve` and exited 0. The misspelling was never committed.
  - A synthetic site probe resolved `/a#x`, `/a/?q=1#y`, `/#top` and `/a/#x`. It flagged a link to a page that does not exist, and a wrong id with and without the slash.
  - Scope: root-relative `href`s only. The build has no same-page `href="#…"` and no absolute own-domain `href` with a fragment. The JSON-LD Offer URLs are not links and are not checked.
- **Regression:** ticket 03's `prices-03.mjs` passes 60 of 60. Ticket 02's `prices-02.mjs` passes 78 of 82, with the same 4 expected failures recorded after ticket 03 (the extra H2s and the 2 FAQ amounts).
- **Where `docs/ANCHOR_SCROLL_WITH_FIXED_HEADER.md` does not match this app.** The doc was left unchanged.
  - Gotcha 3 says `mat-sidenav-content` is the scroll container. Here the window scrolls.
  - The recipe does not cover web fonts arriving after the router's scroll on a cold load. This page now repeats the scroll after the fonts load. `/services/#…` fresh loads have the same race: `#sudovyi-zahyst` landed at 218 against 148 at 390. That page was not changed.
  - The router ignores anchors on popstate (Back and Forward). With `scrollPositionRestoration: 'top'` it goes to the top.
- **Open question, Back into `/prices/#<id>`.** The spec does not settle this, so nothing was changed. Today the row opens but the page sits at the top, as on every other page after Back. Options:
  - (a) keep the app-wide top-on-Back policy. This is the current state and my pick for this ticket.
  - (b) scroll to the fragment on Back for `/prices/` only.
  - (c) switch the app to `scrollPositionRestoration: 'enabled'`, which restores the last position on Back everywhere. That would be a separate ticket.
- **Screenshots** in `/private/tmp/claude-504/-Users-Leo-Documents-L-Angular-advocate-website/a4e0c721-b60c-4ee4-8390-645c896b41ab/scratchpad/shots/04/`:
  - each sentence in its article: `article-pryznachennia-pensii-390.png`, `article-pryznachennia-pensii-1280.png`, `article-audyt-pensiinoi-spravy-390.png`, `article-audyt-pensiinoi-spravy-1280.png`
  - where each link lands: `landing-pryznachennia-pensii-390.png`, `landing-pryznachennia-pensii-1280.png`, `landing-audyt-pensiinoi-spravy-390.png`, `landing-audyt-pensiinoi-spravy-1280.png`
  - fresh load and in-app: `fresh-service-390.png`, `fresh-service-1280.png`, `inapp-group-390.png`, `inapp-group-1280.png`, `inapp-service-390.png`, `inapp-service-1280.png`
