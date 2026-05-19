import type { AuthUserDTO } from '../entities/AuthUserDTO';
import type { AuthAddressModel } from '../../domain/entities/AuthAddressModel';
import type { AuthOrderItemModel } from '../../domain/entities/AuthOrderItemModel';
import type { AuthOrderModel } from '../../domain/entities/AuthOrderModel';
import type { AuthUserModel } from '../../domain/entities/AuthUserModel';
import type {
  AddAddressParams,
  AuthRepository,
  LoginParams,
  RegisterOrderParams,
  RegisterUserParams,
} from '../../domain/repositories/authRepository';
import type {
  AddAuthAddressPayloadDTO,
  AuthDataSourceProtocol,
  LoginAuthPayloadDTO,
  RegisterAuthOrderPayloadDTO,
  RegisterAuthPayloadDTO,
} from '../dataSources/authDataSourceProtocol';

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

function mapLoginPayload(params: LoginParams): LoginAuthPayloadDTO {
  return {
    email: params.email,
    password: params.password,
  };
}

function mapRegisterPayload(params: RegisterUserParams): RegisterAuthPayloadDTO {
  return {
    fullName: params.fullName,
    email: params.email,
    address: params.address,
    password: params.password,
  };
}

function mapAddAddressPayload(params: AddAddressParams): AddAuthAddressPayloadDTO {
  return {
    label: params.label,
    fullAddress: params.fullAddress,
    setAsDefault: params.setAsDefault,
  };
}

function mapRegisterOrderPayload(params: RegisterOrderParams): RegisterAuthOrderPayloadDTO {
  return {
    total: params.total,
    itemsCount: params.itemsCount,
    paymentMethod: params.paymentMethod,
    deliveryAddress: params.deliveryAddress,
    items: params.items,
  };
}

export function createLocalAuthRepository(dataSource: AuthDataSourceProtocol): AuthRepository {
  return {
    async getCurrentUser() {
      const user = await dataSource.getCurrentUser();
      return user ? mapUser(user) : null;
    },

    async login(params: LoginParams) {
      const user = await dataSource.login(mapLoginPayload(params));
      return mapUser(user);
    },

    async register(params: RegisterUserParams) {
      const user = await dataSource.register(mapRegisterPayload(params));
      return mapUser(user);
    },

    async addAddress(params: AddAddressParams) {
      const user = await dataSource.addAddress(mapAddAddressPayload(params));
      return user ? mapUser(user) : null;
    },

    async setDefaultAddress(addressId: string) {
      const user = await dataSource.setDefaultAddress(addressId);
      return user ? mapUser(user) : null;
    },

    async registerOrder(params: RegisterOrderParams) {
      const user = await dataSource.registerOrder(mapRegisterOrderPayload(params));
      return user ? mapUser(user) : null;
    },

    async logout() {
      await dataSource.logout();
    },
  };
}
