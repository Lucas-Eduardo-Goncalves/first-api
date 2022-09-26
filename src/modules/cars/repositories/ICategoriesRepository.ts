import type { Category } from "../entities/Category";

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  list: () => Promise<Category[]>;
  create: (category: ICreateCategoryDTO) => Promise<void>;
  findByName: (name: string) => Promise<Category | null>;
};

export { ICategoriesRepository, ICreateCategoryDTO };