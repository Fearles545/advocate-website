import { PageSEO } from '@core/services/seo.service';
import { instructions } from './data';
import { generateInstructionSeo } from './services/instruction-seo.generator';

export const INSTRUCTIONS_SEO_DATA: { [key: string]: PageSEO } =
  Object.fromEntries(
    instructions.map((instruction) => [
      instruction.slug,
      generateInstructionSeo(instruction),
    ])
  );
