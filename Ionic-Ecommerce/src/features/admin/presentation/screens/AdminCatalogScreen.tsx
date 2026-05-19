import { IonButton, IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { DesktopTopHeaderView } from '../../../../core/presentation/components/organisms/desktopTopHeader/DesktopTopHeaderView';
import { MobileTopHeaderView } from '../../../../core/presentation/components/organisms/mobileTopHeader/MobileTopHeaderView';
import { AuthHeaderPanelView } from '../../../auth/presentation/components/AuthHeaderPanelView';
import { useAuth } from '../../../auth/presentation/hooks/useAuth';
import { deriveSelectedDeliveryAddressLabelUseCase } from '../../../auth/domain/useCases/deriveSelectedDeliveryAddressLabelUseCase';
import { useCart } from '../../../cart/presentation/hooks/useCart';
import { AdminProductEditorView } from '../components/AdminProductEditorView';
import { AdminProductListView } from '../components/AdminProductListView';
import { useAdminCatalog } from '../../composition/useAdminCatalog';
import './AdminCatalogScreen.css';

export function AdminCatalogScreen() {
  const history = useHistory();
  const { session } = useAuth();
  const { cartSummary } = useCart();
  const {
    categories,
    collections,
    products,
    productForm,
    selectedProductId,
    editingProduct,
    isLoading,
    isSubmitting,
    errorMessage,
    successMessage,
    updateField,
    toggleCollection,
    editProduct,
    submitProduct,
    removeProduct,
    resetForm,
  } = useAdminCatalog();

  const canManageCatalog = session.isAuthenticated && session.user?.role === 'admin';

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
        <div className="admin-shell">
          {!canManageCatalog ? (
            <section className="admin-empty">
              <span className="admin-eyebrow">Administracion</span>
              <h1>Necesitas una cuenta administradora</h1>
              <p>Inicia sesión con un usuario admin para gestionar productos, precios y colecciones.</p>
              <IonButton
                type="button"
                className="admin-button admin-button--primary"
                onClick={() => history.push('/store')}
              >
                Volver a la tienda
              </IonButton>
            </section>
          ) : null}

          {canManageCatalog ? (
            <>
              <section className="admin-hero">
                <span className="admin-eyebrow">Backoffice</span>
                <h1>Catálogo administrable</h1>
                <p>
                  Crea, edita y elimina productos del storefront sin tocar directamente la base.
                </p>
              </section>

              {successMessage ? (
                <p className="admin-feedback admin-feedback--success" role="status">
                  {successMessage}
                </p>
              ) : null}

              {isLoading ? (
                <div className="admin-loading" role="status">
                  <span>Cargando catálogo administrativo...</span>
                </div>
              ) : (
                <div className="admin-layout">
                  <AdminProductEditorView
                    productForm={productForm}
                    categories={categories}
                    collections={collections}
                    editingProduct={editingProduct}
                    isSubmitting={isSubmitting}
                    errorMessage={errorMessage}
                    onFieldChange={updateField}
                    onToggleCollection={toggleCollection}
                    onSubmit={() => void submitProduct()}
                    onReset={resetForm}
                  />

                  <AdminProductListView
                    products={products}
                    categories={categories}
                    collections={collections}
                    selectedProductId={selectedProductId}
                    isSubmitting={isSubmitting}
                    onEditProduct={editProduct}
                    onDeleteProduct={(productId) => void removeProduct(productId)}
                  />
                </div>
              )}
            </>
          ) : null}
        </div>
      </IonContent>
    </IonPage>
  );
}
