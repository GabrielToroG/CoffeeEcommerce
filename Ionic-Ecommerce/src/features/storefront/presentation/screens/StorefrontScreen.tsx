import {
  IonContent,
  IonHeader,
  IonPage,
  IonSpinner,
  IonToolbar,
} from '@ionic/react';
import type { CartProductModel } from '../../../cart/domain/entities/CartProductModel';
import { AuthHeaderPanelView } from '../../../auth/presentation/components/AuthHeaderPanelView';
import { CartHeaderSummaryView } from '../../../cart/presentation/components/CartHeaderSummaryView';
import { BrandHomeLinkView } from '../../../../core/presentation/components/molecules/brandHomeLink/BrandHomeLinkView';
import { useCart } from '../../../cart/presentation/hooks/useCart';
import type { StorefrontProductModel } from '../../domain/entities/StorefrontProductModel';
import { useHistory } from 'react-router-dom';
import { useStorefront } from '../hooks/useStorefront';
import { CategoryStripView } from '../components/CategoryStripView';
import { CollectionSectionView } from '../components/CollectionSectionView';
import './StorefrontScreen.css';

export function StorefrontScreen() {
  const history = useHistory();
  const {
    storefrontContent,
    isLoading,
    errorMessage,
    selectedCategoryId,
    selectCategory,
  } = useStorefront();
  const {
    cartSummary,
    addProductToCart,
    increaseProductQuantity,
    removeProductFromCart,
    getProductQuantity,
  } = useCart();

  const handleAddToCart = (product: StorefrontProductModel) => {
    const cartProduct: CartProductModel = {
      id: product.id,
      name: product.name,
      imageUrl: product.imageUrl,
      price: product.price,
    };

    addProductToCart(cartProduct);
  };

  const handleCheckout = () => {
    if (cartSummary.totalItems === 0) {
      return;
    }

    history.push('/checkout');
  };

  const hasMatchingProducts =
    storefrontContent?.collections.some((collection) =>
      selectedCategoryId === null
        ? collection.products.length > 0
        : collection.products.some((product) => product.categoryId === selectedCategoryId),
    ) ?? false;

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar className="storefront-toolbar">
          <BrandHomeLinkView />
          <AuthHeaderPanelView />
        </IonToolbar>
        <IonToolbar className="storefront-toolbar storefront-toolbar--cart">
          <CartHeaderSummaryView
            cartSummary={cartSummary}
            onCheckout={handleCheckout}
          />
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="storefront-shell">
          {isLoading ? (
            <div className="storefront-feedback" role="status">
              <IonSpinner name="crescent" />
              <p>Cargando catalogo...</p>
            </div>
          ) : null}

          {!isLoading && errorMessage ? (
            <div className="storefront-feedback storefront-feedback--error" role="alert">
              <h2>No fue posible mostrar la tienda</h2>
              <p>{errorMessage}</p>
            </div>
          ) : null}

          {!isLoading && storefrontContent ? (
            <>
              <CategoryStripView
                categories={storefrontContent.categories}
                selectedCategoryId={selectedCategoryId}
                onSelectCategory={selectCategory}
              />
              {storefrontContent.collections.map((collection) => (
                <CollectionSectionView
                  key={collection.id}
                  collection={collection}
                  getProductQuantity={getProductQuantity}
                  onAddToCart={handleAddToCart}
                  onAddAnother={increaseProductQuantity}
                  onRemoveFromCart={removeProductFromCart}
                  selectedCategoryId={selectedCategoryId}
                />
              ))}
              {!hasMatchingProducts ? (
                <section className="storefront-feedback storefront-feedback--empty" aria-live="polite">
                  <h2>No encontramos productos para esta categoria</h2>
                  <p>Prueba otra categoria o vuelve a ver todo el catalogo.</p>
                </section>
              ) : null}
            </>
          ) : null}
        </div>
      </IonContent>
    </IonPage>
  );
}
