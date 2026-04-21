import type { AuthUserModel } from '../entities/AuthUserModel';

export type LoginParams = {
  email: string;
  password: string;
};

export type RegisterUserParams = {
  fullName: string;
  email: string;
  address: string;
  password: string;
};

export type RegisterOrderParams = {
  total: number;
  itemsCount: number;
  paymentMethod: string;
  deliveryAddress: string;
  items: Array<{
    productId: string;
    productName: string;
    unitPrice: number;
    quantity: number;
    imageUrl: string;
  }>;
};

export type AddAddressParams = {
  label: string;
  fullAddress: string;
  setAsDefault?: boolean;
};

export type AuthRepository = {
  getCurrentUser: () => Promise<AuthUserModel | null>;
  login: (params: LoginParams) => Promise<AuthUserModel>;
  register: (params: RegisterUserParams) => Promise<AuthUserModel>;
  addAddress: (params: AddAddressParams) => Promise<AuthUserModel | null>;
  setDefaultAddress: (addressId: string) => Promise<AuthUserModel | null>;
  registerOrder: (params: RegisterOrderParams) => Promise<AuthUserModel | null>;
  logout: () => Promise<void>;
};
