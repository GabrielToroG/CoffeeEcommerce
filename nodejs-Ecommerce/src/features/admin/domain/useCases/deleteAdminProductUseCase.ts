import { HttpError } from "../../../../core/errors/HttpError";
import type { AdminCatalogRepository } from "../repositories/adminCatalogRepository";

export async function deleteAdminProductUseCase(
  repository: AdminCatalogRepository,
  productId: string,
) {
  if (!productId.trim()) {
    throw new HttpError(400, "El producto a eliminar no es valido.");
  }

  const wasDeleted = await repository.deleteProduct(productId);

  if (!wasDeleted) {
    throw new HttpError(404, "No encontramos el producto que quieres eliminar.");
  }
}
