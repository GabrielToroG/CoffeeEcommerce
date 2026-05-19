import type { AuthUserModel } from '../../../auth/domain/entities/AuthUserModel';
import type { OrdersDataSourceProtocol } from './ordersDataSourceProtocol';
import type { OrderDTO } from '../entities/OrderDTO';

export function createAuthOrdersDataSource(user: AuthUserModel | null): OrdersDataSourceProtocol {
  return {
    getOrders(): OrderDTO[] {
      if (!user) {
        return [];
      }

      return user.orders.map((order) => ({
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
      }));
    },
  };
}
