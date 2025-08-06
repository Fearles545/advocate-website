import { Component, inject, OnInit } from '@angular/core';

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
import { NgOptimizedImage } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

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
    NgOptimizedImage,
  ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css',
})
export class ContactsComponent implements OnInit {
  private meta = inject(Meta);
  private title = inject(Title);

  setSeo() {
    this.title.setTitle('Контакти | Поддяча Юлія Юріївна');

    this.meta.updateTag({
      name: 'description',
      content:
        'Контактна інформація адвоката Поддяча Юлії Юріївни. Телефон, email, адреса офісу. Записатися на консультацію онлайн.',
    });

    this.meta.updateTag({
      property: 'og:title',
      content: 'Контакти | Поддяча Юлія Юріївна',
    });

    this.meta.updateTag({
      property: 'og:description',
      content:
        'Контактна інформація адвоката. Записатися на консультацію онлайн.',
    });
  }

  ngOnInit(): void {
    this.setSeo();
  }
  private dialog = inject(MatDialog);

  iconsData = iconsData;

  openContactForm() {
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
