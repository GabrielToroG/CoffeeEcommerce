import type { AdminCatalogRepository, UpdateAdminProductParams } from '../repositories/adminCatalogRepository';
import type { PutAdminProductUseCaseProtocol } from './protocols/putAdminProductUseCaseProtocol';

export function createPutAdminProductUseCase(
  repository: AdminCatalogRepository,
): PutAdminProductUseCaseProtocol {
  return async function putAdminProductUseCase(
    productId: string,
    params: UpdateAdminProductParams,
  ) {
    return repository.updateProduct(productId, params);
  };
}
