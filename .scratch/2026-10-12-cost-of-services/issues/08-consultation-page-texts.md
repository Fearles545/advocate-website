# 08: Consultation page texts

**What to build:** The consultation page describes a request, not a booked consultation: H1 «Звернення за консультацією», an intro and a pre-submit text that promise to name a suitable service, its cost and the next steps rather than a free analysis, and a consent label that matches. Its SEO title and JSON-LD name follow the H1. Spec: `.scratch/2026-10-12-cost-of-services/spec.md`, section "Follow-up: the advocate's corrections (2026-10-13)", subsection "Consultation page".

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [ ] Before any change, screenshots of the page at ~390 px and ~1280 px.
- [ ] H1, primary intro, the text before the submit button and the consent label are the spec's texts, verbatim. The secondary intro, the `footer-note`, the success message and every form field stay as they are.
- [ ] The form still submits: the consent checkbox is still required and its error text is unchanged. Don't send a real request to the worker; check the form's validity and payload in the browser instead.
- [ ] The prerendered `<title>` is «Звернення за консультацією з пенсійних питань | Адвокат Поддяча Юлія», and the WebPage `name` in the page's JSON-LD is «Звернення за консультацією | Адвокат Поддяча Юлія Юріївна». The description is unchanged.
- [ ] At ~390 px and ~1280 px the page looks right; screenshots go in Comments.
- [ ] `npm run build:ssg` prints no `ERROR` lines and `Prerendered 111 static routes`; the route and anchor checks in CLAUDE.md pass.

## Comments
