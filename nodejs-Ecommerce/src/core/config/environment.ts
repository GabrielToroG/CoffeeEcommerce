import { existsSync } from "fs";
import path from "path";
import dotenv from "dotenv";

const DEFAULT_NODE_ENV = "development";
const runtimeNodeEnv = process.env.NODE_ENV ?? DEFAULT_NODE_ENV;
const environmentFilePath = path.resolve(process.cwd(), `.env.${runtimeNodeEnv}`);
const fallbackEnvironmentFilePath = path.resolve(process.cwd(), ".env");

if (existsSync(environmentFilePath)) {
  dotenv.config({ path: environmentFilePath });
} else if (existsSync(fallbackEnvironmentFilePath)) {
  dotenv.config({ path: fallbackEnvironmentFilePath });
} else {
  dotenv.config();
}

const DEFAULT_PORT = 3000;
const DEFAULT_FRONTEND_URL = "http://localhost:8100";
const DEFAULT_DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/coffee_ecommerce_dev";
const DEFAULT_DATABASE_SSL = false;
const DEFAULT_SESSION_TTL_HOURS = 24;
const DEFAULT_JSON_BODY_LIMIT = "100kb";
const DEFAULT_RATE_LIMIT_WINDOW_MS = 60_000;
const DEFAULT_RATE_LIMIT_MAX_REQUESTS = 300;
const DEFAULT_AUTH_RATE_LIMIT_MAX_REQUESTS = 20;
const DEFAULT_CHECKOUT_RATE_LIMIT_MAX_REQUESTS = 30;
const DEFAULT_ADMIN_RATE_LIMIT_MAX_REQUESTS = 60;
const DEFAULT_ADMIN_FULL_NAME = "Administrador Coffee";
const DEFAULT_ADMIN_EMAIL = "admin@coffeeecommerce.local";
const DEFAULT_ADMIN_PASSWORD = "admin1234";

export const environment = {
  port: Number(process.env.PORT ?? DEFAULT_PORT),
  nodeEnv: runtimeNodeEnv,
  frontendUrl: process.env.FRONTEND_URL ?? DEFAULT_FRONTEND_URL,
  databaseUrl: process.env.DATABASE_URL ?? DEFAULT_DATABASE_URL,
  databaseSsl:
    (process.env.DATABASE_SSL ?? String(DEFAULT_DATABASE_SSL)).toLowerCase() === "true",
  sessionTtlHours: Number(process.env.SESSION_TTL_HOURS ?? DEFAULT_SESSION_TTL_HOURS),
  jsonBodyLimit: process.env.JSON_BODY_LIMIT ?? DEFAULT_JSON_BODY_LIMIT,
  rateLimitWindowMs: Number(process.env.RATE_LIMIT_WINDOW_MS ?? DEFAULT_RATE_LIMIT_WINDOW_MS),
  rateLimitMaxRequests: Number(
    process.env.RATE_LIMIT_MAX_REQUESTS ?? DEFAULT_RATE_LIMIT_MAX_REQUESTS,
  ),
  authRateLimitMaxRequests: Number(
    process.env.AUTH_RATE_LIMIT_MAX_REQUESTS ?? DEFAULT_AUTH_RATE_LIMIT_MAX_REQUESTS,
  ),
  checkoutRateLimitMaxRequests: Number(
    process.env.CHECKOUT_RATE_LIMIT_MAX_REQUESTS ?? DEFAULT_CHECKOUT_RATE_LIMIT_MAX_REQUESTS,
  ),
  adminRateLimitMaxRequests: Number(
    process.env.ADMIN_RATE_LIMIT_MAX_REQUESTS ?? DEFAULT_ADMIN_RATE_LIMIT_MAX_REQUESTS,
  ),
  adminFullName: process.env.ADMIN_FULL_NAME ?? DEFAULT_ADMIN_FULL_NAME,
  adminEmail: process.env.ADMIN_EMAIL ?? DEFAULT_ADMIN_EMAIL,
  adminPassword: process.env.ADMIN_PASSWORD ?? DEFAULT_ADMIN_PASSWORD,
};
