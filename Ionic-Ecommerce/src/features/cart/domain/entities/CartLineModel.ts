import type { CartProductModel } from './CartProductModel';

export type CartLineModel = {
  product: CartProductModel;
  quantity: number;
};
