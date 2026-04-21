import { queryDatabase } from "./postgresPool";

export async function initializeDatabase() {
  await queryDatabase(`
    CREATE TABLE IF NOT EXISTS storefront_categories (
      id TEXT PRIMARY KEY,
      label TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS storefront_collections (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      subtitle TEXT NOT NULL,
      sort_order INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS storefront_products (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      price INTEGER NOT NULL,
      original_price INTEGER,
      badge TEXT,
      image_url TEXT NOT NULL,
      category_id TEXT NOT NULL REFERENCES storefront_categories(id),
      rating DOUBLE PRECISION NOT NULL
    );

    CREATE TABLE IF NOT EXISTS storefront_collection_products (
      collection_id TEXT NOT NULL REFERENCES storefront_collections(id) ON DELETE CASCADE,
      product_id TEXT NOT NULL REFERENCES storefront_products(id) ON DELETE CASCADE,
      sort_order INTEGER NOT NULL,
      PRIMARY KEY (collection_id, product_id)
    );

    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      role TEXT NOT NULL DEFAULT 'customer',
      address TEXT NOT NULL,
      password TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS addresses (
      id TEXT PRIMARY KEY,
      label TEXT NOT NULL,
      full_address TEXT NOT NULL,
      is_default BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS sessions (
      token TEXT PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      expires_at TIMESTAMPTZ,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      status TEXT NOT NULL,
      total INTEGER NOT NULL,
      items_count INTEGER NOT NULL,
      payment_method TEXT NOT NULL,
      delivery_address TEXT NOT NULL,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS order_items (
      id TEXT PRIMARY KEY,
      product_id TEXT NOT NULL,
      product_name TEXT NOT NULL,
      unit_price INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      image_url TEXT NOT NULL,
      order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE
    );

    ALTER TABLE storefront_categories
      ADD COLUMN IF NOT EXISTS sort_order INTEGER NOT NULL DEFAULT 0;

    ALTER TABLE users
      ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'customer';

    ALTER TABLE addresses
      ADD COLUMN IF NOT EXISTS is_default BOOLEAN NOT NULL DEFAULT FALSE;

    ALTER TABLE sessions
      ADD COLUMN IF NOT EXISTS expires_at TIMESTAMPTZ;

    UPDATE sessions
    SET expires_at = created_at + INTERVAL '24 hours'
    WHERE expires_at IS NULL;

    WITH latest_address_per_user AS (
      SELECT DISTINCT ON (user_id) id, user_id
      FROM addresses
      ORDER BY user_id, created_at DESC, id DESC
    )
    UPDATE addresses
    SET is_default = TRUE
    WHERE id IN (
      SELECT latest_address_per_user.id
      FROM latest_address_per_user
      WHERE NOT EXISTS (
        SELECT 1
        FROM addresses existing_default
        WHERE existing_default.user_id = latest_address_per_user.user_id
          AND existing_default.is_default = TRUE
      )
    );

    CREATE INDEX IF NOT EXISTS idx_addresses_user_id_created_at
      ON addresses(user_id, created_at DESC);

    CREATE INDEX IF NOT EXISTS idx_storefront_products_category_id
      ON storefront_products(category_id);

    CREATE INDEX IF NOT EXISTS idx_storefront_collection_products_collection_sort
      ON storefront_collection_products(collection_id, sort_order);

    CREATE INDEX IF NOT EXISTS idx_sessions_user_id
      ON sessions(user_id);

    CREATE INDEX IF NOT EXISTS idx_sessions_expires_at
      ON sessions(expires_at);

    CREATE INDEX IF NOT EXISTS idx_orders_user_id_created_at
      ON orders(user_id, created_at DESC);

    CREATE INDEX IF NOT EXISTS idx_order_items_order_id
      ON order_items(order_id);
  `);
}
