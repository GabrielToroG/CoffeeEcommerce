import { storefrontApi } from '../api/storefrontApi';
import type { StorefrontApiProductDTO } from '../entities/StorefrontApiProductDTO';
import type { StorefrontContentModel } from '../../domain/entities/StorefrontContentModel';
import type { StorefrontProductModel } from '../../domain/entities/StorefrontProductModel';
import type { StorefrontRepository } from '../../domain/repositories/storefrontRepository';

function mapProduct(product: StorefrontApiProductDTO): StorefrontProductModel {
  return {
    ...product,
    price: Math.round(product.price),
    originalPrice: product.originalPrice ? Math.round(product.originalPrice) : undefined,
  };
}

export const mockStorefrontRepository: StorefrontRepository = {
  async getStorefrontContent(): Promise<StorefrontContentModel> {
    const response = await storefrontApi.getStorefrontContent();

    return {
      categories: response.categories,
      collections: response.collections.map((collection) => ({
        ...collection,
        products: collection.products.map(mapProduct),
      })),
    };
  },
};
