import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { feedbacks, Feedback } from './feedbacks.data';

@Component({
  selector: 'app-feedbacks',
  imports: [MatIcon],
  templateUrl: './feedbacks.component.html',
  styleUrl: './feedbacks.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbacksComponent {
  feedbacks: Feedback[] = feedbacks;
}
