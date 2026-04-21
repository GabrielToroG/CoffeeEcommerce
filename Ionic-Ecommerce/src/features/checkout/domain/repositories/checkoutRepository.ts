import type { CheckoutFormModel } from '../entities/CheckoutFormModel';

export type CheckoutRepository = {
  submitOrder: (form: CheckoutFormModel) => Promise<void>;
};
