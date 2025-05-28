import { Component, input, output } from '@angular/core';
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
    SocialIconLinkComponent,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './drawer-content.component.html',
  styleUrl: './drawer-content.component.css',
})
export class DrawerContentComponent {
  phoneData = input.required<SocialIconData>();
  onLinkClick = output<void>();
}
