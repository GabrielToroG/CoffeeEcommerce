import type { AdminCatalogOptionsModel } from "../entities/AdminCatalogOptionsModel";
import type { AdminProductModel } from "../entities/AdminProductModel";

export type SaveAdminProductParams = Omit<AdminProductModel, "id">;

export type UpdateAdminProductParams = Partial<SaveAdminProductParams>;

export type AdminCatalogRepository = {
  getCatalogOptions: () => Promise<AdminCatalogOptionsModel>;
  getProducts: () => Promise<AdminProductModel[]>;
  createProduct: (params: SaveAdminProductParams) => Promise<AdminProductModel>;
  updateProduct: (productId: string, params: UpdateAdminProductParams) => Promise<AdminProductModel | null>;
  deleteProduct: (productId: string) => Promise<boolean>;
};
