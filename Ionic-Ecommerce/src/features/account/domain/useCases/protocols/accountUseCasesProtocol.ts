import type { PostLocalAccountAddressUseCaseProtocol } from './postLocalAccountAddressUseCaseProtocol';
import type { GetLocalAccountSessionUseCaseProtocol } from './getLocalAccountSessionUseCaseProtocol';
import type { GetLocalAccountSubmissionStateUseCaseProtocol } from './getLocalAccountSubmissionStateUseCaseProtocol';
import type { GetLocalDefaultAccountAddressUseCaseProtocol } from './getLocalDefaultAccountAddressUseCaseProtocol';
import type { DeleteLocalAccountSessionUseCaseProtocol } from './deleteLocalAccountSessionUseCaseProtocol';
import type { PatchLocalDefaultAccountAddressUseCaseProtocol } from './patchLocalDefaultAccountAddressUseCaseProtocol';

export type AccountUseCasesProtocol = {
  getLocalAccountSessionUseCase: GetLocalAccountSessionUseCaseProtocol;
  getLocalAccountSubmissionStateUseCase: GetLocalAccountSubmissionStateUseCaseProtocol;
  postLocalAccountAddressUseCase: PostLocalAccountAddressUseCaseProtocol;
  patchLocalDefaultAccountAddressUseCase: PatchLocalDefaultAccountAddressUseCaseProtocol;
  getLocalDefaultAccountAddressUseCase: GetLocalDefaultAccountAddressUseCaseProtocol;
  deleteLocalAccountSessionUseCase: DeleteLocalAccountSessionUseCaseProtocol;
};
