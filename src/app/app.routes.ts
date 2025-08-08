import { Routes } from '@angular/router';
import { AboutMeComponent } from './about-me/about-me.component';
import { ContactsComponent } from './contacts/contacts.component';
import { DocumentsComponent } from './documents/documents.component';
import { MainComponent } from './main/main.component';
import { ServicesComponent } from './services/services.component';
import { BlogComponent } from './blog/blog.component';
import { SEO_DATA } from './core/config/seo.config';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    data: {
      seo: SEO_DATA['main'],
    },
  },
  {
    path: 'about-me',
    component: AboutMeComponent,
    data: {
      seo: SEO_DATA['about-me'],
    },
  },
  {
    path: 'services',
    component: ServicesComponent,
    data: {
      seo: SEO_DATA['services'],
    },
  },
  {
    path: 'documents',
    component: DocumentsComponent,
    data: {
      seo: SEO_DATA['documents'],
    },
  },
  {
    path: 'blog',
    component: BlogComponent,
  },
  {
    path: 'contacts',
    component: ContactsComponent,
    data: {
      seo: SEO_DATA['contacts'],
    },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
