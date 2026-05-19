import type { AccountRepository } from '../repositories/accountRepository';
import type { PatchLocalDefaultAccountAddressUseCaseProtocol } from './protocols/patchLocalDefaultAccountAddressUseCaseProtocol';

export function createPatchLocalDefaultAccountAddressUseCase(
  repository: AccountRepository,
): PatchLocalDefaultAccountAddressUseCaseProtocol {
  return async function patchLocalDefaultAccountAddressUseCase(addressId: string) {
    if (!addressId.trim()) {
      return false;
    }

    return repository.setDefaultAddress(addressId);
  };
}
