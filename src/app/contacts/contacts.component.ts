import { Component } from '@angular/core';

import { iconsData } from '../core/icons.data';
import { SocialIconLinkComponent } from '../social-icon-link/social-icon-link.component';

@Component({
  selector: 'app-contacts',
  imports: [SocialIconLinkComponent],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css',
})
export class ContactsComponent {
  iconsData = iconsData;
}
