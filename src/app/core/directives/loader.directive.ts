import {
  Directive,
  effect,
  inject,
  input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { LoaderComponent } from '@core/components/loader/loader.component';

@Directive({
  selector: '[appLoader]',
})
export class LoaderDirective {
  templateRef = inject(TemplateRef);
  vcRef = inject(ViewContainerRef);
  isLoading = input.required<boolean>({ alias: 'appLoader' });

  constructor() {
    effect(() => {
      this.vcRef.clear();
      if (this.isLoading()) {
        this.vcRef.createComponent(LoaderComponent);
      } else {
        this.vcRef.createEmbeddedView(this.templateRef);
      }
    });
  }
}
