import { createContext, createElement, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { CartLineModel } from '../../domain/entities/CartLineModel';
import type { CartProductModel } from '../../domain/entities/CartProductModel';
import { addCartProductUseCase } from '../../domain/useCases/addCartProductUseCase';
import { clearCartUseCase } from '../../domain/useCases/clearCartUseCase';
import { createCartSummaryUseCase } from '../../domain/useCases/createCartSummaryUseCase';
import { removeCartProductUseCase } from '../../domain/useCases/removeCartProductUseCase';

type CartContextValue = {
  cartSummary: ReturnType<typeof createCartSummaryUseCase>;
  addProductToCart: (product: CartProductModel) => void;
  increaseProductQuantity: (productId: string) => void;
  removeProductFromCart: (productId: string) => void;
  getProductQuantity: (productId: string) => number;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

type CartProviderProps = {
  children: ReactNode;
};

export function CartProvider({ children }: CartProviderProps) {
  const [cartLines, setCartLines] = useState<CartLineModel[]>([]);

  const cartSummary = createCartSummaryUseCase(cartLines);

  const addProductToCart = (product: CartProductModel) => {
    setCartLines((currentLines) => addCartProductUseCase(currentLines, product));
  };

  const removeProductFromCart = (productId: string) => {
    setCartLines((currentLines) => removeCartProductUseCase(currentLines, productId));
  };

  const increaseProductQuantity = (productId: string) => {
    const product = cartLines.find((line) => line.product.id === productId)?.product;

    if (!product) {
      return;
    }

    setCartLines((currentLines) => addCartProductUseCase(currentLines, product));
  };

  const getProductQuantity = (productId: string) =>
    cartLines.find((line) => line.product.id === productId)?.quantity ?? 0;

  const clearCart = () => {
    setCartLines(clearCartUseCase());
  };

  const value: CartContextValue = {
    cartSummary,
    addProductToCart,
    increaseProductQuantity,
    removeProductFromCart,
    getProductQuantity,
    clearCart,
  };

  return createElement(CartContext.Provider, { value }, children);
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart debe usarse dentro de CartProvider');
  }

  return context;
}
