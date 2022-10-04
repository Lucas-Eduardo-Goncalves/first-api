import { Router } from "express";

import { ensureAdmin } from "../shared/middlewares/ensureAdmin";
import { ensureAuthenticated } from "../shared/middlewares/ensureAuthenticated";
import { CreateCarController } from "../modules/cars/useCases/createCar/CreateCarController";
import { ListAvailableCarController } from "../modules/cars/useCases/listAvailableCars/listAvailableCarsController";

const carsRoutes = Router();

const createCarController = new CreateCarController();
carsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

const listAvailableCarController = new ListAvailableCarController();
carsRoutes.get("/", listAvailableCarController.handle);

export { carsRoutes };
