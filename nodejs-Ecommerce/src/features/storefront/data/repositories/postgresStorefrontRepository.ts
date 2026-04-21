import { queryDatabase } from "../../../../core/database/postgresPool";
import type { StorefrontApiCategoryDTO } from "../entities/StorefrontApiCategoryDTO";
import type { StorefrontApiCollectionDTO } from "../entities/StorefrontApiCollectionDTO";
import type { StorefrontApiProductDTO } from "../entities/StorefrontApiProductDTO";
import type { StorefrontApiResponseDTO } from "../entities/StorefrontApiResponseDTO";
import type { StorefrontRepository } from "../../domain/repositories/storefrontRepository";

type CategoryRow = {
  id: string;
  label: string;
};

type CollectionRow = {
  id: string;
  title: string;
  subtitle: string;
};

type ProductRow = {
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

function mapCategoryRow(category: CategoryRow): StorefrontApiCategoryDTO {
  return {
    id: category.id,
    label: category.label,
  };
}

function mapProductRow(product: ProductRow): StorefrontApiProductDTO {
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
  };
}

async function mapCollectionRow(collection: CollectionRow): Promise<StorefrontApiCollectionDTO> {
  const productsResult = await queryDatabase<ProductRow>(
    `
      SELECT
        p.id,
        p.name,
        p.description,
        p.price,
        p.original_price,
        p.badge,
        p.image_url,
        p.category_id,
        p.rating
      FROM storefront_collection_products cp
      INNER JOIN storefront_products p ON p.id = cp.product_id
      WHERE cp.collection_id = $1
      ORDER BY cp.sort_order ASC
    `,
    [collection.id],
  );

  return {
    id: collection.id,
    title: collection.title,
    subtitle: collection.subtitle,
    products: productsResult.rows.map(mapProductRow),
  };
}

export const postgresStorefrontRepository: StorefrontRepository = {
  async getStorefrontContent(): Promise<StorefrontApiResponseDTO> {
    const categoriesResult = await queryDatabase<CategoryRow>(
      `
        SELECT id, label
        FROM storefront_categories
        ORDER BY sort_order ASC
      `,
    );

    const collectionsResult = await queryDatabase<CollectionRow>(
      `
        SELECT id, title, subtitle
        FROM storefront_collections
        ORDER BY sort_order ASC
      `,
    );

    const collections = await Promise.all(collectionsResult.rows.map(mapCollectionRow));

    return {
      categories: categoriesResult.rows.map(mapCategoryRow),
      collections,
    };
  },
};
