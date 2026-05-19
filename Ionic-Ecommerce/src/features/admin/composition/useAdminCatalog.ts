import { runtimeConfig } from '../../../core/config/runtimeConfig';
import { remoteAdminCatalogDataSource } from '../data/dataSources/remoteAdminCatalogDataSource';
import { createRemoteAdminCatalogRepository } from '../data/repositories/remoteAdminCatalogRepository';
import type { AdminCatalogUseCasesProtocol } from '../domain/useCases/protocols/adminCatalogUseCasesProtocol';
import { createPostAdminProductUseCase } from '../domain/useCases/postAdminProductUseCase';
import { createDeleteAdminProductUseCase } from '../domain/useCases/deleteAdminProductUseCase';
import { createGetAdminCatalogOptionsUseCase } from '../domain/useCases/getAdminCatalogOptionsUseCase';
import { createGetAdminProductsUseCase } from '../domain/useCases/getAdminProductsUseCase';
import { createPutAdminProductUseCase } from '../domain/useCases/putAdminProductUseCase';
import { createUseAdminCatalog } from '../presentation/hooks/useAdminCatalog';

function createAdminCatalogDataSource() {
  switch (runtimeConfig.adminCatalogDataSource) {
    case 'remote':
      return remoteAdminCatalogDataSource;
    default:
      return remoteAdminCatalogDataSource;
  }
}

function createAdminCatalogUseCases(): AdminCatalogUseCasesProtocol {
  const dataSource = createAdminCatalogDataSource();
  const repository = createRemoteAdminCatalogRepository(dataSource);

  return {
    getAdminCatalogOptionsUseCase: createGetAdminCatalogOptionsUseCase(repository),
    getAdminProductsUseCase: createGetAdminProductsUseCase(repository),
    postAdminProductUseCase: createPostAdminProductUseCase(repository),
    putAdminProductUseCase: createPutAdminProductUseCase(repository),
    deleteAdminProductUseCase: createDeleteAdminProductUseCase(repository),
  };
}

export const useAdminCatalog = createUseAdminCatalog(createAdminCatalogUseCases());
