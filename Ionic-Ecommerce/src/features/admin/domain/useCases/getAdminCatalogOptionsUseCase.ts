import type { AdminCatalogRepository } from '../repositories/adminCatalogRepository';

export async function getAdminCatalogOptionsUseCase(repository: AdminCatalogRepository) {
  return repository.getCatalogOptions();
}
