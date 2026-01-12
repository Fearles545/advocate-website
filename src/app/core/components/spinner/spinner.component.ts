import { Component, input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
})
export class SpinnerComponent {
  readonly show = input<boolean | null>(false);
  readonly blocking = input(true);
}
