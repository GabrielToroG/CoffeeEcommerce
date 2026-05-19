import type { AuthSessionModel } from '../../../auth/domain/entities/AuthSessionModel';
import type { SaveAccountAddressParams } from '../../domain/repositories/accountRepository';

export type AccountDataSourceProtocol = {
  session: AuthSessionModel;
  isSubmitting: boolean;
  errorMessage: string | null;
  addAddress: (params: SaveAccountAddressParams) => Promise<boolean>;
  setDefaultAddress: (addressId: string) => Promise<boolean>;
  logout: () => Promise<void>;
};
