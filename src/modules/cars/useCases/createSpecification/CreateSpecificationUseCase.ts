import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppErrors";
import type { ISpecificationsRepository } from "../../repositories/ISpecificatinosRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute(props: IRequest) {
    const specificationAlreadyExists =
      await this.specificationsRepository.findByName(props.name);

    if (specificationAlreadyExists) {
      throw new AppError("Specification already exists.");
    }

    this.specificationsRepository.create(props);
  }
}

export { CreateSpecificationUseCase };
