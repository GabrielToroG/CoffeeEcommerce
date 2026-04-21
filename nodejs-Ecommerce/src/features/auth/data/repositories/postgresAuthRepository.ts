import { randomUUID } from "crypto";
import type { PoolClient, QueryResultRow } from "pg";
import { queryDatabase, withDatabaseTransaction } from "../../../../core/database/postgresPool";
import { environment } from "../../../../core/config/environment";
import type { AuthAddressDTO } from "../entities/AuthAddressDTO";
import type { AuthOrderDTO } from "../entities/AuthOrderDTO";
import type { AuthUserDTO } from "../entities/AuthUserDTO";
import type {
  AddAddressParams,
  AuthRepository,
  RegisterOrderParams,
  RegisterUserParams,
} from "../../domain/repositories/authRepository";

type UserRow = {
  id: string;
  full_name: string;
  email: string;
  role: "customer" | "admin";
  address: string;
  password: string;
};

type AddressRow = {
  id: string;
  label: string;
  full_address: string;
  is_default: boolean;
};

type OrderRow = {
  id: string;
  created_at: string;
  status: string;
  total: number;
  items_count: number;
  payment_method: string;
  delivery_address: string;
};

type OrderItemRow = {
  product_id: string;
  product_name: string;
  unit_price: number;
  quantity: number;
  image_url: string;
};

async function runQuery<ResultRow extends QueryResultRow>(
  queryText: string,
  values: unknown[],
  client?: PoolClient,
) {
  if (client) {
    return client.query<ResultRow>(queryText, values);
  }

  return queryDatabase<ResultRow>(queryText, values);
}

function mapAddressRow(address: AddressRow): AuthAddressDTO {
  return {
    id: address.id,
    label: address.label,
    fullAddress: address.full_address,
    isDefault: address.is_default,
  };
}

function mapOrderRow(order: OrderRow, items: OrderItemRow[]): AuthOrderDTO {
  return {
    id: order.id,
    createdAt: order.created_at,
    status: order.status,
    total: Number(order.total),
    itemsCount: Number(order.items_count),
    paymentMethod: order.payment_method,
    deliveryAddress: order.delivery_address,
    items: items.map((item) => ({
      productId: item.product_id,
      productName: item.product_name,
      unitPrice: Number(item.unit_price),
      quantity: Number(item.quantity),
      imageUrl: item.image_url,
    })),
  };
}

async function findUserRowById(userId: string, client?: PoolClient) {
  const userResult = await runQuery<UserRow>(
    `
      SELECT id, full_name, email, role, address, password
      FROM users
      WHERE id = $1
    `,
    [userId],
    client,
  );

  return userResult.rows[0];
}

async function buildUserDto(userRow: UserRow, client?: PoolClient): Promise<AuthUserDTO> {
  const addressesResult = await runQuery<AddressRow>(
    `
      SELECT id, label, full_address
      , is_default
      FROM addresses
      WHERE user_id = $1
      ORDER BY is_default DESC, created_at DESC
    `,
    [userRow.id],
    client,
  );

  const ordersResult = await runQuery<OrderRow>(
    `
      SELECT id, created_at, status, total, items_count, payment_method, delivery_address
      FROM orders
      WHERE user_id = $1
      ORDER BY created_at DESC
    `,
    [userRow.id],
    client,
  );

  const orders = await Promise.all(
    ordersResult.rows.map(async (order: OrderRow) => {
      const itemsResult = await runQuery<OrderItemRow>(
        `
          SELECT product_id, product_name, unit_price, quantity, image_url
          FROM order_items
          WHERE order_id = $1
        `,
        [order.id],
        client,
      );

      return mapOrderRow(order, itemsResult.rows);
    }),
  );

  return {
    id: userRow.id,
    fullName: userRow.full_name,
    email: userRow.email,
    role: userRow.role,
    address: userRow.address,
    password: userRow.password,
    addresses: addressesResult.rows.map(mapAddressRow),
    orders,
  };
}

async function findUserDtoById(userId: string, client?: PoolClient) {
  const userRow = await findUserRowById(userId, client);
  return userRow ? buildUserDto(userRow, client) : null;
}

async function findSessionUserId(token: string, client?: PoolClient) {
  const sessionResult = await runQuery<{ user_id: string }>(
    `
      SELECT user_id
      FROM sessions
      WHERE token = $1
        AND expires_at > NOW()
    `,
    [token],
    client,
  );

  return sessionResult.rows[0]?.user_id ?? null;
}

