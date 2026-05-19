import { createContext, createElement, useContext, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import type { CartLineModel } from '../../domain/entities/CartLineModel';
import type { CartProductModel } from '../../domain/entities/CartProductModel';
import { postLocalCartProductUseCase } from '../../domain/useCases/postLocalCartProductUseCase';
import { deleteLocalCartUseCase } from '../../domain/useCases/deleteLocalCartUseCase';
import { computeCartSummaryUseCase } from '../../domain/useCases/computeCartSummaryUseCase';
import { deleteLocalCartProductUseCase } from '../../domain/useCases/deleteLocalCartProductUseCase';

type CartContextValue = {
  cartSummary: ReturnType<typeof computeCartSummaryUseCase>;
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

export function createCartProvider() {
  return function CartProvider({ children }: CartProviderProps) {
    const [cartLines, setCartLines] = useState<CartLineModel[]>([]);
    const lastCartActionRef = useRef<{ key: string; timestamp: number } | null>(null);

    const cartSummary = computeCartSummaryUseCase(cartLines);

    const runCartActionOnce = (key: string, action: () => void) => {
      const now = Date.now();
      const lastAction = lastCartActionRef.current;

      if (lastAction?.key === key && now - lastAction.timestamp < 250) {
        return;
      }

      lastCartActionRef.current = { key, timestamp: now };
      action();
    };

    const addProductToCart = (product: CartProductModel) => {
      runCartActionOnce(`quantity:${product.id}`, () => {
        setCartLines((currentLines) => postLocalCartProductUseCase(currentLines, product));
      });
    };

    const removeProductFromCart = (productId: string) => {
      runCartActionOnce(`remove:${productId}`, () => {
        setCartLines((currentLines) => deleteLocalCartProductUseCase(currentLines, productId));
      });
    };

    const increaseProductQuantity = (productId: string) => {
      const product = cartLines.find((line) => line.product.id === productId)?.product;

      if (!product) {
        return;
      }

      runCartActionOnce(`quantity:${productId}`, () => {
        setCartLines((currentLines) => postLocalCartProductUseCase(currentLines, product));
      });
    };

    const getProductQuantity = (productId: string) =>
      cartLines.find((line) => line.product.id === productId)?.quantity ?? 0;

    const clearCart = () => {
      setCartLines(deleteLocalCartUseCase());
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
  };
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart debe usarse dentro de CartProvider');
  }

  return context;
}
