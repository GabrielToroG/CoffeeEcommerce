import type { AuthSessionModel } from '../../../auth/domain/entities/AuthSessionModel';

export type SaveAccountAddressParams = {
  label: string;
  fullAddress: string;
  setAsDefault?: boolean;
};

export type AccountRepository = {
  session: AuthSessionModel;
  isSubmitting: boolean;
  errorMessage: string | null;
  addAddress: (params: SaveAccountAddressParams) => Promise<boolean>;
  setDefaultAddress: (addressId: string) => Promise<boolean>;
  logout: () => Promise<void>;
};
