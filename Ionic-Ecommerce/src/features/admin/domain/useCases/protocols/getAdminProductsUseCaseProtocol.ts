import type { AdminProductModel } from '../../entities/AdminProductModel';

export type GetAdminProductsUseCaseProtocol = () => Promise<AdminProductModel[]>;
