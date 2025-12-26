import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { feedbacks, Feedback } from './feedbacks.data';

@Component({
  selector: 'app-feedbacks',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './feedbacks.component.html',
  styleUrl: './feedbacks.component.css',
  imports: [MatIcon],
})
export class FeedbacksComponent {
  feedbacks: Feedback[] = feedbacks;
}
