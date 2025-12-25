import { Routes } from '@angular/router';

import { CourtCasesListComponent } from './components/court-cases-list.component';
import { CourtCaseComponent } from './components/court-case.component';
import { courtCases } from './cases';

export const courtCasesRoutes: Routes = [
  {
    path: '',
    component: CourtCasesListComponent,
  },
  ...courtCases.map((courtCase) => ({
    path: courtCase.slug,
    component: CourtCaseComponent,
    data: {
      courtCase,
    },
  })),
];
