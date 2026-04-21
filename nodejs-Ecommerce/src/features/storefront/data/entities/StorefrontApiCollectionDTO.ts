import type { StorefrontApiProductDTO } from "./StorefrontApiProductDTO";

export type StorefrontApiCollectionDTO = {
  id: string;
  title: string;
  subtitle: string;
  products: StorefrontApiProductDTO[];
};
