import type { OrderModel } from '../../entities/OrderModel';

/**
 * API contract:
 * - URL params: none
 * - Query params: none
 * - Body: none
 *
 * Notes:
 * - No direct HTTP request from this use case.
 * - Resolves orders from the authenticated user state already available in the app.
 */
export type GetLocalOrdersUseCaseProtocol = () => OrderModel[];
