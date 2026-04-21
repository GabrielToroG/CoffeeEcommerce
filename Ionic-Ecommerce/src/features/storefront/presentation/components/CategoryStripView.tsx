import type { StorefrontCategoryModel } from '../../domain/entities/StorefrontCategoryModel';

type CategoryStripProps = {
  categories: StorefrontCategoryModel[];
  selectedCategoryId: string | null;
  onSelectCategory: (categoryId: string | null) => void;
};

export function CategoryStripView({
  categories,
  selectedCategoryId,
  onSelectCategory,
}: CategoryStripProps) {
  return (
    <section className="storefront-section">
      <div className="storefront-section__header">
        <div>
          <span className="storefront-section__eyebrow">Categorias</span>
          <h2>Compra segun tu momento</h2>
        </div>
      </div>

      <div className="storefront-category-strip">
        <button
          type="button"
          className={`storefront-category-chip ${selectedCategoryId === null ? 'storefront-category-chip--active' : ''}`}
          onClick={() => onSelectCategory(null)}
        >
          Todas
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            className={`storefront-category-chip ${selectedCategoryId === category.id ? 'storefront-category-chip--active' : ''}`}
            onClick={() => onSelectCategory(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>
    </section>
  );
}
