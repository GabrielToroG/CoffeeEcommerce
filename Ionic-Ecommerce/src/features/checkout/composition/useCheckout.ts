import { runtimeConfig } from '../../../core/config/runtimeConfig';
import { localCheckoutDataSource } from '../data/dataSources/localCheckoutDataSource';
import { createLocalCheckoutRepository } from '../data/repositories/localCheckoutRepository';
import type { CheckoutUseCasesProtocol } from '../domain/useCases/protocols/checkoutUseCasesProtocol';
import { createPostLocalCheckoutUseCase } from '../domain/useCases/postLocalCheckoutUseCase';
import { createUseCheckout } from '../presentation/hooks/useCheckout';

function createCheckoutDataSource() {
  switch (runtimeConfig.checkoutDataSource) {
    case 'local':
      return localCheckoutDataSource;
    default:
      return localCheckoutDataSource;
  }
}

function createCheckoutUseCases(): CheckoutUseCasesProtocol {
  const dataSource = createCheckoutDataSource();
  const repository = createLocalCheckoutRepository(dataSource);

  return {
    postLocalCheckoutUseCase: createPostLocalCheckoutUseCase(repository),
  };
}

export const useCheckout = createUseCheckout(createCheckoutUseCases());
