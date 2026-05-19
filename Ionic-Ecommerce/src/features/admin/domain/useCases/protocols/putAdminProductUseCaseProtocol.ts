import type { AdminProductModel } from '../../entities/AdminProductModel';
import type { UpdateAdminProductParams } from '../../repositories/adminCatalogRepository';

export type PutAdminProductUseCaseProtocol = (
  productId: string,
  params: UpdateAdminProductParams,
) => Promise<AdminProductModel>;
