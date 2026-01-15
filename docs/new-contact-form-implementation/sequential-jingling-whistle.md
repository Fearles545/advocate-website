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

Replace `src/index.ts` with this complete code:

```typescript
/**
 * Consultation Form Worker
 * Receives form submissions, validates, rate-limits, and sends to Telegram
 */

interface ConsultationRequest {
  name: string;
  phone: string;
  message: string;
  website?: string; // Honeypot field - should always be empty
}

interface Env {
  TELEGRAM_BOT_TOKEN: string;
  TELEGRAM_CHAT_ID: string;
  RATE_LIMIT: KVNamespace; // For rate limiting
}

const ALLOWED_ORIGINS = [
  'https://www.advocate-pensia.com.ua',
  'https://advocate-pensia.com.ua',
  'http://localhost:4200', // For local development
];

const RATE_LIMIT_MAX = 5; // Max requests per IP
const RATE_LIMIT_WINDOW = 3600; // 1 hour in seconds

// ============ CORS ============
function getCorsHeaders(origin: string | null): HeadersInit {
  const allowedOrigin = origin && ALLOWED_ORIGINS.includes(origin) ? origin : '';
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

// ============ Rate Limiting ============
async function checkRateLimit(ip: string, env: Env): Promise<{ allowed: boolean; remaining: number }> {
  const key = `rate:${ip}`;
  const current = await env.RATE_LIMIT.get(key);
  const count = current ? parseInt(current, 10) : 0;

  if (count >= RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0 };
  }

  await env.RATE_LIMIT.put(key, String(count + 1), { expirationTtl: RATE_LIMIT_WINDOW });
  return { allowed: true, remaining: RATE_LIMIT_MAX - count - 1 };
}

// ============ Validation ============
function validateRequest(data: unknown): ConsultationRequest {
  if (!data || typeof data !== 'object') {
    throw new Error('Невірний формат даних');
  }

  const { name, phone, message, website } = data as Record<string, unknown>;

  // Honeypot check - if filled, it's a bot
  if (website && typeof website === 'string' && website.length > 0) {
    throw new Error('Bot detected');
  }

  // Validate name
  if (typeof name !== 'string' || name.trim().length < 2) {
    throw new Error('Введіть ваше імʼя (мінімум 2 символи)');
  }
  if (name.length > 100) {
    throw new Error('Імʼя занадто довге (максимум 100 символів)');
  }

  // Validate phone (Ukrainian format)
  const cleanPhone = String(phone).replace(/\s/g, '');
  const phoneRegex = /^\+380\d{9}$/;
  if (!phoneRegex.test(cleanPhone)) {
    throw new Error('Невірний формат телефону. Використовуйте +380XXXXXXXXX');
  }

  // Validate message
  if (typeof message !== 'string' || message.trim().length < 10) {
    throw new Error('Опишіть ваше питання (мінімум 10 символів)');
  }
  if (message.length > 2000) {
    throw new Error('Повідомлення занадто довге (максимум 2000 символів)');
  }

  return {
    name: name.trim(),
    phone: cleanPhone,
    message: message.trim(),
  };
}

// ============ Telegram ============
function escapeMarkdownV2(text: string): string {
  return text.replace(/[_*[\]()~`>#+=|{}.!\\-]/g, '\\$&');
}

function formatTelegramMessage(data: ConsultationRequest): string {
  const timestamp = new Date().toLocaleString('uk-UA', {
    timeZone: 'Europe/Kyiv',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  // Using MarkdownV2 format
  return [
    '📋 *Нова заявка на консультацію*',
    '',
    `👤 *Імʼя:* ${escapeMarkdownV2(data.name)}`,
    `📞 *Телефон:* ${escapeMarkdownV2(data.phone)}`,
    '',
    '💬 *Повідомлення:*',
    escapeMarkdownV2(data.message),
    '',
    `🕐 _${escapeMarkdownV2(timestamp)}_`,
  ].join('\n');
}

async function sendTelegramMessage(message: string, env: Env): Promise<void> {
  const url = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: env.TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'MarkdownV2',
    }),
  });

  if (!response.ok) {
    const errorData = await response.text();
    console.error('Telegram API error:', errorData);
    throw new Error('Помилка відправки повідомлення');
  }
}

