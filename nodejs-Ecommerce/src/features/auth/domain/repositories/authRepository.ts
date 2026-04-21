import type { AuthUserDTO } from "../../data/entities/AuthUserDTO";

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

export type AddAddressParams = {
  label: string;
  fullAddress: string;
  setAsDefault?: boolean;
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

export type AuthRepository = {
  findUserBySessionToken: (token: string) => Promise<AuthUserDTO | null>;
  findUserByEmail: (email: string) => Promise<AuthUserDTO | null>;
  createUser: (params: RegisterUserParams) => Promise<AuthUserDTO>;
  updateUserPassword: (userId: string, password: string) => Promise<void>;
  createSession: (userId: string) => Promise<string>;
  removeSession: (token: string) => Promise<void>;
  addAddress: (token: string, params: AddAddressParams) => Promise<AuthUserDTO | null>;
  setDefaultAddress: (token: string, addressId: string) => Promise<AuthUserDTO | null>;
  registerOrder: (token: string, params: RegisterOrderParams) => Promise<AuthUserDTO | null>;
};
