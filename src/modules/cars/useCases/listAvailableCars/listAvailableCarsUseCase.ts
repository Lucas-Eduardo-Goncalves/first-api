import { inject, injectable } from "tsyringe";
import type { ICarsRepository } from "../../repositories/ICarsRepository";

interface IRequest {
  category_id?: string;
  brand?: string;
  name?: string;
}

@injectable()
class ListAvailableCarUseCase {
  constructor(
    @inject("CarsRepository")
    private carRepository: ICarsRepository
  ) {}

  async execute({ category_id = "", brand = "", name = "" }: IRequest) {
    return await this.carRepository.listCarsAvailable(category_id, brand, name);
  }
}

export { ListAvailableCarUseCase };
