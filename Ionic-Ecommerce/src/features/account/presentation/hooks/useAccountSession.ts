import type { AccountUseCasesProtocol } from '../../domain/useCases/protocols/accountUseCasesProtocol';

export function createUseAccountSession(useCases: AccountUseCasesProtocol) {
  return function useAccountSession() {
    const session = useCases.getLocalAccountSessionUseCase();
    const { isSubmitting, errorMessage } = useCases.getLocalAccountSubmissionStateUseCase();

    return {
      session,
      isSubmitting,
      errorMessage,
      logout: useCases.deleteLocalAccountSessionUseCase,
      defaultAddress: useCases.getLocalDefaultAccountAddressUseCase(),
    };
  };
}
