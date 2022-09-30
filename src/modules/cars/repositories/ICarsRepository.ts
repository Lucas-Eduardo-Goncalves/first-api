import type { Car } from "../entities/Car";

interface ICreateCarDTO {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

interface ICarsRepository {
  create: (props: ICreateCarDTO) => Promise<void>;
  list: () => Promise<Car[]>;
  findByLicensePlate: (licensePlate: string) => Promise<Car | null>;
}

export { ICreateCarDTO, ICarsRepository };
