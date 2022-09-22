import type { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  execute(props: IRequest) {
    const categoryAlreadyExists = this.categoriesRepository.findByName(props.name);

    if(categoryAlreadyExists) {
      throw new Error("Category already exists.");
    }

    this.categoriesRepository.create(props);
  }
};

export { CreateCategoryUseCase };