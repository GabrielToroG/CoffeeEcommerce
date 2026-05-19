import type { AccountRepository } from '../repositories/accountRepository';
import type { PostLocalAccountAddressUseCaseProtocol } from './protocols/postLocalAccountAddressUseCaseProtocol';

export function createPostLocalAccountAddressUseCase(
  repository: AccountRepository,
): PostLocalAccountAddressUseCaseProtocol {
  return async function postLocalAccountAddressUseCase(
    label: string,
    fullAddress: string,
    setAsDefault: boolean,
  ) {
    const normalizedLabel = label.trim();
    const normalizedAddress = fullAddress.trim();

    if (!normalizedLabel || !normalizedAddress) {
      return false;
    }

    return repository.addAddress({
      label: normalizedLabel,
      fullAddress: normalizedAddress,
      setAsDefault,
    });
  };
}
