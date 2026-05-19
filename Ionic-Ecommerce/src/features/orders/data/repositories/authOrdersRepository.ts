import type { OrderModel } from '../../domain/entities/OrderModel';
import type { OrdersRepository } from '../../domain/repositories/ordersRepository';
import type { OrdersDataSourceProtocol } from '../dataSources/ordersDataSourceProtocol';
import type { OrderDTO } from '../entities/OrderDTO';

function mapOrder(order: OrderDTO): OrderModel {
  return {
    id: order.id,
    createdAt: order.createdAt,
    status: order.status,
    total: order.total,
    itemsCount: order.itemsCount,
    paymentMethod: order.paymentMethod,
    deliveryAddress: order.deliveryAddress,
    items: order.items.map((item) => ({
      productId: item.productId,
      productName: item.productName,
      unitPrice: item.unitPrice,
      quantity: item.quantity,
      imageUrl: item.imageUrl,
    })),
  };
}

export function createAuthOrdersRepository(
  dataSource: OrdersDataSourceProtocol,
): OrdersRepository {
  return {
    getOrders(): OrderModel[] {
      return dataSource.getOrders().map(mapOrder);
    },
  };
}
