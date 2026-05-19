import type { AdminCatalogOptionsDTO } from '../entities/AdminCatalogOptionsDTO';
import type { AdminProductDTO } from '../entities/AdminProductDTO';

export type CreateAdminProductPayloadDTO = Omit<AdminProductDTO, 'id'>;
export type UpdateAdminProductPayloadDTO = CreateAdminProductPayloadDTO;

export type AdminCatalogDataSourceProtocol = {
  getCatalogOptions: () => Promise<AdminCatalogOptionsDTO>;
  getProducts: () => Promise<AdminProductDTO[]>;
  createProduct: (product: CreateAdminProductPayloadDTO) => Promise<AdminProductDTO>;
  updateProduct: (
    productId: string,
    product: UpdateAdminProductPayloadDTO,
  ) => Promise<AdminProductDTO>;
  deleteProduct: (productId: string) => Promise<void>;
};
