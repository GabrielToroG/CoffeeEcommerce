import type { AuthUserModel } from '../../entities/AuthUserModel';
import type { RegisterUserParams } from '../../repositories/authRepository';

/**
 * API contract:
 * - Endpoint: `POST /auth/register`
 * - URL params: none
 * - Query params: none
 * - Body:
 *   - `params: RegisterUserParams`
 *   - Expected logical fields: full name, email, address and password.
 */
export type PostLocalRegisterUserUseCaseProtocol = (
  params: RegisterUserParams,
) => Promise<AuthUserModel>;
