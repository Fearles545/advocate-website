export type {
  Instruction,
  InstructionStep,
  InstructionCategory,
  InstructionSeoOverrides,
} from './instruction.model';
export {
  CATEGORY_LABELS,
  CATEGORY_ICONS,
  CATEGORY_ORDER,
  INSTRUCTION_FAQ,
} from './instruction.model';

import {
  Instruction,
  InstructionCategory,
  CATEGORY_ORDER,
} from './instruction.model';
import { kepPrivatbank } from './kep-privatbank';
import { kepMonobank } from './kep-monobank';
import { dovidkaOk5Diia } from './dovidka-ok5-diia';
import { vytiagMisceProzhyvanniaDiia } from './vytiag-misce-prozhyvannia-diia';
import { dovidkaDokhodyPortalPfu } from './dovidka-dokhody-portal-pfu';
import { dovidkaVyplataPensiiPrivat24 } from './dovidka-vyplata-pensii-privat24';
import { dovidkaVyplataPensiiMonobank } from './dovidka-vyplata-pensii-monobank';
import { oplataRekvizytamyPrivat24 } from './oplata-rekvizytamy-privat24';

const allInstructions: Instruction[] = [
  kepPrivatbank,
  kepMonobank,
  dovidkaOk5Diia,
  vytiagMisceProzhyvanniaDiia,
  dovidkaDokhodyPortalPfu,
  dovidkaVyplataPensiiPrivat24,
  dovidkaVyplataPensiiMonobank,
  oplataRekvizytamyPrivat24,
];

export const instructions: Instruction[] = allInstructions.sort((a, b) =>
  a.category.localeCompare(b.category)
);

export function findBySlug(slug: string): Instruction | undefined {
  return instructions.find((i) => i.slug === slug);
}

export function getRelatedInstructions(slugs: string[]): Instruction[] {
  return slugs
    .map((slug) => findBySlug(slug))
    .filter((i): i is Instruction => i !== undefined);
}

export function instructionsByCategory(): Map<InstructionCategory, Instruction[]> {
  const grouped = new Map<InstructionCategory, Instruction[]>();
  for (const category of CATEGORY_ORDER) {
    const items = instructions.filter((i) => i.category === category);
    if (items.length > 0) {
      grouped.set(category, items);
    }
  }
  return grouped;
}
