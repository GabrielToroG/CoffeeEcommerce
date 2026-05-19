import type { AuthUserModel } from '../entities/AuthUserModel';
import type { AuthRepository, RegisterOrderParams } from '../repositories/authRepository';
import type { PostLocalRegisterOrderUseCaseProtocol } from './protocols/postLocalRegisterOrderUseCaseProtocol';

export function createPostLocalRegisterOrderUseCase(
  repository: AuthRepository,
): PostLocalRegisterOrderUseCaseProtocol {
  return async function postLocalRegisterOrderUseCase(
    params: RegisterOrderParams,
  ): Promise<AuthUserModel | null> {
    if (params.total <= 0 || params.itemsCount <= 0 || params.items.length === 0) {
      return null;
    }

    return repository.registerOrder(params);
  };
}
