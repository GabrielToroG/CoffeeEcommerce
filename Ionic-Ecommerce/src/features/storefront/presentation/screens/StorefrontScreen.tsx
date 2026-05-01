import {
  IonContent,
  IonHeader,
  IonPage,
  IonSpinner,
  IonToast,
  IonToolbar,
} from '@ionic/react';
import { useState } from 'react';
import type { CartProductModel } from '../../../cart/domain/entities/CartProductModel';
import { AuthHeaderPanelView } from '../../../auth/presentation/components/AuthHeaderPanelView';
import { CartHeaderSummaryView } from '../../../cart/presentation/components/CartHeaderSummaryView';
import { BrandHomeLinkView } from '../../../../core/presentation/components/molecules/brandHomeLink/BrandHomeLinkView';
import { useCart } from '../../../cart/presentation/hooks/useCart';
import type { StorefrontProductModel } from '../../domain/entities/StorefrontProductModel';
import { useHistory } from 'react-router-dom';
import { useStorefront } from '../hooks/useStorefront';
import { CollectionSectionView } from '../components/CollectionSectionView';
import { ProductFiltersView } from '../components/ProductFiltersView';
import { matchesIntensityRange } from '../utils/matchesIntensityRange';
import './StorefrontScreen.css';

const intensityRanges = ['1-3', '4-6', '7-10'];

export function StorefrontScreen() {
  const history = useHistory();
  const [cartFeedbackMessage, setCartFeedbackMessage] = useState('');
  const {
    storefrontContent,
    isLoading,
    errorMessage,
    selectedCategoryId,
    selectedBrewMethod,
    selectedRoastLevel,
    selectedIntensityRange,
    selectCategory,
    selectBrewMethod,
    selectRoastLevel,
    selectIntensityRange,
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
    setCartFeedbackMessage(`${product.name} agregado al carrito`);
  };

  const handleCheckout = () => {
    if (cartSummary.totalItems === 0) {
      return;
    }

    history.push('/checkout');
  };

  const handleViewProduct = (productId: string) => {
    history.push(`/store/products/${productId}`);
  };

  const allProducts =
    storefrontContent?.collections.flatMap((collection) => collection.products) ?? [];

  const brewMethods = Array.from(
    new Set(allProducts.flatMap((product) => product.brewMethods)),
  );

  const roastLevels = Array.from(
    new Set(allProducts.map((product) => product.roastLevel)),
  );

  const hasMatchingProducts =
    storefrontContent?.collections.some((collection) =>
      collection.products.some((product) => {
        const matchesCategory =
          selectedCategoryId === null || product.categoryId === selectedCategoryId;
        const matchesBrewMethod =
          selectedBrewMethod === null || product.brewMethods.includes(selectedBrewMethod);
        const matchesRoastLevel =
          selectedRoastLevel === null || product.roastLevel === selectedRoastLevel;
        const matchesIntensity = matchesIntensityRange(product.intensity, selectedIntensityRange);

        return matchesCategory && matchesBrewMethod && matchesRoastLevel && matchesIntensity;
      }),
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
            className="cart-header-summary--desktop"
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
              <ProductFiltersView
                categories={storefrontContent.categories}
                brewMethods={brewMethods}
                roastLevels={roastLevels}
                intensityRanges={intensityRanges}
                selectedCategoryId={selectedCategoryId}
                selectedBrewMethod={selectedBrewMethod}
                selectedRoastLevel={selectedRoastLevel}
                selectedIntensityRange={selectedIntensityRange}
                onSelectCategory={selectCategory}
                onSelectBrewMethod={selectBrewMethod}
                onSelectRoastLevel={selectRoastLevel}
                onSelectIntensityRange={selectIntensityRange}
              />
              {storefrontContent.collections.map((collection) => (
                <CollectionSectionView
                  key={collection.id}
                  collection={collection}
                  getProductQuantity={getProductQuantity}
                  onAddToCart={handleAddToCart}
                  onAddAnother={increaseProductQuantity}
                  onRemoveFromCart={removeProductFromCart}
                  onViewProduct={handleViewProduct}
                  selectedCategoryId={selectedCategoryId}
                  selectedBrewMethod={selectedBrewMethod}
                  selectedRoastLevel={selectedRoastLevel}
                  selectedIntensityRange={selectedIntensityRange}
                />
              ))}
              {!hasMatchingProducts ? (
                <section className="storefront-feedback storefront-feedback--empty" aria-live="polite">
                  <h2>No encontramos productos para esta categoria</h2>
                  <p>Prueba otra categoria o vuelve a ver todo el catalogo.</p>
                </section>
              ) : null}
              <CartHeaderSummaryView
                cartSummary={cartSummary}
                onCheckout={handleCheckout}
                className="cart-header-summary--mobile"
              />
            </>
          ) : null}
        </div>
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
