export type OrderItemModel = {
  productId: string;
  productName: string;
  unitPrice: number;
  quantity: number;
  imageUrl: string;
};

export type OrderModel = {
  id: string;
  createdAt: string;
  status: string;
  total: number;
  itemsCount: number;
  paymentMethod: string;
  deliveryAddress: string;
  items: OrderItemModel[];
};
