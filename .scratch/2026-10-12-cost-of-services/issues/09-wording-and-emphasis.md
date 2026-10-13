# 09: «юридична допомога» across the site, and less bold in two intros

**What to build:** The site says «юридична допомога» instead of «правнича допомога» everywhere. The court decisions list no longer bolds «судові рішення у спорах з Пенсійним фондом України» (the advocate's name stays bold), and the instructions list no longer bolds «електронний підпис (КЕП)». Spec: `.scratch/2026-10-12-cost-of-services/spec.md`, section "Follow-up: the advocate's corrections (2026-10-13)", subsection "Wording and emphasis elsewhere".

**Blocked by:** 07 (it changes the price page's occurrences)

**Status:** ready-for-agent

- [ ] No page in the built site contains «правнич» in visible text, meta tags or JSON-LD. Report the before/after count per page. Markdown notes under `src/` are not touched.
- [ ] Each replaced phrase keeps its grammatical case and sentence capitalisation, e.g. «Правнича допомога спрямована» → «Юридична допомога спрямована».
- [ ] `/court-cases/` intro: «судові рішення у спорах з Пенсійним фондом України» is plain text, «Поддячою Юлією Юріївною» is still bold.
- [ ] `/instructions/` intro: «електронний підпис (КЕП)» is plain text.
- [ ] `/contacts/` intro keeps its bold name.
- [ ] At ~390 px and ~1280 px the touched passages look right; screenshots go in Comments.
- [ ] `npm run build:ssg` prints no `ERROR` lines and `Prerendered 111 static routes`; the route and anchor checks in CLAUDE.md pass.

## Comments
