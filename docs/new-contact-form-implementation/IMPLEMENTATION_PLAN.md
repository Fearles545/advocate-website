# Plan: Beautiful Consultation Form with Cloudflare Worker + Telegram

## Summary

Replace the ugly Google Forms iframe dialog with a native Angular form page at `/consultation` that sends instant Telegram notifications via Cloudflare Worker.

**User Choices:**
- Notification: Telegram only (instant, free)
- Fields: Full intake form (see Form Structure below)
- Location: New `/consultation` page
- Security: Rate limiting + honeypot field
- Styling: Custom form components using design system (NO Angular Material for inputs)
- Use `frontend-design` skill for beautiful, branded form UI

## Form Structure (from requirements doc)

| # | Section | Fields | Type | Required |
|---|---------|--------|------|----------|
| 1 | Contact Info | Ім'я та прізвище | text | ✓ |
| | | Номер телефону | tel | ✓ |
| | | Зручний спосіб зв'язку | multi-checkbox (Дзвінок, Viber, WhatsApp, Telegram) | |
| 2 | Pension Status | Чи отримуєте пенсію? | radio (3 options) | ✓ |
| 3a | If receiving pension | Вид пенсії | multi-checkbox (7 options) | |
| 3b | If NOT receiving | Тип пенсійного питання | multi-checkbox (8 options) | |
| 4 | Description | Опис ситуації | textarea | ✓ |
| 5 | Location | Де проживаєте? | radio (Україна / За кордоном) | |
| 6 | Consent | Згода на обробку даних | checkbox | ✓ |
| 7 | Submit | Надіслати заявку | button | |
| 8 | Success | Thank you state | UI state | |

**Conditional Logic:**
- Section 3a shows when pension status = "Так, я вже отримую пенсію"
- Section 3b shows when pension status = "Ні, пенсія ще не призначена"

---

## Part 0: Prerequisites Setup (One-Time)

### 0.1 Create Cloudflare Account

1. Go to https://dash.cloudflare.com/sign-up
2. Sign up with email and password
3. Verify your email address
4. **You don't need to add your domain for Workers** - Workers work independently!

### 0.2 Install Wrangler CLI (Cloudflare's CLI tool)

```bash
# Install globally
npm install -g wrangler

# Verify installation
wrangler --version
# Should show: wrangler x.x.x

# Login to your Cloudflare account
wrangler login
# This opens browser → click "Allow" → you're authenticated
```

### 0.3 Create Telegram Bot

1. **Open Telegram** and search for `@BotFather` (official bot creator)

2. **Start chat** and send: `/newbot`

3. **BotFather asks for bot name** - enter something like:
   ```
   Advocate Pensia Consultation
   ```

4. **BotFather asks for username** - must end with `bot`, e.g.:
   ```
   advocate_pensia_bot
   ```

5. **BotFather gives you a token** - save it! Looks like:
   ```
   7123456789:AAHxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
   ⚠️ **Keep this secret!** Anyone with this token can control your bot.

6. **Get your chat ID** (where notifications will be sent):

   a. Open your new bot in Telegram and send any message (e.g., "Hello")

   b. Open this URL in browser (replace YOUR_TOKEN):
   ```
   https://api.telegram.org/botYOUR_TOKEN/getUpdates
   ```

   c. Find `"chat":{"id":123456789}` in the response - that number is your **chat ID**

   d. If response is empty `{"ok":true,"result":[]}`, send another message to the bot and refresh

### 0.4 Create Worker Project

```bash
# Navigate to your Angular project
cd /Users/Leo/Documents/L/Angular/advocate-website

# Create cloudflare directory inside the project
mkdir -p cloudflare
cd cloudflare

# Create the worker project
npm create cloudflare@latest consultation-form

# When prompted:
# - What type of application? → "Hello World" Worker
# - Do you want to use TypeScript? → Yes
# - Do you want to use git? → No (already in git via parent project)
# - Do you want to deploy? → No (we'll do it manually)

