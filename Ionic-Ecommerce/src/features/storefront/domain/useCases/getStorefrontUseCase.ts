import type { StorefrontContentModel } from '../entities/StorefrontContentModel';
import type { StorefrontRepository } from '../repositories/storefrontRepository';

export async function getStorefrontUseCase(
  repository: StorefrontRepository,
): Promise<StorefrontContentModel> {
  const storefrontContent = await repository.getStorefrontContent();

  return {
    ...storefrontContent,
    collections: storefrontContent.collections.filter(
      (collection) => collection.products.length > 0,
    ),
  };
}
