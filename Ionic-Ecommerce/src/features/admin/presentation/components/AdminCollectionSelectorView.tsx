import { IonButton } from '@ionic/react';
import type { AdminCatalogOptionModel } from '../../domain/entities/AdminCatalogOptionModel';

type AdminCollectionSelectorProps = {
  collections: AdminCatalogOptionModel[];
  selectedCollectionIds: string[];
  onToggleCollection: (collectionId: string) => void;
};

export function AdminCollectionSelectorView({
  collections,
  selectedCollectionIds,
  onToggleCollection,
}: AdminCollectionSelectorProps) {
  return (
    <div className="admin-collection-selector">
      <span className="admin-field-label">Colecciones</span>
      <div className="admin-collection-selector__grid">
        {collections.map((collection) => {
          const isSelected = selectedCollectionIds.includes(collection.id);

          return (
            <IonButton
              key={collection.id}
              type="button"
              className={`admin-collection-selector__option ${
                isSelected ? 'admin-collection-selector__option--selected' : ''
              }`}
              onClick={() => onToggleCollection(collection.id)}
            >
              {collection.label}
            </IonButton>
          );
        })}
      </div>
    </div>
  );
}
