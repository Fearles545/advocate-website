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

- [ ] Entering `/prices/#<service id>` opens that service and scrolls it fully into view below the fixed header. This holds on a fresh load (fragment typed into the address bar) and on in-app navigation.
- [ ] Entering `/prices/#<group id>` scrolls the group heading into view below the fixed header and opens nothing.
- [ ] Scrolling follows the project's documented fixed-header anchor recipe. The handling runs after the application has rendered, because the app does not hydrate and re-renders the prerendered DOM on start.
- [ ] «Скоро пенсія за віком: що потрібно зробити до звернення в Пенсійний фонд України» gets a sentence at the end of the section «Чи можу я допомогти безпосередньо з поданням документів на пенсію»: «Орієнтовну вартість перевірки документів та супроводу звернення за призначенням пенсії можна переглянути у розділі «Вартість послуг».» The words «Вартість послуг» link to `/prices/#pryznachennia-pensii`.
- [ ] «Навіщо перевіряти пенсійну справу після призначення пенсії» gets a sentence at the end of the section «Повна або часткова перевірка пенсійної справи - що обрати»: «Орієнтовну вартість повної або часткової перевірки пенсійної справи дивіться у розділі «Вартість послуг».» The words «Вартість послуг» link to `/prices/#audyt-pensiinoi-spravy`.
- [ ] Both links are root-relative with a trailing slash before the fragment, like the articles' existing internal links. The articles' published and modified dates are unchanged.
- [ ] At ~390 px and ~1280 px, following each link from its article lands as described above. Screenshots go in Comments.
- [ ] CLAUDE.md "Build Behavior" gains a one-line command, next to the route check, that:
  - scans the built site, including the article HTML fragments;
  - finds every internal link with a fragment;
  - fails and lists each link whose target page has no element with that id.
- [ ] Record in Comments:
  - the check passes on the current build;
  - the check fails, naming the link, after one of the two article links is deliberately misspelled and the site rebuilt;
  - the check passes again after the misspelling is reverted.
- [ ] `npm run build:ssg` prints no `ERROR` lines, and every route writes its `index.html`.

## Comments
