import { IonButton } from '@ionic/react';
import { BaseSelectFieldView } from '../../../../core/presentation/components/molecules/baseSelectField/BaseSelectFieldView';
import { BaseTextFieldView } from '../../../../core/presentation/components/molecules/baseTextField/BaseTextFieldView';
import type { AdminCatalogOptionModel } from '../../domain/entities/AdminCatalogOptionModel';
import type { AdminProductModel } from '../../domain/entities/AdminProductModel';
import { AdminCollectionSelectorView } from './AdminCollectionSelectorView';

type AdminProductEditorProps = {
  productForm: {
    name: string;
    description: string;
    price: string;
    originalPrice: string;
    badge: string;
    imageUrl: string;
    categoryId: string;
    rating: string;
    collectionIds: string[];
  };
  categories: AdminCatalogOptionModel[];
  collections: AdminCatalogOptionModel[];
  editingProduct: AdminProductModel | null;
  isSubmitting: boolean;
  errorMessage: string | null;
  onFieldChange: (field: string, value: string) => void;
  onToggleCollection: (collectionId: string) => void;
  onSubmit: () => void;
  onReset: () => void;
};

export function AdminProductEditorView({
  productForm,
  categories,
  collections,
  editingProduct,
  isSubmitting,
  errorMessage,
  onFieldChange,
  onToggleCollection,
  onSubmit,
  onReset,
}: AdminProductEditorProps) {
  return (
    <section className="admin-panel">
      <span className="admin-panel__eyebrow">
        {editingProduct ? 'Editar producto' : 'Nuevo producto'}
      </span>
      <h2>{editingProduct ? editingProduct.name : 'Crea un producto para el catalogo'}</h2>
      <p>
        Administra precios, imagenes, colecciones y contenido desde un solo lugar.
      </p>

      <div className="admin-form-grid">
        <BaseTextFieldView
          label="Nombre"
          value={productForm.name}
          onChange={(value) => onFieldChange('name', value)}
          placeholder="Nombre del producto"
        />

        <BaseSelectFieldView
          label="Categoria"
          value={productForm.categoryId}
          onChange={(value) => onFieldChange('categoryId', value)}
          options={categories.map((category) => ({
            value: category.id,
            label: category.label,
          }))}
        />

        <BaseTextFieldView
          label="Precio"
          type="number"
          value={productForm.price}
          onChange={(value) => onFieldChange('price', value)}
          placeholder="14990"
        />

        <BaseTextFieldView
          label="Precio original"
          type="number"
          value={productForm.originalPrice}
          onChange={(value) => onFieldChange('originalPrice', value)}
          placeholder="17990"
        />

        <BaseTextFieldView
          label="Badge"
          value={productForm.badge}
          onChange={(value) => onFieldChange('badge', value)}
          placeholder="Top ventas"
        />

        <BaseTextFieldView
          label="Rating (0.1 a 5)"
          type="number"
          value={productForm.rating}
          onChange={(value) => onFieldChange('rating', value)}
          placeholder="4.8"
        />

        <div className="admin-form-grid__full">
          <BaseTextFieldView
            label="Imagen URL"
            value={productForm.imageUrl}
            onChange={(value) => onFieldChange('imageUrl', value)}
            placeholder="https://..."
          />
        </div>

        <div className="admin-form-grid__full">
          <BaseTextFieldView
            label="Descripcion"
            value={productForm.description}
            onChange={(value) => onFieldChange('description', value)}
            placeholder="Describe el producto"
            multiline
            rows={5}
          />
        </div>

        <div className="admin-form-grid__full">
          <AdminCollectionSelectorView
            collections={collections}
            selectedCollectionIds={productForm.collectionIds}
            onToggleCollection={onToggleCollection}
          />
        </div>
      </div>

      {errorMessage ? <p className="admin-feedback admin-feedback--error">{errorMessage}</p> : null}

      <div className="admin-panel__actions">
        <IonButton type="button" className="admin-button admin-button--secondary" onClick={onReset}>
          Limpiar
        </IonButton>
        <IonButton
          type="button"
          className="admin-button admin-button--primary"
          onClick={onSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Guardando...' : editingProduct ? 'Actualizar producto' : 'Crear producto'}
        </IonButton>
      </div>
    </section>
  );
}
