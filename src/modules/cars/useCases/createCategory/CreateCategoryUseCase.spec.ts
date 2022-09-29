import { AppError } from "../../../../errors/AppErrors";
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let createCategoryUseCase: CreateCategoryUseCase;

describe("Create Category", () => {
  beforeAll(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("Shoud be able to create a new category.", async () => {
    await createCategoryUseCase.execute({
      name: "Category test",
      description: "Category description test",
    });

    const category = await categoriesRepositoryInMemory.findByName(
      "Category test"
    );

    expect(category).toHaveProperty("id");
  });

  it("Should not be able to create a new category with name exists.", async () => {
    expect(async () => {
      await createCategoryUseCase.execute({
        name: "Category test",
        description: "Category description test",
      });

      await createCategoryUseCase.execute({
        name: "Category test",
        description: "Category description test",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
