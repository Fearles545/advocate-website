/**
 * Consultation Form Worker
 * Receives form submissions, validates, rate-limits, and sends to Telegram
 */

interface ContactMethods {
  call: boolean;
  viber: boolean;
  whatsapp: boolean;
  telegram: boolean;
}

interface ConsultationRequest {
  name: string;
  phone: string;
  contactMethods: ContactMethods;
  pensionStatus: 'receiving' | 'not_assigned' | 'suspended' | null;
  pensionTypes: Record<string, boolean>;
  questionTypes: Record<string, boolean>;
  description: string;
  location: 'ukraine' | 'abroad' | null;
  consent: boolean;
  website?: string;
}

interface Env {
  TELEGRAM_BOT_TOKEN: string;
  TELEGRAM_CHAT_ID: string;
  RATE_LIMIT: KVNamespace;
}

const ALLOWED_ORIGINS = [
  'https://www.advocate-pensia.com.ua',
  'https://advocate-pensia.com.ua',
  'http://localhost:4200',
];

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 3600;

function getCorsHeaders(origin: string | null): HeadersInit {
  const allowedOrigin = origin && ALLOWED_ORIGINS.includes(origin) ? origin : '';
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

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

function validateRequest(data: unknown): ConsultationRequest {
  if (!data || typeof data !== 'object') {
    throw new Error('Невірний формат даних');
  }

  const {
    name,
    phone,
    contactMethods,
    pensionStatus,
    pensionTypes,
    questionTypes,
    description,
    location,
    consent,
    website,
  } = data as Record<string, unknown>;

  if (website && typeof website === 'string' && website.length > 0) {
    throw new Error('Bot detected');
  }

  if (typeof name !== 'string' || name.trim().length < 2) {
    throw new Error("Введіть ваше ім'я (мінімум 2 символи)");
  }
  if (name.length > 100) {
    throw new Error("Ім'я занадто довге (максимум 100 символів)");
  }

  const cleanPhone = String(phone).replace(/\s/g, '');
  const phoneRegex = /^(\+\d{10,15}|\d{9})$/;
  if (!phoneRegex.test(cleanPhone)) {
    throw new Error('Невірний формат телефону. Введіть 9 цифр або міжнародний номер з +');
  }

  if (typeof description !== 'string' || description.trim().length < 10) {
    throw new Error('Опишіть ваше питання (мінімум 10 символів)');
  }
  if (description.length > 2000) {
    throw new Error('Повідомлення занадто довге (максимум 2000 символів)');
  }

  if (consent !== true) {
    throw new Error('Необхідна згода на обробку персональних даних');
  }

  const validPensionStatuses = ['receiving', 'not_assigned', 'suspended', null];
  if (!validPensionStatuses.includes(pensionStatus as string | null)) {
    throw new Error('Оберіть статус пенсії');
  }

  return {
    name: name.trim(),
    phone: cleanPhone,
    contactMethods: (contactMethods as ContactMethods) || { call: false, viber: false, whatsapp: false, telegram: false },
    pensionStatus: pensionStatus as ConsultationRequest['pensionStatus'],
    pensionTypes: (pensionTypes as Record<string, boolean>) || {},
    questionTypes: (questionTypes as Record<string, boolean>) || {},
    description: description.trim(),
    location: (location as ConsultationRequest['location']) || null,
    consent: true,
  };
}

function escapeMarkdownV2(text: string): string {
  return text.replace(/[_*[\]()~`>#+=|{}.!\\-]/g, '\\$&');
}

function formatContactMethods(methods: ContactMethods): string {
  const selected: string[] = [];
  if (methods.call) selected.push('Дзвінок');
  if (methods.viber) selected.push('Viber');
  if (methods.whatsapp) selected.push('WhatsApp');
  if (methods.telegram) selected.push('Telegram');
  return selected.length > 0 ? selected.join(', ') : 'Не вказано';
}

function formatPensionStatus(status: ConsultationRequest['pensionStatus']): string {
  switch (status) {
    case 'receiving':
      return 'Так, отримує пенсію';
    case 'not_assigned':
      return 'Ні, пенсія не призначена';
    case 'suspended':
      return 'Виплати припинені';
    default:
      return 'Не вказано';
  }
}

function formatSelectedOptions(options: Record<string, boolean>, labels: Record<string, string>): string {
  const selected = Object.entries(options)
    .filter(([, value]) => value)
    .map(([key]) => labels[key] || key);
  return selected.length > 0 ? selected.join(', ') : 'Не вказано';
}

function formatLocation(location: ConsultationRequest['location']): string {
  switch (location) {
    case 'ukraine':
      return 'Україна';
    case 'abroad':
      return 'За кордоном';
    default:
      return 'Не вказано';
  }
}

const PENSION_TYPE_LABELS: Record<string, string> = {
  byAge: 'За віком',
  privileged: 'На пільгових умовах',
  early: 'Дострокова',
  byService: 'За вислугу років',
  disability: 'По інвалідності',
  survivor: "У зв'язку з втратою годувальника",
  other: 'Інше',
};

const QUESTION_TYPE_LABELS: Record<string, string> = {
  byAge: 'Пенсія за віком',
  privileged: 'Пільгова пенсія',
  early: 'Дострокова пенсія',
  byService: 'Пенсія за вислугу років',
  recalculation: 'Перерахунок/індексація',
  appeal: 'Оскарження рішення ПФУ',
  experience: 'Стаж/незараховані періоди',
  other: 'Інше питання',
};

function formatTelegramMessage(data: ConsultationRequest): string {
  const timestamp = new Date().toLocaleString('uk-UA', {
    timeZone: 'Europe/Kyiv',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const lines = [
    '*Нова заявка на консультацію*',
    '',
    `*Ім'я:* ${escapeMarkdownV2(data.name)}`,
    `*Телефон:* ${escapeMarkdownV2(data.phone)}`,
    `*Спосіб зв'язку:* ${escapeMarkdownV2(formatContactMethods(data.contactMethods))}`,
    '',
    `*Статус пенсії:* ${escapeMarkdownV2(formatPensionStatus(data.pensionStatus))}`,
  ];

  if (data.pensionStatus === 'receiving' || data.pensionStatus === 'suspended') {
    lines.push(`*Вид пенсії:* ${escapeMarkdownV2(formatSelectedOptions(data.pensionTypes, PENSION_TYPE_LABELS))}`);
  }

  if (data.pensionStatus === 'not_assigned') {
    lines.push(`*Тип питання:* ${escapeMarkdownV2(formatSelectedOptions(data.questionTypes, QUESTION_TYPE_LABELS))}`);
  }

  lines.push(
    '',
    `*Місце проживання:* ${escapeMarkdownV2(formatLocation(data.location))}`,
    '',
    '*Опис ситуації:*',
    escapeMarkdownV2(data.description),
    '',
    `_${escapeMarkdownV2(timestamp)}_`
  );

  return lines.join('\n');
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

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get('Origin');
    const corsHeaders = getCorsHeaders(origin);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ success: false, error: 'Method not allowed' }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
      return new Response(JSON.stringify({ success: false, error: 'Forbidden' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';

    try {
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

      const requestData = await request.json();
      const validatedData = validateRequest(requestData);

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

      if (errorMessage === 'Bot detected') {
        return new Response(JSON.stringify({ success: true, message: 'Дякуємо!' }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
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
