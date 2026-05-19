import type { AuthUserModel } from '../entities/AuthUserModel';
import type { AuthRepository, LoginParams } from '../repositories/authRepository';
import type { PostLocalLoginUseCaseProtocol } from './protocols/postLocalLoginUseCaseProtocol';

export function createPostLocalLoginUseCase(
  repository: AuthRepository,
): PostLocalLoginUseCaseProtocol {
  return async function postLocalLoginUseCase(params: LoginParams): Promise<AuthUserModel> {
    if (!params.email.trim()) {
      throw new Error('Ingresa tu correo para iniciar sesion.');
    }

    if (!params.password.trim()) {
      throw new Error('Ingresa tu contrasena para iniciar sesion.');
    }

    return repository.login(params);
  };
}
