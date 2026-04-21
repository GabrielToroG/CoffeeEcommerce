import type { OrderModel } from '../entities/OrderModel';
import type { OrdersRepository } from '../repositories/ordersRepository';

export function getOrdersUseCase(repository: OrdersRepository): OrderModel[] {
  return repository.getOrders();
}
