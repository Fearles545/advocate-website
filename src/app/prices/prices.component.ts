import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { PRICE_LIST } from './data';
import { PricePipe } from './price.pipe';

@Component({
  selector: 'app-prices',
  imports: [RouterLink, MatIcon, PricePipe],
  templateUrl: './prices.component.html',
  styleUrl: './prices.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PricesComponent {
  readonly priceList = PRICE_LIST;
}
