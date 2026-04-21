import type { CartSummaryModel } from '../../domain/entities/CartSummaryModel';

type CartSummaryProps = {
  cartSummary: CartSummaryModel;
  onAddProduct: (productId: string) => void;
  onRemoveProduct: (productId: string) => void;
  onCheckout: () => void;
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(value);
}

export function CartSummaryView({
  cartSummary,
  onAddProduct,
  onRemoveProduct,
  onCheckout,
}: CartSummaryProps) {
  return (
    <aside className="cart-summary" aria-labelledby="cart-summary-title">
      <div className="cart-summary__header">
        <div>
          <span className="cart-summary__eyebrow">Tu carrito</span>
          <h2 id="cart-summary-title">Resumen de compra</h2>
        </div>
        <span className="cart-summary__count">{cartSummary.totalItems} productos</span>
      </div>

      {cartSummary.items.length > 0 ? (
        <>
          <div className="cart-summary__items">
            {cartSummary.items.map((item) => (
              <article key={item.product.id} className="cart-summary__item">
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  className="cart-summary__item-image"
                />
                <div className="cart-summary__item-content">
                  <strong>{item.product.name}</strong>
                  <span>{formatCurrency(item.product.price)} c/u</span>
                  <div className="cart-summary__item-footer">
                    <div className="cart-summary__stepper" aria-label={`Cantidad de ${item.product.name}`}>
                      <button
                        type="button"
                        className="cart-summary__stepper-button"
                        onClick={() => onRemoveProduct(item.product.id)}
                        aria-label={`Quitar una unidad de ${item.product.name}`}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        className="cart-summary__stepper-button"
                        onClick={() => onAddProduct(item.product.id)}
                        aria-label={`Agregar otra unidad de ${item.product.name}`}
                      >
                        +
                      </button>
                    </div>
                    <strong>{formatCurrency(item.product.price * item.quantity)}</strong>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="cart-summary__totals">
            <div>
              <span>Subtotal</span>
              <strong>{formatCurrency(cartSummary.subtotal)}</strong>
            </div>
            <button
              type="button"
              className="storefront-button storefront-button--primary"
              onClick={onCheckout}
              disabled={cartSummary.totalItems === 0}
            >
              Continuar compra
            </button>
          </div>
        </>
      ) : (
        <div className="cart-summary__empty">
          <p>Tu carrito esta vacio por ahora.</p>
          <span>Agrega productos del catalogo para ver el resumen aqui.</span>
        </div>
      )}
    </aside>
  );
}
