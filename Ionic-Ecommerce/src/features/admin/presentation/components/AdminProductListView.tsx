import { IonAlert, IonButton } from '@ionic/react';
import { useState } from 'react';
import { formatCurrency } from '../../../storefront/presentation/utils/formatCurrency';
import type { AdminCatalogOptionModel } from '../../domain/entities/AdminCatalogOptionModel';
import type { AdminProductModel } from '../../domain/entities/AdminProductModel';

type AdminProductListProps = {
  products: AdminProductModel[];
  categories: AdminCatalogOptionModel[];
  collections: AdminCatalogOptionModel[];
  selectedProductId: string | null;
  isSubmitting: boolean;
  onEditProduct: (productId: string) => void;
  onDeleteProduct: (productId: string) => void;
};

export function AdminProductListView({
  products,
  categories,
  collections,
  selectedProductId,
  isSubmitting,
  onEditProduct,
  onDeleteProduct,
}: AdminProductListProps) {
  const [pendingDeleteProduct, setPendingDeleteProduct] = useState<AdminProductModel | null>(null);
  const categoriesById = new Map(categories.map((category) => [category.id, category.label]));
  const collectionsById = new Map(collections.map((collection) => [collection.id, collection.label]));

  return (
    <section className="admin-panel">
      <span className="admin-panel__eyebrow">Catalogo</span>
      <h2>Productos cargados</h2>
      <p>Selecciona uno para editarlo o eliminalo si ya no debe aparecer en tienda.</p>

      <div className="admin-product-list">
        {products.map((product) => (
          <article
            key={product.id}
            className={`admin-product-card ${
              selectedProductId === product.id ? 'admin-product-card--selected' : ''
            }`}
          >
            <img src={product.imageUrl} alt={product.name} className="admin-product-card__image" />
            <div className="admin-product-card__content">
              <div className="admin-product-card__header">
                <div>
                  <span className="admin-product-card__category">
                    {categoriesById.get(product.categoryId) ?? product.categoryId}
                  </span>
                  <h3>{product.name}</h3>
                </div>
                <strong>{formatCurrency(product.price)}</strong>
              </div>

              <p>{product.description}</p>

              <div className="admin-product-card__meta">
                <span>Rating {product.rating.toFixed(1)}</span>
                {product.badge ? <span>{product.badge}</span> : null}
                {product.originalPrice ? <span>Antes {formatCurrency(product.originalPrice)}</span> : null}
              </div>

              <div className="admin-product-card__collections">
                {product.collectionIds.map((collectionId) => (
                  <span key={collectionId}>
                    {collectionsById.get(collectionId) ?? collectionId}
                  </span>
                ))}
              </div>

              <div className="admin-product-card__actions">
                <IonButton
                  type="button"
                  className="admin-button admin-button--secondary"
                  onClick={() => onEditProduct(product.id)}
                >
                  Editar
                </IonButton>
                <IonButton
                  type="button"
                  className="admin-button admin-button--danger"
                  onClick={() => setPendingDeleteProduct(product)}
                  disabled={isSubmitting}
                >
                  Eliminar
                </IonButton>
              </div>
            </div>
          </article>
        ))}
      </div>

      <IonAlert
        isOpen={pendingDeleteProduct !== null}
        onDidDismiss={() => setPendingDeleteProduct(null)}
        header="Confirmar eliminación"
        message={
          pendingDeleteProduct
            ? `Eliminar "${pendingDeleteProduct.name}" del catálogo hará que deje de aparecer en tienda.`
            : ''
        }
        buttons={[
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => setPendingDeleteProduct(null),
          },
          {
            text: 'Eliminar',
            role: 'destructive',
            handler: () => {
              if (!pendingDeleteProduct) {
                return;
              }

              onDeleteProduct(pendingDeleteProduct.id);
              setPendingDeleteProduct(null);
            },
          },
        ]}
      />
    </section>
  );
}
