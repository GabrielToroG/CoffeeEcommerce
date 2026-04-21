import type { AdminCatalogRepository } from '../repositories/adminCatalogRepository';

export async function deleteAdminProductUseCase(
  repository: AdminCatalogRepository,
  productId: string,
) {
  await repository.deleteProduct(productId);
}
