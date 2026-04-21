import type { AuthRepository } from "../repositories/authRepository";

export async function getCurrentUserUseCase(repository: AuthRepository, token: string) {
  return repository.findUserBySessionToken(token);
}
