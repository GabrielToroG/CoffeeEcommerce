import { Router } from "express";
import { getHealthStatusController } from "../controllers/getHealthStatusController";

export const healthRoutes = Router();

healthRoutes.get("/health", getHealthStatusController);
