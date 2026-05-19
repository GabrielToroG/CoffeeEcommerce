import type { OrderModel } from '../../domain/entities/OrderModel';
import type { OrdersUseCasesProtocol } from '../../domain/useCases/protocols/ordersUseCasesProtocol';

export function createUseOrders(useCases: OrdersUseCasesProtocol) {
  return function useOrders() {
    const orders: OrderModel[] = useCases.getLocalOrdersUseCase();

    return {
      orders,
    };
  };
}
