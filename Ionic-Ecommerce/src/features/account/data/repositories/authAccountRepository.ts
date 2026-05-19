import type { AccountDataSourceProtocol } from '../dataSources/accountDataSourceProtocol';
import type { AccountRepository } from '../../domain/repositories/accountRepository';

export function createAuthAccountRepository(
  dataSource: AccountDataSourceProtocol,
): AccountRepository {
  return {
    session: dataSource.session,
    isSubmitting: dataSource.isSubmitting,
    errorMessage: dataSource.errorMessage,
    addAddress: dataSource.addAddress,
    setDefaultAddress: dataSource.setDefaultAddress,
    logout: dataSource.logout,
  };
}
