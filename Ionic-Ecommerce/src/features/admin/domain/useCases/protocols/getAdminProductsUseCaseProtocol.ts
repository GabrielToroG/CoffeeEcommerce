import type { AdminProductModel } from '../../entities/AdminProductModel';

/**
 * API contract:
 * - Endpoint: `GET /admin/products`
 * - URL params: none
 * - Query params: none
 * - Body: none
 */
export type GetAdminProductsUseCaseProtocol = () => Promise<AdminProductModel[]>;
