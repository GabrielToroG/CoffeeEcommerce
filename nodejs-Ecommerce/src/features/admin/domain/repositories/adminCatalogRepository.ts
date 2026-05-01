import type { AdminCatalogOptionsModel } from "../entities/AdminCatalogOptionsModel";
import type { AdminProductModel } from "../entities/AdminProductModel";

export type SaveAdminProductParams = Omit<AdminProductModel, "id">;

export type UpdateAdminProductParams = Partial<SaveAdminProductParams>;

export type AdminCatalogRepository = {
  getCatalogOptions: () => Promise<AdminCatalogOptionsModel>;
  getProducts: () => Promise<AdminProductModel[]>;
  findProductById: (productId: string) => Promise<AdminProductModel | null>;
  createProduct: (params: SaveAdminProductParams) => Promise<AdminProductModel>;
  updateProduct: (productId: string, params: UpdateAdminProductParams) => Promise<AdminProductModel | null>;
  deleteProduct: (productId: string) => Promise<boolean>;
};
