import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppErrors";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute(props: IRequest) {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      props.name
    );

    if (categoryAlreadyExists) {
      throw new AppError("Category already exists.");
    }

    await this.categoriesRepository.create(props);
  }
}

export { CreateCategoryUseCase };
