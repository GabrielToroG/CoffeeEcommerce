/**
 * API contract:
 * - URL params: none
 * - Query params: none
 * - Body: none
 *
 * Notes:
 * - No direct HTTP endpoint in this feature.
 * - Returns the default address label/value from local resolved account state.
 */
export type GetLocalDefaultAccountAddressUseCaseProtocol = () => string;
