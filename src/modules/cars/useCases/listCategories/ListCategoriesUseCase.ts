import type { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";

class ListCategoriesUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  execute() {
    return this.categoriesRepository.list();
  }
};

export { ListCategoriesUseCase };