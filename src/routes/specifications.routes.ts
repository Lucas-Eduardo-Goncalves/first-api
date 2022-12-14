import { Router } from "express";

import { ensureAdmin } from "../shared/middlewares/ensureAdmin";
import { ensureAuthenticated } from "../shared/middlewares/ensureAuthenticated";

import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ListSpecificationsController } from "../modules/cars/useCases/listSpecifications/ListSpecificationsController";

const specificationsRoutes = Router();

// middlewate para validação de token
specificationsRoutes.use(ensureAuthenticated);

const createSpecificationController = new CreateSpecificationController();
specificationsRoutes.post(
  "/",
  ensureAdmin,
  createSpecificationController.handle
);

const listSpecificationsController = new ListSpecificationsController();
specificationsRoutes.get("/", listSpecificationsController.handle);

export { specificationsRoutes };
