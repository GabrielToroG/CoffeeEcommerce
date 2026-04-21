import type { AdminCatalogRepository, UpdateAdminProductParams } from '../repositories/adminCatalogRepository';

export async function updateAdminProductUseCase(
  repository: AdminCatalogRepository,
  productId: string,
  params: UpdateAdminProductParams,
) {
  return repository.updateProduct(productId, params);
}