// ============ Main Handler ============
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get('Origin');
    const corsHeaders = getCorsHeaders(origin);

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    // Only allow POST
    if (request.method !== 'POST') {
      return new Response(
        JSON.stringify({ success: false, error: 'Method not allowed' }),
        { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check origin
    if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Forbidden' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get client IP for rate limiting
    const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';

    try {
      // Check rate limit
      const rateLimit = await checkRateLimit(clientIP, env);
      if (!rateLimit.allowed) {
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Забагато запитів. Спробуйте через годину.',
          }),
          {
            status: 429,
            headers: {
              ...corsHeaders,
              'Content-Type': 'application/json',
              'X-RateLimit-Remaining': '0',
              'Retry-After': '3600',
            },
          }
        );
      }

      // Parse and validate request
      const requestData = await request.json();
      const validatedData = validateRequest(requestData);

      // Format and send Telegram message
      const telegramMessage = formatTelegramMessage(validatedData);
      await sendTelegramMessage(telegramMessage, env);

      return new Response(
        JSON.stringify({
          success: true,
          message: 'Дякуємо! Ваша заявка успішно надіслана.',
        }),
        {
          status: 200,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
            'X-RateLimit-Remaining': String(rateLimit.remaining),
          },
        }
      );
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Невідома помилка';

      // Don't reveal bot detection
      if (errorMessage === 'Bot detected') {
        return new Response(
          JSON.stringify({ success: true, message: 'Дякуємо!' }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const isValidationError = !errorMessage.includes('Telegram') && !errorMessage.includes('Невідома');

      return new Response(
        JSON.stringify({
          success: false,
          error: isValidationError ? errorMessage : 'Помилка сервера. Спробуйте пізніше.',
        }),
        {
          status: isValidationError ? 400 : 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
  },
};
```

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

## Part 2: Angular Consultation Page

### 2.1 Implementation Approach

**NO Angular Material for form inputs.** Instead:
- Custom-styled native `<input>`, `<textarea>`, `<select>` elements
- Design system colors, typography, spacing
- Use `frontend-design` skill for beautiful branded UI
- Clean CSS without `::ng-deep` hacks

### 2.2 Component Structure

**`src/app/consultation/consultation.component.ts`**

```typescript
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon'; // Only for icons, not form fields
import { catchError, firstValueFrom, timeout } from 'rxjs';

import { CtaButtonComponent } from '../shared/components/cta-button/cta-button.component';
import { SpinnerComponent } from '../core/components/spinner/spinner.component';

// Pension status options
type PensionStatus = 'receiving' | 'not_assigned' | 'suspended' | null;

@Component({
  selector: 'app-consultation',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatIconModule,
    CtaButtonComponent,
    SpinnerComponent,
  ],
  templateUrl: './consultation.component.html',
  styleUrl: './consultation.component.css',
})
export class ConsultationComponent {
  private readonly http = inject(HttpClient);
  private readonly workerUrl = 'https://consultation-form.YOUR_SUBDOMAIN.workers.dev';

  // State
  readonly isSubmitting = signal(false);
  readonly isSuccess = signal(false);
  readonly errorMessage = signal<string | null>(null);

  // Form
  readonly form = new FormGroup({
    // Section 1: Contact Info
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2), Validators.maxLength(100)],
    }),
    phone: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^\+380\d{9}$/)],
    }),
    contactMethods: new FormGroup({
      call: new FormControl(false, { nonNullable: true }),
      viber: new FormControl(false, { nonNullable: true }),
      whatsapp: new FormControl(false, { nonNullable: true }),
      telegram: new FormControl(false, { nonNullable: true }),
    }),

    // Section 2: Pension Status
    pensionStatus: new FormControl<PensionStatus>(null, {
      validators: [Validators.required],
    }),

    // Section 3a: If receiving pension - pension types
    pensionTypes: new FormGroup({
      byAge: new FormControl(false, { nonNullable: true }),
      privileged: new FormControl(false, { nonNullable: true }),
      early: new FormControl(false, { nonNullable: true }),
      byService: new FormControl(false, { nonNullable: true }),
      disability: new FormControl(false, { nonNullable: true }),
      survivor: new FormControl(false, { nonNullable: true }),
      other: new FormControl(false, { nonNullable: true }),
    }),

    // Section 3b: If NOT receiving - question types
    questionTypes: new FormGroup({
      byAge: new FormControl(false, { nonNullable: true }),
      privileged: new FormControl(false, { nonNullable: true }),
      early: new FormControl(false, { nonNullable: true }),
      byService: new FormControl(false, { nonNullable: true }),
      recalculation: new FormControl(false, { nonNullable: true }),
      appeal: new FormControl(false, { nonNullable: true }),
      experience: new FormControl(false, { nonNullable: true }),
      other: new FormControl(false, { nonNullable: true }),
    }),

    // Section 4: Description
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10), Validators.maxLength(2000)],
    }),

    // Section 5: Location
    location: new FormControl<'ukraine' | 'abroad' | null>(null),

    // Section 6: Consent
    consent: new FormControl(false, {
      nonNullable: true,
      validators: [Validators.requiredTrue],
    }),

    // Honeypot
    website: new FormControl('', { nonNullable: true }),
  });

  // Computed: show pension types section
  readonly showPensionTypes = computed(() => {
    const status = this.form.controls.pensionStatus.value;
    return status === 'receiving' || status === 'suspended';
  });

  // Computed: show question types section
  readonly showQuestionTypes = computed(() => {
    return this.form.controls.pensionStatus.value === 'not_assigned';
  });

  async onSubmit(): Promise<void> {
    if (this.form.invalid || this.isSubmitting()) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    try {
      const response = await firstValueFrom(
        this.http.post<{ success: boolean; error?: string }>(
          this.workerUrl,
          this.form.getRawValue()
        ).pipe(
          timeout(15000),
          catchError((error: HttpErrorResponse) => {
            if (error.status === 0) throw new Error('Перевірте підключення до інтернету');
            if (error.status === 429) throw new Error('Забагато запитів. Спробуйте через годину.');
            throw new Error(error.error?.error || 'Помилка надсилання форми');
          })
        )
      );

      if (response.success) {
        this.isSuccess.set(true);
        this.form.reset();
      } else {
        throw new Error(response.error || 'Невідома помилка');
      }
    } catch (error) {
      this.errorMessage.set(error instanceof Error ? error.message : 'Спробуйте ще раз пізніше');
    } finally {
      this.isSubmitting.set(false);
    }
  }

  resetForm(): void {
    this.isSuccess.set(false);
    this.errorMessage.set(null);
    this.form.reset();
  }
}
```

### 2.3 Template & Styles

**Implementation via `frontend-design` skill:**

The HTML template and CSS will be generated using the `frontend-design` skill during implementation. This ensures:
- Beautiful, production-grade UI
- Custom form elements (no Material form fields)
- Design system compliance (colors, typography, spacing)
- No `::ng-deep` hacks

**Template structure outline:**

```html
<section class="page-bg-pattern">
  <div class="page-content">
    <header class="page-header">
      <!-- Badge, H1, Intro text -->
    </header>

    <div class="form-container">
      @if (isSuccess()) {
        <!-- Success State: Thank you message -->
      } @else {
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <!-- Section 1: Contact Info -->
          <!-- Custom text inputs + checkbox group -->

          <!-- Section 2: Pension Status -->
          <!-- Custom radio group (3 options) -->

          <!-- Section 3a: Pension Types (conditional) -->
          @if (showPensionTypes()) { ... }

          <!-- Section 3b: Question Types (conditional) -->
          @if (showQuestionTypes()) { ... }

          <!-- Section 4: Description -->
          <!-- Custom textarea -->

          <!-- Section 5: Location -->
          <!-- Custom radio group -->

          <!-- Section 6: Consent -->
          <!-- Custom checkbox with link -->

          <!-- Honeypot (hidden) -->
          <!-- Error Banner -->
          <!-- Submit Button -->
        </form>
      }
    </div>
  </div>
