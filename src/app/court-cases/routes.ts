import { Routes } from '@angular/router';

import { CourtCaseComponent } from './components/court-case/court-case.component';
import { courtCases } from './cases';
import { CourtCasesListComponent } from './components/court-cases-list/court-cases-list.component';

export const courtCasesRoutes: Routes = [
  {
    path: '',
    component: CourtCasesListComponent,
  },
  ...courtCases.map((courtCase) => ({
    path: courtCase.caseNumber,
    component: CourtCaseComponent,
    data: {
      courtCase,
    },
  })),
];
