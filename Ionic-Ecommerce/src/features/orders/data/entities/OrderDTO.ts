import type { OrderItemDTO } from './OrderItemDTO';

export type OrderDTO = {
  id: string;
  createdAt: string;
  status: string;
  total: number;
  itemsCount: number;
  paymentMethod: string;
  deliveryAddress: string;
  items: OrderItemDTO[];
};
