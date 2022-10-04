import AppDataSource from "../../../../database";
import { Repository } from "typeorm";

import { Car } from "../../entities/Car";
import type { ICarsRepository, ICreateCarDTO } from "../ICarsRepository";

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = AppDataSource.getRepository(Car);
  }

  async listCarsAvailable(category_id?: string, brand?: string, name?: string) {
    const carsQuery = this.repository
      .createQueryBuilder("c")
      .where("available = :available", { available: true });

    if (category_id) {
      carsQuery.andWhere("c.category_id = :category_id", { category_id });
    }

    if (brand) {
      carsQuery.andWhere("c.brand = :brand", { brand });
    }

    if (name) {
      carsQuery.andWhere("c.name = :name", { name });
    }

    return await carsQuery.getMany();
  }

  async findByLicensePlate(licensePlate: string): Promise<Car | null> {
    const car = await this.repository.findOne({
      where: { license_plate: licensePlate },
    });

    return car;
  }

  async create(props: ICreateCarDTO): Promise<void> {
    const car = this.repository.create(props);
    await this.repository.save(car);
  }
}

export { CarsRepository };
