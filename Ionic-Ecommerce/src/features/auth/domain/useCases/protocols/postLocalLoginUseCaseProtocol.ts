import type { AuthUserModel } from '../../entities/AuthUserModel';
import type { LoginParams } from '../../repositories/authRepository';

/**
 * API contract:
 * - Endpoint: `POST /auth/login`
 * - URL params: none
 * - Query params: none
 * - Body:
 *   - `params: LoginParams`
 *   - Expected logical fields: `email`, `password`
 */
export type PostLocalLoginUseCaseProtocol = (params: LoginParams) => Promise<AuthUserModel>;
