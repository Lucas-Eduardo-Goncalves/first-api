import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppErrors";
import { IUserRepository } from "../../repositories/IUserRepositories";

interface IRequest {
  user_id: string;
  avatar_file: string;
}

@injectable()
class UpdateUserAvatarUserCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUserRepository
  ) {}

  async execute(props: IRequest) {
    const user = await this.usersRepository.findById(props.user_id);
    if (!user) return new AppError("User is not exists.", 400);

    user.avatar = props.avatar_file;

    await this.usersRepository.create(user);
  }
}

export { UpdateUserAvatarUserCase };
