import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CtaOutlineButtonComponent } from '@shared/components/cta-outline-button';
import { CaseRoutePipe } from '../../../court-cases/pipes/case-route.pipe';
import { courtCases } from '../../../court-cases/cases';

@Component({
  selector: 'app-court-cases-section',
  imports: [DatePipe, MatIcon, RouterLink, CtaOutlineButtonComponent, CaseRoutePipe],
  templateUrl: './court-cases-section.component.html',
  styleUrl: './court-cases-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourtCasesSectionComponent {
  /** Display the 3 most recent court cases (already sorted by date in index.ts) */
  courtCases = courtCases.slice(0, 3);
}
