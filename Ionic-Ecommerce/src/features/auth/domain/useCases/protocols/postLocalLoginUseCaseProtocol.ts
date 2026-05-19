import type { AuthUserModel } from '../../entities/AuthUserModel';
import type { LoginParams } from '../../repositories/authRepository';

export type PostLocalLoginUseCaseProtocol = (params: LoginParams) => Promise<AuthUserModel>;
