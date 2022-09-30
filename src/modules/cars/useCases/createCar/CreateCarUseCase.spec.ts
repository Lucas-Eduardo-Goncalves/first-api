import { AppError } from "../../../../shared/errors/AppErrors";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe("Create car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("Should be able to create a new car.", async () => {
    const carProps = {
      name: "nameCar",
      description: "descriptionCar",
      daily_rate: 1,
      license_plate: "AWS-123",
      fine_amount: 1,
      brand: "carbrand123",
      category_id: "12a1s5dasdasd46as5d4as6",
    };

    await createCarUseCase.execute(carProps);

    const car = await carsRepositoryInMemory.findByLicensePlate(
      carProps.license_plate
    );

    expect(car).toHaveProperty("id");
  });

  it("Should not be able to create a new car with exists license plate.", () => {
    expect(async () => {
      const carProps = {
        name: "nameCar",
        description: "descriptionCar",
        daily_rate: 1,
        license_plate: "AWS-123",
        fine_amount: 1,
        brand: "carbrand123",
        category_id: "12a1s5dasdasd46as5d4as6",
      };

      await createCarUseCase.execute(carProps);

      await createCarUseCase.execute(carProps);
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a new car with false availability.", async () => {
    const carProps = {
      name: "nameCar",
      description: "descriptionCar",
      daily_rate: 1,
      license_plate: "AWS-123",
      fine_amount: 1,
      brand: "carbrand123",
      category_id: "12a1s5dasdasd46as5d4as6",
    };

    await createCarUseCase.execute(carProps);

    const car = await carsRepositoryInMemory.findByLicensePlate(
      carProps.license_plate
    );

    const availability = car?.available;
    expect(availability).toBeTruthy();
  });
});
