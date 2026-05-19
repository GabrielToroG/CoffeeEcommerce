import { runtimeConfig } from '../../../core/config/runtimeConfig';
import { localAuthDataSource } from '../data/dataSources/localAuthDataSource';
import { createLocalAuthRepository } from '../data/repositories/localAuthRepository';
import type { AuthUseCasesProtocol } from '../domain/useCases/protocols/authUseCasesProtocol';
import { createPostLocalAddressUseCase } from '../domain/useCases/postLocalAddressUseCase';
import { createGetLocalCurrentUserUseCase } from '../domain/useCases/getLocalCurrentUserUseCase';
import { createPostLocalLoginUseCase } from '../domain/useCases/postLocalLoginUseCase';
import { createDeleteLocalAuthSessionUseCase } from '../domain/useCases/deleteLocalAuthSessionUseCase';
import { createPostLocalRegisterOrderUseCase } from '../domain/useCases/postLocalRegisterOrderUseCase';
import { createPostLocalRegisterUserUseCase } from '../domain/useCases/postLocalRegisterUserUseCase';
import { createPatchLocalDefaultAddressUseCase } from '../domain/useCases/patchLocalDefaultAddressUseCase';
import { createAuthProvider } from '../presentation/hooks/useAuth';

// MARK: Data
export function resolveAuthData() {
  const dataSource = (() => {
    switch (runtimeConfig.authDataSource) {
      case 'local':
        return localAuthDataSource;
      default:
        return localAuthDataSource;
    }
  })();
  const repository = createLocalAuthRepository(dataSource);

  return {
    dataSource,
    repository,
  };
}

// MARK: Domain
export function resolveAuthDomain(): AuthUseCasesProtocol {
  const { repository } = resolveAuthData();

  return {
    getLocalCurrentUserUseCase: createGetLocalCurrentUserUseCase(repository),
    postLocalLoginUseCase: createPostLocalLoginUseCase(repository),
    postLocalRegisterUserUseCase: createPostLocalRegisterUserUseCase(repository),
    postLocalAddressUseCase: createPostLocalAddressUseCase(repository),
    patchLocalDefaultAddressUseCase: createPatchLocalDefaultAddressUseCase(repository),
    postLocalRegisterOrderUseCase: createPostLocalRegisterOrderUseCase(repository),
    deleteLocalAuthSessionUseCase: createDeleteLocalAuthSessionUseCase(repository),
  };
}

// MARK: Presentation
export function resolveAuthPresentation(useCases: AuthUseCasesProtocol) {
  return {
    AuthProvider: createAuthProvider(useCases),
  };
}

// MARK: Module
export function useAuthModule() {
  return {
    resolveData: resolveAuthData,
    resolveDomain: resolveAuthDomain,
    resolvePresentation: () => resolveAuthPresentation(resolveAuthDomain()),
  };
}

// MARK: Public Provider
const { resolvePresentation } = useAuthModule();
const { AuthProvider } = resolvePresentation();

export { AuthProvider };
