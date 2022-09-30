import { container } from "tsyringe";

import { CategoriesRepository } from "../../modules/cars/repositories/implementations/CategoriesRepository";
import type { ICategoriesRepository } from "../../modules/cars/repositories/ICategoriesRepository";

import { SpecificationsRepository } from "../../modules/cars/repositories/implementations/SpecificationsRepository";
import type { ISpecificationsRepository } from "../../modules/cars/repositories/ISpecificatinosRepository";

import { CarsRepository } from "../../modules/cars/repositories/implementations/CarsRepository";
import type { ICarsRepository } from "../../modules/cars/repositories/ICarsRepository";

import { UsersRepository } from "../../modules/accounts/repositories/implementations/UsersRepository";
import type { IUsersRepository } from "../../modules/accounts/repositories/IUserRepositories";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
);

container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);
