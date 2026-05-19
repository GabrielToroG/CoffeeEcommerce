import type { AuthUserModel } from '../../entities/AuthUserModel';

export type GetLocalCurrentUserUseCaseProtocol = () => Promise<AuthUserModel | null>;
