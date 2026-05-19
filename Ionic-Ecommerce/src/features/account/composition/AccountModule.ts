import { useAuth } from '../../auth/presentation/hooks/useAuth';
import { createUseAccountAddresses } from '../presentation/hooks/useAccountAddresses';
import { createUseAccountSession } from '../presentation/hooks/useAccountSession';
import { createAuthAccountDataSource } from '../data/dataSources/authAccountDataSource';
import { createAuthAccountRepository } from '../data/repositories/authAccountRepository';
import type { AccountUseCasesProtocol } from '../domain/useCases/protocols/accountUseCasesProtocol';
import { createPostLocalAccountAddressUseCase } from '../domain/useCases/postLocalAccountAddressUseCase';
import { createGetLocalAccountSessionUseCase } from '../domain/useCases/getLocalAccountSessionUseCase';
import { createGetLocalAccountSubmissionStateUseCase } from '../domain/useCases/getLocalAccountSubmissionStateUseCase';
import { createGetLocalDefaultAccountAddressUseCase } from '../domain/useCases/getLocalDefaultAccountAddressUseCase';
import { createDeleteLocalAccountSessionUseCase } from '../domain/useCases/deleteLocalAccountSessionUseCase';
import { createPatchLocalDefaultAccountAddressUseCase } from '../domain/useCases/patchLocalDefaultAccountAddressUseCase';

type AccountAuthDependencies = ReturnType<typeof useAuth>;

// MARK: Data
export function resolveAccountData(auth: AccountAuthDependencies) {
  const dataSource = createAuthAccountDataSource({
    session: auth.session,
    isSubmitting: auth.isSubmitting,
    errorMessage: auth.errorMessage,
    addAddress: auth.addAddress,
    setDefaultAddress: auth.setDefaultAddress,
    logout: auth.logout,
  });
  const repository = createAuthAccountRepository(dataSource);

  return {
    dataSource,
    repository,
  };
}

// MARK: Domain
export function resolveAccountDomain(
  auth: AccountAuthDependencies,
): AccountUseCasesProtocol {
  const { repository } = resolveAccountData(auth);

  return {
    getLocalAccountSessionUseCase: createGetLocalAccountSessionUseCase(repository),
    getLocalAccountSubmissionStateUseCase: createGetLocalAccountSubmissionStateUseCase(repository),
    postLocalAccountAddressUseCase: createPostLocalAccountAddressUseCase(repository),
    patchLocalDefaultAccountAddressUseCase: createPatchLocalDefaultAccountAddressUseCase(repository),
    getLocalDefaultAccountAddressUseCase: createGetLocalDefaultAccountAddressUseCase(repository),
    deleteLocalAccountSessionUseCase: createDeleteLocalAccountSessionUseCase(repository),
  };
}

// MARK: Presentation
export function resolveAccountPresentation(useCases: AccountUseCasesProtocol) {
  return {
    useAccountSession: createUseAccountSession(useCases),
    useAccountAddresses: createUseAccountAddresses(useCases),
  };
}

// MARK: Module
export function useAccountModule() {
  const auth = useAuth();

  return {
    resolveData: () => resolveAccountData(auth),
    resolveDomain: () => resolveAccountDomain(auth),
    resolvePresentation: () => resolveAccountPresentation(resolveAccountDomain(auth)),
  };
}
