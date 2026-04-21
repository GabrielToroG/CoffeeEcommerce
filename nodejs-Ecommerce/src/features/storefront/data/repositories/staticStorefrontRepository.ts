import { storefrontCatalog } from "../api/storefrontCatalog";
import type { StorefrontApiResponseDTO } from "../entities/StorefrontApiResponseDTO";
import type { StorefrontRepository } from "../../domain/repositories/storefrontRepository";

export const staticStorefrontRepository: StorefrontRepository = {
  async getStorefrontContent(): Promise<StorefrontApiResponseDTO> {
    return storefrontCatalog;
  },
};
