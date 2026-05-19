import type { AuthSessionModel } from '../../../auth/domain/entities/AuthSessionModel';
import type { AccountDataSourceProtocol } from './accountDataSourceProtocol';
import type { SaveAccountAddressParams } from '../../domain/repositories/accountRepository';

type AuthAccountDataSourceDependencies = {
  session: AuthSessionModel;
  isSubmitting: boolean;
  errorMessage: string | null;
  addAddress: (params: SaveAccountAddressParams) => Promise<boolean>;
  setDefaultAddress: (addressId: string) => Promise<boolean>;
  logout: () => Promise<void>;
};

export function createAuthAccountDataSource(
  dependencies: AuthAccountDataSourceDependencies,
): AccountDataSourceProtocol {
  return {
    session: dependencies.session,
    isSubmitting: dependencies.isSubmitting,
    errorMessage: dependencies.errorMessage,
    addAddress: dependencies.addAddress,
    setDefaultAddress: dependencies.setDefaultAddress,
    logout: dependencies.logout,
  };
}
