import { Router } from "express";
import multer from "multer";

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
categoriesRoutes.post("/", createCategoryController.handle);

const importCategoryController = new ImportCategoryController();
categoriesRoutes.post(
  "/csv",
  upload.single("file"),
  importCategoryController.handle
);

export { categoriesRoutes };
