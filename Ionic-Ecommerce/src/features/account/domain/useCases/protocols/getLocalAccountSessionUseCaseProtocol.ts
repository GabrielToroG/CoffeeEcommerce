import type { AuthSessionModel } from '../../../../auth/domain/entities/AuthSessionModel';

export type GetLocalAccountSessionUseCaseProtocol = () => AuthSessionModel;
