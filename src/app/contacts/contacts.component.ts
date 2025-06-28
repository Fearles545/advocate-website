import { Component, viewChild } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_SELECT_CONFIG, MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { CdkTextareaAutosize, TextFieldModule } from '@angular/cdk/text-field';

import { iconsData } from '../core/icons.data';

@Component({
  selector: 'app-contacts',
  // providers: [
  //   {
  //     provide: MAT_SELECT_CONFIG,
  //     useValue: {
  //       appearance: 'outline',
  //     },
  //   },
  // ],
  imports: [
    MatButtonModule,
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
  // @ViewChild('autosize') autosize!: CdkTextareaAutosize;
  autosize = viewChild<CdkTextareaAutosize>('autosize');

  iconsData = iconsData;
}
