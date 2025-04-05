import { Directive, HostListener, input, output } from '@angular/core';

@Directive({
  selector: '[appHoverColor]',
})
export class HoverColorDirective {
  hoverColor = input<string | null>(null);
  isHovered = output<boolean>();

  @HostListener('mouseenter') onMouseEnter() {
    // Logic for mouse enter (hover start)
    this.isHovered.emit(true);
    console.log('Hovered:', this.isHovered);
    if (this.hoverColor()) {
      // Change the color of the element
      // Example: this.elementRef.nativeElement.style.color = this.hoverColor;
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    // Logic for mouse leave (hover end)
    console.log('Hovered:', this.isHovered);
    this.isHovered.emit(false);
    if (this.hoverColor()) {
      // Reset the color of the element
      // Example: this.elementRef.nativeElement.style.color = '';
    }
  }
}
