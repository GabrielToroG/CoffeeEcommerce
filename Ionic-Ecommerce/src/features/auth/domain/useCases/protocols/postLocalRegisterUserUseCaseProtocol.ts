import type { AuthUserModel } from '../../entities/AuthUserModel';
import type { RegisterUserParams } from '../../repositories/authRepository';

export type PostLocalRegisterUserUseCaseProtocol = (
  params: RegisterUserParams,
) => Promise<AuthUserModel>;
