import { Component } from '@angular/core';
import { blogs, Blog } from '../blog/blog-posts';
import { iconsData, SocialIconData } from '../core/icons.data';
import { feedbacks, Feedback } from '../feedbacks/feedbacks.data';
import { CourtCase } from './models';
import { IntroSectionComponent } from './sections/intro-section/intro-section.component';
import { PensionHelpSectionComponent } from './sections/pension-help-section/pension-help-section.component';
import { AboutSectionComponent } from './sections/about-section/about-section.component';
import { WhyMeSectionComponent } from './sections/why-me-section/why-me-section.component';
import { DocumentsSectionComponent } from './sections/documents-section/documents-section.component';
import { ServicesSectionComponent } from './sections/services-section/services-section.component';
import { FeedbackSectionComponent } from './sections/feedback-section/feedback-section.component';
import { CourtCasesSectionComponent } from './sections/court-cases-section/court-cases-section.component';
import { BlogPreviewSectionComponent } from './sections/blog-preview-section/blog-preview-section.component';
import { SeoSectionComponent } from './sections/seo-section/seo-section.component';
import { NeedHelpSectionComponent } from './sections/need-help-section/need-help-section.component';

@Component({
  selector: 'app-main',
  imports: [
    IntroSectionComponent,
    PensionHelpSectionComponent,
    AboutSectionComponent,
    ServicesSectionComponent,
    WhyMeSectionComponent,
    DocumentsSectionComponent,
    FeedbackSectionComponent,
    CourtCasesSectionComponent,
    BlogPreviewSectionComponent,
    SeoSectionComponent,
    NeedHelpSectionComponent,
  ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  recentBlogs: Blog[] = blogs.slice(0, 3);

  courtCases: CourtCase[] = [
    {
      title:
        'Оскаржили незаконну відмову ПФУ та вибороли право клієнтки на пенсію по Списку №2, зарахувавши пільговий стаж та періоди роботи до страхового стажу',
      caseNumber: '420/22036/25',
      date: '2025-12-01',
    },
    {
      title:
        'Вибороли в суді право на пенсію шахтарю по Списку №1, зарахувавши пільговий стаж без уточнюючих довідок, період перебування в центрі зайнятості та періоди роботи без сплати внесків',
      caseNumber: '200/7851/25',
      date: '2025-11-15',
    },
    {
      title:
        'Зарахували військову службу шахтарю з 2022 року до пільгового стажу',
      caseNumber: '200/5966/25',
      date: '2025-10-20',
    },
  ];

  feedbacks: Feedback[] = feedbacks.slice(0, 5);

  get messengerIcons(): SocialIconData[] {
    return iconsData.filter((icon) =>
      ['telegram', 'viber', 'whatsApp'].includes(icon.alt)
    );
  }
}
