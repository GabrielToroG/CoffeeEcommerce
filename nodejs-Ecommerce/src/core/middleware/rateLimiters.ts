import rateLimit from "express-rate-limit";
import { environment } from "../config/environment";

function createRateLimiter(max: number, scope: string) {
  return rateLimit({
    windowMs: environment.rateLimitWindowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      message: `Demasiadas solicitudes en ${scope}. Intenta nuevamente en unos segundos.`,
    },
  });
}

export const globalApiRateLimiter = createRateLimiter(
  environment.rateLimitMaxRequests,
  "la API",
);

export const authRateLimiter = createRateLimiter(
  environment.authRateLimitMaxRequests,
  "autenticacion",
);

export const checkoutRateLimiter = createRateLimiter(
  environment.checkoutRateLimitMaxRequests,
  "checkout",
);

export const adminRateLimiter = createRateLimiter(
  environment.adminRateLimitMaxRequests,
  "administracion",
);
