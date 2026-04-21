import type { CartLineModel } from '../entities/CartLineModel';
import type { CartProductModel } from '../entities/CartProductModel';

export function addCartProductUseCase(
  cartLines: CartLineModel[],
  product: CartProductModel,
): CartLineModel[] {
  const existingLine = cartLines.find((line) => line.product.id === product.id);

  if (!existingLine) {
    return [...cartLines, { product, quantity: 1 }];
  }

  return cartLines.map((line) =>
    line.product.id === product.id ? { ...line, quantity: line.quantity + 1 } : line,
  );
}
