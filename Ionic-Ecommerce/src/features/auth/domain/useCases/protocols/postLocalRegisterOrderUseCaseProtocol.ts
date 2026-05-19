import type { AuthUserModel } from '../../entities/AuthUserModel';
import type { RegisterOrderParams } from '../../repositories/authRepository';

export type PostLocalRegisterOrderUseCaseProtocol = (
  params: RegisterOrderParams,
) => Promise<AuthUserModel | null>;
