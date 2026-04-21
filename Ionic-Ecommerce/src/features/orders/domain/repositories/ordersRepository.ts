import type { OrderModel } from '../entities/OrderModel';

export type OrdersRepository = {
  getOrders: () => OrderModel[];
};
