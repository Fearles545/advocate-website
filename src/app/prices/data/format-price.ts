import { Price } from './price-list.model';

const NBSP = '\u00a0';
const EN_DASH = '\u2013';

export function formatAmount(amount: number): string {
  return String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, NBSP);
}

export function formatPrice(price: Price): string {
  const amount =
    price.kind === 'fixed'
      ? formatAmount(price.amount)
      : `${formatAmount(price.min)}${EN_DASH}${formatAmount(price.max)}`;
  return `${amount}${NBSP}грн`;
}
