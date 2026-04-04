import { Component, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { MatIconModule } from '@angular/material/icon';

import { CtaButtonComponent } from '../shared/components/cta-button';
import { iconsData, SocialIconData } from '../core/icons.data';
import { schedule } from '../core/config/schedule.config';

interface MessengerIcon extends SocialIconData {
  safeSvg: SafeHtml;
}

@Component({
  selector: 'app-contacts',
  imports: [NgOptimizedImage, RouterLink, MatIconModule, CtaButtonComponent],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css',
})
export class ContactsComponent {
  readonly schedule = schedule;
  private sanitizer = inject(DomSanitizer);
  private platformId = inject(PLATFORM_ID);

  readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly messengerIcons: MessengerIcon[] = iconsData
    .filter((icon) => icon.alt === 'telegram' || icon.alt === 'viber' || icon.alt === 'whatsApp')
    .map((icon) => ({
      ...icon,
      safeSvg: this.sanitizer.bypassSecurityTrustHtml(icon.svg),
    }));
}
