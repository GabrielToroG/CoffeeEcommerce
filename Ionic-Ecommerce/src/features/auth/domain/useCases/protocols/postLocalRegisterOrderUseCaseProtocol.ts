import type { AuthUserModel } from '../../entities/AuthUserModel';
import type { RegisterOrderParams } from '../../repositories/authRepository';

/**
 * API contract:
 * - Endpoint: `POST /auth/orders`
 * - URL params: none
 * - Query params: none
 * - Body:
 *   - `params: RegisterOrderParams`
 *   - Expected logical fields: totals, payment method, delivery address and items.
 */
export type PostLocalRegisterOrderUseCaseProtocol = (
  params: RegisterOrderParams,
) => Promise<AuthUserModel | null>;
