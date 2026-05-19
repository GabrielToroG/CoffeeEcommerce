import type { CheckoutRepository } from '../../domain/repositories/checkoutRepository';
import type { CheckoutDataSourceProtocol } from '../dataSources/checkoutDataSourceProtocol';

export function createLocalCheckoutRepository(
  dataSource: CheckoutDataSourceProtocol,
): CheckoutRepository {
  return {
    async submitOrder(form) {
      await dataSource.submitOrder(form);
    },
  };
}
