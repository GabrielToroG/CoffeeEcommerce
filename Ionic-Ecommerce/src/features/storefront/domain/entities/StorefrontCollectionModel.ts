import type { StorefrontProductModel } from './StorefrontProductModel';

export type StorefrontCollectionModel = {
  id: string;
  title: string;
  subtitle: string;
  products: StorefrontProductModel[];
};
