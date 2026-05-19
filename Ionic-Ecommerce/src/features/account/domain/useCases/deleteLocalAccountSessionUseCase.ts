import type { AccountRepository } from '../repositories/accountRepository';
import type { DeleteLocalAccountSessionUseCaseProtocol } from './protocols/deleteLocalAccountSessionUseCaseProtocol';

export function createDeleteLocalAccountSessionUseCase(
  repository: AccountRepository,
): DeleteLocalAccountSessionUseCaseProtocol {
  return async function deleteLocalAccountSessionUseCase() {
    await repository.logout();
  };
}
