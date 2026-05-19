import { runtimeConfig } from '../../../core/config/runtimeConfig';
import { mockStorefrontDataSource } from '../data/dataSources/mockStorefrontDataSource';
import { createMockStorefrontRepository } from '../data/repositories/mockStorefrontRepository';
import type { StorefrontUseCasesProtocol } from '../domain/useCases/protocols/storefrontUseCasesProtocol';
import { createGetLocalStorefrontUseCase } from '../domain/useCases/getLocalStorefrontUseCase';
import { createUseStorefront } from '../presentation/hooks/useStorefront';

function createStorefrontDataSource() {
  switch (runtimeConfig.storefrontDataSource) {
    case 'mock':
      return mockStorefrontDataSource;
    default:
      return mockStorefrontDataSource;
  }
}

function createStorefrontUseCases(): StorefrontUseCasesProtocol {
  const dataSource = createStorefrontDataSource();
  const repository = createMockStorefrontRepository(dataSource);

  return {
    getLocalStorefrontUseCase: createGetLocalStorefrontUseCase(repository),
  };
}

export const useStorefront = createUseStorefront(createStorefrontUseCases());
