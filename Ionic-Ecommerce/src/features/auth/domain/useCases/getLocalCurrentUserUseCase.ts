import type { AuthUserModel } from '../entities/AuthUserModel';
import type { AuthRepository } from '../repositories/authRepository';
import type { GetLocalCurrentUserUseCaseProtocol } from './protocols/getLocalCurrentUserUseCaseProtocol';

export function createGetLocalCurrentUserUseCase(
  repository: AuthRepository,
): GetLocalCurrentUserUseCaseProtocol {
  return async function getLocalCurrentUserUseCase(): Promise<AuthUserModel | null> {
    return repository.getCurrentUser();
  };
}
