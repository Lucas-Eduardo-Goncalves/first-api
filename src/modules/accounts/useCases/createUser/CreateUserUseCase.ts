import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";

import type {
  ICreateUserDTO,
  IUserRepository,
} from "../../repositories/IUserRepositories";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({ password, ...rest }: ICreateUserDTO) {
    const userAlreadyExists = await this.userRepository.findByEmail(rest.email);

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const passwordHash = await hash(password, 8);

    await this.userRepository.create({
      password: passwordHash,
      ...rest,
    });
  }
}

export { CreateUserUseCase };
