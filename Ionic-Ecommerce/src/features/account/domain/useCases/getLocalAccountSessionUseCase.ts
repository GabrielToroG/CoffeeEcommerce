import type { AccountRepository } from '../repositories/accountRepository';
import type { GetLocalAccountSessionUseCaseProtocol } from './protocols/getLocalAccountSessionUseCaseProtocol';

export function createGetLocalAccountSessionUseCase(
  repository: AccountRepository,
): GetLocalAccountSessionUseCaseProtocol {
  return function getLocalAccountSessionUseCase() {
    return repository.session;
  };
}
