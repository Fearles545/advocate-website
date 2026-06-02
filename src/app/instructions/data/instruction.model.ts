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
      'Ні, КЕП не потрібен. Для отримання довідок через «Дію», застосунок банку чи портал Пенсійного фонду України достатньо звичайної авторизації — наприклад, входу за паролем, відбитком пальця або через BankID.',
  },
  {
    question: 'Чи безкоштовне отримання довідок через онлайн-сервіси?',
    answer:
      'Так, отримання КЕП та довідок через Дію, Портал ПФУ, Приват24 та Монобанку є безкоштовним.',
  },
  {
    question: 'Що робити, якщо не вдається виконати крок з інструкції?',
    answer:
      'Якщо на якомусь етапі виникли складнощі — зверніться до адвоката для отримання консультації або по допомогу безпосередньо до установи банку чи органу Пенсійного фонду України.',
  },
];
