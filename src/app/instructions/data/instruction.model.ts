import { FaqItem } from '@shared/components/faq-accordion/faq-accordion.component';

export type InstructionCategory = 'kep' | 'dovidky' | 'oplata';

export interface InstructionStep {
  title: string;
  description: string;
  image?: string;
  warning?: string;
  warningImage?: string;
}

export interface InstructionSeoOverrides {
  title?: string;
  description?: string;
  keywords?: string[];
}

export interface Instruction {
  slug: string;
  title: string;
  shortTitle: string;
  category: InstructionCategory;
  date: string;
  estimatedTime?: string;
  prerequisites: string[];
  intro: string;
  steps: InstructionStep[];
  importantNotes?: string[];
  prerequisiteSlug?: string;
  relatedInstructionSlugs?: string[];
  relatedBlogSlugs?: string[];
  seo?: InstructionSeoOverrides;
}

export const CATEGORY_LABELS: Record<InstructionCategory, string> = {
  kep: 'Електронний підпис (КЕП)',
  dovidky: 'Довідки та документи',
  oplata: 'Оплата',
};

export const CATEGORY_ICONS: Record<InstructionCategory, string> = {
  kep: 'key',
  dovidky: 'description',
  oplata: 'payments',
};

export const CATEGORY_ORDER: InstructionCategory[] = [
  'kep',
  'dovidky',
  'oplata',
];

export const INSTRUCTION_FAQ: FaqItem[] = [
  {
    question: 'Чи потрібен КЕП для отримання довідок?',
    answer:
      'Так, для входу в більшість державних порталів (Дія, Портал ПФУ) потрібен кваліфікований електронний підпис (КЕП). Скористайтеся нашими інструкціями для отримання КЕП через ПриватБанк або Монобанк.',
  },
  {
    question: 'Чи безкоштовне отримання довідок через онлайн-сервіси?',
    answer:
      'Так, отримання КЕП та довідок через Дію, Портал ПФУ та Приват24 є безкоштовним.',
  },
  {
    question: 'Що робити, якщо не вдається виконати крок з інструкції?',
    answer:
      'Якщо у Вас виникли складнощі — зверніться до адвоката для отримання консультації. Ми допоможемо вирішити будь-яке питання дистанційно.',
  },
];
