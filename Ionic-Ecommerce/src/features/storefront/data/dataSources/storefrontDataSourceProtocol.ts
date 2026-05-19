import type { StorefrontApiResponseDTO } from '../entities/StorefrontApiResponseDTO';

export type StorefrontDataSourceProtocol = {
  getStorefrontContent: () => Promise<StorefrontApiResponseDTO>;
};
