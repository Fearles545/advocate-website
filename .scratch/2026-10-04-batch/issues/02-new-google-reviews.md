# 02: Two new Google reviews

**What to build:** The two reviews from task 1 of the batch, by «Юрій» and «Олена Тетеріна», appear on the reviews page and in the homepage reviews carousel. Both views list reviews newest first. Spec: `.scratch/2026-10-04-batch/spec.md`, section "Reviews"; the source is the batch task list named in the spec's Further Notes.

**Blocked by:** None (can start immediately)

**Status:** resolved

- [x] Both reviews are appended after the existing ones, in the source order (Юрій, then Олена Тетеріна), in the template-literal style of recent entries.
- [x] The texts match the source word for word. The emoji are kept; the Markdown escapes (`\!`) are removed.
- [x] Both the reviews page and the homepage carousel open with «Олена Тетеріна», then «Юрій». This holds at ~390 px and ~1280 px, and the line breaks render as in the source.
- [x] `npm run build:ssg` succeeds.

## Comments

**2026-10-05, line breaks.** Only the reviews page renders line breaks in review texts (`white-space: pre-line` in `feedbacks.component.css`). The homepage carousel renders no review's line breaks and stays unchanged, so check line breaks on the reviews page.

**2026-10-05, resolved.** Commits: c85cb97. Both pages open with «Олена Тетеріна», then «Юрій»; texts match task 1 of the source word for word; Олена's four paragraphs render on the reviews page. Independent check on the final build (after the review fixes, 62ac80b): `npm run build:ssg` printed 0 `ERROR` lines and `Prerendered 110 static routes`; every route wrote its `index.html`; the browser suite at 390 and 1280 px passed 513/513 (blog 40, reviews 22, articles 41 + 41, decisions 236, edits 5, court decisions list 128).
