import { checkoutApi } from '../api/checkoutApi';
import type { CheckoutRepository } from '../../domain/repositories/checkoutRepository';

export const localCheckoutRepository: CheckoutRepository = {
  async submitOrder(form) {
    await checkoutApi.submitOrder(form);
  },
};
