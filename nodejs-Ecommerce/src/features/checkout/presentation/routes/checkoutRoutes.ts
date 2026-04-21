import { Router } from "express";
import { submitCheckoutController } from "../controllers/submitCheckoutController";

export const checkoutRoutes = Router();

checkoutRoutes.post("/checkout", submitCheckoutController);
