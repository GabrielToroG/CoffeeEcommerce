import { HttpError } from "../../../../core/errors/HttpError";
import type { AuthRepository, RegisterOrderParams } from "../repositories/authRepository";

export async function registerOrderUseCase(
  repository: AuthRepository,
  token: string,
  params: RegisterOrderParams,
) {
  if (!params.deliveryAddress.trim() || !params.paymentMethod.trim() || params.items.length === 0) {
    throw new HttpError(400, "No pudimos registrar este pedido con los datos entregados.");
  }

  const user = await repository.registerOrder(token, params);

  if (!user) {
    throw new HttpError(401, "Necesitas iniciar sesion para guardar pedidos.");
  }

  return user;
}
