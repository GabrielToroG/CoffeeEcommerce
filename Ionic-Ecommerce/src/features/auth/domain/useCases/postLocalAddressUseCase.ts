import type { AuthUserModel } from '../entities/AuthUserModel';
import type { AddAddressParams, AuthRepository } from '../repositories/authRepository';
import type { PostLocalAddressUseCaseProtocol } from './protocols/postLocalAddressUseCaseProtocol';

export function createPostLocalAddressUseCase(
  repository: AuthRepository,
): PostLocalAddressUseCaseProtocol {
  return async function postLocalAddressUseCase(
    params: AddAddressParams,
  ): Promise<AuthUserModel | null> {
    const normalizedLabel = params.label.trim();
    const normalizedAddress = params.fullAddress.trim();

    if (!normalizedLabel || !normalizedAddress) {
      return null;
    }

    return repository.addAddress({
      label: normalizedLabel,
      fullAddress: normalizedAddress,
    });
  };
}
