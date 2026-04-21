import type { AuthOrderItemModel } from './AuthOrderItemModel';

export type AuthOrderModel = {
  id: string;
  createdAt: string;
  status: string;
  total: number;
  itemsCount: number;
  paymentMethod: string;
  deliveryAddress: string;
  items: AuthOrderItemModel[];
};
