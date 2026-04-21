import type { CartLineModel } from '../entities/CartLineModel';
import type { CartSummaryModel } from '../entities/CartSummaryModel';

export function createCartSummaryUseCase(cartLines: CartLineModel[]): CartSummaryModel {
  return {
    items: cartLines,
    totalItems: cartLines.reduce((total, line) => total + line.quantity, 0),
    subtotal: cartLines.reduce((total, line) => total + line.product.price * line.quantity, 0),
  };
}
