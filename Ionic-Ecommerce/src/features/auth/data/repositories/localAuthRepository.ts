import { authApi } from '../api/authApi';
import type { AuthUserDTO } from '../entities/AuthUserDTO';
import type { AuthAddressModel } from '../../domain/entities/AuthAddressModel';
import type { AuthOrderItemModel } from '../../domain/entities/AuthOrderItemModel';
import type { AuthOrderModel } from '../../domain/entities/AuthOrderModel';
import type { AuthUserModel } from '../../domain/entities/AuthUserModel';
import type {
  AddAddressParams,
  AuthRepository,
  LoginParams,
  RegisterUserParams,
} from '../../domain/repositories/authRepository';

function mapAddress(address: AuthUserDTO['addresses'][number]): AuthAddressModel {
  return {
    id: address.id,
    label: address.label,
    fullAddress: address.fullAddress,
    isDefault: address.isDefault,
  };
}

function mapOrder(order: AuthUserDTO['orders'][number]): AuthOrderModel {
  return {
    id: order.id,
    createdAt: order.createdAt,
    status: order.status,
    total: order.total,
    itemsCount: order.itemsCount,
    paymentMethod: order.paymentMethod,
    deliveryAddress: order.deliveryAddress,
    items: (order.items ?? []).map((item): AuthOrderItemModel => ({
      productId: item.productId,
      productName: item.productName,
      unitPrice: item.unitPrice,
      quantity: item.quantity,
      imageUrl: item.imageUrl,
    })),
  };
}

function mapUser(user: AuthUserDTO): AuthUserModel {
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    address: user.address ?? '',
    addresses: (user.addresses ?? []).map(mapAddress),
    orders: (user.orders ?? []).map(mapOrder),
  };
}

export const localAuthRepository: AuthRepository = {
  async getCurrentUser() {
    const user = await authApi.getCurrentUser();
    return user ? mapUser(user) : null;
  },

  async login(params: LoginParams) {
    const user = await authApi.login(params.email, params.password);
    return mapUser(user);
  },

  async register(params: RegisterUserParams) {
    const user = await authApi.register(
      params.fullName,
      params.email,
      params.address,
      params.password,
    );
    return mapUser(user);
  },

  async addAddress(params: AddAddressParams) {
    const user = await authApi.addAddress(params.label, params.fullAddress, params.setAsDefault);
    return user ? mapUser(user) : null;
  },

  async setDefaultAddress(addressId: string) {
    const user = await authApi.setDefaultAddress(addressId);
    return user ? mapUser(user) : null;
  },

  async registerOrder(params) {
    const user = await authApi.registerOrder(
      params.total,
      params.itemsCount,
      params.paymentMethod,
      params.deliveryAddress,
      params.items,
    );
    return user ? mapUser(user) : null;
  },

  async logout() {
    await authApi.logout();
  },
};