cd consultation-form
```

**Final structure:**
```
advocate-website/
├── src/                           ← Angular app
├── cloudflare/
│   └── consultation-form/         ← Worker lives here
│       ├── src/index.ts
│       ├── wrangler.toml
│       └── package.json
└── docs/
```

---

## Part 1: Cloudflare Worker Implementation

### 1.1 Worker Code with Rate Limiting + Honeypot

See `cloudflare/consultation-form/src/index.ts` for the full implementation.

### 1.2 Worker Configuration

Replace `wrangler.toml`:

```toml
name = "consultation-form"
main = "src/index.ts"
compatibility_date = "2024-01-01"

# KV Namespace for rate limiting
[[kv_namespaces]]
binding = "RATE_LIMIT"
id = "YOUR_KV_NAMESPACE_ID"  # Will be filled after creation
```

### 1.3 Create KV Namespace for Rate Limiting

```bash
# Create KV namespace
wrangler kv:namespace create "RATE_LIMIT"

# Output will show something like:
# Add the following to your wrangler.toml:
# [[kv_namespaces]]
# binding = "RATE_LIMIT"
# id = "abc123def456..."

# Copy the id and paste it into wrangler.toml
```

### 1.4 Set Secrets

```bash
# Set your Telegram bot token
wrangler secret put TELEGRAM_BOT_TOKEN
# Paste your token when prompted, e.g.: 7123456789:AAHxxxxxx

# Set your Telegram chat ID
wrangler secret put TELEGRAM_CHAT_ID
# Paste your chat ID when prompted, e.g.: 123456789
```

### 1.5 Deploy Worker

```bash
wrangler deploy

# Output will show your worker URL:
# Published consultation-form (1.0.0)
#   https://consultation-form.YOUR_SUBDOMAIN.workers.dev
```

**Save this URL** - you'll use it in the Angular app!

### 1.6 Test Worker

```bash
# Test with curl (replace URL with your actual worker URL)
curl -X POST https://consultation-form.YOUR_SUBDOMAIN.workers.dev \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:4200" \
  -d '{
    "name": "Тест",
    "phone": "+380999999999",
    "message": "Тестове повідомлення для перевірки форми"
  }'

# Expected response:
# {"success":true,"message":"Дякуємо! Ваша заявка успішно надіслана."}

# Check Telegram - you should receive the message!
```

---

## File Changes Summary

| Action | File |
|--------|------|
| **Create** | `src/app/consultation/consultation.component.ts` |
| **Create** | `src/app/consultation/consultation.component.html` |
| **Create** | `src/app/consultation/consultation.component.css` |
| **Create** | `cloudflare/consultation-form/` (inside project) |
| **Modify** | `src/app/app.routes.ts` - add route |
| **Modify** | `src/app/core/config/seo.config.ts` - add SEO entry |
| **Modify** | `src/app/contacts/contacts.component.ts` - remove dialog |
| **Modify** | `src/app/contacts/contacts.component.html` - change button to link |
| **Modify** | `public/sitemap.xml` - add consultation entry |
| **Delete** | `src/app/contacts/contact-form-dialog/` |

---

## Verification Plan

### 1. Worker Verification
```bash
curl -X POST https://consultation-form.YOUR_SUBDOMAIN.workers.dev \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:4200" \
  -d '{"name":"Тест","phone":"+380999999999","message":"Тестове повідомлення"}'
```

### 2. Angular Build
```bash
npx tsc --noEmit
```

### 3. Local Testing
1. `npm start`
2. Navigate to `http://localhost:4200/consultation`
3. Test form validation
4. Submit form → verify success state
5. Check Telegram notification

---

## Troubleshooting

### Telegram Bot Not Receiving Messages
1. **Check bot token** - Make sure you copied the full token from BotFather
2. **Check chat ID** - Verify by calling `/getUpdates` again
3. **Start chat** - You must send at least one message to the bot first

### CORS Errors
1. **Check origin** - Make sure the request origin matches allowed origins
2. **Check preflight** - OPTIONS request must return 204 with CORS headers

### Rate Limiting
1. **KV Namespace** - Make sure you created and linked it correctly
2. **IP Header** - Cloudflare sets `CF-Connecting-IP` automatically
