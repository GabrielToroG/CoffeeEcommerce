import cors from "cors";
import express from "express";
import helmet from "helmet";
import { adminCatalogRoutes } from "../../features/admin/presentation/routes/adminCatalogRoutes";
import { environment } from "../config/environment";
import { errorHandler } from "../middleware/errorHandler";
import {
  adminRateLimiter,
  authRateLimiter,
  checkoutRateLimiter,
  globalApiRateLimiter,
} from "../middleware/rateLimiters";
import { authRoutes } from "../../features/auth/presentation/routes/authRoutes";
import { checkoutRoutes } from "../../features/checkout/presentation/routes/checkoutRoutes";
import { healthRoutes } from "../../features/health/presentation/routes/healthRoutes";
import { storefrontRoutes } from "../../features/storefront/presentation/routes/storefrontRoutes";

export const createApp = () => {
  const app = express();

  app.use(
    cors({
      origin: [environment.frontendUrl, "http://localhost:5173", "http://localhost:8100"],
    }),
  );
  app.use(helmet());
  app.use(express.json({ limit: environment.jsonBodyLimit }));
  app.use("/api", healthRoutes);
  app.use("/api", globalApiRateLimiter);
  app.use("/api/auth", authRateLimiter);
  app.use("/api/checkout", checkoutRateLimiter);
  app.use("/api/admin", adminRateLimiter);
  app.use("/api", storefrontRoutes);
  app.use("/api", authRoutes);
  app.use("/api", adminCatalogRoutes);
  app.use("/api", checkoutRoutes);
  app.use(errorHandler);

  return app;
};
