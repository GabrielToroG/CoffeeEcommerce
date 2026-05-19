import type { AdminCatalogOptionsDTO } from '../entities/AdminCatalogOptionsDTO';
import type { AdminProductDTO } from '../entities/AdminProductDTO';
import type { AdminCatalogOptionsModel } from '../../domain/entities/AdminCatalogOptionsModel';
import type { AdminCatalogOptionModel } from '../../domain/entities/AdminCatalogOptionModel';
import type { AdminProductModel } from '../../domain/entities/AdminProductModel';
import type {
  AdminCatalogRepository,
  SaveAdminProductParams,
  UpdateAdminProductParams,
} from '../../domain/repositories/adminCatalogRepository';
import type {
  AdminCatalogDataSourceProtocol,
  CreateAdminProductPayloadDTO,
  UpdateAdminProductPayloadDTO,
} from '../dataSources/adminCatalogDataSourceProtocol';

function mapOption(option: AdminCatalogOptionsDTO['categories'][number]): AdminCatalogOptionModel {
  return {
    id: option.id,
    label: option.label ?? option.title ?? option.id,
  };
}

function mapProduct(product: AdminProductDTO): AdminProductModel {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    originalPrice: product.originalPrice,
    badge: product.badge,
    imageUrl: product.imageUrl,
    categoryId: product.categoryId,
    rating: product.rating,
    collectionIds: product.collectionIds,
  };
}

function mapProductParams(
  product: SaveAdminProductParams | UpdateAdminProductParams,
): CreateAdminProductPayloadDTO | UpdateAdminProductPayloadDTO {
  return {
    name: product.name,
    description: product.description,
    price: product.price,
    originalPrice: product.originalPrice,
    badge: product.badge,
    imageUrl: product.imageUrl,
    categoryId: product.categoryId,
    rating: product.rating,
    collectionIds: product.collectionIds,
  };
}

export function createRemoteAdminCatalogRepository(
  dataSource: AdminCatalogDataSourceProtocol,
): AdminCatalogRepository {
  return {
    async getCatalogOptions(): Promise<AdminCatalogOptionsModel> {
      const options = await dataSource.getCatalogOptions();

      return {
        categories: options.categories.map(mapOption),
        collections: options.collections.map(mapOption),
      };
    },

    async getProducts(): Promise<AdminProductModel[]> {
      const products = await dataSource.getProducts();
      return products.map(mapProduct);
    },

    async createProduct(params: SaveAdminProductParams) {
      const product = await dataSource.createProduct(mapProductParams(params));
      return mapProduct(product);
    },

    async updateProduct(productId: string, params: UpdateAdminProductParams) {
      const product = await dataSource.updateProduct(productId, mapProductParams(params));
      return mapProduct(product);
    },

    async deleteProduct(productId: string) {
      await dataSource.deleteProduct(productId);
    },
  };
}
