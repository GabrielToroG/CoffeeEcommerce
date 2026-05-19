/**
 * API contract:
 * - Endpoint: `DELETE /admin/products/:productId`
 * - URL params:
 *   - `productId`
 * - Query params: none
 * - Body: none
 */
export type DeleteAdminProductUseCaseProtocol = (productId: string) => Promise<void>;
