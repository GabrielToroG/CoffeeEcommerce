import type { Request, Response } from "express";
import type { AuthenticatedRequest } from "../../../../core/middleware/requireAuth";
import type { AuthUserDTO } from "../../data/entities/AuthUserDTO";
import { postgresAuthRepository } from "../../data/repositories/postgresAuthRepository";
import { addAddressUseCase } from "../../domain/useCases/addAddressUseCase";
import { getCurrentUserUseCase } from "../../domain/useCases/getCurrentUserUseCase";
import { loginUseCase } from "../../domain/useCases/loginUseCase";
import { logoutUseCase } from "../../domain/useCases/logoutUseCase";
import { registerOrderUseCase } from "../../domain/useCases/registerOrderUseCase";
import { registerUserUseCase } from "../../domain/useCases/registerUserUseCase";
import { setDefaultAddressUseCase } from "../../domain/useCases/setDefaultAddressUseCase";

function sanitizeUser(user: AuthUserDTO) {
  const { password: _password, ...safeUser } = user;
  return safeUser;
}

export async function getCurrentUserController(request: Request, response: Response) {
  const user = await getCurrentUserUseCase(
    postgresAuthRepository,
    (request as AuthenticatedRequest).authToken,
  );

  response.status(200).json(user ? sanitizeUser(user) : null);
}

export async function loginController(request: Request, response: Response) {
  const result = await loginUseCase(postgresAuthRepository, request.body);
  response.status(200).json({
    token: result.token,
    user: sanitizeUser(result.user),
  });
}

export async function registerUserController(request: Request, response: Response) {
  const result = await registerUserUseCase(postgresAuthRepository, request.body);
  response.status(201).json({
    token: result.token,
    user: sanitizeUser(result.user),
  });
}

export async function logoutController(request: Request, response: Response) {
  await logoutUseCase(postgresAuthRepository, (request as AuthenticatedRequest).authToken);
  response.status(204).send();
}

export async function addAddressController(request: Request, response: Response) {
  const user = await addAddressUseCase(
    postgresAuthRepository,
    (request as AuthenticatedRequest).authToken,
    request.body,
  );

  response.status(200).json(sanitizeUser(user));
}

export async function setDefaultAddressController(request: Request, response: Response) {
  const user = await setDefaultAddressUseCase(
    postgresAuthRepository,
    (request as AuthenticatedRequest).authToken,
    String(request.params.addressId ?? ""),
  );

  response.status(200).json(sanitizeUser(user));
}

export async function registerOrderController(request: Request, response: Response) {
  const user = await registerOrderUseCase(
    postgresAuthRepository,
    (request as AuthenticatedRequest).authToken,
    request.body,
  );

  response.status(200).json(sanitizeUser(user));
}
