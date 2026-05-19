import type { AuthSessionModel } from '../../../../auth/domain/entities/AuthSessionModel';

/**
 * API contract:
 * - URL params: none
 * - Query params: none
 * - Body: none
 *
 * Notes:
 * - No direct HTTP endpoint in this feature.
 * - Reads the current account/auth session from local resolved state.
 */
export type GetLocalAccountSessionUseCaseProtocol = () => AuthSessionModel;
