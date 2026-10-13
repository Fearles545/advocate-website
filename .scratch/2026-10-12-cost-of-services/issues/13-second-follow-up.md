# 13: «юридичну допомогу» in six call-to-action texts and the price page closing block reordered

**What to build:** The six call-to-action texts the advocate marked say «яку юридичну допомогу можу запропонувати», and the price page's closing block puts its button between the text and the two smaller lines, like the other closing blocks. Spec: `.scratch/2026-10-12-cost-of-services/spec.md`, section "Second follow-up: the advocate's corrections (2026-10-13, evening)".

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [ ] The six texts in the spec read «яку юридичну допомогу можу запропонувати» in the prerendered HTML, and the rest of each text is unchanged.
- [ ] The three texts outside her screenshots follow her answer to the pending question.
- [ ] On `/prices/`, the closing block shows the intro text, the button, the italic note and the gold line, in that order; the note matches the size, style and colour of `.final-cta-note` on `/services/`.
- [ ] `npm run build:ssg` prints no `ERROR` lines and `Prerendered 111 static routes`; the route and anchor checks in CLAUDE.md pass.
- [ ] Screenshots of every touched block at ~390 px and ~1280 px, before and after.

## Comments
