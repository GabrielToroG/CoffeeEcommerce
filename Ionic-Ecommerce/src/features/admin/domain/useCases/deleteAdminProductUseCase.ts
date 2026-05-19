import type { AdminCatalogRepository } from '../repositories/adminCatalogRepository';
import type { DeleteAdminProductUseCaseProtocol } from './protocols/deleteAdminProductUseCaseProtocol';

export function createDeleteAdminProductUseCase(
  repository: AdminCatalogRepository,
): DeleteAdminProductUseCaseProtocol {
  return async function deleteAdminProductUseCase(productId: string) {
    await repository.deleteProduct(productId);
  };
}
