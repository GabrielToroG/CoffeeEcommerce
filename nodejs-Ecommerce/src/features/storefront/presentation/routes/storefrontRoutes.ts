import { Router } from "express";
import { getStorefrontController } from "../controllers/getStorefrontController";

export const storefrontRoutes = Router();

storefrontRoutes.get("/storefront", getStorefrontController);
