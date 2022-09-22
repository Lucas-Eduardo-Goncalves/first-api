import type { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationUseCase {
  constructor(private specificationsRepository: SpecificationsRepository) {}

  execute(props: IRequest) {
    const specificationAlreadyExists = this.specificationsRepository.findByName(props.name);

    if(specificationAlreadyExists) {
      throw new Error("Category already exists.");
    }

    this.specificationsRepository.create(props);
  }
};

export { CreateSpecificationUseCase };