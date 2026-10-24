# 01: Home page images request `/blur` and get a 404

**What to build:** The home page stops requesting a file that does not exist. Every load of `/` today makes the browser fetch `https://www.advocate-pensia.com.ua/blur`, which returns 404 and logs `Failed to load resource` in the console, twice per load.

Three `NgOptimizedImage` tags carry `placeholder="blur"`:

- `src/app/main/sections/intro-section/intro-section.component.html:34` (mobile photo)
- `src/app/main/sections/intro-section/intro-section.component.html:83` (desktop photo)
- `src/app/main/sections/about-section/about-section.component.ts:20`

The `placeholder` input is parsed by `booleanOrUrlAttribute` (`node_modules/@angular/common/fesm2022/common.mjs:2062`): any string other than `''`, `'true'` or `'false'` is taken as the placeholder image URL. So `"blur"` becomes `background-image: url("blur")`, resolved against the page as `/blur`. The intended blurred preview never shows.

The boolean form (`placeholder` alone) is not a drop-in fix: with no image loader configured, as in this project, it throws `NG02963` (`assertNoRelativePlaceholderWithoutLoader`, `common.mjs:1628`).

**Decision to make before building:** either drop the attribute (no preview, as users see it today), or give each image a small inline data URL (under 4000 characters, the size at which Angular warns) so the blurred preview actually appears.

Found while verifying `ce7fa9d` (the unlisted payment instruction), which did not cause it.

**Blocked by:** None (can start immediately)

**Status:** needs-triage

- [ ] Loading `/` at 390 and 1280 px makes no request to `/blur` and logs no 404 in the console.
- [ ] Both photos and the about-section image render as before. If data-URL placeholders are chosen, a blurred preview shows before each image loads.
- [ ] `npm run build:ssg` prints no `ERROR` lines, and the three checks in CLAUDE.md "Build Behavior" pass.

## Comments
