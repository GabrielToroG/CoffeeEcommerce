import type { PostAdminProductUseCaseProtocol } from './postAdminProductUseCaseProtocol';
import type { DeleteAdminProductUseCaseProtocol } from './deleteAdminProductUseCaseProtocol';
import type { GetAdminCatalogOptionsUseCaseProtocol } from './getAdminCatalogOptionsUseCaseProtocol';
import type { GetAdminProductsUseCaseProtocol } from './getAdminProductsUseCaseProtocol';
import type { PutAdminProductUseCaseProtocol } from './putAdminProductUseCaseProtocol';

export type AdminCatalogUseCasesProtocol = {
  getAdminCatalogOptionsUseCase: GetAdminCatalogOptionsUseCaseProtocol;
  getAdminProductsUseCase: GetAdminProductsUseCaseProtocol;
  postAdminProductUseCase: PostAdminProductUseCaseProtocol;
  putAdminProductUseCase: PutAdminProductUseCaseProtocol;
  deleteAdminProductUseCase: DeleteAdminProductUseCaseProtocol;
};
