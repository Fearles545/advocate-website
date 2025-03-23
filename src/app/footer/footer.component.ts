import { Component, input } from '@angular/core';

import { SocialIconData } from '../core/icons.data';
import { SocialIconLinkComponent } from '../social-icon-link/social-icon-link.component';

@Component({
  selector: 'app-footer',
  imports: [SocialIconLinkComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  iconsData = input.required<SocialIconData[]>();
  phoneData = input.required<SocialIconData>();
}
