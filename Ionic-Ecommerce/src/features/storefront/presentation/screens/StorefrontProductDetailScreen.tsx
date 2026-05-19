import {
  IonButton,
  IonContent,
  IonIcon,
  IonPage,
  IonSpinner,
  IonToast,
} from '@ionic/react';
import { addOutline, removeOutline } from 'ionicons/icons';
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { AuthHeaderPanelView } from '../../../auth/presentation/components/AuthHeaderPanelView';
import { useAuth } from '../../../auth/presentation/hooks/useAuth';
import { deriveSelectedDeliveryAddressLabelUseCase } from '../../../auth/domain/useCases/deriveSelectedDeliveryAddressLabelUseCase';
import type { CartProductModel } from '../../../cart/domain/entities/CartProductModel';
import { useCart } from '../../../cart/presentation/hooks/useCart';
import { BaseChipView } from '../../../../core/presentation/components/atoms/baseChip/BaseChipView';
import { DesktopTopHeaderView } from '../../../../core/presentation/components/organisms/desktopTopHeader/DesktopTopHeaderView';
import { MobileTopHeaderView } from '../../../../core/presentation/components/organisms/mobileTopHeader/MobileTopHeaderView';
import { formatCurrency } from '../utils/formatCurrency';
import { useStorefront } from '../../composition/useStorefront';
import './StorefrontProductDetailScreen.css';

type ProductDetailRouteParams = {
  productId: string;
};

export function StorefrontProductDetailScreen() {
  const history = useHistory();
  const [cartFeedbackMessage, setCartFeedbackMessage] = useState('');
  const { session } = useAuth();
  const { productId } = useParams<ProductDetailRouteParams>();
  const { storefrontContent, isLoading, errorMessage } = useStorefront();
  const {
    cartSummary,
    addProductToCart,
    increaseProductQuantity,
    removeProductFromCart,
    getProductQuantity,
  } = useCart();

  const product = storefrontContent?.collections
    .flatMap((collection) => collection.products)
    .find((currentProduct) => currentProduct.id === productId);

  const quantityInCart = product ? getProductQuantity(product.id) : 0;

  const addToCart = () => {
    if (!product) {
      return;
    }

    const cartProduct: CartProductModel = {
      id: product.id,
      name: product.name,
      imageUrl: product.imageUrl,
      price: product.price,
    };

    addProductToCart(cartProduct);
    setCartFeedbackMessage(`${product.name} agregado al carrito`);
  };

  return (
    <IonPage>
      <DesktopTopHeaderView
        deliveryAddressLabel={deriveSelectedDeliveryAddressLabelUseCase(session.user)}
        cartItemsCount={cartSummary.totalItems}
        onCartClick={() => history.push('/checkout')}
        accountActions={<AuthHeaderPanelView />}
      />
      <MobileTopHeaderView
        cartItemsCount={cartSummary.totalItems}
        onCartClick={() => history.push('/checkout')}
      />

      <IonContent fullscreen>
        <main className="product-detail-shell">
          {isLoading ? (
            <section className="product-detail-feedback" role="status">
              <IonSpinner name="crescent" />
              <p>Cargando producto...</p>
            </section>
          ) : null}

          {!isLoading && errorMessage ? (
            <section className="product-detail-feedback product-detail-feedback--error" role="alert">
              <h1>No fue posible cargar el producto</h1>
              <p>{errorMessage}</p>
            </section>
          ) : null}

          {!isLoading && !errorMessage && !product ? (
            <section className="product-detail-feedback product-detail-feedback--error" role="alert">
              <h1>Producto no encontrado</h1>
              <p>Vuelve a la tienda para revisar el catálogo disponible.</p>
            </section>
          ) : null}

          {product ? (
            <article className="product-detail">
              <div className="product-detail__media">
                {product.badge ? <span>{product.badge}</span> : null}
                <img src={product.imageUrl} alt={product.name} />
              </div>

              <div className="product-detail__content">
                <span className="product-detail__eyebrow">{product.origin}</span>
                <h1>{product.name}</h1>
                <p>{product.description}</p>

                <div className="product-detail__chips" aria-label={`Atributos de ${product.name}`}>
                  <BaseChipView label={product.roastLevel} />
                  <BaseChipView label={product.grindType} />
                  <BaseChipView label={`Intensidad ${product.intensity}/10`} />
                  {product.freeShippingEligible ? <BaseChipView label="Envio gratis" /> : null}
                </div>

                <dl className="product-detail__facts">
                  <div>
                    <dt>Rating</dt>
                    <dd>{product.rating.toFixed(1)} / 5</dd>
                  </div>
                  <div>
                    <dt>Stock</dt>
                    <dd>{product.stockLabel}</dd>
                  </div>
                  <div>
                    <dt>Preparacion</dt>
                    <dd>{product.brewMethods.join(', ')}</dd>
                  </div>
                  <div>
                    <dt>Notas</dt>
                    <dd>{product.tastingNotes.join(', ')}</dd>
                  </div>
                </dl>

                <div className="product-detail__buy-box">
                  <div className="product-detail__price">
                    <strong>{formatCurrency(product.price)}</strong>
                    {product.originalPrice ? <span>{formatCurrency(product.originalPrice)}</span> : null}
                  </div>

                  {quantityInCart > 0 ? (
                    <div className="product-detail__stepper" aria-label={`Cantidad de ${product.name}`}>
                      <IonButton
                        type="button"
                        className="product-detail__stepper-button"
                        onClick={(event) => {
                          event.stopPropagation();
                          removeProductFromCart(product.id);
                        }}
                        aria-label={`Quitar una unidad de ${product.name}`}
                      >
                        <IonIcon icon={removeOutline} aria-hidden="true" />
                      </IonButton>
                      <span className="product-detail__stepper-count">{quantityInCart}</span>
                      <IonButton
                        type="button"
                        className="product-detail__stepper-button"
                        onClick={(event) => {
                          event.stopPropagation();
                          increaseProductQuantity(product.id);
                        }}
                        aria-label={`Agregar otra unidad de ${product.name}`}
                      >
                        <IonIcon icon={addOutline} aria-hidden="true" />
                      </IonButton>
                    </div>
                  ) : (
                    <IonButton
                      type="button"
                      className="product-detail__add-button"
                      onClick={(event) => {
                        event.stopPropagation();
                        addToCart();
                      }}
                    >
                      Agregar al carrito
                    </IonButton>
                  )}
                </div>
              </div>
            </article>
          ) : null}
        </main>
        <IonToast
          isOpen={cartFeedbackMessage.length > 0}
          message={cartFeedbackMessage}
          duration={1600}
          position="bottom"
          onDidDismiss={() => setCartFeedbackMessage('')}
        />
      </IonContent>
    </IonPage>
  );
}
