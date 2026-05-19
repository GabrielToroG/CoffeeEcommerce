import type { OrderModel } from '../entities/OrderModel';
import type { OrdersRepository } from '../repositories/ordersRepository';
import type { GetLocalOrdersUseCaseProtocol } from './protocols/getLocalOrdersUseCaseProtocol';

export function createGetLocalOrdersUseCase(
  repository: OrdersRepository,
): GetLocalOrdersUseCaseProtocol {
  return function getLocalOrdersUseCase(): OrderModel[] {
    return repository.getOrders();
  };
}
