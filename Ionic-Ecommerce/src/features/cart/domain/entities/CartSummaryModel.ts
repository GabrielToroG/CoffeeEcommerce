import type { CartLineModel } from './CartLineModel';

export type CartSummaryModel = {
  items: CartLineModel[];
  totalItems: number;
  subtotal: number;
};
