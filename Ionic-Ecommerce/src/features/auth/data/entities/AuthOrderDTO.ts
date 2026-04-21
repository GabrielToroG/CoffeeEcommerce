import type { AuthOrderItemDTO } from './AuthOrderItemDTO';

export type AuthOrderDTO = {
  id: string;
  createdAt: string;
  status: string;
  total: number;
  itemsCount: number;
  paymentMethod: string;
  deliveryAddress: string;
  items: AuthOrderItemDTO[];
};
