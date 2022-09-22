import type { Category } from "../model/Category";

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  list: () => Category[];
  create: (category: ICreateCategoryDTO) => void;
  findByName: (name: string) => void;
};

export { ICategoriesRepository, ICreateCategoryDTO };