import type { Request, Response } from "express";
import { postgresAdminCatalogRepository } from "../../data/repositories/postgresAdminCatalogRepository";
import { createAdminProductUseCase } from "../../domain/useCases/createAdminProductUseCase";
import { deleteAdminProductUseCase } from "../../domain/useCases/deleteAdminProductUseCase";
import { getAdminCatalogOptionsUseCase } from "../../domain/useCases/getAdminCatalogOptionsUseCase";
import { getAdminProductsUseCase } from "../../domain/useCases/getAdminProductsUseCase";
import { updateAdminProductUseCase } from "../../domain/useCases/updateAdminProductUseCase";

function readRouteParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

export async function getAdminCatalogOptionsController(_request: Request, response: Response) {
  const options = await getAdminCatalogOptionsUseCase(postgresAdminCatalogRepository);
  response.status(200).json(options);
}

export async function getAdminProductsController(_request: Request, response: Response) {
  const products = await getAdminProductsUseCase(postgresAdminCatalogRepository);
  response.status(200).json(products);
}

export async function createAdminProductController(request: Request, response: Response) {
  const product = await createAdminProductUseCase(postgresAdminCatalogRepository, request.body);
  response.status(201).json(product);
}

export async function updateAdminProductController(request: Request, response: Response) {
  const product = await updateAdminProductUseCase(
    postgresAdminCatalogRepository,
    readRouteParam(request.params.productId),
    request.body,
  );
  response.status(200).json(product);
}

export async function deleteAdminProductController(request: Request, response: Response) {
  await deleteAdminProductUseCase(
    postgresAdminCatalogRepository,
    readRouteParam(request.params.productId),
  );

  response.status(204).send();
}
