import { Price } from './price-list.model';

const NBSP = ' ';
const EN_DASH = '–';
const WORD_JOINER = '⁠';

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

/**
 * A price inside plain running text, where no element can carry
 * `white-space: nowrap`: an invisible word joiner after the en dash stops
 * the line from breaking there.
 */
export function formatPriceInText(price: Price): string {
  return formatPrice(price).replace(EN_DASH, `${EN_DASH}${WORD_JOINER}`);
}
