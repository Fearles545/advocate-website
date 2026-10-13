# 07: Price page corrections

**What to build:** The advocate's corrections to `/prices/`. The header opens with the line about indicative cost in the large size, without the paragraph about her practice. Range prices lose the «орієнтовно» caption. Each open row ends with «Описати свою ситуацію →». The oral consultation no longer states its duration. «правничої допомоги» reads «юридичної допомоги». Spec: `.scratch/2026-10-12-cost-of-services/spec.md`, section "Follow-up: the advocate's corrections (2026-10-13)", subsection "Price page".

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [ ] Before any change, screenshots of the page header and of the first price group at ~390 px and ~1280 px.
- [ ] The header has no «Надаю юридичну допомогу…» paragraph. Its first two paragraphs are the spec's two texts, each in the size the deleted paragraph had. «До початку надання послуги погоджуються її обсяг та вартість.» follows in the secondary size, then the year badge.
- [ ] No «орієнтовно» caption anywhere on the page. At ~390 px and from 640 px the row layout stays balanced without it (price under the title on phones, right-aligned from 640 px).
- [ ] Every open row ends with the link «Описати свою ситуацію →» to the consultation form.
- [ ] «Усна консультація з пенсійного питання» shows «Консультація проводиться за попереднім записом у погоджений день і час.» with its bold, and no sentence about duration.
- [ ] The page, its FAQ answers and its JSON-LD contain no «правнич…»; each occurrence reads «юридич…» in the right case.
- [ ] Nothing else on the page changes: prices, ids, other texts, sections and JSON-LD match the build before this ticket, apart from the edits above.
- [ ] At ~390 px and ~1280 px the header and the rows look right; screenshots go in Comments.
- [ ] `npm run build:ssg` prints no `ERROR` lines and `Prerendered 111 static routes`; the route and anchor checks in CLAUDE.md pass.

## Comments
