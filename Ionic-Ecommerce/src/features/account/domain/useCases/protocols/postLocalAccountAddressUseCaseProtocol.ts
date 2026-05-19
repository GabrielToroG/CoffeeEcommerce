/**
 * API contract:
 * - URL params: none
 * - Query params: none
 * - Body: not sent directly from this feature as HTTP payload
 *
 * Notes:
 * - No direct HTTP endpoint in this feature.
 * - Delegates to resolved auth/account state services to create an address.
 * - Logical payload:
 *   - `label`
 *   - `fullAddress`
 *   - `setAsDefault`
 */
export type PostLocalAccountAddressUseCaseProtocol = (
  label: string,
  fullAddress: string,
  setAsDefault: boolean,
) => Promise<boolean>;
