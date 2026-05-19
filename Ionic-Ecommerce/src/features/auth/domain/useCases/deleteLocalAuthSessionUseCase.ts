import type { AuthRepository } from '../repositories/authRepository';
import type { DeleteLocalAuthSessionUseCaseProtocol } from './protocols/deleteLocalAuthSessionUseCaseProtocol';

export function createDeleteLocalAuthSessionUseCase(repository: AuthRepository): DeleteLocalAuthSessionUseCaseProtocol {
  return async function deleteLocalAuthSessionUseCase(): Promise<void> {
    await repository.logout();
  };
}
