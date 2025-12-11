import {
  Component,
  ChangeDetectionStrategy,
  input,
  signal,
  computed,
} from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Feedback } from '../../models';

@Component({
  selector: 'app-feedback-section',
  imports: [MatIconButton, MatIcon, RouterLink],
  templateUrl: './feedback-section.component.html',
  styleUrl: './feedback-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackSectionComponent {
  feedbacks = input.required<Feedback[]>();

  currentFeedbackIndex = signal(0);
  private touchStartX = 0;
  private touchEndX = 0;

  currentFeedback = computed(
    () => this.feedbacks()[this.currentFeedbackIndex()]
  );

  reviewerName = computed(() => this.currentFeedback().name);

  nextFeedback(): void {
    this.currentFeedbackIndex.update(
      (index) => (index + 1) % this.feedbacks().length
    );
  }

  previousFeedback(): void {
    const feedbacks = this.feedbacks();
    this.currentFeedbackIndex.update(
      (index) => (index === 0 ? feedbacks.length - 1 : index - 1)
    );
  }

  goToFeedback(index: number): void {
    this.currentFeedbackIndex.set(index);
  }

  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchEnd(event: TouchEvent): void {
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleSwipe();
  }

  private handleSwipe(): void {
    const swipeThreshold = 50;
    const difference = this.touchStartX - this.touchEndX;

    if (Math.abs(difference) > swipeThreshold) {
      if (difference > 0) {
        this.nextFeedback();
      } else {
        this.previousFeedback();
      }
    }
  }
}
