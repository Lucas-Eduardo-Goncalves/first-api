import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppErrors";
import type { ICarsRepository } from "../../repositories/ICarsRepository";

interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

@injectable()
class CreateCarUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute(props: IRequest): Promise<void> {
    const carAlreadyExists = await this.carsRepository.findByLicensePlate(
      props.license_plate
    );

    if (carAlreadyExists) {
      throw new AppError("Car already exists!");
    }

    await this.carsRepository.create(props);
  }
}

export { CreateCarUseCase };
