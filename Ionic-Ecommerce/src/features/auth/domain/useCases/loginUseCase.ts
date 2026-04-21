import type { AuthUserModel } from '../entities/AuthUserModel';
import type { AuthRepository, LoginParams } from '../repositories/authRepository';

export async function loginUseCase(
  repository: AuthRepository,
  params: LoginParams,
): Promise<AuthUserModel> {
  if (!params.email.trim()) {
    throw new Error('Ingresa tu correo para iniciar sesion.');
  }

  if (!params.password.trim()) {
    throw new Error('Ingresa tu contrasena para iniciar sesion.');
  }

  return repository.login(params);
}
