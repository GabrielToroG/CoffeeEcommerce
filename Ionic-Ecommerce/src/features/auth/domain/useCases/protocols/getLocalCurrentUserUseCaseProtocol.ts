import type { AuthUserModel } from '../../entities/AuthUserModel';

/**
 * API contract:
 * - Endpoint: `GET /auth/me`
 * - URL params: none
 * - Query params: none
 * - Body: none
 */
export type GetLocalCurrentUserUseCaseProtocol = () => Promise<AuthUserModel | null>;
