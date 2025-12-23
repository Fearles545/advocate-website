import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CtaOutlineButtonComponent } from '@shared/components/cta-outline-button';

@Component({
  selector: 'app-services-section',
  imports: [MatIcon, RouterLink, CtaOutlineButtonComponent],
  templateUrl: './services-section.component.html',
  styleUrl: './services-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesSectionComponent {}
