import type { AccountRepository } from '../repositories/accountRepository';
import type { GetLocalAccountSubmissionStateUseCaseProtocol } from './protocols/getLocalAccountSubmissionStateUseCaseProtocol';

export function createGetLocalAccountSubmissionStateUseCase(
  repository: AccountRepository,
): GetLocalAccountSubmissionStateUseCaseProtocol {
  return function getLocalAccountSubmissionStateUseCase() {
    return {
      isSubmitting: repository.isSubmitting,
      errorMessage: repository.errorMessage,
    };
  };
}
