import { Component, computed, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SocialIconData } from '../core/icons.data';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SocialIconLinkComponent } from '../social-icon-link/social-icon-link.component';

@Component({
  selector: 'app-drawer-content',
  imports: [
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    MatIconModule,
    SocialIconLinkComponent,
  ],
  templateUrl: './drawer-content.component.html',
  styleUrl: './drawer-content.component.css',
})
export class DrawerContentComponent {
  iconsData = input.required<SocialIconData[]>();
  onLinkClick = output<void>();

  socialMediaIconsData = computed(() => {
    const desiredOrder = ['tikTok', 'youtube-white', 'facebook', 'instagram'];

    return this.iconsData()
      .filter(
        (icon) =>
          icon.alt === 'facebook' ||
          icon.alt === 'instagram' ||
          icon.alt === 'tikTok' ||
          icon.alt === 'youtube-white'
      )
      .sort((a, b) => {
        const indexA = desiredOrder.indexOf(a.alt);
        const indexB = desiredOrder.indexOf(b.alt);
        return indexA - indexB;
      });
  });
}
