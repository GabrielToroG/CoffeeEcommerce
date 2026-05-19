import type { AuthUserModel } from '../../auth/domain/entities/AuthUserModel';
import { createAuthOrdersDataSource } from '../data/dataSources/authOrdersDataSource';
import { createAuthOrdersRepository } from '../data/repositories/authOrdersRepository';
import type { OrdersUseCasesProtocol } from '../domain/useCases/protocols/ordersUseCasesProtocol';
import { createGetLocalOrdersUseCase } from '../domain/useCases/getLocalOrdersUseCase';
import { createUseOrders } from '../presentation/hooks/useOrders';

function createOrdersUseCases(user: AuthUserModel | null): OrdersUseCasesProtocol {
  const dataSource = createAuthOrdersDataSource(user);
  const repository = createAuthOrdersRepository(dataSource);

  return {
    getLocalOrdersUseCase: createGetLocalOrdersUseCase(repository),
  };
}

export function useOrders(user: AuthUserModel | null) {
  const useOrdersHook = createUseOrders(createOrdersUseCases(user));
  return useOrdersHook();
}
