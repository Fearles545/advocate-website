import { Routes } from '@angular/router';
import { AboutMeComponent } from './about-me/about-me.component';
import { ContactsComponent } from './contacts/contacts.component';
import { DocumentsComponent } from './documents/documents.component';
import { MainComponent } from './main/main.component';
import { ServicesComponent } from './services/services.component';
import { BlogComponent } from './blog/blog.component';

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
    path: 'services',
    title: 'Послуги',
    component: ServicesComponent,
  },
  {
    path: 'documents',
    title: 'Документи',
    component: DocumentsComponent,
  },
  {
    path: 'blog',
    title: 'Блог',
    component: BlogComponent,
  },
  {
    path: 'contacts',
    title: 'Контакти',
    component: ContactsComponent,
  },
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
];
