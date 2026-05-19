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
  matchingProductsCount: number;
  onSelectCategory: (categoryId: string | null) => void;
  onSelectBrewMethod: (brewMethod: string | null) => void;
  onSelectRoastLevel: (roastLevel: string | null) => void;
  onSelectIntensityRange: (intensityRange: string | null) => void;
};

type FilterChipProps = {
  isActive: boolean;
  label: string;
  onClick: () => void;
};

function FilterChip({ isActive, label, onClick }: FilterChipProps) {
  return (
    <IonButton
      type="button"
      className={`storefront-filter-chip ${isActive ? 'storefront-filter-chip--active' : ''}`}
      onClick={onClick}
      aria-pressed={isActive}
    >
      {label}
    </IonButton>
  );
}

export function ProductFiltersView({
  categories,
  brewMethods,
  roastLevels,
  intensityRanges,
  selectedCategoryId,
  selectedBrewMethod,
  selectedRoastLevel,
  selectedIntensityRange,
  matchingProductsCount,
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
  const selectedCategoryLabel =
    categories.find((category) => category.id === selectedCategoryId)?.label ?? null;
  const activeFilterChips = [
    selectedCategoryLabel
      ? { label: selectedCategoryLabel, onClear: () => onSelectCategory(null) }
      : null,
    selectedBrewMethod
      ? { label: selectedBrewMethod, onClear: () => onSelectBrewMethod(null) }
      : null,
    selectedRoastLevel
      ? { label: selectedRoastLevel, onClear: () => onSelectRoastLevel(null) }
      : null,
    selectedIntensityRange
      ? { label: `Intensidad ${selectedIntensityRange}`, onClear: () => onSelectIntensityRange(null) }
      : null,
  ].filter((chip): chip is { label: string; onClear: () => void } => Boolean(chip));

  const renderFilterGroups = () => (
    <div
      className="storefront-filter-groups"
    >
      <div className="storefront-filter-group" role="group" aria-label="Filtrar por categoria">
        <span>Categoria</span>
        <div className="storefront-filter-chips">
          <FilterChip
            isActive={selectedCategoryId === null}
            label="Todas"
            onClick={() => onSelectCategory(null)}
          />
          {categories.map((category) => (
            <FilterChip
              key={category.id}
              isActive={selectedCategoryId === category.id}
              label={category.label}
              onClick={() => onSelectCategory(category.id)}
            />
          ))}
        </div>
      </div>

      <div className="storefront-filter-group" role="group" aria-label="Filtrar por preparacion">
        <span>Preparacion</span>
        <div className="storefront-filter-chips">
          <FilterChip
            isActive={selectedBrewMethod === null}
            label="Todas"
            onClick={() => onSelectBrewMethod(null)}
          />
          {brewMethods.map((brewMethod) => (
            <FilterChip
              key={brewMethod}
              isActive={selectedBrewMethod === brewMethod}
              label={brewMethod}
              onClick={() => onSelectBrewMethod(brewMethod)}
            />
          ))}
        </div>
      </div>

      <div className="storefront-filter-group" role="group" aria-label="Filtrar por tueste">
        <span>Tueste</span>
        <div className="storefront-filter-chips">
          <FilterChip
            isActive={selectedRoastLevel === null}
            label="Todos"
            onClick={() => onSelectRoastLevel(null)}
          />
          {roastLevels.map((roastLevel) => (
            <FilterChip
              key={roastLevel}
              isActive={selectedRoastLevel === roastLevel}
              label={roastLevel}
              onClick={() => onSelectRoastLevel(roastLevel)}
            />
          ))}
        </div>
      </div>

      <div className="storefront-filter-group" role="group" aria-label="Filtrar por intensidad">
        <span>Intensidad</span>
        <div className="storefront-filter-chips">
          <FilterChip
            isActive={selectedIntensityRange === null}
            label="Todas"
            onClick={() => onSelectIntensityRange(null)}
          />
          {intensityRanges.map((intensityRange) => (
            <FilterChip
              key={intensityRange}
              isActive={selectedIntensityRange === intensityRange}
              label={intensityRange}
              onClick={() => onSelectIntensityRange(intensityRange)}
            />
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
            <h2 id="storefront-filters-title">Encuentra tu café ideal</h2>
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
        {renderFilterGroups()}
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
        <span className="storefront-filters-trigger__results">
          {matchingProductsCount} productos disponibles
        </span>
      </div>

      {activeFilterChips.length > 0 ? (
        <div className="storefront-active-filters" aria-label="Filtros activos">
          {activeFilterChips.map((chip) => (
            <button
              key={chip.label}
              type="button"
              className="storefront-active-filter"
              onClick={chip.onClear}
              aria-label={`Quitar filtro ${chip.label}`}
            >
              <span>{chip.label}</span>
              <strong aria-hidden="true">x</strong>
            </button>
          ))}
        </div>
      ) : null}

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
              <h2>Encuentra tu café ideal</h2>
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
          {renderFilterGroups()}
          <IonButton
            type="button"
            className="storefront-filters-modal__done"
            onClick={() => setIsMobileFilterOpen(false)}
          >
            Ver {matchingProductsCount} productos
          </IonButton>
        </div>
      </IonModal>
    </>
  );
}
