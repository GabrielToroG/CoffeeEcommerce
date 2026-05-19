/**
 * API contract:
 * - URL params: none at this feature boundary
 * - Query params: none
 * - Body: none at this feature boundary
 *
 * Notes:
 * - No direct HTTP endpoint in this feature.
 * - Delegates to auth/account local state services to mark an address as default.
 * - Input:
 *   - `addressId`: logical identifier of the address to mark as default.
 */
export type PatchLocalDefaultAccountAddressUseCaseProtocol = (
  addressId: string,
) => Promise<boolean>;
