import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";

import type {
  ICreateUserDTO,
  IUsersRepository,
} from "../../repositories/IUserRepositories";
import { AppError } from "../../../../shared/errors/AppErrors";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ password, ...rest }: ICreateUserDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(
      rest.email
    );

    if (userAlreadyExists) {
      throw new AppError("User already exists");
    }

    const passwordHash = await hash(password, 8);

    await this.usersRepository.create({
      password: passwordHash,
      ...rest,
    });
  }
}

export { CreateUserUseCase };
