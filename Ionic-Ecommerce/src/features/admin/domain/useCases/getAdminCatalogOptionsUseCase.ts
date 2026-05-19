import type { AdminCatalogRepository } from '../repositories/adminCatalogRepository';
import type { GetAdminCatalogOptionsUseCaseProtocol } from './protocols/getAdminCatalogOptionsUseCaseProtocol';

export function createGetAdminCatalogOptionsUseCase(
  repository: AdminCatalogRepository,
): GetAdminCatalogOptionsUseCaseProtocol {
  return async function getAdminCatalogOptionsUseCase() {
    return repository.getCatalogOptions();
  };
}
