import { Car } from "../../entities/Car";
import type { ICreateCarDTO, ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  private cars: Car[] = [];

  async listCarsAvailable(category_id?: string, brand?: string, name?: string) {
    const carsAvailable = this.cars.filter((car) => car.available === true);

    if (category_id || brand || name) {
      return carsAvailable.filter((car) => {
        if (
          (category_id && car.category_id === category_id) ||
          (brand && car.brand === brand) ||
          (name && car.name === name)
        ) {
          return car;
        }

        return null;
      });
    }

    return carsAvailable;
  }

  async findByLicensePlate(licensePlate: string): Promise<Car | null> {
    const car = this.cars.find((car) => car.license_plate === licensePlate);
    return car || null;
  }

  async create(props: ICreateCarDTO): Promise<void> {
    const car = new Car();
    Object.assign(car, props);

    this.cars.push(car);
  }
}

export { CarsRepositoryInMemory };
