import type { AuthUserModel } from '../../entities/AuthUserModel';
import type { AddAddressParams } from '../../repositories/authRepository';

export type PostLocalAddressUseCaseProtocol = (
  params: AddAddressParams,
) => Promise<AuthUserModel | null>;
