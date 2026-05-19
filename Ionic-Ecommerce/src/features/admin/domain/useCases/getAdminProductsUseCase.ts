import type { AdminCatalogRepository } from '../repositories/adminCatalogRepository';
import type { GetAdminProductsUseCaseProtocol } from './protocols/getAdminProductsUseCaseProtocol';

export function createGetAdminProductsUseCase(
  repository: AdminCatalogRepository,
): GetAdminProductsUseCaseProtocol {
  return async function getAdminProductsUseCase() {
    return repository.getProducts();
  };
}
