import { inject, injectable } from "tsyringe";
import type { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";

@injectable()
class ListSpecificationsUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: SpecificationsRepository
  ) {}

  async execute() {
    return await this.specificationsRepository.list();
  }
};

export { ListSpecificationsUseCase };