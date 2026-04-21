import type { StorefrontRepository } from "../repositories/storefrontRepository";

export async function getStorefrontUseCase(repository: StorefrontRepository) {
  return repository.getStorefrontContent();
}
