import { HttpError } from "../../../../core/errors/HttpError";
import type { AdminCatalogRepository, UpdateAdminProductParams } from "../repositories/adminCatalogRepository";
import type { AdminProductModel } from "../entities/AdminProductModel";

function validatePriceRelationship(product: AdminProductModel, params: UpdateAdminProductParams) {
  const nextPrice = params.price ?? product.price;
  const nextOriginalPrice = params.originalPrice ?? product.originalPrice;

  if (nextOriginalPrice !== undefined && nextOriginalPrice <= nextPrice) {
    throw new HttpError(400, "El precio original debe ser mayor al precio actual.");
  }
}

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

  if (params.rating !== undefined && params.rating > 5) {
    throw new HttpError(400, "El rating debe estar entre 0.1 y 5.");
  }

  if (params.collectionIds !== undefined && params.collectionIds.length === 0) {
    throw new HttpError(400, "El producto debe pertenecer al menos a una coleccion.");
  }

  const currentProduct = await repository.findProductById(productId);

  if (!currentProduct) {
    throw new HttpError(404, "No encontramos el producto que quieres actualizar.");
  }

  validatePriceRelationship(currentProduct, params);

  const updatedProduct = await repository.updateProduct(productId, params);

  if (!updatedProduct) {
    throw new HttpError(404, "No encontramos el producto que quieres actualizar.");
  }

  return updatedProduct;
}
