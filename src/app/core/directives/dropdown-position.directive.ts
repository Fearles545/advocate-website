import {
  afterNextRender,
  DestroyRef,
  Directive,
  effect,
  ElementRef,
  inject,
  Injector,
  input,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, fromEvent } from 'rxjs';

/**
 * Directive for viewport-aware dropdown positioning.
 * Automatically flips dropdown direction when it would overflow viewport edges.
 *
 * Usage:
 * ```html
 * <div class="container" appDropdownPosition [dpIsOpen]="isOpen()" dpPanelClass="dropdown-panel">
 *   <button (click)="toggle()">Open</button>
 *   <div class="dropdown-panel" [class.open-up]="..." [class.open-left]="...">
 *     Content
 *   </div>
 * </div>
 * ```
 */
@Directive({
  selector: '[appDropdownPosition]',
  exportAs: 'dropdownPosition',
})
export class DropdownPositionDirective {
  private elementRef = inject(ElementRef);
  private injector = inject(Injector);
  private destroyRef = inject(DestroyRef);

  /** Whether the dropdown is currently open */
  dpIsOpen = input<boolean>(false);

  /** CSS selector for the dropdown panel element */
  dpPanelClass = input<string>('dropdown-panel');

  /** Buffer space from viewport edge in pixels */
  dpEdgeBuffer = input<number>(8);

  /** Exposed position signals for template binding */
  openUp = signal(false);
  openLeft = signal(false);

  constructor() {
    // React to isOpen changes
    effect(() => {
      if (this.dpIsOpen()) {
        this.resetPosition();
        afterNextRender(() => this.calculatePosition(), {
          injector: this.injector,
        });
      }
    });

    // Recalculate on resize
    fromEvent(window, 'resize')
      .pipe(debounceTime(100), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        if (this.dpIsOpen()) {
          this.calculatePosition();
        }
      });
  }

  private resetPosition(): void {
    this.openUp.set(false);
    this.openLeft.set(false);
  }

  private calculatePosition(): void {
    const container = this.elementRef.nativeElement as HTMLElement;
    const panel = container.querySelector(
      `.${this.dpPanelClass()}`
    ) as HTMLElement;
    if (!panel) return;

    const triggerRect = container.getBoundingClientRect();
    const panelRect = panel.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const buffer = this.dpEdgeBuffer();

    // Vertical: check if dropdown overflows bottom
    const spaceBelow = viewportHeight - triggerRect.bottom - buffer;
    const spaceAbove = triggerRect.top - buffer;
    const shouldOpenUp =
      panelRect.height > spaceBelow && spaceAbove > spaceBelow;

    // Horizontal: check if dropdown overflows right edge
    const wouldOverflowRight =
      triggerRect.left + panelRect.width > viewportWidth - buffer;

    this.openUp.set(shouldOpenUp);
    this.openLeft.set(wouldOverflowRight);
  }
}
