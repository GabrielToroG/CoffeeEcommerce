import type { AuthUserModel } from '../entities/AuthUserModel';
import type { AddAddressParams, AuthRepository } from '../repositories/authRepository';

export async function addAddressUseCase(
  repository: AuthRepository,
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
}
