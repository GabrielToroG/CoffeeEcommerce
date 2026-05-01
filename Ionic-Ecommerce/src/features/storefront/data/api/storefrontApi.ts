import { httpClient } from '../../../../network/httpClient';
import type { StorefrontApiResponseDTO } from '../entities/StorefrontApiResponseDTO';

export const storefrontApi = {
  async getStorefrontContent(): Promise<StorefrontApiResponseDTO> {
    const response = await httpClient.request('/storefront');

    if (!response.ok) {
      throw new Error('No pudimos cargar el catalogo en este momento.');
    }

    return response.json() as Promise<StorefrontApiResponseDTO>;
  },
};
