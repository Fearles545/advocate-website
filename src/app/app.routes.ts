import { Routes } from '@angular/router';
import { AboutMeComponent } from './about-me/about-me.component';
import { ContactsComponent } from './contacts/contacts.component';
import { DocumentsComponent } from './documents/documents.component';
import { MainComponent } from './main/main.component';

export const routes: Routes = [
  {
    path: 'main',
    title: 'Головна',
    component: MainComponent,
  },
  {
    path: 'about-me',
    title: 'Про мене',
    component: AboutMeComponent,
  },
  {
    path: 'contacts',
    title: 'Контакти',
    component: ContactsComponent,
  },
  {
    path: 'documents',
    title: 'Документи',
    component: DocumentsComponent,
  },
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
];
