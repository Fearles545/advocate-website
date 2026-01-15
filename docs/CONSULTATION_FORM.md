# Consultation Form System

This document describes the consultation form implementation that replaced the old Google Forms iframe dialog.

## Architecture Overview

```
┌─────────────────┐     HTTPS POST      ┌──────────────────────┐     Telegram API     ┌──────────────┐
│  Angular Form   │ ──────────────────► │  Cloudflare Worker   │ ──────────────────► │  Telegram    │
│  /consultation  │                     │  (Edge Computing)    │                     │  Bot         │
└─────────────────┘                     └──────────────────────┘                     └──────────────┘
                                                   │
                                                   ▼
                                        ┌──────────────────────┐
                                        │  Cloudflare KV       │
                                        │  (Rate Limiting)     │
                                        └──────────────────────┘
```

## Components

### 1. Angular Form (`/consultation` route)

**Location:** `src/app/consultation/`

- `consultation.component.ts` - Form logic with reactive forms and signals
- `consultation.component.html` - Custom-styled form (no Angular Material inputs)
- `consultation.component.css` - Glassmorphism design, custom checkboxes/radios

**Features:**
- Conditional sections based on pension status (shows different options for "receiving" vs "not assigned")
- Custom-styled native form elements following the site's design system
- Loading states and error handling
- Success state with animation

### 2. Cloudflare Worker (Backend)

**Location:** `cloudflare/consultation-form/`

- `src/index.ts` - Main worker code
- `wrangler.toml` - Cloudflare configuration
- `package.json` - Dependencies

**Deployed URL:** `https://consultation-form.iligol3.workers.dev`

### 3. Environment Configuration

**Location:** `src/environments/`

- `environment.ts` - Development (points to deployed worker)
- `environment.prod.ts` - Production (same URL)

## Security Features

### Rate Limiting
- **Limit:** 5 requests per IP per hour
- **Storage:** Cloudflare KV namespace
- **Purpose:** Prevents spam and abuse

### Honeypot Field
- Hidden `website` field in the form
- Bots that fill it automatically get rejected
- Human users never see it

### CORS Protection
- Only allows requests from:
  - `https://www.advocate-pensia.com.ua`
  - `https://advocate-pensia.com.ua`
  - `http://localhost:4200` (development)

### Input Validation
- Name: 2-100 characters
- Phone: Ukrainian format `+380XXXXXXXXX`
- Description: minimum 10 characters
- All fields sanitized before Telegram message

## Telegram Integration

### Bot Details
- **Bot Username:** @advocate_pensia_bot (or similar)
- **Notifications:** Instant message on form submission

### Message Format
Messages are formatted with Markdown and include:
- Name and phone number
- Preferred contact methods
- Pension status and type
- Location (Ukraine/abroad)
- Full description
- Timestamp (Kyiv timezone)

## Development Workflow

### Running Locally

1. Start Angular dev server:
   ```bash
   npm start
   ```

2. Visit `http://localhost:4200/consultation`

3. The form connects to the deployed Cloudflare Worker (no local worker needed)

### Testing Worker Locally (Optional)

```bash
cd cloudflare/consultation-form
npx wrangler dev
```

Then update `src/environments/environment.ts`:
```typescript
consultationWorkerUrl: 'http://localhost:8787'
```

## Deployment

### Deploying Worker Changes

```bash
cd cloudflare/consultation-form
npx wrangler deploy
```

### Managing Secrets

To update Telegram credentials:
```bash
cd cloudflare/consultation-form
npx wrangler secret put TELEGRAM_BOT_TOKEN
npx wrangler secret put TELEGRAM_CHAT_ID
```

### Viewing Logs

```bash
npx wrangler tail
```

## Cloudflare Dashboard

- **Dashboard:** https://dash.cloudflare.com
- **Worker:** Workers & Pages → consultation-form
- **KV Storage:** Workers & Pages → KV → consultation-form-RATE_LIMIT

## Troubleshooting

### CORS Errors
- Check that the request origin matches `ALLOWED_ORIGINS` in `src/index.ts`
- For local development, must use `http://localhost:4200` (not 127.0.0.1)

### No Telegram Notification
1. Check worker logs: `npx wrangler tail`
2. Verify secrets are set: check Cloudflare Dashboard → Worker → Settings → Variables
3. Test bot manually: send message to bot in Telegram

### Rate Limited
- Wait 1 hour, or
- Clear KV entry in Cloudflare Dashboard

## Files Changed from Original Implementation

### Added
- `cloudflare/consultation-form/` - Worker directory
- `src/app/consultation/` - Form component
- `src/environments/` - Environment files
- `docs/CONSULTATION_FORM.md` - This documentation

### Modified
- `angular.json` - Added environment file replacements
- `src/app/app.routes.ts` - Added `/consultation` route
- `src/app/core/config/seo.config.ts` - Added consultation SEO
- `public/sitemap.xml` - Added consultation URL
- `tsconfig.json` - Excluded cloudflare from Angular compilation
- `.gitignore` - Added cloudflare node_modules

### Removed
- `src/app/contacts/contact-form-dialog/` - Old Google Forms iframe dialog

### Updated (removed dialog references)
- `about-me.component.ts/html`
- `contacts.component.ts/html`
- `court-case.component.ts/html`
- `documents.component.ts/html`
- `faq.component.ts/html`
- `need-help-section.component.ts/html`
- `services.component.ts/html`

## Cost

**Free tier covers:**
- 100,000 Worker requests/day
- 1 GB KV storage
- Unlimited Telegram messages

For a small business website, you'll likely never exceed free limits.
