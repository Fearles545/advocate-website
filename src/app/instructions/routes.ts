import { Routes } from '@angular/router';
import { InstructionsListComponent } from './components/instructions-list/instructions-list.component';
import { InstructionComponent } from './components/instruction/instruction.component';
import { instructions } from './data';

export const instructionsRoutes: Routes = [
  {
    path: '',
    component: InstructionsListComponent,
  },
  ...instructions.map((instruction) => ({
    path: instruction.slug,
    component: InstructionComponent,
    data: {
      instruction,
    },
  })),
];
