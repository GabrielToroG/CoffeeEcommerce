import type { AuthAddressModel } from './AuthAddressModel';
import type { AuthOrderModel } from './AuthOrderModel';

export type AuthUserModel = {
  id: string;
  fullName: string;
  email: string;
  role: 'customer' | 'admin';
  address: string;
  addresses: AuthAddressModel[];
  orders: AuthOrderModel[];
};
