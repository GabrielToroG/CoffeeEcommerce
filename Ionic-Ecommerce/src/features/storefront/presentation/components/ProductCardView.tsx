import type { StorefrontProductModel } from '../../domain/entities/StorefrontProductModel';
import { formatCurrency } from '../utils/formatCurrency';

type ProductCardProps = {
  product: StorefrontProductModel;
  quantityInCart: number;
  onAddToCart: (product: StorefrontProductModel) => void;
  onAddAnother: (productId: string) => void;
  onRemoveFromCart: (productId: string) => void;
};

export function ProductCardView({
  product,
  quantityInCart,
  onAddToCart,
  onAddAnother,
  onRemoveFromCart,
}: ProductCardProps) {
  const savings =
    product.originalPrice && product.originalPrice > product.price
      ? product.originalPrice - product.price
      : 0;

  return (
    <article className="product-card">
      <div className="product-card__image-wrapper">
        <div className="product-card__image-overlay" />
        {product.badge ? <span className="product-card__badge">{product.badge}</span> : null}
        <span className="product-card__category">{product.categoryId.replace('-', ' ')}</span>
        <img src={product.imageUrl} alt={product.name} className="product-card__image" />
      </div>

      <div className="product-card__content">
        <div className="product-card__meta">
          <span className="product-card__rating">{product.rating.toFixed(1)} / 5</span>
          {quantityInCart > 0 ? (
            <span className="product-card__in-cart">{quantityInCart} en carrito</span>
          ) : null}
        </div>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="product-card__footer">
          <div className="product-card__prices">
            <strong>{formatCurrency(product.price)}</strong>
            {product.originalPrice ? (
              <span>{formatCurrency(product.originalPrice)}</span>
            ) : null}
            {savings > 0 ? (
              <small className="product-card__savings">Ahorras {formatCurrency(savings)}</small>
            ) : null}
          </div>
          {quantityInCart > 0 ? (
            <div className="product-card__stepper" aria-label={`Cantidad de ${product.name}`}>
              <button
                type="button"
                className="product-card__stepper-button"
                onClick={() => onRemoveFromCart(product.id)}
                aria-label={`Quitar una unidad de ${product.name}`}
              >
                -
              </button>
              <span className="product-card__stepper-count">{quantityInCart}</span>
              <button
                type="button"
                className="product-card__stepper-button"
                onClick={() => onAddAnother(product.id)}
                aria-label={`Agregar otra unidad de ${product.name}`}
              >
                +
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="storefront-button storefront-button--ghost"
              onClick={() => onAddToCart(product)}
            >
              Agregar
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
