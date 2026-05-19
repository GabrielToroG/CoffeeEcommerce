import { httpClient } from '../../../../network/httpClient';
import type { StorefrontApiResponseDTO } from '../entities/StorefrontApiResponseDTO';
import type { StorefrontDataSourceProtocol } from './storefrontDataSourceProtocol';

export const mockStorefrontDataSource: StorefrontDataSourceProtocol = {
  async getStorefrontContent(): Promise<StorefrontApiResponseDTO> {
    const response = await httpClient.request('/storefront');

    if (!response.ok) {
      throw new Error('No pudimos cargar el catalogo en este momento.');
    }

    return response.json() as Promise<StorefrontApiResponseDTO>;
  },
};
