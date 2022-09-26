import { container } from "tsyringe";

import { CategoriesRepository } from "../../modules/cars/repositories/implementations/CategoriesRepository"; 
import { SpecificationsRepository } from "../../modules/cars/repositories/implementations/SpecificationsRepository"; 
import type { ICategoriesRepository } from "../../modules/cars/repositories/ICategoriesRepository"; 
import type { ISpecificationsRepository } from "../../modules/cars/repositories/ISpecificatinosRepository";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
)

container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
)