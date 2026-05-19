import type { PostLocalAddressUseCaseProtocol } from './postLocalAddressUseCaseProtocol';
import type { GetLocalCurrentUserUseCaseProtocol } from './getLocalCurrentUserUseCaseProtocol';
import type { PostLocalLoginUseCaseProtocol } from './postLocalLoginUseCaseProtocol';
import type { DeleteLocalAuthSessionUseCaseProtocol } from './deleteLocalAuthSessionUseCaseProtocol';
import type { PostLocalRegisterOrderUseCaseProtocol } from './postLocalRegisterOrderUseCaseProtocol';
import type { PostLocalRegisterUserUseCaseProtocol } from './postLocalRegisterUserUseCaseProtocol';
import type { PatchLocalDefaultAddressUseCaseProtocol } from './patchLocalDefaultAddressUseCaseProtocol';

export type AuthUseCasesProtocol = {
  getLocalCurrentUserUseCase: GetLocalCurrentUserUseCaseProtocol;
  postLocalLoginUseCase: PostLocalLoginUseCaseProtocol;
  postLocalRegisterUserUseCase: PostLocalRegisterUserUseCaseProtocol;
  postLocalAddressUseCase: PostLocalAddressUseCaseProtocol;
  patchLocalDefaultAddressUseCase: PatchLocalDefaultAddressUseCaseProtocol;
  postLocalRegisterOrderUseCase: PostLocalRegisterOrderUseCaseProtocol;
  deleteLocalAuthSessionUseCase: DeleteLocalAuthSessionUseCaseProtocol;
};
