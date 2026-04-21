import { Router } from "express";
import { requireAdmin } from "../../../../core/middleware/requireAdmin";
import { requireAuth } from "../../../../core/middleware/requireAuth";
import {
  createAdminProductController,
  deleteAdminProductController,
  getAdminCatalogOptionsController,
  getAdminProductsController,
  updateAdminProductController,
} from "../controllers/adminCatalogControllers";

export const adminCatalogRoutes = Router();

adminCatalogRoutes.use("/admin", requireAuth, requireAdmin);
adminCatalogRoutes.get("/admin/catalog/options", getAdminCatalogOptionsController);
adminCatalogRoutes.get("/admin/products", getAdminProductsController);
adminCatalogRoutes.post("/admin/products", createAdminProductController);
adminCatalogRoutes.put("/admin/products/:productId", updateAdminProductController);
adminCatalogRoutes.delete("/admin/products/:productId", deleteAdminProductController);
