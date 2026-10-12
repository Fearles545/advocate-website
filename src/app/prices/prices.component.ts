import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
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
}
