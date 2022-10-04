import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarUseCase } from "./listAvailableCarsUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listAvailableCarsUseCase: ListAvailableCarUseCase;

describe("List Cars", () => {
  beforeEach(async () => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarUseCase(
      carsRepositoryInMemory
    );

    await carsRepositoryInMemory.create({
      name: "civic1",
      description: "Carro espaçoso de cor prata",
      daily_rate: 150.0,
      fine_amount: 40,
      brand: "Honda",
      category_id: "c34819fa-db9d-47c9-9a7b-0d021613f85b",
      license_plate: "car1",
    });

    await carsRepositoryInMemory.create({
      name: "civic2",
      description: "Carro espaçoso de cor preta",
      daily_rate: 150.0,
      fine_amount: 40,
      brand: "Honda",
      category_id: "c34819fa-db9d-47c9-9a7b-0d021613f85b",
      license_plate: "car2",
    });

    await carsRepositoryInMemory.create({
      name: "corola",
      description: "Carro espaçoso de cor branca",
      daily_rate: 180.0,
      fine_amount: 60,
      brand: "Toyota",
      category_id: "c34819fa-db9d-47c9-9a7b-0d021613f85b",
      license_plate: "car3",
    });

    await carsRepositoryInMemory.create({
      name: "corsa",
      description: "Carro pequeno de cor vermelha",
      daily_rate: 100.0,
      fine_amount: 20,
      brand: "Chefrollet",
      category_id: "c34819fa-db9d-47c9-9a7b-0d021613f85b",
      license_plate: "car4",
    });
  });

  it("Should be a list all available cars", async () => {
    const cars = await listAvailableCarsUseCase.execute({});
    expect(cars.length).toEqual(4);
  });

  it("Should be a list of all available cars, but with a brand filter", async () => {
    const cars = await listAvailableCarsUseCase.execute({ brand: "Honda" });
    expect(cars.length).toEqual(2);
  });

  it("Should be a list of all available cars, but with a name filter", async () => {
    const cars = await listAvailableCarsUseCase.execute({ name: "corola" });
    expect(cars.length).toEqual(1);
  });

  it("Should be a list of all available cars, but with a category_id filter", async () => {
    const cars = await listAvailableCarsUseCase.execute({
      category_id: "c34819fa-db9d-47c9-9a7b-0d021613f85b",
    });
    expect(cars.length).toEqual(4);
  });
});