</section>
```

**Custom form element styling approach:**

```css
/* Text Input */
.form-input {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 1px solid var(--gold-alpha-20);
  border-radius: var(--card-border-radius-sm);
  font-family: inherit;
  font-size: 1rem;
  color: var(--text-color-primary);
  background: white;
  transition: border-color var(--transition-normal), box-shadow var(--transition-normal);
}

.form-input:focus {
  outline: none;
  border-color: var(--color-gold);
  box-shadow: 0 0 0 3px var(--gold-alpha-15);
}

.form-input.invalid {
  border-color: #dc2626;
}

/* Custom Checkbox */
.checkbox-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
}

.checkbox-item input[type="checkbox"] {
  appearance: none;
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid var(--gold-alpha-30);
  border-radius: 4px;
  cursor: pointer;
  transition: all var(--transition-normal);
}

.checkbox-item input[type="checkbox"]:checked {
  background: var(--color-gold);
  border-color: var(--color-gold);
  /* Custom checkmark via background-image or ::after */
}

/* Custom Radio */
.radio-item input[type="radio"] {
  appearance: none;
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid var(--gold-alpha-30);
  border-radius: 50%;
  cursor: pointer;
}

.radio-item input[type="radio"]:checked {
  border-color: var(--color-gold);
  background: radial-gradient(var(--color-gold) 40%, transparent 45%);
}
```

**Note:** Full template and styles will be crafted during implementation using the `frontend-design` skill for optimal visual quality.

### 2.2 Add Route

**`src/app/app.routes.ts`** - Add this route:

```typescript
import { ConsultationComponent } from './consultation/consultation.component';

