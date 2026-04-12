import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import {
  Instruction,
  INSTRUCTION_FAQ,
  CATEGORY_LABELS,
  findBySlug,
  getRelatedInstructions,
} from '../../data';
import { InstructionRoutePipe } from '../../pipes/instruction-route.pipe';
import { FaqAccordionComponent } from '@shared/components/faq-accordion/faq-accordion.component';
import { SocialShareComponent } from '../../../blog/components/social-share/social-share.component';
import { CtaButtonComponent } from '@shared/components/cta-button/cta-button.component';
import { blogs } from '../../../blog/blog-posts';
import { baseUrl } from '@core/config/base-url';

@Component({
  selector: 'app-instruction',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    MatIcon,
    MatExpansionModule,
    InstructionRoutePipe,
    FaqAccordionComponent,
    SocialShareComponent,
    CtaButtonComponent,
  ],
  templateUrl: './instruction.component.html',
  styleUrl: './instruction.component.css',
})
export class InstructionComponent {
  instruction = input.required<Instruction>();
  faqItems = INSTRUCTION_FAQ;
  categoryLabels = CATEGORY_LABELS;

  shareUrl = computed(
    () => `${baseUrl}/instructions/${this.instruction().slug}/`
  );

  prerequisiteInstruction = computed(() => {
    const slug = this.instruction().prerequisiteSlug;
    return slug ? findBySlug(slug) : undefined;
  });

  relatedInstructions = computed(() => {
    const slugs = this.instruction().relatedInstructionSlugs ?? [];
    return getRelatedInstructions(slugs);
  });

  relatedBlogs = computed(() => {
    const slugs = this.instruction().relatedBlogSlugs ?? [];
    return slugs
      .map((slug) => blogs.find((b) => b.slug === slug))
      .filter((b) => b !== undefined);
  });

  stepsLabel(count: number): string {
    if (count === 1) return '1 крок';
    if (count >= 2 && count <= 4) return `${count} кроки`;
    return `${count} кроків`;
  }
}
