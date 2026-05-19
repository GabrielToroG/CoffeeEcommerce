import type { AuthUserModel } from '../entities/AuthUserModel';

export function deriveSelectedDeliveryAddressLabelUseCase(user: AuthUserModel | null) {
  if (!user) {
    return 'Ingresa una direccion';
  }

  const selectedAddress =
    user.addresses.find((address) => address.isDefault) ?? user.addresses[0] ?? null;

  if (selectedAddress) {
    return `${selectedAddress.label}: ${selectedAddress.fullAddress}`;
  }

  return user.address || 'Agrega una direccion';
}
