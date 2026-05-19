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

// MARK: Data
export function resolveAdminCatalogData() {
  const dataSource = (() => {
    switch (runtimeConfig.adminCatalogDataSource) {
      case 'remote':
        return remoteAdminCatalogDataSource;
      default:
        return remoteAdminCatalogDataSource;
    }
  })();
  const repository = createRemoteAdminCatalogRepository(dataSource);

  return {
    dataSource,
    repository,
  };
}

// MARK: Domain
export function resolveAdminCatalogDomain(): AdminCatalogUseCasesProtocol {
  const { repository } = resolveAdminCatalogData();

  return {
    getAdminCatalogOptionsUseCase: createGetAdminCatalogOptionsUseCase(repository),
    getAdminProductsUseCase: createGetAdminProductsUseCase(repository),
    postAdminProductUseCase: createPostAdminProductUseCase(repository),
    putAdminProductUseCase: createPutAdminProductUseCase(repository),
    deleteAdminProductUseCase: createDeleteAdminProductUseCase(repository),
  };
}

// MARK: Presentation
export function resolveAdminCatalogPresentation(useCases: AdminCatalogUseCasesProtocol) {
  return {
    useAdminCatalog: createUseAdminCatalog(useCases),
  };
}

// MARK: Module
export function useAdminCatalogModule() {
  return {
    resolveData: resolveAdminCatalogData,
    resolveDomain: resolveAdminCatalogDomain,
    resolvePresentation: () => resolveAdminCatalogPresentation(resolveAdminCatalogDomain()),
  };
}

// MARK: Public Hook
export function useAdminCatalog() {
  const { resolvePresentation } = useAdminCatalogModule();
  const { useAdminCatalog: useAdminCatalogHook } = resolvePresentation();

  return useAdminCatalogHook();
}
