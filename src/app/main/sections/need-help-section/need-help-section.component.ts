import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { SocialIconLinkComponent } from '../../../social-icon-link/social-icon-link.component';
import { SocialIconData } from '../../../core/icons.data';
import { CtaButtonComponent } from '@shared/components/cta-button';

@Component({
  selector: 'app-need-help-section',
  imports: [
    MatButtonModule,
    MatIcon,
    RouterLink,
    SocialIconLinkComponent,
    CtaButtonComponent,
  ],
  templateUrl: './need-help-section.component.html',
  styleUrl: './need-help-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NeedHelpSectionComponent {
  messengerIcons = input.required<SocialIconData[]>();
}
