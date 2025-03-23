import { Routes } from '@angular/router';
import { AboutMeComponent } from './about-me/about-me.component';
import { MainComponent } from './main/main.component';
import { ContactsComponent } from './contacts/contacts.component';

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
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
];
