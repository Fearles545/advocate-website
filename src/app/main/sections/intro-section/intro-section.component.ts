import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-intro-section',
  imports: [MatButtonModule, MatIcon, RouterLink],
  templateUrl: './intro-section.component.html',
  styleUrl: './intro-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntroSectionComponent {}
