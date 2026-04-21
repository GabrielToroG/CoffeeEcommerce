import type { Request, Response } from "express";
import { submitCheckoutUseCase } from "../../domain/useCases/submitCheckoutUseCase";

export async function submitCheckoutController(request: Request, response: Response) {
  await submitCheckoutUseCase(request.body);
  response.status(204).send();
}
