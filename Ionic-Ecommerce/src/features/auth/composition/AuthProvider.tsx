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

function createAuthDataSource() {
  switch (runtimeConfig.authDataSource) {
    case 'local':
      return localAuthDataSource;
    default:
      return localAuthDataSource;
  }
}

function createAuthUseCases(): AuthUseCasesProtocol {
  const dataSource = createAuthDataSource();
  const repository = createLocalAuthRepository(dataSource);

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

export const AuthProvider = createAuthProvider(createAuthUseCases());
