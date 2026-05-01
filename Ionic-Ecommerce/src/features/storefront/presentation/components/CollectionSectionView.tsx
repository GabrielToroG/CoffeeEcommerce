import type { StorefrontCollectionModel } from '../../domain/entities/StorefrontCollectionModel';
import type { StorefrontProductModel } from '../../domain/entities/StorefrontProductModel';
import { matchesIntensityRange } from '../utils/matchesIntensityRange';
import { ProductCardView } from './ProductCardView';

type CollectionSectionProps = {
  collection: StorefrontCollectionModel;
  getProductQuantity: (productId: string) => number;
  onAddToCart: (product: StorefrontProductModel) => void;
  onAddAnother: (productId: string) => void;
  onRemoveFromCart: (productId: string) => void;
  onViewProduct: (productId: string) => void;
  selectedCategoryId: string | null;
  selectedBrewMethod: string | null;
  selectedRoastLevel: string | null;
  selectedIntensityRange: string | null;
};

export function CollectionSectionView({
  collection,
  getProductQuantity,
  onAddToCart,
  onAddAnother,
  onRemoveFromCart,
  onViewProduct,
  selectedCategoryId,
  selectedBrewMethod,
  selectedRoastLevel,
  selectedIntensityRange,
}: CollectionSectionProps) {
  const visibleProducts = collection.products.filter((product) => {
    const matchesCategory =
      selectedCategoryId === null || product.categoryId === selectedCategoryId;
    const matchesBrewMethod =
      selectedBrewMethod === null || product.brewMethods.includes(selectedBrewMethod);
    const matchesRoastLevel =
      selectedRoastLevel === null || product.roastLevel === selectedRoastLevel;
    const matchesIntensity = matchesIntensityRange(product.intensity, selectedIntensityRange);

    return matchesCategory && matchesBrewMethod && matchesRoastLevel && matchesIntensity;
  });

  if (visibleProducts.length === 0) {
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

      <div className="product-grid">
        {visibleProducts.map((product) => (
          <div
            key={product.id}
            className="product-grid__item"
          >
            <ProductCardView
              product={product}
              quantityInCart={getProductQuantity(product.id)}
              onAddToCart={onAddToCart}
              onAddAnother={onAddAnother}
              onRemoveFromCart={onRemoveFromCart}
              onViewProduct={onViewProduct}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
