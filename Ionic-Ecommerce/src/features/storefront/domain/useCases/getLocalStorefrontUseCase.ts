import type { StorefrontContentModel } from '../entities/StorefrontContentModel';
import type { StorefrontRepository } from '../repositories/storefrontRepository';
import type { GetLocalStorefrontUseCaseProtocol } from './protocols/getLocalStorefrontUseCaseProtocol';

export function createGetLocalStorefrontUseCase(
  repository: StorefrontRepository,
): GetLocalStorefrontUseCaseProtocol {
  return async function getLocalStorefrontUseCase(): Promise<StorefrontContentModel> {
    const storefrontContent = await repository.getStorefrontContent();

    return {
      ...storefrontContent,
      collections: storefrontContent.collections.filter(
        (collection) => collection.products.length > 0,
      ),
    };
  };
}
