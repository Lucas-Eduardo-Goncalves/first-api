import { inject, injectable } from "tsyringe";
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

  async execute(props: ICreateUserDTO) {
    await this.userRepository.create(props);
  }
}

export { CreateUserUseCase };
