import type { NextFunction, Request, Response } from "express";
import { HttpError } from "../errors/HttpError";
import type { AuthenticatedRequest } from "./requireAuth";
import { postgresAuthRepository } from "../../features/auth/data/repositories/postgresAuthRepository";

export async function requireAdmin(request: Request, _response: Response, next: NextFunction) {
  const authenticatedRequest = request as AuthenticatedRequest;
  const currentUser =
    authenticatedRequest.currentUser ??
    (await postgresAuthRepository.findUserBySessionToken(authenticatedRequest.authToken));

  if (!currentUser) {
    next(new HttpError(401, "Necesitas iniciar sesion para acceder a esta seccion."));
    return;
  }

  if (currentUser.role !== "admin") {
    next(new HttpError(403, "No tienes permisos para administrar el catalogo."));
    return;
  }

  authenticatedRequest.currentUser = currentUser;
  next();
}
