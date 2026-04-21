import type { AdminCatalogRepository } from "../repositories/adminCatalogRepository";

export async function getAdminProductsUseCase(repository: AdminCatalogRepository) {
  return repository.getProducts();
}
