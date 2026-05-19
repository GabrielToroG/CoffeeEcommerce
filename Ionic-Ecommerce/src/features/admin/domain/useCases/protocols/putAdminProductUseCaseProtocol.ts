import type { AdminProductModel } from '../../entities/AdminProductModel';
import type { UpdateAdminProductParams } from '../../repositories/adminCatalogRepository';

/**
 * API contract:
 * - Endpoint: `PUT /admin/products/:productId`
 * - URL params:
 *   - `productId`
 * - Query params: none
 * - Body:
 *   - `params: UpdateAdminProductParams`
 *   - Includes editable product fields such as name, description, price,
 *     image, category, rating, badge and collections.
 */
export type PutAdminProductUseCaseProtocol = (
  productId: string,
  params: UpdateAdminProductParams,
) => Promise<AdminProductModel>;
