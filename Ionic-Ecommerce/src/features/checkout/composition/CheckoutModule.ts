import { runtimeConfig } from '../../../core/config/runtimeConfig';
import { localCheckoutDataSource } from '../data/dataSources/localCheckoutDataSource';
import { createLocalCheckoutRepository } from '../data/repositories/localCheckoutRepository';
import type { CheckoutUseCasesProtocol } from '../domain/useCases/protocols/checkoutUseCasesProtocol';
import { createPostLocalCheckoutUseCase } from '../domain/useCases/postLocalCheckoutUseCase';
import { createUseCheckout } from '../presentation/hooks/useCheckout';

// MARK: Data
export function resolveCheckoutData() {
  const dataSource = (() => {
    switch (runtimeConfig.checkoutDataSource) {
      case 'local':
        return localCheckoutDataSource;
      default:
        return localCheckoutDataSource;
    }
  })();
  const repository = createLocalCheckoutRepository(dataSource);

  return {
    dataSource,
    repository,
  };
}

// MARK: Domain
export function resolveCheckoutDomain(): CheckoutUseCasesProtocol {
  const { repository } = resolveCheckoutData();

  return {
    postLocalCheckoutUseCase: createPostLocalCheckoutUseCase(repository),
  };
}

// MARK: Presentation
export function resolveCheckoutPresentation(useCases: CheckoutUseCasesProtocol) {
  return {
    useCheckout: createUseCheckout(useCases),
  };
}

// MARK: Module
export function useCheckoutModule() {
  return {
    resolveData: resolveCheckoutData,
    resolveDomain: resolveCheckoutDomain,
    resolvePresentation: () => resolveCheckoutPresentation(resolveCheckoutDomain()),
  };
}

import type { AuthUserModel } from '../../auth/domain/entities/AuthUserModel';

// MARK: Public Hook
export function useCheckout(onSuccess: () => void, user: AuthUserModel | null) {
  const { resolvePresentation } = useCheckoutModule();
  const { useCheckout: useCheckoutHook } = resolvePresentation();

  return useCheckoutHook(onSuccess, user);
}
