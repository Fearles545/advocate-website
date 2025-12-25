import { Routes } from '@angular/router';
import { AboutMeComponent } from './about-me/about-me.component';
import { ContactsComponent } from './contacts/contacts.component';
import { DocumentsComponent } from './documents/documents.component';
import { FeedbacksComponent } from './feedbacks/feedbacks.component';
import { MainComponent } from './main/main.component';
import { ServicesComponent } from './services/services.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'about-me',
    component: AboutMeComponent,
  },
  {
    path: 'services',
    component: ServicesComponent,
  },
  {
    path: 'documents',
    component: DocumentsComponent,
  },
  {
    path: 'blog',
    loadChildren: () => import('./blog/routes').then((m) => m.blogRoutes),
  },
  {
    path: 'court-cases',
    loadChildren: () =>
      import('./court-cases/routes').then((m) => m.courtCasesRoutes),
  },
  {
    path: 'feedbacks',
    component: FeedbacksComponent,
  },
  {
    path: 'contacts',
    component: ContactsComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
