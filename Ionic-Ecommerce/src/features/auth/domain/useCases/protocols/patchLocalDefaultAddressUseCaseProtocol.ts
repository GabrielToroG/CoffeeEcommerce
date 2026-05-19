import type { AuthUserModel } from '../../entities/AuthUserModel';

/**
 * API contract:
 * - Endpoint: `PATCH /auth/addresses/:addressId/default`
 * - URL params:
 *   - `addressId`
 * - Query params: none
 * - Body: none
 */
export type PatchLocalDefaultAddressUseCaseProtocol = (
  addressId: string,
) => Promise<AuthUserModel | null>;
