import { Router } from "express";
import multer from "multer";

import { ensureAdmin } from "../shared/middlewares/ensureAdmin";
import { ensureAuthenticated } from "../shared/middlewares/ensureAuthenticated";

import { CreateCategoryController } from "../modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "../modules/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "../modules/cars/useCases/listCategories/ListCategoriesController";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

// middlewate para validação de token
categoriesRoutes.use(ensureAuthenticated);

const listCategoriesController = new ListCategoriesController();
categoriesRoutes.get("/", listCategoriesController.handle);

const createCategoryController = new CreateCategoryController();
categoriesRoutes.post("/", ensureAdmin, createCategoryController.handle);

const importCategoryController = new ImportCategoryController();
categoriesRoutes.post(
  "/csv",
  upload.single("file"),
  ensureAdmin,
  importCategoryController.handle
);

export { categoriesRoutes };
