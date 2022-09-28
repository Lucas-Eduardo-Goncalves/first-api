import { Category } from "../../entities/Category";

import type {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  private categories: Category[] = [];

  async findByName(name: string): Promise<Category | null> {
    const category = this.categories.find((category) => category.name === name);
    return category || null;
  }

  async list(): Promise<Category[]> {
    return this.categories;
  }

  async create(props: ICreateCategoryDTO): Promise<void> {
    const category = new Category();
    Object.assign(category, props);

    this.categories.push(category);
  }
}

export { CategoriesRepositoryInMemory };
