import {
  Component,
  ChangeDetectionStrategy,
  input,
  signal,
  viewChild,
  ElementRef,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Feedback } from '../../models';

@Component({
  selector: 'app-feedback-section',
  imports: [MatIcon, RouterLink],
  templateUrl: './feedback-section.component.html',
  styleUrl: './feedback-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackSectionComponent {
  feedbacks = input.required<Feedback[]>();

  currentFeedbackIndex = signal(0);

  private feedbackTrack = viewChild<ElementRef<HTMLElement>>('feedbackTrack');
  private isDragging = false;
  private startX = 0;
  private scrollLeft = 0;

  goToFeedback(index: number): void {
    const track = this.feedbackTrack()?.nativeElement;
    if (!track) return;

    const cardWidth = track.scrollWidth / this.feedbacks().length;
    track.scrollTo({
      left: cardWidth * index,
      behavior: 'smooth',
    });
  }

  goToNext(): void {
    const nextIndex = (this.currentFeedbackIndex() + 1) % this.feedbacks().length;
    this.goToFeedback(nextIndex);
  }

  goToPrevious(): void {
    const currentIndex = this.currentFeedbackIndex();
    const prevIndex = currentIndex === 0 ? this.feedbacks().length - 1 : currentIndex - 1;
    this.goToFeedback(prevIndex);
  }

  onScroll(): void {
    if (this.isDragging) return;

    const track = this.feedbackTrack()?.nativeElement;
    if (!track) return;

    const scrollPos = track.scrollLeft;
    const cardWidth = track.scrollWidth / this.feedbacks().length;
    const index = Math.round(scrollPos / cardWidth);

    if (index !== this.currentFeedbackIndex() && index >= 0 && index < this.feedbacks().length) {
      this.currentFeedbackIndex.set(index);
    }
  }

  onMouseDown(event: MouseEvent): void {
    const track = this.feedbackTrack()?.nativeElement;
    if (!track) return;

    this.isDragging = true;
    this.startX = event.pageX - track.offsetLeft;
    this.scrollLeft = track.scrollLeft;
    track.classList.add('dragging');
  }

  onMouseMove(event: MouseEvent): void {
    if (!this.isDragging) return;

    const track = this.feedbackTrack()?.nativeElement;
    if (!track) return;

    event.preventDefault();
    const x = event.pageX - track.offsetLeft;
    const walk = (x - this.startX) * 1.5;
    track.scrollLeft = this.scrollLeft - walk;
  }

  onMouseUp(): void {
    if (!this.isDragging) return;

    const track = this.feedbackTrack()?.nativeElement;
    if (track) {
      track.classList.remove('dragging');
      this.snapToNearest();
    }

    this.isDragging = false;
  }

  onMouseLeave(): void {
    if (this.isDragging) {
      this.onMouseUp();
    }
  }

  private snapToNearest(): void {
    const track = this.feedbackTrack()?.nativeElement;
    if (!track) return;

    const cardWidth = track.scrollWidth / this.feedbacks().length;
    const index = Math.round(track.scrollLeft / cardWidth);
    const clampedIndex = Math.max(0, Math.min(index, this.feedbacks().length - 1));

    this.currentFeedbackIndex.set(clampedIndex);

    setTimeout(() => {
      track.scrollTo({
        left: cardWidth * clampedIndex,
        behavior: 'smooth',
      });
    }, 10);
  }
}
