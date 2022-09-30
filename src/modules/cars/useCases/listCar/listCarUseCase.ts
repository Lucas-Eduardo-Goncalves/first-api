import { inject, injectable } from "tsyringe";
import type { ICarsRepository } from "../../repositories/ICarsRepository";

@injectable()
class ListCarUseCase {
  constructor(
    @inject("CarsRepository")
    private carRepository: ICarsRepository
  ) {}

  async execute() {
    return await this.carRepository.list();
  }
}

export { ListCarUseCase };
