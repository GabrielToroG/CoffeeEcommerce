import type { CartLineModel } from '../entities/CartLineModel';

export function deleteLocalCartProductUseCase(
  cartLines: CartLineModel[],
  productId: string,
): CartLineModel[] {
  return cartLines.reduce<CartLineModel[]>((nextLines, line) => {
    if (line.product.id !== productId) {
      nextLines.push(line);
      return nextLines;
    }

    if (line.quantity > 1) {
      nextLines.push({ ...line, quantity: line.quantity - 1 });
    }

    return nextLines;
  }, []);
}
