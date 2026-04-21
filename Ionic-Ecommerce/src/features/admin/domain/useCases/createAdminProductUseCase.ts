import type { AdminCatalogRepository, SaveAdminProductParams } from '../repositories/adminCatalogRepository';

export async function createAdminProductUseCase(
  repository: AdminCatalogRepository,
  params: SaveAdminProductParams,
) {
  return repository.createProduct(params);
}
