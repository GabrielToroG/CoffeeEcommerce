import { runtimeConfig } from '../../../core/config/runtimeConfig';
import { remoteStorefrontDataSource } from '../data/dataSources/remoteStorefrontDataSource';
import { createRemoteStorefrontRepository } from '../data/repositories/remoteStorefrontRepository';
import type { StorefrontUseCasesProtocol } from '../domain/useCases/protocols/storefrontUseCasesProtocol';
import { createGetLocalStorefrontUseCase } from '../domain/useCases/getLocalStorefrontUseCase';
import { createUseStorefront } from '../presentation/hooks/useStorefront';

function createStorefrontDataSource() {
  switch (runtimeConfig.storefrontDataSource) {
    case 'remote':
      return remoteStorefrontDataSource;
    default:
      return remoteStorefrontDataSource;
  }
}

function createStorefrontUseCases(): StorefrontUseCasesProtocol {
  const dataSource = createStorefrontDataSource();
  const repository = createRemoteStorefrontRepository(dataSource);

  return {
    getLocalStorefrontUseCase: createGetLocalStorefrontUseCase(repository),
  };
}

export const useStorefront = createUseStorefront(createStorefrontUseCases());
