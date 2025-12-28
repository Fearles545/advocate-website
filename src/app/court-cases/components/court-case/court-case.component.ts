import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';

import { CourtCase, COURT_CASE_FAQ, getRelatedCases } from '../../cases';
import { Blog, getBlogsBySlug } from '../../../blog/blog-posts';

@Component({
  selector: 'app-court-case',
  imports: [
    DatePipe,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
  ],
  templateUrl: './court-case.component.html',
  styleUrl: './court-case.component.css',
})
export class CourtCaseComponent {
  courtCase = input.required<CourtCase>();
  faqItems = COURT_CASE_FAQ;

  relatedCases = computed<CourtCase[]>(() => {
    const caseNumbers = this.courtCase().relatedCaseNumbers ?? [];
    return getRelatedCases(caseNumbers);
  });

  relatedBlogs = computed<Blog[]>(() => {
    const slugs = this.courtCase().relatedBlogSlugs ?? [];
    return getBlogsBySlug(slugs);
  });
}
