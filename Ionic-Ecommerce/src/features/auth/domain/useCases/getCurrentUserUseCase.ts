import type { AuthUserModel } from '../entities/AuthUserModel';
import type { AuthRepository } from '../repositories/authRepository';

export async function getCurrentUserUseCase(
  repository: AuthRepository,
): Promise<AuthUserModel | null> {
  return repository.getCurrentUser();
}
