import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { CourtCase, COURT_CASE_FAQ, getRelatedCases } from '../../cases';
import { Blog, getBlogsBySlug } from '../../../blog/blog-posts';
import { CaseRoutePipe } from '../../pipes/case-route.pipe';
import { CtaButtonComponent } from '../../../shared/components/cta-button';
import { FaqAccordionComponent } from '../../../shared/components/faq-accordion';

@Component({
  selector: 'app-court-case',
  imports: [
    DatePipe,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    CaseRoutePipe,
    CtaButtonComponent,
    FaqAccordionComponent,
  ],
  templateUrl: './court-case.component.html',
  styleUrl: './court-case.component.css',
})
export class CourtCaseComponent {
  courtCase = input.required<CourtCase>();
  faqItems = COURT_CASE_FAQ;

  relatedCases = computed<CourtCase[]>(() => {
    const slugs = this.courtCase().relatedCaseSlugs ?? [];
    return getRelatedCases(slugs);
  });

  relatedBlogs = computed<Blog[]>(() => {
    const slugs = this.courtCase().relatedBlogSlugs ?? [];
    return getBlogsBySlug(slugs);
  });
}
