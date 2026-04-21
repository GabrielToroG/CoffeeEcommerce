import { withDatabaseTransaction, queryDatabase } from "../../../../core/database/postgresPool";
import { storefrontCatalog } from "./storefrontCatalog";

export async function seedStorefrontCatalog() {
  const productCountResult = await queryDatabase<{ count: string }>(
    `
      SELECT COUNT(*) AS count
      FROM storefront_products
    `,
  );
  const productCountRow = productCountResult.rows[0];

  if (Number(productCountRow.count) > 0) {
    return;
  }

  await withDatabaseTransaction(async (client) => {
    for (const [categoryIndex, category] of storefrontCatalog.categories.entries()) {
      await client.query(
        `
          INSERT INTO storefront_categories (id, label, sort_order)
          VALUES ($1, $2, $3)
        `,
        [category.id, category.label, categoryIndex],
      );
    }

    const insertedProductIds = new Set<string>();

    for (const [collectionIndex, collection] of storefrontCatalog.collections.entries()) {
      await client.query(
        `
          INSERT INTO storefront_collections (id, title, subtitle, sort_order)
          VALUES ($1, $2, $3, $4)
        `,
        [
          collection.id,
          collection.title,
          collection.subtitle,
          collectionIndex,
        ],
      );

      for (const [productIndex, product] of collection.products.entries()) {
        if (!insertedProductIds.has(product.id)) {
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
              product.id,
              product.name,
              product.description,
              product.price,
              product.originalPrice ?? null,
              product.badge ?? null,
              product.imageUrl,
              product.categoryId,
              product.rating,
            ],
          );

          insertedProductIds.add(product.id);
        }

        await client.query(
          `
            INSERT INTO storefront_collection_products (collection_id, product_id, sort_order)
            VALUES ($1, $2, $3)
          `,
          [collection.id, product.id, productIndex],
        );
      }
    }
  });
}
