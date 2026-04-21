import { HttpError } from "../../../../core/errors/HttpError";
import type { AuthRepository } from "../repositories/authRepository";

export async function setDefaultAddressUseCase(
  repository: AuthRepository,
  token: string,
  addressId: string,
) {
  const normalizedAddressId = addressId.trim();

  if (!normalizedAddressId) {
    throw new HttpError(400, "Selecciona una direccion valida.");
  }

  const user = await repository.setDefaultAddress(token, normalizedAddressId);

  if (!user) {
    throw new HttpError(404, "No encontramos la direccion que quieres usar por defecto.");
  }

  return user;
}
