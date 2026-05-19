import { IonButton, IonIcon } from '@ionic/react';
import { addOutline, removeOutline } from 'ionicons/icons';
import { BaseChipView } from '../../../../core/presentation/components/atoms/baseChip/BaseChipView';
import type { StorefrontProductModel } from '../../domain/entities/StorefrontProductModel';
import { formatCurrency } from '../utils/formatCurrency';

type ProductCardProps = {
  product: StorefrontProductModel;
  quantityInCart: number;
  onAddToCart: (product: StorefrontProductModel) => void;
  onAddAnother: (productId: string) => void;
  onRemoveFromCart: (productId: string) => void;
  onViewProduct: (productId: string) => void;
};

export function ProductCardView({
  product,
  quantityInCart,
  onAddToCart,
  onAddAnother,
  onRemoveFromCart,
  onViewProduct,
}: ProductCardProps) {
  const savings =
    product.originalPrice && product.originalPrice > product.price
      ? product.originalPrice - product.price
      : 0;

  return (
    <article className="product-card">
      <button
        type="button"
        className="product-card__image-wrapper product-card__image-button"
        onClick={() => onViewProduct(product.id)}
        aria-label={`Ver detalle de ${product.name}`}
      >
        <div className="product-card__image-overlay" />
        {product.badge ? <span className="product-card__badge">{product.badge}</span> : null}
        <span className="product-card__category">{product.categoryId.replace('-', ' ')}</span>
        <img src={product.imageUrl} alt={product.name} className="product-card__image" />
      </button>

      <div className="product-card__content">
        <div className="product-card__meta">
          <span className="product-card__rating">{product.rating.toFixed(1)} / 5</span>
          <span className="product-card__origin">{product.origin}</span>
          {quantityInCart > 0 ? (
            <span className="product-card__in-cart">{quantityInCart} en carrito</span>
          ) : null}
        </div>
        <h3>
          <button
            type="button"
            className="product-card__title-button"
            onClick={() => onViewProduct(product.id)}
          >
            {product.name}
          </button>
        </h3>
        <p>{product.description}</p>
        <div className="product-card__attributes" aria-label={`Atributos de ${product.name}`}>
          <BaseChipView label={product.roastLevel} />
          <BaseChipView label={product.grindType} />
          <BaseChipView label={`Intensidad ${product.intensity}/10`} />
        </div>
        <div className="product-card__notes">
          {product.tastingNotes.slice(0, 3).map((note) => (
            <span key={note}>{note}</span>
          ))}
        </div>
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
              <IonButton
                type="button"
                className="product-card__stepper-button"
                onClick={(event) => {
                  event.stopPropagation();
                  onRemoveFromCart(product.id);
                }}
                aria-label={`Quitar una unidad de ${product.name}`}
              >
                <IonIcon icon={removeOutline} aria-hidden="true" />
              </IonButton>
              <span className="product-card__stepper-count">{quantityInCart}</span>
              <IonButton
                type="button"
                className="product-card__stepper-button"
                onClick={(event) => {
                  event.stopPropagation();
                  onAddAnother(product.id);
                }}
                aria-label={`Agregar otra unidad de ${product.name}`}
              >
                <IonIcon icon={addOutline} aria-hidden="true" />
              </IonButton>
            </div>
          ) : (
            <IonButton
              type="button"
              className="storefront-button storefront-button--ghost"
              onClick={(event) => {
                event.stopPropagation();
                onAddToCart(product);
              }}
            >
              Agregar
            </IonButton>
          )}
        </div>
      </div>
    </article>
  );
}
