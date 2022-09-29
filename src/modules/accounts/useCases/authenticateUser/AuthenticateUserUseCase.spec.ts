import { AppError } from "../../../../shared/errors/AppErrors";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { ICreateUserDTO } from "../../repositories/IUserRepositories";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate user", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("Should be able to authenticate an user.", async () => {
    const user: ICreateUserDTO = {
      driver_license: "000123",
      email: "emailtest@gmail.com",
      name: "userTest",
      password: "teste123",
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("Should not be able to authenticate an nonexistent user.", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "testusernotexists@gmail.com",
        password: "123456789",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to authenticate with incorrect password.", () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: "000123",
        email: "emailtest@gmail.com",
        name: "userTest",
        password: "teste123",
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: "failPassword",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
