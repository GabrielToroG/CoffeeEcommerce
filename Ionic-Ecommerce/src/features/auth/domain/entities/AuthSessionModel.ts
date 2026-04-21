import type { AuthUserModel } from './AuthUserModel';

export type AuthSessionModel = {
  user: AuthUserModel | null;
  isAuthenticated: boolean;
};
