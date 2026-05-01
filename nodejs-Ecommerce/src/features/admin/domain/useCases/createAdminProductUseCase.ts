import { HttpError } from "../../../../core/errors/HttpError";
import type { AdminCatalogRepository, SaveAdminProductParams } from "../repositories/adminCatalogRepository";

function validateProduct(params: SaveAdminProductParams) {
  if (
    !params.name.trim() ||
    !params.description.trim() ||
    !params.imageUrl.trim() ||
    !params.categoryId.trim() ||
    params.collectionIds.length === 0
  ) {
    throw new HttpError(400, "Completa todos los campos requeridos del producto.");
  }

  if (params.price <= 0 || params.rating <= 0) {
    throw new HttpError(400, "Precio y rating deben ser mayores a cero.");
  }

  if (params.rating > 5) {
    throw new HttpError(400, "El rating debe estar entre 0.1 y 5.");
  }

  if (params.originalPrice !== undefined && params.originalPrice <= params.price) {
    throw new HttpError(400, "El precio original debe ser mayor al precio actual.");
  }
}

export async function createAdminProductUseCase(
  repository: AdminCatalogRepository,
  params: SaveAdminProductParams,
) {
  validateProduct(params);
  return repository.createProduct(params);
}
