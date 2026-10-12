import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ViewportScroller } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { CtaButtonComponent } from '@shared/components/cta-button';
import { FaqAccordionComponent } from '@shared/components/faq-accordion';
import { buildPriceFaq, formatPriceInText, PRICE_LIST } from './data';
import { PricePipe } from './price.pipe';

@Component({
  selector: 'app-prices',
  imports: [
    RouterLink,
    MatIcon,
    PricePipe,
    FaqAccordionComponent,
    CtaButtonComponent,
  ],
  templateUrl: './prices.component.html',
  styleUrl: './prices.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PricesComponent {
  readonly priceList = PRICE_LIST;
  readonly faqItems = buildPriceFaq(PRICE_LIST, formatPriceInText);

  #host: HTMLElement = inject(ElementRef).nativeElement;
  #route = inject(ActivatedRoute);
  #viewportScroller = inject(ViewportScroller);
  #isFreshPageLoad = !inject(Router).navigated;
  #destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      this.#route.fragment
        .pipe(takeUntilDestroyed(this.#destroyRef))
        .subscribe((id) => this.#openService(id));

      const id = this.#route.snapshot.fragment;
      if (id && this.#isFreshPageLoad) this.#scrollToAnchorOnceWebFontsLoad(id);
    });
  }

  #openService(id: string | null): void {
    if (!id) return;
    const target = this.#host.querySelector(`[id="${CSS.escape(id)}"]`);
    if (target instanceof HTMLDetailsElement) target.open = true;
  }

  #scrollToAnchorOnceWebFontsLoad(id: string): void {
    document.fonts.ready.then(() => this.#viewportScroller.scrollToAnchor(id));
  }
}
