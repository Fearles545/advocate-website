import { Pipe, PipeTransform } from '@angular/core';
import { formatPrice, Price } from './data';

@Pipe({ name: 'price' })
export class PricePipe implements PipeTransform {
  transform(price: Price): string {
    return formatPrice(price);
  }
}
