import { IonButton } from '@ionic/react';
import type { CartSummaryModel } from '../../domain/entities/CartSummaryModel';
import './CartHeaderSummaryView.css';

type CartHeaderSummaryProps = {
  cartSummary: CartSummaryModel;
  onCheckout: () => void;
  className?: string;
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(value);
}

export function CartHeaderSummaryView({
  cartSummary,
  onCheckout,
  className = '',
}: CartHeaderSummaryProps) {
  return (
    <section
      className={`cart-header-summary ${className}`.trim()}
      aria-label="Resumen de carrito"
    >
      <div className="cart-header-summary__copy">
        <span className="cart-header-summary__eyebrow">Tu carrito</span>
        <div className="cart-header-summary__meta">
          <strong>{cartSummary.totalItems} productos</strong>
          <span>Subtotal {formatCurrency(cartSummary.subtotal)}</span>
        </div>
      </div>

      <IonButton
        type="button"
        className="cart-header-summary__button"
        onClick={onCheckout}
        disabled={cartSummary.totalItems === 0}
      >
        {cartSummary.totalItems === 0 ? 'Agrega productos' : 'Continuar compra'}
      </IonButton>
    </section>
  );
}
