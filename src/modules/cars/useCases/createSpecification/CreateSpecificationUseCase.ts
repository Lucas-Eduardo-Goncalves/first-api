import { inject, injectable } from "tsyringe";
import type { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: SpecificationsRepository
  ) {}

  async execute(props: IRequest) {
    const specificationAlreadyExists =
      await this.specificationsRepository.findByName(props.name);

    if (specificationAlreadyExists) {
      throw new Error("Category already exists.");
    }

    this.specificationsRepository.create(props);
  }
}

export { CreateSpecificationUseCase };
