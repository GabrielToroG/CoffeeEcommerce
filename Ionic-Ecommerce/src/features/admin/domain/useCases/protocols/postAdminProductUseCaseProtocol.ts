import type { AdminProductModel } from '../../entities/AdminProductModel';
import type { SaveAdminProductParams } from '../../repositories/adminCatalogRepository';

/**
 * API contract:
 * - Endpoint: `POST /admin/products`
 * - URL params: none
 * - Query params: none
 * - Body:
 *   - `params: SaveAdminProductParams`
 *   - Includes product fields required to create a catalog item
 *     such as name, description, price, image, category, rating and collections.
 */
export type PostAdminProductUseCaseProtocol = (
  params: SaveAdminProductParams,
) => Promise<AdminProductModel>;
