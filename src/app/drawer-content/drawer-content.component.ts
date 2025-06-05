import { Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SocialIconData } from '../core/icons.data';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-drawer-content',
  imports: [RouterLink, RouterLinkActive, MatButtonModule, MatIconModule],
  templateUrl: './drawer-content.component.html',
  styleUrl: './drawer-content.component.css',
})
export class DrawerContentComponent {
  phoneData = input.required<SocialIconData>();
  onLinkClick = output<void>();
}
