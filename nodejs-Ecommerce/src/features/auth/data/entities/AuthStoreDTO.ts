import type { AuthUserDTO } from "./AuthUserDTO";

export type AuthStoreDTO = {
  users: AuthUserDTO[];
  sessions: Record<string, string>;
};
