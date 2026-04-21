import { environment } from '../../../../core/config/environment';
import type { StorefrontApiResponseDTO } from '../entities/StorefrontApiResponseDTO';

export const storefrontApi = {
  async getStorefrontContent(): Promise<StorefrontApiResponseDTO> {
    const response = await fetch(`${environment.apiBaseUrl}/storefront`);

    if (!response.ok) {
      throw new Error('No pudimos cargar el catalogo en este momento.');
    }

    return response.json() as Promise<StorefrontApiResponseDTO>;
  },
};
