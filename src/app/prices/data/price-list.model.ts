export type Price =
  | { readonly kind: 'fixed'; readonly amount: number }
  | { readonly kind: 'range'; readonly min: number; readonly max: number };

export interface PriceListIncludes {
  readonly label: string;
  readonly items: readonly string[];
}

/**
 * One послуга of the price list. Every text field except `title` and
 * `includes.label` is trusted HTML that keeps the advocate's bold.
 */
export interface PriceListService {
  readonly id: string;
  readonly title: string;
  readonly price: Price;
  readonly intro: readonly string[];
  readonly includes?: PriceListIncludes;
  readonly result: string;
  readonly notes?: readonly string[];
  readonly costDependsOn?: string;
}

export interface PriceListGroup {
  readonly id: string;
  readonly title: string;
  readonly services: readonly PriceListService[];
}

export interface PriceListNote {
  readonly id: string;
  readonly title: string;
  readonly paragraphs: readonly string[];
}

export interface PriceList {
  readonly year: number;
  readonly groups: readonly PriceListGroup[];
  readonly otherServices: PriceListNote;
}
