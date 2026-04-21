import type { AuthUserModel } from '../../../auth/domain/entities/AuthUserModel';
import { createAuthOrdersRepository } from '../../data/repositories/authOrdersRepository';
import { getOrdersUseCase } from '../../domain/useCases/getOrdersUseCase';
import type { OrderModel } from '../../domain/entities/OrderModel';

export function useOrders(user: AuthUserModel | null) {
  const repository = createAuthOrdersRepository(user);
  const orders: OrderModel[] = getOrdersUseCase(repository);

  return {
    orders,
  };
}
