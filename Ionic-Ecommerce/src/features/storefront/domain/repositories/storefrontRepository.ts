import type { StorefrontContentModel } from '../entities/StorefrontContentModel';

export interface StorefrontRepository {
  getStorefrontContent(): Promise<StorefrontContentModel>;
}
