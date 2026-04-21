import path from "path";
import { randomUUID } from "crypto";
import { readJsonFile } from "../../../../core/persistence/readJsonFile";
import { writeJsonFile } from "../../../../core/persistence/writeJsonFile";
import type { AuthStoreDTO } from "../entities/AuthStoreDTO";
import type { AuthUserDTO } from "../entities/AuthUserDTO";
import type {
  AddAddressParams,
  AuthRepository,
  RegisterOrderParams,
  RegisterUserParams,
} from "../../domain/repositories/authRepository";

const authStoreFilePath = path.resolve(process.cwd(), "data", "auth-store.json");

const initialAuthStore: AuthStoreDTO = {
  users: [],
  sessions: {},
};

async function readAuthStore() {
  return readJsonFile(authStoreFilePath, initialAuthStore);
}

async function writeAuthStore(store: AuthStoreDTO) {
  await writeJsonFile(authStoreFilePath, store);
}

export const fileAuthRepository: AuthRepository = {
  async findUserBySessionToken(token) {
    const store = await readAuthStore();
    const userId = store.sessions[token];

    if (!userId) {
      return null;
    }

    return store.users.find((user) => user.id === userId) ?? null;
  },

  async findUserByEmail(email) {
    const store = await readAuthStore();
    const normalizedEmail = email.trim().toLowerCase();
    return store.users.find((user) => user.email.toLowerCase() === normalizedEmail) ?? null;
  },

  async createUser(params: RegisterUserParams) {
    const store = await readAuthStore();
    const timestamp = Date.now();
    const normalizedAddress = params.address.trim();

    const newUser: AuthUserDTO = {
      id: `user-${timestamp}`,
      fullName: params.fullName.trim(),
      email: params.email.trim().toLowerCase(),
      role: "customer",
      address: normalizedAddress,
      addresses: [],
      orders: [],
      password: params.password,
    };

    store.users.push(newUser);
    await writeAuthStore(store);

    return newUser;
  },

  async updateUserPassword(userId: string, password: string) {
    const store = await readAuthStore();

    store.users = store.users.map((user) => {
      if (user.id !== userId) {
        return user;
      }

      return {
        ...user,
        password,
      };
    });

    await writeAuthStore(store);
  },

  async createSession(userId) {
    const store = await readAuthStore();
    const token = randomUUID();

    store.sessions[token] = userId;
    await writeAuthStore(store);

    return token;
  },

  async removeSession(token) {
    const store = await readAuthStore();

    if (!store.sessions[token]) {
      return;
    }

    delete store.sessions[token];
    await writeAuthStore(store);
  },

  async addAddress(token: string, params: AddAddressParams) {
    const store = await readAuthStore();
    const userId = store.sessions[token];

    if (!userId) {
      return null;
    }

    const normalizedLabel = params.label.trim();
    const normalizedAddress = params.fullAddress.trim();

    store.users = store.users.map((user) => {
      if (user.id !== userId) {
        return user;
      }

      const shouldSetAsDefault = params.setAsDefault === true || user.addresses.length === 0;

      return {
        ...user,
        address: shouldSetAsDefault ? normalizedAddress : user.address || normalizedAddress,
        addresses: [
          {
            id: `address-${Date.now()}`,
            label: normalizedLabel,
            fullAddress: normalizedAddress,
            isDefault: shouldSetAsDefault,
          },
          ...user.addresses.map((address) => ({
            ...address,
            isDefault: shouldSetAsDefault ? false : address.isDefault,
          })),
        ],
      };
    });

    await writeAuthStore(store);

    return store.users.find((user) => user.id === userId) ?? null;
  },

  async setDefaultAddress(token: string, addressId: string) {
    const store = await readAuthStore();
    const userId = store.sessions[token];

    if (!userId) {
      return null;
    }

    store.users = store.users.map((user) => {
      if (user.id !== userId) {
        return user;
      }

      const selectedAddress = user.addresses.find((address) => address.id === addressId);

      if (!selectedAddress) {
        return user;
      }

      return {
        ...user,
        address: selectedAddress.fullAddress,
        addresses: user.addresses.map((address) => ({
          ...address,
          isDefault: address.id === addressId,
        })),
      };
    });

    await writeAuthStore(store);

    return store.users.find((user) => user.id === userId) ?? null;
  },

  async registerOrder(token: string, params: RegisterOrderParams) {
    const store = await readAuthStore();
    const userId = store.sessions[token];

    if (!userId) {
      return null;
    }

    store.users = store.users.map((user) => {
      if (user.id !== userId) {
        return user;
      }

      return {
        ...user,
        orders: [
          {
            id: `order-${Date.now()}`,
            createdAt: new Date().toISOString(),
            status: "Confirmado",
            total: params.total,
            itemsCount: params.itemsCount,
            paymentMethod: params.paymentMethod,
            deliveryAddress: params.deliveryAddress,
            items: params.items,
          },
          ...user.orders,
        ],
      };
    });

    await writeAuthStore(store);

    return store.users.find((user) => user.id === userId) ?? null;
  },
};
