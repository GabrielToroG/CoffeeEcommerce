import type { AccountRepository } from '../repositories/accountRepository';
import type { GetLocalDefaultAccountAddressUseCaseProtocol } from './protocols/getLocalDefaultAccountAddressUseCaseProtocol';

export function createGetLocalDefaultAccountAddressUseCase(
  repository: AccountRepository,
): GetLocalDefaultAccountAddressUseCaseProtocol {
  return function getLocalDefaultAccountAddressUseCase() {
    return (
      repository.session.user?.addresses.find((address) => address.isDefault)?.fullAddress ??
      repository.session.user?.address ??
      'Sin direccion predeterminada'
    );
  };
}
