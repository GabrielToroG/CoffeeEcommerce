import type { AuthUserModel } from '../entities/AuthUserModel';
import type { AuthRepository } from '../repositories/authRepository';
import type { PatchLocalDefaultAddressUseCaseProtocol } from './protocols/patchLocalDefaultAddressUseCaseProtocol';

export function createPatchLocalDefaultAddressUseCase(
  repository: AuthRepository,
): PatchLocalDefaultAddressUseCaseProtocol {
  return async function patchLocalDefaultAddressUseCase(
    addressId: string,
  ): Promise<AuthUserModel | null> {
    if (!addressId.trim()) {
      return null;
    }

    return repository.setDefaultAddress(addressId);
  };
}
