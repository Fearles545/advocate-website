import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CourtCase } from '../../models';
import { CtaOutlineButtonComponent } from '@shared/components/cta-outline-button';

@Component({
  selector: 'app-court-cases-section',
  imports: [DatePipe, MatIcon, RouterLink, CtaOutlineButtonComponent],
  templateUrl: './court-cases-section.component.html',
  styleUrl: './court-cases-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourtCasesSectionComponent {
  courtCases = input.required<CourtCase[]>();
}
