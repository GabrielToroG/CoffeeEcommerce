import type { NextFunction, Request, Response } from "express";
import { HttpError } from "../errors/HttpError";
import type { AuthUserDTO } from "../../features/auth/data/entities/AuthUserDTO";
import { postgresAuthRepository } from "../../features/auth/data/repositories/postgresAuthRepository";

export type AuthenticatedRequest = Request & {
  authToken: string;
  currentUser?: AuthUserDTO;
};

export async function requireAuth(request: Request, _response: Response, next: NextFunction) {
  const authorizationHeader = request.header("Authorization");

  if (!authorizationHeader?.startsWith("Bearer ")) {
    next(new HttpError(401, "Necesitas iniciar sesion para realizar esta accion."));
    return;
  }

  const authToken = authorizationHeader.replace("Bearer ", "").trim();

  if (!authToken) {
    next(new HttpError(401, "Tu sesion no es valida."));
    return;
  }

  const currentUser = await postgresAuthRepository.findUserBySessionToken(authToken);

  if (!currentUser) {
    next(new HttpError(401, "Tu sesion expiro. Inicia sesion nuevamente."));
    return;
  }

  (request as AuthenticatedRequest).currentUser = currentUser;
  (request as AuthenticatedRequest).authToken = authToken;
  next();
}
