import { Component, Input } from '@angular/core';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
  imports: [MatProgressSpinnerModule],
})
export class SpinnerComponent {
  // loadingService = inject(LoadingService);

  @Input() show: boolean | null = false;
  @Input() mode = 'indeterminate';
  @Input() color: 'primary' | 'accent' | 'warn' = 'accent';
  @Input() blocking = true;
}
