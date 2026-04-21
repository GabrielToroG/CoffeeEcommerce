import type { AuthRepository } from '../repositories/authRepository';

export async function logoutUseCase(repository: AuthRepository): Promise<void> {
  await repository.logout();
}
