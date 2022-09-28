import { inject, injectable } from "tsyringe";
import type { ISpecificationsRepository } from "../../repositories/ISpecificatinosRepository";

@injectable()
class ListSpecificationsUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute() {
    return await this.specificationsRepository.list();
  }
}

export { ListSpecificationsUseCase };
