# 09: «юридична допомога» across the site, and less bold in two intros

**What to build:** The site says «юридична допомога» instead of «правнича допомога» everywhere. The court decisions list no longer bolds «судові рішення у спорах з Пенсійним фондом України» (the advocate's name stays bold), and the instructions list no longer bolds «електронний підпис (КЕП)». Spec: `.scratch/2026-10-12-cost-of-services/spec.md`, section "Follow-up: the advocate's corrections (2026-10-13)", subsection "Wording and emphasis elsewhere".

**Blocked by:** 07 (it changes the price page's occurrences)

**Status:** ready-for-agent

- [x] No page in the built site contains «правнич» in visible text, meta tags or JSON-LD. Report the before/after count per page. Markdown notes under `src/` are not touched.
- [x] Each replaced phrase keeps its grammatical case and sentence capitalisation, e.g. «Правнича допомога спрямована» → «Юридична допомога спрямована».
- [x] `/court-cases/` intro: «судові рішення у спорах з Пенсійним фондом України» is plain text, «Поддячою Юлією Юріївною» is still bold.
- [x] `/instructions/` intro: «електронний підпис (КЕП)» is plain text.
- [x] `/contacts/` intro keeps its bold name.
- [x] At ~390 px and ~1280 px the touched passages look right; screenshots go in Comments.
- [x] `npm run build:ssg` prints no `ERROR` lines and `Prerendered 111 static routes`; the route and anchor checks in CLAUDE.md pass.

## Comments

### 2026-10-13: implemented

- **Commits:**
  - `4d027bd` feat(home): say «юридична допомога» instead of «правнича» in the SEO section
  - `821ab31` feat(contacts): say «юридичну допомогу» instead of «правничу»
  - `e43ade5` feat(court-cases): stop bolding the decisions phrase in the list intro
  - `967362b` feat(instructions): stop bolding «електронний підпис (КЕП)» in the list intro
- **Build at `967362b`:** `npm run build:ssg` exits 0, prints 0 `ERROR` lines and ends with `Prerendered 111 static routes.` The route check from CLAUDE.md prints `all 111 routes written`. The anchor check from CLAUDE.md prints `all 223 fragment links resolve` and exits 0. `npx tsc --noEmit -p tsconfig.app.json` is clean. Prettier is clean on the four touched templates. The sitemap is untouched (ticket 12).
- **Where «правнич» was:** a search of `src/` (templates, `.ts` and `.seo.ts` files, data files, blog post HTML) and of the built site found it only on the home page (3) and the contacts page (2), the places the spec names. No blog article, `.seo.ts`, data file or instruction contains it, so nothing was left for the advocate to decide. The two markdown notes that still contain it (`src/app/contacts/contacts-rebranding.md`, `src/app/blog/blog-post-rebranding.md`) are not site text and are untouched.
- **Seam:** the production build, served by `http-server`: the pre-ticket build (`275dc27`, copied aside) on :8198 and each new build on :8197. Both were read over HTTP and driven in headless Chromium at 390 and 1280 px. Both servers are stopped. Scripts and outputs are in `/private/tmp/claude-504/-Users-Leo-Documents-L-Angular-advocate-website/a4e0c721-b60c-4ee4-8390-645c896b41ab/scratchpad/checks/09/`.
- **`wording-09.mjs`**, this ticket's check:
  - It reads the expected values from the spec's "Wording and emphasis elsewhere" section: the three replacement pairs, the court decisions phrase, the name and the КЕП phrase. The spec's headline «правнич…» → «юридич…» is loose about the stem; its own pairs need правнич → юридичн with the first letter's case kept (правнич-ої → юридичн-ої), and the check first confirms that rule reproduces all three pairs. Everything else is compared with the pre-ticket build.
  - Final run (`final.out`): 59 passed, 0 failed.
  - Against the pre-ticket build (`red-baseline.out`): 27 passed, 32 failed. Every failure was a «правнич» count, an expected phrase or a bold check; every «unchanged» check already passed.
  - Per-slice runs: `green-s1.out` (home, 37/59), `green-s2.out` (contacts, 48/59), `green-s3.out` (court decisions, 53/59) and `green-s4.out` (instructions, 59/59).
- **«правнич» count per page**, before → after, over HTTP. Visible text, meta tags and title, JSON-LD and the raw HTML were counted separately:
  - `/`: text 3 → 0, meta 0 → 0, JSON-LD 0 → 0, raw 3 → 0.
  - `/contacts/`: text 2 → 0, meta 0 → 0, JSON-LD 0 → 0, raw 2 → 0.
  - The other 109 routes: 0 → 0.
  - The 62 article fragments in `/posts/`: 0.
  - The 16 JS bundles, read with their `\u` escapes decoded: `main` had 5 before and has 0 now. The client renders the page from these bundles.
  - In the browser, the rendered DOM (title, text, meta, JSON-LD) has 0 on all four pages at both widths. On the home page the SEO section was opened with «Читати далі» first.
- **Case and capitalisation:**
  - The prerendered visible text of all 111 routes equals the pre-ticket text with only правнич → юридичн (Правнич → Юридичн) replaced. Their meta tags, title and JSON-LD also equal the pre-ticket ones, which had no «правнич».
  - The same holds for the rendered text of the four touched pages at 390 and 1280 px.
  - Shown verbatim: «FAQ - Поширені питання щодо надання юридичної допомоги пенсійним адвокатом (юристом по пенсії)», «Юридична допомога спрямована на те, …», «Своєчасна юридична допомога дозволяє …», «Надаю юридичну допомогу дистанційно …» and «Такий формат дозволяє швидко отримати юридичну допомогу …».
- **Bold:**
  - After the replacement, only `/court-cases` and `/instructions` differ in HTML from the pre-ticket build. Hashed file names and Angular/CDK counter ids were masked, since they change between builds anyway. Each page differs only by the removed `<strong>` around its phrase.
  - In the browser at both widths:
    - `/court-cases/`: the intro's only `<strong>` is «Поддячою Юлією Юріївною», which renders at weight 600. «судові рішення у спорах з Пенсійним фондом України» renders at the intro's own 400.
    - `/instructions/`: the intro has no `<strong>`, and «електронний підпис (КЕП)» renders at 400.
    - `/contacts/`: the intro still bolds only «Поддячою Юлією Юріївною».
- **Layout:** no horizontal overflow on the four pages at either width. Passage heights are unchanged, except the `/court-cases/` header at 390 px, which shrank from 477 to 450 px: the unbolded phrase now fits in fewer lines. No CSS changed.
- **Screenshots**, in `/private/tmp/claude-504/-Users-Leo-Documents-L-Angular-advocate-website/a4e0c721-b60c-4ee4-8390-645c896b41ab/scratchpad/shots/09/`, each as `{before,after}-<passage>-{390,1280}.png`:
  - `home-seo-intro`: the SEO section heading and intro;
  - `home-seo-note`: the «Своєчасна …» note, with the section opened;
  - `contacts-intro`;
  - `contacts-format`: «Формат роботи»;
  - `court-cases-intro`;
  - `instructions-intro`.
