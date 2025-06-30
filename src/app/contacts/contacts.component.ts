import { Component, inject } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatIconModule } from '@angular/material/icon';

import { iconsData } from '../core/icons.data';
import { MatDialog } from '@angular/material/dialog';
import { ContactFormDialogComponent } from './contact-form-dialog/contact-form-dialog.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { fromEvent, startWith, map } from 'rxjs';

@Component({
  selector: 'app-contacts',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    TextFieldModule,
  ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css',
})
export class ContactsComponent {
  private dialog = inject(MatDialog);

  iconsData = iconsData;
  isDesktop = toSignal(
    fromEvent(window, 'resize').pipe(
      startWith(0),
      map(() => ({
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
      }))
    )
  );

  openContactForm() {
    this.dialog.open(ContactFormDialogComponent, {
      data: {
        width: this.isDesktop()?.innerWidth,
        height: this.isDesktop()?.innerHeight,
      },
      width: this.isDesktop()?.innerWidth! > 500 ? '640px' : '100vw',
      maxWidth: '100vw',
      height: this.isDesktop()?.innerWidth! > 500 ? '80vh' : '100vh',
      panelClass: 'contact-form-dialog',
      autoFocus: false,
    });
  }
}
