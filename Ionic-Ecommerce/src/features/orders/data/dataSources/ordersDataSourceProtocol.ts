import type { OrderDTO } from '../entities/OrderDTO';

export type OrdersDataSourceProtocol = {
  getOrders: () => OrderDTO[];
};
