import type { AdminCatalogRepository, SaveAdminProductParams } from '../repositories/adminCatalogRepository';
import type { PostAdminProductUseCaseProtocol } from './protocols/postAdminProductUseCaseProtocol';

export function createPostAdminProductUseCase(
  repository: AdminCatalogRepository,
): PostAdminProductUseCaseProtocol {
  return async function postAdminProductUseCase(params: SaveAdminProductParams) {
    return repository.createProduct(params);
  };
}
