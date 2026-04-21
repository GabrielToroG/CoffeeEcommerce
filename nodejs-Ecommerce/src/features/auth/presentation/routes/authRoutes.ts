import { Router } from "express";
import { requireAuth } from "../../../../core/middleware/requireAuth";
import {
  addAddressController,
  getCurrentUserController,
  loginController,
  logoutController,
  registerOrderController,
  registerUserController,
  setDefaultAddressController,
} from "../controllers/authControllers";

export const authRoutes = Router();

authRoutes.post("/auth/login", loginController);
authRoutes.post("/auth/register", registerUserController);
authRoutes.get("/auth/me", requireAuth, getCurrentUserController);
authRoutes.post("/auth/logout", requireAuth, logoutController);
authRoutes.post("/auth/addresses", requireAuth, addAddressController);
authRoutes.patch("/auth/addresses/:addressId/default", requireAuth, setDefaultAddressController);
authRoutes.post("/auth/orders", requireAuth, registerOrderController);
