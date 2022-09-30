import AppDataSource from "../../../../database";
import { Repository } from "typeorm";

import { Car } from "../../entities/Car";
import type { ICarsRepository, ICreateCarDTO } from "../ICarsRepository";

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = AppDataSource.getRepository(Car);
  }

  async list() {
    const cars = await this.repository.find();
    return cars;
  }

  async create(props: ICreateCarDTO): Promise<void> {
    const car = this.repository.create(props);
    await this.repository.save(car);
  }

  async findByLicensePlate(licensePlate: string): Promise<Car | null> {
    const car = await this.repository.findOne({
      where: { license_plate: licensePlate },
    });

    return car;
  }
}

export { CarsRepository };
