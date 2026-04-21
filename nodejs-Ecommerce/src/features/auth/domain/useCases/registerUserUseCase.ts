import { HttpError } from "../../../../core/errors/HttpError";
import { hashPassword } from "../../../../core/security/passwordHasher";
import type { AuthRepository, RegisterUserParams } from "../repositories/authRepository";

export async function registerUserUseCase(repository: AuthRepository, params: RegisterUserParams) {
  if (
    !params.fullName.trim() ||
    !params.email.trim() ||
    !params.address.trim() ||
    !params.password.trim()
  ) {
    throw new HttpError(400, "Completa todos los campos para crear tu cuenta.");
  }

  const existingUser = await repository.findUserByEmail(params.email);

  if (existingUser) {
    throw new HttpError(409, "Ese correo ya esta registrado.");
  }

  const hashedPassword = await hashPassword(params.password.trim());
  const user = await repository.createUser({
    ...params,
    password: hashedPassword,
  });
  const token = await repository.createSession(user.id);

  return {
    token,
    user,
  };
}
