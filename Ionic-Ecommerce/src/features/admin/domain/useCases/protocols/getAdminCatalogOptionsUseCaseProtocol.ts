import type { AdminCatalogOptionsModel } from '../../entities/AdminCatalogOptionsModel';

/**
 * API contract:
 * - Endpoint: `GET /admin/catalog/options`
 * - URL params: none
 * - Query params: none
 * - Body: none
 */
export type GetAdminCatalogOptionsUseCaseProtocol = () => Promise<AdminCatalogOptionsModel>;
