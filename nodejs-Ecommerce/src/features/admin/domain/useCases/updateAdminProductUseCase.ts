import { HttpError } from "../../../../core/errors/HttpError";
import type { AdminCatalogRepository, UpdateAdminProductParams } from "../repositories/adminCatalogRepository";

export async function updateAdminProductUseCase(
  repository: AdminCatalogRepository,
  productId: string,
  params: UpdateAdminProductParams,
) {
  if (!productId.trim()) {
    throw new HttpError(400, "El producto a actualizar no es valido.");
  }

  if (params.price !== undefined && params.price <= 0) {
    throw new HttpError(400, "El precio debe ser mayor a cero.");
  }

  if (params.rating !== undefined && params.rating <= 0) {
    throw new HttpError(400, "El rating debe ser mayor a cero.");
  }

  if (params.collectionIds !== undefined && params.collectionIds.length === 0) {
    throw new HttpError(400, "El producto debe pertenecer al menos a una coleccion.");
  }

  const updatedProduct = await repository.updateProduct(productId, params);

  if (!updatedProduct) {
    throw new HttpError(404, "No encontramos el producto que quieres actualizar.");
  }

  return updatedProduct;
}