// Add to routes array:
{
  path: 'consultation',
  component: ConsultationComponent,
},
```

### 2.3 Add SEO Config

**`src/app/core/config/seo.config.ts`** - Add to `SEO_DATA`:

```typescript
consultation: {
  title: 'Запис на консультацію з пенсійних питань | Адвокат Поддяча Юлія',
  description:
    'Заповніть форму для запису на консультацію з адвокатом по пенсіях. Швидкий зворотний звʼязок, консультації онлайн по всій Україні та за кордоном.',
  keywords:
    'запис на консультацію, консультація адвоката пенсія, запис до адвоката онлайн, юридична консультація пенсія',
  canonical: '/consultation/',
  schema: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Головна', item: 'https://www.advocate-pensia.com.ua/' },
          { '@type': 'ListItem', position: 2, name: 'Консультація', item: 'https://www.advocate-pensia.com.ua/consultation/' },
        ],
      },
      {
        '@type': 'ContactPage',
        name: 'Запис на консультацію',
        url: 'https://www.advocate-pensia.com.ua/consultation/',
        inLanguage: 'uk-UA',
      },
    ],
  },
},
```

---

## Part 3: Update Existing Files

### 3.1 Update Contacts Page

**`src/app/contacts/contacts.component.html`** - Replace dialog button with link:

```html
<!-- Find and replace the button around line 178-185 -->
<!-- FROM: -->
<button type="button" appCtaButton icon="calendar_today" (click)="openContactForm()">
  Записатися на консультацію
</button>

<!-- TO: -->
<a routerLink="/consultation" appCtaButton icon="calendar_today">
  Записатися на консультацію
</a>
```

**`src/app/contacts/contacts.component.ts`** - Remove dialog code:
- Remove `MatDialog` import and `inject(MatDialog)`
- Remove `ContactFormDialogComponent` import
- Remove `openContactForm()` method

### 3.2 Delete Obsolete Dialog

Delete the entire directory: `src/app/contacts/contact-form-dialog/`

### 3.3 Update Sitemap

**`public/sitemap.xml`** - Add after contacts entry:

```xml
<url>
  <loc>https://www.advocate-pensia.com.ua/consultation/</loc>
  <lastmod>2026-01-15</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
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

**Key Implementation Notes:**
- Use `frontend-design` skill for form UI (no Material form fields)
- Custom-styled inputs, checkboxes, radio buttons using design system
- Conditional form sections based on pension status
- Worker handles expanded form data structure

---

## Verification Plan

### 1. Worker Verification
```bash
# Test successful submission
curl -X POST https://consultation-form.YOUR_SUBDOMAIN.workers.dev \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:4200" \
  -d '{"name":"Тест","phone":"+380999999999","message":"Тестове повідомлення"}'

# Verify Telegram notification received

# Test validation errors
curl -X POST https://consultation-form.YOUR_SUBDOMAIN.workers.dev \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:4200" \
  -d '{"name":"A","phone":"123","message":"short"}'

# Should return validation error

# Test honeypot (should silently succeed but not send to Telegram)
curl -X POST https://consultation-form.YOUR_SUBDOMAIN.workers.dev \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:4200" \
  -d '{"name":"Bot","phone":"+380999999999","message":"Bot message","website":"http://spam.com"}'
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

### 4. Responsive Testing
- 375px (mobile)
- 768px (tablet)
- 1024px (desktop)

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

### Form Not Submitting

1. **Worker URL** - Update the URL in `consultation.component.ts`
2. **Console errors** - Check browser DevTools for errors
3. **Network tab** - Check the actual request/response
