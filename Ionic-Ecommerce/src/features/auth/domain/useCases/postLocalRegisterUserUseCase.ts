import type { AuthUserModel } from '../entities/AuthUserModel';
import type { AuthRepository, RegisterUserParams } from '../repositories/authRepository';
import type { PostLocalRegisterUserUseCaseProtocol } from './protocols/postLocalRegisterUserUseCaseProtocol';

export function createPostLocalRegisterUserUseCase(
  repository: AuthRepository,
): PostLocalRegisterUserUseCaseProtocol {
  return async function postLocalRegisterUserUseCase(
    params: RegisterUserParams,
  ): Promise<AuthUserModel> {
    if (!params.fullName.trim()) {
      throw new Error('Ingresa tu nombre para crear la cuenta.');
    }

    if (!params.email.trim()) {
      throw new Error('Ingresa tu correo para registrarte.');
    }

    if (!params.address.trim()) {
      throw new Error('Ingresa tu direccion para registrarte.');
    }

    if (!params.password.trim()) {
      throw new Error('Ingresa una contrasena para registrarte.');
    }

    return repository.register(params);
  };
}
