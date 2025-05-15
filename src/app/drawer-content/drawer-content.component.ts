import { Component, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-drawer-content',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './drawer-content.component.html',
  styleUrl: './drawer-content.component.css',
})
export class DrawerContentComponent {
  onLinkClick = output<void>();
}
