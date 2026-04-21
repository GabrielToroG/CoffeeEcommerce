import type { AdminCatalogOptionsModel } from '../entities/AdminCatalogOptionsModel';
import type { AdminProductModel } from '../entities/AdminProductModel';

export type SaveAdminProductParams = Omit<AdminProductModel, 'id'>;

export type UpdateAdminProductParams = SaveAdminProductParams;

export type AdminCatalogRepository = {
  getCatalogOptions: () => Promise<AdminCatalogOptionsModel>;
  getProducts: () => Promise<AdminProductModel[]>;
  createProduct: (params: SaveAdminProductParams) => Promise<AdminProductModel>;
  updateProduct: (productId: string, params: UpdateAdminProductParams) => Promise<AdminProductModel>;
  deleteProduct: (productId: string) => Promise<void>;
};
