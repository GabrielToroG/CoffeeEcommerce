import type { StorefrontContentModel } from '../../entities/StorefrontContentModel';

/**
 * API contract:
 * - Endpoint: `GET /storefront`
 * - URL params: none
 * - Query params: none
 * - Body: none
 */
export type GetLocalStorefrontUseCaseProtocol = () => Promise<StorefrontContentModel>;
