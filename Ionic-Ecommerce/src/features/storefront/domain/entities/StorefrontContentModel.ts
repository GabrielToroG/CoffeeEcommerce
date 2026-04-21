import type { StorefrontCategoryModel } from './StorefrontCategoryModel';
import type { StorefrontCollectionModel } from './StorefrontCollectionModel';

export type StorefrontContentModel = {
  categories: StorefrontCategoryModel[];
  collections: StorefrontCollectionModel[];
};
