import type { Request, Response } from "express";
import { postgresStorefrontRepository } from "../../data/repositories/postgresStorefrontRepository";
import { getStorefrontUseCase } from "../../domain/useCases/getStorefrontUseCase";

export async function getStorefrontController(_request: Request, response: Response) {
  const storefront = await getStorefrontUseCase(postgresStorefrontRepository);
  response.status(200).json(storefront);
}
