import type { AdminProductModel } from '../../entities/AdminProductModel';
import type { SaveAdminProductParams } from '../../repositories/adminCatalogRepository';

export type PostAdminProductUseCaseProtocol = (
  params: SaveAdminProductParams,
) => Promise<AdminProductModel>;
