import type { AuthUserModel } from '../../entities/AuthUserModel';

export type PatchLocalDefaultAddressUseCaseProtocol = (
  addressId: string,
) => Promise<AuthUserModel | null>;