export const postgresAuthRepository: AuthRepository = {
  async findUserBySessionToken(token) {
    const userId = await findSessionUserId(token);

    if (!userId) {
      await queryDatabase(
        `
          DELETE FROM sessions
          WHERE token = $1
            AND expires_at <= NOW()
        `,
        [token],
      );
      return null;
    }

    return findUserDtoById(userId);
  },

  async findUserByEmail(email) {
    const userResult = await queryDatabase<UserRow>(
      `
        SELECT id, full_name, email, role, address, password
        FROM users
        WHERE email = $1
      `,
      [email.trim().toLowerCase()],
    );

    const userRow = userResult.rows[0];
    return userRow ? buildUserDto(userRow) : null;
  },

  async createUser(params: RegisterUserParams) {
    const timestamp = Date.now();
    const userId = `user-${timestamp}`;
    const normalizedAddress = params.address.trim();

    await withDatabaseTransaction(async (client) => {
      await client.query(
        `
          INSERT INTO users (id, full_name, email, role, address, password)
          VALUES ($1, $2, $3, 'customer', $4, $5)
        `,
        [
          userId,
          params.fullName.trim(),
          params.email.trim().toLowerCase(),
          normalizedAddress,
          params.password,
        ],
      );
    });

    return findUserDtoById(userId) as Promise<AuthUserDTO>;
  },

  async updateUserPassword(userId: string, password: string) {
    await queryDatabase(
      `
        UPDATE users
        SET password = $1, updated_at = NOW()
        WHERE id = $2
      `,
      [password, userId],
    );
  },

  async createSession(userId) {
    const token = randomUUID();

    await queryDatabase(
      `
        INSERT INTO sessions (token, user_id, expires_at)
        VALUES ($1, $2, NOW() + ($3 * INTERVAL '1 hour'))
      `,
      [token, userId, environment.sessionTtlHours],
    );

    return token;
  },

  async removeSession(token) {
    await queryDatabase(
      `
        DELETE FROM sessions
        WHERE token = $1
      `,
      [token],
    );
  },

  async addAddress(token: string, params: AddAddressParams) {
    const sessionUserId = await findSessionUserId(token);

    if (!sessionUserId) {
      return null;
    }

    const normalizedAddress = params.fullAddress.trim();
    const userAddressesResult = await queryDatabase<{ count: string }>(
      `
        SELECT COUNT(*) AS count
        FROM addresses
        WHERE user_id = $1
      `,
      [sessionUserId],
    );
    const shouldSetAsDefault =
      params.setAsDefault === true || Number(userAddressesResult.rows[0]?.count ?? 0) === 0;

    await withDatabaseTransaction(async (client) => {
      if (shouldSetAsDefault) {
        await client.query(
          `
            UPDATE addresses
            SET is_default = FALSE
            WHERE user_id = $1
          `,
          [sessionUserId],
        );
      }

      await client.query(
        `
          INSERT INTO addresses (id, label, full_address, is_default, user_id)
          VALUES ($1, $2, $3, $4, $5)
        `,
        [
          `address-${Date.now()}`,
          params.label.trim(),
          normalizedAddress,
          shouldSetAsDefault,
          sessionUserId,
        ],
      );

      if (shouldSetAsDefault) {
        await client.query(
          `
            UPDATE users
            SET address = $1, updated_at = NOW()
            WHERE id = $2
          `,
          [normalizedAddress, sessionUserId],
        );
      }
    });

    const userRow = await findUserRowById(sessionUserId);

    if (userRow && !userRow.address) {
      await queryDatabase(
        `
          UPDATE users
          SET address = $1, updated_at = NOW()
          WHERE id = $2
        `,
        [normalizedAddress, sessionUserId],
      );
    }

    return findUserDtoById(sessionUserId);
  },

  async setDefaultAddress(token: string, addressId: string) {
    const sessionUserId = await findSessionUserId(token);

    if (!sessionUserId) {
      return null;
    }

    const addressResult = await queryDatabase<{
      id: string;
      full_address: string;
    }>(
      `
        SELECT id, full_address
        FROM addresses
        WHERE id = $1 AND user_id = $2
      `,
      [addressId, sessionUserId],
    );

    const selectedAddress = addressResult.rows[0];

    if (!selectedAddress) {
      return null;
    }

    await withDatabaseTransaction(async (client) => {
      await client.query(
        `
          UPDATE addresses
          SET is_default = CASE WHEN id = $1 THEN TRUE ELSE FALSE END
          WHERE user_id = $2
        `,
        [addressId, sessionUserId],
      );

      await client.query(
        `
          UPDATE users
          SET address = $1, updated_at = NOW()
          WHERE id = $2
        `,
        [selectedAddress.full_address, sessionUserId],
      );
    });

    return findUserDtoById(sessionUserId);
  },

  async registerOrder(token: string, params: RegisterOrderParams) {
    const sessionUserId = await findSessionUserId(token);

    if (!sessionUserId) {
      return null;
    }

    const orderId = `order-${Date.now()}`;

    await withDatabaseTransaction(async (client) => {
      await client.query(
        `
          INSERT INTO orders (id, status, total, items_count, payment_method, delivery_address, user_id)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
        `,
        [
          orderId,
          "Confirmado",
          params.total,
          params.itemsCount,
          params.paymentMethod,
          params.deliveryAddress,
          sessionUserId,
        ],
      );

      for (const item of params.items) {
        await client.query(
          `
            INSERT INTO order_items (id, product_id, product_name, unit_price, quantity, image_url, order_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
          `,
          [
            randomUUID(),
            item.productId,
            item.productName,
            item.unitPrice,
            item.quantity,
            item.imageUrl,
            orderId,
          ],
        );
      }
    });

    return findUserDtoById(sessionUserId);
  },
};
