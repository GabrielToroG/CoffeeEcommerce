export interface HealthStatusModel {
  readonly status: "ok";
  readonly service: string;
  readonly timestamp: string;
}
