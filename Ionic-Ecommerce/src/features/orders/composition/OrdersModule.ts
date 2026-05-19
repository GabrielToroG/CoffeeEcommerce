import type { AuthUserModel } from '../../auth/domain/entities/AuthUserModel';
import { createAuthOrdersDataSource } from '../data/dataSources/authOrdersDataSource';
import { createAuthOrdersRepository } from '../data/repositories/authOrdersRepository';
import type { OrdersUseCasesProtocol } from '../domain/useCases/protocols/ordersUseCasesProtocol';
import { createGetLocalOrdersUseCase } from '../domain/useCases/getLocalOrdersUseCase';
import { createUseOrders } from '../presentation/hooks/useOrders';

type OrdersDependencies = {
  user: AuthUserModel | null;
};

// MARK: Data
export function resolveOrdersData({ user }: OrdersDependencies) {
  const dataSource = createAuthOrdersDataSource(user);
  const repository = createAuthOrdersRepository(dataSource);

  return {
    dataSource,
    repository,
  };
}

// MARK: Domain
export function resolveOrdersDomain({ user }: OrdersDependencies): OrdersUseCasesProtocol {
  const { repository } = resolveOrdersData({ user });

  return {
    getLocalOrdersUseCase: createGetLocalOrdersUseCase(repository),
  };
}

// MARK: Presentation
export function resolveOrdersPresentation(useCases: OrdersUseCasesProtocol) {
  return {
    useOrders: createUseOrders(useCases),
  };
}

// MARK: Module
export function useOrdersModule(user: AuthUserModel | null) {
  return {
    resolveData: () => resolveOrdersData({ user }),
    resolveDomain: () => resolveOrdersDomain({ user }),
    resolvePresentation: () => resolveOrdersPresentation(resolveOrdersDomain({ user })),
  };
}

// MARK: Public Hook
export function useOrders(user: AuthUserModel | null) {
  const { resolvePresentation } = useOrdersModule(user);
  const { useOrders: useOrdersHook } = resolvePresentation();

  return useOrdersHook();
}
