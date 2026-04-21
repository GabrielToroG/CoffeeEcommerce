import type { StorefrontApiResponseDTO } from "../../data/entities/StorefrontApiResponseDTO";

export type StorefrontRepository = {
  getStorefrontContent: () => Promise<StorefrontApiResponseDTO>;
};
