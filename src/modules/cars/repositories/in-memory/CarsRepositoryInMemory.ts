import { Car } from "../../entities/Car";
import type { ICreateCarDTO, ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  private cars: Car[] = [];

  async create(props: ICreateCarDTO): Promise<void> {
    const car = new Car();
    Object.assign(car, props);

    this.cars.push(car);
  }

  async findByLicensePlate(licensePlate: string): Promise<Car | null> {
    const car = this.cars.find((car) => car.license_plate === licensePlate);
    return car || null;
  }
}

export { CarsRepositoryInMemory };
