import type { AuthAddressDTO } from "./AuthAddressDTO";
import type { AuthOrderDTO } from "./AuthOrderDTO";

export type AuthUserDTO = {
  id: string;
  fullName: string;
  email: string;
  role: "customer" | "admin";
  address: string;
  addresses: AuthAddressDTO[];
  orders: AuthOrderDTO[];
  password: string;
};
