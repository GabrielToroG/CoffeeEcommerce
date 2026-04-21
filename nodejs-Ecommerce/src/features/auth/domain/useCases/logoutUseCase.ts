import type { AuthRepository } from "../repositories/authRepository";

export async function logoutUseCase(repository: AuthRepository, token: string) {
  await repository.removeSession(token);
}
