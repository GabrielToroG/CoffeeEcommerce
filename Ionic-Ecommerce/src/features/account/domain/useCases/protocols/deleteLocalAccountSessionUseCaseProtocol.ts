/**
 * API contract:
 * - URL params: none
 * - Query params: none
 * - Body: none
 *
 * Notes:
 * - No direct HTTP endpoint in this feature.
 * - Resolves against local/account session state already hydrated in presentation.
 */
export type DeleteLocalAccountSessionUseCaseProtocol = () => Promise<void>;
