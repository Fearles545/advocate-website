import { Component, computed, input } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

import { MatTooltipModule } from '@angular/material/tooltip';

import { SocialIconData } from '../core/icons.data';
import { SocialIconLinkComponent } from '../social-icon-link/social-icon-link.component';

@Component({
  selector: 'app-footer',
  imports: [SocialIconLinkComponent, TitleCasePipe, MatTooltipModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  iconsData = input.required<SocialIconData[]>();
  phoneData = input.required<SocialIconData>();

  socialMediaIconsData = computed(() => {
    const desiredOrder = ['tikTok', 'youtube', 'facebook', 'instagram'];

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
}
