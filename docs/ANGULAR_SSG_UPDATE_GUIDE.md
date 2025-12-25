# Angular SSG Update Guide

This project uses **Static Site Generation (SSG)** via Angular's prerendering. When updating Angular, be aware of these SSG-specific requirements.

## Required Files for SSG (Angular 20.3+)

| File | Purpose |
|------|---------|
| `src/main.server.ts` | Server bootstrap with `BootstrapContext` |
| `src/app/app.config.server.ts` | Server providers with `provideServerRendering` |
| `src/app/app.routes.server.ts` | SSG route configuration |

## Key Requirements

### 1. Explicit `@angular/ssr` Dependency

Must be listed in `package.json` dependencies (not just transitive):

```json
"@angular/ssr": "^20.3.13"
```

### 2. BootstrapContext in `main.server.ts`

Angular 20.3+ requires `BootstrapContext` as 3rd argument:

```typescript
import { bootstrapApplication, BootstrapContext } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

const bootstrap = (context: BootstrapContext) =>
  bootstrapApplication(AppComponent, config, context);

export default bootstrap;
```

### 3. Server Config with `@angular/ssr`

Use `provideServerRendering` from `@angular/ssr` (not `@angular/platform-server`):

```typescript
import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';

const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering(withRoutes(serverRoutes))],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
```

### 4. Server Routes Configuration

Create `app.routes.server.ts` to configure prerendering:

```typescript
import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
```

## Debugging SSG Build Failures

| Build Type | Error Detail |
|------------|--------------|
| Production | Vague errors (e.g., `NG0401`) |
| Development | Full error messages |

**Always run development build first when debugging:**

```bash
# Add to angular.json development config:
# "server": "src/main.server.ts",
# "prerender": true

ng build --configuration=development
```

## Known Warnings

The `NotYetImplemented` errors during prerender come from `ng-gallery` using browser-only APIs (e.g., `setProperty`). These are **warnings only** and don't affect the build output.

Example warning (safe to ignore):
```
ERROR Error: NotYetImplemented
    at setProperty (...)
```

## Update Checklist

When updating Angular with SSG:

- [ ] Check Angular release notes for SSR/SSG breaking changes
- [ ] Ensure `@angular/ssr` is explicit dependency
- [ ] Update `main.server.ts` if `BootstrapContext` signature changed
- [ ] Test with `npm run build` (production)
- [ ] Verify prerendered routes count matches expected
- [ ] Check CI with Node version matching `engines.node`
