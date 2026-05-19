import { createAuthHeaders, handleUnauthorizedSession } from '../../../../network/httpAuth';
import { httpClient } from '../../../../network/httpClient';
import type {
  AdminCatalogDataSourceProtocol,
  CreateAdminProductPayloadDTO,
  UpdateAdminProductPayloadDTO,
} from './adminCatalogDataSourceProtocol';
import type { AdminCatalogOptionsDTO } from '../entities/AdminCatalogOptionsDTO';
import type { AdminProductDTO } from '../entities/AdminProductDTO';

async function parseErrorMessage(response: Response, fallbackMessage: string) {
  const error = (await response.json().catch(() => null)) as { message?: string } | null;
  return error?.message ?? fallbackMessage;
}

async function ensureSuccess(response: Response, fallbackMessage: string) {
  if (response.status === 401) {
    handleUnauthorizedSession();
    throw new Error('Tu sesion expiro. Inicia sesion nuevamente.');
  }

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response, fallbackMessage));
  }
}

export const remoteAdminCatalogDataSource: AdminCatalogDataSourceProtocol = {
  async getCatalogOptions(): Promise<AdminCatalogOptionsDTO> {
    const response = await httpClient.request('/admin/catalog/options', {
      headers: createAuthHeaders(),
    });

    await ensureSuccess(response, 'No fue posible cargar las opciones del catalogo.');
    return response.json() as Promise<AdminCatalogOptionsDTO>;
  },

  async getProducts(): Promise<AdminProductDTO[]> {
    const response = await httpClient.request('/admin/products', {
      headers: createAuthHeaders(),
    });

    await ensureSuccess(response, 'No fue posible cargar los productos.');
    return response.json() as Promise<AdminProductDTO[]>;
  },

  async createProduct(product: CreateAdminProductPayloadDTO): Promise<AdminProductDTO> {
    const response = await httpClient.request('/admin/products', {
      method: 'POST',
      headers: createAuthHeaders(),
      body: JSON.stringify(product),
    });

    await ensureSuccess(response, 'No fue posible crear el producto.');
    return response.json() as Promise<AdminProductDTO>;
  },

  async updateProduct(
    productId: string,
    product: UpdateAdminProductPayloadDTO,
  ): Promise<AdminProductDTO> {
    const response = await httpClient.request(`/admin/products/${productId}`, {
      method: 'PUT',
      headers: createAuthHeaders(),
      body: JSON.stringify(product),
    });

    await ensureSuccess(response, 'No fue posible actualizar el producto.');
    return response.json() as Promise<AdminProductDTO>;
  },

  async deleteProduct(productId: string): Promise<void> {
    const response = await httpClient.request(`/admin/products/${productId}`, {
      method: 'DELETE',
      headers: createAuthHeaders(),
    });

    await ensureSuccess(response, 'No fue posible eliminar el producto.');
  },
};
