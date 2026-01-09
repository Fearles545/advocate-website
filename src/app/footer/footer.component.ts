import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { courtCases } from '../court-cases/cases';
import { SocialIconData } from '../core/icons.data';
import { CtaButtonComponent } from '../shared/components/cta-button/cta-button.component';
import { SocialIconLinkComponent } from '../social-icon-link/social-icon-link.component';

@Component({
  selector: 'app-footer',
  imports: [
    RouterLink,
    MatIconModule,
    MatTooltipModule,
    SocialIconLinkComponent,
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  iconsData = input.required<SocialIconData[]>();

  readonly currentYear = new Date().getFullYear();

  featuredCases = computed(() => {
    return courtCases.slice(0, 3);
  });

  socialMediaIconsData = computed(() => {
    const desiredOrder = ['instagram', 'tikTok', 'youtube', 'facebook'];

    return this.iconsData()
      .filter(
        (icon) =>
          icon.alt === 'facebook' ||
          icon.alt === 'instagram' ||
          icon.alt === 'tikTok' ||
          icon.alt === 'youtube'
      )
      .sort((a, b) => {
        const indexA = desiredOrder.indexOf(a.alt);
        const indexB = desiredOrder.indexOf(b.alt);
        return indexA - indexB;
      });
  });

  messengerIcons = computed(() => {
    return this.iconsData().filter(
      (icon) =>
        icon.alt === 'whatsApp' ||
        icon.alt === 'telegram' ||
        icon.alt === 'viber'
    );
  });
}
