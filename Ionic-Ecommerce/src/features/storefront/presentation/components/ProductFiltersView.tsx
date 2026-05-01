import { useState } from 'react';
import { IonButton, IonIcon, IonModal } from '@ionic/react';
import { chevronDownOutline } from 'ionicons/icons';
import type { StorefrontCategoryModel } from '../../domain/entities/StorefrontCategoryModel';

type ProductFiltersProps = {
  categories: StorefrontCategoryModel[];
  brewMethods: string[];
  roastLevels: string[];
  intensityRanges: string[];
  selectedCategoryId: string | null;
  selectedBrewMethod: string | null;
  selectedRoastLevel: string | null;
  selectedIntensityRange: string | null;
  onSelectCategory: (categoryId: string | null) => void;
  onSelectBrewMethod: (brewMethod: string | null) => void;
  onSelectRoastLevel: (roastLevel: string | null) => void;
  onSelectIntensityRange: (intensityRange: string | null) => void;
};

export function ProductFiltersView({
  categories,
  brewMethods,
  roastLevels,
  intensityRanges,
  selectedCategoryId,
  selectedBrewMethod,
  selectedRoastLevel,
  selectedIntensityRange,
  onSelectCategory,
  onSelectBrewMethod,
  onSelectRoastLevel,
  onSelectIntensityRange,
}: ProductFiltersProps) {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const activeFiltersCount = [
    selectedCategoryId,
    selectedBrewMethod,
    selectedRoastLevel,
    selectedIntensityRange,
  ].filter(Boolean).length;

  const clearFilters = () => {
    onSelectCategory(null);
    onSelectBrewMethod(null);
    onSelectRoastLevel(null);
    onSelectIntensityRange(null);
  };

  const filterGroups = (
    <div
      id="storefront-filter-groups"
      className="storefront-filter-groups"
    >
      <div className="storefront-filter-group" aria-label="Filtrar por categoria">
        <span>Categoria</span>
        <div className="storefront-filter-chips">
          <IonButton
            type="button"
            className={`storefront-filter-chip ${selectedCategoryId === null ? 'storefront-filter-chip--active' : ''}`}
            onClick={() => onSelectCategory(null)}
          >
            Todas
          </IonButton>
          {categories.map((category) => (
            <IonButton
              key={category.id}
              type="button"
              className={`storefront-filter-chip ${selectedCategoryId === category.id ? 'storefront-filter-chip--active' : ''}`}
              onClick={() => onSelectCategory(category.id)}
            >
              {category.label}
            </IonButton>
          ))}
        </div>
      </div>

      <div className="storefront-filter-group" aria-label="Filtrar por preparacion">
        <span>Preparacion</span>
        <div className="storefront-filter-chips">
          <IonButton
            type="button"
            className={`storefront-filter-chip ${selectedBrewMethod === null ? 'storefront-filter-chip--active' : ''}`}
            onClick={() => onSelectBrewMethod(null)}
          >
            Todas
          </IonButton>
          {brewMethods.map((brewMethod) => (
            <IonButton
              key={brewMethod}
              type="button"
              className={`storefront-filter-chip ${selectedBrewMethod === brewMethod ? 'storefront-filter-chip--active' : ''}`}
              onClick={() => onSelectBrewMethod(brewMethod)}
            >
              {brewMethod}
            </IonButton>
          ))}
        </div>
      </div>

      <div className="storefront-filter-group" aria-label="Filtrar por tueste">
        <span>Tueste</span>
        <div className="storefront-filter-chips">
          <IonButton
            type="button"
            className={`storefront-filter-chip ${selectedRoastLevel === null ? 'storefront-filter-chip--active' : ''}`}
            onClick={() => onSelectRoastLevel(null)}
          >
            Todos
          </IonButton>
          {roastLevels.map((roastLevel) => (
            <IonButton
              key={roastLevel}
              type="button"
              className={`storefront-filter-chip ${selectedRoastLevel === roastLevel ? 'storefront-filter-chip--active' : ''}`}
              onClick={() => onSelectRoastLevel(roastLevel)}
            >
              {roastLevel}
            </IonButton>
          ))}
        </div>
      </div>

      <div className="storefront-filter-group" aria-label="Filtrar por intensidad">
        <span>Intensidad</span>
        <div className="storefront-filter-chips">
          <IonButton
            type="button"
            className={`storefront-filter-chip ${selectedIntensityRange === null ? 'storefront-filter-chip--active' : ''}`}
            onClick={() => onSelectIntensityRange(null)}
          >
            Todas
          </IonButton>
          {intensityRanges.map((intensityRange) => (
            <IonButton
              key={intensityRange}
              type="button"
              className={`storefront-filter-chip ${selectedIntensityRange === intensityRange ? 'storefront-filter-chip--active' : ''}`}
              onClick={() => onSelectIntensityRange(intensityRange)}
            >
              {intensityRange}
            </IonButton>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <details className="storefront-filters storefront-filters--desktop">
        <summary className="storefront-filters__header">
          <div>
            <span className="storefront-section__eyebrow">Filtros</span>
            <h2 id="storefront-filters-title">Encuentra tu cafe ideal</h2>
          </div>
          <div className="storefront-filters__status">
            {activeFiltersCount > 0 ? (
              <span>{activeFiltersCount} activos</span>
            ) : null}
            <IonIcon
              icon={chevronDownOutline}
              className="storefront-filters__icon"
              aria-hidden="true"
            />
          </div>
        </summary>
        {filterGroups}
      </details>

      <div className="storefront-filters-trigger">
        <IonButton
          type="button"
          className="storefront-filters-trigger__button"
          onClick={() => setIsMobileFilterOpen(true)}
        >
          Filtros
          {activeFiltersCount > 0 ? <span>{activeFiltersCount}</span> : null}
        </IonButton>
      </div>

      <IonModal
        isOpen={isMobileFilterOpen}
        onDidDismiss={() => setIsMobileFilterOpen(false)}
        breakpoints={[0, 0.86]}
        initialBreakpoint={0.86}
        className="storefront-filters-modal"
      >
        <div className="storefront-filters-modal__content">
          <div className="storefront-filters-modal__header">
            <div>
              <span className="storefront-section__eyebrow">Filtros</span>
              <h2>Encuentra tu cafe ideal</h2>
            </div>
            <IonButton
              type="button"
              fill="clear"
              className="storefront-filters-modal__clear"
              onClick={clearFilters}
              disabled={activeFiltersCount === 0}
            >
              Limpiar
            </IonButton>
          </div>
          {filterGroups}
          <IonButton
            type="button"
            className="storefront-filters-modal__done"
            onClick={() => setIsMobileFilterOpen(false)}
          >
            Ver productos
          </IonButton>
        </div>
      </IonModal>
    </>
  );
}
