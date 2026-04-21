import { Request, Response } from "express";
import { getHealthStatusUseCase } from "../../domain/useCases/getHealthStatusUseCase";

export const getHealthStatusController = (_request: Request, response: Response): void => {
  const healthStatus = getHealthStatusUseCase();

  response.status(200).json(healthStatus);
};
