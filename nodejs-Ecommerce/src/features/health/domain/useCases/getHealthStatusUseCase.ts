import { HealthStatusModel } from "../entities/HealthStatusModel";

export const getHealthStatusUseCase = (): HealthStatusModel => ({
  status: "ok",
  service: "nodejs-ecommerce",
  timestamp: new Date().toISOString(),
});
