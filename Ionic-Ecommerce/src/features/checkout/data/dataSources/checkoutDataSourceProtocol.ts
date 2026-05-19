import type { CheckoutFormModel } from '../../domain/entities/CheckoutFormModel';

export type CheckoutDataSourceProtocol = {
  submitOrder: (form: CheckoutFormModel) => Promise<void>;
};
