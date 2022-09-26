import { inject, injectable } from "tsyringe";
import type { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";

@injectable()
class ListCategoriesUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: CategoriesRepository
  ) {}

  async execute() {
    return await this.categoriesRepository.list();
  }
};

export { ListCategoriesUseCase };