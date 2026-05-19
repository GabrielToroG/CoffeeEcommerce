import { runtimeConfig } from '../../../core/config/runtimeConfig';
import { remoteStorefrontDataSource } from '../data/dataSources/remoteStorefrontDataSource';
import { createRemoteStorefrontRepository } from '../data/repositories/remoteStorefrontRepository';
import type { StorefrontUseCasesProtocol } from '../domain/useCases/protocols/storefrontUseCasesProtocol';
import { createGetLocalStorefrontUseCase } from '../domain/useCases/getLocalStorefrontUseCase';
import { createUseStorefront } from '../presentation/hooks/useStorefront';

// MARK: Data
export function resolveStorefrontData() {
  const dataSource = (() => {
    switch (runtimeConfig.storefrontDataSource) {
      case 'remote':
        return remoteStorefrontDataSource;
      default:
        return remoteStorefrontDataSource;
    }
  })();
  const repository = createRemoteStorefrontRepository(dataSource);

  return {
    dataSource,
    repository,
  };
}

// MARK: Domain
export function resolveStorefrontDomain(): StorefrontUseCasesProtocol {
  const { repository } = resolveStorefrontData();

  return {
    getLocalStorefrontUseCase: createGetLocalStorefrontUseCase(repository),
  };
}

// MARK: Presentation
export function resolveStorefrontPresentation(useCases: StorefrontUseCasesProtocol) {
  return {
    useStorefront: createUseStorefront(useCases),
  };
}

// MARK: Module
export function useStorefrontModule() {
  return {
    resolveData: resolveStorefrontData,
    resolveDomain: resolveStorefrontDomain,
    resolvePresentation: () => resolveStorefrontPresentation(resolveStorefrontDomain()),
  };
}

// MARK: Public Hook
export function useStorefront() {
  const { resolvePresentation } = useStorefrontModule();
  const { useStorefront: useStorefrontHook } = resolvePresentation();

  return useStorefrontHook();
}
