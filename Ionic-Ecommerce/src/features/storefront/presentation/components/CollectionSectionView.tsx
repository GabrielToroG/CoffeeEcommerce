import type { StorefrontCollectionModel } from '../../domain/entities/StorefrontCollectionModel';
import type { StorefrontProductModel } from '../../domain/entities/StorefrontProductModel';
import { ProductCardView } from './ProductCardView';

type CollectionSectionProps = {
  collection: StorefrontCollectionModel;
  getProductQuantity: (productId: string) => number;
  onAddToCart: (product: StorefrontProductModel) => void;
  onAddAnother: (productId: string) => void;
  onRemoveFromCart: (productId: string) => void;
  selectedCategoryId: string | null;
};

export function CollectionSectionView({
  collection,
  getProductQuantity,
  onAddToCart,
  onAddAnother,
  onRemoveFromCart,
  selectedCategoryId,
}: CollectionSectionProps) {
  const hasVisibleProducts =
    selectedCategoryId === null ||
    collection.products.some((product) => product.categoryId === selectedCategoryId);

  if (!hasVisibleProducts) {
    return null;
  }

  return (
    <section className="storefront-section">
      <div className="storefront-section__header">
        <div>
          <span className="storefront-section__eyebrow">Coleccion</span>
          <h2>{collection.title}</h2>
          <p>{collection.subtitle}</p>
        </div>
      </div>

      <div className={`product-grid ${selectedCategoryId !== null ? 'product-grid--filtered' : ''}`}>
        {collection.products.map((product) => (
          <div
            key={product.id}
            className={`product-grid__item ${
              selectedCategoryId !== null && product.categoryId !== selectedCategoryId
                ? 'product-grid__item--hidden'
                : ''
            }`}
            aria-hidden={selectedCategoryId !== null && product.categoryId !== selectedCategoryId}
          >
            <ProductCardView
              product={product}
              quantityInCart={getProductQuantity(product.id)}
              onAddToCart={onAddToCart}
              onAddAnother={onAddAnother}
              onRemoveFromCart={onRemoveFromCart}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
