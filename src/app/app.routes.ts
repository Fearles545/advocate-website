import { Routes } from '@angular/router';
import { AboutMeComponent } from './about-me/about-me.component';
import { ConsultationComponent } from './consultation/consultation.component';
import { ContactsComponent } from './contacts/contacts.component';
import { DocumentsComponent } from './documents/documents.component';
import { FaqComponent } from './faq/faq.component';
import { FeedbacksComponent } from './feedbacks/feedbacks.component';
import { PrivacyPolicyComponent } from './legal/privacy-policy.component';
import { PublicOfferComponent } from './legal/public-offer.component';
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
    path: 'instructions',
    loadChildren: () =>
      import('./instructions/routes').then((m) => m.instructionsRoutes),
  },
  {
    path: 'faq',
    component: FaqComponent,
  },
  {
    path: 'feedbacks',
    component: FeedbacksComponent,
  },
  {
    path: 'consultation',
    component: ConsultationComponent,
  },
  {
    path: 'contacts',
    component: ContactsComponent,
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
  },
  {
    path: 'public-offer',
    component: PublicOfferComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
