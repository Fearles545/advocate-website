import { ChangeDetectionStrategy, Component } from '@angular/core';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loader',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatProgressSpinnerModule],
  template: `
    <mat-spinner
      [style]="{
        margin: '2rem auto',
        display: 'block',
      }"
    ></mat-spinner>
  `,
})
export class LoaderComponent {}
