import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import {
  CourtCase,
  courtCases,
  COURT_CASE_FAQ,
  DECISION_CATEGORIES,
  getRelatedCases,
} from '../../cases';
import { Blog, getBlogsBySlug } from '../../../blog/blog-posts';
import { caseRoute, CaseRoutePipe } from '../../pipes/case-route.pipe';
import { CourtCasesPaginationService } from '../../services/court-cases-pagination.service';
import { CtaButtonComponent } from '../../../shared/components/cta-button';
import { FaqAccordionComponent } from '../../../shared/components/faq-accordion';
import {
  CategoryLink,
  CategoryLinksComponent,
} from '@shared/components/category-links';
import {
  pickPrevNextItems,
  PrevNextNavigatorComponent,
} from '@shared/components/prev-next-navigator';

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
    CategoryLinksComponent,
    PrevNextNavigatorComponent,
  ],
  templateUrl: './court-case.component.html',
  styleUrl: './court-case.component.css',
})
export class CourtCaseComponent {
  private paginationService = inject(CourtCasesPaginationService);

  courtCase = input.required<CourtCase>();
  faqItems = COURT_CASE_FAQ;

  categoryLinks = computed<CategoryLink[]>(() =>
    DECISION_CATEGORIES.filter((category) =>
      this.courtCase().categories.includes(category.slug)
    ).map((category) => ({
      label: category.label,
      url: this.paginationService.categoryLink(category.slug),
    }))
  );

  relatedCases = computed<CourtCase[]>(() => {
    const slugs = this.courtCase().relatedCaseSlugs ?? [];
    return getRelatedCases(slugs);
  });

  relatedBlogs = computed<Blog[]>(() => {
    const slugs = this.courtCase().relatedBlogSlugs ?? [];
    return getBlogsBySlug(slugs);
  });

  navigation = computed(() =>
    pickPrevNextItems(
      courtCases,
      this.courtCase().slug,
      this.paginationService.selectedCategory(),
      (courtCase) => caseRoute(courtCase.slug)
    )
  );
}
