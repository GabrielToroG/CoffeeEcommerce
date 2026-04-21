import { randomUUID } from "crypto";
import { prismaClient } from "../../../../core/database/prismaClient";
import type { AuthUserDTO } from "../entities/AuthUserDTO";
import type {
  AddAddressParams,
  AuthRepository,
  RegisterOrderParams,
  RegisterUserParams,
} from "../../domain/repositories/authRepository";

function mapUser(user: {
  id: string;
  fullName: string;
  email: string;
  role?: "customer" | "admin";
  address: string;
  password: string;
  addresses: Array<{
    id: string;
    label: string;
    fullAddress: string;
  }>;
  orders: Array<{
    id: string;
    createdAt: Date;
    status: string;
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
  }>;
}): AuthUserDTO {
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    role: user.role ?? "customer",
    address: user.address,
    password: user.password,
    addresses: user.addresses.map((address) => ({
      id: address.id,
      label: address.label,
      fullAddress: address.fullAddress,
    })),
    orders: user.orders.map((order) => ({
      id: order.id,
      createdAt: order.createdAt.toISOString(),
      status: order.status,
      total: order.total,
      itemsCount: order.itemsCount,
      paymentMethod: order.paymentMethod,
      deliveryAddress: order.deliveryAddress,
      items: order.items.map((item) => ({
        productId: item.productId,
        productName: item.productName,
        unitPrice: item.unitPrice,
        quantity: item.quantity,
        imageUrl: item.imageUrl,
      })),
    })),
  };
}

async function findUserById(userId: string) {
  const user = await prismaClient.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      addresses: {
        orderBy: {
          createdAt: "desc",
        },
      },
      orders: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          items: true,
        },
      },
    },
  });

  return user ? mapUser(user) : null;
}

export const prismaAuthRepository: AuthRepository = {
  async findUserBySessionToken(token) {
    const session = await prismaClient.session.findUnique({
      where: {
        token,
      },
      select: {
        userId: true,
      },
    });

    if (!session) {
      return null;
    }

    return findUserById(session.userId);
  },

  async findUserByEmail(email) {
    const user = await prismaClient.user.findUnique({
      where: {
        email: email.trim().toLowerCase(),
      },
      include: {
        addresses: {
          orderBy: {
            createdAt: "desc",
          },
        },
        orders: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            items: true,
          },
        },
      },
    });

    return user ? mapUser(user) : null;
  },

  async createUser(params: RegisterUserParams) {
    const timestamp = Date.now();
    const normalizedAddress = params.address.trim();

    const user = await prismaClient.user.create({
      data: {
        id: `user-${timestamp}`,
        fullName: params.fullName.trim(),
        email: params.email.trim().toLowerCase(),
        address: normalizedAddress,
        password: params.password,
        addresses: {
          create: [
            {
              id: `address-${timestamp}`,
              label: "Casa",
              fullAddress: normalizedAddress,
            },
            {
              id: `address-${timestamp}-work`,
              label: "Trabajo",
              fullAddress: `${normalizedAddress} Oficina 201`,
            },
          ],
        },
      },
      include: {
        addresses: {
          orderBy: {
            createdAt: "desc",
          },
        },
        orders: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            items: true,
          },
        },
      },
    });

    return mapUser(user);
  },

  async createSession(userId) {
    const token = randomUUID();

    await prismaClient.session.create({
      data: {
        token,
        userId,
      },
    });

    return token;
  },

  async removeSession(token) {
    await prismaClient.session.deleteMany({
      where: {
        token,
      },
    });
  },

  async addAddress(token: string, params: AddAddressParams) {
    const session = await prismaClient.session.findUnique({
      where: {
        token,
      },
      select: {
        userId: true,
      },
    });

    if (!session) {
      return null;
    }

    const normalizedAddress = params.fullAddress.trim();

    await prismaClient.address.create({
      data: {
        id: `address-${Date.now()}`,
        label: params.label.trim(),
        fullAddress: normalizedAddress,
        userId: session.userId,
      },
    });

    const currentUser = await prismaClient.user.findUnique({
      where: {
        id: session.userId,
      },
      select: {
        address: true,
      },
    });

    if (currentUser && !currentUser.address) {
      await prismaClient.user.update({
        where: {
          id: session.userId,
        },
        data: {
          address: normalizedAddress,
        },
      });
    }

    return findUserById(session.userId);
  },

  async registerOrder(token: string, params: RegisterOrderParams) {
    const session = await prismaClient.session.findUnique({
      where: {
        token,
      },
      select: {
        userId: true,
      },
    });

    if (!session) {
      return null;
    }

    await prismaClient.order.create({
      data: {
        id: `order-${Date.now()}`,
        status: "Confirmado",
        total: params.total,
        itemsCount: params.itemsCount,
        paymentMethod: params.paymentMethod,
        deliveryAddress: params.deliveryAddress,
        userId: session.userId,
        items: {
          create: params.items.map((item) => ({
            id: randomUUID(),
            productId: item.productId,
            productName: item.productName,
            unitPrice: item.unitPrice,
            quantity: item.quantity,
            imageUrl: item.imageUrl,
          })),
        },
      },
    });

    return findUserById(session.userId);
  },
};
