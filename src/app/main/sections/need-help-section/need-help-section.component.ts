import {
  Component,
  ChangeDetectionStrategy,
  input,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ContactFormDialogComponent } from '../../../contacts/contact-form-dialog/contact-form-dialog.component';
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
  private dialog = inject(MatDialog);

  messengerIcons = input.required<SocialIconData[]>();

  openContactForm(): void {
    this.dialog.open(ContactFormDialogComponent, {
      data: {
        width: 'fit-content',
        height: 'auto',
      },
      width: '100%',
      maxWidth: '100vw',
      height: 'auto',
      panelClass: 'contact-form-dialog',
      autoFocus: false,
    });
  }
}
