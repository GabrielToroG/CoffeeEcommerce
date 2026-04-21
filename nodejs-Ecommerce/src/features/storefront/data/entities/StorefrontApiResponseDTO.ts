import type { StorefrontApiCategoryDTO } from "./StorefrontApiCategoryDTO";
import type { StorefrontApiCollectionDTO } from "./StorefrontApiCollectionDTO";

export type StorefrontApiResponseDTO = {
  categories: StorefrontApiCategoryDTO[];
  collections: StorefrontApiCollectionDTO[];
};
