import { HttpError } from "../../../../core/errors/HttpError";
import { hashPassword, verifyPassword } from "../../../../core/security/passwordHasher";
import type { AuthRepository, LoginParams } from "../repositories/authRepository";

export async function loginUseCase(repository: AuthRepository, params: LoginParams) {
  const user = await repository.findUserByEmail(params.email);

  if (!user) {
    throw new HttpError(401, "No encontramos una cuenta con esos datos.");
  }

  const passwordValidation = await verifyPassword(params.password, user.password);

  if (!passwordValidation.isValid) {
    throw new HttpError(401, "No encontramos una cuenta con esos datos.");
  }

  if (passwordValidation.shouldUpgradeHash) {
    const hashedPassword = await hashPassword(params.password);
    await repository.updateUserPassword(user.id, hashedPassword);
    user.password = hashedPassword;
  }

  const token = await repository.createSession(user.id);

  return {
    token,
    user,
  };
}
