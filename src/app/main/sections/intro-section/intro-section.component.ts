import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { CtaButtonComponent } from '@shared/components/cta-button';

@Component({
  selector: 'app-intro-section',
  imports: [MatButtonModule, MatIcon, RouterLink, NgOptimizedImage, CtaButtonComponent],
  templateUrl: './intro-section.component.html',
  styleUrl: './intro-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntroSectionComponent {}
