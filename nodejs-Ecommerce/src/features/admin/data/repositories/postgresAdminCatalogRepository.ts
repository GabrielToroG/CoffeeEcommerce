import { randomUUID } from "crypto";
import type { PoolClient } from "pg";
import { queryDatabase, withDatabaseTransaction } from "../../../../core/database/postgresPool";
import type { AdminCatalogRepository, SaveAdminProductParams, UpdateAdminProductParams } from "../../domain/repositories/adminCatalogRepository";
import type { AdminCatalogOptionsModel } from "../../domain/entities/AdminCatalogOptionsModel";
import type { AdminProductModel } from "../../domain/entities/AdminProductModel";

type AdminProductRow = {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price: number | null;
  badge: string | null;
  image_url: string;
  category_id: string;
  rating: number;
};

async function mapAdminProductRow(product: AdminProductRow): Promise<AdminProductModel> {
  const collectionRowsResult = await queryDatabase<{ collection_id: string }>(
    `
      SELECT collection_id
      FROM storefront_collection_products
      WHERE product_id = $1
      ORDER BY sort_order ASC
    `,
    [product.id],
  );

  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: Number(product.price),
    originalPrice: product.original_price === null ? undefined : Number(product.original_price),
    badge: product.badge ?? undefined,
    imageUrl: product.image_url,
    categoryId: product.category_id,
    rating: Number(product.rating),
    collectionIds: collectionRowsResult.rows.map((collection) => collection.collection_id),
  };
}

async function findAdminProductById(productId: string) {
  const productResult = await queryDatabase<AdminProductRow>(
    `
      SELECT id, name, description, price, original_price, badge, image_url, category_id, rating
      FROM storefront_products
      WHERE id = $1
    `,
    [productId],
  );

  const product = productResult.rows[0];
  return product ? mapAdminProductRow(product) : null;
}

async function replaceCollectionLinks(
  client: PoolClient,
  productId: string,
  collectionIds: string[],
) {
  await client.query(
    `
      DELETE FROM storefront_collection_products
      WHERE product_id = $1
    `,
    [productId],
  );

  for (const [collectionIndex, collectionId] of collectionIds.entries()) {
    await client.query(
      `
        INSERT INTO storefront_collection_products (collection_id, product_id, sort_order)
        VALUES ($1, $2, $3)
      `,
      [collectionId, productId, collectionIndex],
    );
  }
}

export const postgresAdminCatalogRepository: AdminCatalogRepository = {
  async getCatalogOptions(): Promise<AdminCatalogOptionsModel> {
    const categoriesResult = await queryDatabase<{ id: string; label: string }>(
      `
        SELECT id, label
        FROM storefront_categories
        ORDER BY sort_order ASC
      `,
    );

    const collectionsResult = await queryDatabase<{ id: string; title: string }>(
      `
        SELECT id, title
        FROM storefront_collections
        ORDER BY sort_order ASC
      `,
    );

    return {
      categories: categoriesResult.rows,
      collections: collectionsResult.rows,
    };
  },

  async getProducts(): Promise<AdminProductModel[]> {
    const productsResult = await queryDatabase<AdminProductRow>(
      `
        SELECT id, name, description, price, original_price, badge, image_url, category_id, rating
        FROM storefront_products
        ORDER BY name ASC
      `,
    );

    return Promise.all(productsResult.rows.map(mapAdminProductRow));
  },

  async createProduct(params: SaveAdminProductParams): Promise<AdminProductModel> {
    const productId = `product-${randomUUID()}`;

    await withDatabaseTransaction(async (client) => {
      await client.query(
        `
          INSERT INTO storefront_products (
            id,
            name,
            description,
            price,
            original_price,
            badge,
            image_url,
            category_id,
            rating
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        `,
        [
          productId,
          params.name.trim(),
          params.description.trim(),
          params.price,
          params.originalPrice ?? null,
          params.badge?.trim() || null,
          params.imageUrl.trim(),
          params.categoryId.trim(),
          params.rating,
        ],
      );

      await replaceCollectionLinks(client, productId, params.collectionIds);
    });

    return findAdminProductById(productId) as Promise<AdminProductModel>;
  },

  async updateProduct(productId: string, params: UpdateAdminProductParams): Promise<AdminProductModel | null> {
    const currentProduct = await findAdminProductById(productId);

    if (!currentProduct) {
      return null;
    }

    const nextProduct: AdminProductModel = {
      ...currentProduct,
      ...params,
      name: params.name?.trim() ?? currentProduct.name,
      description: params.description?.trim() ?? currentProduct.description,
      badge: params.badge === undefined ? currentProduct.badge : params.badge.trim() || undefined,
      imageUrl: params.imageUrl?.trim() ?? currentProduct.imageUrl,
      categoryId: params.categoryId?.trim() ?? currentProduct.categoryId,
      collectionIds: params.collectionIds ?? currentProduct.collectionIds,
    };

    await withDatabaseTransaction(async (client) => {
      await client.query(
        `
          UPDATE storefront_products
          SET name = $1,
              description = $2,
              price = $3,
              original_price = $4,
              badge = $5,
              image_url = $6,
              category_id = $7,
              rating = $8
          WHERE id = $9
        `,
        [
          nextProduct.name,
          nextProduct.description,
          nextProduct.price,
          nextProduct.originalPrice ?? null,
          nextProduct.badge ?? null,
          nextProduct.imageUrl,
          nextProduct.categoryId,
          nextProduct.rating,
          productId,
        ],
      );

      await replaceCollectionLinks(client, productId, nextProduct.collectionIds);
    });

    return findAdminProductById(productId);
  },

  async deleteProduct(productId: string): Promise<boolean> {
    const deleteResult = await queryDatabase(
      `
        DELETE FROM storefront_products
        WHERE id = $1
      `,
      [productId],
    );

    return Number(deleteResult.rowCount ?? 0) > 0;
  },
};
