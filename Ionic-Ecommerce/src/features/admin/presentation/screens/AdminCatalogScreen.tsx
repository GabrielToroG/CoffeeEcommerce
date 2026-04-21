import { IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { BrandHomeLinkView } from '../../../../core/presentation/components/molecules/brandHomeLink/BrandHomeLinkView';
import { AuthHeaderPanelView } from '../../../auth/presentation/components/AuthHeaderPanelView';
import { useAuth } from '../../../auth/presentation/hooks/useAuth';
import { AdminProductEditorView } from '../components/AdminProductEditorView';
import { AdminProductListView } from '../components/AdminProductListView';
import { useAdminCatalog } from '../hooks/useAdminCatalog';
import './AdminCatalogScreen.css';

export function AdminCatalogScreen() {
  const history = useHistory();
  const { session } = useAuth();
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
      <IonHeader translucent>
        <IonToolbar>
          <BrandHomeLinkView />
          <AuthHeaderPanelView />
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="admin-shell">
          {!canManageCatalog ? (
            <section className="admin-empty">
              <span className="admin-eyebrow">Administracion</span>
              <h1>Necesitas una cuenta administradora</h1>
              <p>Inicia sesion con un usuario admin para gestionar productos, precios y colecciones.</p>
              <button
                type="button"
                className="admin-button admin-button--primary"
                onClick={() => history.push('/store')}
              >
                Volver a la tienda
              </button>
            </section>
          ) : null}

          {canManageCatalog ? (
            <>
              <section className="admin-hero">
                <span className="admin-eyebrow">Backoffice</span>
                <h1>Catalogo administrable</h1>
                <p>
                  Crea, edita y elimina productos del storefront sin tocar directamente la base.
                </p>
              </section>

              {successMessage ? (
                <p className="admin-feedback admin-feedback--success">{successMessage}</p>
              ) : null}

              {isLoading ? (
                <div className="admin-loading" role="status">
                  <span>Cargando catalogo administrativo...</span>
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
