import type { CheckoutFormModel } from '../../entities/CheckoutFormModel';

export type PostLocalCheckoutUseCaseProtocol = (form: CheckoutFormModel) => Promise<void>;
