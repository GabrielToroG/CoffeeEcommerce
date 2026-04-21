import { HttpError } from "../../../../core/errors/HttpError";
import type { AddAddressParams, AuthRepository } from "../repositories/authRepository";

export async function addAddressUseCase(
  repository: AuthRepository,
  token: string,
  params: AddAddressParams,
) {
  if (!params.label.trim() || !params.fullAddress.trim()) {
    throw new HttpError(400, "Completa un nombre y una direccion validos.");
  }

  const user = await repository.addAddress(token, params);

  if (!user) {
    throw new HttpError(401, "Necesitas iniciar sesion para guardar direcciones.");
  }

  return user;
}
