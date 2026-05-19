import type { CheckoutFormModel } from '../../entities/CheckoutFormModel';

/**
 * API contract:
 * - Endpoint: `POST /checkout`
 * - URL params: none
 * - Query params: none
 * - Body:
 *   - `form: CheckoutFormModel`
 *   - Expected logical fields: customer data, address and payment method.
 */
export type PostLocalCheckoutUseCaseProtocol = (form: CheckoutFormModel) => Promise<void>;
