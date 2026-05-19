import type { AuthOrderItemDTO } from '../entities/AuthOrderItemDTO';
import type { AuthUserDTO } from '../entities/AuthUserDTO';

export type LoginAuthPayloadDTO = {
  email: string;
  password: string;
};

export type RegisterAuthPayloadDTO = {
  fullName: string;
  email: string;
  address: string;
  password: string;
};

export type AddAuthAddressPayloadDTO = {
  label: string;
  fullAddress: string;
  setAsDefault?: boolean;
};

export type RegisterAuthOrderPayloadDTO = {
  total: number;
  itemsCount: number;
  paymentMethod: string;
  deliveryAddress: string;
  items: AuthOrderItemDTO[];
};

export type AuthDataSourceProtocol = {
  getCurrentUser: () => Promise<AuthUserDTO | null>;
  login: (payload: LoginAuthPayloadDTO) => Promise<AuthUserDTO>;
  register: (payload: RegisterAuthPayloadDTO) => Promise<AuthUserDTO>;
  addAddress: (payload: AddAuthAddressPayloadDTO) => Promise<AuthUserDTO | null>;
  setDefaultAddress: (addressId: string) => Promise<AuthUserDTO | null>;
  registerOrder: (payload: RegisterAuthOrderPayloadDTO) => Promise<AuthUserDTO | null>;
  logout: () => Promise<void>;
};
