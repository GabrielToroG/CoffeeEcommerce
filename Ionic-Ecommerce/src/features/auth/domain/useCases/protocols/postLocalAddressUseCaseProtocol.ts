import type { AuthUserModel } from '../../entities/AuthUserModel';
import type { AddAddressParams } from '../../repositories/authRepository';

/**
 * API contract:
 * - Endpoint: `POST /auth/addresses`
 * - URL params: none
 * - Query params: none
 * - Body:
 *   - `params: AddAddressParams`
 *   - Expected logical fields: address label, full address and default flag.
 */
export type PostLocalAddressUseCaseProtocol = (
  params: AddAddressParams,
) => Promise<AuthUserModel | null>;
